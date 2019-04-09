import * as asyncBusboy from 'async-busboy';
import * as S3 from 'aws-sdk/clients/s3';
import * as fileType from 'file-type';
import { ReadStream } from 'fs';
import * as Koa from 'koa';
import * as sharp from 'sharp';
import { getRepository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';
import { Image } from '../../entity/Image';
import { User } from '../../entity/User';

// No typings avail for this lib
const text2png = require('text2png');
const bufferImageSize = require('buffer-image-size');

export const serveImagesMiddleware = async (ctx: Koa.Context, next: any) => {
  // Only affect the /images/ path
  if (ctx.originalUrl.indexOf('/images') !== 0) {
    return await next();
  }

  let key = ctx.originalUrl.slice(8);
  if (!key) {
    ctx.status = 404;
  }

  // If foreign referrer, serve watermarked version
  const foreign = isForeignReferer(ctx.headers.referer);
  if (foreign) {
    const keySplit = key.split('.');
    const ext = keySplit.pop();
    key = keySplit.join('.');
    key += `_wm.${ext}`;
  }
  console.log(key);

  const { s3 } = ctx.connections;
  const data = await getFile(s3, key);
  if (data) {
    ctx.body = data.Body;
  } else {
    ctx.status = 404;
  }
};

export const uploadImagesMiddleware = async (ctx: Koa.Context, next: any) => {
  if (ctx.originalUrl !== '/uploadImage') {
    return await next();
  }

  const { id: userId, username } = ctx.user;
  if (userId === '0') {
    ctx.status = 403;
    throw new Error('You must be logged in');
  }
  const { s3 } = ctx.connections;

  const watermark = text2png(
    `Hosted for ${username}\nby BJD-db.com`,
    {
      font: '200px sans-serif',
      color: '#2b7f71',
      backgroundColor: '#e7d7c7',
      textAlign: 'center',
      output: 'buffer',
    },
  );

  const { files }  = await asyncBusboy(ctx.req);
  if (!files) {
    ctx.status = 400;
    throw new Error('No files to upload!');
  }
  const results: any = [];
  await asyncForEach(files, async (file, index) => {
    results[index] = {};
    const imageId = uuidv4();
    let fileBuffer = await streamToBuffer(file);
    const type = fileType(fileBuffer);

    // make sure it's an image
    if (!type || !type.mime.match(/^image/)) {
      results[index] = false;
      return;
    }

    // if jpeg, rotate according to exif data
    if (type.mime.match(/^image\/jp(e?)g$/)) {
      fileBuffer = await sharp(fileBuffer).rotate().toBuffer();
    }
    // rotation failed
    if (!fileBuffer) {
      results[index] = false;
      return;
    }

    // Generate thumbnail and watermarks
    const size = bufferImageSize(fileBuffer);
    const { ext } = type;
    const resizedWatermark = await sharp(watermark)
      .resize(Math.round(size.width / 5))
      .toBuffer();
    const watermarked = await sharp(fileBuffer)
      .composite([{
        input: resizedWatermark,
        gravity: 'southeast',
      }])
      .toBuffer();
    const thumbnail = await sharp(fileBuffer)
      .resize(500)
      .toBuffer();
    const waterThumb = await sharp(watermarked)
      .resize(500)
      .toBuffer();

    const origKey = `${userId}/${imageId}.${ext}`;
    const watermarkKey = `${userId}/${imageId}_wm.${ext}`;
    const thumbKey = `${userId}/${imageId}_thumb.${ext}`;
    const waterThumbKey = `${userId}/${imageId}_thumb_wm.${ext}`;

    // Save image to db
    const user = new User();
    user.id = userId;
    const image = new Image();
    image.filename = origKey;
    image.user = user;
    const savedImage = await getRepository(Image).save(image);

    // Save images to S3
    const success = await Promise.all([
      putFile(s3, origKey, fileBuffer),
      putFile(s3, watermarkKey, watermarked),
      putFile(s3, thumbKey, thumbnail),
      putFile(s3, waterThumbKey, waterThumb),
    ]);

    if (savedImage && success) {
      results[index] = `/images/${origKey}`;
    } else {
      results[index] = false;
    }
  });

  ctx.body = {
    images: results,
  };
};

const putFile = (s3: S3, key: string, data: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: process.env.S3_BUCKET!,
        Key: key,
        Body: data,
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(`/images/${key}`);
        }
      },
    );
  });
};

const getFile = (s3: S3, key: string): Promise<S3.GetObjectOutput> => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      },
      (err: any, data: S3.GetObjectOutput) => {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          resolve(data);
        }
      },
    );
  });
};

const asyncForEach =
  async (array: any[], callback: (obj: any, index: number, source: any[]) => void) => {
    // tslint:disable-next-line no-increment-decrement
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

const streamToBuffer = async (stream: ReadStream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const buffers: any[] = [];
    stream.on('error', (error) => {
      reject(error);
    });
    stream.on('data', (data) => {
      buffers.push(data);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
};

const isForeignReferer = (referer: string | undefined) => {
  if (!referer) {
    return true;
  }
  const domainRegex = /^http(s?):\/\/bjd-db\.com($|\/)/;
  if (referer.match(domainRegex)) {
    return false;
  }
  const localRegex = /^http(s?):\/\/localhost(:\d{4})?($|\/)/;
  if (referer.match(localRegex)) {
    return false;
  }
  return true;
};

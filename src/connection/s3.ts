import * as S3 from 'aws-sdk/clients/s3';

export const getConnection = () => {
  return new S3({
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET!,
    endpoint: 'https://s3.amazonaws.com',
  });
};

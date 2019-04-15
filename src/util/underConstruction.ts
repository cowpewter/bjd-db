import * as Koa from 'koa';

export const underConstructionMiddleware = async (ctx: Koa.Context, next: Function) => {
  const isLive = isLiveSite(ctx.headers.referer, ctx.headers.host);
  if (isLive) {
    ctx.body = '<h1>Under Construction</h1>';
    return;
  }
  await next();
};

const isLiveSite = (referer: string | undefined, host: string | undefined) => {
  const refererRegex = /^http(s?):\/\/(www\.)?bjd-db\.com($|\/)/;
  const hostRegex = /^bjd-db\.com$/;
  if (!referer) {
    if (!host) {
      return true;
    }
    return host.match(hostRegex);
  }

  return referer.match(refererRegex);
};

import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {

  async handle(ctx: RequestContext) {
    let startStr = `Req URL:- ${ctx.request.url},
    Referer:- ${ctx.request.header('referer')}
    User-Agent:' ${ctx.request.header('User-Agent')}
    Request IP: ${ctx.request.header('host')}
    Request Start Time:- ${new Date().toISOString()}`
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
    const referer = ctx.request.headers['referer'];
    let continueRequest = false
    if (referer) {
      allowedOrigins.map(o => {
        if (o === referer) continueRequest = true;
      })
    } else {
      continueRequest = true;
    }
    if (continueRequest) {
      await super.handle(ctx);
      startStr += `\n Request End Time:- ${new Date().toISOString()}`
      console.log(startStr);
    } else {
      startStr += `\n Request End Time:- ${new Date().toISOString()}`
      console.log(startStr);
      throw new Error("Referer not allowed")
    }

  }

}

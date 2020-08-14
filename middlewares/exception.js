
const {
  HttpException
} = require('../core/http-exception');


const catchError = async (ctx, next) => {
  try {
      await next();

  } catch (error) {

      const isHttpException = error instanceof HttpException;
      const isDev = global.config.environment === 'dev';

      if (isDev && !isHttpException) {
          throw error;
      }

      if (isHttpException) {
          ctx.body = {
              msg: error.msg,
              error_code: error.errorCode,
              requestUrl: `${ctx.method} ${ctx.path}`
          }
          ctx.status = error.statusCode;
          
      }  else {
          ctx.body = {
              msg: 'we made a mistake 😁',
              error_code: 999,
              requestUrl: `${ctx.method} ${ctx.path}`
          }
          ctx.status = 500;
      }

  }
}



module.exports = catchError;
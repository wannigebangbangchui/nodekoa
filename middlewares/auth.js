const basicAuth = require("basic-auth");
const jwt = require("jsonwebtoken");

class Auth {
  constructor(level){
    this.level = level || 0;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN = 17;
  }

  get m(){
    return async (ctx,next)=>{
      
      //token检测
      //获取token 
      //http身份验证机制 HttpBasicAuth
      const userToken = basicAuth(ctx.req);
      let errMsg = "token不合法";
      let decode;
      //ctx.req  NODE.JS原生对象经过koa封装过后的对象
      if(!userToken || !userToken.name){
        throw new global.errs.Forbbiden(errMsg);
      }
      try{
        decode= jwt.verify(userToken.name,global.config.security.secretKey);
      }catch(error){
        //token 不合法

        //token 已过期
        if(error.name === 'TokrnExpiredError'){
          errMsg = "token已过期，请重新登录";
        }
        throw new global.errs.Forbbiden(errMsg);
      }
      
      if(decode.scope < this.level){
        errMsg = "权限不足";
        throw new global.errs.Forbbiden(errMsg);
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };
      
      await next();

    }
  }

  static verifyToken(token){
    try{
      console.log(token);
      jwt.verify(token,global.config.security.secretKey);
      console.log(2);
      return true;
    }catch(error){
      console.log(error);
      throw new global.errs.AuthFailed();
    }
  }
}

module.exports = {Auth};
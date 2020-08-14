const Router = require('koa-router');
const {Auth} = require("../../../middlewares/auth");
const {LoginType} = require('../../lib/enum');
const {User} = require("../../models/user");
const {TokenValidator,NotEmptyValidator} = require("../../validators/validator");
const {WXManager} = require("../../services/wx");
const {generateToken} = require("../../../core/util");
const router = new Router({
  prefix: '/v1/token',
});

router.post('/',async (ctx,next)=>{
  const v = await new TokenValidator().validate(ctx);
  let token;
  //根据type做不同处理
  switch(v.get("body.type")){
    case LoginType.USER_EMAIL:   //邮箱登录
      token = await emailLogin(v.get("body.account"),v.get("body.secret"))
      break;
    case LoginType.USER_MINI_PROGRAM: //小程序登录
      token = await WXManager.codeToToken(v.get('body.account'))
      break;
    default:
      throw new global.errs.parameterException("没有相应的处理函数");
    
  }
  ctx.body = {token};
});

router.post('/verify',async (ctx)=>{
  const v = await new NotEmptyValidator().validate(ctx);
  const result = Auth.verifyToken(v.get('body.token'));
  ctx.body = {
    result: true,
  }

});

async function emailLogin(account,secret){
  const user = await User.verifyEmailPassword(account,secret);
  return generateToken(user.id,Auth.USER);
}

module.exports = router;  
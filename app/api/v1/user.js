
const Router = require("koa-router");
const {User} = require("../../models/user");
const {RegisterValidator} = require("../../validators/validator");
const router = new Router({
  prefix:"/v1/user"
});

router.post('/register',async (ctx,next)=>{
  //接收参数 参数校验
  const v = await new RegisterValidator().validate(ctx);
  
  const user = {
    email: v.get("body.email"), 
    password: v.get("body.password1"),
    nickname: v.get("body.nickname"),
  }
  await User.create(user); // 默认返回promise 所以需要await 加await后返回请求参数对象
  throw new global.errs.Success();

});

module.exports = router;
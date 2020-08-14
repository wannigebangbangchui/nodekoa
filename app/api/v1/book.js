const Router = require("koa-router");
const {Auth} = require("../../../middlewares/auth");
const router = new Router();
const { PositiveIntegerValidator } = require("../../validators/validator");

router.get("/myKoaProject/book",new Auth(8).m, async (ctx, next) => {
  // const path = ctx.params;
  // const query = ctx.request.query;
  // const header = ctx.request.header;
  // const body = ctx.request.body;
  // const v = await new PositiveIntegerValidator().validate(ctx);
  ctx.body = ctx.auth.uid;
});

module.exports = router;
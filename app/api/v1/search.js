const Router = require('koa-router');
const {Auth} = require("../../../middlewares/auth");
const {Favour} = require("../../models/favour");
const {SearchValidator} = require("../../validators/validator");
const {Movie,Comic,Music} = require("../../models/classic");
const router = new Router({
  prefix: '/v1/classic',
});

router.get('/movie/search',async (ctx)=>{
  const v = new SearchValidator().validate(ctx);
});



module.exports = router;  
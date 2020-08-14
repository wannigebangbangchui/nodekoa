const Router = require('koa-router');
const {Auth} = require("../../../middlewares/auth");
const {Favour} = require("../../models/favour");
const {Art} = require("../../models/art");
const {LoveValidator} = require("../../validators/validator");
const router = new Router({
  prefix: "/v1"
});

router.post('/love',new Auth().m,async (ctx)=>{
  const v = await new LoveValidator().validate(ctx,{
    id: "artId"
  });
  await Favour.love(v.get('body.artId'),v.get('body.type'),ctx.auth.uid);
  throw new global.errs.Success("点赞成功");
});

router.post('/loved',new Auth().m,async (ctx)=>{
  const v = await new LoveValidator().validate(ctx,{
    id: "artId"
  });
  await Favour.loved(v.get('body.artId'),v.get('body.type'),ctx.auth.uid);
  throw new global.errs.Success("取消点赞成功");
});

router.post('/myLove',new Auth().m,async (ctx)=>{
  const arts = await Favour.getUserLove(ctx.auth.uid);
  
  ctx.body = arts;
});

router.get('/favour/:id/:type',new Auth().m,async (ctx)=>{
  const v = await new LoveValidator().validate(ctx);
  const id = v.get('path.id');
  const type = parseInt(v.get('path.type'));
  
  const art = await Art.getData(id,type);
  if(!art){
    throw new global.errs.NotFound('找不到这条信息');
  }
  
  const likeStatus = await Favour.userLikeIt(id,type,ctx.auth.uid); 
  art.setDataValue("likeStatus",likeStatus);
  ctx.body = art;
});
module.exports = router;
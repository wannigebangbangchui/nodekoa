const Router = require('koa-router');
const {Auth} = require("../../../middlewares/auth");
const {Favour} = require("../../models/favour");
const {Movie,Comic,Music} = require("../../models/classic");
const router = new Router({
  prefix: '/v1/classic',
});

router.get('/lastest/Movie', new Auth().m,async (ctx)=>{
  const movie = await Movie.findOne({
    order: [
      ["id","DESC"],  //以index为准倒序
    ],
  });
  const like_status = await Favour.userLikeIt(movie.id,100,ctx.auth.uid);
  movie.setDataValue("likeStatus",like_status);
  ctx.body = movie;
});

router.get('/lastest/Comic', new Auth().m,async (ctx)=>{
  const comic = await Comic.findOne({
    order: [
      ["id","DESC"],  //以index为准倒序
    ],
  });
  const like_status = await Favour.userLikeIt(comic.id,200,ctx.auth.uid);
  comic.setDataValue("likeStatus",like_status);
  ctx.body = comic;
});

router.get('/lastest/Music', new Auth().m,async (ctx)=>{
  const music = await Music.findOne({
    order: [
      ["id","DESC"],  //以index为准倒序
    ],
  });
  const like_status = await Favour.userLikeIt(music.id,300,ctx.auth.uid);
  music.setDataValue("likeStatus",like_status);
  ctx.body = music;
});



module.exports = router;  
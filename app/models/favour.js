const { sequelize } = require("../../core/db");
const { Movie, Comic, Music } = require("../models/classic");
const { Art } = require("../models/art");
const { Sequelize, Model } = require("sequelize");

class Favour extends Model {
  static async love(artId, type, uid) {
    //查询用户是否已经点赞
    const favour = await Favour.findOne({
      where: {
        artId,
        type,
        uid
      }
    });
    if (favour) {
      throw new global.errs.LoveError();
    }

    //添加点赞信息
    // 未查询到用户有点赞信息 
    // 创建事务：建用户点赞表+更新art点赞数
    return sequelize.transaction(async t => {
      await Favour.create({
        artId,
        type,
        uid
      }, { transaction: t });
      const art = await Art.getData(artId, type, false);
      if(!art){
        throw new global.errs.NotFound();
      }
      await art.increment('favNums', { by: 1, transaction: t }) // 点赞数+1
    })

  }

  static async loved(artId, type, uid) {
    //查询用户是否已经点赞
    const favour = await Favour.findOne({
      where: {
        artId,
        type,
        uid
      }
    });
    if (!favour) {
      throw new global.errs.LovedError();
    }

    //添加点赞信息
    // 未查询到用户有点赞信息 
    // 创建事务：建用户点赞表+更新art点赞数
    return sequelize.transaction(async t => {
      await favour.destroy({
        force: true, // 是否硬删除
        transaction: t
      });
      const art = await Art.getData(artId, type, false);
      if(!art){
        throw new global.errs.NotFound();
      }
      await art.decrement('favNums', { by: 1, transaction: t }) // 点赞数-1
    })
  }

  static async userLikeIt(artId, type, uid) {
    const favour = await Favour.findOne({
      where: {
        artId,
        type,
        uid
      }
    });
    if (favour) {
      return true;
    }
    return false;
  }


  static async getUserLove(uid){
    const myLove = await Favour.findAll({
      where:{
        uid,
      }
    });
    if(myLove&&myLove.length==0){
      throw new global.errs.NotFound("还没有喜欢的东西哦");
    }
    let arts = [];
    //此处循环查询数据库，不可控，应该避免
    //如何解决？ 避免单次查询只携带一个参数 一次次的查询消耗性能  解决办法就是把所有要查询的id放在一起，一次解决问题
    //所以这里要用到sql 的 in 查询
    
      arts = await Art.getList(myLove);
    
    return arts;
  }

}

Favour.init({
  uid: Sequelize.INTEGER,
  artId: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: "favour"
});


module.exports = { Favour };
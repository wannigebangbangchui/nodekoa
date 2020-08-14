const { sequelize } = require("../../core/db");
const { Movie, Comic, Music } = require("../models/classic");
const {flatten} = require("lodash");
const {Op} = require("sequelize");

class Art {

  constructor(artId,type){
   this.artId = artId;
   this.type = type;
  }

  static async getList(artInfoList){
    //为避免循环查询 显然归类是最好的做法 总共三个表 将同一个表的查询数据归为一类 再使用in查询 那么总共就只用查三次啦
     let arts = [];
    const artInfoObj = {
      100:[],
      200:[],
      300:[]
    };

    for(let artInfo of artInfoList){
      artInfoObj[artInfo.type].push(artInfo.artId);
    }
    //三次in查询
    for(let key in artInfoObj){
      //此处的查询条件可能为空，需要判断
      const ids = artInfoObj[key];
      if(ids.length === 0){
        continue;
      }
      key = parseInt(key);
      arts.push(await Art.getListByType(ids,key));
    }
    return flatten(arts);
  }

  static async getListByType(ids,type){
    let arts = [];
      const finder = {
        where:{
          id:{
            [Op.in]:ids,
          }
        }
      } 
      const scope = "bh";
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findAll(finder);
        break;
      case 200:
        arts = await Comic.scope(scope).findAll(finder);
        break;
      case 300:
        arts = await Music.scope(scope).findAll(finder);
        break;
      default:
        break;
     }
     return arts;
  }

  static async getData(artId, type) {
    let art = null;
    switch (type) {
      case 100:
        art = await Movie.findOne({
          where:{
            id:artId
          }
        });
        break;
      case 200:
        art = await Comic.findOne({
          where:{
            id:artId
          }
        });
        break;
      case 300:
        art = await Music.findOne({
          where:{
            id:artId
          }
        });
        break;
      default:
        break;
     }
     return art;
  }
}


module.exports = {Art};
const { sequelize } = require("../../core/db");

const { Sequelize, Model } = require("sequelize");

class Flow extends Model{

}

Flow.init({
  index,
  artId,
  type,
},{
  sequelize,
  tableName: "flow"
});

module.exports = {Flow};
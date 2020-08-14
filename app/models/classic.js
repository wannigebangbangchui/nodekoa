const { sequelize } = require("../../core/db");

const { Sequelize, Model } = require("sequelize");

const classicFields = {
  image: Sequelize.STRING,
  title: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  content: Sequelize.STRING,
  favNums: Sequelize.INTEGER,
};

class Movie extends Model {
  
}


Movie.init(
  classicFields
, {
  sequelize,
  tableName: "movie",
});

class Comic extends Model {
  
}


Comic.init(
  classicFields
, {
  sequelize,
  tableName: "comic",
});

class Music extends Model {
  
}


Music.init(
  classicFields
, {
  sequelize,
  tableName: "music",
});

module.exports = { Movie,Comic,Music };
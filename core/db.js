const Sequelize = require("sequelize");
const {dbName,host,user,password,port} = require("../config/config").database;

const sequelize = new Sequelize(dbName,user,password,{
  dialect: 'mysql',
  host,
  port,
  logging: console.log,
  timezone: '+08:00',
  define: {
    timestamps: true, //设置表中有没有时间属性元组，created_time、update_time
    paranoid: true,
    createdAt: "创建时间",
    underscored: true,
    scopes:{
      bh:{
          attributes:{
              exclude:['updated_at','deleted_at','created_at']
          }
      }
  }
  },
});

sequelize.sync({
  force: false,  //每次重新运行清空表
});

module.exports = { 
  sequelize,
};

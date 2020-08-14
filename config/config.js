module.exports ={
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306'
  },
  security:{
    secretKey: "abcdefg",
    expiresIn: 60*60
  },
  wx:{
    appid: 'wxa1106dcd3eb705e2',
    appSecret: '50d09b3e13f263b7a568f3a615b22b33',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  }
}
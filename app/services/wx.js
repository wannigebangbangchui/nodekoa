const util = require("util");
const axios = require("axios");
const {User} = require("../models/user");
const {generateToken} = require("../../core/util");
const {Auth} = require("../../middlewares/auth");

class WXManager {
  static async codeToToken(code){
    //调用微信服务参数需要 code,appid,appsecret
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appid,
      global.config.wx.appSecret,
      code); 
      console.log(url);
    const result = await axios.get(url);
    console.log(result.data.openid);
    if(result.status!==200){
      throw new global.errs.AuthFailed("openid获取失败");
    };
    if(!result.data.openid){
      throw new global.errs.AuthFailed("openid获取失败"+result.data.errcode+" "+result.data.errmsg);
    }
    //拿到openid后，建立档案
    let user = await User.getUserByOpenid(result.data.openid);
    if(!user){
      user = await User.registerByOpenid(result.data.openid);
    }
    return generateToken(user.id,Auth.USER);
  }
}


module.exports = {
  WXManager,
};
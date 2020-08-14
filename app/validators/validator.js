const {LinValidator,Rule} = require("../../core/lin-validator-v2");
const {User} = require("../models/user");
const {LoginType,ArtType} = require("../lib/enum");
class PositiveIntegerValidator extends LinValidator{
  
  constructor(){
    super();
    this.id = [
      new Rule('isInt',"参数需要是正整数",{min:1})
    ]; 
  }
}

class RegisterValidator extends LinValidator{
  constructor(){
    super();
    this.email = [
      new Rule('isEmail',"邮箱格式错误"),
    ];
    this.password1 = [
      new Rule("isLength","密码最少6个字符，最多32个字符",{
        min: 6,
        max: 32,
      }),
      new Rule("matches","密码字符不符合规范","^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]")
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule("isLength","昵称长度不符合规范",{
        min: 4,
        max: 32,
      }),
    ]
  }

  validatePassword(vals){
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if(psw1 !== psw2){
      throw new Error("两个密码必须相同！");
    }
  }
  
  async validateEmail(vals){
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email,
      }
    });
    if(user){
      throw new Error("该邮箱已经注册过了");
    }
  }

}

class TokenValidator extends LinValidator{
  constructor(){
    super();
    this.account = [
      new Rule('isLength','不符合账号规则',{
        min: 4,
        max: 32,
      }),
    ];
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength','至少六个字符',{
        min: 4,
        max: 32
      }),
    ];
  }
  validateLoginType(vals){
    if(!vals.body.type){
      throw new Error("type必须是参数");
    }
    if(!LoginType.isThisType(vals.body.type)){
      throw new Error("type参数不合法");
    }
  }
}

class NotEmptyValidator extends LinValidator{
  constructor(){
    super();
    this.token = [
      new Rule('isLength','不允许为空',{min: 1}),
    ];
  }
}

// 检查ArtType
function checkArtType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
      throw new Error('type必须是参数');
  }
  type = parseInt(type);
  // this.parsed.path.type = type; // parsed为lin-validator内置存储已转换数据的位置

  if (!ArtType.isThisType(type)) {
      throw new Error('type参数不合法');
  }
}

class LoveValidator extends PositiveIntegerValidator {
  constructor() {
      super();
      this.validateType = checkArtType;
      // const checker = new Checker(ArtType);
      // this.validateType = checker.check.bind(checker); // 绑定this
  }
}

class SearchValidator extends LinValidator{
  constructor(){
    super();
    this.q = [
      new Rule('isLength','搜索关键词不为空且长度不超过16字符',{
        min:1,
        max:16
      }),
    ];
    this.start = [
      new Rule('isInt','不符合规范',{
        min:0,
        max:60000
      }),
      new Rule('isOptional','',0),
    ];
    this.count = [
      new Rule('isInt','不符合规范',{
        min:1,
        max:20
      }),
      new Rule('isOptional','',0),
    ];
  }
}


module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LoveValidator,
  SearchValidator
};
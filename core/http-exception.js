class HttpException extends Error {
  constructor(msg = "服务器异常", errorCode = 10000, statusCode = 500) {
    super();
    this.errorCode = errorCode;
    this.msg = msg;
    this.statusCode = statusCode;
  }

}

class ParameterException extends HttpException {
  constructor(msg, errorCode, statusCode) {
    super();
    this.statusCode = 400;
    this.errorCode = errorCode || 10000;
    this.msg = msg || "参数错误";
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.statusCode = 201;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || 0;
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.statusCode = 404;
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10000;
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.statusCode = 401;
    this.msg = msg || "授权失败";
    this.errorCode = errorCode || 10000;
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || "禁止访问";
    this.statusCode = 403;
    this.errorCode = errorCode || 10006;
  }
}

class LoveError extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || "已经点过赞了哦";
    this.statusCode = 500;
    this.errorCode = errorCode || 10008;
  }

}

class LovedError extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || "已经取消赞了哦";
    this.statusCode = 500;
    this.errorCode = errorCode || 10008;
  }
}

module.exports = { HttpException, ParameterException,
   Success, NotFound, AuthFailed, Forbbiden,LovedError,LoveError };
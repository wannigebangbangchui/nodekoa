
const requireDirectory = require("require-directory");
const Router = require("koa-router");
class InitManager {
  static initCore(app){
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  static loadHttpException(){
    const errors = require("./http-exception");
    global.errs = errors;
  }

  static loadConfig(){
    const config = require("../config/config");
    global.config = config;
  }
}

module.exports = InitManager;
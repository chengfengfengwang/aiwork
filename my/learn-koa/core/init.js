const requireDirectory = require('require-directory');



class initManager {
    static initCore(app) {
        initManager.app = app;
        initManager.initLoadRouters()
    }
    static initLoadRouters(){
        requireDirectory(module, `${process.cwd()}/app/api/v1`, { visit: (obj)=>{
            initManager.app.use(obj.routes())
        } })
    }
}

module.exports = initManager
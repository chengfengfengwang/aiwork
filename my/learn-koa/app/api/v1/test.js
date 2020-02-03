const router = require('koa-router')();
const HttpException = require('../../../core/http-exception');
router.get('/',async (ctx,next)=>{
    var error = new HttpException(10000,'为什么出错',400);
    throw error
})
module.exports = router
const router = require('koa-router')();
router.get('/v1/book', (ctx, next) => {
    ctx.body = {
        key: 'book'
    }
})
module.exports = router
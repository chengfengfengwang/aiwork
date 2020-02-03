const router = require('koa-router')();
router.get('/v1/classic/latest', (ctx, next) => {
    ctx.body = {
        key: 'classic'
    }
})
module.exports = router
const handler = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        error.request = `${ctx.method} ${ctx.path}`
        ctx.body = error;
        ctx.status = error.code;
    }
}
module.exports = handler
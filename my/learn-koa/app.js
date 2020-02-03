const koa = require('koa');
const app = new koa();
const koaBody = require('koa-body');
const router = require('koa-router')();


router.post('/upload', async (ctx, next) => {
    console.log(ctx.request.files)
    ctx.response.body = `success`;
});
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 20000*1024*1024	// 设置上传文件大小最大限制，默认2M
    }
}));
app.use(router.routes());

app.listen(3000, ()=>{
    console.log('koa is listening in 3000');
})
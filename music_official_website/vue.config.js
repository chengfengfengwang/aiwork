const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? 'http://cdn.kids.immusician.com'
    : '/',
    chainWebpack:config=>{
      const imgRule = config.module.rule('images');
      imgRule.use('image-webpack-loader')
      .loader('image-webpack-loader')
    },
    pages: {
        // 只有entry属性时，直接用字符串表示模块入口
        index:'src/modules/index/index.js',
        about:'src/modules/about/about.js',
        course: 'src/modules/course/course.js',
        // client: 'src/modules/client/client.js',
        //惠娟-音基推广pc
        musicourse: 'src/modules/musicourse/musicourse.js',
        //惠娟-音基推广移动端
        musicourse_mob: 'src/modules/musicourse_mob/musicourse_mob.js',
        //移动端
        index_mob:'src/modules/index_mob/index_mob.js',
        about_mob:'src/modules/about_mob/about_mob.js',
        course_mob:'src/modules/course_mob/course_mob.js'
    },
    css: {
        loaderOptions: {
          postcss: {
            plugins: [
              autoprefixer(),
              pxtorem({
                rootValue: 37.5,
                propList: ['*']
              })
            ]
          }
        }
      }
}
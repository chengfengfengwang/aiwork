const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    devServer: {
        port: 7777,     // 端口
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 16,
                        propList: ['*', '!background']
                    })
                ]
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '//s.immusician.com/web/h5'
        : '/',
    chainWebpack: config => {
        const imgRule = config.module.rule('images');
        imgRule.use('image-webpack-loader')
            .loader('image-webpack-loader');
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options =>
                Object.assign(options, {
                    transformAssetUrls: {
                        audio: "src"
                    }
                })
            );
    },
    pages: {
        // 只有entry属性时，直接用字符串表示模块入口  vipConfig
        networkTest: 'src/modules/networkTest/networkTest.js',
        addTeacher: 'src/modules/addTeacher/addTeacher.js',
        searchKey: 'src/modules/searchKey/searchKey.js',
        musicBase: 'src/modules/musicBase/musicBase.js',
        aiCourseList: 'src/modules/aiCourseList/aiCourseList.js',
        //开课
        openCourse: 'src/modules/openCourse/openCourse.js',
        vipConfig: 'src/modules/vipConfig/vipConfig.js',
        //网易100音基推广h5/体验课推广
        music: 'src/modules/music/music.js',
        //惠娟-pc音基课程推广
        musicCourse: 'src/modules/musicCourse/musicCourse.js',
        //德芙添加老师微信
        addMusicTeacher: 'src/modules/addMusicTeacher/addMusicTeacher.js',
        //购买尤克里里
        buy: 'src/modules/buy/buy.js',
        //音乐测试
        musicTest: 'src/modules/musicTest/musicTest.js',
        test: 'src/modules/test/test.js',
        test1: 'src/modules/test1/test1.js',
    }
}
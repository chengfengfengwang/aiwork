const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    devServer: {
        port: 5556,     // 端口
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
        ? 'http://kids.immusician.com/org-web/asstes/'
        : '/',
    chainWebpack: config => {
        const imgRule = config.module.rule('images');
        if (process.env.NODE_ENV === 'production') {
            imgRule.use('image-webpack-loader')
                .loader('image-webpack-loader');
        }
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
        test: 'src/modules/test/test.js',
        regist: 'src/modules/regist/regist.js', 
        teachingPlan: 'src/modules/teachingPlan/teachingPlan.js', 
        learnReport: 'src/modules/learnReport/learnReport.js'
    }
}
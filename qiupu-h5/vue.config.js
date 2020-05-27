const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const uploadConfig = require('./uploadConfig');
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        port: 5557,     // 端口
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
        ? `${uploadConfig.assectsUrl}/${uploadConfig.assetsPrefix}`
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
            config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('img',resolve('src/assets/img'))
            .set('components',resolve('src/components'))
            .set('common',resolve('src/common'))
    },
    pages: {
        test: 'src/modules/test/test.js',
        normal: 'src/modules/normal/app.js'
    }
}
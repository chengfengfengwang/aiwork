const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    devServer: {
        port: 5555,     // 端口 http://192.168.199.159:5555/
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
        ? 'http://kids.immusician.com/web/h5'
        : '/',
    chainWebpack: config => {
        const imgRule = config.module.rule('images');
        if (process.env.NODE_ENV === 'production') {
            imgRule.use('image-webpack-loader')
                .loader('image-webpack-loader');
        }
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
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
        //25个二维码的卡片网页
        card: 'src/modules/card/card.js',
        //音乐壳商务合作
        cooperation: 'src/modules/cooperation/cooperation.js',
        //小册歌单二维码页面
        songList: 'src/modules/songList/songList.js',
        //免费领书活动
        bookActivity: 'src/modules/bookActivity/bookActivity.js',
        //24个乐器
        instrument: 'src/modules/instrument/instrument.js',
        //激活课程
        courseAc: 'src/modules/courseAc/courseAc.js',
        //激活成功
        acSuccess: 'src/modules/acSuccess/acSuccess.js',
        //课程详情
        courseDetail: 'src/modules/courseDetail/app.js',
        //25个闪卡二维码
        flashCard: 'src/modules/flashCard/flashCard.js',
        //儿童趣味乐理启蒙活动用书二维码
        childMusicBook: 'src/modules/childMusicBook/childMusicBook.js',
        //开学优惠活动
        newTerm: 'src/modules/newTerm/newTerm.js',
        //添加微信
        addWx: 'src/modules/addWx/addWx.js',
        //儿童趣味乐理启蒙活动用书二维码-目录
        bookAudioDic: 'src/modules/bookAudioDic/bookAudioDic.js',
        //领取课程
        receiveCourse: 'src/modules/receiveCourse/app.js',
        //冲刺课歌单
        dashSongList: 'src/modules/dashSongList/app.js',
        //学习报告
        learnReport: 'src/modules/learnReport/learnReport.js',
        //国庆活动
        nationalDay: 'src/modules/nationalDay/nationalDay.js',
        //畅游世界音乐欣赏歌单
        wordSongList: 'src/modules/wordSongList/app.js',
        //趣味乐理中级
        funMusic_m: 'src/modules/funMusic_m/app.js',
        //尤克里里畅游课歌单（初级）
        ukSongList: 'src/modules/ukSongList/ukSongList.js',
        //国院2级歌单
        guoyuan2SongList: 'src/modules/guoyuan2SongList/app.js',
        //奥尔夫打击乐歌单
        hitMusicSongList: 'src/modules/hitMusicSongList/hitMusicSongList.js',
        //小哈皮课程详情
        hapiCourse: 'src/modules/hapiCourse/hapiCourse.js',
        //疫期领课
        yiqiac: 'src/modules/yiqiac/app.js',
        //微博证书
        wbzs: 'src/modules/wbzs/app.js',
        //微博证书
        livePoster: 'src/modules/livePoster/livePoster.js',
        liveQr: 'src/modules/liveQr/liveQr.js',
        liveVideo: 'src/modules/liveVideo/liveVideo.js',
        //直播素材
        liveMaterial: 'src/modules/liveMaterial/app.js',
        //2.15新邀请裂变
        newInvite: 'src/modules/newInvite/app.js',
        //2.15新邀请裂变
        qr215: 'src/modules/qr215/qr215.js',
        //超级会员详情页
        superVip: 'src/modules/superVip/app.js',
        //机构激活课程
        orgActive: 'src/modules/orgActive/app.js',
        //音乐壳证书
        zsYyk: 'src/modules/zsYyk/app.js',
        qr1: 'src/modules/qr1/qr1.js',
        facChannel: 'src/modules/facChannel/app.js',
        //赵伟入群二维码
        msgInGroup: 'src/modules/msgInGroup/app.js',
        //分销
        promote: 'src/modules/promote/app.js',
        //最强大脑音乐挑战赛
        qbRace: 'src/modules/qbRace/app.js',
        //视唱分享
        sightSingShare: 'src/modules/sightSingShare/app.js',
        //图片背景
        imgbg: 'src/modules/imgbg/app.js',
        //wx调查获取openid
        wxbind: 'src/modules/wxbind/app.js',
        //下载提示
        downloadTip: 'src/modules/downloadTip/app.js',
        //分享领课活动
        shareAc413: 'src/modules/shareAc413/app.js',
        //惠娟书的二维码
        book417: 'src/modules/book417/app.js',
    }
}
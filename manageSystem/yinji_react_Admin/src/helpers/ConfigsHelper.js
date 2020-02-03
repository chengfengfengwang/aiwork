/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/24 下午2:49
 */

export const configFields = {
    // androidInReview: {
    //     type: 'boolean',
    //     title: '安卓审核中'
    // },
    // iosInReview: {
    //     type: 'boolean',
    //     title: 'iOS审核中'
    // },o


    // 版本配置
    androidVersion: {
        type: 'string',
        title: 'Android版本'
    },
    iosVersion: {
        type: 'string',
        title: 'iOS版本'
    },
    androidReviewVersion: {
        type: 'string',
        title: 'Android审核版本'
    },
    iosReviewVersion: {
        type: 'string',
        title: 'iOS审核版本'
    },
    androidNewVersion: {
        type: 'string',
        title: 'Android-Assetbundle版本'
    },
    iosNewVersion: {
        type: 'string',
        title: 'ios-Assetbundle版本'
    },

    isAndroidUpdate: {
        type: 'boolean',
        title: '开启Android更新',
        defaultValue: false
    },

    isIosUpdate: {
        type: 'boolean',
        title: '开启iOS更新',
        defaultValue: false
    },

    androidUpdateDescription: {
        type: 'text',
        title: 'Android更新文案'
    },
    iosUpdateDescription: {
        type: 'text',
        title: 'iOS更新文案'
    },
    iosForceUpdate: {
        type: 'boolean',
        title: 'ios强制更新',
        defaultValue: false
    },
    androidForceUpdate: {
        type: 'boolean',
        title: 'android强制更新',
        defaultValue: false
    },

    androidHotUpdateVersion:{
        type:'text',
        title:'android热更新版本对应关系'
    },
    androidVersionOpenUpdate:{
        type:'text',
        title:'android各版本热更新是否开启对应关系'
    },
    iosHotUpdateVersion:{
        type:'text',
        title:'ios热更新版本对应关系'
    },
    iosVersionOpenUpdate:{
        type:'text',
        title:'ios各版本热更新是否开启对应关系'
    },
    customerInfo:{
        type:'text',
        title:'客服信息'
    },


// 首页

    bannerMusicBasis:{
      type: 'text',
      title: '首页banner'
    },
    adMusicBasis: {
        type: 'text',
        title: '首页广告位'
    },
    recommendCourseMusicBasis:{
        type: 'text',
        title: '首页推荐课程'
    },
    studentCountMusicBasis0:{
        type: 'text',
        title: 'phone学习人数文案'
    },
    studentCountMusicBasis1:{
        type: 'text',
        title: 'pad学习人数文案'
    },

    bannerUkulele:{
        type: 'text',
        title: '首页banner'
    },
    recommendCourseUkulele:{
        type: 'text',
        title: '首页推荐课程'
    },
    studentCountUkulele0:{
        type: 'text',
        title: 'phone学习人数文案'
    },
    studentCountUkulele1:{
        type: 'text',
        title: 'pad学习人数文案'
    },
    adUkulele: {
        type: 'text',
        title: '首页广告位'
    },


    bannerDjembe:{
        type: 'text',
        title: '首页banner'
    },
    recommendCourseDjembe:{
        type: 'text',
        title: '首页推荐课程'
    },
    studentCountDjembe0:{
        type: 'text',
        title: 'phone学习人数文案'
    },
    studentCountDjembe1:{
        type: 'text',
        title: 'pad学习人数文案'
    },
    adDjembe: {
        type: 'text',
        title: '首页广告位'
    },
    
 // 测试
    testCourseIds:{
        type: 'text',
        title: '测试课程'
    },
    testTels: {
        type: 'text',
        title: '测试人员'
    },

    adventData: {
        type: 'text',
        title: '弹框'
    },
    channelRedirectLists: {
        type: 'text',
        title: '渠道信息'
    },
     // 小小音乐荚版本配置
     androidVersionChildren: {
        type: 'string',
        title: 'Android版本'
    },
    iosVersionChildren: {
        type: 'string',
        title: 'iOS版本'
    },
    androidReviewVersionChildren: {
        type: 'string',
        title: 'Android审核版本'
    },
    iosReviewVersionChildren: {
        type: 'string',
        title: 'iOS审核版本'
    },
    androidNewVersionChildren: {
        type: 'string',
        title: 'Android-Assetbundle版本'
    },
    iosNewVersionChildren: {
        type: 'string',
        title: 'ios-Assetbundle版本'
    },
    isAndroidUpdateChildren: {
        type: 'boolean',
        title: '开启Android更新',
        defaultValue: false
    },

    isIosUpdateChildren: {
        type: 'boolean',
        title: '开启iOS更新',
        defaultValue: false
    },

    androidUpdateDescriptionChildren: {
        type: 'text',
        title: 'Android更新文案'
    },
    iosUpdateDescriptionChildren: {
        type: 'text',
        title: 'iOS更新文案'
    },
    iosForceUpdateChildren: {
        type: 'boolean',
        title: 'ios强制更新',
        defaultValue: false
    },
    androidForceUpdateChildren: {
        type: 'boolean',
        title: 'android强制更新',
        defaultValue: false
    },

    androidHotUpdateVersionChildren:{
        type:'text',
        title:'android热更新版本对应关系'
    },
    androidVersionOpenUpdateChildren:{
        type:'text',
        title:'android各版本热更新是否开启对应关系'
    },
    iosHotUpdateVersionChildren:{
        type:'text',
        title:'ios热更新版本对应关系'
    },
    iosVersionOpenUpdateChildren:{
        type:'text',
        title:'ios各版本热更新是否开启对应关系'
    },
    // 校园版版本配置
     androidVersionCampus: {
        type: 'string',
        title: 'Android版本'
    },
    iosVersionCampus: {
        type: 'string',
        title: 'iOS版本'
    },
    androidReviewVersionCampus: {
        type: 'string',
        title: 'Android审核版本'
    },
    iosReviewVersionCampus: {
        type: 'string',
        title: 'iOS审核版本'
    },
    androidNewVersionCampus: {
        type: 'string',
        title: 'Android-Assetbundle版本'
    },
    iosNewVersionCampus: {
        type: 'string',
        title: 'ios-Assetbundle版本'
    },
    isAndroidUpdateCampus: {
        type: 'boolean',
        title: '开启Android更新',
        defaultValue: false
    },

    isIosUpdateCampus: {
        type: 'boolean',
        title: '开启iOS更新',
        defaultValue: false
    },

    androidUpdateDescriptionCampus: {
        type: 'text',
        title: 'Android更新文案'
    },
    iosUpdateDescriptionCampus: {
        type: 'text',
        title: 'iOS更新文案'
    },
    iosForceUpdateCampus: {
        type: 'boolean',
        title: 'ios强制更新',
        defaultValue: false
    },
    androidForceUpdateCampus: {
        type: 'boolean',
        title: 'android强制更新',
        defaultValue: false
    },

    androidHotUpdateVersionCampus:{
        type:'text',
        title:'android热更新版本对应关系'
    },
    androidVersionOpenUpdateCampus:{
        type:'text',
        title:'android各版本热更新是否开启对应关系'
    },
    iosHotUpdateVersionCampus:{
        type:'text',
        title:'ios热更新版本对应关系'
    },
    iosVersionOpenUpdateCampus:{
        type:'text',
        title:'ios各版本热更新是否开启对应关系'
    },
    adventDataChildren: {
        type: 'text',
        title: '弹框'
    },
    purchaseManualConfig: {
        type: 'text',
        title: '激活渠道配置'
    },
    goodsIds: {
        type: 'text',
        title: '激活商品配置'
    },
    goodsIdsName: {
        type: 'text',
        title: '激活商品名字配置'
    },
    gameTypes: {
        type: 'text',
        title: '游戏类型配置'
    },
    purchaseManualActivityConfig: {
        type: 'text',
        title: '激活渠道对应活动配置'
    }
}




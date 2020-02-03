/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/31 下午2:57
 */

import _ from "lodash";

export const courseLevels = {
    template: '模板',
    tutorial: '新手入门',
    advanced: '进阶'
};

export const courseTypes = {
    one: '国院课程',
    two: '央院课程',
    three: '音基启蒙',
    four: '器乐王国',
    five: '音基考前冲刺',
    six: '音乐星球之旅',
    seven: '占用',
};

export const diploma_types = {
    0: '类型一(音基)',
    1: '类型二(素养课)',
    2: '类型三(启蒙课)',
    3: '类型四(乐理视唱)',
    4: '类型五(占用)',
    5: '类型六(占用)',
};

export const courseChooseType = {
    0: '音基',
    1: '素养课',
    2: '启蒙课'
};

export const courseFields = {
    id: {
        title: 'ID',
        defaultValue: 0,
        disabled: true,
    },
    name: {
        title: '名称',
        defaultValue: '',
    },
    level: {
        title: '级别',
        type: 'courseLevel',
        defaultValue: 'advanced',
    },
    type: {
        title: '类型',
        type: 'courseType',
        defaultValue: 'one'
    },
    instrumentType: {
        title: '乐器',
        type: 'instrumentType',
        defaultValue: 'guitar',
    },
    user: {
        title: '用户',
        type: 'user',
        defaultValue: null,
    },
    createdAt: {
        title: '创建时间',
        type: 'timestamp',
        defaultValue: 0,
    },
    updatedAt: {
        title: '更新时间',
        type: 'timestamp',
        defaultValue: 0,
    },
    coverUrl: {
        title: '封面',
        type: 'image',
        defaultValue: '',
    },
    online: {
        title: '上架',
        type: 'boolean',
        defaultValue: false
    },
    price: {
        title: '价格'
    },
    clearanceToUnlock: {
        title: '通关解锁',
        type: 'boolean'
    },
    order: {
        title: '权重',
    },
    description: {
        title: '概要',
        type: 'text'
    },
    counselingPackageSize: {
        title: '问答包大小'
    },
    counselingPackagePrice: {
        title: '问答包价格'
    },
    commentPackageSize: {
        title: '点评包大小'
    },
    commentPackagePrice: {
        title: '点评包价格'
    },
    shareContent: {
        title: '分享标题'
    },
    studiedCount: {
        title: '学习人数'
    },
    courseLabel: {
        title: '课程标签'
    },
    grade: {
        title: '课程难度'
    },
    diploma: {
        title: '毕业证',
        type: 'boolean'
    },
    extraPresentation: {
        title: '是否为新手入门附送的进阶课',
        type: 'boolean',
        defaultValue: false
    },
    property: {
        title: '课程属性',
        type: 'text'
    },
    deadline: {
        title: '课程期限'
    },
    timeoutFailure:{
      title: '超时失败音频',
        type: 'audio'
    },
    noPassNum:{
        title: '用尽次数音频',
        type: 'audio'
    },
    successGame:{
        title: '游戏成功音频',
        type: 'audio'
    },
    iapPrice: {
        title: '内购价格'
    },
    iapId: {
        title: '内购id'
    },
    diplomaTitle:{
        title: '毕业证书名称',
        type: 'text'
    },
    diplomaSubTitle:{
        title: '毕业证书字名称',
        type: 'text'
    },
    diplomaLogoUrl:{
        title: '毕业证logo',
        type: 'image'
    },
    diplomaType:{
        title: '毕业证类型',
        type: 'diplomaType',
        defaultValue: 0,
    },
    diplomaImgUrl:{
        title: '毕业证img',
        type: 'image'
    },
    diplomaContentStr:{
        title: '毕业证正文',
        type: 'text'
    },
    diplomaExtraConfig:{
        title: '毕业证额外配置',
        type: 'text'
    },
    courseTypeInt:{
        title: '课程类型',
        type: 'courseTypeInt',
        defaultValue: 0,
    },
    inReview:{
        title: '审核模式是否展示',
        type: 'boolean',
        defaultValue: false,
    },
    showGteVersion:{
        title: '当前版本以上展示',
    },
    courseCompleteGuideVideo:{
        title: '课程完成提示音',
        type: 'audio'
    },
    clockinGuideVideo:{
        title: '课程打卡提示音',
        type: 'audio'
    },
    purchaseUrl:{
        title: '购买页面',
    },
    institutionCoverUrl:{
        title: '机构版封面',
        type: 'image',
        defaultValue: '',
    }
};

export function getViewableFields({simple = false} = {}) {
    return Object.entries(simple ? _.omit(courseFields, ['counselingPackageSize', 'counselingPackagePrice',
        'commentPackageSize', 'commentPackagePrice', 'description', 'successGame', 'noPassNum', 'timeoutFailure',
        'diplomaExtraConfig', 'diplomaImgUrl', 'diplomaLogoUrl', 'diplomaContentStr', 'courseCompleteGuideVideo', 'clockinGuideVideo', 'purchaseUrl']) : courseFields);
}

export function getEditableFields() {
    return Object.entries(courseFields);
}

export function getDefaultCourse() {
    return _(courseFields).entries().map(([k, v]) => [k, v.defaultValue]).fromPairs().value()
}


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
    one: '类型一',
    two: '类型二',
    three: '类型三',
    four: '类型四',
    five:'类型五',
    six: '类型六'
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
    subTitle: {
        title: '副标题',
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
    isFinish: {
        title: '是否已完结',
        type: 'boolean',
        defaultValue: true
    },
    property: {
        title: '课程属性',
        type: 'text'
    },
    deadline: {
        title: '课程期限'
    },
    wechatDescCover:{
        title: '小程序课程详情展示图',
        type: 'image'
    },
    wechatCourseOrder:{
        title: '小程序课程列表排序',
        defaultValue: 0
    },
    wechatCourseDesc: {
        title: '小程序课程详情',
        type: 'text',
        defaultValue: []
    }
};

export function getViewableFields({simple = false} = {}) {
    return Object.entries(simple ? _.omit(courseFields, ['counselingPackageSize', 'counselingPackagePrice',
        'commentPackageSize', 'commentPackagePrice', 'description', 'wechatCourseDesc']) : courseFields);
}

export function getEditableFields() {
    return Object.entries(courseFields);
}

export function getDefaultCourse() {
    return _(courseFields).entries().map(([k, v]) => [k, v.defaultValue]).fromPairs().value()
}


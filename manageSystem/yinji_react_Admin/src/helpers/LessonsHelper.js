/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/31 下午7:05
 */

import _ from "lodash";

export const reviewStatus = {
    none: '无',
    reviewing: '审核中',
    accepted: '已通过',
    rejected: '未通过'
};

export const lessonFields = {
    id: {
        title: 'ID',
        defaultValue: 0,
        disabled: true,
    },
    name: {
        title: '名称',
        defaultValue: '',
    },
    subName: {
        title: '子名称',
        defaultValue: '',
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
    videoUrl: {
        title: '主视频',
        type: 'video',
        defaultValue: '',
    },
    pieceVUrls: {
        title: '分段视频',
        type: 'pieceVideo',
        defaultValue: '',
    },
    coverUrl: {
        title: '封面',
        type: 'image',
        defaultValue: '',
    },
    order: {
        title: '权重',
        defaultValue: 0
    },
    eventData: {
        title: '事件',
        defaultValue: ''
    },

    shareTitle: {
        title: '分享标题',
        type: 'text',
        defaultValue: ''
    },
    subShareTitle: {
        title: '分享小标题',
        defaultValue: ''
    },
    caption: {
        title: '字幕文件',
        type: 'file',
        defaultValue: ''
    },
    teacher: {
        title: '老师',
    },
    diff: {
        title: '难度'
    },
    recommend: {
        title: '推荐课程',
    },
    level: {
        title: '课程所属等级',
    },
    hasMaterial: {
        title: '是否有素材（默认有，设否为无）',
        type: 'boolean'
    },
    lessonStatus: {
        title: '状态',
        defaultValue: '1'
    },
    property: {
        title: '课程属性',
        type: 'text'
    },
    profileVideo: {
        title: '预览视频',
        type: 'video'
    },
    isLiveLesson: {
        title: '是否是直播课',
    },
    isExperience: {
        title: '是否是体验课',
        type: 'boolean'
    },
    reportConfig: {
        title: '课程报告配置',
        type: 'text'
    },
    isCommon: {
        title: '是否常识课',
        type: 'boolean',
        defaultValue: false
    },
    isLessonBase: {
        title: '是否素养素材',
        type: 'boolean',
        defaultValue: false
    },
    reportType: {
        title: '学习报告类型',
        defaultValue: '0'
    },
    diploma: {
        title: '毕业证',
    },
    studentLessons: {
        title: "开通课件id",
        defaultValue: '0'
    },
    teacherLesson: {
        title: "老师下课件",
        defaultValue: '0'
    },
    studentLesson: {
        title: "学生下课件",
        defaultValue: '0'
    },
    institutionCoverUrl:{
        title: '机构版封面',
        type: 'image',
        defaultValue: '',
    }
};

export const lessonShareFields = {
    top_picture: {
        title: '封面1',
        type: 'image',
        defaultValue: '',
    },
    text1: {
        title: '介绍',
        defaultValue: '',
    },
    video: {
        title: '主视频',
        type: 'video',
        defaultValue: '',
    },
    bottom_picture: {
        title: '封面2',
        type: 'image',
        defaultValue: '',
    },
    text2: {
        title: '介绍2',
        defaultValue: '',
    },
    thumbnail: {
        title: '缩略图',
        type: 'image',
        defaultValue: '',
    },

};

export function getViewableFields() {
    return Object.entries(lessonFields);
}

export function getEditableFields() {
    return Object.entries(lessonFields);
}

export function getEditableShareFields() {
    return Object.entries(lessonShareFields);
}

export function getDefaultLesson() {
    return _(lessonFields).entries().map(([k, v]) => [k, v.defaultValue]).fromPairs().value()
}


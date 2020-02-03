import _ from "lodash";
export const scoreFields = {

    id: {
        title: 'ID',
        defaultValue: 0,
        disabled: true
    },
    title: {
      title: '曲谱名称',
      defaultValue: '',
    },
    online: {
        title: '上架',
        type: 'boolean',
        defaultValue: false
    },
    instrumentType: {
        title: '乐器',
        type: 'instrumentType',
        defaultValue: 'guitar',
    },
    coverUrl:{
       title: '曲谱封面',
       defaultValue: '',
       type: 'image'
    },
    songUrl1: {
        title: '曲谱图片1',
        defaultValue: '',
        type: 'image'
    },
    songUrl2: {
        title: '曲谱图片2',
        defaultValue: '',
        type: 'image'
    },
    songUrl3: {
        title: '曲谱图片3',
        defaultValue: '',
        type: 'image'
    },
    songUrl4: {
        title: '曲谱图片4',
        defaultValue: '',
        type: 'image'
    },
    songUrl5: {
        title: '曲谱图片5',
        defaultValue: '',
        type: 'image'
    },
    songUrl6: {
        title: '曲谱图片6',
        defaultValue: '',
        type: 'image'
    },
    songUrl7: {
        title: '曲谱图片7',
        defaultValue: '',
        type: 'image'
    },
    songUrl8: {
        title: '曲谱图片8',
        defaultValue: '',
        type: 'image'
    },
    songUrl9: {
        title: '曲谱图片9',
        defaultValue: '',
        type: 'image'
    },
    songUrl10: {
        title: '曲谱图片10',
        defaultValue: '',
        type: 'image'
    },
    songUrl11: {
        title: '曲谱图片11',
        defaultValue: '',
        type: 'image'
    },
    songUrl12: {
        title: '曲谱图片12',
        defaultValue: '',
        type: 'image'
    },
    diff:{
        title: '曲谱难度',
        defaultValue: 0,
    },
    hot:{
        title: '热度',
        defaultValue: 0
    },
    wechatScoreType:{
        title: '曲谱类型',
        defaultValue: []
    },
    relevanceUrl: {
        title: '关联网页',
        defaultValue: ''
    }
};

export function getViewableFields() {
    let fields = _.cloneDeep(scoreFields);
    const commonFields = ['id', 'title', 'online', 'instrumentType', 'coverUrl', 'diff', 'hot', 'wechatScoreType', 'relevanceUrl'];
    fields = _.pick(fields, [...commonFields]);
    return Object.entries(fields);
}
export function getEditableFields() {
    return Object.entries(scoreFields);
}
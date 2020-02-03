import _ from "lodash"
export const challengeFields={

    id:{
        title:'ID',
        defaultValue: 0,
        disabled:true
    },
    name: {
        title: '挑战赛名称',
        defaultValue:''
    },
    instrumentType: {
        title: '乐器',
        type: 'instrumentType',
        defaultValue: 'guitar',
    },
    desc: {
        title: '挑战赛描述',
        defaultValue:''
    },
    startTime: {
        title: '开始时间',
        defaultValue:''
    },
    expireeTime: {
        title: '结束时间',
        defaultValue:''
    },

    bgUrl: {
        title: '挑战赛背景图',
        type: 'image',
        defaultValue: ''
    },

    regulationDesc:{
        title: '导语上方',
        type: 'text',
        defaultValue: ''
    },
    regulationDescDown:{
        title: '导语下方',
        type: 'text',
        defaultValue: ''
    },
    leadVideo:{
        title: '导语视频',
        type: 'video'
    },
    leadButton:{
        title:'导语按钮',
        defaultValue:''
    },

    regulationBgUrl:{
        title: '规则背景图',
        type: 'image',
        defaultValue: ''
    },

    prizeTxt1:{
        title: '奖品文本1'
    },

    prizeUrl1:{
        title: '奖品图片1',
        type: 'image',
        defaultValue:''
    },
    prizeTxt2:{
        title: '奖品文本2'
    },
    prizeUrl2:{
        title: '奖品图片2',
        type: 'image',
        defaultValue:''
    },
    prizeTxt3:{
        title: '奖品文本3'
    },
    prizeUrl3:{
        title: '奖品图片3',
        type: 'image',
        defaultValue:''
    },

    state: {
      title: '挑战赛状态',
    },
    mid: {
        title: '曲谱id',
        defaultValue: ''
    },
    term: {
        title: '期数',
        defaultValue: ''
    },
    numss: {
        title: '造假参赛人数',

    },
    challengeLevel: {
        title: '挑战赛难度',
        defaultValue: 1
    },
    explainButtonVideo: {
        title: '示范视频',
        type: 'video'
    },
    explainButton: {
        title: '示范按钮 样式',
        defaultValue:0
    }

};


export const challengeViewFields={

    id:{
        title:'ID',
        defaultValue: 0,
        disabled:true
    },
    name: {
        title: '挑战赛名称',
        defaultValue:''
    },
    instrumentType: {
        title: '乐器',
        type: 'instrumentType',
        defaultValue: 'guitar',
    },
    desc: {
        title: '挑战赛描述',
        defaultValue:''
    },
    startTime: {
        title: '开始时间',
        defaultValue:''
    },
    expireeTime: {
        title: '结束时间',
        defaultValue:''
    },
    bgUrl: {
        title: '挑战赛背景图',
        type: 'image',
        defaultValue: ''
    },
    state: {
        title: '挑战赛状态',
    },
    term: {
        title: '期数',
        defaultValue: ''
    },
    challengeLevel: {
        title: '挑战赛难度',
        defaultValue: 1
    }
};
export function getViewableFields() {
    return Object.entries(challengeViewFields);
}
export function getEditableFields() {
    return Object.entries(challengeFields);
}
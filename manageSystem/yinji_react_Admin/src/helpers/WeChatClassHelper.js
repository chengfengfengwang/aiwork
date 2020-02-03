import _ from "lodash";
export const classFields = {
    id: {
        title: 'ID',
        defaultValue: 0,
        disabled: true
    },
    name:{
        title: '班级名称',
        defaultValue: ''
    },
    instrumentType: {
        title: '乐器',
        type: 'instrumentType',
        defaultValue: 'guitar',
    },
    classU: {
        title: '班级链接',
        type: 'image',
        defaultValue: ''
    },
    brightU: {
        title: '点亮链接',
        type: 'image',
        defaultValue: ''
    },
    wechatQr: {
        title: '微信群二维码',
        type: 'image',
        defaultValue:'',
    },
    classType: {
        title: '班级类型',
        defaultValue: 0
    },
    expiredTime: {
        title: '群二维码过期时间'
    },
    jClassNum:{
        title: '加班人数',
        defaultValue: ''
    }
}


export function getViewableFields() {
    return Object.entries(classFields);
}


export function getEditableFields() {
    let fields = _.cloneDeep(classFields);
    const commonFields = ['id', 'name', 'instrumentType', 'wechatQr' , 'classType'];
    fields = _.pick(fields, [...commonFields]);
    return Object.entries(fields);
}
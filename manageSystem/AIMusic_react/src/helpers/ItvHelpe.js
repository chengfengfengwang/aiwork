import _ from "lodash"
export const itvFields={
    // id:{
    //     title:'ID',
    //     defaultValue: 0,
    //     disabled:true
    // },
    itvTitle:{
        title: '视频标题',

        defaultValue:''
    },
    describe: {
        title:'描述',
        defaultValue: ''
    },
    instrumentType: {
        title: '乐器',
        type: 'instrumentType',
        defaultValue: 'guitar',
    },
    authname: {
        title: '视频作者',
        defaultValue: ''
    },
    coverUrl:{
        title: '封面地址',
        type: 'image',
        defaultValue: ''
    },
    videoUrl: {
        title: '上传视频',
        type: 'video',
        defaultValue:''
    },
    videoType: {
        title: '视频分类',
        defaultValue:''
    },
    isShow: {
        title: '是否上线',
        type: 'boolean'
    }

}


export const itvFieldsb={
    id:{
        title:'ID',
        defaultValue: 0,
        disabled:true
    },
    itvTitle:{
        title: '视频标题',

        defaultValue:''
    },
    describe: {
        title:'描述',
        defaultValue: ''
    },
    instrumentType: {
        title: '乐器',
        type: 'instrumentType',
        defaultValue: 'guitar',
    },
    authname: {
        title: '视频作者',
        defaultValue: ''
    },
    coverUrl:{
        title: '封面地址',
        type: 'image',
        defaultValue: ''
    },
    videoUrl: {
        title: '上传视频',
        type: 'video',
        defaultValue:''
    },
    videoType: {
        title: '视频分类',
        defaultValue:''
    },
    isShow: {
        title: '是否上线',
        type: 'boolean',
        defaultValue: true
    }

}

export function getViewableFields() {
    return Object.entries(itvFields);
}
export function getEditableFields() {
    return Object.entries(itvFieldsb);
}
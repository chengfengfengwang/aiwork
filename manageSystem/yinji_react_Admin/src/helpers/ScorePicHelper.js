import _ from "lodash";

export const scorePicFields = {
    id: {
        title: 'ID',
        defaultValue: 0,
        disabled: true
    },
    name: {
        title: '站外曲谱名',
        defaultValue: '无',
        disabled: false
    },
    score_url1: {
        title: '图片一',
        defaultValue: '',
        type: 'image',
        disabled: false
    },
    score_url2: {
        title: '图片二',
        defaultValue: '',
        type: 'image',
        disabled: false
    },
    score_url3: {
        title: '图片三',
        defaultValue: '',
        type: 'image',
        disabled: false
    },
    score_url4: {
        title: '图片四',
        defaultValue: '',
        type: 'image',
        disabled: false
    },
    score_url5: {
        title: '图片五',
        defaultValue: '',
        type: 'image',
        disabled: false
    },
    cover_url: {
        title: '封面',
        defaultValue: '',
        type: 'image',
        disabled: false
    }
}

export function getViewableFields({simple = false} = {}) {
    return Object.entries(simple ? _.omit(courseFields, ['counselingPackageSize', 'counselingPackagePrice',
        'commentPackageSize', 'commentPackagePrice', 'description']) : courseFields);
}

export function getEditableFields() {
    return Object.entries(courseFields);
}

export function getDefaultCourse() {
    return _(courseFields).entries().map(([k, v]) => [k, v.defaultValue]).fromPairs().value()
}

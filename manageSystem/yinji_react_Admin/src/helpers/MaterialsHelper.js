/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/17 下午4:44
 */

import _ from "lodash";

export const chordPrefixes = {
    'guitar': ['A', 'B', 'Bb', 'C', 'C#', 'D', 'D#', 'E', 'Eb', 'F', 'F#', 'G', 'G#'],
    'ukulele': ['A', 'Ab', 'B', 'Bb', 'C', 'D', 'Db', 'E', 'Eb', 'F', 'G', 'Gb'],
    'music_basis':['A', 'Ab', 'B', 'Bb', 'C', 'D', 'Db', 'E', 'Eb', 'F', 'G', 'Gb'],
    'djembe': ['A', 'Ab', 'B', 'Bb', 'C', 'D', 'Db', 'E', 'Eb', 'F', 'G', 'Gb'],
};

export const materialTypes = {
    video: '视频',
    audio: '音频',
    image: '图片',
    voice: '语音',
    demo: '示范弹奏',
    lighting: '亮灯',
    score: '曲谱',
    chordGroup: '和弦组',
    newChordGroup: '新和弦组',
    chord: '和弦',
    tuner: '调音器',
    metronome: '节拍器',
    tipstext: '文本',
    blueteeth: '蓝牙亮灯',
    choiceGroup: '选择题组',
    choice: '选择题',
    expandInfo: '扩展字段',
    jianpu: '简谱',
    jianpuDemo: '简谱分支带视频',
    chordNew: '新的和弦练习',
    kalimbaTuner: '拇指琴调音器',
    game: '小游戏'
};

export const choiceTypes = {
    1: '文本类型类型',
    2: '音频类型',
    3: '图片类型',
    4: '和弦类型',
    5: '曲谱类型',
    6: '视频类型',
};

export const gameTypes = {
    1: '击落小鸟',
    2: '音程解救小鸟',
    3: '卡牌游戏',
    4: '天枰游戏',
    5: '时值游戏',
    6: '音高游戏',
    7: '宫格游戏',
    8: '选择题',
    9: '音准解救小鸟',
    10: '摆放小鸟',
    11: '节拍游戏',
};

export const materialFields = {
    id: {
        title: 'ID',
        defaultValue: 0,
        disabled: true,
    },
    name: {
        title: '名称',
        defaultValue: '',
    },
    type: {
        title: '类型',
        type: 'materialType',
        defaultValue: 'video',
    },
    instrumentType: {
        title: '乐器',
        type: 'instrumentType',
        defaultValue: 'guitar',
    },
    isOfficial: {
        title: '官方',
        type: 'boolean',
        defaultValue: false,
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
    videoUrl: {
        title: '视频',
        type: 'video',
        defaultValue: '',
    },
    audioUrl: {
        title: '音频',
        type: 'audio',
        defaultValue: '',
    },
    imageUrl: {
        title: '图片',
        type: 'image',
        defaultValue: '',
    },
    coverUrl: {
        title: '封面',
        type: 'image',
        defaultValue: '',
    },
    score: {
        title: '曲谱',
        type: 'score',
        defaultValue: null
    },
    scoreUrl: {
        title: '曲谱',
        type: 'file',
        defaultValue: ''
    },
    offsetTime: {
        title: '对齐时间',
        defaultValue: 0
    },
    originalUrl: {
        title: '原唱',
        type: 'audio',
        defaultValue: ''
    },
    accompanimentUrl: {
        title: '伴奏',
        type: 'audio',
        defaultValue: ''
    },
    category: {
        title: '分类',
        defaultValue: ''
    },
    difficulty: {
        title: '难度',
        defaultValue: 0
    },
    heat: {
        title: '热度',
        defaultValue: 0,
    },
    singerName: {
        title: '歌手',
        type: 'richText',
        defaultValue: '',
    },
    start: {
        title: '起始段落',
        defaultValue: 0,
    },
    stop: {
        title: '结束段落',
        defaultValue: 0,
    },
    scoreDisplayMode: {
        title: '曲谱显示模式',
        defaultValue: 'six'
    },
    highlight: {
        title: '展示',
        type: 'boolean',
        defaultValue: false,
    },
    chords: {
        title: '和弦',
        type: 'chords',
        defaultValue: []
    },
    tuningFret: {
        title: '变调夹',
        defaultValue: 0
    },
    tuningTo: {
        title: '升降调',
        defaultValue: 0
    },
    tuningMethod: {
        title: '调弦方式',
        type: 'tuningMethod',
        defaultValue: {index: 0}
    },
    voiceHighUrl: {
        title: '音高了',
        type: 'audio',
        defaultValue: ''
    },
    voiceLowUrl: {
        title: '音低了',
        type: 'audio',
        defaultValue: ''
    },
    voiceOkUrl: {
        title: '音准了',
        type: 'audio',
        defaultValue: ''
    },
    voicePrompt: {
        type: 'audio',
        title: '语音识别'
    },
    chordGraph: {
        title: '和弦图',
        type: 'chordGraph',
        defaultValue: null
    },
    tone: {
        title: '音色',
        defaultValue: 30
    },
    beatSpeed: {
        title: '节拍速度',
        defaultValue: 0
    },
    beatNumerator: {
        title: '节拍分子',
        defaultValue: 4
    },
    beatDenominator: {
        title: '节拍分母',
        defaultValue: 4
    },
    tipsColor: {
        title: '文本颜色',
    },
    tipsText: {
        title: '文本内容',
    },
    tipsPosx: {
        title: '文本位置横坐标',
    },
    tipsPosy: {
        title: '文本位置纵坐标',
    },
    tipsSize: {
        title: '文本字号大小',
    },
    tipsWidth: {
        title: '文本框宽度',
    },
    tipsHight: {
        title: '文本框高度',
    },
    tipsBgColor: {
        title: '背景颜色',
    },
    insType: {
        title: '乐器类型',
    },
    bleArr: {
        title: '数组',
    },
    // 选择题
    choiceIds: {
        title: '选择题',
        defaultValue: []
    },

    limitTime:{
        title: '倒计时时间',
    },
    limitType:{
        title: '倒计时类型',
        defaultValue: 3
    },
    hasBgt:{
        title: '是否有bgt',
        type: 'boolean',
        defaultValue: false
    },
    tryTime:{
        title: '尝试次数',
        defaultValue: 5
    },
    hasNext:{
        title: '是否有下一题',
        defaultValue:0
    },

    fromBgt:{
        title: '是否来源于bgt',
        type: 'boolean',
        defaultValue: false
    },

    title:{
        title: '选择题题目',
        type: 'text',
    },
    index:{
        title: '选择题编号',
        defaultValue:0
    },
    isUniterming:{
        title: '是否是单选',
        defaultValue:1
    },
    answerType: {
        title: '答案类型',
        type: 'choiceType',
        defaultValue: 'one'
    },
    rightAnswers:{
        title: '正确答案',
        type: 'list',
        defaultValue: [1]
    },

    choiceTitle: {
        title: '题干',
        type: 'text'
    },
    choiceTitleUrl: {
        title: '题干文件',
        type: 'file',
        defaultValue: ''
    },
    choiceScore:{
        title: '上传曲谱',
        type: 'file'
    },
    choiceTxt: {
        title: '题身',
        type: 'text',
        defaultValue: ''
    },
    tipAudioUrl: {
        title: '选择题前音频引导',
        type: 'file',
        defaultValue: ''
    },
    choiceType: {
        title: '选择题类型',
        type: 'choiceType',
        defaultValue: 'one'
    },
    choiceFileUrl:{
        title: '上传文件',
        type: 'file'
    },

    item: {
        title:'答案合集',
        type: 'text'
    },

    choiceUrl1:{
        title: '答案一',
        type: 'file'
    },
    choiceUrl2:{
        title: '答案一',
        type: 'file'
    },
    choiceUrl3:{
        title: '答案一',
        type: 'file'
    },
    choiceUrl4:{
        title: '答案一',
        type: 'file'
    },

    property: {
        title: '素材属性',
        type: 'text'
    },
    extendInfoArr: {
        title: '数据',
        type: 'text'
    },
    videoArr: {
        title: '弦视频数组',
        type: 'text'
    },
    offArr: {
        title: '弦视频偏移数组',
        type: 'text'
    },
    durArr: {
        title: '弦视频时长数组',
        type: 'text'
    },
    voiceArr: {
        title: '声音高低',
        type: 'text'
    },
    guideType: {
        title: '引导类型',
        defaultValue: 0
    },

    describe:{
      title: '描述',
      defaultValue: '',
    },

    metronomeIndex:{
        title: '节拍器音色',
        defaultValue: 0,
    },
    numerator:{
        title:'拍号的分子',
        defaultValue:0
    },

    denominator:{
        title: '拍号的分母',
        defaultValue:0,
    },
    tapTempo: {
        title: '拍速',
        defaultValue: 0
    },
    chordPass: {
        title: '过关条件',
        defaultValue: [80,80,80,80,80]
    },

    repeat:{
        title: '和弦重复遍数',
        defaultValue:0
    },
    showChard:{
        title: '是否显示和弦',
        type: 'boolean'
    },
    thumb: {
        title: '封面',
        type: 'image',
        defaultValue: '',
    },
    // gameType: {
    //     title: '游戏类型',
    //     type: 'gameType'
    // }
    gameId: {
        title: '游戏id'
    },
    guideAudio: {
        title: '引导音频',
        type: 'audio'
    },
    homework: {
        title: "是否是课后练习",
        type: 'boolean',
        defaultValue: true,
    },
    state:{
        title: "AIAI是否是课后练习",
        type: 'boolean',
        defaultValue: true,
    },
    icon:{
        title: "小图标",
        type: 'image',
        defaultValue: ''
    },
    knowledgePointType:{
        title: "知识点类型",
        type: 'knowledgePointType',
        defaultValue:  'note'
    },
    guideVideo: {
        title: '引导视频',
        type: 'video'
    },
    inliveCountdown: {
        title: '直播素材倒计时',
        type: 'int'
    },
    remarks: {
        title: '备注',
        defaultValue: '',
    },
};

const voiceFields = _.fromPairs(['a', 'b', 'c', 'd', 'e', 'f']
    .map(x => x.toUpperCase())
    .map(x => [`voice${x}Url`, {title: `语音${x}`, type: 'audio'}]));


export function getViewableFields({type, includeVoices, simple = false}) {
    let fields = _.cloneDeep(materialFields);
    const commonFields = ['id', 'name', 'type', 'user', 'instrumentType', 'createdAt', 'updatedAt', 'isOfficial', 'property'];
    switch (type) {
        case 'video':
            fields = _.pick(fields, [...commonFields, 'videoUrl', 'property']);
            break;
        case 'audio':
            fields = _.pick(fields, [...commonFields, 'audioUrl', 'coverUrl']);
            break;
        case 'image':
            fields = _.pick(fields, [...commonFields, 'imageUrl']);
            break;
        case 'voice':
            const viewableVoiceFields = includeVoices ? voiceFields : _.pick(voiceFields, ['voiceAUrl']);
            fields = {..._.pick(fields, [...commonFields]), ...viewableVoiceFields};
            break;
        case 'jianpuDemo':
            fields = _.pick(fields, [...commonFields, 'videoUrl', 'score', 'offsetTime']);
            break;
        case 'demo':
            fields = _.pick(fields, [...commonFields, 'videoUrl', 'score', 'offsetTime']);
            break;
        case 'lighting':
            fields = _.pick(fields, [...commonFields]);
            break;
        case 'score':
            fields = _.pick(fields, [...commonFields, 'scoreUrl', 'originalUrl', 'accompanimentUrl', 'category',
                'difficulty', 'heat', 'singerName']);
            if (simple) {
                fields = _.omit(fields, ['originalUrl', 'accompanimentUrl']);
            }
            break;
        case 'jianpu':
            fields = _.pick(fields, [...commonFields, 'scoreUrl', 'originalUrl', 'accompanimentUrl', 'category',
                'difficulty', 'heat', 'singerName']);
            if (simple) {
                fields = _.omit(fields, ['originalUrl', 'accompanimentUrl']);
            }
            break;
        case 'chordGroup':
            fields = _.pick(fields, [...commonFields, 'chords', 'tuningFret', 'tuningTo', 'tuningMethod', 'metronomeIndex', 'numerator', 'denominator', 'tapTempo', 'chordPass', 'repeat','showChard']);
            break;
        case 'newChordGroup':
            fields = _.pick(fields, [...commonFields, 'chords', 'tuningFret', 'tuningTo', 'tuningMethod', 'metronomeIndex', 'numerator', 'denominator', 'tapTempo', 'chordPass', 'repeat','showChard', 'describe']);
            break;
        case 'chord':
            fields = _.pick(fields, [...commonFields, 'chordGraph']);
            break;
        case 'tuner':
            fields = _.pick(fields, [...commonFields, 'tuningMethod', 'voiceHighUrl', 'voiceLowUrl', 'voiceOkUrl', 'voicePrompt', 'videoArr', 'offArr', 'durArr', 'voiceArr', 'guideType']);
            break;
        case 'kalimbaTuner':
            fields = _.pick(fields, [...commonFields, 'tuningMethod', 'voiceHighUrl', 'voiceLowUrl', 'voiceOkUrl', 'voicePrompt', 'videoArr', 'offArr', 'durArr', 'voiceArr', 'guideType']);
            break;
        case 'metronome':
            fields = _.pick(fields, [...commonFields, 'tone', 'beatSpeed', 'beatNumerator','beatDenominator']);
            break;
        case 'tipstext':
            fields = _.pick(fields, [...commonFields, 'tipsColor', 'tipsText', 'tipsPosx', 'tipsPosy', 'tipsSize', 'tipsWidth', 'tipsHight', 'tipsBgColor']);
            break;
        case 'blueteeth':
            fields = _.pick(fields, [...commonFields, 'insType', 'bleArr']);
            break;
        case 'choiceGroup':
            fields = _.pick(fields, [...commonFields, 'question',]);
            break;
        case 'choice':
            fields = _.pick(fields, [...commonFields, 'choiceTitle', 'choiceScore', 'choiceTxt', 1]);
            break;
        case 'expandInfo':
            fields = _.pick(fields, [...commonFields, 'extendInfoArr']);
            break;
        case 'itv':
            fields = _.pick(fields, ['id', 'instrumentType', 'itv_title', 'describe', 'coverUrl', 'videoUrl', 'authname']);
            break;
        case 'course':
            fields = _.pick(fields, [...commonFields, 'description', 'coverUrl', 'price', 'level', 'purchaseUrl']);
            break;
        case 'scores':
            fields = _.pick(fields, ['id', 'name', 'thumb']);
            break;
        case 'recommend_detail':
            fields = _.pick(fields, ['id', 'title', 'coverUrl']);
            break;
        case 'game':
            fields = _.pick(fields, [...commonFields, 'gameId', 'guideAudio', 'knowledgePointType', 'guideVideo']);
            break;
        default:
            break;
    }
    return Object.entries(fields);
}

export function getEditableFields({type, includeAssignment = false}) {
    let fields = _.cloneDeep(materialFields);
    let commonFields = ['id', 'name', 'type', 'user', 'instrumentType', 'createdAt', 'updatedAt', 'isOfficial', 'property', 'homework', 'state', 'icon'];
    if (includeAssignment) {
        commonFields.push('highlight');
    }
    switch (type) {
        case 'video':
            fields = _.pick(fields, [...commonFields, 'videoUrl', 'inliveCountdown', 'remarks']);
            break;
        case 'audio':
            fields = _.pick(fields, [...commonFields, 'audioUrl', 'coverUrl', 'inliveCountdown', 'remarks']);
            break;
        case 'image':
            fields = _.pick(fields, [...commonFields, 'imageUrl', 'inliveCountdown', 'remarks']);
            break;
        case 'voice':
            fields = {..._.pick(fields, [...commonFields]), ...voiceFields};
            break;
        case 'jianpuDemo':
            fields = _.pick(fields, [...commonFields, 'videoUrl', 'score', 'offsetTime', 'inliveCountdown', 'remarks']);
            break;
        case 'demo':
            fields = _.pick(fields, [...commonFields, 'videoUrl', 'score', 'offsetTime', 'inliveCountdown', 'remarks']);
            break;
        case 'lighting':
            fields = _.pick(fields, [...commonFields, 'inliveCountdown', 'remarks']);
            break;
        case 'score':
            fields = _.pick(fields, [...commonFields, 'scoreUrl', 'originalUrl', 'accompanimentUrl', 'category',
                'difficulty', 'heat', 'singerName', 'inliveCountdown', 'remarks']);
            break;
        case 'jianpu':
            fields = _.pick(fields, [...commonFields, 'scoreUrl', 'originalUrl', 'accompanimentUrl', 'category',
                'difficulty', 'heat', 'singerName', 'inliveCountdown', 'remarks']);
            break;
        case 'chordGroup':
            // fields = _.pick(fields, [...commonFields, 'tuningFret', 'tuningTo', 'tuningMethod']);
            fields = _.pick(fields, [...commonFields,  'tuningFret', 'tuningTo', 'tuningMethod', 'metronomeIndex', 'numerator', 'denominator', 'tapTempo', 'chordPass', 'repeat','showChard', 'inliveCountdown', 'remarks']);
            break;
        case 'newChordGroup':
            fields = _.pick(fields, [...commonFields, 'chords', 'tuningFret', 'tuningTo', 'tuningMethod', 'metronomeIndex', 'numerator', 'denominator', 'tapTempo', 'chordPass', 'repeat','showChard', 'describe', 'inliveCountdown', 'remarks']);
            break;
        case 'chord':
            fields = _.pick(fields, [...commonFields, 'chordGraph', 'inliveCountdown', 'remarks']);
            break;
        case 'tuner':
            fields = _.pick(fields, [...commonFields, 'tuningMethod', 'voiceHighUrl', 'voiceLowUrl', 'voiceOkUrl', 'voicePrompt', 'videoArr', 'offArr', 'durArr', 'voiceArr', 'guideType', 'inliveCountdown', 'remarks']);
            break;
        case 'kalimbaTuner':
            fields = _.pick(fields, [...commonFields, 'tuningMethod', 'voiceHighUrl', 'voiceLowUrl', 'voiceOkUrl', 'voicePrompt', 'videoArr', 'offArr', 'durArr', 'voiceArr', 'guideType', 'inliveCountdown', 'remarks']);
            break;
        case 'metronome':
            fields = _.pick(fields, [...commonFields, 'tone','beatSpeed', 'beatNumerator','beatDenominator', 'inliveCountdown', 'remarks']);
            break;
        case 'tipstext':
            fields = _.pick(fields, [...commonFields, 'tipsColor', 'tipsText', 'tipsPosx', 'tipsPosy', 'tipsSize', 'tipsWidth', 'tipsHight', 'tipsBgColor', 'inliveCountdown', 'remarks']);
            break;
        case 'blueteeth':
            fields = _.pick(fields, [...commonFields, 'insType', 'bleArr', 'inliveCountdown', 'remarks']);
            break;
        case 'choiceGroup':
            fields = _.pick(fields, [...commonFields, 'choiceIds', 'limitType', 'limitTime', 'hasBgt','bgtUrl', 'tipAudioUrl', 'inliveCountdown', 'remarks']);
            // fields = _.pick(fields, [...commonFields, 'choiceIds', 'limitType', 'limitTime', 'hasBgt','bgtUrl']);
            break;
        case 'choice':
            fields = _.pick(fields, [...commonFields, 'limitTime', 'tryTime', 'hasNext', 'choiceTitle', 'choiceScore',  'choiceType', 'inliveCountdown', 'remarks']);
            break;
        case 'expandInfo':
            fields = _.pick(fields, [...commonFields, 'extendInfoArr', 'inliveCountdown', 'remarks']);
            break;
        case 1:
            fields = _.pick(fields, [...commonFields,'limitTime', 'tryTime', 'hasNext', 'choiceTitle', 'choiceTitleUrl', 'choiceType', 'fromBgt', 'index','isUniterming', 'answerType','rightAnswers', 'item', 'inliveCountdown', 'remarks']);
            break;
        case 2:
            fields = _.pick(fields, [...commonFields,'limitTime', 'tryTime', 'hasNext', 'choiceTitle','choiceTitleUrl', 'choiceTxt', 'choiceType', 'fromBgt', 'index','isUniterming', 'answerType','rightAnswers', 'item', 'choiceUrl1','choiceUrl2','choiceUrl3','choiceUrl4', 'inliveCountdown', 'remarks']);
            break;
        case 3:
            fields = _.pick(fields, [...commonFields,'limitTime', 'tryTime', 'hasNext', 'choiceTitle', 'choiceScore','choiceTitleUrl', 'choiceType', 'fromBgt', 'index','isUniterming', 'answerType','rightAnswers', 'item', 'choiceUrl1','choiceUrl2','choiceUrl3','choiceUrl4', 'inliveCountdown', 'remarks']);
            break;
        case 4:
            fields = _.pick(fields, [...commonFields,'limitTime', 'tryTime', 'hasNext', 'choiceScore', 'choiceTitleUrl', 'choiceType', 'fromBgt', 'index','isUniterming', 'answerType','rightAnswers', 'inliveCountdown', 'remarks']);
            break;
        case 5:
            fields = _.pick(fields, [...commonFields,'limitTime', 'tryTime', 'hasNext', 'choiceScore', 'choiceTitleUrl', 'choiceType', 'fromBgt', 'index','isUniterming', 'answerType','rightAnswers', 'inliveCountdown', 'remarks']);
            break;
        case 'title_url':
            fields = _.pick(fields, [...commonFields, 'choiceTitleUrl', 'inliveCountdown', 'remarks']);
            break;
        case 6:
            fields = _.pick(fields, [...commonFields, 'limitTime', 'tryTime', 'hasNext','choiceTitle', 'choiceScore','choiceTitleUrl', 'choiceType', 'fromBgt', 'index','isUniterming', 'answerType','rightAnswers', 'item', 'choiceUrl1','choiceUrl2','choiceUrl3','choiceUrl4', 'inliveCountdown', 'remarks']);
            break;
        case 'game':
            fields = _.pick(fields, [...commonFields, 'gameId', 'guideAudio', 'knowledgePointType', 'guideVideo', 'inliveCountdown', 'remarks']);
            break;
        default:
            fields = {};
            console.log('Unsupported material type: ', type);
            break;
    }
    return Object.entries(fields);
}


export function getDefaultMaterial(type) {
    let material = {};
    getEditableFields({type}).forEach(([key, field]) => {
        material[key] = field.defaultValue;
    });
    material.type = type;
    return material;
}


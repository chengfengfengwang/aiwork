/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/15 下午9:42
 */

import axios from "axios";
import config from "../config";
import _ from "lodash";

export const variables = {
    token: null
};

export const agent = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 60000,
});

agent.interceptors.request.use(config => {
    console.log(`>>> Request [${config.method.toUpperCase()}] ${config.url}`, config.params, config.data);
    return config;
}, error => {
    console.log('>>> Request with error', error);
    return Promise.reject(error);
});

agent.interceptors.response.use(response => {
    console.log(`<<< Response ${response.status}:${response.statusText}`, response.data);
    return response;
}, error => {
    console.log('<<< Response with error', error);
    return Promise.reject(error);
});


export function request(method, url, params, data, config) {
    return agent
        .request(Object.assign({
            method: method,
            url: url,
            params: Object.assign({}, params),
            data: data,
            headers: {token: variables.token}
        }, config)).then(response => {
            return Promise.resolve(response.data)
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                throw error;
            } else if (error.code === 'ECONNABORTED') {
                return Promise.reject('连接超时')
            } else if (!error.response) {
                return Promise.reject('网络连接错误');
            } else if (error.response.status === 403) {
                return Promise.reject('权限不足');
            } else {
                return Promise.reject(error.response.data.message || '服务器未知错误');
            }
        })
}

const processMaterial = material => {
    material = _.fromPairs(Object.entries(material).map(([k, v]) => {
        if (!k.endsWith('_')) {
            k = _.camelCase(k);
        }
        if (k === 'type') {
            v = _.camelCase(v);
        } else if (k === 'url') {
            if (material.type === 'video') {
                k = 'videoUrl';
            } else if (material.type === 'audio') {
                k = 'audioUrl';
            } else if (material.type === 'image') {
                k = 'imageUrl';
            } else if (material.type === 'demo') {
                k = 'videoUrl';
            } else if (material.type === 'score') {
                k = 'scoreUrl'
            } else if (material.type === 'jianpu_demo') {
                k = 'videoUrl'
            } else if (material.type === 'jianpu') {
                k = 'scoreUrl'
            }
        }
        return [k, v];
    }));
    if (material.type === 'chord') {
        const {baseFret, frets, fingers} = material;
        material.chordGraph = {baseFret, frets, fingers};
    } else if (material.type === 'chordGroup' || material.type === 'newChordGroup') {
        material.chords = material.chords.map(processMaterial);
    }
    if (material.type === 'choiceGroup'){
        material.question = material.question.map(processMaterial);
    }
    return material;

};

const processWechat = wechat => {
    wechat = _.fromPairs(Object.entries(wechat).map(([k, v]) => {
        if (!k.endsWith('_')) {
            k = _.camelCase(k);
        }
        return [k, v]
    }))
    return wechat
}

const processWechatClass = wechatClass => {
    wechatClass = _.fromPairs(Object.entries(wechatClass).map(([k, v]) => {
        if (!k.endsWith('_')) {
            k = _.camelCase(k);
        }
        return [k, v]
    }))
    return wechatClass
}


function processUser(json) {
    return _.fromPairs(Object.entries(json)
        .filter(([k, v]) => !k.endsWith('_'))
        .map(([k, v]) => [_.camelCase(k), v])
    )
}

function processMaterialForUpload(material) {
    let json = {};
    Object.assign(material, material.chordGraph || {});
    Object.entries(material).forEach(([k, v]) => {
        switch (k) {
            case 'type':
                json['type'] = _.snakeCase(v);
                break;

            case 'user':
                if (v) {
                    json['user_id'] = v.id;
                }
                break;

            case 'tuningMethod':
                json['tuning_method_index'] = v.index;
                break;

            case 'videoUrl':
            case 'audioUrl':
            case 'imageUrl':
            case 'scoreUrl':
                json['url'] = v;
                break;

            default:
                json[_.snakeCase(k)] = v;
                break;
        }
    });
    if (material.type === 'demo' || material.type === 'jianpuDemo' && material.score) {
        json['score_id'] = material.score.id;
    }
    return json;
}

function processCourse(course) {
    return _(course).pickBy((v, k) => !k.endsWith('_')).mapKeys((v, k) => _.camelCase(k)).mapValues((v, k) => {
        return k.toLowerCase().endsWith('price') ? v / 100 : v;
    }).value();
}

function processCourseForUpload(course) {
    let json = {};
    Object.entries(course).forEach(([k, v]) => {
        switch (k) {
            case 'user':
                if (v) {
                    json['user_id'] = v.id;
                }
                break;

            case 'isTutorial':
                break;

            default:
                json[_.snakeCase(k)] = v;
                break;
        }
        if (k.toLowerCase().endsWith('price')) {
            json[_.snakeCase(k)] = parseInt((v * 100).toFixed());
        }
    });
    return json;
}

function processLesson(lesson) {
    return _(lesson)
        .pickBy((v, k) => !k.endsWith('_'))
        .mapKeys((v, k) => _.camelCase(k))
        .mapValues((v, k) => k === 'materials' ? v.map(processMaterial) : v)
        .value();
}

function processLessonForUpload(lesson) {
    let json = {};
    Object.entries(lesson).forEach(([k, v]) => {
        json[_.snakeCase(k)] = v;
    });
    return json;
}

function processLog(log) {
    return _(log)
        .pickBy((v, k) => !k.endsWith('_'))
        .mapKeys((v, k) => _.camelCase(k))
        .value();
}

export function getLogs({page, size, level, keyword} = {}) {
    return request('get', '/logs', {page, size, level, keyword})
        .then(json => ({...json, data: json.data.map(processLog)}))
}

export function clearLogs(clear_level) {
    return request('post', '/logs/clear', {level: clear_level})
}

export function getUsers({page, size, lastId, keyword, isTeacher}) {
    return request('get', '/users', {page, size, lastId, keyword, is_teacher: isTeacher})
        .then(json => ({...json, data: json.data.map(processUser)}))
}

export function getUser(id) {
    return request('get', '/users/' + id).then(json => processUser(json.data))
}

export function createUser(data) {
    return request('post', '/users/', data)
}

export function updateUser(id, data) {
    return request('patch', '/users/' + id, data)
}

export function deleteUser(id) {
    return request('delete', '/users/' + id)
}

export function getCourses({page, size, lastId, userId, keyword, instrumentType, level, sort, online}) {
    return request('get', '/courses', {
        page,
        size,
        last_id: lastId,
        user_id: userId,
        keyword,
        instrument_type: instrumentType,
        level,
        sort,
        online
    }).then(json => Promise.resolve({...json, data: json.data.map(x => processCourse(x))}))
}

export function getCoursesIndex({page, size, keyword, price, instrumentType, level, online}) {
    return request('get', '/courses/index', {
        page,
        size,
        keyword,
        price,
        instrument_type: instrumentType,
        level,
        online
    }).then(json => Promise.resolve({...json, data: json.data.map(x => processCourse(x))}))
}

export function getCourse(id) {
    const is_bam = 1
    return request('get', '/courses/'+id+'/', {is_bam:is_bam}).then(json => Promise.resolve(processCourse(json.data)))
}

export function createCourse(data) {
    return request('post', '/courses/', null, processCourseForUpload(data))
        .then(json => Promise.resolve(processCourse(json.data)))
}

export function updateCourse(id, data) {
    return request('patch', '/courses/' + id, null, processCourseForUpload(data))
        .then(json => Promise.resolve(processCourse(json.data)))
}

export function deleteCourse(id) {
    return request('delete', '/courses/' + id)
}

export function getLessons({page, size, courseId, keyword, reviewStatus, accepted} = {}) {
    return request('get', '/lessons', {
        page, size, course_id: courseId, keyword, review_status: reviewStatus, accepted
    }).then(json => Promise.resolve({...json, data: json.data.map(processLesson)}));
}

export function getLesson(id) {
    return request('get', '/lessons/' + id).then(json => Promise.resolve(processLesson(json.data)));
}

export function createLesson(data) {
    return request('post', '/lessons/', null, processLessonForUpload(data)).then(json => Promise.resolve(processLesson(json.data)));
}

export function updateLesson(id, lesson) {
    return request('patch', '/lessons/' + id, null, processLessonForUpload(lesson)).then(json => Promise.resolve(processLesson(json.data)));
}

export function deleteLesson(id) {
    return request('delete', '/lessons/' + id)
}

export function reviewLesson({id, accepted, reason}) {
    return request('post', `/lessons/${id}/review`, null, {id, accepted, reason})
}

export function submitLessonReview(lessonId) {
    return request('post', `/lessons/${lessonId}/submit_review`)
}

export function bindMaterial(lessonId, materialId) {
    return request('get', `/lessons/${lessonId}/bind_material/${materialId}`)
}

export function unbindMaterial(assignmentId) {
    return request('get', `/lessons/unbind_material/${assignmentId}`)
}

export function updateMaterialBinding(assignmentId, {order, start, stop, scoreDisplayMode, highlight}) {
    return request('post', `/lessons/update_material_binding/${assignmentId}`, null, {
        order,
        start,
        stop,
        score_display_mode: scoreDisplayMode,
        highlight
    })
}

export function getMaterials({page, size, type, lessonId, userId, keyword, instrumentType, direction, isOfficial, sort} = {}) {
    return request('get', '/materials', {
        page,
        size,
        type: type ? _.snakeCase(type) : type,
        lesson_id: lessonId,
        user_id: userId,
        keyword,
        is_official: isOfficial,
        sort,
        instrument_type: instrumentType,
        direction
    }).then(json => {
        let materials = json.data.map(processMaterial);
        return Promise.resolve({...json, data: materials})
    })
}
export function getWechats({page, size, userId, keyword, instrumentType, direction, online, sort} = {}) {
    return request('get', '/wechats', {
        page,
        size,
        user_id: userId,
        keyword,
        online: online,
        sort,
        instrument_type: instrumentType,
        direction
    }).then(json => {
        let wechats = json.data.map(processWechat);
        return Promise.resolve({...json, data: wechats})
    })
}

export function getWechat(id) {
    return request('get', `wechats/${id}`).then(json => {
        let wechat = processWechat(json.data);
        return Promise.resolve(wechat);
    })
}

export function createWechat(wechat) {
    return request('post', `/wechats`, null, processMaterialForUpload(wechat))
        .then(json => processWechat(json.data));
}

export function updateWechat(id, wechat) {
    // material = material.type === 'score' ? material : _.omit(material, ['order', 'start', 'stop', 'score_display_mode']);
    return request('patch', `/wechats/${id}`, null, processMaterialForUpload(wechat))
        .then(json => processWechat(json.data))
}

export function deleteWechat(id) {
    return request('delete', `/wechats/${id}`)
}

export function getWechatClasss({page, size,  keyword, instrumentType, direction, sort} = {}) {
    return request('get', '/wechat/Classs', {
        page,
        size,
        keyword,
        sort,
        instrument_type: instrumentType,
        direction
    }).then(json => {
        let wechatClasss = json.data.map(processWechatClass);
        return Promise.resolve({...json, data: wechatClasss})
    })
}

export function getWechatClass(id) {
    return request('get', `/wechat/classs/${id}`).then(json => {
        let wechatClass = processWechatClass(json.data);
        return Promise.resolve(wechatClass);
    })
}

export function createWechatClass(wechatClass) {
    return request('post', `/wechat/create_class`, null, processMaterialForUpload(wechatClass))
        .then(json => processWechat(json.data));
}

export function updateWechatClass(id, wechatClass) {
    return request('patch', `/wechat/class/${id}`, null, processMaterialForUpload(wechatClass))
        .then(json => processWechat(json.data))
}

export function deleteWechatClass(id) {
    return request('delete', `/wechat/delete_class/${id}/`)
}

export function getWechatClassPurchase({page, size, class_id, beginTime, endTime, start_time=null} = {}) {
    return request('get', '/wechat/class_purchase', {page, size, class_id:class_id, begin_time: beginTime, end_time:endTime, day_count_time: start_time}).then(json => ({
        ...json,
        data: json.data
    }))
}

export function getWechatClassData({page, size, class_id} = {}) {
    return request ('get', '/wechat/class_data', {page,size,class_id: class_id}).then(json =>({
        ...json,
        data: json.data
    }))
}

export function getWechatClassPaymentData({page, size, class_id, beginTime, endTime} = {} ){
    return request ('get', '/wechat/get_class_payment_data', {page, size, class_id:class_id, begin_time: beginTime, end_time: endTime}).then(json => ({
        ...json,
        data:json.data
    }))
}

export function getChallenge(id) {
    return request('get', `/challenge/${id}/`, {is_bam:1}).then(json => {
        let challenge = processWechat(json.data);
        return Promise.resolve(challenge)
    })
}

export function getChallenges({page, size, keyword, instrumentType, direction, online, sort} = {}) {
    return request('get', '/challenge', {
        page,
        size,
        keyword,
        online: online,
        sort,
        instrument_type: instrumentType,
        direction,
        is_bam : 1
    }).then(json => {
        let challenge = json.data.map(processWechat);
        return Promise.resolve({...json, data: challenge})
    })
}

export function createChallenge(challenge) {
    return request('post', `/challenge`, null, processMaterialForUpload(challenge))
        .then(json => processWechat(json.data));
}

export function updateChallenge(id, challenge) {
    // material = material.type === 'score' ? material : _.omit(material, ['order', 'start', 'stop', 'score_display_mode']);
    return request('patch', `/challenge/${id}/`, {is_bam:1}, processMaterialForUpload(challenge))
        .then(json => processWechat(json.data))
}

export function deleteChallenge(id) {
    return request('delete', `/challenge/${id}/`)
}


export function getMaterial(id) {
    return request('get', `/materials/${id}`).then(json => {
        let material = processMaterial(json.data);
        return Promise.resolve(material);
    });
}

export function createMaterial(material) {
    return request('post', `/materials`, null, processMaterialForUpload(material))
        .then(json => processMaterial(json.data));
}

export function updateMaterial(id, material) {
    // material = material.type === 'score' ? material : _.omit(material, ['order', 'start', 'stop', 'score_display_mode']);
    return request('patch', `/materials/${id}`, null, processMaterialForUpload(material))       .then(json => processMaterial(json.data))
}

export function deleteMaterial(id) {
    return request('delete', `/materials/${id}`)
}

export function getTuningMethods(instrument) {
    return request('get', `/materials/tuning_methods/${instrument}`).then(json => json.data);
}

function keyToCamelCase(obj) {
    return _.chain(obj).pickBy((v, k) => !k.endsWith('_')).mapKeys((v, k) => _.camelCase(k)).value()
}

function keyToSnakeCase(obj) {
    return _.mapKeys(obj, (v, k) => _.snakeCase(k))
}

export function getCoursePurchases({page, phone} = {}) {
    return request('get', `/course_purchases`, {page, phone}).then(json => ({
        ...json,
        data: json.data.map(keyToCamelCase)
    }))
}

export function getCoursePhonePurchases({page, phone} = {}) {
    return request('get', `/course_phone_purchases`, {page, phone}).then(json => ({
        ...json,
        data: json.data.map(keyToCamelCase)
    }))
}

export function updateCoursePurchase(id, purchase) {
    return request('patch', `/course_purchases/${id}`, null, keyToSnakeCase(purchase))
}

export function updatePromoDescription(id, text, channel, end_id, channel_phone, phone) {
    if (phone == null) {
        phone = channel_phone
    }
    return request('patch', `/promo/promo_description`, {id:id, text: text, channel: channel, end_id: end_id, phone: phone})
}

export function activeCourse(phone, createUser = false, activeAdvance = false, activePartAdvance=false, courseIds = "") {
    if(activeAdvance){
        // 进阶
        if(createUser){
            //激活红框课程
            return request('post', `/active_course`, null, {phone, create_user: false, course_ids: courseIds})
        }else{
            // 激活全部进阶
            return request('post', `/active_course`, null, {phone, create_user: createUser, active_advance: true})
        }
    } else if (activePartAdvance) {
        // 激活免费进阶
        return request('post', `/active_course`, null, {phone, create_user: false, active_advance: false, active_part_advance: true})
    } else{
        // 激活新手入门 or 创建用户并激活新手入门
        return request('post', `/active_course`, null, {phone, create_user: createUser})
    }

}

export function deactiveCourse(userId, courseId) {

    return request('post', `/deactive_course`, null, {user_id: userId, course_id: courseId})
}

export function register_ai_user(phone, password) {
    return request('post', `/users/reg`, {phone: phone, password: password})
}

export function onGenPromoCode(start, end, count, channel, phone) {
    return request('post', `/promo/fool_gen_promo_code`, null, {count: count, channel:channel, phone: phone})
}

export function getConfigs() {
    return request('get', '/query_configs').then(json => ({...json, data: keyToCamelCase(json.data)}))
}

export function updateConfigs(configs) {
    return request('post', '/update_configs', null, keyToSnakeCase(configs))
}

function processCourseStudy(study) {
    study = keyToCamelCase(study);
    study.course = keyToCamelCase(study.course);
    study.user = keyToCamelCase(study.user);
    return study;
}

function processScorePlay(play) {
    play = keyToCamelCase(play);
    play.lesson = play.lesson ? keyToCamelCase(play.lesson) : null;
    play.musicScore = play.musicScore ? keyToCamelCase(play.musicScore) : null;
    return play;
}

function processPassInfo(info) {
    info = keyToCamelCase(info);
    return info;
}

export function getCourseStudies({page, size, phone, courseId, lessonId, userId, instype} = {}) {
    return request('get', '/course_studies', {page, size, phone, course_id: courseId, lesson_id: lessonId, user_id: userId, instype:instype}).then(json => ({
        ...json,
        data: json.data.map(processCourseStudy)
    }))
}

export function getUserStudyInfo({phone, count=1, instrument_type='ukulele'}) {
    return request('get', '/practice_info', {phone, count, instrument_type})
        .then(json => ({
        ...json,
        data: json.data
    }))
}

export function getPassInfo({page, size, days, instrument_type, course_type} = {}) {
    return request('get', '/lessons/lesson_pass', {page, size, days, instrument_type, course_type}).then(json => ({
            ...json,
            // data: json.data.map(processPassInfo)
            data: json.data
    }))
}

export function getPromoInfo({page, size, keyword, mark} = {}) {
   return request('get', '/promo/promo_info', {page, size, keyword, mark}).then(json => ({
           ...json,
           data: json.data
       }))
}

export function getPromoChannel({page, size, channel, beginTime, endTime, start_time=null} = {}) {
    return request('get', '/promo/promo_channel', {page, size, channel, begin_time: beginTime, end_time:endTime, day_count_time: start_time}).then(json => ({
            ...json,
            data: json.data
}))
}

export function onPushMessage({tagType, content, link, from, title, linktype, instrument_type, course_ids, tels}) {
    return request('post', '/message/message_push', {tag_type: tagType, content:content, link: link, from: from, title: title, link_type: linktype, instrument_type: instrument_type, course_ids:course_ids, tels: tels}).then(json => ({
            ...json,
            data: json.data
    }))
}

export function onPushMessageGuitar({tagType, content, link, from, title, linktype, instrument_type, course_ids, tels}) {
    return request('post', '/message/message_push_iguitar', {tag_type: tagType, content:content, link: link, from: from, title: title, link_type: linktype, instrument_type: instrument_type, course_ids:course_ids, tels: tels}).then(json => ({
        ...json,
        data: json.data
}))
}

export function getScorePlays({page, size, phone, userId, courseId, lessonId}) {
    return request('get', '/score_plays', {page, size, phone, user_id: userId, course_id: courseId, lesson_id: lessonId}).then(json => ({
        ...json, data: json.data.map(processScorePlay)
    }))
}

export function login(username, password) {
    return request('post', '/account/token', null, {username, password})
        .then(json => processUser(json.data));
}

export function getVerify(phone) {
    return request('get', '/ucsms', {phone}).then(json => ({
            ...json,
            data: json.data
        }))
}

export function onVerify(phone, verify) {
    return request('get', '/ucsms/verify', {phone, verify}).then(json => ({
            ...json,
            data: json.data
        }))
}

export function onSaveCourseShare(id, course_info) {
    return request('post', `/courses/${id}/share`, course_info).then(json => ({
            ...json,
            data: json.data
        }))
}

export function onShowCourseShare(id) {
    return request('get', `/courses/${id}/share_info`).then(json => ({
            ...json,
            data: json.data
}))
}

export function showUploadScore(page, size) {
    return request('get', `/score_upload`, {page, size}).then(json => ({
        ...json,
        data: json.data
    }))
}

export function createCoupon(name, describe, coupon_value, coupon_type, send_condition, condition_value, limit_money, start_time, end_time, state, instrument_type, label_one, label_two, ids, style, is_open, reminder, receive_tags, tags_ids, seconds, push_tag) {
    label_one = label_one.toString();
    label_two = label_two.toString();
    ids = ids.toString();
    console.log(condition_value, '------------');
    return request('post', `/coupon/coupons`, {name, describe, coupon_value, coupon_type, send_condition, condition_value, limit_money, start_time, end_time, state, instrument_type, label_one, label_two, ids, style, is_open, reminder, receive_tags, tags_ids, seconds, push_tag}).then(json => ({
        ...json,
        data: json.data
    }))
}

// export function createItv(instrument_type,itv_title,describe,cover_url,video_url,authname,is_show,video_type) {
//     return request('post', `/itv/itvs`, {instrument_type,itv_title,describe,cover_url,video_url,authname,is_show,video_type}).then(json => ({
//         ...json,
//         data: json.data
//     }))
// }

export function getCoupons(page, size, start_time, instype, money, keyword, times) {
    return request('get', `/coupon/coupons`, {page, size, end_time:start_time, instype, money, keyword, times}).then(json => ({
        ...json,
        data: json.data
    }))

}

export function getCouponstas(page, size, daytime) {
    return request('get', `/get_coupon_stas`, {page, size, daytime}).then(json => ({
        ...json,
        data: json.data
    }))

}

// export function getItvs(page, size) {
//     return request('get', `/itv/itvs`, {page, size,}).then(json => ({
//         ...json,
//         data: json.data
//     }))
//
// }


export function getItvs({page, size,  keyword, instrumentType, direction, sort} = {}) {
    return request('get', `/itv/itvs`, {
        page,
        size,
        keyword,
        sort,
        instrument_type: instrumentType,
        direction
    }).then(json => {
        let itv = json.data.map(processWechatClass);
        return Promise.resolve({...json, data: itv})
    })
}

export function getItv(id) {
    return request('get', `/itv/itvs/${id}/`).then(json => {
        let itv = processWechat(json.data);
        return Promise.resolve(itv)
    })
}

export function createItv(itv) {
    return request('post', `/itv/itvs`, null, processMaterialForUpload(itv))
        .then(json => processWechat(json.data));
}

export function updateItv(id, itv) {
    // material = material.type === 'score' ? material : _.omit(material, ['order', 'start', 'stop', 'score_display_mode']);
    return request('patch', `/itv/itvs/${id}/`, null, processMaterialForUpload(itv))
        .then(json => processWechat(json.data))
}

export function deleteItv(id) {
    return request('delete', `/itv/itvs/${id}/`)
}


export function sendCoupon(tels, coupon_id) {
    return request('post', `/coupon/send_coupon`, {tels, coupon_id}) .then(json => ({
        ...json,
        data: json.data
    }))
}

export function changeShare(tels, datas) {
    return request('post', `/ShareAccount/change_share`, {tels, datas}) .then(json => ({
        ...json,
        data: json.data
    }))
}

export function delItv(itv_id) {
    return request('post', `/itv/del_itv`, {itv_id}) .then(json => ({
        ...json,
        data: json.data
    }))
}
export function clearShare(telphone,phoneid) {
    return request('post', `/ShareAccount/clear_share`, {telphone,phoneid}) .then(json => ({
        ...json,
        data: json.data
    }))
}

export function getAbnormalCount() {
    return request('post', `/ShareAccount/get_all_count`, {}) .then(json => ({
        ...json,
        data: json.data
    }))
}

export function getCouponUserInfo(tel) {
    return request('get', `/coupon/get_coupon`, {tel}) .then(json => ({
        ...json,
        data: json.data
    }))
}

export function getShareAccount(tel) {
    return request('get', `/ShareAccount/get_account`, {tel}) .then(json => ({
        ...json,
        data: json.data
    }))
}

export function getScores({page, size, instrumentType, search_name} = {}) {
    // 获取曲谱列表
    return request('get', '/scores', {page, size, instrument_type: instrumentType, search_name: search_name})
        .then(json => {let materials = json.data.map(processMaterial);return Promise.resolve({...json, data: materials})
    })
}

export function getRecommends({page, size, instrument_type, state, recommend_type, sort}) {
    // 获取推荐列表
    return request('get', '/recommend', {page, size, instrument_type, state, recommend_type, sort}).then(json => ({
        ...json, data: json.data.map(processScorePlay)
    }))
}

export function getRecommend(id) {
    // 获取推荐详细
    return request('get', '/recommend/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function createRecommend(title, state, recommend_type, instrument_type, course_type_one, course_type_two, detail_url, cover_url, item) {
    // 添加推荐
    course_type_two = course_type_two.join(',');  //传字符串，后端解析为数据
    return request('post', `/recommend/`, {title, state, recommend_type, item,
        instrument_type, course_type_one, course_type_two, detail_url, cover_url}).then(json => ({
        ...json,
        data: json.data
    }))
}

export function delRecommends(id) {
    // 删除推荐
    return request('delete', '/recommend/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function updateRecommend(id, title, state, recommend_type, instrument_type, course_type_one,
                                course_type_two, detail_url, cover_url, item) {
    return request('patch', '/recommend/' + id, null, {title, state, recommend_type, item,
        instrument_type, course_type_one, course_type_two, detail_url, cover_url})
}

export function getRecommendDetails({page, size, instrument_type, state, recommend_type, sort}) {
    // 获取推荐详细列表
    return request('get', '/recommend_detail', {page, size, instrument_type, state, recommend_type, sort}).then(json => ({
        ...json, data: json.data.map(processScorePlay)
    }))
}

export function getRecommendDetail(id) {
    // 获取推荐详情
    return request('get', '/recommend_detail/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function createRecommendDetail(title, state, recommend_type, instrument_type, cover_url, items) {
    // 创建推荐详情
    let item_tmp = [];
    for (let i=0; i<items.length; i++){
        item_tmp.push(items[i].id)
    }
    items = item_tmp.join(',');
    return request('post', `/recommend_detail/`, {title, state, recommend_type, instrument_type, cover_url, items}).then(json => ({
        ...json, data: json.data
    }))
}

export function delRecommendDetails(id) {
    // 删除推荐详情
    return request('delete', '/recommend_detail/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function updateRecommendDetail(id, title, state, recommend_type, instrument_type, cover_url, items) {
    let item_tmp = [];
    for (let i=0; i<items.length; i++){
        item_tmp.push(items[i].id)
    }
    items = item_tmp.join(',');
    return request('patch', '/recommend_detail/' + id, null,
        {title, state, recommend_type, instrument_type, cover_url, items})
}

/**
 * 上传文件
 * 自动获取令牌，并上传文件到云空间，返回上传后文件的URL
 * @param file 文件对象
 * @param progressCallback 进度回调
 * @returns {Promise<R>|Promise.<T>}
 */
export function uploadFile(file, progressCallback) {
    return request('post', '/uploads/token', null, null)
        .then(json => {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('token', json.data.default_token);
            return agent
                .post(config.uploadUrl, formData, {
                    timeout: 0,
                    onUploadProgress: function (progressEvent) {
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log('Upload progress: ', percentCompleted);
                        if (progressCallback) {
                            progressCallback(percentCompleted);
                        }
                    }
                })
                .then(response => {
                    return Promise.resolve(config.downloadBaseUrl + '/' + response.data.key)
                })
        })
        .catch(error => {
            console.log('上传失败2：', error);
            return Promise.reject('上传文件失败：' + error)
        })
}

let cancelTokenSource = null;

export function waitForRapidLogin(key) {
    cancelTokenSource = axios.CancelToken.source();
    return request('get', `/account/rapid_login/wait/${key}`, null, null, {
        timeout: 0,
        cancelToken: cancelTokenSource.token
    }).then(json => processUser(json.data))
}

export function cancelRapidLogin() {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('Rapid login canceled');
        cancelTokenSource = null;
    }
}

export function activeSummary(page, size, day, instype) {
    return request('get', '/purchase/active_summary', {page, size, day, instrument_type: instype})
        .then(json => ({
            ...json
        }))
}

export function purchaseSummary({page, size, day, type, goods_id, code}) {
    return request('get', '/purchase/purchase_summary', {page, size, day, type, goods_id, code})
        .then(json => ({
            ...json
        }))
}

export function downStatistics(day, start_time_2) {
    return request('get', '/purchase/downStatistics', {day:day, end_time:start_time_2})
        .then(json => ({
            ...json
        }))
}

export function paymentStatistics(day, instype, month) {
    return request('get', '/paymentStatistics', {day: day, instype: instype, month: month})
        .then(json => ({
            ...json
        }))
}

export function paymentStatisticspurchase(page, size, day, instype) {
    return request('get', '/paymentStatistics/purchase', {
        page: page, size: size, day: day, instype: instype,
    })
        .then(json => ({
            ...json
        }))
}

export function paymentStatisticspromo(page, size, day, instype, coupon) {
    return request('get', '/paymentStatistics/promo', {
        page: page, size: size, day: day, instype: instype, coupon: coupon
    })
        .then(json => ({
            ...json
        }))
}

export function paymentStatisticsdetail(page, size, day, types, month) {
    return request('get', '/paymentStatistics/detail', {
        page: page, size: size, day: day, types: types, month: month
    })
        .then(json => ({
            ...json
        }))
}

export function getDownloadClick(start_time, channel, website) {
    return request('get', '/get_download_click', {time_end: start_time, channel:channel, website: website})
        .then(json => ({
        ...json
    }))
}

export function complaint({page, size,}) {
    return request('get', '/complaints', {page, size})
        .then(json => ({
            ...json
        }))
}

export function getRedPoints({page, size, instrument_type, state, sort}) {
    // 获取推荐列表
    return request('get', '/red_point', {page, size, instrument_type, state, sort}).then(json => ({
        ...json, data: json.data.map(processScorePlay)
    }))
}

export function getRedPoint(id) {
    // 获取推荐详细
    return request('get', '/red_point/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function createRedPoint(title, state, instrument_type, course_type_one, course_type_two, items) {
    // 添加推荐
    course_type_two = course_type_two.join(',');  //传字符串，后端解析为数据
    return request('post', `/red_point/`, {title, state, items, instrument_type, course_type_one, course_type_two}).then(json => ({
        ...json,
        data: json.data
    }))
}

export function delRedPoint(id) {
    // 删除推荐
    return request('delete', '/red_point/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function updateRedPoint(id, state, title, instrument_type, course_type_one, course_type_two, items) {
    if (typeof(course_type_two) !== "undefined") {
        course_type_two = course_type_two.join(',');
    }
    return request('patch', '/red_point/' + id, null, {title, state, items, instrument_type, course_type_one, course_type_two})
}

export function createActiveTemplate(item, items) {
    let course_item = '';
    for (let i = 0; i < items.length; i++){
        course_item += items[i].course_id + '->' + items[i].duration_day;
        course_item += ','
    }
    item.items = course_item;
    return request('post', `/active_template/`, item).then(json => ({
        ...json,
        data: json.data
    }))
}

export function updateActiveTemplate(id, item, items) {
    let course_item = '';
    for (let i = 0; i < items.length; i++){
        course_item += items[i].course_id + '->' + items[i].duration_day;
        course_item += ','
    }
    item.items = course_item;
    return request('patch', '/active_template/' + id, item)
}

export function getActiveTemplates({page, size, state, sort, group, title}) {
    return request('get', '/active_template', {page, size, state, sort, group, title}).then(json => ({
        ...json, data: json.data.map(processScorePlay)
    }))
}

export function getActiveTemplate(id) {
    return request('get', '/active_template/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function createActiveCode(template, count, times) {
    return request('post', '/active_template/block_create/' + template, {count, times}).then(json => ({
        ...json, data: json.data
    }))
}

export function getActiveCodes({page, size, state, sort, batch_number}) {
    return request('get', '/active_code', {page, size, state, sort, batch_number}).then(json => ({
        ...json, data: json.data.map(processScorePlay)
    }))
}

export function getActiveDetail({page, size, state, sort, batch_number, begin_date, end_date}) {
    return request('get', '/active_code/batch/detail', {page, size, state, sort,
        batch_number, begin_date, end_date}).then(json => ({
        ...json, data: json.data
    }))
}

export function getActiveGroupDetail({page, size, state, sort, group, begin_date, end_date}) {
    return request('get', '/active_code/group/detail', {page, size, state, sort,
        group, begin_date, end_date}).then(json => ({
        ...json, data: json.data
    }))
}

export function delTemplates(id) {
    // 删除推荐
    return request('delete', '/active_template/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function copyTemplates(id) {
    // 删除推荐
    return request('post', '/active_template/copy/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function getTemplateBatch(id) {
    // 删除推荐
    return request('get', '/active_template/batches/' + id, {}).then(json => ({
        ...json, data: json.data
    }))
}

export function setBatchCode(template_id, form_batch_number, to_template_id) {
    return request('post', '/active_template/batch/change/', {template_id, form_batch_number, to_template_id}).then(json => ({
        ...json, data: json.data
    }))
}

export function getActiveCodesStats({begin_date, end_date}) {
    return request('get', '/active_template/stats/batch/', {begin_date, end_date}).then(json => ({
        ...json, data: json.data.map(processScorePlay)
    }))
}

export function getActiveCodesGroupStats({begin_date, end_date}) {
    return request('get', '/active_template/stats/group/', {begin_date, end_date}).then(json => ({
        ...json, data: json.data.map(processScorePlay)
    }))
}

export function getSearchCode(code) {
    return request('get', '/active_code/search/?code=' + code, {}).then(json => ({
        ...json
    }))
}

export function getActiveGroupBatchStats({begin_date, end_date}) {
    return request('get', '/active_template/batch_group/', {begin_date, end_date}).then(json => ({
        ...json, data: json.data
    }))
}

export function getActiveSigGroupStats({group, begin_date, end_date}) {
    return request('get', '/active_template/stats/groups/', {group, begin_date, end_date}).then(json => ({
        ...json, data: json.data
    }))
}

export function getActiveSigBatchStats({template_id, begin_date, end_date}) {
    return request('get', '/active_template/stats/batch/', {template_id, begin_date, end_date}).then(json => ({
        ...json, data: json.data
    }))
}

export function togetherMp4(url,param,progressCallback){
    return agent.post(url, param, {
        timeout: 0,
        onUploadProgress: function (progressEvent) {
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Upload progress: ', percentCompleted);
            if (progressCallback) {
                progressCallback(percentCompleted);
            }
        }
    })
    .then(response => {
        return Promise.resolve(config.downloadBaseUrl + '/' + response.data.key)
    })
}

/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/19 上午11:04
 */

import * as _ from "lodash";
export const usersFields = {
    id: {
        title: 'ID',
    },
    username: {
        title: '用户名'
    },
    nickname: {
        title: '昵称'
    },
    sex: {
        title: '性别',
        type: 'sex'
    },
    avatarUrl: {
        title: '头像',
        type: 'image'
    },
    registeredAt: {
        title: '注册时间',
        type: 'timestamp'
    },
    lastLoginedAt: {
        title: '上次登录',
        type: 'timestamp'
    },
    realName: {
        title: '真实姓名'
    },
    phone: {
        title: '电话'
    },
    isTeacher: {
        title: '教师',
        type: 'boolean'
    },
    isAdmin: {
        title: '管理员',
        type: 'boolean'
    },
};

export function getViewableFields() {
    return Object.entries(usersFields);
}

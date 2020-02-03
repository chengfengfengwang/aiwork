/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/15 下午3:29
 */

import {createSelector} from 'reselect'

export const rootSelector = createSelector(_ => _, _ => _);

export const userSelector = createSelector(rootSelector, root => root.user);

export const onlineSelector = createSelector(userSelector, user => user.isLoggedIn);

export const errorSelector = createSelector(rootSelector, root => root.error);

export const waitingSelector = createSelector(rootSelector, root => root.waiting);

export const confirmationSelector = createSelector(rootSelector, root => root.confirmation);

export const materialsManagementSelector = createSelector(rootSelector, root => root.materialsManagement);

export const wechatsManagementSelector = createSelector(rootSelector, root => root.wechatsManagement);

export const wechatClasssManagementSelector = createSelector(rootSelector, root => root.wechatClasssManagement);

export const challengesManagementSelector = createSelector(rootSelector, root => root.challengesManagement);

export const itvsManagementSelector = createSelector(rootSelector, root => root.itvsManagement);

export const coursesManagementSelector = createSelector(rootSelector, root => root.coursesManagement);

export const usersChooserSelector = createSelector(rootSelector, x => x.usersChooser);

export const materialsChooserSelector = createSelector(rootSelector, x => x.materialsChooser);

export const chordsChooserSelector = createSelector(rootSelector, x => x.chordsChooser);

export const choiceChooserSelector = createSelector(rootSelector, x=> x.choicesChooser);

export const tuningMethodsSelector = createSelector(rootSelector, x => x.tuningMethods);

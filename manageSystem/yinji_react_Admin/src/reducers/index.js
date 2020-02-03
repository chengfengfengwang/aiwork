/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/13 下午6:27
 */

import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import _ from 'lodash'

import * as actions from '../actions'
import * as MaterialsHelper from "../helpers/MaterialsHelper";
import * as CoursesHelper from '../helpers/CoursesHelper';
import * as WeChatHelper from "../helpers/WeChatHelper";
import * as WeChatClassHelper from "../helpers/WeChatClassHelper";
import * as ChallengeHelper from "../helpers/ChallengeHelper";
import * as ItvHelper from "../helpers/ItvHelpe";

const countReducer = (state = 0, action) => {
    switch (action.type) {
        case actions.INC:
            return state + action.payload;
        case actions.DEC:
            return state - action.payload;
        default:
            return state;
    }
};

const userInitialState = {
    isLoggedIn: false,
    id: null,
    username: null,
    nickname: null
};

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case actions.LOGGED_IN:
            return {...state, isLoggedIn: true, ...action.payload};
        case actions.LOGGED_OUT:
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
};

const usersChooserInitialState = {
    isVisible: false,
    page: 0,
    size: 10,
    keyword: '',
    isTeacher: 'all',
    users: [],
    selectedIndex: 0,
    total: 0,
};

const usersChooserReducer = (state = usersChooserInitialState, action) => {
    switch (action.type) {
        case actions.SHOW_USERS_CHOOSER:
            return {...state, isVisible: true};
        case actions.HIDE_USERS_CHOOSER:
            return {...state, isVisible: false};
        case actions.REQUEST_USERS_CHOOSER_USERS:
            const {page, size, isTeacher, keyword} = action.payload;
            return {...state, page, size, keyword, isTeacher};
        case actions.UPDATE_USERS_CHOOSER_USERS:
            const {users, total} = action.payload;
            return {...state, users, total, selectedIndex: 0};
        case actions.UPDATE_USERS_CHOOSER_SELECTED_INDEX:
            const index = action.payload;
            return {...state, selectedIndex: index};
        default:
            return state;
    }
};

const materialsChooserInitialState = {
    isVisible: false,
    page: 0,
    size: 10,
    keyword: '',
    type: 'video',
    instrumentType: 'music_basis',
    isOfficial: 'all',
    materials: [],
    selectedIndex: 0,
    total: 0,
};

const materialsChooserReducer = (state = materialsChooserInitialState, action) => {
    switch (action.type) {
        case actions.SHOW_MATERIALS_CHOOSER:
            return {...state, isVisible: true};
        case actions.HIDE_MATERIALS_CHOOSER:
            return {...state, isVisible: false};
        case actions.REQUEST_MATERIALS_CHOOSER_MATERIALS:
            return {...state, ...action.payload};
        case actions.UPDATE_MATERIALS_CHOOSER_MATERIALS:
            const {materials, total} = action.payload;
            return {...state, materials, total, selectedIndex: 0};
        case actions.UPDATE_MATERIALS_CHOOSER_SELECTED_INDEX:
            const index = action.payload;
            return {...state, selectedIndex: index};
        default:
            return state;
    }
};

const chordsChooserInitialState = {
    isVisible: false,
    instrumentType: 'music_basis',
    activePrefixIndex: 0,
    chords: [],
    selectedIndex: 0,
};

const choiceChooserInitialState = {
    isVisible: false,
    instrument_type: 'music_basis',
    activePrefixIndex: 0,
    question:[],
    selectedIndex: 0,
};

const chordsChooserReducer = (state = chordsChooserInitialState, action) => {
    switch (action.type) {
        case actions.SHOW_CHORDS_CHOOSER:
            return {...state, isVisible: true};
        case actions.HIDE_CHORDS_CHOOSER:
            return {...state, isVisible: false};
        case actions.REQUEST_CHORDS_CHOOSER_CHORDS:
            const {instrumentType, prefix} = {...state, ...action.payload};
            const activePrefixIndex = MaterialsHelper.chordPrefixes[instrumentType].indexOf(prefix);
            return {...state, instrumentType, activePrefixIndex};
        case actions.UPDATE_CHORDS_CHOOSER_CHORDS:
            const chords = action.payload;
            return {...state, chords, selectedIndex: 0};
        case actions.UPDATE_CHORDS_CHOOSER_SELECTED_INDEX:
            const index = action.payload;
            return {...state, selectedIndex: index};
        default:
            return state;
    }
};

const choiceChooserReducer = (state = choiceChooserInitialState, action) => {
    switch (action.type){
        case actions.SHOW_CHOICE_CHOOSER:
            return {...state, isVisible: true};
        case actions.HIDE_CHOICE_CHOOSER:
            return {...state, isVisible: false};
        case actions.UPDATE_CHOICE_CHOOSER_CHOICE:
            const question = action.payload;
            return {...state, question, selectedIndex: 0};
        case actions.UPDATE_CHOICE_CHOOSER_SELECTED_INDEX:
            const index = action.payload;
            return {...state, selectedIndex: index};
        default:
            return state;
    }
};



const materialsManagementInitialState = {
    page: 0,
    size: 10,
    type: 'video',
    instrumentType: 'music_basis',
    userId: -1,
    keyword: '',
    isOfficial: 'all',
    sort: '_id,1',
    materials: [],
    total: 0,
    currentMaterial: null,
};

const materialsManagementReducer = (state = materialsManagementInitialState, action) => {
    switch (action.type) {
        case actions.REQUEST_MATERIALS:
            return {...state, ...action.payload};
        case actions.UPDATE_MATERIALS:
            const {materials, total} = action.payload;
            return {...state, materials, total};
        case  actions.UPDATE_MATERIAL:
            let material = action.payload;
            const fields = MaterialsHelper.getEditableFields({type: material.type});
            for (let [key, field] of fields) {
                if (material[key] === undefined) {
                    material[key] = field.defaultValue;
                }
            }
            return {...state, currentMaterial: material};
        default:
            return state;
    }
};

const wechatsManagementInitialState = {
    page: 0,
    size: 10,
    instrumentType: 'music_basis',
    userId: -1,
    keyword: null,
    online: 'all',
    sort: '_id,1',
    wechats:[],
    total: 0,
    currentWechat: null,
};

const wechatsManagementReducer = (state = wechatsManagementInitialState, action) => {
    switch (action.type) {
        case actions.REQUEST_WECHATS:
            return {...state, ...action.payload};
        case actions.UPDATE_WECHATS:
            const {wechats, total} = action.payload;
            return {...state, wechats, total};
        case  actions.UPDATE_WECHAT:
            let wechat = action.payload;
            const fields = WeChatHelper.getEditableFields();
            for (let [key, field] of fields) {
                if (wechat[key] === undefined) {
                    wechat[key] = field.defaultValue;
                }
            }
            return {...state, currentWechat: wechat};
        default:
            return state;
    }
};

const wechatClasssMangementInitialState = {
    page:0,
    size: 10,
    instrumentType: 'music_basis',
    keyword: null,
    sort: '_id,1',
    total:0,
    wechatClasss: [],
    currentWechatClass: null,
}

const wechatClasssManagementReducer = (state = wechatClasssMangementInitialState, action) => {
    switch (action.type){
        case actions.REQUEST_WECHAT_CLASSS:
            return {...state, ...action.payload};
        case actions.UPDATE_WECHAT_CLASSS:
            const {wechatClasss, total} = action.payload;
            return {...state, wechatClasss, total};
        case actions.UPDATE_WECHAT_CLASS:
            let wechatClass = action.payload;
            const fields = WeChatClassHelper.getEditableFields();
            for (let [key, field] of fields){
                if (wechatClass[key] === undefined){
                    wechatClass[key] = field.defaultValue;
                }
            }
            return {...state, currentWechatClass:wechatClass};
        default:
            return state;
    }
};


const challengesMangementInitialState = {
    page:0,
    size: 10,
    instrumentType: 'music_basis',
    keyword: null,
    sort: '_id,1',
    total:0,
    challenges: [],
    currentChallenge: null,
}

const challengesManagementReducer = (state = challengesMangementInitialState, action) => {
    switch (action.type){
        case actions.REQUEST_CHALLENGES:
            return {...state, ...action.payload};
        case actions.UPDATE_CHALLENGES:
            const {challenges, total} = action.payload;
            return {...state, challenges, total};
        case actions.UPDATE_CHALLENGE:
            let challenge = action.payload;
            const fields = ChallengeHelper.getEditableFields();
            for (let [key, field] of fields){
                if (challenge[key] === undefined){
                    challenge[key] = field.defaultValue;
                }
            }
            return {...state, currentChallenge:challenge};
        default:
            return state;
    }
};


const itvsMangementInitialState = {
    page:0,
    size:10,
    instrumentType: 'music_basis',
    keyword:null,
    sort:'_id,1',
    itvs:[],
    currentItv: null,
    total: 0,
};

const itvsManagementReducer = (state = itvsMangementInitialState, action) => {
    switch (action.type){
        case actions.REQUEST_ITVS:
            return {...state, ...action.payload};
        case actions.UPDATE_ITVS:
            const {itvs, total} = action.payload;
            return {...state, itvs, total};
        case actions.UPDATE_ITV:
            let itv = action.payload;
            const fields = ItvHelper.getEditableFields();
            for (let [key, field] of fields){
                if (itv[key] === undefined){
                    itv[key] = field.defaultValue;
                }
            }
            return {...state, currentItv:itv};
        default:
            return state;
    }
};


const coursesManagementInitialState = {
    page: 0,
    size: 10,
    level: 'all',
    instrumentType: 'music_basis',
    keyword: '',
    sort: '_id,1',
    online: 'all',
    courses: [],
    total: 0,
    currentCourse: null,
    activeType: 'course',
    activeLessonIndex: -1,
    activeMaterialIndex: -1,
    activeChordIndex: 0,
    activeChoiceIndex: 0,
};

const coursesManagementReducer = (state = coursesManagementInitialState, action) => {
    switch (action.type) {
        case actions.REQUEST_COURSES:
            return {...state, ...action.payload};
        case actions.UPDATE_COURSES:
            const {courses, total} = action.payload;
            return {...state, courses, total};
        case  actions.UPDATE_COURSE:
            let course = action.payload;
            const fields = CoursesHelper.getEditableFields({type: course.type});
            for (let [key, field] of fields) {
                if (course[key] === undefined) {
                    course[key] = field.defaultValue;
                }
            }
            return {
                ...state,
                currentCourse: course, activeType: 'course', activeLessonIndex: -1, activeMaterialIndex: -1
            };
        case actions.SELECT_COURSE:
            return {...state, activeType: 'course', activeLessonIndex: -1, activeMaterialIndex: -1};
        case actions.SELECT_LESSON:
            return {...state, activeType: 'lesson', activeLessonIndex: action.payload, activeMaterialIndex: -1};
        case actions.SELECT_MATERIAL:
            return {...state, activeType: 'material', activeMaterialIndex: action.payload, activeChordIndex: 0, activeChoiceIndex: 0,};
        case actions.SELECT_CHORD:
            return {...state, activeChordIndex: action.payload};
        case actions.SELECT_CHOICE:
            return {...state, activeChoiceIndex: action.payload};
        case actions.UPDATE_SELECTED_LESSON:
            const newState = {...state};
            newState.currentCourse.lessons[newState.activeLessonIndex] = action.payload;
            return newState;
        case actions.UPDATE_SELECTED_MATERIAL:
            let state2 = {...state};
            state2.currentCourse.lessons[state2.activeLessonIndex].materials[state2.activeMaterialIndex] = action.payload;
            return state2;
        case actions.UPDATE_SELECTED_CHORD:
            let state3 = {...state};
            state3.currentCourse.lessons[state.activeLessonIndex].materials[state.activeMaterialIndex].chords[state.activeChordIndex] = action.payload;
            return state3;
        case actions.UPDATE_SELECTED_CHOICE:
            let state4  = {...state};
            state4.currentCourse.lessons[state.activeLessonIndex].materials[state.activeMaterialIndex].question[state.activeChoiceIndex] = action.payload;
            return state4;
        default:
            return state;
    }
};


const errorReducer = (state = null, action) => {
    switch (action.type) {
        case actions.SHOW_ERROR:
            return action.payload;
        case actions.HIDE_ERROR:
            return null;
        default:
            return state;
    }
};

const waitingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.SHOW_WAITING:
            return true;
        case actions.HIDE_WAITING:
            return false;
        default:
            return state;
    }
};

const confirmationReducer = (state = {message: null, isVisible: false}, action) => {
    switch (action.type) {
        case actions.SHOW_CONFIRMATION:
            return {isVisible: true, message: action.payload || 'Are you sure ?'};
        case actions.HIDE_CONFIRMATION:
            return {...state, isVisible: false};
        default:
            return state;
    }
};

const tuningMethodsReducer = (state = null, action) => {
    switch (action.type) {
        case actions.UPDATE_TUNING_METHODS:
            return action.payload;
        default:
            return state;
    }
};

const appReducer = combineReducers({
    count: countReducer,
    router: routerReducer,
    user: userReducer,
    error: errorReducer,
    waiting: waitingReducer,
    materialsManagement: materialsManagementReducer,
    wechatsManagement: wechatsManagementReducer,
    wechatClasssManagement: wechatClasssManagementReducer,
    challengesManagement: challengesManagementReducer,
    itvsManagement: itvsManagementReducer,
    coursesManagement: coursesManagementReducer,
    usersChooser: usersChooserReducer,
    materialsChooser: materialsChooserReducer,
    chordsChooser: chordsChooserReducer,
    choicesChooser: choiceChooserReducer,
    tuningMethods: tuningMethodsReducer,
    confirmation: confirmationReducer
});

const rootReducer = (state, action) => {
    if (action.type === actions.CLEAR_STORE) {
        state = {router: state.router}
    }
    return appReducer(state, action);
};

export default rootReducer
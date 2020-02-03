/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/13 下午7:39
 */

import {delay} from "redux-saga";
import {all, call, fork, put, race, select, take, takeEvery, takeLatest} from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../api";
import * as selectors from "../reducers/selectors";
import axios from "axios";


function *add() {
    yield delay(10);
    yield put(actions.inc(1))
}

function *dec() {
    yield delay(10);
    yield put(actions.dec(1))
}

function* watchAdd() {
    yield takeEvery(actions.TO_INC, add)
}

function *watchDec() {
    yield takeEvery(actions.TO_DEC, dec)
}


function *login(action) {
    const {username, password} = action.payload;
    try {
        yield put(actions.showWaiting());
        const user = yield call(api.login, username, password);
        yield put(actions.loggedIn(user));
        yield call(updateApiToken);
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *waitForRapidLogin(action) {
    const key = action.payload;
    try {
        const user = yield call(api.waitForRapidLogin, key);
        yield put(actions.loggedIn(user));
        yield call(updateApiToken);
    } catch (error) {
        console.log('error:', error);
        if (!axios.isCancel(error)) {
            yield put(actions.showError(error));
        } else {
            console.log('Rapid login request has been canceled.');
        }
    }
}

function *loggedIn() {
    console.log('Canceling rapid login request...');
    api.cancelRapidLogin();
}


function *requestMaterials(action) {
    try {
        const oldCondition = yield select(selectors.materialsManagementSelector);
        const newCondition = action.payload;
        const condition = {...oldCondition, ...newCondition};
        yield put(actions.showWaiting());
        const json = yield call(api.getMaterials, condition);
        let {data: materials, paging: {total}} = json;
        yield put(actions.updateMaterials({materials, total}));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}
function *requestWechats(action) {
    try {
        const oldCondition = yield select(selectors.wechatsManagementSelector);
        const newCondition = action.payload;
        const condition = {...oldCondition, ...newCondition};
        yield put(actions.showWaiting());
        const json = yield call(api.getWechats, condition);
        let {data: wechats, paging: {total}} = json;
        yield put(actions.updateWechats({wechats, total}));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestWechatClasss(action) {
    try {
        const oldCondition = yield select(selectors.wechatClasssManagementSelector);
        const newCondition = action.payload;
        const condition = {...oldCondition, ...newCondition};
        yield put(actions.showWaiting());
        const json = yield call(api.getWechatClasss, condition);
        let {data: wechatClasss, paging: {total}} = json;
        yield put(actions.updateWechatClasss({wechatClasss, total}));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestChallenges(action) {
    try{
        const oldCondition = yield select(selectors.challengesManagementSelector);
        const newCondition = action.payload;
        const condition = {...oldCondition, ...newCondition};
        yield put(actions.showWaiting());
        const json = yield call(api.getChallenges, condition);
        let {data: challenges, paging: {total}} = json;
        yield put(actions.updateChallenges({challenges, total}));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestItvs(action) {
    try{
        const oldCondition = yield select(selectors.itvsManagementSelector);
        const newCondition = action.payload;
        const condition = {...oldCondition, ...newCondition};
        yield put(actions.showWaiting());
        const json = yield call(api.getItvs, condition);
        let {data: itvs, paging: {total}} = json;
        yield put(actions.updateItvs({itvs, total}));
        yield put(actions.hideWaiting());
    }catch (error){
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestWechat(action) {
    const id = action.payload;
    try {
        yield put(actions.showWaiting());
        let wechat = yield call(api.getWechat, id);
        yield put(actions.updateWechat(wechat));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestWechatClass(action) {
    const id = action.payload;
    try {
        yield put(actions.showWaiting());
        let wechatClass = yield call(api.getWechatClass, id);
        yield put(actions.updateWechatClass(wechatClass));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestChallenge(action) {
    const id = action.payload;
    try {
        yield put(actions.showWaiting());
        let Challenge = yield call(api.getChallenge, id);
        yield put(actions.updateChallenge(Challenge));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}
function *requestItv(action) {
    const id = action.payload;
    try{
        yield put(actions.showWaiting());
        let itv = yield call(api.getItv, id);
        yield put(actions.updateItv(itv));
        yield put(actions.hideWaiting())
    } catch (error){
        yield put(actions.hideWaiting());
        yield put(actions.showError(error))
    }
}

function *requestUpdateWechat(action) {
    let wechat = action.payload;
    let {id} = wechat;
    try {
        yield put(actions.showWaiting());
        wechat = yield call(api.updateWechat, id, wechat);
        yield put(actions.updateWechat(wechat));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestUpdateChallenge(action) {
    let challenge = action.payload;
    let {id} = challenge;
    try {
        yield put(actions.showWaiting());
        challenge = yield call(api.updateChallenge, id, challenge);
        yield put(actions.updateWechatClass(challenge));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestUpdateWechatClass(action) {
    let wechatClass = action.payload;
    let {id} = wechatClass;
    try {
        yield put(actions.showWaiting());
        wechatClass = yield call(api.updateWechatClass, id, wechatClass);
        yield put(actions.updateWechatClass(wechatClass));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestUpdateItv(action) {
    let itv = action.payload;
    let {id} = itv;
    try{
        yield put(actions.showWaiting());
        itv = yield call(api.updateItv, id, itv);
        yield put(actions.updateItv(itv));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}


function *requestCreateWechat(action) {
    let wechat = action.payload;
    try {
        yield  put(actions.showWaiting());
        wechat = yield call(api.createWechat, wechat);
        yield put(actions.updateWechat(wechat));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestCreateWechatClass(action) {
    let wechatClass = action.payload;
    try {
        yield  put(actions.showWaiting());
        wechatClass = yield call(api.createWechatClass, wechatClass);
        yield put(actions.updateWechatClass(wechatClass));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestCreateChallenge(action) {
    let challenge = action.payload;
    try {
        yield  put(actions.showWaiting());
        challenge = yield call(api.createChallenge, challenge);
        yield put(actions.updateChallenge(challenge));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestCreateItv(action){
    let itv = action.payload;
    try{
        yield put(actions.showWaiting());
        itv = yield call(api.createItv, itv);
        yield put(actions.updateItv(itv));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}


function *requestDeleteWechat(action) {
    if (yield call(confirmationSaga, '确认删除素材?')) {
        let id = action.payload;
        try {
            yield put(actions.showWaiting());
            yield call(api.deleteWechat, id);
            yield put(actions.requestWechats())
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}

function *requestDeleteWechatClass(action) {
    if (yield call(confirmationSaga, '确认删除素材?')) {
        let id = action.payload;
        try {
            yield put(actions.showWaiting());
            yield call(api.deleteWechatClass, id);
            yield put(actions.requestWechatClasss())
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}


function *requestDeleteChallenge(action) {
    if (yield call(confirmationSaga, '确认删除素材?')) {
        let id = action.payload;
        try {
            yield put(actions.showWaiting());
            yield call(api.deleteChallenge, id);
            yield put(actions.requestChallenges())
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}

function *requestDeleteItv(action) {
    if(yield call(confirmationSaga, '确认删除素材')){
        let id = action.payload;
        try{
            yield put(actions.showWaiting());
            yield call(api.deleteItv, id);
            yield put(actions.requestItvs())
        }catch(error){
            yield put (actions.hideWaiting());
            yield put (actions.showError(error));
        }
    }

}

function *requestMaterial(action) {
    const id = action.payload;
    try {
        yield put(actions.showWaiting());
        let material = yield call(api.getMaterial, id);
        yield put(actions.updateMaterial(material));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestUpdateMaterial(action) {
    let material = action.payload;
    let {id} = material;
    try {
        yield put(actions.showWaiting());
        material = yield call(api.updateMaterial, id, material);
        yield put(actions.updateMaterial(material));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestCreateMaterial(action) {
    let material = action.payload;
    try {
        yield  put(actions.showWaiting());
        material = yield call(api.createMaterial, material);
        yield put(actions.updateMaterial(material));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestDeleteMaterial(action) {
    if (yield call(confirmationSaga, '确认删除素材?')) {
        let id = action.payload;
        try {
            yield put(actions.showWaiting());
            yield call(api.deleteMaterial, id);
            yield put(actions.requestMaterials())
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}
function *requestCourses(action) {
    try {
        const oldCondition = yield select(selectors.coursesManagementSelector);
        const newCondition = action.payload;
        const condition = {...oldCondition, ...newCondition};
        yield put(actions.showWaiting());
        const json = yield call(api.getCourses, condition);
        let {data: courses, paging: {total}} = json;
        yield put(actions.updateCourses({courses, total}));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestCourse(action) {
    const id = action.payload;
    try {
        yield put(actions.showWaiting());
        let course = yield call(api.getCourse, id);
        yield put(actions.updateCourse(course));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestUpdateCourse(action) {
    let course = action.payload;
    let {id} = course;
    try {
        yield put(actions.showWaiting());
        course = yield call(api.updateCourse, id, course);
        yield put(actions.updateCourse(course));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestCreateCourse(action) {
    let course = action.payload;
    try {
        yield  put(actions.showWaiting());
        course = yield call(api.createCourse, course);
        yield put(actions.updateCourse(course));
        yield put(actions.requestCourses({}));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestDeleteCourse(action) {
    if (yield call(confirmationSaga, '确认删除课程?')) {
        let id = action.payload;
        try {
            yield put(actions.showWaiting());
            yield call(api.deleteCourse, id);
            yield put(actions.requestCourses())
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}

function *updateApiToken() {
    const user = yield select(selectors.userSelector);
    api.variables.token = user.token;
    console.log(api.variables.token, 'SSSSSSSSSSSSSSSSSSSSSSSFFFFFFFFFFF')
    api.variables.uid = user.id
}

function *requestUsersChooserUsers(action) {
    const {page, size, keyword, isTeacher} = action.payload;
    try {
        yield put(actions.showWaiting());
        let {data: users, paging: {total}} = yield call(api.getUsers, {page, size, keyword, isTeacher});
        yield put(actions.updateUsersChooserUsers({users, total}));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *loggedOut() {
    yield put(actions.clearStore())
}

function *requestMaterialsChooserMaterials(action) {
    const oldCondition = yield select(selectors.materialsChooserSelector);
    const newCondition = action.payload;
    try {
        yield put(actions.hideWaiting());
        let {data: materials, paging: {total}} = yield call(api.getMaterials, {...oldCondition, ...newCondition});
        yield put(actions.updateMaterialsChooserMaterials({materials, total}));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestChordsChooserChords(action) {
    const oldCondition = yield select(selectors.chordsChooserSelector);
    const newCondition = action.payload;
    const condition = {...oldCondition, ...newCondition};
    const {instrumentType, prefix} = condition;
    try {
        yield put(actions.hideWaiting());
        let {data: chords} = yield call(api.getMaterials, {
            type: 'chord',
            instrumentType,
            keyword: `${prefix}(?![#b])`,
            size: 10000,
        });
        yield put(actions.updateChordsChooserChords(chords));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestChoicesChooserChoices(action){
    const oldCondition = yield select(selectors.choiceChooserSelector);
    const newCondition = action.payload;
    const condition = {...oldCondition, ...newCondition};
    const {instrumentType} = condition;
    try {
        yield put(actions.hideWaiting());
        let{data: question} = yield call(api.getMaterials,{
            type: 'choice',
            instrumentType,
            size: 1000,
        });
        yield put(actions.updateChoiceChooserChoice(question));
        yield put(actions.hideWaiting());
    }catch (error){
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }

}

function *selectLesson(action) {
    const index = action.payload;
    try {
        yield put(actions.showWaiting());
        const {currentCourse: {lessons}} = yield select(selectors.coursesManagementSelector);
        let lesson = yield call(api.getLesson, lessons[index].id);
        yield put(actions.updateSelectedLesson(lesson));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *addLesson(action) {
    const lesson = action.payload;
    try {
        yield put(actions.showWaiting());
        yield call(api.createLesson, lesson);
        yield put(actions.requestCourse(lesson.courseId));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *unActive(action) {
    const payload = action.payload;
    if (yield call(confirmationSaga, '确认取消激活?')) {
        try {
            yield put(actions.showWaiting());
            yield call(api.deactiveCourse(payload));
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}

function *removeLesson(action) {
    if (yield call(confirmationSaga, '确认删除课件?')) {
        const id = action.payload;
        try {
            yield put(actions.showWaiting());
            yield call(api.deleteLesson, id);
            const {currentCourse} = yield select(selectors.coursesManagementSelector);
            yield put(actions.requestCourse(currentCourse.id));
            yield put(actions.hideWaiting());
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}


function *chooseChord() {
    yield put(actions.showChordsChooser());
    const {ok, cancel} = yield race({
        ok: take(actions.CHORDS_CHOOSER_OK),
        cancel: take(actions.CHORDS_CHOOSER_CANCEL),
        custom: take(actions.CHORDS_CHOOSER_CUSTOM)
    });
    yield put(actions.hideChordsChooser());
    if (cancel) {
        return;
    }
    const {currentCourse, activeLessonIndex, activeMaterialIndex} = yield select(selectors.coursesManagementSelector);
    const activeMaterial = currentCourse.lessons[activeLessonIndex].materials[activeMaterialIndex];
    try {
        yield put(actions.showWaiting());
        if (ok) {
            const chord = ok.payload;
            const newMaterial = yield call(api.updateMaterial, activeMaterial.id, {chordIds: [...activeMaterial.chordIds, chord.id]});
            yield put(actions.updateSelectedMaterial(newMaterial));
            yield put(actions.selectChord(newMaterial.chords.length - 1));
        } else {
            const chord = yield call(api.createMaterial,
                {type: 'chord', instrumentType: activeMaterial.instrumentType, name: '未命名'});
            const newMaterial = yield call(api.updateMaterial, activeMaterial.id, {chordIds: [...activeMaterial.chordIds, chord.id]});
            yield put(actions.updateSelectedMaterial(newMaterial));
            yield put(actions.selectChord(newMaterial.chords.length - 1));
        }
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error))
    }
}

function *chooseChoice() {
    yield put(actions.showChoiceChooser());
    const {ok, cancel} = yield race({
        ok: take(actions.CHOICE_CHOOSER_OK),
        cancel: take(actions.CHOICE_CHOOSER_CNACEL),
        custom: take(actions.CHOICE_CHOOSER_CUSTOM)
    });
    yield put(actions.hideChoicesChooser());
    if (cancel){
        return;
    }
    const {currentCourse, activeLessonIndex, activeMaterialIndex} = yield select(selectors.coursesManagementSelector);
    const activeMaterial = currentCourse.lessons[activeLessonIndex].materials[activeMaterialIndex];
    try {
        yield put(actions.showWaiting());
        if (ok){
            const choice = ok.payload;
            const newMaterial = yield call(api.updateMaterial, activeMaterial.id, {choiceIds: [...activeMaterial.question, choice.id]});
            yield put(actions.updateSelectedMaterial(newMaterial));
            yield put(actions.selectChoice(newMaterial.question.length-1));
        }else {
            const choice = yield call(api.createMaterial,
                {type: 'choice', instrumentType: activeMaterial.instrumentType, name: '未命名'});
            const newMaterial = yield call(api.updateMaterial, activeMaterial.id, {choiceIds: [...activeMaterial.choiceIds, choice.id]});
            yield put(actions.updateSelectedMaterial(newMaterial));
            yield put(actions.selectChoice(newMaterial.question.length -1));
        }
        yield put(actions.hideWaiting());
    }catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error))
    }
}

function *unbindChord(action) {
    if (yield call(confirmationSaga, '确定移除和弦?')) {
        const index = action.payload;
        const {currentCourse, activeLessonIndex, activeMaterialIndex} = yield select(selectors.coursesManagementSelector);
        const activeMaterial = currentCourse.lessons[activeLessonIndex].materials[activeMaterialIndex];
        let newChordIds = [...activeMaterial.chordIds];
        newChordIds.splice(index, 1);
        try {
            yield put(actions.showWaiting());
            const newMaterial = yield call(api.updateMaterial, activeMaterial.id, {chordIds: newChordIds});
            yield put(actions.updateSelectedMaterial(newMaterial));
            yield put(actions.selectChord(0));
            yield put(actions.hideWaiting());
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}

function *unbindChoice(action) {
    if (yield call(confirmationSaga, '确定移除该选择题')){
        const index = action.payload;
        const {currentCourse, activeLessonIndex, activeMaterialIndex} = yield select(selectors.coursesManagementSelector);
        const activeMaterial = currentCourse.lessons[activeLessonIndex].materials[activeMaterialIndex];
        let newChoiceIds = [...activeMaterial.choiceIds];
        newChoiceIds.splice(index, 1);
        try {
            yield put(actions.showWaiting());
            const newMaterial = yield call(api.updateMaterial, activeMaterial.id, {choiceIds: newChoiceIds});
            yield put(actions.updateSelectedMaterial(newMaterial));
            yield put(actions.selectChoice(0));
            yield put(actions.hideWaiting());
        }catch (error){
            yield put(actions.hideWaiting());
            yield put(actions.showError(error))
        }
    }
}


function *chooseMaterial(action) {
    yield put(actions.showMaterialsChooser());
    const {ok, cancel, custom} = yield race({
        ok: take(actions.MATERIALS_CHOOSER_OK),
        cancel: take(actions.MATERIALS_CHOOSER_CANCEL),
        custom: take(actions.MATERIALS_CHOOSER_CUSTOM)
    });
    yield put(actions.hideMaterialsChooser());
    if (cancel) {
        return;
    }
    const {currentCourse, activeLessonIndex} = yield select(selectors.coursesManagementSelector);
    const activeLesson = currentCourse.lessons[activeLessonIndex];
    try {
        yield put(actions.showWaiting());
        if (ok) {
            const material = ok.payload;
            yield call(api.bindMaterial, activeLesson.id, material.id);
            yield put(actions.selectLesson(activeLessonIndex));
        } else {
            const type = custom.payload;
            const name = '未命名';
            const {instrumentType} = currentCourse;
            const newMaterial = yield call(api.createMaterial, {name, type, instrumentType});
            yield call(api.bindMaterial, activeLesson.id, newMaterial.id);
            yield put(actions.selectLesson(activeLessonIndex));
        }
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error))
    }
}

function *unbindMaterial(action) {
    if (yield call(confirmationSaga, '确认移除素材?')) {
        const assignmentId = action.payload;
        try {
            yield put(actions.showWaiting());
            yield call(api.unbindMaterial, assignmentId);
            const {activeLessonIndex} = yield select(selectors.coursesManagementSelector);
            yield put(actions.selectLesson(activeLessonIndex));
            yield put(actions.hideWaiting());
        } catch (error) {
            yield put(actions.hideWaiting());
            yield put(actions.showError(error));
        }
    }
}

function *requestUpdateSelectedLesson(action) {
    const lesson = action.payload;
    try {
        yield put(actions.showWaiting());
        const newLesson = yield call(api.updateLesson, lesson.id, lesson);
        yield put(actions.updateSelectedLesson(newLesson));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestUpdateSelectedMaterial(action) {
    const material = action.payload;
    try {
        yield put(actions.showWaiting());
        const newMaterial = {...material, ...(yield call(api.updateMaterial, material.id, material))};
        yield call(api.updateMaterialBinding, material.assignmentId, {highlight: material.highlight});
        yield put(actions.updateSelectedMaterial(newMaterial));
        yield put(actions.hideWaiting())
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestUpdateSelectedChord(action) {
    const chord = action.payload;
    try {
        yield put(actions.showWaiting());
        const newChord = yield call(api.updateMaterial, chord.id, chord);
        yield put(actions.updateSelectedChord(newChord));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestUpdateSelectedChoice(action) {
    const choice = action.payload;
    try {
        yield put(actions.showWaiting());
        const newChoice = yield call (api.updateMaterial, choice.id, choice);
        yield put(actions.updateSelectedChoice(newChoice));
        yield put(actions.hideWaiting());
    }catch (error){
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *refreshCurrentCourse() {
    const {currentCourse} = yield select(selectors.coursesManagementSelector);
    try {
        yield actions.showWaiting();
        const newCourse = yield call(api.getCourse, currentCourse.id);
        yield put(actions.updateCourse(newCourse));
        yield actions.hideWaiting();
    } catch (error) {
        yield actions.hideWaiting();
        yield actions.showError(error);
    }
}

function *refreshActiveLesson() {
    const {currentCourse, activeLessonIndex} = yield select(selectors.coursesManagementSelector);
    const activeLesson = currentCourse.lessons[activeLessonIndex];
    try {
        yield actions.showWaiting();
        const newLesson = yield call(api.getLesson, activeLesson.id);
        yield put(actions.updateSelectedLesson(newLesson));
        yield actions.hideWaiting();
    } catch (error) {
        yield actions.hideWaiting();
        yield actions.showError(error);
    }
}

function *requestSortLessons(action) {
    const lessons = action.payload;
    try {
        yield put(actions.showWaiting());
        yield all(lessons.map((lesson, index) => call(api.updateLesson, lesson.id, {order: index})));
        yield call(refreshCurrentCourse);
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *requestSortMaterials(action) {
    const materials = action.payload;
    try {
        yield put(actions.showWaiting());
        yield all(materials.map((material, index) => call(api.updateMaterialBinding, material.assignmentId, {order: index})));
        yield call(refreshActiveLesson);
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *getVerify(action) {
    const phone = action.payload;
    try {
        yield put(actions.showWaiting());
        const verify = yield call(api.getVerify, phone);
        if (verify.error !== 0) {
            throw ('获取验证码失败, 验证码获取成功后会有冷却时间')
        }
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *onVerify(action) {
    const {phone, verify} = action.payload;
    try {
        yield put(actions.showWaiting());
        const data = yield call(api.onVerify, phone, verify);
        if (data.error === 0) {
            const user = yield call(api.login, phone, '123456');
            yield put(actions.loggedIn(user));
            yield call(updateApiToken);
        } else {
            throw ('手机号或验证码错误');
        }
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *usersSaga() {
    yield takeLatest(actions.LOGIN, login);
    yield takeLatest(actions.GET_VERIFY, getVerify);
    yield takeLatest(actions.ON_VERIFY, onVerify);
    yield takeLatest(actions.WAIT_FOR_RAPID_LOGIN, waitForRapidLogin);
    yield takeLatest(actions.LOGGED_IN, loggedIn);
    yield takeLatest(actions.REQUEST_USERS_CHOOSER_USERS, requestUsersChooserUsers);
    yield takeLatest(actions.LOGGED_OUT, loggedOut);
}

function *materialsSaga() {
    yield takeLatest(actions.REQUEST_MATERIALS, requestMaterials);
    yield takeLatest(actions.REQUEST_MATERIAL, requestMaterial);
    yield takeLatest(actions.REQUEST_UPDATE_MATERIAL, requestUpdateMaterial);
    yield takeLatest(actions.REQUEST_CREATE_MATERIAL, requestCreateMaterial);
    yield takeLatest(actions.REQUEST_DELETE_MATERIAL, requestDeleteMaterial);
    yield takeLatest(actions.REQUEST_MATERIALS_CHOOSER_MATERIALS, requestMaterialsChooserMaterials);
    yield takeLatest(actions.REQUEST_CHORDS_CHOOSER_CHORDS, requestChordsChooserChords);
    yield takeLatest(actions.REQUEST_CHOICES_CHOOSER_CHOICES, requestChoicesChooserChoices);
}
function *wechatsSaga() {
    yield takeLatest(actions.REQUEST_WECHATS, requestWechats);
    yield takeLatest(actions.REQUEST_WECHAT, requestWechat);
    yield takeLatest(actions.REQUEST_UPDATE_WECHAT, requestUpdateWechat);
    yield takeLatest(actions.REQUEST_CREATE_WECHAT, requestCreateWechat);
    yield takeLatest(actions.REQUEST_DELETE_WECHAT, requestDeleteWechat);
}

function *wechatClasssSaga() {
    yield takeLatest(actions.REQUEST_WECHAT_CLASSS, requestWechatClasss);
    yield takeLatest(actions.REQUEST_WECHAT_CLASS, requestWechatClass);
    yield takeLatest(actions.REQUEST_UPDATE_WECHAT_CLASS, requestUpdateWechatClass);
    yield takeLatest(actions.REQUEST_CREATE_WECHAT_CLASS, requestCreateWechatClass);
    yield takeLatest(actions.REQUEST_DELETE_WECHAT_CLASS, requestDeleteWechatClass);
}


function *challengesSaga() {
    yield takeLatest(actions.REQUEST_CHALLENGES, requestChallenges);
    yield takeLatest(actions.REQUEST_CHALLENGE, requestChallenge);
    yield takeLatest(actions.REQUEST_UPDATE_CHALLENGE, requestUpdateChallenge);
    yield takeLatest(actions.REQUEST_CREATE_CHALLENGE, requestCreateChallenge);
    yield takeLatest(actions.REQUEST_DELETE_CHALLENGE, requestDeleteChallenge);
}


function *itvsSaga() {
    yield takeLatest(actions.REQUEST_ITVS, requestItvs);
    yield takeLatest(actions.REQUEST_ITV, requestItv);
    yield takeLatest(actions.REQUEST_UPDATE_ITV, requestUpdateItv);
    yield takeLatest(actions.REQUEST_CREATE_ITV, requestCreateItv);
    yield takeLatest(actions.REQUEST_DELETE_ITV, requestDeleteItv);
}


function *coursesSaga() {
    yield takeLatest(actions.REQUEST_COURSES, requestCourses);
    yield takeLatest(actions.REQUEST_COURSE, requestCourse);
    yield takeLatest(actions.REQUEST_UPDATE_COURSE, requestUpdateCourse);
    yield takeLatest(actions.REQUEST_CREATE_COURSE, requestCreateCourse);
    yield takeLatest(actions.REQUEST_DELETE_COURSE, requestDeleteCourse);
    yield takeLatest(actions.SELECT_LESSON, selectLesson);
    yield takeLatest(actions.REQUEST_ADD_LESSON, addLesson);
    yield takeLatest(actions.REQUEST_REMOVE_LESSON, removeLesson);
    yield takeLatest(actions.CHOOSE_MATERIAL, chooseMaterial);
    yield takeLatest(actions.UNBIND_MATERIAL, unbindMaterial);
    yield takeLatest(actions.CHOOSE_CHORD, chooseChord);
    yield takeLatest(actions.CHOOSE_CHOICE, chooseChoice);
    yield takeLatest(actions.UNBIND_CHORD, unbindChord);
    yield takeLatest(actions.UNBIND_CHOICE,unbindChoice);
    yield takeLatest(actions.REQUEST_UPDATE_SELECTED_LESSON, requestUpdateSelectedLesson);
    yield takeLatest(actions.REQUEST_UPDATE_SELECTED_MATERIAL, requestUpdateSelectedMaterial);
    yield takeLatest(actions.REQUEST_UPDATE_SELECTED_CHORD, requestUpdateSelectedChord);
    yield takeLatest(actions.REQUEST_UPDATE_SELECTED_CHOICE, requestUpdateSelectedChoice);
    yield takeLatest(actions.REQUEST_SORT_LESSONS, requestSortLessons);
    yield takeLatest(actions.REQUEST_SORT_MATERIALS, requestSortMaterials);
}

function *initApp() {
    yield put(actions.hideError());
    yield put(actions.hideConfirmation());
    yield put(actions.hideUsersChooser());
    yield put(actions.hideMaterialsChooser());
    yield put(actions.hideChordsChooser());
    yield put(actions.hideChoicesChooser());
    yield put(actions.selectCourse());
    const currentCourse = (yield select(selectors.coursesManagementSelector)).currentCourse;
    if (currentCourse !== null) {
        currentCourse.lessons = [];
        yield put(actions.updateCourse(currentCourse));
    }
    try {
        yield put(actions.showWaiting());
        let guitarTuningMethods = yield call(api.getTuningMethods, 'guitar');
        let ukuleleTuningMethods = yield call(api.getTuningMethods, 'ukulele');
        let kalimbaTuningMethods = yield call(api.getTuningMethods, 'kalimba');
        let djembeTuningMethods = yield call(api.getTuningMethods, 'djembe');
        let music_basisTuningMethods = yield call(api.getTuningMethods, 'music_basis')
        yield put(actions.updateTuningMethods({guitar: guitarTuningMethods, ukulele: ukuleleTuningMethods, kalimba: kalimbaTuningMethods, djembe:djembeTuningMethods, music_basis:music_basisTuningMethods}));
        yield put(actions.hideWaiting());
    } catch (error) {
        yield put(actions.hideWaiting());
        yield put(actions.showError(error));
    }
}

function *appStartSaga() {
    yield takeLatest(actions.APP_START, updateApiToken);
    yield takeLatest(actions.APP_START, initApp);
}

function *confirmationSaga(message) {
    yield put(actions.showConfirmation(message));

    const {ok} = yield race({
        ok: take(actions.CONFIRM_OK),
        cancel: take(actions.CONFIRM_CANCEL)
    });

    yield put(actions.hideConfirmation());
    return !!ok;
}

function *rootSaga() {
    yield fork(watchAdd);
    yield fork(watchDec);
    yield fork(appStartSaga);
    yield fork(usersSaga);
    yield fork(materialsSaga);
    yield fork(wechatsSaga);
    yield fork(wechatClasssSaga);
    yield fork(coursesSaga);
    yield fork(challengesSaga);
    yield fork(itvsSaga);
}

export default rootSaga
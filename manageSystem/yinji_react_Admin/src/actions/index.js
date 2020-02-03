/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/13 下午6:29
 */

import {createAction} from "redux-actions";

const action = (type, payload) => ({type, payload});

export const TO_DEC = 'TO_DEC';

export const APP_START = 'APP_START';
export const CLEAR_STORE = 'CLEAR_STORE';

export const LOGIN = 'LOGIN';
export const WAIT_FOR_RAPID_LOGIN = 'WAIT_FOR_RAPID_LOGIN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const SHOW_WAITING = 'SHOW_WAITING';
export const HIDE_WAITING = 'HIDE_WAITING';
export const SHOW_CONFIRMATION = 'SHOW_CONFIRMATION';
export const HIDE_CONFIRMATION = 'HIDE_CONFIRMATION';
export const CONFIRM_OK = 'CONFIRM_OK';
export const CONFIRM_CANCEL = 'CONFIRM_CANCEL';

export const REQUEST_MATERIALS = 'REQUEST_MATERIALS';
export const REQUEST_WECHATS = 'REQUEST_WECHATS';
export const UPDATE_WECHATS = 'UPDATE_WECHATS';
export const UPDATE_WECHAT = 'UPDATE_WECHAT';
export const REQUEST_WECHAT = 'REQUEST_WECHAT';
export const REQUEST_UPDATE_WECHAT = 'REQUEST_UPDATE_WECHAT';
export const REQUEST_CREATE_WECHAT = 'REQUEST_CREATE_WECHAT';

export const REQUEST_WECHAT_CLASSS = 'REQUEST_WECHAT_CLASSS';
export const UPDATE_WECHAT_CLASSS = 'UPDATE_WECHAT_CLASSS';
export const UPDATE_WECHAT_CLASS = 'UPDATE_WECHAT_CLASS';
export const REQUEST_WECHAT_CLASS = 'REQUEST_WECHAT_CLASS';
export const REQUEST_UPDATE_WECHAT_CLASS = 'REQUEST_UPDATE_WECHAT_CLASS';
export const REQUEST_CREATE_WECHAT_CLASS = 'REQUEST_CREATE_WECHAT_CLASS';
export const REQUEST_DELETE_WECHAT_CLASS = 'REQUEST_DELETE_WECHAT_CLASS';



export const REQUEST_CHALLENGES = 'REQUEST_CHALLENGES';
export const UPDATE_CHALLENGES = 'UPDATE_CHALLENGES';
export const UPDATE_CHALLENGE = 'UPDATE_CHALLENGE';
export const REQUEST_CHALLENGE = 'REQUEST_CHALLENGE';
export const REQUEST_UPDATE_CHALLENGE = 'REQUEST_UPDATE_CHALLENGE';
export const REQUEST_CREATE_CHALLENGE = 'REQUEST_CREATE_CHALLENGE';
export const REQUEST_DELETE_CHALLENGE = 'REQUEST_DELETE_CHALLENGE';


export const REQUEST_ITVS = 'REQUEST_ITVS';
export const UPDATE_ITVS = 'UPDATE_ITVS';
export const UPDATE_ITV = 'UPDATE_ITV';
export const REQUEST_ITV = 'REQUEST_ITV';
export const REQUEST_UPDATE_ITV = 'REQUEST_UPDATE_ITV';
export const REQUEST_CREATE_ITV = 'REQUEST_CREATE_ITV';
export const REQUEST_DELETE_ITV = 'REQUEST_DELETE_ITV';



export const UPDATE_MATERIALS = 'UPDATE_MATERIALS';
export const REQUEST_MATERIAL = 'REQUEST_MATERIAL';
export const UPDATE_MATERIAL = 'UPDATE_MATERIAL';
export const REQUEST_UPDATE_MATERIAL = 'REQUEST_UPDATE_MATERIAL';
export const REQUEST_CREATE_MATERIAL = 'REQUEST_CREATE_MATERIAL';
export const REQUEST_DELETE_MATERIAL = 'REQUEST_DELETE_MATERIAL';
export const REQUEST_DELETE_WECHAT = 'REQUEST_DELETE_WECHAT';
export const UPDATE_TUNING_METHODS = 'UPDATE_TUNING_METHODS';

export const REQUEST_COURSES = 'REQUEST_COURSES';
export const UPDATE_COURSES = 'UPDATE_COURSES';
export const REQUEST_COURSE = 'REQUEST_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const REQUEST_UPDATE_COURSE = 'REQUEST_UPDATE_COURSE';
export const REQUEST_CREATE_COURSE = 'REQUEST_CREATE_COURSE';
export const REQUEST_DELETE_COURSE = 'REQUEST_DELETE_COURSE';
export const REQUEST_UNACTIVE = 'REQUEST_UNACTIVE';
export const SELECT_COURSE = 'SELECT_COURSE';
export const SELECT_LESSON = 'SELECT_LESSON';
export const SELECT_MATERIAL = 'SELECT_MATERIAL';
export const SELECT_CHORD = 'SELECT_CHORD';
export const SELECT_CHOICE= 'SELECT_CHOICE';
export const UPDATE_SELECTED_LESSON = 'UPDATE_SELECTED_LESSON';
export const UPDATE_SELECTED_MATERIAL = 'UPDATE_SELECTED_MATERIAL';
export const UPDATE_SELECTED_CHORD = 'UPDATE_SELECTED_CHORD';
export const UPDATE_SELECTED_CHOICE = 'UPDATE_SELECTED_CHOICE';
export const CHOOSE_MATERIAL = 'CHOOSE_MATERIAL';
export const UNBIND_MATERIAL = 'UNBIND_MATERIAL';
export const CHOOSE_CHORD = 'CHOOSE_CHORD';
export const CHOOSE_CHOICE = 'CHOOSE_CHOICE';
export const UNBIND_CHORD = 'UNBIND_CHORD';
export const UNBIND_CHOICE = 'UNBIND_CHOICE';
export const REQUEST_UPDATE_SELECTED_LESSON = 'REQUEST_UPDATE_SELECTED_LESSON';
export const REQUEST_UPDATE_SELECTED_MATERIAL = 'REQUEST_UPDATE_SELECTED_MATERIAL';
export const REQUEST_UPDATE_SELECTED_CHORD = 'REQUEST_UPDATE_SELECTED_CHORD';
export const REQUEST_UPDATE_SELECTED_CHOICE = 'REQUEST_UPDATE_SELECTED_CHOICE';
export const REQUEST_SORT_LESSONS = 'REQUEST_SORT_LESSONS';
export const REQUEST_SORT_MATERIALS = 'REQUEST_SORT_MATERIALS';

export const REQUEST_LESSONS = 'REQUEST_LESSONS';
export const UPDATE_LESSONS = 'UPDATE_LESSONS';
export const REQUEST_LESSON = 'REQUEST_LESSON';
export const UPDATE_LESSON = 'UPDATE_LESSON';
export const REQUEST_UPDATE_LESSON = 'REQUEST_UPDATE_LESSON';
export const REQUEST_ADD_LESSON = 'REQUEST_ADD_LESSON';
export const REQUEST_REMOVE_LESSON = 'REQUEST_REMOVE_LESSON';

export const INC = 'INC';
export const DEC = 'DEC';
export const TO_INC = 'TO_INC';

export const REQUEST_USERS_CHOOSER_USERS = 'REQUEST_USERS_CHOOSER_USERS';
export const UPDATE_USERS_CHOOSER_USERS = 'UPDATE_USERS_CHOOSER_USERS';
export const UPDATE_USERS_CHOOSER_SELECTED_INDEX = 'UPDATE_USERS_CHOOSER_SELECTED_INDEX';
export const SHOW_USERS_CHOOSER = 'SHOW_USERS_CHOOSER';
export const HIDE_USERS_CHOOSER = 'HIDE_USERS_CHOOSER';

export const REQUEST_MATERIALS_CHOOSER_MATERIALS = 'REQUEST_MATERIALS_CHOOSER_MATERIALS';
export const UPDATE_MATERIALS_CHOOSER_MATERIALS = 'UPDATE_MATERIALS_CHOOSER_MATERIALS';
export const UPDATE_MATERIALS_CHOOSER_SELECTED_INDEX = 'UPDATE_MATERIALS_CHOOSER_SELECTED_INDEX';
export const SHOW_MATERIALS_CHOOSER = 'SHOW_MATERIALS_CHOOSER';
export const HIDE_MATERIALS_CHOOSER = 'HIDE_MATERIALS_CHOOSER';
export const MATERIALS_CHOOSER_OK = 'MATERIALS_CHOOSER_OK';
export const MATERIALS_CHOOSER_CANCEL = 'MATERIALS_CHOOSER_CANCEL';
export const MATERIALS_CHOOSER_CUSTOM = 'MATERIALS_CHOOSER_CUSTOM';

export const REQUEST_CHORDS_CHOOSER_CHORDS = 'REQUEST_CHORDS_CHOOSER_CHORDS';
export const REQUEST_CHOICES_CHOOSER_CHOICES = 'REQUEST_CHOICES_CHOOSER_CHOICES';
export const UPDATE_CHORDS_CHOOSER_CHORDS = 'UPDATE_CHORDS_CHOOSER_CHORDS';
export const UPDATE_CHOICE_CHOOSER_CHOICE = 'UPDATA_CHOICE_CHOOSER_CHOICE';
export const UPDATE_CHORDS_CHOOSER_SELECTED_INDEX = 'UPDATE_CHORDS_CHOOSER_SELECTED_INDEX';
export const UPDATE_CHOICE_CHOOSER_SELECTED_INDEX = 'UPDATE_CHOICE_CHOOSER_SELECTED_INDEX';
export const SHOW_CHORDS_CHOOSER = 'SHOW_CHORDS_CHOOSER';
export const SHOW_CHOICE_CHOOSER = 'SHOW_CHOICE_CHOOSER';
export const HIDE_CHORDS_CHOOSER = 'HIDE_CHORDS_CHOOSER';
export const HIDE_CHOICE_CHOOSER = 'HIDE_CHOICE_CHOOSER';
export const CHORDS_CHOOSER_OK = 'CHORDS_CHOOSER_OK';
export const CHOICE_CHOOSER_OK = 'CHOICE_CHOOSER_OK';
export const CHORDS_CHOOSER_CANCEL = 'CHORDS_CHOOSER_CANCEL';
export const CHOICE_CHOOSER_CNACEL = 'CHOICE_CHOOSER_CNACEL';
export const CHORDS_CHOOSER_CUSTOM = 'CHORDS_CHOOSER_CUSTOM';
export const CHOICE_CHOOSER_CUSTOM = 'CHOICE_CHOOSER_CUSTOM';
export const GET_VERIFY = 'GET_VERIFY';
export const ON_VERIFY = 'ON_VERIFY';

export const inc = createAction(INC);
export const dec = createAction(DEC);
export const toInc = createAction(TO_INC);
export const toDec = createAction(TO_DEC);

export const appStart = () => action(APP_START);
export const clearStore = () => action(CLEAR_STORE);

export const login = (username, password) => action(LOGIN, {username, password});
export const waitForRapidLogin = (key) => action(WAIT_FOR_RAPID_LOGIN, key);
export const loggedIn = (user) => action(LOGGED_IN, user);
export const loggedOut = createAction(LOGGED_OUT);

export const showError = (error) => action(SHOW_ERROR, error);
export const hideError = () => action(HIDE_ERROR);
export const showWaiting = () => action(SHOW_WAITING);
export const hideWaiting = () => action(HIDE_WAITING);
export const showConfirmation = (message) => action(SHOW_CONFIRMATION, message);
export const hideConfirmation = () => action(HIDE_CONFIRMATION);
export const confirmOk = () => action(CONFIRM_OK);
export const confirmCancel = () => action(CONFIRM_CANCEL);

export const requestMaterials = (payload) => action(REQUEST_MATERIALS, payload || {});
export const requestWechat = (id) => action(REQUEST_WECHAT, id);
export const requestWechats = (payload) => action(REQUEST_WECHATS, payload || {});
export const updateWechats = ({wechats, total}) => action(UPDATE_WECHATS, {wechats, total});
export const updateMaterials = ({materials, total}) => action(UPDATE_MATERIALS,
    {materials, total});
export const requestMaterial = (id) => action(REQUEST_MATERIAL, id);

export const updateWechat = (wechat) => action(UPDATE_WECHAT, wechat);
export const requestUpdateWechat = (wechat) => action(REQUEST_UPDATE_WECHAT, wechat);
export const requestCreateWechat = (wechat) => action(REQUEST_CREATE_WECHAT, wechat);
export const updateMaterial = (material) => action(UPDATE_MATERIAL, material);
export const requestDeleteWechat = (id) => action(REQUEST_DELETE_WECHAT, id);

export const requestWechatClass = (id) => action(REQUEST_WECHAT_CLASS, id);
export const requestWechatClasss = (payload) => action(REQUEST_WECHAT_CLASSS, payload || {});
export const updateWechatClasss = ({wechatClasss, total}) => action(UPDATE_WECHAT_CLASSS, {wechatClasss, total});
export const updateWechatClass = (wechatClass) => action(UPDATE_WECHAT_CLASS, wechatClass);
export const requestUpdateWechatClass = (wechatClass) => action(REQUEST_UPDATE_WECHAT_CLASS, wechatClass);
export const requestCreateWechatClass = (wechatClass) => action(REQUEST_CREATE_WECHAT_CLASS, wechatClass);
export const requestDeleteWechatClass = (id) => action(REQUEST_DELETE_WECHAT_CLASS, id);


export const requestChallenge = (id) => action(REQUEST_CHALLENGE, id);
export const requestChallenges = (payload) => action(REQUEST_CHALLENGES, payload || {});
export const updateChallenges = ({challenges, total}) => action(UPDATE_CHALLENGES, {challenges, total});
export const updateChallenge = (challenge) => action(UPDATE_CHALLENGE, challenge);
export const requestUpdateChallenge = (challenge) => action(REQUEST_UPDATE_CHALLENGE, challenge);
export const requestCreateChallenge = (challenge) => action(REQUEST_CREATE_CHALLENGE, challenge);
export const requestDeleteChallenge = (id) => action(REQUEST_DELETE_CHALLENGE, id);

export const requestItv = (id) => action(REQUEST_ITV, id);
export const requestItvs = (payload) => action(REQUEST_ITVS, payload || {});
export const updateItvs = ({itvs, total}) => action(UPDATE_ITVS, {itvs, total});
export const updateItv = (itv) => action(UPDATE_ITV, itv);
export const requestUpdateItv = (itv) => action(REQUEST_UPDATE_ITV, itv);
export const requestCreateItv = (itv) => action(REQUEST_CREATE_ITV, itv);
export const requestDeleteItv = (id) => action(REQUEST_DELETE_ITV, id);


export const requestUpdateMaterial = (material) => action(REQUEST_UPDATE_MATERIAL, material);
export const requestCreateMaterial = (material) => action(REQUEST_CREATE_MATERIAL, material);
export const requestDeleteMaterial = (id) => action(REQUEST_DELETE_MATERIAL, id);
export const updateTuningMethods = (methods) => action(UPDATE_TUNING_METHODS, methods);

export const requestCourses = (payload) => action(REQUEST_COURSES, payload || {});
export const updateCourses = ({courses, total}) => action(UPDATE_COURSES,
    {courses, total});
export const requestCourse = (id) => action(REQUEST_COURSE, id);
export const updateCourse = (course) => action(UPDATE_COURSE, course);
export const requestUpdateCourse = (course) => action(REQUEST_UPDATE_COURSE, course);
export const requestCreateCourse = (course) => action(REQUEST_CREATE_COURSE, course);
export const requestDeleteCourse = (id) => action(REQUEST_DELETE_COURSE, id);
export const requestUnactive = ({id, course}) => action(REQUEST_UNACTIVE, {id, course})
export const selectCourse = () => action(SELECT_COURSE);
export const selectLesson = (index) => action(SELECT_LESSON, index);
export const selectMaterial = (index) => action(SELECT_MATERIAL, index);
export const selectChord = (index) => action(SELECT_CHORD, index);
export const selectChoice = (index) => action(SELECT_CHOICE, index);
export const updateSelectedLesson = (lesson) => action(UPDATE_SELECTED_LESSON, lesson);
export const updateSelectedMaterial = (material) => action(UPDATE_SELECTED_MATERIAL, material);
export const updateSelectedChord = (chord) => action(UPDATE_SELECTED_CHORD, chord);
export const updateSelectedChoice = (choice) => action(UPDATE_SELECTED_CHOICE, choice);
export const chooseMaterial = () => action(CHOOSE_MATERIAL);
export const unbindMaterial = (assignmentId) => action(UNBIND_MATERIAL, assignmentId);
export const chooseChord = () => action(CHOOSE_CHORD);
export const chooseChoice = () => action(CHOOSE_CHOICE);
export const unbindChord = (index) => action(UNBIND_CHORD, index);
export const unbindChoice = (index) => action(UNBIND_CHOICE, index);
export const requestUpdateSelectedLesson = (lesson) => action(REQUEST_UPDATE_SELECTED_LESSON, lesson);
export const requestUpdateSelectedMaterial = (material) => action(REQUEST_UPDATE_SELECTED_MATERIAL, material);
export const requestUpdateSelectedChord = (chord) => action(REQUEST_UPDATE_SELECTED_CHORD, chord);
export const requestUpdateSelectedChoice = (choice) => action(REQUEST_UPDATE_SELECTED_CHOICE, choice);

export const requestSortLessons = (lessons) => action(REQUEST_SORT_LESSONS, lessons);
export const requestSortMaterials = (materials) => action(REQUEST_SORT_MATERIALS, materials);
export const requestAddLesson = (lesson) => action(REQUEST_ADD_LESSON, lesson);
export const requestRemoveLesson = (id) => action(REQUEST_REMOVE_LESSON, id);

export const requestUsersChooserUsers = ({page, size, keyword, isTeacher}) => action(REQUEST_USERS_CHOOSER_USERS,
    {page, size, keyword, isTeacher});
export const updateUsersChooserUsers = ({users, total}) => action(UPDATE_USERS_CHOOSER_USERS, {users, total});
export const updateUsersChooserSelectedIndex = (index) => action(UPDATE_USERS_CHOOSER_SELECTED_INDEX, index);
export const showUsersChooser = () => action(SHOW_USERS_CHOOSER);
export const hideUsersChooser = () => action(HIDE_USERS_CHOOSER);

export const requestMaterialsChooserMaterials = (condition) => action(REQUEST_MATERIALS_CHOOSER_MATERIALS, condition);
export const updateMaterialsChooserMaterials = ({materials, total}) => action(UPDATE_MATERIALS_CHOOSER_MATERIALS,
    {materials, total});
export const updateMaterialsChooserSelectedIndex = (index) => action(UPDATE_MATERIALS_CHOOSER_SELECTED_INDEX, index);
export const showMaterialsChooser = () => action(SHOW_MATERIALS_CHOOSER);
export const hideMaterialsChooser = () => action(HIDE_MATERIALS_CHOOSER);
export const materialsChooserOk = (material) => action(MATERIALS_CHOOSER_OK, material);
export const materialsChooserCancel = () => action(MATERIALS_CHOOSER_CANCEL);
export const materialsChooserCustom = (type) => action(MATERIALS_CHOOSER_CUSTOM, type);

export const requestChordsChooserChords = (condition) => action(REQUEST_CHORDS_CHOOSER_CHORDS, condition);
export const requestChoicesChooserChoices = (condition) => action(REQUEST_CHOICES_CHOOSER_CHOICES, condition);
export const updateChordsChooserChords = (chords) => action(UPDATE_CHORDS_CHOOSER_CHORDS, chords);
export const updateChoiceChooserChoice = (question) => action(UPDATE_CHOICE_CHOOSER_CHOICE, question);
export const updateChordsChooserSelectedIndex = (index) => action(UPDATE_CHORDS_CHOOSER_SELECTED_INDEX, index);
export const updateChoicesChooserSelectedIndex = (index) => action(UPDATE_CHOICE_CHOOSER_SELECTED_INDEX, index);
export const showChordsChooser = () => action(SHOW_CHORDS_CHOOSER);
export const showChoiceChooser = () => action(SHOW_CHOICE_CHOOSER);
export const hideChordsChooser = () => action(HIDE_CHORDS_CHOOSER);
export const hideChoicesChooser = () => action(HIDE_CHOICE_CHOOSER);
export const chordsChooserOk = (chord) => action(CHORDS_CHOOSER_OK, chord);
export const choicesChooserOk = (choice) => action(CHOICE_CHOOSER_OK, choice);
export const chordsChooserCancel = () => action(CHORDS_CHOOSER_CANCEL);
export const choicesChooserCancel = () => action(CHOICE_CHOOSER_CNACEL);
export const chordsChooserCustom = () => action(CHORDS_CHOOSER_CUSTOM);
export const choicesChooserCustom = () => action(CHOICE_CHOOSER_CUSTOM);


export const getVerify = (phone) => action(GET_VERIFY, phone);
export const onVerify = (phone, verify) => action(ON_VERIFY, {phone, verify});

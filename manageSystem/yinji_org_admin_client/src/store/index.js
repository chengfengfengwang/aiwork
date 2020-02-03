import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
function getIndex(arr, id) {
    var temp;
    arr.forEach((v, i) => {
        //console.log(v)
        if (v.id == id) {
            //console.log('xxx' + i)
            temp = i
        }
    })
    return temp
}
var oUserInfo = localStorage.getItem('userInfo'), userInfo;
if (oUserInfo && oUserInfo != 'undefined') {
    userInfo = JSON.parse(oUserInfo)
} else {
    userInfo = {}
}
//const userInfo = (oUserInfo && oUserInfo !== 'undefined) ? JSON.parse(oUserInfo) : {}
const state = {
    cardArr: [],
    gridArr: [],
    yzXnArr: [],
    userInfo: userInfo,
};
const getters = {
    lessonTypes: state => {
        return Object.keys(state.userInfo.student_count) 
    },
    hasCheckPower: state => {
        return state.userInfo.open_audit===1
    },
    proxyId: state => {
        return state.userInfo.proxy_id
    },
    orgId: state => {
        return state.userInfo.institutions_id
    },
    user: state => {
        return state.userInfo
    },
    role: state => {
        return state.userInfo.role
    },
    level: state => {
        return state.userInfo.level
    },
    wholeArea: state => {
        return state.userInfo.whole_area
    },

};
const mutations = {
    //存储用户信息
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo
    }
};
const actions = {
    //存储用户信息
    updateUserInfo({ commit }, userInfo) {
        commit('updateUserInfo', userInfo)
    }
};
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

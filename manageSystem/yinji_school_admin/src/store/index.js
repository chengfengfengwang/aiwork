import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const schoolInfo = {
    school_id: localStorage.getItem('school_id') ? localStorage.getItem('school_id') : ''
}
const state = {
    schoolInfo:schoolInfo,
};
const mutations = {
    //存储用户信息
    updateschoolInfo(state,schoolInfo){
        state.schoolInfo = schoolInfo
    },
};
const actions = {
    //存储用户信息
    updateschoolInfo({ commit },schoolInfo){
        commit('updateschoolInfo',schoolInfo)
    }
};
export default new Vuex.Store({
    state,
    mutations,
    actions
})

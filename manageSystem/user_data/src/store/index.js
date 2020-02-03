import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
function getIndex(arr,id){
    var temp;
    arr.forEach((v,i)=>{
        //console.log(v)
        if(v.id==id){
            //console.log('xxx' + i)
            temp =  i
        }
    })
    return temp
}
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
const state = {
    cardArr: [],
    gridArr: [],
    yzXnArr:[],
    userInfo:userInfo,
    uploadUrl:process.env.UPLOAD_URL,
    a:'a',
    b:'b'
};
const mutations = {
    //存储用户信息
    updateUserInfo(state,userInfo){
        state.userInfo = userInfo
    },
    //卡牌
    addCard(state, card) {
        state.cardArr.push(card)
    },
    removeCard(state, card,value) {
        state.cardArr.splice(state.cardArr.indexOf(card), 1)
    },
    editCard(state, obj) {
        var index = getIndex(state.cardArr,obj.id);
        state.cardArr.splice(index, 1,obj.data)
    },
    replaceCardArr(state,arr){
        state.cardArr = arr;
    },
    //九宫格
    addGrid(state, grid) {
        state.gridArr.push(grid)
    },
    removeGrid(state, grid,value) {
        state.gridArr.splice(state.gridArr.indexOf(grid), 1)
    },
    editGrid(state, obj) {
        var index = getIndex(state.gridArr,obj.id);
        state.gridArr.splice(index, 1,obj.data)
    },
    replaceGridArr(state,arr){
        state.gridArr = arr;
    }
};
const actions = {
    //存储用户信息
    updateUserInfo({ commit },userInfo){
        commit('updateUserInfo',userInfo)
    },
    //卡牌
    addCard({ commit }) {
        commit('addCard', {
            topic: "",
            answer: "",
            status: "",
            respondence: "",
            id:new Date().valueOf()+''
        })
    },
    removeCard({ commit }, card) {
        commit('removeCard', card)
    },
    editCard({ commit }, obj) {
        commit('editCard', obj)
    },
    replaceCardArr({ commit },arr){
        commit('replaceCardArr', arr)
    },
    //九宫格
    addGrid({ commit }) {
        commit('addGrid', {
            left: "",
            right: "",
            id:new Date().valueOf()+''
        })
    },
    removeGrid({ commit }, card) {
        commit('removeGrid', card)
    },
    editGrid({ commit }, obj) {
        commit('editGrid', obj)
    },
    replaceGridArr({ commit },arr){
        commit('replaceGridArr', arr)
    },
};
export default new Vuex.Store({
    state,
    mutations,
    actions
})

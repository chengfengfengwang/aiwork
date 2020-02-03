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
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
const state = {
    userInfo: userInfo
};
const getters = {
    role: state => {
        switch (state.userInfo.permission) {
            case 0:
                return '管理员';
                break;
            case 1:
                return '组长';
                break;
            case 2:
                return '组员';
                break;
        }
    },
    permission:state=>{
        return state.userInfo.permission
    }

};
const mutations = {
    //存储用户信息
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    //卡牌
    addCard(state, card) {
        state.cardArr.push(card)
    },
    removeCard(state, card, value) {
        state.cardArr.splice(state.cardArr.indexOf(card), 1)
    },
    editCard(state, obj) {
        var index = getIndex(state.cardArr, obj.id);
        state.cardArr.splice(index, 1, obj.data)
    },
    replaceCardArr(state, arr) {
        state.cardArr = arr;
    },
    //九宫格
    addGrid(state, grid) {
        state.gridArr.push(grid)
    },
    removeGrid(state, grid, value) {
        state.gridArr.splice(state.gridArr.indexOf(grid), 1)
    },
    editGrid(state, obj) {
        var index = getIndex(state.gridArr, obj.id);
        state.gridArr.splice(index, 1, obj.data)
    },
    replaceGridArr(state, arr) {
        state.gridArr = arr;
    },
    //音高
    addYg(state, yg) {
        state.ygArr.push(yg)
    },
    removeYg(state, index, value) {
        state.ygArr.splice(index, 1)
    },
    editYg(state, obj) {
        var index = getIndex(state.ygArr, obj.id);
        state.ygArr.splice(index, 1, obj.data)
    },
    replaceYgArr(state, arr) {
        state.ygArr = arr;
    },
    downYg(state, yg) {
        //var index = state.ygArr.indexOf(yg);
        var index = yg;
        console.log(index)
        if (index == state.ygArr.length - 1) {
            console.log('qweqwewqe')
            return
        }
        var temp = state.ygArr[index];
        state.ygArr[index] = state.ygArr[index + 1];
        state.ygArr[index + 1] = temp;
    },
    upYg(state, yg) {
        //var index = state.ygArr.indexOf(yg);
        var index = yg;
        if (index == 0) {
            return
        }
        var temp = state.ygArr[index];
        state.ygArr[index] = state.ygArr[index - 1];
        state.ygArr[index - 1] = temp;
    },
    emptyYg(state) {
        state.ygArr = []
    }
};
const actions = {
    //存储用户信息
    updateUserInfo({ commit }, userInfo) {
        commit('updateUserInfo', userInfo)
    },
    //卡牌
    addCard({ commit }) {
        commit('addCard', {
            topic: "",
            answer: "",
            status: "",
            respondence: "",
            id: new Date().valueOf() + ''
        })
    },
    removeCard({ commit }, card) {
        commit('removeCard', card)
    },
    editCard({ commit }, obj) {
        commit('editCard', obj)
    },
    replaceCardArr({ commit }, arr) {
        commit('replaceCardArr', arr)
    },
    //九宫格
    addGrid({ commit }) {
        commit('addGrid', {
            left: "",
            right: "",
            id: new Date().valueOf() + ''
        })
    },
    removeGrid({ commit }, card) {
        commit('removeGrid', card)
    },
    editGrid({ commit }, obj) {
        commit('editGrid', obj)
    },
    replaceGridArr({ commit }, arr) {
        commit('replaceGridArr', arr)
    },
    //音高
    addYg({ commit }, obj) {
        commit('addYg', obj)
    },
    removeYg({ commit }, index) {
        commit('removeYg', index)
    },
    editYg({ commit }, obj) {
        commit('editYg', obj)
    },
    replaceYgArr({ commit }, arr) {
        commit('replaceYgArr', arr)
    },
    downYg({ commit }, yg) {
        commit('downYg', yg)
    },
    upYg({ commit }, yg) {
        commit('upYg', yg)
    },
    emptyYg({ commit }) {
        commit('emptyYg')
    }
};
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

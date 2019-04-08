import Axios from "axios";

const state = {             //管理状态
    expenseOrderAdd: '',       //新增时需要显示的数据
}

const mutations = {
    setAddRowData(state,data){
        state.expenseOrderAdd = data;
    }
}

const actions = {
    getAddRowData({ state,commit, rootState }, params) {       //获取新增需要的数据 
        Axios.get(params).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setAddRowData', res.data.data);
                }
            }
        });
    },
    getObjectData({ state,commit, rootState }, params) {       //获取往来末级科目数据
        Axios.get(params).then(res => {
            console.log('末级科目',res)
            // if(res.data.code == 20001) {
            //     if(res.data.data) {
            //         commit('setAddRowData', res.data.data);
            //     }
            // }
        });
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
import Axios from "axios";

const state = {
    tableData:[],
    rowId:'',
}

const mutations = {
    setTableData(state,data){
        let tableData = state.tableData;
        if(data.length > 0) {
            tableData.length = 0;
            data.forEach(item => tableData.push(item));
        } else {
            tableData.splice(0);
        }
    },
    updateRowId(state,$id){
        state.rowId = $id;
    }
}

const actions = {
    getTableData({state, commit, rootState}, $url){
        Axios.get($url).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    commit('setTableData', res.data.data);
                }
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
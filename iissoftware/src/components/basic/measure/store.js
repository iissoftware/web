import Axios from "axios";

const state = {     //管理状态
    tableData1: [],     //单位组数据
    tableData2: [],     //计量单位数据
    rowId: '',          //修改的行id
    searchData: [],     //单位组搜索
    searchDataTwo:[],   //计量单位搜索
}

const mutations = {
    updateData1(state, params) {        //更新单位组状态
        state.tableData1.length = 0;
        params.forEach(item => {
            state.tableData1.push(item);
        });
    },
    updateData2(state, params) {        //更新计量单位状态
        state.tableData2.length = 0;
        params.forEach(item => {
            state.tableData2.unshift(item);
        });
    },
    updateRowId(state, id) {            //更新行id
        state.rowId = id;
    },
    setContext(state,data){                 //单位组查询按钮
        let searchData = state.searchData;
        if(data.length > 0) {
            searchData.length = 0;
            data.forEach(item => searchData.push(item));
        } else {
            searchData.splice(0);
        }
    },
    setContextTwo(state,data){                 //计量单位查询按钮
        let searchDataTwo = state.searchDataTwo;
        if(data.length > 0) {
            searchDataTwo.length = 0;
            data.forEach(item => searchDataTwo.push(item));
        } else {
            searchDataTwo.splice(0);
        }
    },
}

const actions = {
    getData1({ commit }, $http) {            //获取单位组数据
        Axios.get($http + 'measureUnit/selectGroup').then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateData1', res.data.data);
                }
            }
        });
    },
    getData2({ commit }, $http) {           //获取计量单位数据
        Axios.get($http + 'measureUnit/selectUnit').then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateData2', res.data.data);
                }
            }
        });
    },
    getSearch({ state,commit,rootState }, $url){
        Axios.get($url).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    commit('setContext',res.data.data)
                }
            }
        })
    },
    getSearchTwo({ state,commit,rootState }, $url){
        Axios.get($url).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    commit('setContextTwo',res.data.data)
                }
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
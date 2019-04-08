import Axios from "axios";

const state = {     //管理状态
    formData: '',   //费用报销单模板新增时显示的数据
    secondarySubject: [],   //二级科目
    TreeSubject: [],        //三级科目
    FourSubject: [],        //三级科目
    tableData: [],          //模板表格数据
    rowId: '',              //修改传过来的id
    tableUpdateData: '',    //要修改的数据
    searchAllResult: [],    //搜索数据
}

const mutations = {
    setFormData(state,data){
        state.formData = data;
    },
    setTreeDataNo(state,data){
        let secondarySubject = state.secondarySubject;
        secondarySubject.length = 0;
        data.forEach(item => secondarySubject.push(item));
    },
    setTreeDataNoTree(state,data){
        let TreeSubject = state.TreeSubject;
        TreeSubject.length = 0;
        data.forEach(item => TreeSubject.push(item));
    },
    setTreeDataNoFour(state,data){
        let FourSubject = state.FourSubject;
        FourSubject.length = 0;
        data.forEach(item => FourSubject.push(item));
    },
    setTableData(state,data){
        let tableData = state.tableData;
        tableData.length = 0;
        data.forEach(item => {tableData.push(item)})
    },
    updateRowId(state, id) {            //更改行id
        state.rowId = id;
    },
    setUpdateTableData(state,data){
        state.tableUpdateData = data;
    }
}

const actions = {
    getFormData({ state,commit, rootState }, params) {//获取模板新增信息
        Axios.get(params).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setFormData',res.data.data)
                }
            }
        });
    },
    getSubjectData({state, dispatch, commit}, $url){//获取二级科目数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setTreeDataNo', res.data.data);
                }
            }
        });
    },
    getSubjectDataTree({state, dispatch, commit}, $url){//获取三级科目数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setTreeDataNoTree', res.data.data);
                }
            }
        });
    },
    getSubjectDataFour({state, dispatch, commit}, $url){//获取四级科目数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setTreeDataNoFour', res.data.data);
                }
            }
        });
    },
    getTableData({state, dispatch, commit}, $url){//获取表格数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let searchAllResult = state.searchAllResult,
                        data = res.data.data;
                    state.searchAllResult.length = 0;
                    data.forEach(item => searchAllResult.push(item));
                    commit('setTableData', res.data.data);
                }
            }
        });
    },
    getUpdateFormData({state, dispatch, commit}, $url){//获取修改的数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setUpdateTableData', res.data.data);
                }
            }
        });
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
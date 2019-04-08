import Axios from "axios";

const state = {
    treeData: [],       //左侧树形结构数据
    tableData: [],      //右侧表格数据
    expandNodeId: [],
    currentNodeId: '',      //当前选中的节点id
    currentRow: [],     //当前选中的树形节点
    lastType: [],       //上级类别
    rowId: '',      //当条修改id
    searchData: [],     //搜索
}

const mutations = {
    updateTreeData(state, arr) {            //更新树形结构数据
        let treeData = state.treeData;
        treeData.length = 0;
        arr.forEach(item => treeData.push(item));
        this.commit('accountProjectStore/updateTableData', arr[0]['accountItems']);
    },
    updateTableData(state, arr) {           //页面一进来时或者点击左侧树形结构时，更新表格数据
        let tableData = state.tableData;
        if(arr.length > 0) {
            tableData.length = 0;
            arr.forEach(item => tableData.push(item));
        } else {
            tableData.splice(0);
        }
    },
    refreshTableData(state, arr) {           //新增、修改、删除操作后自动刷新表格数据
        let tableData = state.tableData,
            currentNodeId = state.currentNodeId;
        if(currentNodeId) {
            arr.forEach(item => {
                if(item['id'] == currentNodeId) {
                    tableData.length = 0;
                    item['accountItems'].forEach(item => {
                        tableData.push(item);
                    });
                } else {
                    if(item['accountItems'].length > 0) {
                        this.commit('accountProjectStore/refreshTableData', item['accountItems']);
                    }
                }
            });
        }
    },
    updateCurrentNodeId(state, id) {
        state.currentNodeId = id;
    },
    updateCurrentRow(state, row) {
        let currentRow = state.currentRow;
        currentRow.length = 0;
        currentRow.push(row);
    },
    updateLastType(state, row) {            //更新上级类别数据
        let lastType = state.lastType;
        lastType.length = 0;
        lastType.push(row);
    },
    clearLastType(state) {
        state.lastType.splice(0);
    },
    updateRowId(state, id) {
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
}

const actions = {
    getTreeData({ state, commit, rootState }, $url) {           //获取树形结构数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    state.expandNodeId.push(res.data.data[0]['id']);
                    commit('updateTreeData', res.data.data);
                    commit('refreshTableData', res.data.data);
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
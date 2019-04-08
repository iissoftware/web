import Axios from "axios";

const state = {             //管理状态
    lightId:[],             //高亮
    treeData: [],           //树形数据
    treeclicked:[],         //当前点击的树节点数据
    treeclickedId:'',       //当前点击树节点的id
    tableData:[],           //表格数据
    department:[],          //分管部门
    rowId:'',               //修改数据的id
    allTableData:[],        //所有表格数据，用于查询接口
}

const mutations = {   
    setTreeData(state, data) {                      //树形结构数据
        let treeData = state.treeData;
        let allTableData = state.allTableData;
        treeData.length = 0;
        allTableData.length = 0;
        data.forEach(item => treeData.push(item));
        this.commit('supplierStore/updateTableData', data[0]['suppliers']);
        if(data.length >0){
            for(let i = 0; i < data.length; i++) {
                if(data[i]['suppliers'].length > 0){
                    for(let j = 0; j < data[i]['suppliers'].length; j++){
                        allTableData.push(data[i]['suppliers'][j])
                    }
                }
            }
        }
    },
    updateTableData(state, arr) {                   //页面一进来时或者点击左侧树形结构时，更新表格数据
        let tableData = state.tableData;
        if(arr.length > 0) {
            tableData.length = 0;
            arr.forEach(item => tableData.push(item));
        } else {
            tableData.splice(0);
        }
    },
    refreshTableData(state, arr) {                  //新增、修改、删除操作后自动刷新表格数据
        let tableData = state.tableData,
            treeclickedId = state.treeclickedId;
        if(treeclickedId) {
            arr.forEach(item => {
                if(item['id'] == treeclickedId) {
                    tableData.length = 0;
                    item['suppliers'].forEach(item => {
                        tableData.push(item);
                    });
                }
            });
        }
    },
    updateRowId(state, id) {                        //更改行id
        state.rowId = id;
    },
    updatetreeclickedId(state, id) {                //更改当前点击树节点的id
        state.treeclickedId = id;
    },
    updatetreeclicked(state, row) {                 //更改当前点击树节点数据
        let treeclicked = state.treeclicked;
        treeclicked.length = 0;
        treeclicked.push(row);
    },
    updateDepartment(state,row){                    //更改分管部门
        let department = state.department;
        department.length = 0;
        [row].forEach(item => department.push(item));
    },
    clearDepartment(state) {                        //清空分管部门
        state.department.splice(0);
    },
    clearTreeclickedId(state) {                     //清空高亮
        state.treeclickedId = '';
    }
}

const actions = {
    getTreeData({ state,commit, rootState }, params) {        
        Axios.get(params).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    state.lightId.push(res.data.data[0]['id']);
                    commit('setTreeData', res.data.data);
                    commit('refreshTableData', res.data.data);
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
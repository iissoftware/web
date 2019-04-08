import Axios from "axios";

const state = {     //管理状态
    treeData:[],                //树形结构数据
    staffData:[],               //表格数据
    depName:[],                 //部门名称 
    rowId:'',                   //修改行id
    newdeptId:'',               //当前选中树节点的id
    searchData:[],              //查询接口的数据
}

const mutations = {             //负责更改state状态下的变量
    updateTreeData(state, obj) {            //获取部门树形结构数据
        let treeData = state.treeData;
        treeData.length = 0;
        treeData.push(obj);
    },
    setStaffData(state,data){               //职员表格数据
        let staffData = state.staffData;
        if(data.length > 0) {
            staffData.length = 0;
            data.forEach(item => staffData.push(item));
        } else {
            staffData.splice(0);
        }
    },
    setContext(state,data){                 //查询按钮
        let searchData = state.searchData;
        if(data.length > 0) {
            searchData.length = 0;
            data.forEach(item => searchData.push(item));
        } else {
            searchData.splice(0);
        }
    },
    updateDepartment(state,data){           //部门弹窗的数据
        let depName = state.depName;
        depName.length = 0;
        depName.push(data);
    },
    updateRowId(state,id){                  //修改行的id
        state.rowId = id;
    },
    updateNewdeptId(state,id){              //更改当前选中树节点的id
        state.newdeptId = id;
    },
}

const actions = {               //异步提交mutations
    getTreeData({state, commit, rootState}, $url) {                     //树形结构数据
        let systemInfo = rootState.systemInfo[0];
        let data = {
            name: systemInfo['companyNameChinese'],
            id: systemInfo['id'],
            level: 0,
            subDepartment: []
        }
        commit('updateNewdeptId',systemInfo['id'])
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    data['subDepartment'] = res.data.data;
                    commit('updateTreeData', data);
                }
            }
        });
    },
    getStaffData({ state,commit,rootState }, params){                   //根据部门id查询该部门下的职员
        Axios.get(params).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    commit('setStaffData',res.data.data)
                }
            }
        })
    },
    getSearch({ state,commit,rootState }, $url){                        //搜索功能的拼音
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
    namespaced:true,
    state,
    mutations,
    actions
}
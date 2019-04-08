import Axios from "axios";

const state = {     //管理状态
    CustomerPermissionRow: [],      //客户查看权限数据
    allTreeData: [],                //查看所有客户数据
    treeData:[],                    //树形结构数据
    staffData:[],                   //表格数据
    depName:[],                     //部门名称 
    rowId:'',                       //修改行id
    newdeptId:'',                   //当前选中树节点的id  
    customerSelectRowId: '',                     //表格选中当前行的customerSelectRowId
    searchData:[]
}

const mutations = {
    updateCustomerPermission(state, arr) {      //更新客户查看权限状态
        let CustomerPermissionRow = state.CustomerPermissionRow;
        CustomerPermissionRow.length = 0;           //清空数组
        arr.forEach(item => {
            if(item != null){
                CustomerPermissionRow.push(item)
            }
        });
    },
    updateCustomerPer(state, obj) {             //新增客户查看权限
        let CustomerPermissionRow = state.CustomerPermissionRow;
        let flag = true;        //是否可以添加
        CustomerPermissionRow.forEach((item) => {
            if(item['id'] == obj['id']) {
                flag = false;
                return false;
            }
        });
        if(flag) {
            CustomerPermissionRow.push(obj);
        }
    },
    CustomerData(state, arr) {                  //更新客户查看权限状态
        let allTreeData = state.allTreeData;
        allTreeData.length = 0;           //清空数组
        arr.forEach(item => allTreeData.push(item));
    },
    setStaffData(state,data){
        let staffData = state.staffData;
        if(data.length > 0) {
            staffData.length = 0;
            data.forEach(item => {
                staffData.push(item)
            });
        } else {
            staffData.splice(0);
        }
    },
    updateNewdeptId(state,id){
        state.newdeptId = id;
    },
    updateRowId(state,id){                      //修改行的id
        state.rowId = id;
    },
    updateCustomerSelectRowId(state,id){                     //表格选中当前行的customerSelectRowId
        state.customerSelectRowId = id;
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
    updateTreeData(state, obj) {            //获取部门树形结构数据
        let treeData = state.treeData;
        treeData.length = 0;
        treeData.push(obj);
    },
}

const actions = {
    getCustomerPermission({ commit }, $url) {   //获取客户查看权限数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateCustomerPermission', res.data.data);
                }
            }
        });
    },
    getCustomerData({ commit }, $url) {         //获取所有客户数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('CustomerData', res.data.data);
                }
            }
        });
    },
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
    getSearch({ state,commit,rootState }, $url){
        Axios.get($url).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    commit('setContext',res.data.data)
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
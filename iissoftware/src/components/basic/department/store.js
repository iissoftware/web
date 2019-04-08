import Axios from "axios";
const state = {
    treeData: [],
    tableData: [],
    expandNodeId: [],       //要高亮展开的id
    departTypeData: [],     //部门类型
    employee: [],     //部门主管
    parentId: [],       //上级部门id
    lastDepartmentName: [],     //上级部门名称
    rowId: '',
    searchAllResult: []
}

const mutations = {
    updateTreeData(state, obj) {
        let treeData = state.treeData;
        treeData.length = 0;
        treeData.push(obj);
        //同时更新右侧表格数据，条件是，如果expandNodeId等于树节点id
        this.commit('departmentStore/updateTable', state.treeData);
    },
    updateExpandNodeId(state, id) {         //更新要展开高亮的id
        let expandNodeId = state.expandNodeId;
            expandNodeId.length = 0;
        expandNodeId.push(id);
    },
    updateTable(state, arr) {
        let tableData = state.tableData,
            expandNodeId = state.expandNodeId[0];
            tableData.length = 0;
        arr.forEach(item => {
            if(item['id'] == expandNodeId) {
                let subDepartment = item['subDepartment'];
                if(subDepartment && subDepartment.length > 0) {
                    subDepartment.forEach(item => tableData.push(item));
                } else {
                    tableData.splice(0);
                }
            } else {
                let subDepartment = item['subDepartment'];
                if(subDepartment && subDepartment.length > 0) {
                    this.commit('departmentStore/updateTable', item['subDepartment']);
                }
            }
        })
    },
    updateTableData2(state, arr) {
        let tableData = state.tableData;
        tableData.length = 0;
        if(arr.length > 0) {
            arr.forEach(item => tableData.push(item));
        } else {
            tableData.splice(0);
        }
    },
    updateParentId(state, pid) {
        let parentId = state.parentId;
        parentId.length = 0;
        parentId.push(pid);
    },
    updateLastDepartmentName(state, name) {
        let lastDepartmentName = state.lastDepartmentName;
        lastDepartmentName.length = 0;
        lastDepartmentName.push(name);
    },
    updateRowId(state, id) {
        state.rowId = id;
    }
}

const actions = {
    getTreeData({state, commit, rootState}, $url) {
        let systemInfo = rootState.systemInfo[0];
        if(state.expandNodeId.length == 0) {
            state.expandNodeId.push(systemInfo['id']);
        }
        let data = {
            name: systemInfo['companyNameChinese'],
            id: systemInfo['id'],
            level: 0,
            subDepartment: []
        }
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    data['subDepartment'] = res.data.data;
                    state.parentId.push(data['id']);
                    state.lastDepartmentName.push(data['name']);
                    commit('updateTreeData', data);
                }
            }
        });
    },
    getDepartTypeData({state, commit}, $url) {           //获取部门类型
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let departTypeData = state.departTypeData,
                        data = res.data.data;
                    departTypeData.length = 0;
                    data.forEach(item => departTypeData.push(item));
                }
            }
        });
    },
    getEmployee({state}, $url) {              //获取部门主管
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let employee = state.employee,
                        data = res.data.data;
                        employee.length = 0;
                    data.forEach(item => employee.push(item));
                }
            }
        });
    },
    getSearchResult({state}, $url) {
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data && res.data.data.length > 0) {
                    let searchAllResult = state.searchAllResult;
                    let data = res.data.data;
                    searchAllResult.length = 0;
                    data.forEach(item => searchAllResult.push(item));
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
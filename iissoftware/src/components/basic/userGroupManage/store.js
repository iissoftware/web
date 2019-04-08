import Axios from "axios";

const state = {     
    groupTableData: [],             //用户组表格数据
    treeData: [],                   //树形结构数据    
    mids: [],                       //存储权限id
    currentRow: {                   //当前行数据
        id: '',
        name: ''
    },
    currentLigthRow: '',            //当前高亮行
    rowId: '',                      //要修改的行id
}

const mutations = {      
    setGroupTableData(state, data) {            //左侧表格数据
        let groupTableData = state.groupTableData;
        groupTableData.length = 0;              //清空数组
        data.forEach(item => groupTableData.push(item));
    },
    setTreeData(state, data) {                  //获取右侧树形结构数据
        data[5]['submenuList'].splice(14,1)     //去掉角色管理
        let treeData = state.treeData;
        treeData.length = 0;                    //清空数组
        data.forEach(item => treeData.push(item));
    },
    updateMids(state, arr) {                    //更新用户权限id数组
        let mids = state.mids;
        if(arr.length > 0) {
            mids.length = 0;
            arr.forEach(item => mids.push(item));
        } else {
            mids.splice(0);
        }
    },
    clearMids(state) {                          //清空mids
        state.mids.splice(0, state.mids.length);
    },
    updateCurrentRow(state, row) {              //更改当前表格行的数据
        state.currentRow.name = row['name'];
        state.currentRow.id = row['id'];
    },
    updateCurrentLightRow(state, row) {         //更新要高亮的行
        state.currentLigthRow = row;
    },
    clearCurrentLightRow(state) {               //清空高亮的行
        state.currentLigthRow = '';
    },
    updateRowId(state, id) {                    //更新修改行id
        state.rowId = id;
    }
}

const actions = {
    getGroupTableData({ state, commit, rootState }, $url) {               //左侧用户组表格数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    state.currentRow.name = res.data.data[0]['name'];
                    state.currentRow.id = res.data.data[0]['id'];
                    commit('setGroupTableData', res.data.data);
                }
            }
        });
    },
    getTreeData({ state, commit, rootState }, $url) {                     //右侧树形结构数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setTreeData', res.data.data);
                }
            }
        });
    },
    selectObjectById({ state, commit, rootState }, $url) {                //根据id查找用户具备哪些权限功能
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateMids', res.data.data['mids']);
                }
            }
        
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
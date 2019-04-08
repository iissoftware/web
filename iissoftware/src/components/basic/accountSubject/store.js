import Axios from "axios";

const state = {
    treeData: [],       //会计科目树形结构数据
    tableData: [],      //会计科目表格数据
    expandNodeId: [],       //要展开高亮的节点
    url: '',        //查询会计科目表格数据的url
    betweenObject: false,       //往来科目是否勾选
    objectList: [],         //核算类别
    subjectTypes: [],       //科目类别
    allUnitTypes: [],       //外币核算
    groupObj: {
        treeData: [],
        currentRow: [],     //存储当前操作的节点
    },
    rowId: '',          //会计科目修改id
    searchAllResult: [],        //存储查询的所有结果
}

const mutations = {
    setTreeDataNo(state, arr) {     //递归设置（会计科目）树形结构节点加上编码
        for(let key in arr) {
            if(arr[key]['name'] !== '资产' && arr[key]['name'] !== '负债' && arr[key]['name'] !== '共同' && arr[key]['name'] !== '权益' && (arr[key]['name'] !== '成本' || arr[key]['code'] == '10130') && arr[key]['name'] !== '损益' && arr[key]['name'] !== '表外') {
                arr[key]['name'] = arr[key]['code'] + ' (' + arr[key]['name'] + ')';
            }
            if(arr[key]['subAssertList'] && arr[key]['subAssertList'].length > 0) {
                this.commit('subjectStore/setTreeDataNo', arr[key]['subAssertList']);
            }
        }
    },
    updateExpandNodeId(state, id) {             //更新展开高亮节点id
        let expandNodeId = state.expandNodeId;
        expandNodeId.length = 0;
        expandNodeId.push(id);
    },
    updateTableData(state, arr) {         //更新表格数据
        let tableData = state.tableData;
        if(arr.length > 0) {
            tableData.length = 0;
            arr.forEach(item => tableData.push(item) );
        } else {
            tableData.splice(0);
        }
    },
    updateUrl(state, url) {
        state.url = url;
    },
    updateBetweenObject(state, bool) {          //更新往来科目状态
        state.betweenObject = bool;
    },
    updateObjectList(state, params) {            //更新核算类别数据
        let objectList = state.objectList;
        let type = Object.prototype.toString.call(params);      //判断参数类型，如果是对象类型，那么就是新增。如果是数组类型，那么就是修改
        if(type == '[object Array]') {
            objectList.length = 0;
            params.forEach(item => objectList.push(item));
        } else if(type == '[object Object]') {
            let flag = true;
            objectList.forEach(item => {
                if(item['id'] == params['id']) {
                    flag = false;
                    return false;
                }
            });
            if(flag) objectList.push(params);
        } else if(type == '[object Null]') {
            objectList.splice(0);
        }
    },
    clearObjectList(state) {            //清空核算类别数据
        state.objectList.splice(0);
    },
    updateGroupTreeData(state, arr) {     //更新科目组树形结构数据
        let treeData = state.groupObj.treeData;
        treeData.length = 0;
        arr.forEach(item => treeData.push(item));
        this.commit('subjectStore/setTreeDataNo', treeData);
    },
    updateCurrentRow(state, row) {      //更新当前操作的节点数据
        let currentRow = state.currentRow;
        currentRow.length = 0;
        currentRow.push(row);
        state.currentNodeId = row['id'];
    },
    updateGroupCurrentRow(state, row) {        //更新科目组当前操作的节点数据
        let currentRow = state.groupObj.currentRow;
        currentRow.length = 0;
        currentRow.push(row);
    },
    updateRowId(state, id) {
        state.rowId = id;
    },
    deleteSubjectTypeById(state, id) {        //删除指定的往来对象数据
        let objectList = state.objectList;
        if(id) {       //说明删除指定的元素
            objectList.forEach((item, index) => {
                if(item['id'] == id) {
                    objectList.splice(index, 1);
                }
            });
        } else {
            //每次只删除数组的第0个元素
            objectList.splice(0, 1);
        }
    }
}

const actions = {
    getTreeData({state, dispatch, commit}, $url) {            //获取会计科目树形结构数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let treeData = state.treeData,
                        data = res.data.data;
                    treeData.length = 0;
                    if(state.expandNodeId.length == 0) {            //如果是初始状态，那么就设置第一个节点为展开高亮状态
                        state.expandNodeId.push(data[0]['id']);
                        dispatch('getTableDataById', state.url + data[0]['id']);            //调用另外一个actions
                    } else {
                        dispatch('getTableDataById', state.url + state.expandNodeId[0]);            //调用另外一个actions
                    }
                    data.forEach(item => treeData.push(item));
                    commit('setTreeDataNo', treeData);          //给节点加上编码
                }
            }
        });
    },
    getTableDataById({commit}, $url) {           //通过id获取对应的会计科目或会计科目的表格数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateTableData', res.data.data);
                }
            }
        });
    },
    getSubjectTypes({state}, $url) {          //获取所有科目类别
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let subjectTypes = state.subjectTypes,
                        data = res.data.data;
                    subjectTypes.length = 0;
                    data.forEach(item => {
                        subjectTypes.push(item);
                    });
                }
            }
        });
    },
    getAllUnitType({state}, $url) {             //获取所有外币核算
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let allUnitTypes = state.allUnitTypes,
                        data = res.data.data;
                    allUnitTypes.length = 0;
                    data.forEach(item => allUnitTypes.push(item));
                }
            }
        });
    },
    getGroupTreeData({commit}, $url) {        //获取科目组树形结构数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateGroupTreeData', res.data.data);
                }
            }
        });
    },
    getSearchData({state}, $url) {          //搜索
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let searchAllResult = state.searchAllResult,
                        data = res.data.data;
                    state.searchAllResult.length = 0;
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
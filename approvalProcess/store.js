import Axios from "axios";

const state = {
    treeData: [],
    activeName: ['first'],
    allId: 999999999,        //默认全部的id
    nodeId: null,       //当前节点id
    rootId: null,       //根节点id
    moneyIndex: {           //各个单据金额id
        index0: 0,
        index1: 0,
        index2: 0,
        index3: 0,
        index4: 0,
        index5: 0
    },
    minMoney: 0,            //金额下限
    maxMoney: 50000000,     //金额上限
    sIndex: 0,              //审批步骤表格id
    names: [],      //  存储所有审核人
    row: []
}

const mutations = {
    updateActiveName(state, name) {
        state.activeName.splice(0, 1, name);
    },
    updateId(state, obj) {      //更新节点id与根节点id
        state.nodeId = obj['nodeId'];
        state.rootId = obj['rootId'];
    },
    updateIndex(state, obj) {        //更新id
        state.moneyIndex['index' + obj['index']] = obj['data'];
    },
    updateSIndex(state, id) {        //更新审核人id
        state.sIndex = id;
    },
    updateRow(state, row) {
        state.row.splice(0, 1, row);
    },
    updateNodes(state, obj) {       //添加节点
        this.commit('approvalProcessStore/recursAddNode', {data: state.treeData, node: obj});
    },
    recursAddNode(state, obj) {           //递归添加节点
        let node = obj['node'];         //{level: xxx, node: []}
        obj['data'].forEach(item => {
            if(item['level'] == Number(node['level'] - 1)) {
                node['node'].forEach(item2 => {
                    if(item['rootId'] == item2['rootId']) {
                        switch(node['level']) {
                            case 1:
                                if(item['id'] == item2['pid']) {
                                    let flag = true;
                                    item['children'].forEach(item3 => {
                                        if(item3['id'] == item2['id']) {
                                            flag = false;
                                            return false;
                                        }
                                    });
                                    if(flag) item['children'].push(item2);
                                }
                                break;
                            case 2:
                                if(item['id'] == item2['pid']) {
                                    let flag = true;
                                    item['subList'].forEach(item3 => {
                                        if(item3['id'] == item2['id']) {
                                            flag = false;
                                            return false;
                                        }
                                    });
                                    if(flag) item['subList'].push(item2);
                                }
                                break;
                            case 3:
                                if(item['id'] == item2['pid']) {
                                    console.log(item)
                                    let flag = true;
                                    item['subList'].forEach(item3 => {
                                        if(item3['id'] == item2['id']) {
                                            flag = false;
                                            return false;
                                        }
                                    });
                                    if(flag) item['subList'].push(item2);
                                }
                                break;
                            default: break;
                        }
                    }
                });
            } else {
                this.commit('approvalProcessStore/recursAddNode', {data: item['children'], node});
            }
        });
    },
    toFilterRepeat(state, data) {         //过滤重复添加
        let flag = true;
        data['ary'].forEach(item => {
            if(item['id'] == data['node']['id']) {
                flag = false;
                return false;
            }
        });
        if(flag) {
            data['ary'].push({id: state.allId, name: '全部', pid: data['node']['pid'], rootId: data['node']['rootId'], level: data['node']['level'], subList: [], children: []}, data['node']);
        }
    }
}

const actions = {
    getTreeData({state, commit}, $url) {            //获取单据树形列表
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let allId = state.allId,
                        data = res.data.data,
                        treeData = state.treeData,
                        minMoney = state.minMoney,
                        maxMoney = state.maxMoney;
                    treeData.splice(0);
                    data.forEach((item, index) => {
                        item['children'] = [{id: allId, pid: item['id'], level: 1, rootId: item['id'], name: '全部', subList: [], children: []}];
                        item['subList'] = [];
                        item['rootId'] = item['id'];
                        item['level'] = 0;
                        treeData.push(item);

                        //初始化会计科目
                        item['children'].forEach(vercharItem => {
                            if(vercharItem['subList'].length <= 0) {
                                vercharItem['subList'].push({id: allId, name: '全部', parentId: 0, parentName: '无', level: 2, pid: vercharItem['id'], rootId: vercharItem['rootId'], subList: [], children: []});
                                vercharItem['subList'].forEach(dpItem => {
                                    if(dpItem['subList'].length <= 0) {
                                        dpItem['subList'].push({id: allId, name: '全部', level: 3, pid: dpItem['id'], rootId: dpItem['rootId'], subList: [], children: []});
                                        dpItem['subList'].forEach(empItem => {
                                            if(empItem['subList'].length <= 0) {
                                                empItem['subList'].push({id: allId, money1: minMoney, money2: maxMoney, name: minMoney + ' ~ ' + maxMoney + '元', level: 4, pid: empItem['id'], rootId: empItem['rootId'], subList: [], children: []});
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            }
        });
    },
    getMemberData({state}, $url) {
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    res.data.data.forEach(item => item['id'] = item['id'].toString());
                    state.names = res.data.data;
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
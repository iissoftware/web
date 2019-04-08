import Axios from "axios";
import { Store } from "vuex";

const state = {
    treeData: [],
    activeName: ['first'],
    names: [],      //存储后台返回的所有审核人
    ttId: 99999999,         //全部id
    moneyIndex: {           //各个单据金额id
        index0: 0,
        index1: 0,
        index2: 0,
        index3: 0,
        index4: 0,
        index5: 0
    },
    sIndex: 0,          //审核人id
    minMoney: 0,            //金额下限
    maxMoney: 50000000,     //金额上限
    rootId: null,           //根节点id
    vercharId: null,        //会计科目id
    dpId: null,             //部门id
    empId: null,            //职员id
    mnId: null,             //金额id         
}

const mutations = {
    updateActiveName(state, names) {
        state.activeName.splice(0, 1, names);
    },
    updateId(state, obj) {
        if(obj['rootId'] !== '' && obj['rootId'] != null && obj['rootId'] != undefined) state.rootId = obj['rootId'];
        if(obj['vercharId'] !== '' && obj['vercharId'] != null && obj['vercharId'] != undefined) state.vercharId = obj['vercharId'];
        if(obj['dpId'] !== '' && obj['dpId'] != null && obj['dpId'] != undefined) state.dpId = obj['dpId'];
        if(obj['empId'] !== '' && obj['empId'] != null && obj['empId'] != undefined) state.empId = obj['empId'];
        if(obj['mnId'] !== '' && obj['mnId'] != null && obj['mnId'] != undefined) state.mnId = obj['mnId'];
    },
    updateIndex(state, obj) {        //更新金额id
        state.moneyIndex['index' + obj['index']] = obj['data'];
    },
    updateSIndex(state, id) {        //更新审核人id
        state.sIndex = id;
    },
    updateNodes(state, obj) {
        this.commit('approvalProcessStore/recursionUpdateNodes', {data: state.treeData, node: obj});
    },
    recursionUpdateNodes(state, obj) {
        let node = obj['node'];
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
                                if(item['id'] == item2['pid'] && item['pid'] == state.vercharId) {    //父级id相同且会计科目id必须相同，防止影响到其它节点
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
                            case 4:
                                if(item['id'] == item2['pid'] && item['pid'] == state.dpId && item['vercharId'] == state.vercharId) {    //父级id,部门id, 会计科目id,必须相同，防止影响到其它节点
                                    let flag = true;
                                    item['subList'].forEach(item3 => {
                                        if(item3['id'] == item2['id'] || (item3['money1'] == item2['money1'] && item3['money2'] == item2['money2']))
                                        flag = false;
                                        return false;
                                    });
                                    if(flag) item['subList'].push(item2);
                                }
                                break;
                            case 5:
                                if(item['vercharId'] == state.vercharId && item['dpId'] == state.dpId && item['pid'] == state.empId &&  item['id'] == item2['pid']) {       //父级id,部门id, 会计科目id, 职员id必须相同，防止影响到其它节点
                                    let flag = true;
                                    item['subList'].forEach(item3 => {
                                        if(item3['id'] == item2['id'])
                                        flag = false;
                                        return false;
                                    });
                                    if(flag) item['subList'].push(item2);
                                }
                                break;
                            default: break;
                        }
                    }
                });
            } else {
                this.commit('approvalProcessStore/recursionUpdateNodes', {data: item['children'], node});
            }
        });
    },
    deleteNodes(state, obj) {
        this.commit('approvalProcessStore/recursionDeleteNodes', {data: state.treeData, node: obj});
    },
    recursionDeleteNodes(state, obj) {
        let node = obj['node'];
        obj['data'].forEach(item => {
            if(item['level'] == Number(node['level'] - 1)) {
                node['arr'].forEach(item2 => {
                    if(item['rootId'] == item2['rootId']) {
                        switch(node['level']) {
                            case 1:
                                item['children'].forEach((item3, index) => {
                                    if(item3['id'] == item2['id'] && item3['id'] != state.ttId) {
                                        item['children'].splice(index, 1);
                                    }
                                });
                                break;
                            case 2:
                                item['subList'].forEach((item3, index) => {
                                    if(item3['id'] == item2['id'] && item3['id'] != state.ttId) {
                                        item['subList'].splice(index, 1);
                                    }
                                });
                                break;
                            case 3:
                                item['subList'].forEach((item3, index) => {
                                    if(item3['id'] == item2['id'] && item3['id'] != state.ttId) {
                                        item['subList'].splice(index, 1);
                                    }
                                });
                                break;
                            case 4:
                                item['subList'].forEach((item3, index) => {
                                    if(item3['id'] == item2['id'] && item3['id'] != state.ttId && item['vercharId'] == state.vercharId) {
                                        item['subList'].splice(index, 1);
                                        --state.moneyIndex['index' + item2['rootId']];      //对应的金额索引递减
                                    }
                                });
                                break;
                            case 5:
                                item['subList'].forEach((item3, index) => {
                                    if(item3['id'] == item2['id'] && item3['id'] != state.ttId && item['vercharId'] == state.vercharId) {
                                        item['subList'].splice(index, 1);
                                        --state.sIndex;
                                    }
                                });
                                break;
                            default: break;
                        }
                    }
                });
            } else {
                this.commit('approvalProcessStore/recursionDeleteNodes', {data: item['children'], node});
            }
        });
    }
}

const actions = {
    getTreeData({state}, $url) {            //获取单据树形列表
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let data = res.data.data,
                        treeData = state.treeData;
                    treeData.length = 0;
                    data.forEach(rootItem => {
                        rootItem['level'] = 0;
                        rootItem['rootId'] = rootItem['id'];
                        rootItem['subList'] = [];
                        rootItem['children'] = [{id: state.ttId, name: '全部', pid: rootItem['id'], rootId: rootItem['id'], level: 1, children: [], subList: []}];
                        if(rootItem['children'].length > 0) {
                            rootItem['children'].forEach(vercharItem => {
                                vercharItem['subList'].push({id: state.ttId, name: '全部', pid: vercharItem['id'], rootId: vercharItem['rootId'], level: 2, parentName: '无', parentId: 0, children: [], subList: []});
                                if(vercharItem['subList'].length > 0) {
                                    vercharItem['subList'].forEach(dpItem => {
                                        dpItem['subList'].push({id: state.ttId, name: '全部', pid: dpItem['id'], rootId: dpItem['rootId'], level: 3, vercharId: vercharItem['id'], children: [], subList: []});
                                        if(dpItem['subList'].length > 0) {
                                            dpItem['subList'].forEach(empItem => {
                                                empItem['subList'].push({id: state.ttId, pid: empItem['id'], rootId: empItem['rootId'], level: 4, vercharId: vercharItem['id'], money1: state.minMoney, money2: state.maxMoney, name: state.minMoney + ' ~ ' + state.maxMoney + '元', children: [], subList: []});
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        treeData.push(rootItem);
                    });
                }
            }
        });
    },
    getMemberData({state}, $url) {
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let data = res.data.data;
                    if(state.names.length > 0) state.names.splice(0);
                    data.forEach(item => {
                        item['id'] = item['id'].toString();
                        state.names.push(item);
                    });
                }
            }
        })
    },
    selectActiviti({state}, $url) {
        Axios.get($url).then(res => {
            console.log(res)
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
import Axios from "axios";

const state = {
    treeData: [],
    activeName: ['first'],
    rootId: null,
    id: null,
    isAdd: false,
    moneyIndex: {           //各个单据金额id
        index0: 0,
        index1: 0,
        index2: 0,
        index3: 0,
        index4: 0,
        index5: 0
    },
    sIndex: 0,          //审核人id
    submitObj: {            //提交的数据
        bills: null,
        verchars: null,
        departments: null,
        employees: null,
        amounts: null
    },
    getStepData: [],        //存储审批流程数据
    arr: [],      //存储审核人数据
    names: []
}

const mutations = {
    updateIsAdd(state, bool) {
        state.isAdd = bool;
    },
    updateActiveName(state, name) {
        state.activeName.length = 0;
        state.activeName.push(name);
    },
    updateRootId(state, rootId) {
        state.rootId = rootId;
    },
    updateId(state, id) {
        state.id = id;
    },
    updateIndex(state, obj) {        //更新id
        state.moneyIndex['index' + obj['index']] = obj['data'];
    },
    updateSIndex(state, id) {        //更新审核人id
        state.sIndex = id;
    },
    updateNodeId(state, obj) {      //存储选中节点id
        switch(obj['type']) {
            case 1:
                state.submitObj.bills = obj['id'];
                break;
            case 2:
                state.submitObj.verchars = obj['id'];
                break;
            case 3:
                state.submitObj.departments = obj['id'];
                break;
            case 4:
                state.submitObj.employees = obj['id'];
                break;
            case 5:
                state.submitObj.amounts = obj['id'];
                break;
            default: break;
        }
    },
    updateNodes(state, obj) {           //更新节点
        this.commit('approvalProcessStore/updateDigui', {data: state.treeData, node: obj});
    },
    updateDigui(state, obj) {       //递归更新
        let node = obj['node'];
        obj['data'].forEach(item => {
            if(item['level'] == Number(node['level'] - 1)) {
                if(node['node']['pid'] == item['id']) {
                    if(node['level'] === 1) {
                        this.commit('approvalProcessStore/toFilterRepeat', {ary: item['children'], node: node['node']});
                    }
                    if(node['level'] === 2 || node['level'] === 3 || node['level'] === 5) {
                        this.commit('approvalProcessStore/toFilterRepeat', {ary: item['subList'], node: node['node']});
                    }
                    if(node['level'] === 4) {       //如果是金额添加，要确认id不同，并且保证（金额上限和金额下限）和下次传过来的（金额上限和金额下限）不一致
                        let flag = true;
                        item['subList'].forEach(subItem => {
                            if(subItem['id'] == node['node']['id'] || (subItem['money1'] == node['node']['money1'] && subItem['money2'] == node['node']['money2']))
                            flag = false;
                            return false;
                        });
                        if(flag) item['subList'].push(node['node']);
                    }
                }
            } else {
                this.commit('approvalProcessStore/updateDigui', {data: item['children'], node});
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
        if(flag) data['ary'].push(data['node']);
    },
    deleteNodes(state, arr) {           //删除节点
        this.commit('approvalProcessStore/deleteDigui', {data: state.treeData, arr: arr});
    },
    deleteDigui(state, obj) {           //递归删除
        obj['arr'].forEach(item2 => {
            obj['data'].forEach(item => {
                if(item['level'] == Number(item2['level'] - 1)) {
                    if(item2['level'] === 1) {
                        let children = item['children'];
                        children.forEach((subChd, index) => {
                            if(item2['id'] == subChd['id']) {
                                children.splice(index, 1);
                            }
                        });
                    }
                    if(item2['level'] === 2 || item2['level'] === 3 || item2['level'] === 4 || item2['level'] === 5) {
                        let subList = item['subList'];
                        subList.forEach((subChd, index) => {
                            if(item2['id'] == subChd['id']) {
                                if(item2['level'] === 4) {
                                    --state.moneyIndex['index' + item2['rootId']];      //对应的金额索引递减
                                }
                                if(item2['level'] === 5) --state.sIndex;
                                subList.splice(index, 1);
                            }
                        });
                    }
                    
                } else {
                    this.commit('approvalProcessStore/deleteDigui', {data: item['children'], arr: obj['arr']});
                }
            });
        });
    }
}

const actions = {
    getTreeData({state}, $url) {            //获取单据树形列表
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let treeData = state.treeData,
                        data = res.data.data,
                        activeName = state.activeName[0];
                    treeData.length = 0;
                    data.forEach(item => {
                        item['children'] = [];
                        item['subList'] = [];
                        item['rootId'] = item['id'];
                        item['level'] = 0;
                        treeData.push(item);
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
    selectActiviti({state, rootState, commit}, $url) {         //获取返回的审批流程数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let data = res.data.data,
                        treeData = state.treeData,
                        root = {},            //单据根节点
                        verchars = [],        //会计科目
                        department = [],      //部门
                        employee = [],           //职员
                        money = [],             //金额
                        auditor = [],         //审核 + 知会人
                        newAuditor = [],
                        rowIndex = null,
                        tableData = {},
                        nodeType = null;
                    if(data.length > 0) {
                        data.forEach(item => {
                            root = treeData[item['bills'][0]['id']];            //得到要操作的根节点
                            //设置会计科目
                            if(item['verchars'].length > 0) {
                                item['verchars'].forEach(vercharItem => {
                                    vercharItem['pid'] = root['id'];
                                    vercharItem['level'] = 1;
                                    vercharItem['rootId'] = root['id'];
                                    vercharItem['subList'] = [];
                                    vercharItem['children'] = [];
                                });
                                verchars = verchars.concat(item['verchars']);
                            }

                            //设置部门
                            if(item['departments'].length > 0) {
                                item['departments'].forEach(dpItem => {
                                    dpItem['pid'] = item['verchars'][0]['id'];
                                    dpItem['level'] = 2;
                                    dpItem['rootId'] = root['id'];
                                    dpItem['subList'] = [];
                                    dpItem['children'] = [];
                                    dpItem['vercharId'] = item['verchars'][0]['id'];
                                });
                                department = department.concat(item['departments']);
                            }

                            //设置职员
                            if(item['employees'].length > 0) {
                                item['employees'].forEach(empItem => {
                                    empItem['pid'] = item['departments'][0]['id'];
                                    empItem['level'] = 3;
                                    empItem['rootId'] = root['id'];
                                    empItem['subList'] = [];
                                    empItem['children'] = [];
                                    empItem['vercharId'] = item['verchars'][0]['id'];
                                });
                                employee = employee.concat(item['employees']);
                            }

                            //设置金额
                            if(item['moneys'].length > 0) {
                                let mn = null;
                                item['moneys'].forEach(mnItem => {
                                    mn = mnItem['name'].split(',');
                                    mnItem['id'] = ++state.moneyIndex['index' + item['bills'][0]['id']];
                                    mnItem['pid'] = item['employees'][0]['id'];
                                    mnItem['level'] = 4;
                                    mnItem['rootId'] = root['id'];
                                    mnItem['name'] = mn[0] + '元' + ' ~ ' + mn[1] + '元';
                                    mnItem['money1'] = mn[0];
                                    mnItem['money2'] = mn[1];
                                    mnItem['subList'] = [];
                                    mnItem['children'] = [];
                                    mnItem['vercharId'] = item['verchars'][0]['id'];
                                    mnItem['dpid'] = item['departments'][0]['id'];
                                });
                                money = money.concat(item['moneys']);
                            }

                            //设置审核人
                            if(item['approvers'].length > 0 && item['notifyPeoples'].length > 0) {
                                auditor = item['approvers'].concat(item['notifyPeoples']);
                                rowIndex = Math.max.apply(Math, auditor.map(rowItem => rowItem['rowNumber']));
                                for(let i = 1; i <= rowIndex; i++) {
                                    let newApprov = [],
                                        newNotify = [];
                                    auditor.forEach(audItem => {
                                        if(audItem['rowNumber'] == i) {
                                            if(audItem['typeName'] === '审核') {
                                                newApprov.push(audItem);
                                            }
                                            if(audItem['typeName'] === '知会') {
                                                newNotify.push(audItem);
                                            }
                                        }
                                    });
                                    if(newApprov.length > 0) {
                                        let name = null,
                                            name1 = null,
                                            name2 = null,
                                            name3 = null;
                                        newApprov.forEach(newAppItem => {
                                            if(newAppItem['rowNumber'] == i) {
                                                name = newApprov[0] && newApprov[0]['id'];
                                                name1 = newApprov[1] && newApprov[1]['id'];
                                                name2 = newApprov[2] && newApprov[2]['id'];
                                                name3 = newApprov[3] && newApprov[3]['id'];
                                            }
                                        });
                                        tableData = {
                                            name: name,
                                            name1: name1,
                                            name2: name2,
                                            name3: name3,
                                            level: 5,
                                            nodeType: 0
                                        }
                                        item['moneys'][0]['subList'].push(tableData);
                                    }
                                    if(newNotify.length > 0) {
                                        let name = null,
                                            name1 = null,
                                            name2 = null,
                                            name3 = null;
                                        newNotify.forEach(newNotifyItem => {
                                            if(newNotifyItem['rowNumber'] == i) {
                                                name = newNotify[0] && newNotify[0]['id'];
                                                name1 = newNotify[1] && newNotify[1]['id'];
                                                name2 = newNotify[2] && newNotify[2]['id'];
                                                name3 = newNotify[3] && newNotify[3]['id'];
                                            }
                                        });
                                        tableData = {
                                            name: name,
                                            name1: name1,
                                            name2: name2,
                                            name3: name3,
                                            level: 5,
                                            nodeType: 1
                                        }
                                        item['moneys'][0]['subList'].push(tableData);
                                    }
                                }
                            }

                            //分配会计科目节点
                            verchars.forEach(vercharItem => {
                                if(vercharItem['pid'] == root['id']) {
                                    if(root['children'].length > 0) {
                                        let flag = true;
                                        root['children'].forEach(treeItem => {
                                            if(treeItem['id'] == vercharItem['id']) {
                                                flag = false;
                                                return false;
                                            }
                                        });
                                        if(flag) root['children'].push(vercharItem);
                                    } else {
                                        root['children'].push(vercharItem);
                                    }
                                }
                            });

                            //分配部门节点
                            department.forEach(dpItem => {
                                verchars.forEach(vercharItem => {
                                    if(dpItem['pid'] == vercharItem['id'] && dpItem['rootId'] == vercharItem['rootId']) {
                                        if(vercharItem['subList'].length > 0) {
                                            let flag = true;
                                            vercharItem['subList'].forEach(vercharItemSubListItem => {
                                                if(vercharItemSubListItem['id'] == dpItem['id']) {
                                                    flag = false;
                                                    return false;
                                                }
                                            });
                                            if(flag) vercharItem['subList'].push(dpItem);
                                        } else {
                                            vercharItem['subList'].push(dpItem);
                                        }
                                    }
                                });
                            });

                            //分配职员节点
                            employee.forEach(empItem => {
                                department.forEach(dpItem => {
                                    if(empItem['pid'] == dpItem['id'] && empItem['rootId'] == dpItem['rootId'] && empItem['vercharId'] == dpItem['pid']) {
                                        if(dpItem['subList'].length > 0) {
                                            let flag = true;
                                            dpItem['subList'].forEach(dpItemSubListItem => {
                                                if(dpItemSubListItem['id'] == empItem['id']) {
                                                    flag = false;
                                                    return false;
                                                }
                                            });
                                            if(flag) dpItem['subList'].push(empItem);
                                        } else {
                                            dpItem['subList'].push(empItem);
                                        }
                                    }
                                });
                            });

                            //分配金额节点
                            money.forEach(mnItem => {
                                employee.forEach(empItem => {
                                    if(mnItem['pid'] == empItem['id'] && mnItem['rootId'] == empItem['rootId'] && mnItem['dpid'] == empItem['pid'] && mnItem['vercharId'] == empItem['vercharId']) {
                                        if(empItem['subList'].length > 0) {
                                            let flag = true;
                                            empItem['subList'].forEach(empItemSubListItem => {
                                                if(mnItem['id'] == empItemSubListItem['id'] || (mnItem['money1'] == empItemSubListItem['money1']) && (mnItem['money2'] == empItemSubListItem['money2'])) {
                                                    flag = false;
                                                    return false;
                                                }
                                            });
                                            if(flag) empItem['subList'].push(mnItem);
                                        } else {
                                            empItem['subList'].push(mnItem);
                                        }
                                    }
                                });
                            });
                            // money.forEach(mnItem => {
                            //     let approv = [];
                            //     newAuditor.forEach(newAudItem => {
                            //         if(mnItem['id'] == newAudItem['pid'] && mnItem['pid'] == newAudItem['empid'] && mnItem['dpid'] == newAudItem['dpid'] && mnItem['vercharId'] == newAudItem['vercharId']) {
                            //             if(newAudItem['typeName'] === '审核') {
                            //                 approv.push(newAudItem);
                            //             }
                            //             // if(newAudItem['typeName'] === '知会') {
                            //             //     notify.push(newAudItem);
                            //             // }
                            //         }
                            //     });
                            //     console.log(approv)
                            // });
                        });
                    }
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
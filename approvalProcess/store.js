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
    billList: [],       //单据数据       
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
    },
    concatVerchars(state, params) {          //设置会计科目
        let flag = true,
            item = params['item'],
            rootItem = params['rootItem'];
        item['verchars'].forEach(vercharItem => {
            rootItem['children'].forEach(vchItem => {           //去除重复数据
                if(vercharItem['id'] == vchItem['id']) {
                    flag = false;
                    return false;
                }
            });
            if(flag) {      //构造会计科目数据
                vercharItem['pid'] = rootItem['id'];
                vercharItem['rootId'] = rootItem['id'];
                vercharItem['level'] = 1;
                vercharItem['children'] = [];
                vercharItem['subList'] = [
                    {id: state.ttId, name: '全部', pid: vercharItem['id'], rootId: rootItem['rootId'], level: 2, parentName: '无', parentId: 0, children: [], subList: [
                    {id: state.ttId, name: '全部', pid: state.ttId, rootId: rootItem['rootId'], level: 3, vercharId: vercharItem['id'], children: [], subList: [
                    {id: state.ttId, pid: state.ttId, rootId: rootItem['rootId'], level: 4, vercharId: vercharItem['id'], money1: state.minMoney, money2: state.maxMoney, name: state.minMoney + ' ~ ' + state.maxMoney + '元', children: [], subList: []}
                    ]
                }]}];
                rootItem['children'].push(vercharItem);
            }
            this.commit('approvalProcessStore/concatDepartments', {item: item, arr: rootItem['children']});
        });
    },
    concatDepartments(state, params) {        //设置部门
        let item = params['item'],
            data = params['arr'],
            flag = true;
        item['departments'].forEach(dpItem => {
            data.forEach(vercharItem => {
                if(dpItem['id'] != state.ttId) {
                    console.log(dpItem)
                }
                // vercharItem['subList'].push(dpItem);
            });
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
    selectActiviti({state, commit}, $url) {
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    //去除数组重复对象
                    var deleteRepeatObj = (arr) => {
                        var uniques = [],
                            obj = {};
                        for(var i = 0; i < arr.length; i++) {
                            if(!Object.keys) {
                                Object.keys = (function() {
                                    'use strict';
                                    var hasOwnProperty = Object.prototype.hasOwnProperty,
                                        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                                        dontEnums = [
                                          'toString',
                                          'toLocaleString',
                                          'valueOf',
                                          'hasOwnProperty',
                                          'isPrototypeOf',
                                          'propertyIsEnumerable',
                                          'constructor'
                                        ],
                                        dontEnumsLength = dontEnums.length;
                                    return function(obj) {
                                        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                                            throw new TypeError('Object.keys called on non-object');
                                        }
                                        var result = [], prop, i;
                                        for (prop in obj) {
                                        if (hasOwnProperty.call(obj, prop)) {
                                                result.push(prop);
                                            }
                                        }
                                        if (hasDontEnumBug) {
                                            for (i = 0; i < dontEnumsLength; i++) {
                                                if (hasOwnProperty.call(obj, dontEnums[i])) {
                                                    result.push(dontEnums[i]);
                                                }
                                            }
                                        }
                                        return result;
                                    }
                                }());
                            }
                            var keyArr = Object.keys(arr[i]);
                            keyArr.sort(function(a, b) {
                                return (Number(a) - Number(b));
                            });
                            var str = '';
                            for(var j = 0; j < keyArr.length; j++) {
                                str += JSON.stringify(keyArr[j]);
                                str += JSON.stringify(arr[i][keyArr[j]]);
                            }
                            if(!obj.hasOwnProperty(str)) {
                                uniques.push(arr[i]);
                                obj[str] = true;
                            }
                        }
                        return uniques;
                    }
                    let data = res.data.data,
                        treeData = state.treeData,
                        root = [],
                        verchars = [],
                        departments = [],
                        employees = [],
                        moneys = [],
                        auditor = [],
                        rowIndex = null,        //最大行数
                        tableData = {},
                        moneyArr = [];
                    console.log(data);
                    return false;
                    data.forEach(item => {
                        root.push(treeData[item['bills'][0] && item['bills'][0]['id']]);
                        //组装会计科目数据
                        if(item['verchars'].length > 0) {
                            item['verchars'].forEach(vercharItem => {
                                if(vercharItem['id'] != state.ttId) {
                                    vercharItem['pid'] = item['bills'][0]['id'];
                                    vercharItem['rootId'] = item['bills'][0]['id'];
                                    vercharItem['level'] = 1;
                                    vercharItem['children'] = [];
                                    vercharItem['subList'] = [
                                        {id: state.ttId, name: '全部', pid: vercharItem['id'], rootId: item['bills'][0]['id'], level: 2, parentName: '无', parentId: 0, children: [], subList: [
                                        {id: state.ttId, name: '全部', pid: state.ttId, rootId: item['bills'][0]['id'], level: 3, vercharId: vercharItem['id'], dpId: state.ttId, children: [], subList: [
                                        {id: state.ttId, pid: state.ttId, rootId: item['bills'][0]['id'], level: 4, vercharId: vercharItem['id'], dpId: state.ttId, money1: state.minMoney, money2: state.maxMoney, name: state.minMoney + ' ~ ' + state.maxMoney + '元', children: [], subList: []}
                                        ]}
                                    ]}];
                                    verchars = verchars.concat(vercharItem);
                                }
                            });
                        }
                        //组装部门数据
                        if(item['departments'].length > 0) {
                            item['departments'].forEach(dpItem => {
                                if(dpItem['id'] != state.ttId) {
                                    dpItem['pid'] = item['verchars'][0]['id'];
                                    dpItem['rootId'] = item['bills'][0]['id'];
                                    dpItem['level'] = 2;
                                    dpItem['children'] = [];
                                    dpItem['subList'] = [
                                        {id: state.ttId, name: '全部', pid: dpItem['id'], rootId: item['bills'][0]['id'], level: 3, vercharId: item['verchars'][0]['id'], dpId: dpItem['id'], children: [], subList: [
                                        {id: state.ttId, pid: state.ttId, rootId: item['bills'][0]['id'], level: 4, vercharId: item['verchars'][0]['id'], dpId: dpItem['id'], money1: state.minMoney, money2: state.maxMoney, name: state.minMoney + ' ~ ' + state.maxMoney + '元', children: [], subList: []}
                                    ]}];
                                    departments = departments.concat(dpItem);
                                }
                            });
                        }
                        //组装职员数据
                        if(item['employees'].length > 0) {
                            item['employees'].forEach(empItem => {
                                if(empItem['id'] != state.ttId) {
                                    empItem['pid'] = item['departments'][0]['id'];
                                    empItem['rootId'] = item['bills'][0]['id'];
                                    empItem['level'] = 3;
                                    empItem['vercharId'] = item['verchars'][0]['id'];
                                    empItem['dpId'] = item['departments'][0]['id'];
                                    empItem['children'] = [];
                                    empItem['subList'] = [{id: state.ttId, pid: empItem['id'], rootId: item['bills'][0]['id'], level: 4, dpId: item['departments'][0]['id'], vercharId: item['verchars'][0]['id'], money1: state.minMoney, money2: state.maxMoney, name: state.minMoney + ' ~ ' + state.maxMoney + '元', children: [], subList: []}];
                                    employees = employees.concat(empItem);
                                }
                            });
                        }
                        //组装金额数据
                        if(item['moneys'].length > 0) {
                            let mn = null;
                            item['moneys'].forEach(mnItem => {
                                mn = mnItem['name'].split(',');
                                if(mn[0] != state.minMoney && mn[1] != state.maxMoney) {
                                    mnItem['id'] = ++state.moneyIndex['index' + item['bills'][0]['id']];
                                    mnItem['pid'] = item['employees'][0]['id'];
                                    mnItem['rootId'] = item['bills'][0]['id'];
                                    mnItem['name'] = mn[0] + ' ~ ' + mn[1] + '元';
                                    mnItem['money1'] = mn[0];
                                    mnItem['money2'] = mn[1];
                                    mnItem['level'] = 4;
                                    mnItem['vercharId'] = item['verchars'][0]['id'];
                                    mnItem['dpId'] = item['departments'][0]['id'];
                                    mnItem['children'] = [];
                                    mnItem['subList'] = [];
                                    moneys = moneys.concat(mnItem);
                                } else {
                                    mnItem['id'] = state.ttId;
                                }
                            });
                        }
                        //组装审核人数据
                        if(item['approvers'].length > 0 && item['notifyPeoples'].length > 0) {
                            auditor = item['approvers'].concat(item['notifyPeoples']);
                            rowIndex = Math.max.apply(Math, auditor.map(rowItem => rowItem['rowNumber']));      //取得最大行数
                            for(let i = 1; i <= rowIndex; i++) {
                                let newApprov = [],
                                    newNotify = [],
                                    copy = [];
                                auditor.forEach(audItem => {
                                    if(audItem['rowNumber'] == i) {
                                        if(audItem['typeName'] === '审核') {
                                            newApprov.push(audItem);
                                        }
                                        if(audItem['typeName'] === '知会') {
                                            newNotify.push(audItem);
                                        }
                                        if(audItem['typeName'] === '抄送') {
                                            copy.push(audItem);
                                        }
                                    }
                                });
                                if(newApprov.length > 0) {
                                    let name = null,
                                        name1 = null,
                                        name2 = null,
                                        name3 = null,
                                        generateDocument = null;
                                    newApprov.forEach(newAppItem => {
                                        if(newAppItem['rowNumber'] == i) {
                                            generateDocument = newAppItem['generateBill'];
                                            name = newApprov[0] && newApprov[0]['id'];
                                            name1 = newApprov[1] && newApprov[1]['id'];
                                            name2 = newApprov[2] && newApprov[2]['id'];
                                            name3 = newApprov[3] && newApprov[3]['id'];
                                        }
                                    });
                                    tableData = {
                                        generateDocument: generateDocument,
                                        name: name,
                                        name1: name1,
                                        name2: name2,
                                        name3: name3,
                                        level: 5,
                                        nodeType: 0,
                                        rootId: item['bills'][0]['id'],
                                        vercharId: item['verchars'][0]['id'],
                                        dpId: item['departments'][0]['id'],
                                        empId: item['employees'][0]['id'],
                                        mnId: item['moneys'][0]['id']
                                    }
                                    let listObj = item['moneys'][0];
                                    if(listObj['id'] != state.ttId) {
                                        listObj['subList'].push(tableData);
                                    } else {
                                        //如果父级是默认0 ~ 50000000节点，另做处理
                                        moneyArr = moneyArr.concat(tableData);
                                    }
                                }
                                if(newNotify.length > 0) {
                                    let name = null,
                                        name1 = null,
                                        name2 = null,
                                        name3 = null,
                                        generateDocument = null;
                                    newNotify.forEach(newNotifyItem => {
                                        if(newNotifyItem['rowNumber'] == i) {
                                            generateDocument = newNotifyItem['generateBill'];
                                            name = newNotify[0] && newNotify[0]['id'];
                                            name1 = newNotify[1] && newNotify[1]['id'];
                                            name2 = newNotify[2] && newNotify[2]['id'];
                                            name3 = newNotify[3] && newNotify[3]['id'];
                                        }
                                    });
                                    tableData = {
                                        generateDocument: generateDocument,
                                        name: name,
                                        name1: name1,
                                        name2: name2,
                                        name3: name3,
                                        level: 5,
                                        nodeType: 1,
                                        rootId: item['bills'][0]['id'],
                                        vercharId: item['verchars'][0]['id'],
                                        dpId: item['departments'][0]['id'],
                                        empId: item['employees'][0]['id'],
                                        mnId: item['moneys'][0]['id']
                                    }
                                    let listObj = item['moneys'][0];
                                    if(listObj['id'] != state.ttId) {
                                        listObj['subList'].push(tableData);
                                    } else {
                                        //如果父级是默认0 ~ 50000000节点，另做处理
                                        moneyArr = moneyArr.concat(tableData);
                                    }
                                }
                                if(copy.length > 0) {
                                    let name = null,
                                        name1 = null,
                                        name2 = null,
                                        name3 = null,
                                        generateDocument = null;
                                    copy.forEach(copyItem => {
                                        if(copyItem['rowNumber'] == i) {
                                            generateDocument = copyItem['generateBill'];
                                            name = copy[0] && copy[0]['id'];
                                            name1 = copy[1] && copy[1]['id'];
                                            name2 = copy[2] && copy[2]['id'];
                                            name3 = copy[3] && copy[3]['id'];
                                        }
                                    });
                                    tableData = {
                                        generateDocument: generateDocument,
                                        name: name,
                                        name1: name1,
                                        name2: name2,
                                        name3: name3,
                                        level: 5,
                                        nodeType: 1,
                                        rootId: item['bills'][0]['id'],
                                        vercharId: item['verchars'][0]['id'],
                                        dpId: item['departments'][0]['id'],
                                        empId: item['employees'][0]['id'],
                                        mnId: item['moneys'][0]['id']
                                    }
                                    let listObj = item['moneys'][0];
                                    if(listObj['id'] != state.ttId) {
                                        listObj['subList'].push(tableData);
                                    } else {
                                        //如果父级是默认0 ~ 50000000节点，另做处理
                                        moneyArr = moneyArr.concat(tableData);
                                    }
                                }
                            }
                        }
                    });

                    //去除重复单据
                    root = deleteRepeatObj(root);
                    //去除重复会计科目
                    verchars = deleteRepeatObj(verchars);
                    //去除重复部门
                    departments = deleteRepeatObj(departments);
                    //去除重复职员
                    employees = deleteRepeatObj(employees);
                    //去除重复金额
                    moneys = deleteRepeatObj(moneys);
                    
                    //追加会计科目数据
                    verchars.forEach(vercharItem => {
                        root.forEach(rootItem => {
                            if(rootItem['id'] == vercharItem['pid']) {
                                rootItem['children'].push(vercharItem);
                            }
                        });
                    });

                    //追加部门数据
                    departments.forEach(dpItem => {
                        verchars.forEach(vercharItem => {
                            if(vercharItem['rootId'] == dpItem['rootId'] && vercharItem['id'] == dpItem['pid']) {
                                vercharItem['subList'].push(dpItem);
                            }
                        });
                        //如果父级是默认全部节点，另做处理
                        if(dpItem['pid'] == state.ttId) {
                            root.forEach(rootItem => {
                                if(rootItem['rootId'] == dpItem['rootId']) {
                                    rootItem['children'].forEach(vercharItem => {
                                        if(vercharItem['id'] == dpItem['pid']) {
                                            vercharItem['subList'].push(dpItem);
                                        }
                                    });
                                }
                            });
                        }
                    });

                    //追加职员数据
                    employees.forEach(empItem => {
                        departments.forEach(dpItem => {
                            if(dpItem['rootId'] == empItem['rootId'] && dpItem['pid'] == empItem['vercharId'] && dpItem['id'] == empItem['pid']) {
                                dpItem['subList'].push(empItem);
                            }
                        });
                        //如果父级是默认全部节点，另做处理
                        if(empItem['pid'] == state.ttId) {
                            root.forEach(rootItem => {
                                if(rootItem['rootId'] == empItem['rootId']) {
                                    rootItem['children'].forEach(vercharItem => {
                                        if(vercharItem['id'] == empItem['vercharId']) {
                                            vercharItem['subList'].forEach(dpItem => {
                                                if(dpItem['id'] == empItem['pid']) {
                                                    dpItem['subList'].push(empItem);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });

                    //追加金额数据
                    moneys.forEach(mnItem => {
                        employees.forEach(empItem => {
                            if(empItem['rootId'] == mnItem['rootId'] && empItem['vercharId'] == mnItem['vercharId'] && empItem['pid'] == mnItem['dpId'] && empItem['id'] == mnItem['pid']) {
                                empItem['subList'].push(mnItem);
                            }
                        });
                        //如果父级是默认全部节点，另做处理
                        if(mnItem['pid'] == state.ttId) {
                            root.forEach(rootItem => {
                                if(rootItem['rootId'] == mnItem['rootId']) {
                                    rootItem['children'].forEach(vercharItem => {
                                        if(vercharItem['id'] == mnItem['vercharId']) {
                                            vercharItem['subList'].forEach(dpItem => {
                                                if(dpItem['id'] == mnItem['dpId']) {
                                                    dpItem['subList'].forEach(empItem => {
                                                        if(empItem['id'] == mnItem['pid']) {
                                                            empItem['subList'].push(mnItem);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                    //追加审核人
                    moneyArr.forEach(audItem => {
                        root.forEach(rootItem => {
                            rootItem['children'].forEach(vercharItem => {
                                if(vercharItem['id'] == audItem['vercharId']) {
                                    vercharItem['subList'].forEach(dpItem => {
                                        if(dpItem['id'] == audItem['dpId']) {
                                            dpItem['subList'].forEach(empItem => {
                                                if(empItem['id'] == audItem['empId']) {
                                                    empItem['subList'].forEach(mnItem => {
                                                        if(mnItem['id'] == audItem['mnId']) {
                                                            mnItem['subList'].push(audItem);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    });
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
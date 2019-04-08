import Axios from "axios";
import Vue from 'vue'

const state = {
    activeName: ['first'],
    treeData: [         //树形结构数据
        {
            id: 0,
            level: 0,
            categoryName: '车牌号码',
            children: []
        },
        {
            id: 1,
            level: 0,
            categoryName: '合同编号',
            children: []
        },
        {
            id: 2,
            level: 0,
            categoryName: '货号资料',
            children: []
        },
        {
            id: 3,
            level: 0,
            categoryName: '普通资料',
            children: []
        },
        {
            id: 4,
            level: 0,
            categoryName: '银行资料',
            children: []
        }
    ],
    tableData: [],      //存放表格数据
    row: [],            //当前点击的节点
    dfExpKeys: [0],      //默认展开的节点id
    url: null,          //获取小类表格url
    label: {            //合同编号下的表格不同列名称
        givenName: null,
        givenNumberOne: null,
        givenNumberTwo: null
    },
    rowId: null,        //修改行id
    names: [],          //存在合同编号下面的各个名称列表
}

const mutations = {
    updateActiveName(state, names) {
        state.activeName.splice(0, 1, names);            //更新当前要展开的节点id值
    },
    updateTableData(state, obj) {           //更新表格数据
        let tableData = state.tableData;
        tableData.length = 0;
        if(!obj.hasOwnProperty('row')) {            //说明点击的大类
            if(obj['children'].length > 0) {
                obj['children'].forEach(item => tableData.push(item));
            } else {
                tableData.splice(0);
            }
            state.row.splice(0, 1, obj);            //更新当前点击的节点数据
            state.dfExpKeys.splice(0, 1, obj['id']);            //更新当前要展开的节点id值
        } else {        //说明点击的小类
            if(obj['data'].length > 0) {
                obj['data'].forEach(item => tableData.push(item));
            } else {
                tableData.splice(0);
            }
            state.row.splice(0, 1, obj['row']);            //更新当前点击的节点数据
            state.dfExpKeys.splice(0, 1, obj['row']['id']);            //更新当前要展开的节点id值
        }
    },
    updateRow(state, obj) {             //更新当前点击节点右侧表格数据
        this.commit('secondaryStore/updateTableData', obj);
    },
    updateDfExpKeys(state, id) {            //更新要展开的节点id
        if(id === '' || id == null || id === undefined) {
            state.dfExpKeys.splice(0);
        } else {
            state.dfExpKeys.splice(0, 1, id);
        }
    },
    updateRowId(state, id) {        //更新修改行id
        state.rowId = id;
    }
}

const actions = {
    getTreeData({state, commit}, $url) {             //获取树形结构数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let data = res.data.data,
                        treeData = state.treeData;
                    if(data.length > 0) {
                        treeData.forEach(treeItem => {
                            treeItem['children'].splice(0);
                            data.forEach(item => {
                                item['level'] = 1;
                                if(item['dataCategoryId'] == treeItem['id']) {          //将返回的数据纳入对应的根节点下面
                                    treeItem['children'].push(item);
                                }
                            });
                        });
                        
                        //更新节点右侧表格数据
                        if(state.dfExpKeys.length <= 0) {
                            commit('updateTableData', treeData[0]);         //如果dfExpKeys没值，默认展开第一大类的节点并刷新该节点的表格数据
                        } else {
                            commit('updateTableData', treeData[state.dfExpKeys[0]]);       //如果dfExpKeys有值，就展开该节点并刷新该节点对应的表格数据
                        }
                    }
                }
            }
        });
    },
    getSubClassTableData({state, commit, dispatch}, obj) {           //获取小类对应的表格数据
        let url = state.url,
            label = state.label;
        switch(obj['dataCategoryId']) {
            case 0:
                url = obj['$url'] + 'auxiliaryInfoAllCategory/selectCarNumber';             //车牌号码
                break;
            case 1:
                url = obj['$url'] + 'auxiliaryInfoAllCategory/selectContractNumber';        //合同编号
                switch(obj['categoryName']) {
                    case '卖单合同编号':
                        label['givenName'] = '买单厂名称';
                        label['givenNumberOne'] = '卖单订单号';
                        label['givenNumberTwo'] = '买单厂订单号';
                        break;
                    case '外协厂合同编号':
                        label['givenName'] = '外协厂名称';
                        label['givenNumberOne'] = '外协订单号';
                        label['givenNumberTwo'] = '外协厂订单号';
                        break;
                    case '销售合同编号':
                        label['givenName'] = '客户名称';
                        label['givenNumberOne'] = '销售订单号';
                        label['givenNumberTwo'] = '客户订单号';
                        dispatch('getAllNames', {url: obj['$url'] + 'client/findAllClient'});
                        break;
                    case '采购合同编号':
                        label['givenName'] = '供应商名称';
                        label['givenNumberOne'] = '采购订单号';
                        label['givenNumberTwo'] = '供应商订单号';
                        break;
                    default: break;
                }
                break;
            case 2:
                url = obj['$url'] + 'auxiliaryInfoAllCategory/selectGoodsInfo';             //货号资料
                break;
            case 3:
                url = obj['$url'] + 'auxiliaryInfoAllCategory/selectOrdinary';              //普通资料
                break;
            case 4:
                url = obj['$url'] + 'auxiliaryInfoAllCategory/selectBank';                  //银行资料
                break;
            default: break;
        }
        Axios({
            url: url,
            method: 'get',
            params: {infoId: obj.id}
        }).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateTableData', {row: obj, data: res.data.data});
                }
            }
        });
    },
    getAllNames({state}, obj) {             //获取合同编号下面的各个名称列表
        Axios.get(obj['url']).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let data = res.data.data;
                    state.names.splice(0);
                    data.forEach(item => {
                        item['id'] = item['id'].toString();
                        state.names.push(item);
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
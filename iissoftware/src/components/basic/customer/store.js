import Axios from "axios";

const state = {     //管理状态
    locationList:[],            //区域下拉框列表
    tradeList:[],               //行业下拉框列表
    vatRatesList:[],            //税率下拉列表
    saleMethodList:[],          //销售方式下拉列表
    settlementPeriodList:[],    //结算期限下拉列表
    customerValueCategoryList:[],//客户价值分类
    customerProductCategoryList:[],//客户产品分类
    locationCountryList:[],     //国家下拉列表
    franchiseClerkList:[],      //专营业务员下拉列表
    department:[],       //分管部门
    treeData: [],      //树形数据
    lightId:[],         //高亮
    tableData:[],       //表格数据
    treeclicked:[],     //当前点击的树节点数据
    treeclickedId:'',    //当前点击树节点的id
    rowId:'',
    searchData: [],
}

const mutations = {
    setTreeData(state, data) {
        let treeData = state.treeData;
        treeData.length = 0;
        data.forEach(item => treeData.push(item));
        this.commit('customerStore/updateTableData', data[0]['clients']);
    },
    updateTableData(state, arr) {           //页面一进来时或者点击左侧树形结构时，更新表格数据
        let tableData = state.tableData;
        if(arr) {
            tableData.length = 0;
            arr.forEach(item => tableData.push(item));
        } else {
            tableData.splice(0);
        }
    },
    refreshTableData(state, arr) {           //新增、修改、删除操作后自动刷新表格数据
        let tableData = state.tableData,
            treeclickedId = state.treeclickedId;
        if(treeclickedId) {
            arr.forEach(item => {
                if(item['id'] == treeclickedId) {
                    tableData.length = 0;
                    item['clients'].forEach(item => {
                        tableData.push(item);
                    });
                }
            });
        }
    },
    updatetreeclickedId(state, id) {    //更改当前点击树节点的id
        state.treeclickedId = id;
    },
    updatetreeclicked(state, row) {      //更改当前点击树节点数据
        let treeclicked = state.treeclicked;
        treeclicked.length = 0;
        treeclicked.push(row);
    },
    updateRowId(state, id) {            //更改行id
        state.rowId = id;
    },
    Location(state, arr) {                  //区域
        let locationList = state.locationList;
        locationList.length = 0;
        arr.forEach(item => locationList.push(item));
    },
    Trade(state, arr) {                  //行业
        let tradeList = state.tradeList;
        tradeList.length = 0;
        arr.forEach(item => tradeList.push(item));
    },
    VatRates(state, arr) {                  //税率
        let vatRatesList = state.vatRatesList;
        vatRatesList.length = 0;
        arr.forEach(item => vatRatesList.push(item));
    },
    SaleMethod(state, arr) {                  //销售方式
        let saleMethodList = state.saleMethodList;
        saleMethodList.length = 0;
        arr.forEach(item => saleMethodList.push(item));
    },
    SettlementPeriod(state, arr) {                  //结算期限
        let settlementPeriodList = state.settlementPeriodList;
        settlementPeriodList.length = 0;
        arr.forEach(item => settlementPeriodList.push(item));
    },
    JiaZhiFenLei(state, arr) {                  //价值分类
        let customerValueCategoryList = state.customerValueCategoryList;
        customerValueCategoryList.length = 0;
        arr.forEach(item => customerValueCategoryList.push(item));
    },
    ChanPinFenlei(state, arr) {                  //产品分类
        let customerProductCategoryList = state.customerProductCategoryList;
        customerProductCategoryList.length = 0;
        arr.forEach(item => customerProductCategoryList.push(item));
    },
    Contry(state, arr) {                  //国家
        let locationCountryList = state.locationCountryList;
        locationCountryList.length = 0;
        arr.forEach(item => locationCountryList.push(item));
    },
    Employee(state, arr) {                  //专营业务员
        let franchiseClerkList = state.franchiseClerkList;
        franchiseClerkList.length = 0;
        arr.forEach(item => franchiseClerkList.push(item));
    },
    updateDepartment(state,row){            //更改分管部门
        let department = state.department;
        department.length = 0;
        [row].forEach(item => department.push(item));
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
    clearTreeclickedId(state) {                     //清空高亮
        state.treeclickedId = '';
    }
}

const actions = {
    getLocation({ commit }, $url) {         //区域
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('Location', res.data.data);
                }
            }
        });
    },
    getTrade({ commit }, $url) {         //行业
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('Trade', res.data.data);
                }
            }
        });
    },
    getVatRates({ commit }, $url) {         //税率
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('VatRates', res.data.data);
                }
            }
        });
    },
    getSaleMethod({ commit }, $url) {         //销售方式
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('SaleMethod', res.data.data);
                }
            }
        });
    },
    getSettlementPeriod({ commit }, $url) {         //结算期限
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('SettlementPeriod', res.data.data);
                }
            }
        });
    },
    getJiaZhiFenLei({ commit }, $url) {         //客户价值分类
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('JiaZhiFenLei', res.data.data);
                }
            }
        });
    },
    getChanPinFenlei({ commit }, $url) {         //客户产品分类
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('ChanPinFenlei', res.data.data);
                }
            }
        });
    },
    getContry({ commit }, $url) {         //国家
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('Contry', res.data.data);
                }
            }
        });
    },
    getEmployee({ commit }, $url) {         //专营业务员
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('Employee', res.data.data);
                }
            }
        });
    },
    getCity({ commit }, $url) {         //城市
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('City', res.data.data);
                }
            }
        });
    },
    getTreeData({ state,commit, rootState }, params) {
        Axios.get(params).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    state.lightId.push(res.data.data[0]['id']);
                    commit('setTreeData', res.data.data);
                    commit('refreshTableData', res.data.data);
                }
            }
        });
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
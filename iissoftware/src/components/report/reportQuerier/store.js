import Axios from "axios";

const state = {     //管理状态
    DepartmentTreeData:[],                  //部门树形结构数据
    depName:[],                             //部门名称 
    projectTreeData:[],                     //会计科目
    proName:[],                             //会计科目名称
    bankTableData:[],                       //银行表格数据
    banName:[],                             //银行账号
    staffTableData:[],                      //人员表格数据
    staName:[],                             //人员姓名
    searchData:[],                          //人员的拼音搜索
    customerData:[],                        //应收，预收
    supplierData:[],                        //应付，预付
    otherData:[],                           //其他
    unitOneTableData:[],                    //往来单位-客户
    unitTwoTableData:[],                    //往来单位-供应商
    unitThreeTableData:[],                    //往来单位-人云
    betName:[],                             //往来单位
}

const mutations = {             
    updateDepartmentTreeData(state, obj) {             //获取部门树形结构数据
        let DepartmentTreeData = state.DepartmentTreeData;
        DepartmentTreeData.length = 0;
        DepartmentTreeData.push(obj);
    },
    updateDepartment(state,data){                       //部门弹窗的数据
        let depName = state.depName;
        depName.length = 0;
        depName.push(data);
    },
    updateProject(state,data){                          //会计科目弹窗的数据
        let proName = state.proName;
        proName.length = 0;
        proName.push(data);
    },
    updateBank(state,data){                             //银行弹窗的数据
        let banName = state.banName;
        banName.length = 0;
        banName.push(data);
    },
    updateStaff(state,data){                            //人员弹窗的数据
        let staName = state.staName;
        staName.length = 0;
        staName.push(data);
    },
    setContext(state,data){                             //人员的拼音搜索
        let searchData = state.searchData;
        if(data.length > 0) {
            searchData.length = 0;
            data.forEach(item => searchData.push(item));
        } else {
            searchData.splice(0);
        }
    },
    getDifferenceData(state,data){                      //分为三种数组，应付，应收，其他
        let currentAssets = data[0]['subAssertList'][0]['subAssertList'][0]['subAssertList'];           //流动资产
        let currentLiabilities = data[0]['subAssertList'][1]['subAssertList'][0]['subAssertList'];      //流动负债
        let customerData = state.customerData;
        let supplierData = state.supplierData;
        let otherData = state.otherData;
        customerData.length = 0;    //应收
        supplierData.length = 0;    //应付
        otherData.length = 0;       //其他
        for(let i = 0; i < currentAssets.length; i++){              //资产循环
            if(currentAssets[i]['name'] == "应收帐款" || currentAssets[i]['name'] == "应收票据"){           //客户
                customerData.push(currentAssets[i])
                if(currentAssets[i]['subAssertList'] && currentAssets[i]['subAssertList'].length > 0){
                    this.commit('reportQuerierStore/getCustomer',currentAssets[i]['subAssertList'])
                }
                
            }
            if(currentAssets[i]['name'] == "预付帐款"){                                                     //供应商
                supplierData.push(currentAssets[i])
                if(currentAssets[i]['subAssertList'] && currentAssets[i]['subAssertList'].length > 0){
                    this.commit('reportQuerierStore/getSupplier',currentAssets[i]['subAssertList'])
                }
            }
            if(currentAssets[i]['name'] == "其他应收款"){                                                    //其他
                otherData.push(currentAssets[i])
                if(currentAssets[i]['subAssertList'] && currentAssets[i]['subAssertList'].length > 0){
                    this.commit('reportQuerierStore/getOther',currentAssets[i]['subAssertList'])
                }
            }
        }
        for(let k = 0; k < currentLiabilities.length; k++){         //债务循环
            if(currentLiabilities[k]['name'] == "应付帐款" || currentLiabilities[k]['name'] == "应付票据"){   //供应商
                supplierData.push(currentLiabilities[k])
                // console.log(supplierData,'supplierData')
                if(currentLiabilities[k]['subAssertList'] && currentLiabilities[k]['subAssertList'].length > 0){
                    this.commit('reportQuerierStore/getSupplier',currentLiabilities[k]['subAssertList'])
                }
            }
            if(currentLiabilities[k]['name'] == "预收帐款"){                                                  //客户
                customerData.push(currentLiabilities[k])
                // console.log(customerData,'customerData')
                if(currentLiabilities[k]['subAssertList'] && currentLiabilities[k]['subAssertList'].length > 0){
                    this.commit('reportQuerierStore/getCustomer',currentLiabilities[k]['subAssertList'])
                }
            }
            if(currentLiabilities[k]['name'] == "其他应付款"){                                                    //其他
                otherData.push(currentLiabilities[k])
                // console.log(otherData,'otherData')
                if(currentLiabilities[k]['subAssertList'] && currentLiabilities[k]['subAssertList'].length > 0){
                    this.commit('reportQuerierStore/getOther',currentLiabilities[k]['subAssertList'])
                }
            }
        }
    },
    getCustomer(state,data){                    //客户
        let customerData = state.customerData;
        for(let j =0; j < data.length; j++){
            customerData.push(data[j])
            if(data[j]['subAssertList'] && data[j]['subAssertList'].length > 0){
                this.commit('reportQuerierStore/getCustomer', data[j]['subAssertList']);
            }
        }
    },
    getSupplier(state,data){                    //供应商
        let supplierData = state.supplierData;
        for(let j =0; j < data.length; j++){
            supplierData.push(data[j])
            if(data[j]['subAssertList'] && data[j]['subAssertList'].length > 0){
                this.commit('reportQuerierStore/getSupplier', data[j]['subAssertList']);
            }
        }
    },
    getOther(state,data){                       //其他
        let otherData = state.otherData;
        for(let j =0; j < data.length; j++){
            otherData.push(data[j])
            if(data[j]['subAssertList'] && data[j]['subAssertList'].length > 0){
                this.commit('reportQuerierStore/getOther', data[j]['subAssertList']);
            }
        }
    },
    updateBetName(state,data){                  //往来单位
        let betName = state.betName;
        betName.length = 0;
        betName.push(data);
    }

}

const actions = {               //异步提交mutations
    getDepartmentTreeData({state, commit, rootState}, $url) {           //部门树形结构数据
        let systemInfo = rootState.systemInfo[0];
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
                    commit('updateDepartmentTreeData', data);
                }
            }
        });
    },  
    getProjectTreeData({state, dispatch, commit}, $url) {               //获取会计科目树形结构数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let projectTreeData = state.projectTreeData,
                    data = res.data.data;
                    projectTreeData.length = 0;
                    data.forEach(item => projectTreeData.push(item));
                    // commit('setTreeDataNo', projectTreeData);          //给节点加上编码
                    commit('getDifferenceData', res.data.data);
                }
            }
        });
    },
    getBankData({state, commit, rootState}, $url) {                     //银行表格结构数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let bankTableData = state.bankTableData,
                    data = res.data.data;
                    bankTableData.length = 0;
                    data.forEach(item => bankTableData.push(item));
                }
            }
        });
    },    
    getStaffData({state, commit, rootState}, $url) {                    //职员表格结构数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let staffTableData = state.staffTableData,
                    data = res.data.data;
                    staffTableData.length = 0;
                    data.forEach(item => staffTableData.push(item));
                }
            }
        });
    },
    getSearch({ state,commit,rootState }, $url){                        //人员表格的拼音搜索
        Axios.get($url).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    commit('setContext',res.data.data)
                }
            }
        })
    },
    getUnitOne({ state,commit,rootState }, $url){                       //往来单位-客户
        Axios.get($url).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    let unitOneTableData = state.unitOneTableData,
                    data = res.data.data;
                    unitOneTableData.length = 0;
                    data.forEach(item => unitOneTableData.push(item));
                }
            }
        })
    },
    getUnitTwo({ state,commit,rootState }, $url){                       //往来单位-供应商
        Axios.get($url).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    let unitTwoTableData = state.unitTwoTableData,
                    data = res.data.data;
                    unitTwoTableData.length = 0;
                    data.forEach(item => unitTwoTableData.push(item));
                }
            }
        })
    },
    getUnitThree({ state,commit,rootState }, $url){                     //往来单位-人员
        Axios.get($url).then(res => {
            if(res.data.code == 20001){
                if(res.data.data){
                    let unitThreeTableData = state.unitThreeTableData,
                    data = res.data.data;
                    unitThreeTableData.length = 0;
                    data.forEach(item => unitThreeTableData.push(item));
                }
            }
        })
    },
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
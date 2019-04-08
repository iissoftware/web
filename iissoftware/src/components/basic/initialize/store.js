import Axios from "axios";

const state = {                 //管理状态
    treeData:[],                //树形表格的数据
    assetNum:0,                //资产总额
    liabilities: 0,            //负债+权益
    difference: 0,             //差额
    categoryData:[],            //类别数组
    selectName:'',              //类别下拉框选中的类别名称
    objectName:[],              //往来对象名称
    accountProjectData:[],      //核算项目数据
    subsidiaryData:[],          //明细账表格数据
    subsidiary1Data:[],          //银行存款明细账表格数据
    subSidiaryMoneySum: '',     //明细账金额总和
    searchAllResult: [],        //存储查询的所有结果
    searchAllResultTwo: [],
    xsCompactData:[],           //辅助资料树形所有数据//销售合同编号
    xsData:[],                  //销售合同编号所有数据
    cgCompactData:[],           //辅助资料树形所有数据//采购合同编号
    cgData:[],                  //采购合同编号所有数据
    bankData:[],                //辅助资料树形所有数据//销售合同编号
    bankItemData: [],           //银行资料所有数据
    initializeVal: [],          //初始化页面的表格数据
    parentInitializeVal:[],     //当前点击的父级数据
    assetData: [],              //资产所有数据
    liabilitiesData: [],        //负债所有数据
    equityData: [],             //权益所有数据
    bankObjData: [],            //账户名
    categoryDataKH: [],
    categoryDataGY: [],
}

const mutations = {
    setTreeData(state,data){
        let treeData = state.treeData;
        treeData.length = 0;          //清空数组
        data.forEach(item => treeData.push(item));
        let assetData = state.assetData;
        let liabilitiesData = state.liabilitiesData;
        let equityData = state.equityData;
        assetData.length = 0;
        liabilitiesData.length = 0;
        equityData.length = 0;
        if(treeData){
            treeData.forEach(item => {
                let subAssertList = item['subAssertList'];
                if(subAssertList){
                    subAssertList.forEach(item => {
                        if(item['name'] == '资产'){
                            assetData.push(item)
                        }else if(item['name'] == '负债'){
                            liabilitiesData.push(item)
                        }else if(item['name'] == '权益'){
                            equityData.push(item);
                        }
                    })
                }
            })
        }
    },
    setCategoryData(state,data){
        let categoryData = state.categoryData;
        let categoryDataGY = state.categoryDataGY;
        let categoryDataKH = state.categoryDataKH;
        categoryDataGY.length = 0;
        categoryData.length = 0;          //清空数组
        categoryDataKH.length = 0;
        data.forEach(item => {
            categoryData.push(item);
            if(item['name'] == '客户分类'){
                categoryDataKH.push(item);
            }else if(item['name'] == '供应商分类'){
                categoryDataGY.push(item);
            }
        });
    },
    setAssetNum(state,data){
        state.assetNum = data;
    },
    setLiabilities(state, data){
        state.liabilities = data
    },
    setDifference(state, data){
        state.difference = data;
    },
    clearSum(state){
        state.assetNum = 0;//资产总和
        state.liabilities = 0;//负债+权益总和
        state.difference = 0;//差额
    },
    setSelectObj(state,name){                   //更改类别
        state.selectName = name;
    },
    updateObject(state,row){                    //更改往来对象名称
        let objectName = state.objectName;
        objectName.length = 0;
        [row].forEach(item => objectName.push(item));
    },
    clearInitializeVal(state){                  //清空初始化页面的表格字段
        state.selectName = '';
    },
    updateAccountProjectData(state, arr) {      //更新核算项目树形结构数据
        let accountProjectData = state.accountProjectData;
        accountProjectData.length = 0;
        if(arr[0] && arr[0]['accountItems'].length > 0){
            for(let i = 0;i < arr[0]['accountItems'].length;i++){
                if(state.selectName == arr[0]['accountItems'][i]['id']){//如果下拉框选择的类别名称
                    accountProjectData.push(arr[0]['accountItems'][i]);
                }
            }
        }
    },
    setSubsidiaryData(state,data){              //更新明细账表格数据
        let subsidiaryData = state.subsidiaryData;
        subsidiaryData.length = 0;
        if(data.length > 0) {
            data.forEach(item => {
                subsidiaryData.push(item);
                state.selectName = item['type']
            });
        } else {
            subsidiaryData.splice(0);
        }
    },
    setSubsidiary1Data(state,data){              //更新银行存款明细账表格数据
        let subsidiary1Data = state.subsidiary1Data;
        subsidiary1Data.length = 0;
        if(data.length > 0) {
            data.forEach(item => {
                subsidiary1Data.push(item);
                state.selectName = item['type']
            });
        } else {
            subsidiary1Data.splice(0);
        }
    },
    setMoneyList(state,data){                   //将明细账金额总和赋给当前点击数据的金额
        let subSidiaryMoneySum = state.subSidiaryMoneySum;
        if(data.length > 0) {
            data.forEach(item => {
                if(item['id'] == state.initializeVal[0]['id']){
                    item['money'] = subSidiaryMoneySum;
                }
                let subAssertList = item['subAssertList'];
                if(subAssertList && subAssertList.length > 0) {
                    this.commit('initializeStore/setMoneyList', subAssertList);
                }
            });
        }
    },
    computedMoneySum(state,parent) {                   //合计总金额
        let parentArr = parent.subAssertList;
        if(parentArr.length > 0) {
            for(let i = 0; i < parentArr.length; i++) {
                if(parentArr[i]['money']) {
                    parent.money += parseFloat(parentArr[i]['money']);
                }
            }
        }
        if(parent.parent && parent.parent.subAssertList.length > 0) {
            parent.parent.money = 0;
            this.commit('initializeStore/computedMoneySum',parent.parent);
        }
    },
    setSubSidiaryMoneySum(state,data){          //明细账金额总和
        state.subSidiaryMoneySum = data;
        this.commit('initializeStore/setMoneyList', state.treeData);
    },
    setCompactData(state, arr) {                //更新辅助资料树形结构数据
        let xsCompactData = state.xsCompactData;
        let cgCompactData = state.cgCompactData;
        let bankData = state.bankData;
        xsCompactData.length = 0;
        cgCompactData.length = 0;
        bankData.length = 0
        arr.forEach(item => {
            if(item['dataCategoryId'] == 1 && item['categoryName'] == '销售合同编号'){
                xsCompactData.push(item)
            }
            if(item['dataCategoryId'] == 1 && item['categoryName'] == '采购合同编号'){
                cgCompactData.push(item)
            }
            if(item['dataCategoryId'] == 4 && item['dataCategory'] == '银行资料'){
                bankData.push(item)
            }
        })
    },
    updateXsData(state, arr){                   //销售合同编号
        let xsData = state.xsData;
        xsData.length = 0;
        arr.forEach(item => xsData.push(item))
    },
    updateCgData(state, arr){                   //采购合同编号
        let cgData = state.cgData;
        cgData.length = 0;
        arr.forEach(item => cgData.push(item))
    },
    updateBankData(state, arr){
        let bankItemData = state.bankItemData;
        bankItemData.length = 0;
        arr.forEach(item => bankItemData.push(item))
    },
    setInitializeValTwo(state, data){           //初始化页面的表格字段
        let initializeVal = state.initializeVal;
        initializeVal.length = 0;          //清空数组
        data.forEach(item => initializeVal.push(item));
    },
    updatebankObj(state, arr){                   //更改账套名
        let bankObjData = state.bankObjData;
        bankObjData.length = 0;
        arr.forEach(item => bankObjData.push(item));
    },
    
}

const actions = {
    getTreeData({state,commit,rootState},$url){
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setTreeData', res.data.data);
                }
            }
        })
    },
    getCategoryData({state,commit,rootState},$url){                         //获取类别数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setCategoryData', res.data.data['objectList']);
                }
            }
        })
    },
    getAccountProjectData({ state, commit, rootState }, $url) {             //获取核算项目树形数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateAccountProjectData', res.data.data);
                }
            }
        });
    },
    getSubsidiaryData({state,commit,rootState},$url){                       //查询明细账数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let searchAllResultTwo = state.searchAllResultTwo,
                        data = res.data.data;
                    state.searchAllResultTwo.length = 0;
                    data.forEach(item => searchAllResultTwo.push(item));
                    commit('setSubsidiaryData', res.data.data);
                }
            }
        })
    },
    getSearchData({state}, $url) {                                          //搜索
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
    },
    getCompactData({state,commit,rootState},$url){                          //辅助资料树形所有数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('setCompactData', res.data.data);
                }
            }
        })
    },
    getXsSubClassDetails({state, commit, rootState}, obj) {                 //获取小类明细表格数据
        Axios({
            url: obj.url,
            method: 'get',
            params: {infoId: obj.id}
        }).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateXsData', res.data.data);
                }
            }
        });
    },
    getCgSubClassDetails({state, commit, rootState}, obj) {                 //获取小类明细表格数据
        Axios({
            url: obj.url,
            method: 'get',
            params: {infoId: obj.id}
        }).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateCgData', res.data.data);
                }
            }
        });
    },
    getBankData({state, commit, rootState}, obj) {                 //获取小类明细表格数据
        Axios({
            url: obj.url,
            method: 'get',
            params: {infoId: obj.id}
        }).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    commit('updateBankData', res.data.data);
                }
            }
        });
    },
    getSubsidiary1Data({state,commit,rootState},$url){                                          //获取银行存款明细账数据
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let searchAllResultTwo = state.searchAllResultTwo,
                        data = res.data.data;
                    state.searchAllResultTwo.length = 0;
                    data.forEach(item => searchAllResultTwo.push(item));
                    commit('setSubsidiary1Data', res.data.data);
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
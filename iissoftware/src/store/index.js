import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);

const state = {
    systemInfo: [],             //系统信息
    companyName: '',        //公司名称
    systemId: '',           //系统id
    year: [],               //存储会计区间开始年度和结束年度
    Set: {                  //权限
        PersonCenter: '',       //个人中心
        Approval: '',           //财务审批
        Manage: '',             //调整管理
        ReportForm: '',         //统计报表
        OA: '',                 //OA办公
        BasicData: '',          //基础资料
        kuaiji: '',             //会计科目
        money: '',              //币别
        jiliang: '',             //计量单位
        jiesuan: '',             //结算方式
        hesuan: '',             //核算项目
        fuzhu: '',             //辅助资料
        chengshi: '',             //城市字典
        xitong: '',             //系统参数
        shangji: '',             //上机日志
        bumen: '',             //部门资料
        zhiyuan: '',             //职员资料
        kehu: '',             //客户资料
        gongyingshang: '',             //供应商资料
        yonghuzu: '',             //用户组管理
        shenpi: '',             //审批流程
        yonghu: '',             //用户管理
        fieyong: '',             //费用报销类别设置
        shoufukuan: '',             //收付款类别设置
        churuku: '',             //出入库类别设置
        wanneng: '',             //万能调整单类别设置
        chushihua: '',             //初始数据
        qiyong: '',             //启用系统
        jiekuan:'',             //借款模板设置
        baobiao:'',             //报表查询器
        boolBasicData: false,   //是否显示基础资料
        boolFinancial:false,    //是否显示财务审批
        boolReport:false,       //是否显示统计报表
    },
    initializeVal: [],      //初始化页面的表格数据
    initailizeId:[],        //初始化表格数据id
}

const mutations = {
    updateSystemInfo(state, obj) {
        state.systemInfo.length = 0;
        state.systemId = obj['id'];
        state.systemInfo.push(obj);
    },
    updateCompanyNames(state, name) {       //更新公司名称
        state.companyName = name;
    },
    loginSet(state, params){                //权限
        state.Set.PersonCenter = '';state.Set.Approval = '';state.Set.Manage = '';
        state.Set.ReportForm = '';state.Set.OA = '';state.Set.BasicData = '';
        state.Set.kuaiji = '';state.Set.money = '';state.Set.jiliang = '';
        state.Set.jiesuan = '';state.Set.hesuan = '';state.Set.fuzhu = '';
        state.Set.chengshi = '';state.Set.xitong = '';state.Set.shangji = '';
        state.Set.bumen = '';state.Set.zhiyuan = '';state.Set.kehu = '';
        state.Set.gongyingshang = '';state.Set.yonghuzu = '';state.Set.shenpi = '';
        state.Set.yonghu = '';state.Set.fieyong = '';state.Set.shoufukuan = '';
        state.Set.churuku = '';state.Set.wanneng = '';state.Set.chushihua = '';state.Set.qiyong = '';
        state.Set.jiekuan = '';state.Set.baobiao = '';
        params.forEach(v => {
            if(v === 1) {
                state.Set.PersonCenter = 1;
            }else if(v === 2){
                state.Set.Approval = 2;
            }else if(v === 3){
                state.Set.Manage = 3;
            }else if(v === 4){
                state.Set.ReportForm = 4;
            }else if(v === 5){
                state.Set.OA = 5;
            }else if(v === 6){
                state.Set.BasicData = 6;
            }else if(v === 7){
                state.Set.kuaiji = 7;
                state.Set.boolBasicData = true;
            }else if(v === 8){
                state.Set.money = 8;
                state.Set.boolBasicData = true;
            }else if(v === 9){
                state.Set.jiliang = 9;
                state.Set.boolBasicData = true;
            }else if(v === 10){
                state.Set.jiesuan = 10;
                state.Set.boolBasicData = true;
            }else if(v === 11){
                state.Set.hesuan = 11;
                state.Set.boolBasicData = true;
            }else if(v === 12){
                state.Set.fuzhu = 12;
                state.Set.boolBasicData = true;
            }else if(v === 13){
                state.Set.chengshi = 13;
                state.Set.boolBasicData = true;
            }else if(v === 14){
                state.Set.xitong = 14;
                state.Set.boolBasicData = true;
            }else if(v === 15){
                state.Set.shangji = 15;
                state.Set.boolBasicData = true;
            }else if(v === 16){
                state.Set.bumen = 16;
                state.Set.boolBasicData = true;
            }else if(v === 17){
                state.Set.zhiyuan = 17;
                state.Set.boolBasicData = true;
            }else if(v === 18){
                state.Set.kehu = 18;
                state.Set.boolBasicData = true;
            }else if(v === 19){
                state.Set.gongyingshang = 19;
                state.Set.boolBasicData = true;
            }else if(v === 20){
                state.Set.yonghuzu = 20;
                state.Set.boolBasicData = true;
            }else if(v === 22){
                state.Set.shenpi = 22;
                state.Set.boolBasicData = true;
            }else if(v === 23){
                state.Set.yonghu = 23;
                state.Set.boolBasicData = true;
            }else if(v === 24){
                state.Set.fieyong = 24;
                state.Set.boolBasicData = true;
            }else if(v === 25){
                state.Set.shoufukuan = 25;
                state.Set.boolBasicData = true;
            }else if(v === 26){
                state.Set.churuku = 26;
                state.Set.boolBasicData = true;
            }else if(v === 27){
                state.Set.wanneng = 27;
                state.Set.boolBasicData = true;
            }else if(v === 28){
                state.Set.chushihua = 28;
                state.Set.boolBasicData = true;
            }else if(v === 29){
                state.Set.qiyong = 29;
                state.Set.boolBasicData = true;
            }else if(v === 30){
                state.Set.jiekuan = 30;
                state.Set.boolBasicData = true;
            }else if(v === 31){
                state.Set.baobiao = 31;
                state.Set.boolReport = true;
            }
        })
    },
    setSystemId(state, id) {
        state.systemId = id;
    },
    updateYear(state, obj) {                //更新会计区间
        let startYear = obj.startYear,
            endYear = obj.endYear,
            year = state.year;
        year.length = 0;        //清空上一次数据
        for(let i = startYear; i <= endYear; i++) {
            year.push(i);
        }
    },
    setInitializeVal(state, data){                     //初始化页面的表格字段
        let initializeVal = state.initializeVal;
        initializeVal.length = 0;          //清空数组
        data.forEach(item => initializeVal.push(item));
    },
    setInitializeValId(state,id){
        state.initailizeId = id;
    },
    clearInitializeVal(state){              //清空初始化页面的表格字段
        state.initializeVal.length = 0;
    }
}

const actions = {
    getSystemId({ state, commit, rootState }, $url){            //获取系统id
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data){
                    commit('updateSystemInfo', res.data.data);
                }               
            }
        })
    }
}

//引入模块
import loginStore from '../components/basic/login/store'
import moneyTypeStore from '../components/basic/moneyType/store'
import measureStore from '../components/basic/measure/store'
import secondaryStore from '../components/basic/secondary/store'
import subjectStore from '../components/basic/accountSubject/store'
import userGroupStore from '../components/basic/userGroupManage/store'              //用户组
import supplierStore from '../components/basic/supplierInformation/store'           //供应商
import staffStore from '../components/basic/staff/store'                            //职员
import userManagementStore from '../components/basic/userManagement/store'
import customerStore from '../components/basic/customer/store'
import accountProjectStore from '../components/basic/accountProject/store'
import approvalProcessStore from '../components/basic/approvalProcess/store'        //审批流程
import accountStore from '../components/basic/account/store'                        //账套管理
import initializeStore from '../components/basic/initialize/store'
import departmentStore from '../components/basic/department/store'                  //部门
import borrowTemplateStore from '../components/basic/borrowFormTemplate/store'      //借款单模板
import borrowOrderStore from '../components/financial/borrowOrder/store'          //借款单
import reportQuerierStore from '../components/report/reportQuerier/store'           //报表查询器
import expenseFormTemplateStore from '../components/basic/expenseFormTemplate/store' //费用报销单模板
import expenseFormStore from '../components/financial/expenseOrder/store' //费用报销单
const store = new Vuex.Store({
    namespaced: true,
    state,
    mutations,
    actions,
    modules: {
        loginStore,
        moneyTypeStore,
        measureStore,
        secondaryStore,
        subjectStore,
        userManagementStore,
        userGroupStore,
        supplierStore,
        staffStore,
        accountProjectStore,
        customerStore,
        approvalProcessStore,
        accountStore,
        initializeStore,
        departmentStore,
        borrowTemplateStore,
        reportQuerierStore,
        borrowOrderStore,
        expenseFormTemplateStore,
        expenseFormStore,
    }
});

export default store;
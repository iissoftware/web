import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import BasicData from '@/components/basic/BasicData'                        //基础资料页面
import FinancialApproval from '@/components/financial/FinancialApproval'    //财务审批页面
import StatisticalReport from '@/components/report/StatisticalReport'       //统计报表页面

// -----------------------基础资料界面----------------------
//会计科目
import AccountSubject from '@/components/basic/accountSubject/AccountSubject'
import addSubject from '@/components/basic/accountSubject/addSubject'
import updateSubject from '@/components/basic/accountSubject/updateSubject'
import selectSubjectType from '@/components/basic/accountSubject/selectSubjectType'
import subjectGroup from '@/components/basic/accountSubject/subjectGroup'
import addSubjectGroup from '@/components/basic/accountSubject/addSubjectGroup'
import updateSubjectGroup from '@/components/basic/accountSubject/updateSubjectGroup'
//币别
import MoneyType from '@/components/basic/moneyType/MoneyType'
import moneyTypeAddRow from '@/components/basic/moneyType/addRow'
import MTUpdateRow from '@/components/basic/moneyType/updateRow'
//计量单位
import Measure from '@/components/basic/measure/Measure'
import MSUnitGroupAddRow from '@/components/basic/measure/unitGroupAddRow'
import MSUnitGroupUpdateRow from '@/components/basic/measure/unitGroupUpdateRow'
import MSUnitAddRow from '@/components/basic/measure/unitAddRow'
import MSUnitUpdateRow from '@/components/basic/measure/unitUpdateRow'
//结算方式
import BalanceType from '@/components/basic/balanceType/BalanceType'
import BTAddRow from '@/components/basic/balanceType/addRow'
import BTUpdateRow from '@/components/basic/balanceType/updateRow'
//辅助资料
import secondary from '@/components/basic/secondary/secondary'
import secondary2 from '@/components/basic/secondary/secondary2'
import subClass from '@/components/basic/secondary/subClass'
import carNumber from '@/components/basic/secondary/carNumber'
import contractNumber from '@/components/basic/secondary/contractNumber'
import goodsInfo from '@/components/basic/secondary/goodsInfo'
import ordinary from '@/components/basic/secondary/ordinary'
import bank from '@/components/basic/secondary/bank'

//城市字典
import CityDictionary from '@/components/basic/CityDictionary'
//账套管理
import account from '@/components/basic/account/account'
import updateYear from '@/components/basic/account/updateYear'
//上机日志
import OnlineLog from '@/components/basic/OnlineLog'
//部门
import Department from '@/components/basic/department/Department'
import departmentAddRow from '@/components/basic/department/addRow'
import departmentUpdateRow from '@/components/basic/department/updateRow'
import lastDepartTree from '@/components/basic/department/lastDepartTree'
//职员
import staff from '@/components/basic/staff/Staff'
import staffAddChoose from '@/components/basic/staff/addChoose'
import staffAdd from '@/components/basic/staff/add'
import staffUpdate from '@/components/basic/staff/update'
import staffLook from '@/components/basic/staff/look'
import staffChooseDepartment from '@/components/basic/staff/department'
//核算项目
import AccountProject from '@/components/basic/accountProject/AccountProject'
import AccountProjectAdd from '@/components/basic/accountProject/addRow'
import AccountProjectUpdate from '@/components/basic/accountProject/updateRow'
import AccountProjectLastType from '@/components/basic/accountProject/lastType'
//用户组管理
import UserGroup from '@/components/basic/userGroupManage/UserGroup'
import UserGroupAdd from '@/components/basic/userGroupManage/add'
import UserGroupUpdate from '@/components/basic/userGroupManage/update' 
//供应商资料
import Supplier from '@/components/basic/supplierInformation/Supplier'
import addSupplier from '@/components/basic/supplierInformation/addSupplier'
import updateSupplier from '@/components/basic/supplierInformation/updateSupplier'
import lookSupplier from '@/components/basic/supplierInformation/lookSupplier'
import supplierDepartment from '@/components/basic/supplierInformation/department'
//登陆
import Login from '@/components/basic/login/login'
//用户管理
import UserManagement from '@/components/basic/userManagement/UserManagement'
import Authorization from '@/components/basic/userManagement/Authorization'
import AuthorizationAddCustomer from '@/components/basic/userManagement/addCustomerAuthorized'
import UpdateUserManagement from '@/components/basic/userManagement/updateUserManagement'
import Documents from '@/components/basic/userManagement/Documents'
//客户资料
import Customer from '@/components/basic/customer/Customer'
import AddCustomer from '@/components/basic/customer/addCustomer'
import CustomerLastDepartTree from '@/components/basic/customer/lastDepartTree'
import UpdateCustomer from '@/components/basic/customer/updateCustomer'
import ReaderCustomer from '@/components/basic/customer/readerCustomer'
//审批流程
import ApprovalProcess from '@/components/basic/approvalProcess/ApprovalProcess'
import oneAdd from '@/components/basic/approvalProcess/oneAdd'
import twoAdd from '@/components/basic/approvalProcess/twoAdd'
import threeAdd from '@/components/basic/approvalProcess/threeAdd'
import fourAdd from '@/components/basic/approvalProcess/fourAdd'
import addEmployeeRow from '@/components/basic/approvalProcess/addEmployeeRow'
//初始化
import Initialize from '@/components/basic/initialize/Initialize'
import SubsidiaryLedger1 from '@/components/basic/initialize/subsidiaryLedger1'
import SubsidiaryLedger2 from '@/components/basic/initialize/subsidiaryLedger2'
import SubsidiaryLedger3 from '@/components/basic/initialize/subsidiaryLedger3'
import SubsidiaryLedger4 from '@/components/basic/initialize/subsidiaryLedger4'
import Balance from '@/components/basic/initialize/balance'
import Objects from '@/components/basic/initialize/object'
import XsCompact from '@/components/basic/initialize/xscompactCode'
import BankData from '@/components/basic/initialize/bankData'
//启用系统
import EnableSystem from '@/components/basic/enableSystem'
//费用报销单模板设置
import ExpenseFormTemplate from '@/components/basic/expenseFormTemplate/ExpenseTemplate'
import ExpenseFormTemplateAdd from '@/components/basic/expenseFormTemplate/addRow'
import ExpenseFormTemplateUpdate from '@/components/basic/expenseFormTemplate/updateRow'
import ExpenseFormTemplateLook from '@/components/basic/expenseFormTemplate/look'
//借款单模板设置
import BorrowFormTemplate from '@/components/basic/borrowFormTemplate/BorrowTemplate'
import BorrowFormTemplateAdd from '@/components/basic/borrowFormTemplate/addBorrow'
import BorrowFormTemplateUpdate from '@/components/basic/borrowFormTemplate/updateBorrow'
import BorrowFormTemplateLook from '@/components/basic/borrowFormTemplate/lookBorrow'


// -----------------------------财务审批界面模块----------------------------
// 借款单
import BorrowOrder from '@/components/financial/borrowOrder/BorrowOrder'
import BorrowOrderAdd from '@/components/financial/borrowOrder/addBorrow'
import BorrowOrderLoan from '@/components/financial/borrowOrder/loan'           //借款类别
import BorrowOrderExamine from '@/components/financial/borrowOrder/examine'     //审核
import BorrowOrderImportMoudle from '@/components/financial/borrowOrder/importMoudle'
import BorrowOrderSaveMoudle from '@/components/financial/borrowOrder/saveMoudle'

//费用报销单
import ExpenseOrder from '@/components/financial/expenseOrder/ExpenseOrder'//费用报销单列表页面
import ExpenseOrderAdd from '@/components/financial/expenseOrder/addRow'//费用报销新增页面
import LevelCourse  from '@/components/financial/expenseOrder/levelCourse'//选择往来末级科目
import ReimbursementMatters from '@/components/financial/expenseOrder/reimbursementMatters'//选择报销事项
import Audit from '@/components/financial/expenseOrder/audit'//审核主页面
import SaveTemplate from '@/components/financial/expenseOrder/saveTemplete'
import ImportTemplate from '@/components/financial/expenseOrder/importTemplete'


// ------------------------统计报表界面模块----------------------------
//报表查询器
import ReportSearch from '@/components/report/reportQuerier/ReportSearch'
import ReportSearchDepartment from '@/components/report/reportQuerier/department'
import ReportSearchProject from '@/components/report/reportQuerier/project'
import ReportSearchStaff from '@/components/report/reportQuerier/staff'
import ReportSearchBank from '@/components/report/reportQuerier/bank'
import ReportSearchUnitOne from '@/components/report/reportQuerier/withUnitOne'
import ReportSearchUnitTwo from '@/components/report/reportQuerier/withUnitTwo'
import ReportSearchUnitThree from '@/components/report/reportQuerier/withUnitThree'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/BasicData'
    },
    {
      path: '/financialApproval',                   //财务审批路由
      name: 'FinancialApproval',
      component: FinancialApproval,
    },    
    {
      path: '/BasicData',                           //基础资料路由
      name: 'BasicData',
      component: BasicData
    },
    {
      path: '/StatisticalReport',                   //统计报表路由
      name: 'StatisticalReport',
      component: StatisticalReport
    },
    
    // ---------------------<基础资料界面>----------------------
    {
      path: '/accountSubject',       //会计科目
      name: 'AccountSubject',
      component: AccountSubject
    },
    {
      path: '/accountSubject/addSubject',       //会计科目新增
      name: 'addSubject',
      component: addSubject
    },
    {
      path: '/accountSubject/updateSubject',       //会计科目修改
      name: 'updateSubject',
      component: updateSubject
    },
    {
      path: '/accountSubject/selectSubjectType',       //会计科目核算类别
      name: 'selectSubjectType',
      component: selectSubjectType
    },
    {
      path: '/accountSubject/subjectGroup',       //科目组
      name: 'subjectGroup',
      component: subjectGroup
    },
    {
      path: '/accountSubject/addSubjectGroup',       //科目组新增
      name: 'addSubjectGroup',
      component: addSubjectGroup
    },
    {
      path: '/accountSubject/updateSubjectGroup',       //科目组修改
      name: 'updateSubjectGroup',
      component: updateSubjectGroup
    },
    {
      path: '/moneyType',       //币别
      name: 'MoneyType',
      component: MoneyType
    },
    {
      path: '/moneyType/add',       //币别新增
      name: 'moneyTypeAddRow',
      component: moneyTypeAddRow
    },
    {
      path: '/moneyType/update',       //币别修改
      name: 'MTUpdateRow',
      component: MTUpdateRow
    },
    {
      path: '/measure',       //计量单位
      name: 'Measure',
      component: Measure
    },
    {
      path: '/measure/unitGroupAdd',       //计量单位组新增
      name: 'MSUnitGroupAddRow',
      component: MSUnitGroupAddRow
    },
    {
      path: '/measure/unitGroupUpdate',       //计量单位组修改
      name: 'MSUnitGroupUpdateRow',
      component: MSUnitGroupUpdateRow
    },
    {
      path: '/measure/unitAdd',       //计量单位新增
      name: 'MSUnitAddRow',
      component: MSUnitAddRow
    },
    {
      path: '/measure/unitUpdate',       //计量单位修改
      name: 'MSUnitUpdateRow',
      component: MSUnitUpdateRow
    },
    {
      path: '/balanceType',       //结算方式
      name: 'BalanceType',
      component: BalanceType
    },
    {
      path: '/balanceType/add',       //结算方式新增
      name: 'BTAddRow',
      component: BTAddRow
    },
    {
      path: '/balanceType/update',       //结算方式修改
      name: 'BTUpdateRow',
      component: BTUpdateRow
    },
    {
      path: '/secondary',       //辅助资料
      name: 'secondary',
      component: secondary
    },
    {
      path: '/secondary2',       //辅助资料明细
      name: 'secondary2',
      component: secondary2
    },
    {
      path: '/secondary/subClass',       //辅助资料-小类新增与修改
      name: 'subClass',
      component: subClass
    },
    {
      path: '/secondary/carNumber',       //辅助资料-车牌号码新增与修改
      name: 'carNumber',
      component: carNumber
    },
    {
      path: '/secondary/contractNumber',       //辅助资料-合同编号新增与修改
      name: 'contractNumber',
      component: contractNumber
    },
    {
      path: '/secondary/goodsInfo',       //辅助资料-货号资料新增与修改
      name: 'goodsInfo',
      component: goodsInfo
    },
    {
      path: '/secondary/ordinary',       //辅助资料-普通资料新增与修改
      name: 'ordinary',
      component: ordinary
    },
    {
      path: '/secondary/bank',       //辅助资料-银行资料新增与修改
      name: 'bank',
      component: bank
    },
    {
      path: '/cityDictionary',       //城市字典
      name: 'CityDictionary',
      component: CityDictionary
    },
    {
      path: '/account',      //帐套管理
      name: 'account',
      component: account
    },
    {
      path: '/account/updateYear',      //修改会计区间
      name: 'updateYear',
      component: updateYear
    },
    {
      path: '/onlineLog',       //上机日志
      name: 'OnlineLog',
      component: OnlineLog
    },
    {
      path: '/department',       //部门资料
      name: 'Department',
      component: Department
    },
    {
      path: '/department/addRow',       //部门资料新增
      name: 'departmentAddRow',
      component: departmentAddRow
    },
    {
      path: '/department/updateRow',       //部门资料修改
      name: 'departmentUpdateRow',
      component: departmentUpdateRow
    },
    {
      path: '/department/lastDepartTree',       //上级部门弹窗
      name: 'lastDepartTree',
      component: lastDepartTree
    },
    {
      path: '/staff',                            //职员资料
      name: 'staff',
      component: staff
    },
    {
      path: '/staff/staffAddChoose',             //职员资料新增方式
      name: 'staffAddChoose',
      component: staffAddChoose
    },
    {
      path: '/staff/add',                       //职员资料新增
      name: 'staffAdd',
      component: staffAdd
    },
    {
      path: '/staff/update',                     //职员资料修改
      name: 'staffUpdate',
      component: staffUpdate
    },
    {
      path: '/staff/look',                        //职员资料查看
      name: 'staffLook',
      component: staffLook
    },
    {
      path: '/staff/chooseDepartment',              //职员资料选择部门
      name: 'staffChooseDepartment',
      component: staffChooseDepartment
    },
    {
      path: '/customer',           //客户资料
      name: 'Customer',
      component: Customer
    },
    {
      path: '/customer/add',           //新增客户资料
      name: 'AddCustomer',
      component: AddCustomer
    },
    {
      path: '/customer/lastDepartTree',       //上级部门弹窗
      name: 'CustomerLastDepartTree',
      component: CustomerLastDepartTree
    },
    {
      path: '/customer/update',           //修改客户资料
      name: 'UpdateCustomer',
      component: UpdateCustomer
    },
    {
      path: '/customer/reader',           //查看客户资料
      name: 'ReaderCustomer',
      component: ReaderCustomer
    },
    {
      path: '/supplierInformation',        //供应商资料
      name: 'SupplierInformation',
      component: Supplier
    },
    {
      path: '/supplierInformation/add',        //供应商资料新增
      name: 'SupplierAdd',
      component: addSupplier
    },
    {
      path: '/supplierInformation/update',        //供应商资料修改
      name: 'SupplierUpdate',
      component: updateSupplier
    },
    {
      path: '/supplierInformation/look',        //供应商资料查看
      name: 'SupplierLook',
      component: lookSupplier
    },
    {
      path: '/supplierInformation/department',        //供应商资料分管部门
      name: 'supplierDepartment',
      component: supplierDepartment
    },
    {
      path: '/accountProject',           //核算项目
      name: 'AccountProject',
      component: AccountProject
    },
    {
      path: '/accountProject/add',           //核算项目新增
      name: 'AccountProjectAdd',
      component: AccountProjectAdd
    },
    {
      path: '/accountProject/update',           //核算项目修改
      name: 'AccountProjectUpdate',
      component: AccountProjectUpdate
    },
    {
      path: '/accountProject/lastType',           //核算项目上级类别
      name: 'AccountProjectLastType',
      component: AccountProjectLastType
    },
    {
      path: '/userGroupManage',           //用户组管理
      name: 'UserGroupManage',
      component: UserGroup
    },
    {
      path: '/userGroupManage/add',           //用户组管理新增
      name: 'UserGroupManageAdd',
      component: UserGroupAdd
    },
    {
      path: '/userGroupManage/update',           //用户组管理修改
      name: 'UserGroupManageUpdate',
      component: UserGroupUpdate
    },
    {
      path: '/login',                             //登陆
      name: 'Login',
      component: Login
    },
    {
      path: '/userManagement',            //用户管理
      name: 'UserManagement',
      component: UserManagement
    },
    {
      path: '/userManagement/Authorization',            //用户管理授权
      name: 'Authorization',
      component: Authorization
    },
    {
      path: '/userManagement/addCustomerAuthorized',    //用户管理授权新增客户查看权限
      name: 'AuthorizationAddCustomer',
      component: AuthorizationAddCustomer
    },
    {
      path: '/userManagement/updateUserManagement',    //修改用户管理
      name: 'UpdateUserManagement',
      component: UpdateUserManagement
    },
    {
      path: '/userManagement/Documents',    //用户管理的单据模块
      name: 'Documents',
      component: Documents
    },
    {
      path: '/approvalProcess',    //审批流程
      name: 'ApprovalProcess',
      component: ApprovalProcess
    },
    {
      path: '/approvalProcess/oneAdd',    //审批流程-会计科目-新增
      name: 'oneAdd',
      component: oneAdd
    },
    {
      path: '/approvalProcess/twoAdd',    //审批流程-部门-新增
      name: 'twoAdd',
      component: twoAdd
    },
    {
      path: '/approvalProcess/threeAdd',    //审批流程-职员-新增
      name: 'threeAdd',
      component: threeAdd
    },
    {
      path: '/approvalProcess/fourAdd',    //审批流程-金额-新增
      name: 'fourAdd',
      component: fourAdd
    },
    {
      path: '/approvalProcess/addEmployeeRow',    //审批流程-新增审核人
      name: 'addEmployeeRow',
      component: addEmployeeRow
    },
    {
      path: '/initialize',         //初始化
      name: 'Initialize',
      component: Initialize
    },
    {
      path: '/initialize/subsidiaryLedger1',         //银行存款明细账
      name: 'SubsidiaryLedger1',
      component: SubsidiaryLedger1
    },
    {
      path: '/initialize/subsidiaryLedger2',         //应收账款明细账
      name: 'SubsidiaryLedger2',
      component: SubsidiaryLedger2
    },
    {
      path: '/initialize/subsidiaryLedger3',         //应付账款明细账
      name: 'SubsidiaryLedger3',
      component: SubsidiaryLedger3
    },
    {
      path: '/initialize/subsidiaryLedger4',         //普通明细账
      name: 'subsidiaryLedger4',
      component: SubsidiaryLedger4
    },
    {
      path: '/initialize/balance',              //试算平衡
      name: 'Balance',
      component: Balance
    },
    {
      path: '/initialize/bankData',             //账户名弹窗/明细账
      name: 'BankData',
      component: BankData
    },
    {
      path: '/initialize/objects',
      name: 'Objects',
      component: Objects
    },
    {
      path: '/initialize/XsCompact',
      name: 'XsCompact',
      component: XsCompact
    },
    {
      path: '/enableSystem',               //启用系统
      name: 'EnableSystem',
      component: EnableSystem
    },
    {
      path: '/expenseFormTemplate',               //费用报销单模板设置
      name: 'ExpenseFormTemplate',
      component: ExpenseFormTemplate
    },
    {
      path: '/expenseFormTemplate/add',           //费用报销单模板设置新增
      name: 'ExpenseFormTemplateAdd',
      component: ExpenseFormTemplateAdd
    },
    {
      path: '/expenseFormTemplate/update',           //费用报销单模板设置修改
      name: 'ExpenseFormTemplateUpdate',
      component: ExpenseFormTemplateUpdate
    },
    {
      path: '/expenseFormTemplate/look',          //查看
      name: 'ExpenseFormTemplateLook',
      component: ExpenseFormTemplateLook
    },
    {
      path: '/borrowFormTemplate',                    //借款模板设置
      name: 'BorrowFormTemplate',
      component: BorrowFormTemplate
    },
    {
      path: '/borrowFormTemplate/add',                //借款模板设置新增
      name: 'BorrowFormTemplateAdd',
      component: BorrowFormTemplateAdd
    },
    {
      path: '/borrowFormTemplate/update',             //借款模板设置修改
      name: 'BorrowFormTemplateUpdate',
      component: BorrowFormTemplateUpdate
    },
    {
      path: '/borrowFormTemplate/look',               //借款模板设置查看
      name: 'BorrowFormTemplateLook',
      component: BorrowFormTemplateLook
    },

    // --------------------------<财务审批界面>--------------------------
    {
      path: '/borrowOrder',                               //借款单
      name: 'BorrowOrder',
      component: BorrowOrder
    },
    {
      path: '/borrowOrder/add',                           //借款单新增
      name: 'BorrowOrderAdd',
      component: BorrowOrderAdd
    },
    {
      path: '/borrowOrder/loan',                          //借款单借款类别
      name: 'BorrowOrderLoan',
      component: BorrowOrderLoan
    },
    {
      path: '/borrowOrder/examine',                       //借款单审核页面
      name: 'BorrowOrderExamine',
      component: BorrowOrderExamine
    },
    {
      path: '/borrowOrder/importMoudle',                  //借款单导入模板
      name: 'BorrowOrderImportMoudle',
      component: BorrowOrderImportMoudle
    },
    {
      path: '/borrowOrder/saveMoudle',                     //借款单存为模板
      name: 'BorrowOrderSaveMoudle',
      component: BorrowOrderSaveMoudle
    },
    {
      path: '/expenseOrder',                   //费用报销单
      name: 'ExpenseOrder',
      component: ExpenseOrder
    },
    {
      path: '/expenseOrder/add',                   //费用报销单新增
      name: 'ExpenseOrderAdd',
      component: ExpenseOrderAdd
    },    
    {
      path: '/expenseOrder/addRow/levelCourse',   //费用报销单新增中选择往来末级科目弹窗
      name: 'LevelCourse',
      component: LevelCourse
    },
    {
      path: '/expenseOrder/addRow/reimbursementMatters',//费用报销单新增中报销事项弹窗
      name: 'ReimbursementMatters',
      component: ReimbursementMatters
    },
    {
      path: '/expenseOrder/addRow/audit',//费用报销单新增中审核弹窗
      name: 'Audit',
      component: Audit
    },
    {
      path: '/expenseOrder/addRow/saveTemplate',//费用报销单新增中存为模板弹窗
      name: 'SaveTemplate',
      component: SaveTemplate
    },
    {
      path: '/expenseOrder/addRow/importTemplate',//费用报销单新增中导入模板弹窗
      name: 'ImportTemplate',
      component: ImportTemplate
    },

    // ---------------<统计报表界面>---------------
    {
      path: '/ReportSearch',                    //报表查询器
      name: 'ReportSearch',
      component: ReportSearch
    },
    {
      path: '/ReportSearch/department',                    //报表查询器部门选择
      name: 'ReportSearchDepartment',
      component: ReportSearchDepartment
    },
    {
      path: '/ReportSearch/project',                       //报表查询器科目选择
      name: 'ReportSearchProject',
      component: ReportSearchProject
    },
    {
      path: '/ReportSearch/staff',                          //报表查询器人员选择
      name: 'ReportSearchStaff',
      component: ReportSearchStaff
    },
    {
      path: '/ReportSearch/bank',                           //报表查询器银行选择
      name: 'ReportSearchBank',
      component: ReportSearchBank
    },
    {
      path: '/ReportSearch/unitOne',                           //报表查询器往来对象1
      name: 'ReportSearchUnitOne',
      component: ReportSearchUnitOne
    },
    {
      path: '/ReportSearch/unitTwo',                           //报表查询器往来对象2
      name: 'ReportSearchUnitTwo',
      component: ReportSearchUnitTwo
    },
    {
      path: '/ReportSearch/unitThree',                           //报表查询器往来对象3
      name: 'ReportSearchUnitThree',
      component: ReportSearchUnitThree
    },
  ]
})

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('isLogin') ? JSON.parse(sessionStorage.getItem('isLogin')) : '';
  if(isLogin['username']) {
    next();
  } else {
    if(to.path == '/login'){
      next();
    }else{
      next('/login');
    }
  }
});

export default router;

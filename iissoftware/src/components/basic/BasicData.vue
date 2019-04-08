<template>
    <div class="basicData">
        <v-header />
        <div class="main-content">
            <v-sidebar />
            <div class="rightBox">
                <div>
                <!-- 系统设置 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>系统设置</span>
                    </h3>
                    <div class="item-box" v-if="$store.state.Set.kuaiji == 7">
                        <div class="item" @click="showAccountSubject" v-if="$store.state.systemId">
                            <img src="../../assets/images/kuaiji.png" alt="">
                            <p class="item-name">会计科目</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyKuaji.png" alt="">
                            <p class="item-name">会计科目</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.money == 8">
                        <div class="item" @click="showMoneyType" v-if="$store.state.systemId">
                            <img src="../../assets/images/money.png" alt="">
                            <p class="item-name">币别</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyMoney.png" alt="">
                            <p class="item-name">币别</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.jiliang == 9">
                        <div class="item" @click="showMeasure" v-if="$store.state.systemId">
                            <img src="../../assets/images/jiliang.png" alt="">
                            <p class="item-name">计量单位</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyJiliang.png" alt="">
                            <p class="item-name">计量单位</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.jiesuan == 10">
                        <div class="item" @click="showBalanceType" v-if="$store.state.systemId">
                            <img src="../../assets/images/jiesuan.png" alt="">
                            <p class="item-name">结算方式</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyJiesuan.png" alt="">
                            <p class="item-name">结算方式</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.hesuan == 11">
                        <div class="item" @click="showAccountProject" v-if="$store.state.systemId">
                            <img src="../../assets/images/hesuan.png" alt="">
                            <p class="item-name">核算项目</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyHesuan.png" alt="">
                            <p class="item-name">核算项目</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.fuzhu == 12">
                        <div class="item" @click="showSecondary" v-if="$store.state.systemId">
                            <img src="../../assets/images/fuzhu.png" alt="">
                            <p class="item-name">辅助资料</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyFuzhu.png" alt="">
                            <p class="item-name">辅助资料</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.chengshi == 13">
                        <div class="item" @click="showCityDictionary" v-if="$store.state.systemId">
                            <img src="../../assets/images/chengshi.png" alt="">
                            <p class="item-name">城市字典</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyChenshi.png" alt="">
                            <p class="item-name">城市字典</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.xitong == 14">
                        <div class="item" @click="showSystem">
                            <img src="../../assets/images/xitong.png" alt="">
                            <p class="item-name">账套管理</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.shangji == 15">
                        <div class="item" @click="ShowOnlineLog" v-if="$store.state.systemId">
                            <img src="../../assets/images/shangji.png" alt="">
                            <p class="item-name">上机日志</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyShangji.png" alt="">
                            <p class="item-name">上机日志</p>
                        </div>
                    </div>
                </div>
                <!-- 档案资料 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>档案资料</span>
                    </h3>
                    <div class="item-box" v-if="$store.state.Set.bumen == 16">
                        <div class="item" @click="showDepartment" v-if="$store.state.systemId">
                            <img src="../../assets/images/bumen.png" alt="">
                            <p class="item-name">部门资料</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyBuMen.png" alt="">
                            <p class="item-name">部门资料</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.zhiyuan == 17">
                        <div class="item" @click="showStaff" v-if="$store.state.systemId">
                            <img src="../../assets/images/zhiyuan.png" alt="">
                            <p class="item-name">职员资料</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyZhiyuan.png" alt="">
                            <p class="item-name">职员资料</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.kehu == 18">
                        <div class="item" @click="showCustomer" v-if="$store.state.systemId">
                            <img src="../../assets/images/kehu.png" alt="">
                            <p class="item-name">客户资料</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyKehu.png" alt="">
                            <p class="item-name">客户资料</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.gongyingshang == 19">
                        <div class="item" @click="showSupplierInformation" v-if="$store.state.systemId">
                            <img src="../../assets/images/gongying.png" alt="">
                            <p class="item-name">供应商资料</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyGongying.png" alt="">
                            <p class="item-name">供应商资料</p>
                        </div>
                    </div>
                </div>
                <!-- 授权管理 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>授权管理</span>
                    </h3>
                    <div class="item-box" v-if="$store.state.Set.yonghuzu == 20">
                        <div class="item" @click="showUserGroup" v-if="$store.state.systemId">
                            <img src="../../assets/images/yonghugroup.png" alt="">
                            <p class="item-name">用户组管理</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyYonghugroup.png" alt="">
                            <p class="item-name">用户组管理</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.shenpi == 22">
                        <div class="item" @click="showApprovalProcess" v-if="$store.state.systemId">
                            <img src="../../assets/images/shenpi.png" alt="">
                            <p class="item-name">审批流程</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyShenpi.png" alt="">
                            <p class="item-name">审批流程</p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.yonghu == 23">
                        <div class="item" @click="showUserManagement" v-if="$store.state.systemId">
                            <img src="../../assets/images/yonghu.png" alt="">
                            <p class="item-name">用户管理</p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyYonghu.png" alt="">
                            <p class="item-name">用户管理</p>
                        </div>
                    </div>
                </div>
                <!-- 模板设置 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>模板设置</span>
                    </h3>
                    <div class="item-box" v-if="$store.state.Set.jiekuan == 30">
                        <div class="item" @click="showBorrowFormTemplate" v-if="$store.state.systemId">
                            <img src="../../assets/images/jiekuanleibie.png" alt="">
                            <p class="item-name"><span>借款类别模板</span></p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/grayjiekuanleibie.png" alt="">
                            <p class="item-name"><span>借款类别模板</span></p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.fieyong == 24">
                        <div class="item" @click="showExpenseFormTemplate" v-if="$store.state.systemId">
                            <img src="../../assets/images/feiyong.png" alt="">
                            <p class="item-name"><span>费用报销类别模板</span></p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyFeiyong.png" alt="">
                            <p class="item-name"><span>费用报销类别模板</span></p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.shoufukuan == 25">
                        <div class="item" v-if="$store.state.systemId">
                            <img src="../../assets/images/shoufu.png" alt="">
                            <p class="item-name"><span>收付款类别设置</span></p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyShoufu.png" alt="">
                            <p class="item-name"><span>收付款类别设置</span></p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.churuku == 26">
                        <div class="item" v-if="$store.state.systemId">
                            <img src="../../assets/images/churu.png" alt="">
                            <p class="item-name"><span>出入库类别设置</span></p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyChuru.png" alt="">
                            <p class="item-name"><span>出入库类别设置</span></p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.wanneng == 27">
                        <div class="item" v-if="$store.state.systemId">
                            <img src="../../assets/images/wanneng.png" alt="">
                            <p class="item-name"><span>万能调整单类别设置</span></p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyWanneng.png" alt="">
                            <p class="item-name"><span>万能调整单类别设置</span></p>
                        </div>
                    </div>
                </div>
                <!-- 初始化 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>初始化</span>
                    </h3>
                    <div class="item-box" v-if="$store.state.Set.chushihua == 28">
                        <div class="item" @click="showInitialize" v-if="$store.state.systemId">
                            <img src="../../assets/images/chushihua.png" alt="">
                            <p class="item-name"><span>初始数据</span></p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyChushihua.png" alt="">
                            <p class="item-name"><span>初始数据</span></p>
                        </div>
                    </div>
                    <div class="item-box" v-if="$store.state.Set.qiyong == 29">
                        <div class="item" @click="showEnableSystem" v-if="$store.state.systemId">
                            <img src="../../assets/images/qiyongxitong.png" alt="">
                            <p class="item-name"><span>启用系统</span></p>
                        </div>
                        <div class="item" v-else>
                            <img src="../../assets/images/greyQiyongxitong.png" alt="">
                            <p class="item-name"><span>启用系统</span></p>
                        </div>
                    </div>
                </div>
                </div>
                <!-- 版权信息 -->
                <copy-right/>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../Header'
import Sidebar from '../Sidebar'
import Copyright from './copyright'
export default {
    components: {
        'v-header': Header,
        'v-sidebar': Sidebar,
        'copy-right': Copyright
    },
    methods: {
        showAccountSubject() {       //会计科目
            this.$util.openLayerIframe('会计科目', 10, '90%', '90%', this.$domain + '/#/accountSubject');
        },
        showMoneyType() {       //币别
            this.$util.openLayerIframe('币别', 10, '90%', '90%', this.$domain + '/#/moneyType');
        },
        showDepartment() {      //部门资料
            this.$util.openLayerIframe('部门资料', 10, '90%', '90%', this.$domain + '/#/department');
        },
        showSecondary() {           //辅助资料
            this.$util.openLayerIframe('辅助资料', 10, '90%', '90%', this.$domain + '/#/secondary');
        },
        showBalanceType() {         //结算方式
            this.$util.openLayerIframe('结算方式', 10, '90%', '90%', this.$domain + '/#/balanceType');
        },
        ShowOnlineLog() {         //上机日志
            this.$util.openLayerIframe('上机日志', 10, '90%', '90%', this.$domain + '/#/onlineLog');
        },
        showMeasure() {         //计量单位
            this.$util.openLayerIframe('计量单位', 10, '90%', '90%', this.$domain + '/#/measure');
        },
        showStaff() {         //职员资料
            this.$util.openLayerIframe('职员资料', 10, '90%', '90%', this.$domain + '/#/staff');
        },
        showSystem() {          //账套管理
            this.$util.openLayerIframe('账套管理', 10, '90%', '90%', this.$domain + '/#/account');
        },
        showCustomer() {          //客户资料
            this.$store.commit('customerStore/clearTreeclickedId');
            this.$util.openLayerIframe('客户资料', 10, '90%', '90%', this.$domain + '/#/customer');
        },
        showSupplierInformation(){    //供应商资料
            this.$store.commit('supplierStore/clearTreeclickedId');
            this.$util.openLayerIframe('供应商资料', 10, '90%', '90%', this.$domain + '/#/supplierInformation');
        },
        showCityDictionary(){       //城市字典
            this.$util.openLayerIframe('城市字典', 10, '950px', '90%', this.$domain + '/#/cityDictionary');
        },
        showAccountProject(){       //核算项目
            this.$store.commit('accountProjectStore/updateCurrentNodeId', '');
            this.$util.openLayerIframe('核算项目', 10, '90%', '90%', this.$domain + '/#/accountProject');
        },
        showUserManagement(){       //用户管理
            this.$util.openLayerIframe('用户管理', 10, '90%', '90%', this.$domain + '/#/userManagement');
        },
        showUserGroup(){       //用户组管理
            this.$store.commit('userGroupStore/clearCurrentLightRow');
            this.$util.openLayerIframe('用户组管理', 10, '80%', '90%', this.$domain + '/#/userGroupManage');
        },
        showApprovalProcess(){       //审批流程
            this.$util.openLayerIframe('审批流程', 10, '90%', '90%', this.$domain + '/#/approvalProcess');
        },
        showInitialize(){       //初始化
            this.$store.commit('clearInitializeVal')
            this.$util.openLayerIframe('初始化', 10, '80%', '90%', this.$domain + '/#/initialize');
        },
        showEnableSystem(){             //启用系统
            this.$util.openLayerIframe('启用系统', 10, '45%', '45%', this.$domain + '/#/enableSystem');
        },
        showExpenseFormTemplate(){          //费用报销单模板设置
            this.$util.openLayerIframe('费用报销类别模板', 10, '80%', '90%', this.$domain + '/#/expenseFormTemplate');
        },
        showBorrowFormTemplate(){                  //借款类模板设置
            this.$util.openLayerIframe('借款类别模板', 10, '80%', '90%', this.$domain + '/#/borrowFormTemplate');
        },
        getSetData(){                       //获取用户权限
            this.$http.post(this.$url + 'userManage/menu').then(res => {
                this.$store.commit('loginSet', res.data.data);
            });
        }
    },
    created() {
        this.$store.dispatch('getSystemId', this.$url + 'systemParameters/selectSystemInfo');
        this.getSetData();
    }
}
</script>
<style lang="less" scoped>
    .main-content {min-width: 980px;}
    .rightBox {overflow-y: auto;height: 100%;position: relative;}
    .rightBox > div {
        overflow-y: auto;
    }
    .rightBox .list {
        background-color: #fff;
        margin: 2% auto;
        padding: 10px 0 25px;
        overflow: hidden;
        width: 96%;
        &:last-child{
            margin-bottom: 2%;
        }
        .list-title {
            font-size: 16px;
            font-weight: 400;
            padding: 0 20px;
            margin-bottom: 2%;
            span:before {
                content: "";
                display: inline-block;
                width: 4px;
                height: 18px;
                background-color: #e34e42;
                vertical-align: middle;
                margin: -3px 8px 0 0;
            }
        }
        .item-box{
            float: left;
            width: 10%;
            display: flex;
            justify-content: center;
            &:first-of-type {
                margin-left: 3%;
            }
            .item {
                width: 100%;
                text-align: center;
                cursor: pointer;
                min-height: 100px;
                position: relative;
                img {
                    // width: 60%;
                    height: auto;
                    // max-height: 55px;
                    display: inline-block;
                    // margin-bottom: 5px;
                }
                &:hover {
                    img {opacity: .8;}
                    p {color: #000;}
                }
                .item-name {
                    font-size: 14px;
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    .rightBox .list:nth-child(4) .item-name{font-size: 14px;}
    @media screen and (max-width: 1260px){
        .rightBox .list .item {width: 10%;min-height: 84px}
        .rightBox .list .item img {height: 46px;}
        // .rightBox .list .item .item-name span {
        //     width: 80px;
        //     display: inline-block;
        //     overflow: hidden;
        //     text-overflow: ellipsis;
        //     white-space: nowrap;
        // }
        .rightBox .list .list-title {font-size: 15px;}
    }
</style>
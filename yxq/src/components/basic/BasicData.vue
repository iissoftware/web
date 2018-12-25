<template>
    <div class="Index">
        <v-header/>
        <div class="main-content">
            <v-sidebar/>
            <div class="container">
                <!-- 系统设置 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>系统设置</span>
                    </h3>
                    <div class="item">
                        <img src="../../assets/images/kuaiji.png" alt="">
                        <p class="item-name">会计科目</p>
                    </div>
                    <div class="item" @click="showMoneyType">
                        <img src="../../assets/images/money.png" alt="">
                        <p class="item-name">币别</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/jiliang.png" alt="">
                        <p class="item-name">计量单位</p>
                    </div>
                    <div class="item" @click="showBalanceType">
                        <img src="../../assets/images/jiesuan.png" alt="">
                        <p class="item-name">结算方式</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/hesuan.png" alt="">
                        <p class="item-name">核算项目</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/fuzhu.png" alt="">
                        <p class="item-name">辅助资料</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/chengshi.png" alt="">
                        <p class="item-name">城市字典</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/xitong.png" alt="">
                        <p class="item-name">系统参数</p>
                    </div>
                    <div class="item" @click="showOnlieLog">
                        <img src="../../assets/images/shangji.png" alt="">
                        <p class="item-name">上机日志</p>
                    </div>
                </div>
                <!-- 档案资料 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>档案资料</span>
                    </h3>
                    <div class="item">
                        <img src="../../assets/images/bumen.png" alt="">
                        <p class="item-name">部门资料</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/zhiyuan.png" alt="">
                        <p class="item-name">职员资料</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/kehu.png" alt="">
                        <p class="item-name">客户资料</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/gongying.png" alt="">
                        <p class="item-name">供应商资料</p>
                    </div>
                </div>
                <!-- 授权管理 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>授权管理</span>
                    </h3>
                    <div class="item">
                        <img src="../../assets/images/yonghugroup.png" alt="">
                        <p class="item-name">用户组管理</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/jiaose.png" alt="">
                        <p class="item-name">角色管理</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/shenpi.png" alt="">
                        <p class="item-name">审批流程</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/yonghu.png" alt="">
                        <p class="item-name">用户管理</p>
                    </div>
                </div>
                <!-- 模板设置 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>模板设置</span>
                    </h3>
                    <div class="item">
                        <img src="../../assets/images/feiyong.png" alt="">
                        <p class="item-name">费用报销类别设置</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/shoufu.png" alt="">
                        <p class="item-name">收付款类别设置</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/churu.png" alt="">
                        <p class="item-name">出入库类别设置</p>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/wanneng.png" alt="">
                        <p class="item-name">万能调整单类别设置</p>
                    </div>
                </div>
            </div>
            <!-- 上机日志组件 -->
            <v-online-log v-if="abc"/>
            <!-- 币别组件 -->
            <v-money-type v-if="abc"/>
            <!-- 结算方式 -->
            <v-balance-type v-if="abc"/>
        </div>
    </div>
</template>
<script>
import Header from '../Header'
import Sidebar from '../Sidebar'
import OnlineLog from './OnlineLog'
import MoneyType from './MoneyType'
import BalanceType from './BalanceType'
export default {
    data() {
        return {
            abc: false
        }
    },
    components: {
        'v-header': Header,
        'v-sidebar': Sidebar,
        'v-online-log': OnlineLog,
        'v-money-type': MoneyType,
        'v-balance-type': BalanceType
    },
    methods: {
        showOnlieLog() {        //上机日志
            this.abc = true;
            setTimeout(() => {
                this.openDrag('上机日志', '80%', '500px', '#onlineLog', 12);
            })
        },
        showMoneyType() {       //币别
            this.abc = true;
            setTimeout(() => {
                this.openDrag('币别', '80%', '500px', '#moneyType', 12);
            })
        },
        showBalanceType() {     //结算方式
            this.abc = true;
            setTimeout(() => {
                this.openDrag('结算类别', '55%', 'auto', '#balanceType', 12);
            })
        },
        openDrag(title, width, height, id, zIndex) {           //封装打开窗口函数
            var that = this;
            layer.open({
                type: 1,
                title: title,
                shade: 0.3,
                shadeClose: false,
                zIndex: zIndex,
                maxmin: true,
                anim: 5,
                area: [width, height],
                content: $(id),
                full: function() {      //最大化后触发
                    $('.layui-layer-content,.dragBox .el-table__body-wrapper').css('height', '100%');
                },
                restore: function() {       //还原后触发
                    $('.layui-layer-content').removeAttr('style');
                    $('.dragBox .el-table__body-wrapper').removeAttr('style');
                },
                end: function() {
                    that.abc = false;
                }
            });
        }
    }
}
</script>
<style scoped lang="less">
    .main-content {
        height: 100%;
        background-color: #ecf8fb;
        margin-top: 60px;
        position: relative;
        .container {
            height: 100%;
            overflow-y: auto;
        }
        .list {
            background-color: #fff;
            width: 96%;
            margin: 20px auto;
            padding: 10px 0 25px;
            overflow: hidden;
            min-width: 1000px;
            box-shadow: 0 4px 16px #e2e2e2;
            .list-title {
                font-size: 16px;
                font-weight: normal;
                padding: 0 20px;
                margin-bottom: 1.5%;
                span:before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 18px;
                    background-color: #0054ec;
                    vertical-align: middle;
                    margin: -3px 8px 0 0;
                }
            }
            .item {
                width: 10%;
                text-align: center;
                float: left;
                cursor: pointer;
                img {
                    width: 56%;
                    margin-bottom: 5px;
                }
                .item-name{font-size: 14px;}
                &:nth-of-type(1) {margin-left: 3%;}
                &:hover {
                    img {opacity: .8;}
                    .item-name {color: #000}
                }
            }
        }
    }
</style>
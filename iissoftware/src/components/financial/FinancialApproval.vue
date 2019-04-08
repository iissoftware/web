<template>
    <div class="financial">
        <v-header />
        <div class="main-content">
            <v-sidebar />
            <div class="rightBox">
                <!-- 财务审批 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>财务审批</span>
                    </h3>
                    <div class="item-box">
                        <div class="item" @click="showBorrowOrder">
                            <img src="../../assets/images/jiekuandan.png" alt="">
                            <p class="item-name">借款单</p>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item" @click="showExpenseOrder">
                            <img src="../../assets/images/feiyongbaoxiaodan.png" alt="">
                            <p class="item-name">费用报销单</p>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item">
                            <img src="../../assets/images/fukuandan2.png" alt="">
                            <p class="item-name">付款单</p>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item">
                            <img src="../../assets/images/shoukuandan2.png" alt="">
                            <p class="item-name">收款单</p>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item">
                            <img src="../../assets/images/jiekuandan.png" alt="">
                            <p class="item-name">借款单</p>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item">
                            <img src="../../assets/images/jiekuandan.png" alt="">
                            <p class="item-name">借款单</p>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item">
                            <img src="../../assets/images/jiekuandan.png" alt="">
                            <p class="item-name">借款单</p>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item">
                            <img src="../../assets/images/jiekuandan.png" alt="">
                            <p class="item-name">借款单</p>
                        </div>
                    </div>
                </div>
                <!-- 其他审批 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>其他审批</span>
                    </h3>
                    <div class="item-box">
                        <div class="item" >
                            <img src="../../assets/images/jiekuandan.png" alt="">
                            <p class="item-name">借款类别审批单</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../Header'
import Sidebar from '../Sidebar'
export default {
    components: {
        'v-header': Header,
        'v-sidebar': Sidebar,
    },
    methods: {
        showBorrowOrder(){                  //借款单
            this.$util.openLayerIframe('借款单', 10, '95%', '90%', this.$domain + '/#/borrowOrder');
        },
        showExpenseOrder(){                 //费用报销单
            this.$util.openLayerIframe('费用报销单', 10, '95%', '90%', this.$domain + '/#/expenseOrder');
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
    .rightBox {overflow-y: auto;height: 100%;}
    .rightBox > div {
        overflow-y: auto;
    }
    .rightBox .list {
        background-color: #fff;
        margin: 2% auto;
        padding: 10px 0 20px;
        overflow: hidden;
        width: 96%;
        &:last-child{
            margin-bottom: 90px;
        }
        .list-title {
            font-size: 16px;
            font-weight: 400;
            padding: 0 20px;
            padding-bottom:10px;
            border:2px solid #e2e5e5;
            border-top-color:transparent;
            border-left-color:transparent;
            border-right-color:transparent;
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
            background-color: #f1f3f8;
            margin-left: 2%;
            margin-top: 1%;
            width:200px;
            .item {
                text-align: center;
                cursor: pointer;
                position: relative;
                display:table;
                padding:20px;
                img {
                    display: inline-block;
                    vertical-align: middle;
                    display:table-cell;
                    margin-right:20px;
                }
                &:hover {
                    img {opacity: .8;}
                    p {color: #000;}
                }
                .item-name {
                    font-size: 15px;
                    display:table-cell;
                    vertical-align: middle;
                    font-weight:bold;
                }
            }
        }
    }
    // .rightBox .list:nth-child(4) .item-name{font-size: 14px;}
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
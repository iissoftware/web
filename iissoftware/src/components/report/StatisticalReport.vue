<template>
    <div class="report">
        <v-header />
        <div class="main-content">
            <v-sidebar />
            <div class="rightBox">
                <!-- 系统设置 -->
                <div class="list">
                    <h3 class="list-title">
                        <span>统计报表</span>
                    </h3>
                    <div class="item-box">
                        <div class="item" @click="showReportQuerier">
                            <img src="../../assets/images/baobiao.png" alt="">
                            <p class="item-name">报表查询器</p>
                        </div>
                        <!-- <div class="item" v-else>
                            <img src="../../assets/images/baobiaogray.png" alt="">
                            <p class="item-name">报表查询器</p>
                        </div> -->
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
    methods:{
        showReportQuerier(){                                //报表查询器
            this.$util.openLayerIframe('报表查询器', 10, '90%', '90%', this.$domain + '/#/ReportSearch');
        },
        getSetData(){                                       //获取用户权限
            this.$http.post(this.$url + 'userManage/menu').then(res => {
                this.$store.commit('loginSet', res.data.data);
            });
        }
    },
    mounted(){
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
        padding: 10px 0 25px;
        overflow: hidden;
        width: 96%;
        &:last-child{
            margin-bottom: 90px;
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
                    height: auto;
                    display: inline-block;
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
        .rightBox .list .list-title {font-size: 15px;}
    }
</style>

<template>
    <div>
        <section class="header">
            <div class="header-top">
                <span class="el-icon-arrow-left" @click="$router.push('/')"></span>
                <span>我的</span>
            </div>
            <div class="header-bottom">
                <div class="head" ref="head"></div>
                <div class="msg">
                    <p>4****0</p>
                    <p><i class="el-icon-mobile-phone" style="margin-right: 3px"></i>{{ mobile }}</p>
                </div>
                <div class="el-icon-arrow-right userInfo"></div>
            </div>
        </section>
        <div class="pro-main">
            <div class="pro-list">
                <section class="header-index-xx">
                    <div>
                        <p style="color: rgb(0, 152, 251);"><span class="number">0.00</span>元</p>
                        <p>钱包</p>
                    </div>
                    <div>
                        <p style="color: rgb(255, 95, 62);"><span class="number">0</span>个</p>
                        <p>红包</p>
                    </div>
                    <div>
                        <p style="color: rgb(106, 194, 11);"><span class="number">0</span>个</p>
                        <p>金币</p>
                    </div>
                </section>
            </div>
            <div class="pro-list">
                <div><i class="icon icon-address"></i>我的地址</div>
            </div>
            <div class="pro-list dxs">
                <div><i class="icon icon-shop"></i>金币商城</div>
            </div>
            <div class="pro-list">
                <div><i class="icon icon-share"></i>分享拿5元现金</div>
            </div>
            <div class="pro-list dxs">
                <div><i class="icon icon-service"></i>我的客服</div>
            </div>
            <div class="pro-list">
                <div><i class="icon icon-download"></i>下载饿了么APP</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .header{
        height: 320px;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        padding: 0 40px;
        overflow: hidden;
        color: #fff;
    }
    .header-top {
        margin: 20px 0 50px;
        position: relative;
        overflow: hidden;
    }
    .header-top > span{
        display: block;
        float: left;
    }
    .header-top > span:first-child {
        width: 70px;
        position: absolute;
        left: 0;
        top: 2px;
        font-size: 50px;
    }
    .header-top > span:nth-child(2) {
        text-align: center;
        width: 670px;
        font-size: 40px;
        font-weight: bold;
    }
    .header-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-bottom .head,
    .header-bottom .userInfo {
        flex: 1;
    }
    .header-bottom .head {
        height: 150px;
        background: url(/static/img/head.png) no-repeat;
        background-size: 148px;
        border-radius: 50%;
        background-position: 0 0px;
        flex: 1
    }

    .header-bottom .msg {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 2.5;
        padding-left: 40px;
    }

    .header-bottom .userInfo{
        text-align: right;
        font-size: 40px;
    }
    .header-bottom .msg > p:first-child{
        font-size: 50px;
        padding-bottom: 10px;
    }

    .header-bottom .msg > p:last-child{
        font-size: 26px;
    }
    .pro-main{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        padding-top: 320px;
        z-index: -1;
    }
    .header-index-xx {
        display: flex;
    }

    .header-index-xx > div {
        flex: 1;
        text-align: center;
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
    }

    .header-index-xx > div > p:first-child{
        margin-bottom: 5px;
    }

    .header-index-xx > div > p:last-child{
        font-size: 26px;
        color: #666;
        letter-spacing: 1px;
    }

    .header-index-xx > div > p .number {
        font-size: 50px;
        font-weight: bold;
    }

    .header-index-xx > div + div{
        border-left: 1px solid #eee;
    }
    .pro-list {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-bottom: 25px;
        background-color: #fff;
        padding: 25px 0;
    }

    .pro-list.dxs{
        margin-bottom: -2px;
    }

    .pro-list > div {
        padding: 0 50px;
        font-size: 35px;
        color: #444
    }

    .icon {
        display: inline-block;
        width: 50px;
        height: 50px;
        vertical-align: middle;
        margin-right: 20px;
        margin-top: -2px;
    }

    .icon-address {
        background: url(/static/icon/icon-address.png) no-repeat;
        background-size: 100% 100%;
    }
    .icon-shop {
        background: url(/static/icon/icon-shop.png) no-repeat;
        background-size: 100% 100%;
    }
    .icon-share {
        background: url(/static/icon/icon-gift.png) no-repeat;
        background-size: 100% 100%;
    }
    .icon-service {
        background: url(/static/icon/icon-service.png) no-repeat;
        background-size: 100% 100%;
    }
    .icon-download {
        background: url(/static/icon/icon-download.png) no-repeat;
        background-size: 100% 100%;
    }
</style>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            mobile: ''
        }
    },
    mounted () {
        this.randomBg();
        this.getMobile();
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        randomBg () {                   //随机头像
            let bgPosArr = [0,1.96,3.946667,5.92,7.86,9.813];
            let headElem = this.$refs.head;
            let i = Math.floor(Math.random() * bgPosArr.length);
            headElem.style.cssText = `background-position-x: 0;
                                    background-position-y: ${ -bgPosArr[i] }rem;
                                    background-size:1.973333rem`;
        },
        getMobile () {
            this.$http.post('/api/getMobile',{token: this.token}).then( res => {

                this.mobile = res.data.mobile.replace(/^(\d{3})\d{4}(\d{4})/,'$1****$2');        //将手机号中间4位加密


            });
        }
    }
}
</script>
<template>
    <div class="index-body">
        <section class="header">
            <div class="head-top relative text-center">
                <span>{{$route.query.name}}</span>
                <span class="back absolute" @click="$router.push('/')"></span>
            </div>
        </section>
        <section class="condition">
            <div :class="index == 0 ? 'active' : '' " @click="tab(0)">综合排序</div>
            <div :class="index == 1 ? 'active' : '' " @click="tab(1)">销量最高</div>
            <div :class="index == 2 ? 'active' : '' " @click="tab(2)">好评优先</div>
            <div :class="index == 3 ? 'active' : '' " @click="tab(3)">配送费低</div>
        </section>
        <v-shoplist v-if="isShow"></v-shoplist>
        <div ref="mainshoplist" v-if="!isShow">
            <section class="shoplist" v-for="item in list">
                <div class="shop-img">
                    <img :src="'api' + item.img.substr(1)" width="100%" height="100%">
                </div>
                <div class="shop-info">
                    <p class="shop-name">{{ item.name }}</p>
                    <p class="rate">
                        <el-rate v-model="item.star" disabled show-score text-color="#ff9900" ></el-rate>
                        <span class="amount">月售{{item.sales}}单</span>
                    </p>
                    <div class="index-line-2x">
                        <p>￥{{item.take_off}}起送 | 配送费￥{{item.dispatch}}</p>
                        <p>3.42km | 49分钟</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<style scoped>
@import '../../assets/css/shoplist.css'
</style>
<style scoped>
    .head-top {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 1px;
        padding: 8px 0;
    }
    .head-top .back {
        width: 20px;
        height: 20px;
        display: block;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        background: url(/static/icon/icon-left.png) no-repeat;
        background-size: 100% 100%;
    }
    .condition {
        display: flex;
        text-align: center;
    }
    .condition > div {
        flex: 1;
        line-height: 40px;
    }
    .condition > div.active {
        font-weight: bold;
        font-size: 14px;
    }
</style>
<script>
import ShopList from './ShopList'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            isShow: true,
            index: 0,
            list: ''
        }
    },
    computed: {
        ...mapState('shopListModule',['goodsList'])
    },
    components: {
        'v-shoplist': ShopList
    },
    methods: {
        tab( index ) {
            this.index = index;
            let cid = parseInt(this.$route.query.cid);
            if( index != 0 ) {
                this.$http.post('/api/goods/conditionSearch',{index,cid}).then( res => {
                    this.list = res.data.data;
                    this.isShow = false;
                });
            } else {
                this.isShow = true;
            }
        }
    }
}
</script>
<template>
    <section class="index-tjshop">
        <section class="shoplist" v-for="item in goodsList">
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
    </section>
</template>
<style scoped>
@import '../../assets/css/shoplist.css'
</style>
<style type="text/css">
    .index-tjshop {
        margin-bottom: 60px;
    }
</style>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            list: ''
        }
    },
    computed: {
        ...mapState('tjshopModule',['goodsList'])
    },
    created () {
        if( !this.goodsList ) {
            this.getTJShopList();
        }
    },
    methods: {
        getTJShopList (){
            this.$http.post('/api/goods/tjshop').then( res => {
                console.log(res.data)
                this.$store.commit('tjshopModule/getTJShop',res.data.data);
            });
        }
    }
}
</script>
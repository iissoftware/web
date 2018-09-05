<template>
    <div>
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
    </div>
</template>
<style scoped>
@import '../../assets/css/shoplist.css'
</style>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('shopListModule',['goodsList'])
    },
    created () {
        this.getShopList();
    },
    methods: {
        getShopList() {
            let cid = parseInt(this.$route.query.cid);
            this.$http.post('/api/goods/shoplist',{ cid }).then( res => {
                this.$store.commit('shopListModule/getShopList',res.data.data);
            });
        }
    }
}
</script>
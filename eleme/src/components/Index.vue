<template>
    <div>
        <!-- header start -->
        <header>
            <div class="search-div" @click="$router.push('/search')">
                <span>水果 大牌立减30元</span>
            </div>
            <div class="search-li">
                <span>饺子</span>
                <span>炸鸡</span>
                <span>蛋糕</span>
                <span>水果减30</span>
                <span>麦当劳</span>
            </div>
        </header>
        <!-- header end -->
        <div class="m-show">
            <img src="../assets/img/banner-2.jpeg" width="100%" height="100%">
        </div>
        <!-- slider start -->
        <div class="main-slider">
            <mt-swipe :auto="5000">
                <mt-swipe-item v-for="n in arr" :key="n.length">
                    <a href="javascript:;" class="mint-item" v-for="item in n">
                        <div class="container">
                            <img :src="item.src">
                        </div>
                        <span>{{item.name}}</span>
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- slider end -->
        <div class="section-title">
            <span>推荐商家</span>
        </div>
        <recommend-seller/>
        <v-footer/>
    </div>
</template>
<style scoped>
    header {
        height: 150px;
        background:-webkit-linear-gradient(left top,#3a63e9,#011f82);
        background:-o-linear-gradient(left top,#3a63e9,#011f82);
        background:-moz-linear-gradient(left top,#3a63e9,#011f82);
        background:linear-gradient(left top,#3a63e9,#011f82);
        overflow: hidden;
        padding: 0 30px;
        position: sticky;
        top: 0;
        z-index: 999;
    }
    .search-div{
        height: 60px;
        background-color: #fff;
        margin-top: 30px;
        border-radius: 4px;
        text-align: center;
        color: #aaa;
        line-height: 62px;
    }
    .search-li {
        height: 60px;
        color: #fff;
        display: flex;
        align-items: center;
        text-align: center;
    }
    .search-li > span {
        flex: 1;
    }
    .m-show {
        height: 210px;
    }
    .main-slider {
        height: 340px;
    }
    .main-slider .mint-item {
        display: block;
        float: left;
        width: 20%;
        text-align: center;
        margin-top: 15px;
        color: #666;
    }
    .mint-item .container{
        width: 100%;
        height: 100%;
    }
    .mint-item .container img{
        width: 90px;
        height: 90px;
    }
    .mint-swipe-indicator {
        background-color: #2196F3 !important;
    }
</style>
<script>
import RecommendSeller from './RecommendSeller'
import Footer from './Footer'
export default {
    data () {
        return {
            arr: '',
            shoplist: []
        }
    },
    created () {
        this.getData();
    },
    methods: {
        getData () {            //商品类型
            this.$http.get('/static/prod-type.json')
            .then(( res ) => {
                this.arr = res.data;
            });
        }
    },
    components: {
        'recommend-seller': RecommendSeller,
        'v-footer' : Footer
    }
}
</script>
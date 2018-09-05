<template>
    <div>
        <div class="index-body" v-if="$route.path == '/'">
            <header class="header">
                <div class="searchBox">
                    <span>搜索饿了么商家、商家名称</span>
                </div>
            </header>
                <v-goodsCategory></v-goodsCategory>
            <!-- swipe end -->
            <section class="sec-title">
                <span>推荐商家</span>
            </section>
            <keep-alive>
                <v-tjsl></v-tjsl>
            </keep-alive>
            <v-footer></v-footer>
        </div>
        <router-view></router-view>
    </div>
</template>
<style scoped>
    .index-body {
        background-color: #fff;
    }
    .header {
        padding: 10px 15px;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
    }
    .searchBox {
        height: 40px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ccc;
        font-size: 14px;
        border-radius: 2px;
    }
    .searchBox > span:before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(/static/icon/icon-search.png) no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        margin: -2px 3px 0 0;
    }
</style>
<script>
import Footer from './Footer'
import GoodsCategory from './goods/GoodsCategory'
import TJShopList from './goods/TJShopList'
export default {
    components: {
        'v-goodsCategory': GoodsCategory,
        'v-tjsl' : TJShopList,
        'v-footer': Footer
    }
}
</script>

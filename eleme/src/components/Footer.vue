<template>
    <!-- footer start -->
    <footer>
        <div class="footer-item">
            <router-link to="/">
                <img :src="$route.path === '/' ? '/static/icon/icon-home-active.png' : '/static/icon/icon-home.png' ">
                <span>首页</span>
            </router-link>
        </div>
        <div class="footer-item">
            <router-link to="/discover">
                <img :src="$route.path === '/discover' ? '/static/icon/icon-discover-active.png' : '/static/icon/icon-discover.png' ">
                <span>发现</span>
            </router-link>
        </div>
        <div class="footer-item">
            <router-link to="/order">
                <img :src="$route.path === '/order' ? '/static/icon/icon-order-active.png' : '/static/icon/icon-order.png' ">
                <span>订单</span>
            </router-link>
        </div>
        <div class="footer-item">
            <router-link to="/profile">
                <img :src="$route.path === '/profile' ? '/static/icon/icon-profile-active.png' : '/static/icon/icon-profile.png' ">
                <span>我的</span>
            </router-link>
        </div>
    </footer>
    <!-- footer end -->
</template>
<style scoped>
    footer {
        height: 120px;
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        background-color: #fff;
        box-shadow: 0 0 2px 1px rgba(0,0,0,.1)
    }
    footer > div{
        flex: none;
        text-align: center;
        display: table;
        height: 100%;
        width: 25%;
    }
    footer > div > a {
        display: table-cell;
        vertical-align: middle;
    }
    .footer-item img {
        height: 46px;
        width: 46px;
        margin-bottom: 3px;
    }
    .footer-item span {
        display: block;
        color: #666;
    }
    .router-link-exact-active > span {
        color: #1296db;
    }
</style>

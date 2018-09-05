<template>
    <footer class="footer">
        <div class="item">
            <img :src="$route.path == '/' ? '/static/icon/icon-home-active.png' : '/static/icon/icon-home.png' ">
            <router-link to="/">首页</router-link>
        </div>
        <div class="item">
            <img :src="$route.path == '/discover' ? '/static/icon/icon-disco-active.png' : '/static/icon/icon-disco.png' ">
            <router-link to="/discover">发现</router-link>
        </div>
        <div class="item">
            <img :src="$route.path == '/order' ? '/static/icon/icon-order-active.png' : '/static/icon/icon-order.png' ">
            <router-link to="/order">订单</router-link>
        </div>
        <div class="item">
            <img :src="$route.path == '/profile' ? '/static/icon/icon-profile-active.png' : '/static/icon/icon-profile.png' ">
            <router-link to="/profile">我的</router-link>
        </div>
    </footer>
</template>
<style scoped>
@import '../assets/css/footer.css'
</style>
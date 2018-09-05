<template>
    <div class="lbg" v-if=" $route.path != '/user' ">
        <div class="llogo text-center">
            <img src="../assets/img/elem-logo.png">
            <p>Everything 30′</p>
        </div>
        <div class="switch-link">
            <router-link to="/user/smsLogin">短信登录</router-link>
            <router-link to="/user/login">密码登录</router-link>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>
<style scoped>
@import '../assets/css/user.css'
</style>
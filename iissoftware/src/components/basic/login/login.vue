<template>
    <div class="login-box">
        <!-- 头部　-->
        <v-header/>
        <!-- 标注 -->
        <div class="shadow-box">
            <div><img src="../../../assets/images/logText.png" alt=""></div>
        </div>

        <div v-if="!$store.state.loginStore.isOpenFotgotPass">
            <!-- 普通登录框区域 -->
            <div class="login-block" v-if="!$store.state.loginStore.isPhoneLogin">
                <div class="tab-title">
                    <span :class="$store.state.loginStore.activeName === 'first' ? 'active' : ''" @click="tabClick('first')">账套登录</span>
                    <span :class="$store.state.loginStore.activeName === 'second' ? 'active' : ''" @click="tabClick('second')">会员登录</span>
                    <span :class="$store.state.loginStore.activeName === 'third' ? 'active' : ''" @click="tabClick('third')">注册</span>
                </div>
                <div class="tab-content">
                    <!-- 账套登录 -->
                    <v-set-of-book-login v-show="$store.state.loginStore.activeName === 'first'"/>
                    <!-- 会员登录 -->
                    <v-member-login v-show="$store.state.loginStore.activeName === 'second'"/>
                    <!-- 注    册 -->
                    <v-register v-show="$store.state.loginStore.activeName === 'third'"/>
                </div>
            </div>

            <!-- 手机号 + 手机验证码登录 -->
            <div class="login-block login-phone-block" v-if="$store.state.loginStore.isPhoneLogin">
                <div class="tab-content">
                    <v-phone-login/>
                </div>
            </div>
        </div>
        <div v-else>
            <!-- 忘记密码pc -->
            <v-forgot-pass-pc/>
        </div>
    </div>
</template>
<script>
 /**
 * Author: iissoftware
 * Date: 2018-12-22
 * Description: 登录组件
*/
import Header from '../../Header'
import setOfBookLogin from './setOfBookLogin'
import memberLogin from './memberLogin'
import register from './register'
import phoneLogin from './phoneLogin'
import forgotPassPc from './forgotPassPc'
export default {
    components: {
        'v-header': Header,
        'v-set-of-book-login': setOfBookLogin,
        'v-member-login': memberLogin,
        'v-register': register,
        'v-phone-login': phoneLogin,
        'v-forgot-pass-pc': forgotPassPc
    },
    data() {
        return {
            activeName: this.$store.state.loginStore.activeName,
        }
    },
    methods: {
        tabClick(str) {
            this.$store.commit('loginStore/updateActiveName', str);
        }
    }
}
</script>
<style scoped>
    .login-box {
        background: url(../../../assets/images/log-bg.jpg) no-repeat center;
        background-size: 100% 100%;
    }
    .shadow-box {
        width: 100%;
        min-height: 355px;
        height: 355px;
        background-color: rgba(0,0,0,.4);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: table;
    }
    .shadow-box > div {
        display: table-cell;
        vertical-align: middle;
    }
    .shadow-box > div > img {
        margin-left: 5%;
        display: inline-block;
        width: 50%;
    }
    .login-block {
        width: 400px;
        height: 400px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 6px;
        overflow: hidden;
        padding: 10px 12px;
        position: absolute;
        top: 50%;
        right: 2%;
        transform: translateY(-50%);
        z-index: 10;
    }
    .login-block .tab-title {overflow: hidden;margin-bottom: 15px;}
    .login-block .tab-title > span {
        display: block;
        float: left;
        width: 33.33333%;
        font-size: 15px;
        text-align: center;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
        cursor: pointer;
    }
    .login-block .tab-title > span.active {color: #0080ff;border-bottom-color: #0080ff;}
    .login-phone-block {height: 320px;}
</style>


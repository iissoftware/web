<template>
    <div>
        <div v-if=" $route.path == '/profile' ">
            <header class="header">
                <div class="navbar-top text-center relative">
                    我的
                    <span class="back absolute" @click="$router.push('/')"></span>
                </div>
                <div class="u-info relative">
                    <div class="u-info-head">
                        <img :src="'/api' + head" width="100%" height="100%" style="border-radius: 50%" v-if="head">
                        <span class="img" v-else v-random></span>
                    </div>
                    <div class="u-info-msg">
                        <p>{{ token ? username : '登录/注册'}}</p>
                        <p><i class="icon-mobile"></i>{{ token ? enMobile : '登录后享受更多特权'}}</p>
                    </div>
                    <div class="u-info-info absolute">
                        <span @click="$router.push('/profile/info')"></span>
                    </div>
                </div>
            </header>
            <section class="package-list">
                <div>
                    <p style="color: rgb(0, 152, 251);">
                        <span class="num">0.00</span>
                        <span class="unit">元</span>
                    </p>
                    <p>钱包</p>
                </div>
                <div>
                    <p style="color: rgb(255, 95, 62);">
                        <span class="num">1</span>
                        <span class="unit">个</span>
                    </p>
                    <p>红包</p>
                </div>
                <div>
                    <p style="color: rgb(106, 194, 11);">
                        <span class="num">8</span>
                        <span class="unit">个</span>
                    </p>
                    <p>金币</p>
                </div>
            </section>
            <section class="strip-list">
                <div>
                    <i class="icon-left icon-location"></i>
                    <span>我的地址</span>
                </div>
                <div></div>
            </section>
            <section class="strip-list-group">
                <div class="strip-list">
                    <div>
                        <i class="icon-left icon-shop"></i>
                        <span>金币商城</span>
                    </div>
                    <div></div>
                </div>
                <div class="strip-list">
                    <div>
                        <i class="icon-left icon-gift"></i>
                        <span>分享拿5元现金</span>
                    </div>
                    <div></div>
                </div>
            </section>
            <section class="strip-list-group">
                <div class="strip-list">
                    <div>
                        <i class="icon-left icon-service"></i>
                        <span>我的客服</span>
                    </div>
                    <div></div>
                </div>
                <div class="strip-list">
                    <div>
                        <i class="icon-left icon-download"></i>
                        <span>下载饿了么APP</span>
                    </div>
                    <div></div>
                </div>
            </section>
            <v-footer></v-footer>
        </div>
        <router-view></router-view>
    </div>
</template>
<style scoped>
@import '../assets/css/profile.css'
</style>
<script>
import Footer from './Footer'
import { mapState, mapGetters } from 'vuex'
export default {
    data () {
        return {
            url: ''
        }
    },
    components: {
        'v-footer': Footer
    },
    mounted () {
        this.getUserInfo();
    },
    directives: {
        random: {   //随机头像指令
            inserted( el ) {
                let arr = [0,-70,-140,-210,-280,-350],
                n = Math.floor(Math.random() * arr.length);
                el.style.cssText = `background-position-x: 0;background-position-y:${ arr[n] }px`;
            }
        }
    },
    computed: {
        ...mapState('userModule',['token','username','mobile']),
        ...mapGetters('userModule',['head','enMobile'])
    },
    methods: {
        getUserInfo () {
            if( this.token ) {
                this.$store.dispatch('userModule/getUserInfo');
            }
            
        }
    }
}
</script>
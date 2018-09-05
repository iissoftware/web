<template>
    <div class="p-info" ref="pinfo">
        <header>
            <div class="info-header header text-center relative">
                账户信息
                <span class="back absolute" @click="$router.push('/profile')"></span>
            </div>
        </header>
        <div v-if="$route.path == '/profile/info' ">
            <section class="strip-list-group">
                <section class="strip-list relative">
                    <div>
                        <span>头像</span>
                        <label for="file" class="upload-label absolute">
                            <input type="file" name="file" id="file" @change="addImg" accept="image/jpeg, image/png, image/jpg, image/gif" capture="camera">
                        </label>
                    </div>
                    <div class="head-img text-right">
                        <img :src="'/api' + head" class="u-head" width="100%" height="100%" style="border-radius: 50%" v-if="head">
                        <span class="head" v-else v-random></span>
                    </div>
                </section>
                <section class="strip-list">
                    <div>用户名</div>
                    <div class="text-right">{{ username }}</div>
                </section>
            </section>
            <section class="strip-list">
                <div>手机号</div>
                <div class="text-right">{{ enMobile }}</div>
            </section>
            <section class="strip-list">
                <div>登录密码</div>
                <div class="text-right" style="color: #0097ff" @click="$router.push('/profile/updatePass')">修改</div>
            </section>
            <button class="btn" @click="logout">退出登录</button>
        </div>
    </div>
</template>
<style scoped>
    .info-header {
        color: #fff;
        font-size: 20px;
        line-height: 50px;
        font-weight: bold;
        letter-spacing: 1px;
    }
    .info-header .back {
        left: 20px;
        top: 15px;
        width: 20px;
        height: 20px;
        background: url(/static/icon/icon-left.png) no-repeat;
        background-size: 100% 100%;
    }
    .strip-list .head,
    .strip-list .u-head {
        display: inline-block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
    .strip-list .head {
        background: url(/static/img/head.aa66c9c.png) no-repeat;
    }
    .p-info .btn {
        border-radius: 0;
        margin-top: 10px;
        color: #ff5339;
        background-color: #fff;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        font-size: 18px;
        font-weight: bold;
    }
    .upload-label {
        display: block;
        top: 10px;
        left: 20px;
        right: 20px;
        bottom: 10px;
    }
    .upload-label input {
        display: none;
    }
</style>
<script>
import { mapState, mapGetters } from 'vuex'
import { alertBox } from '../router/api'
export default {
    data () {
        return {
            imgUrl: ''
        }
    },
    computed: {
        ...mapState('userModule',['username','mobile']),
        ...mapGetters('userModule',['enMobile','head'])
    },
    methods: {
        logout () {         //退出登录
            this.$store.commit('userModule/logout');
            alertBox(this.$refs.pinfo,'登录已退出','message',true);
            setTimeout(() => {
                this.$router.push('/profile');
                window.location.reload();
            },2000)
        },
        addImg ( e ) {
            let reader = new FileReader();
            let imgs = e.target.files[0];
            let size = imgs.size;       //文件大小
            if( size > 2048000 ) {      //限制大小
                alertBox(this.$refs.pinfo,'图片大小不能超过2M','message',true);
                return false;
            }
            var uri = '';
            let formData = new FormData();
            formData.append('file',imgs,imgs.name);
            //上传
            this.$http.post('/api/user/uploadImg',formData,{
                headers: {'Content-Type': 'multipart/form-data'}        //这个一定要加上
            }).then( res => {
                alertBox(this.$refs.pinfo,res.data.message,'message',true);
                setTimeout(() => {
                    this.$router.push('/profile');
                    window.location.reload();
                },2000)
            });
        }
    },
    directives: {
        random: {   //随机头像指令
            inserted( el ) {
                let arr = [0,-70,-140,-210,-280,-350],
                n = Math.floor(Math.random() * arr.length);
                el.style.cssText = `background-position-x: 0;background-position-y:${ arr[n] }px`;
            }
        }
    }
}
</script>
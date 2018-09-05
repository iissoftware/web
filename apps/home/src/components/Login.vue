<template>
    <div class="form">
        <form ref="logForm">
            <div class="form-control">
                <input type="text" name="username" v-model.trim="userInfo.username" class="control-input" placeholder="手机/邮箱/用户名" @keyup.enter="submitForm(userInfo)" />
            </div>
            <div class="form-control relative">
                <input type="password" name="username" v-model.trim="userInfo.password" class="control-input pwd" placeholder="密码" @keyup.enter="submitForm(userInfo)" />
                <div class=" switch-btn absolute" ref="switchBtn" :class="{slide: isAddClass}" @click="slide">
                    <span></span>
                </div>
            </div>
            <div class="form-control">
                <button type="button" class="btn btn-primary log-btn" @click="submitForm(userInfo)">登录</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
@import '../assets/css/login.css'
</style>
<script>
import { alertBox } from '../router/api'
export default {
    data() {
        return  {
            isAddClass: false,
            userInfo: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        slide () {
            let target = this.$refs.switchBtn,
                input = document.querySelector('.pwd');
            if(this.isAddClass) {
                this.isAddClass = false;
                setTimeout(()=> {
                    target.removeAttribute('style');
                    input.setAttribute('type','password');
                },200)
            } else {
                this.isAddClass = true;
                setTimeout(() => {
                    target.style.cssText = 'background-color: #3190e8;transition:.2s';
                    input.setAttribute('type','text');
                },150);
            }
        },
        submitForm ( userInfo ) {
            if( !userInfo.username ) {
                alertBox(this.$refs.logForm,'手机/邮箱/用户名不能为空','message',true);
                return false;
            }
            if( !userInfo.password ) {
                alertBox(this.$refs.logForm,'密码不能为空','message',true);
                return false;
            }
            //将数据发送给后台
            this.$http.post('/api/user/login', userInfo ).then( res => {
                alertBox(this.$refs.logForm,res.data.message,'message',true);
                if( res.data.success ) {
                    setTimeout( () => {
                        this.$store.commit('userModule/login',res.data.token);
                        this.$router.push('/profile');
                    },2000);
                }
            });
        }
    }
}
</script>
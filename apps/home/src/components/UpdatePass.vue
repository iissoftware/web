<template>
    <div>
        <header class="header">
            <div class="info-header text-center relative">
                账户信息
                <span class="back absolute" @click="$router.push('/profile/info')"></span>
            </div>
        </header>
        <section class="updatePassList">
            <form class="input-group" ref="updateForm">
                <p>
                    <input type="password" name="password" v-model.trim="userInfo.password" @keyup="checkOldPass" class="input" placeholder="旧密码">
                </p>
                <p>
                    <input type="password" name="newPass" v-model.trim="userInfo.newPass" @keyup="checkNewPass" class="input" placeholder="新密码">
                </p>
                <p>
                    <input type="password" name="checkPass" v-model.trim="userInfo.checkPass" @keyup="checkRepeatPass" class="input" placeholder="确认密码">
                </p>
            </form>
            <div class="btnBox">
                <button class="btn" :disabled="disabled" @click="updatePass">确认并提交</button>
            </div>
        </section>
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
    .updatePassList .btnBox {
        padding: 0 10px;
    }
    .updatePassList .btn {
        color: #fff;
        background-color: #3199e8;
        font-weight: bold;
        letter-spacing: 1px;
        font-size: 18px;
    }
    .updatePassList .btn[disabled] {
        background-color: #ccc;
    }
    .error input {
        border-color: #f56c6c;
    }
    
</style>
<style>
    .error .tip {
        display: block;
        margin-top: -5px;
        color: #f56c6c
    }
</style>
<script>
import { alertBox, rmAlertBox } from '../router/api'
export default {
    data (){
        return {
            n: 0,
            disabled: true,
            userInfo: {
                password: '',
                newPass: '',
                checkPass: ''
            }
        }
    },
    methods: {
        updatePass () {
            if( !this.disabled ){
                this.$http.post('/api/user/updatePass',this.userInfo).then( res => {
                    if( res.data.success ) {
                        alertBox(this.$refs.updateForm,res.data.message,'message',true);
                        setTimeout( () => {
                            this.$store.commit('userModule/logout');
                            this.$router.push('/user/login');
                        },2000);
                    } else {
                        alertBox(this.$refs.updateForm,res.data.message,'message',true);
                        this.disabled = true;
                    }
                });
            }
        },
        checkOldPass (e) {          //检查旧密码是否合法
            let target = e.target.parentNode;
            if( this.userInfo.password.length < 6 || this.userInfo.password.length > 20 ) {
                target.className = 'error';
                alertBox(target,'密码长度为6-20位','tip',false);
                if( target.className == 'error' ) {
                    this.disabled = true;
                }
            } else {
                rmAlertBox(target,'.tip');
                let childNode = target.parentNode.querySelectorAll('input');
                if( (childNode[0].value && childNode[1].value && childNode[2].value) ) {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            }
        },
        checkNewPass (e) {          //检查新密码是否合法
            let target = e.target.parentNode;
            if( this.userInfo.newPass.length < 6 || this.userInfo.newPass.length > 20 ) {
                target.className = 'error';
                alertBox(target,'密码长度为6-20位','tip',false);
                if( target.className == 'error' || (this.userInfo.newPass != this.userInfo.checkPass) ) {
                    this.disabled = true;
                }
            } else {
                rmAlertBox(target,'.tip');
                let childNode = target.parentNode.querySelectorAll('input');
                if( (this.userInfo.newPass == this.userInfo.checkPass) && (childNode[0].value && childNode[1].value && childNode[2].value) ) {
                    this.disabled = false;
                    rmAlertBox(childNode[2].parentNode,'.tip');
                } else {
                    this.disabled = true;
                    childNode[2].parentNode.className = 'error';
                    alertBox(childNode[2].parentNode,'两次密码输入不一致','tip',false);
                }
            }
        },
        checkRepeatPass (e) {       //检查重复密码是否合法
            let target = e.target.parentNode;
            if( this.userInfo.checkPass != this.userInfo.newPass ) {
                target.className = 'error';
                alertBox(target,'两次密码输入不一致','tip',false);
                if( target.className == 'error' || (this.userInfo.newPass != this.userInfo.checkPass) ) {
                    this.disabled = true;
                }
            } else {
                rmAlertBox(target,'.tip');
                let childNode = target.parentNode.querySelectorAll('input');
                if( (this.userInfo.newPass == this.userInfo.checkPass) && (childNode[0].value && childNode[1].value && childNode[2].value) ) {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            }
        }
    }
}
</script>
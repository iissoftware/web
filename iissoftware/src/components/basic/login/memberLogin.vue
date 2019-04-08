<template>
    <div class="form">
        <div class="label">
            <img src="../../../assets/images/user2.png" alt="" class="prefix-img">
            <input type="text" placeholder="用户名/手机号/邮箱" v-model.trim="formData.username" class="input-control" @keyup.enter="enterKey($event, 'L1')">
        </div>
        <div class="label">
            <img src="../../../assets/images/password.png" alt="" class="prefix-img">
            <input type="password" placeholder="密码" v-model.trim="formData.password" class="input-control" ref="L1" @keyup.enter="enterKey($event, 'L2')">
        </div>
        <div class="label">
            <img src="../../../assets/images/yanzheng.png" alt="" class="prefix-img">
            <input type="text" placeholder="验证码" class="input-control" v-model.trim="verifyCode" style="width: 230px;float: left;" maxlength="4" ref="L2" @keyup.enter="save">
            <!-- 验证码组件 -->
            <v-identify style="width: 120px;height: 45px;" :identifyCode="identifyCode" @click.native="refreshCode" />
        </div>
        <div class="label">
            <div class="clear">
                <label class="checkbox" for="checkbox">
                    <input type="checkbox" v-model="isRemember" style="display: none;" id="checkbox">
                    <span class="checkbox-span"></span>
                    <span>记住用户名</span>
                </label>
                <a href="javascript:;" class="forgotPwd" @click="openFotgotPass">忘记密码？</a>
            </div>
        </div>
        <div class="label">
            <button class="btn" @click="save">密码登录</button>
        </div>
        <!-- 其它登录方式 -->
        <div class="other-way">
            <span>其它登录方式：</span>
            <img src="../../../assets/images/icon-wx.png" alt="">
            <img src="../../../assets/images/icon-qq.png" alt="">
            <img src="../../../assets/images/icon-phone.png" alt="" v-if="!$store.state.loginStore.isPhoneLogin" @click="loginWay(true)">
            <img src="../../../assets/images/ulog.png" alt="" v-else @click="loginWay(false)">
        </div>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2018-12-22
 * Description: 会员登录组件
*/
import identify from '../../identify'
export default {
    components: {
        'v-identify': identify
    },
    data() {
        return {
            isRemember: true,
            formData: {
                username: this.$util.getItem('username') ? this.$util.getItem('username') : '',
                password: ''
            },
            verifyCode: '',     //input验证码
            identifyCodes: "1234567890abcdefghjkmnpqrstuvwxy",
            identifyCode: '',		//验证码
        }
    },
    methods: {
        save() {            //保存
            if(!this.formData['username']) {
                this.$notify({message: '用户名/手机号/邮箱不能为空', type: 'error', offset: 100});
                this.refreshCode();
                return false;
            }
            if(!this.formData['password']) {
                this.$notify({message: '密码不能为空', type: 'error', offset: 100});
                this.refreshCode();
                return false;
            }
            if(!this.verifyCode) {
                this.$notify({message: '验证码不能为空', type: 'error', offset: 100});
                this.refreshCode();
                return false;
            }
            if(this.verifyCode.toLowerCase() !== this.identifyCode) {
                this.$notify({message: '验证码错误', type: 'error', offset: 100});
                this.refreshCode();
                return false;
            }
            //发送请求
            this.$http({
                method: 'post',
                url:  this.$url + 'login/loginUser',
                params: this.formData
            }).then(res => {
                if(res.data.code == 20001) {
                    this.$store.commit('loginSet', res.data.data.set);
                    this.$notify({title: '登录成功!', type: 'success', offset: 100, duration: 2000});
                    if(this.isRemember) {
                        this.$util.setItem('username', this.formData['username']);
                    } else {
                        if(this.$util.getItem('username')) {
                            this.$util.removeItem('username');
                        }
                    }
                    setTimeout(() => {
                        sessionStorage.setItem('isLogin', JSON.stringify({username: this.formData['username']}));
                        this.$router.push('/');
                    }, 1000);
                } else {
                    this.$notify({title: res.data.msg, type: 'error', offset: 100});
                    this.refreshCode();
                }
            });
        },
        loginWay(bool) {
            this.$store.commit('loginStore/updatePhoneLogin', bool);
        },
        openFotgotPass() {
            this.$store.commit('loginStore/updateOpenFotgotPass', true);
        },
        refreshCode() {		//刷新验证码
            this.identifyCode = "";
            this.verifyCode = '';
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {		//生成验证码
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
            }
        },
        randomNum(min, max) {		//产生随机数
            return Math.floor(Math.random() * (max - min) + min);
        },
        enterKey(lastRef, nextRef) {		//回车键换行
            if(lastRef.target.value) {
                this.$refs[nextRef].focus();
            }
        }
    },
    created() {
        this.makeCode(this.identifyCodes, 4);
    }
}
</script>
<style scoped>
    .label {margin-bottom: 15px;position: relative;overflow: hidden;}
    .label .input-control{
        display: block;
        width: 100%;
        border: none;
        outline: none;
        box-sizing: border-box;
        background-color: #f4f4f4;
        padding: 15px 0;
        text-indent: 45px;
        color: #333;
    }
    .label .prefix-img {
        display: block;
        width: 20px;
        height: 20px;
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
    }
    .label .btn {
        display: block;
        width: 100%;
        border: none;
        outline: none;
        padding: 10px 0;
        text-align: center;
        color: #fff;
        background-color: #0080ff;
        font-size: 15px;
        cursor: pointer;
        border-radius: 2px;
    }
    .label .btn:hover {opacity: .9;}
    .forgotPwd {color: #f00;font-size: 14px;float: right;}
    .forgotPwd:hover {text-decoration: underline;}
    .clear {overflow: hidden;clear: both;}
    .checkbox {float: left;font-size: 14px;}
    .checkbox .checkbox-span{
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: #38bd4e;
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 3px;
    }
    .checkbox input[type="checkbox"]:checked + .checkbox-span {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../../assets/images/agree-active.png) no-repeat;
    }
    .other-way {font-size: 14px;padding-top: 10px;}
    .other-way > span,.other-way > img {vertical-align: middle;}
    .other-way > img {
        display: inline-block;
        width: 26px;
        cursor: pointer;
        outline: none;
        border: none;
        margin-right: 7px;
    }
    .other-way > img:hover {opacity: .9;}
</style>


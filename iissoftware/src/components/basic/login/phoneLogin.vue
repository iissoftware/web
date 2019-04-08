<template>
    <div>
        <div class="phone-title">手机号登录</div>
        <div class="form">
            <div class="label">
                <img src="../../../assets/images/user2.png" alt="" class="prefix-img">
                <input type="text" placeholder="手机号码" v-model.trim="formData.phone" class="input-control" @keyup.enter="enterKey($event, 'P1')">
            </div>
            <div class="label">
                <img src="../../../assets/images/yanzheng.png" alt="" class="prefix-img">
                <input type="text" placeholder="验证码" class="input-control" v-model.trim="formData.verifyCode" style="width: 230px;float: left;" maxlength="6" ref="P1" @keyup.enter="save">
                <button class="verifyCode" v-if="formData.phone.length !== 11">发送验证码</button>
                <button class="verifyCode ok" v-else @click="sendCode" ref="sendCode">发送验证码</button>
            </div>
            <div class="label">
                <div class="clear">
                    <label class="checkbox" for="checkbox2">
                        <input type="checkbox" v-model="isRemember" style="display: none;" id="checkbox2">
                        <span class="checkbox-span"></span>
                        <span>记住手机号</span>
                    </label>
                </div>
            </div>
            <div class="label">
                <button class="btn" @click="save">登录</button>
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
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2018-12-22
 * Description: 手机号 + 手机验证码登录组件
*/
export default {
    data() {
        return {
            isRemember: true,
            formData: {
                phone: this.$util.getItem('phone') ? this.$util.getItem('phone') : '',
                verifyCode: ''
            },
            time: 300
        }
    },
    methods: {
        save() {
            if(!this.formData['phone']) {
                this.$notify({message: '手机号码不能为空', type: 'error', offset: 100});
                return false;
            }
            if(!/^1[0-9]{10}/.test(this.formData['phone'])) {
                this.$notify({message: '无效的手机号码', type: 'error', offset: 100});
                return false;
            }
            if(!this.formData['verifyCode']) {
                this.$notify({message: '验证码不能为空', type: 'error', offset: 100});
                return false;
            }
            this.$http({
                url: this.$url + '/login/loginPhone',
                method: 'post',
                params: this.formData
            }).then(res => {
                if(res.data.code == 20001) {
                    this.$notify({title: '登录成功!', type: 'success', offset: 100, duration: 2000});
                    if(this.isRemember) {       //如果记住手机号
                        this.$util.setItem('phone', this.formData['phone']);
                    } else {
                        if(this.$util.getItem('phone')) {
                            this.$util.removeItem('phone');
                        }
                    }
                    setTimeout(() => {
                        sessionStorage.setItem('isLogin', JSON.stringify(res.data.data));
                        this.$router.push('/');
                    }, 1000);
                } else {
                    this.$notify({title: '登录失败', message: res.data.msg, type: 'error', offset: 100, duration: 2000});
                    return false;
                }
            });
        },
        loginWay(bool) {
            this.$store.commit('loginStore/updatePhoneLogin', bool);
        },
        sendCode() {            //发送验证码
            let reg = /^1[0-9]{10}/;
            if(!reg.test(this.formData['phone'])) {
                this.$notify({message: '无效的手机号码', type: 'error', offset: 100});
                return false;
            }
            //发送请求校验验证码是否正确
            this.$http(this.$url + 'verify/phoneLoginVerify?phone=' + this.formData['phone']).then(res => {
                if(res.data.code == 20001) {			
                    this.codeAnimation(this.$refs.sendCode);        //如果验证码发送成功，那么开始倒计时
                    this.$alert(res.data.data, '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定'
                    });
                }
            });
        },
        codeAnimation(elem) {           //验证码倒计时
            let timer = null,
                num = this.time;
            timer = setInterval(() => {
                if(num < 1) {
                    clearInterval(timer);
                    elem.innerHTML = '发送验证码'
                } else {
                    num--;
                    elem.innerHTML = num;
                }
            }, 1000);
        }
    }
}
</script>
<style scoped>
    .phone-title {text-align: center;padding: 8px 0 20px;font-size: 18px;}
    .label {margin-bottom: 15px;position: relative;overflow: hidden;}
    .label .input-control{
        display: block;
        width: 100%;
        border: none;
        outline: none;
        box-sizing: border-box;
        background-color: #f4f4f4;
        padding: 12px 0;
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
    .verifyCode {
        height: 39px;
        width: 120px;
        border: none;
        outline: none;
        float: right;
        color: #fff;
        background-color: rgb(79,79,79);
        cursor: pointer;
    }
    .verifyCode.ok {
        background-color: #0080ff;
    }
</style>


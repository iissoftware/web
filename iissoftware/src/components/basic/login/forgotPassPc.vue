<template>
    <div class="forgotPass">
        <h3 class="fp-title">忘记密码</h3>
        <div class="step-list">
            <div class="step-item" :class="step == 1 ? 'active' : ''">
                <span>1</span>
            </div>
            <div class="step-item" :class="step == 2 ? 'active' : ''">
                <span>2</span>
            </div>
            <div class="step-item" :class="step == 3 ? 'active' : ''">
                <span>3</span>
            </div>
        </div>
        <div class="step-list-text">
            <span :class="step == 1 ? 'active' : ''">身份验证</span>
            <span :class="step == 2 ? 'active' : ''">重置密码</span>
            <span :class="step == 3 ? 'active' : ''">完成</span>
        </div>
        <div class="step-cnt">
            <div class="step-cnt-item" v-show="step == 1">
                <div class="label">
                    <input type="text" placeholder="请输入手机号" v-model.trim="formData.phone" maxlength="11">
                    <img src="../../../assets/images/phone.png" alt="">
                </div>
                <div class="label" style="overflow: hidden;">
                    <input type="text" placeholder="请输入验证码" v-model.trim="formData.verifyCode" style="width: 300px;float: left;">
                    <img src="../../../assets/images/yanzheng.png" alt="">
                    <button class="verifyCode" v-if="formData.phone.length != 11">发送验证码</button>
                    <button class="verifyCode ok" v-else @click="sendCode" ref="sendCode">发送验证码</button>
                </div>
                <div class="label">
                    <button class="btn" @click="nextStep">下一步</button>
                </div>
                <div class="label" style="text-align: center; font-size: 14px; color: rgb(0, 128, 255); cursor: pointer;" @click="returnLogin">返回登录</div>
            </div>
            <div class="step-cnt-item" v-show="step == 2">
                <div class="label">
                    <input type="password" placeholder="请输入新密码" v-model="formData.password">
                    <img src="../../../assets/images/password.png" alt="">
                </div>
                <div class="label" style="overflow: hidden;">
                    <input type="password" placeholder="请确认新密码" v-model="formData.repeatPassword">
                    <img src="../../../assets/images/password.png" alt="">
                </div>
                <div class="label" style="margin-bottom: 13px;">
                    <button class="btn" style="padding: 14px 0;" @click="nextStep">下一步</button>
                </div>
                <div class="label" style="text-align: center;font-size: 14px;color: #0080ff;cursor: pointer;" @click="returnLogin">返回登录</div>
            </div>
            <div class="step-cnt-item" v-show="step == 3">
                <div class="label" style="text-align: center;margin-top: 20px;">
                    <p><img src="../../../assets/images/dsassd.png" alt=""></p>
                    <p style="font-size: 16px;color: #666;margin-bottom: 6px;margin-top: 10px;">密码修改成功</p>
                    <p style="font-size: 14px;color: #666;">请重新登录</p>
                </div>
                <div class="label">
                    <button type="button" style="padding: 12px 0;font-size: 16px;cursor: pointer;" class="btn" @click="nextStep">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            step: 1,
            formData: {
                phone: '',
                verifyCode: '',
                password: '',
                repeatPassword: ''
            },
            time: 3000,

        }
    },
    methods: {
        returnLogin() {
            this.$store.commit('loginStore/updateOpenFotgotPass', false);
        },
        sendCode() {        //发送验证码
            if(!/^1[0-9]{10}/.test(this.formData['phone'])) {
                this.$notify({message: '无效的手机号码', type: 'error', offset: 100});
                return false;
            } else {
                this.$http(this.$url + 'verify/phoneForgetVerify?phone=' + this.formData.phone).then(res => {
					if(res.data.code == 20001) {
						this.codeAnimation(this.$refs.sendCode);			//如果验证码发送成功，那么开始倒计时
						this.$alert(res.data.data, '提示', {
							confirmButtonText: '确定'
						});
					} else {
						this.$alert(res.data.msg, '提示', {
							confirmButtonText: '确定'
						});
					}
				});
            }
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
        },
        nextStep(num) {            //下一步
            if(this.step == 1) {
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
                this.$http.get(this.$url + 'verify/checkPhoneVerify?phone=' + this.formData['phone'] + '&code=' + this.formData['verifyCode']).then(res => {
                    if(res.data.code == 20001) {
                        this.$alert(res.data.data, '提示', {
                            confirmButtonText: '确定'
                        });
                        this.step = 2;
                        return true;
                    } else {
                        this.$alert('验证码不正确', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                });
            } else if(this.step == 2) {
                //这一步就发送手机号、密码、确认密码、验证码到后台验证，验证通过后才执行第三部
                if(!this.formData['password']) {
                    this.$notify({message: '密码不能为空', type: 'error', offset: 100, duration: 2000});
                    return false;
                } else if(!this.formData['repeatPassword']) {
                    this.$notify({message: '前后密码不一致', type: 'error', offset: 100, duration: 2000});
                    return false;
                } else {
                    this.$http({
                        url: this.$url + 'register/lostPassword',
                        method: 'post',
                        params: this.formData
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$alert(res.data.data, '提示', {
                                confirmButtonText: '确定'
                            });
                            this.step = 3;
                            return true;
                        } else {
                            this.$alert('修改密码失败！', '提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    });
                }
            } else if(this.step == 3) {
                this.$store.commit('loginStore/updateOpenFotgotPass', false);
                this.step = 1;
                this.formData = {           //关闭之后初始化数据
                    phone: '',
                    verifyCode: '',
                    password: '',
                    repeatPassword: ''
                }
            }
        }
    }
}
</script>

<style scoped>
    .forgotPass {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -333px;
        width: 625px;
        padding: 0 20px;
        height: 400px;
        background-color: #fff;
        animation: slideDown-data-v-b36e2528 .3s;
        border-radius: 6px;
    }
    .forgotPass .fp-title {
        text-align: center;
        font-weight: 400;
        padding: 20px 0;
    }
    .forgotPass .step-list {
        height: 4px;
        margin-top: 12px;
    }
    .forgotPass .step-list .step-item {
        width: 33.333%;
        float: left;
        position: relative;
        height: 100%;
    }
    .forgotPass .step-list .step-item:after, .forgotPass .step-list .step-item:before {
        content: "";
        display: inline-block;
        width: calc(50% - 21px);
        height: 2px;
        background-color: #eaeaea;
        position: absolute;
    }
    .forgotPass .step-list .step-item.active:after,
    .forgotPass .step-list .step-item.active:before {
        background-color: #0080ff;
    }
    .forgotPass .step-list .step-item:before {
        left: 0;
    }
    .forgotPass .step-list .step-item:after {
        right: 0;
    }
    .forgotPass .step-list .step-item > span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 31px;
        height: 31px;
        text-align: center;
        line-height: 31px;
        background: url(../../../assets/images/sd.png) no-repeat;
        color: #fff;
        font-size: 14px;
    }
    .forgotPass .step-list .step-item.active > span {
        background: url(../../../assets/images/sd-active.png) no-repeat;
    }
    .forgotPass .step-list-text {
        overflow: hidden;
        margin-top: 22px;
    }
    .forgotPass .step-list-text > span {
        width: 33.3333%;
        text-align: center;
        display: block;
        float: left;
        font-size: 14px;
        color: #666;
    }
    .forgotPass .step-list-text > span.active {
        color: #0080ff;
    }
    .forgotPass .step-cnt {
        margin: 40px auto 0;
        width: 70%;
    }
    .forgotPass .step-cnt .label {
        position: relative;
        margin-bottom: 20px;
    }
    .forgotPass .step-cnt .label input {
        width: 100%;
        display: block;
        padding: 15px 0;
        border: none;
        outline: none;
        background-color: #f4f4f4;
        text-indent: 56px;
    }
    .forgotPass .step-cnt .label > img {
        position: absolute;
        top: 50%;
        left: 20px;
        margin-top: -15px;
    }
    .forgotPass .step-cnt .label .btn {
        border: none;
        outline: none;
        background-color: #0080ff;
        color: #fff;
        text-align: center;
        width: 100%;
        display: block;
        padding: 14px 0;
        cursor: pointer;
    }
    .forgotPass .step-cnt .label .btn:hover {
        opacity: .9;
    }
    .verifyCode {
        height: 45px;
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

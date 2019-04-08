<template>
    <div class="form">
        <div class="label">
            <img src="../../../assets/images/user2.png" alt="" class="prefix-img">
            <input type="text" placeholder="用户名" v-model.trim="formData.username" class="input-control" @keyup.enter="enterKey($event, 'R1')">
        </div>
        <div class="label">
            <img src="../../../assets/images/password.png" alt="" class="prefix-img">
            <input type="password" placeholder="密码" v-model.trim="formData.password" class="input-control" ref="R1" @keyup.enter="enterKey($event, 'R2')">
        </div>
        <div class="label">
            <img src="../../../assets/images/password.png" alt="" class="prefix-img">
            <input type="password" placeholder="确认密码" v-model.trim="formData.RepeatPassword" class="input-control" ref="R2" @keyup.enter="enterKey($event, 'R3')">
        </div>
        <div class="label">
            <img src="../../../assets/images/phone.png" alt="" class="prefix-img" style="width: 18px;">
            <input type="text" placeholder="手机号" v-model.trim="formData.phone" class="input-control" maxlength="11" ref="R3" @keyup.enter="enterKey($event, 'R4')">
        </div>
        <div class="label">
            <img src="../../../assets/images/yanzheng.png" alt="" class="prefix-img">
            <input type="text" placeholder="验证码" class="input-control" v-model.trim="formData.verifyCode" style="width: 230px;float: left;" maxlength="6" ref="R4" @keyup.enter="save">
            <button class="verifyCode" v-if="formData.phone.length !== 11">发送验证码</button>
            <button class="verifyCode ok" v-else @click="sendCode" ref="sendCode">发送验证码</button>
        </div>
        <div class="label">
            <div class="clear">
                <label class="checkbox" for="checkbox1">
                    <input type="checkbox" v-model="isRemember" style="display: none;" id="checkbox1">
                    <span class="checkbox-span"></span>
                    <span>我已阅读并同意<i style="font-style: normal;color: #0080ff;">《用户服务协议》</i></span>
                </label>
            </div>
        </div>
        <div class="label">
            <button class="btn" @click="save">注册</button>
        </div>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2018-12-22
 * Description: 注册组件
*/
export default {
    data() {
        return {
            isRemember: true,
            formData: {
                username: '',
                password: '',
                RepeatPassword: '',
                phone: '',
                verifyCode: ''
            },
            time: 300,      //验证码秒数
        }
    },
    methods: {
        save() {            //提交
            if(!this.isRemember) {
                this.$notify({message: '请阅读并同意用户服务协议', type: 'error', offset: 100});
                return false;
            }
            if(!this.formData['username']) {
                this.$notify({message: '用户名不能为空', type: 'error', offset: 100});
                return false;
            }
            if(!this.formData['password']) {
                this.$notify({message: '密码不能为空', type: 'error', offset: 100});
                return false;
            }
            if(!this.formData['RepeatPassword']) {
                this.$notify({message: '确认密码不能为空', type: 'error', offset: 100});
                return false;
            }
            if(this.formData['password'] !== this.formData['RepeatPassword']) {
                this.$notify({message: '前后密码不一致', type: 'error', offset: 100});
                return false;
            }
            if(!this.formData['phone']) {
                this.$notify({message: '手机号不能为空', type: 'error', offset: 100});
                return false;
            }
            if(!this.formData['verifyCode']) {
                this.$notify({message: '验证码不能为空', type: 'error', offset: 100});
                return false;
            }
            //发送请求
            this.$http({
                method: 'post',
                url: this.$url + 'register/insert',
                params: this.formData
            }).then(res => {
                if(res.data.code == 20001) {
                    this.$notify({message: '注册成功', type: 'success', offset: 100, duration: 2000});
                    setTimeout(() => {
                        localStorage.removeItem('username');
                        this.$store.commit('loginStore/updateActiveName', 'second');
                    }, 1000);
                } else {
                    this.$notify({message: '注册失败', type: 'error', offset: 100, duration: 2000});
                    return false;
                }
            });
        },
        sendCode() {            //发送验证码
            let reg = /^1[0-9]{10}/;
            if(!reg.test(this.formData['phone'])) {
                this.$notify({message: '无效的手机号码', type: 'error', offset: 100});
                return false;
            }
            //发送请求校验验证码是否正确
            this.$http(this.$url + 'verify/phoneRegisterVerify?phone=' + this.formData['phone']).then(res => {
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
        },
        enterKey(lastRef, nextRef) {		//回车键换行
            if(lastRef.target.value) {
                this.$refs[nextRef].focus();
            }
        }
    }
}
</script>
<style scoped>
    .label {margin-bottom: 12px;position: relative;overflow: hidden;}
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
        padding: 8px 0;
        text-align: center;
        color: #fff;
        background-color: #0080ff;
        font-size: 15px;
        cursor: pointer;
        border-radius: 2px;
    }
    .label .btn:hover {opacity: .9;}
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


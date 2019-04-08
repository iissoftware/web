<template>
    <div class="form">
        <div class="label">
            <img src="../../../assets/images/zhangtao.png" alt="" class="prefix-img">
            <input type="text" placeholder="账套名" v-model.trim="formData.accountSet" class="input-control" @keyup.enter="enterKey($event, 'A1')">
        </div>
        <div class="label">
            <img src="../../../assets/images/user2.png" alt="" class="prefix-img">
            <input type="text" placeholder="用户名" v-model.trim="formData.username" class="input-control" ref="A1" @keyup.enter="enterKey($event, 'A2')">
        </div>
        <div class="label">
            <img src="../../../assets/images/password.png" alt="" class="prefix-img">
            <input type="password" placeholder="密码" v-model.trim="formData.password" class="input-control" ref="A2" @keyup.enter="save">
        </div>
        <div class="label">
            <div class="clear">
                <a href="" class="forgotPwd">忘记密码？</a>
            </div>
        </div>
        <div class="label">
            <button class="btn" @click="save">账套登录</button>
        </div>
    </div>
</template>
<script>
 /**
 * Author: iissoftware
 * Date: 2018-12-22
 * Description: 账套登录组件
*/
export default {
    data() {
        return {
            formData: {
                accountSet: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        save() {            //保存
            if(!this.formData['accountSet']) {
                this.$notify({message: '账套名不能为空', type: 'error', offset: 100});
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
            //发送请求
            this.$http({
                method: 'post',
                url:  this.$url + 'login/loginUser',
                params: this.formData
            }).then(res => {
                if(res.data.code == 20001) {
                    this.$notify({title: '登录成功!', type: 'success', offset: 100, duration: 1000});
                    this.$util.setItem('username', this.formData['username']);
                    setTimeout(() => {
                        sessionStorage.setItem('isLogin', JSON.stringify({username: this.formData['username']}));
                        this.$router.push('/');
                    }, 1000);
                } else {
                    this.$notify({title: res.data.msg || '登陆失败', type: 'success', offset: 100, duration: 1000});
                }
            });
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
</style>


<template>
    <div>
        <div class="login-logo">
            <img src="/static/img/ele.png">
        </div>
        <div class="loginBox">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户登录" name="first">
                    <el-form :model="ruleForm2" status-icon :rules="checkLogin" ref="ruleForm2" class="demo-ruleForm">
                        <el-form-item prop="username">
                            <el-input type="text" v-model.trim="ruleForm2.username" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model.trim="ruleForm2.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="用户注册" name="second"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data () {
        var validateUserName = (rule, value, callback) => {         //验证用户名
            if (value === '') {
              callback(new Error('请输入用户名'));
            }else{
                callback();             //记得要执行回调
            }
        };
        var validatePassWord = (rule, value, callback) => {            //验证密码
            if (value === '') {
              callback(new Error('请输入密码'));
            }else{
                callback();             //记得要执行回调
            }
        };
        return {
            activeName: 'first',            //tab标签默认选中第一个
            ruleForm2: {
                username: '',               //表单初始值用户名
                password: ''                //表单初始值密码
            },
            checkLogin: {                       //存放验证规则
                username: [
                    { validator: validateUserName,trigger: 'blur' },
                ],
                password: [
                    { validator: validatePassWord,trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState(['token'])              //获取token
    },
    methods: {
        handleClick(tab,event) {

        },
        submitForm ( formName ) {
            this.$refs[formName].validate(( valid ) => {
                if ( valid ) {
                    this.$http.post('/api/login',this.ruleForm2).then( res => {
                        if(res.data.eid){
                            this.$store.commit('login',res.data.token);
                            this.$router.push('/profile');
                        }else{
                            console.log(res.data)
                        }
                    }).catch( err => {
                        console.log(err)
                    });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

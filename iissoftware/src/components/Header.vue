<template>
    <div class="header">
        <div class="container">
            <div class="left" slot="left">
                <img src="../assets/images/logo.png" alt="" class="logo">
                <!-- <span class="compony-name">云平台</span> -->
                <span class="date">{{ currentDate }}</span>
                <!-- <slot name="advan">这里占有默认空间</slot> -->
                <span style="margin-left: 50px;font-size: 14px;" v-if="$route.name !== 'Login'">{{ $store.state.companyName }}</span>
            </div>
            <div class="right" slot="right" v-if="$route.name !== 'Login'">
                <el-badge class="item" @click.native="openHelp">
                    <a href="javascript:;"><img src="../assets/images/logo2.png" alt=""/>帮助</a>
                </el-badge>
                <el-badge is-dot class="item">
                    <a href="javascript:;"><img src="../assets/images/messege.png" alt=""/>消息</a>
                </el-badge>
                <a href="javascript:;"><img src="../assets/images/logo1.png" alt=""/>首页</a>
                <a href="javascript:;"><img src="../assets/images/logo2.png" alt=""/>常见问题</a>
                <a href="javascript:;"><img src="../assets/images/logo3.png" alt=""/>意见反馈</a>
                <div class="head">
                    <div class="headImg"></div>
                    <el-dropdown trigger="click">
                    <span class="el-dropdown-link username">
                        {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            companyName: '',
            username: sessionStorage.getItem('isLogin') ? JSON.parse(sessionStorage.getItem('isLogin'))['username'] : ''
        }
    },
    computed: {
        currentDate() {
            var date = new Date();
            let year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate();
            month < 10 ? '0' + month : month;
            day < 10 ? '0' + day : day;
            return year + '年' + month + '月' + day + '日';
        }
    },
    methods: {
        logout() {          //退出
            this.$http.get(this.$url + 'login/logout').then(res => {
                this.$message({message: '退出成功', type: 'success', duration: 1000});
                setTimeout(() => {
                    sessionStorage.removeItem('isLogin');
                    this.$router.push('/login');
                }, 1000);
            })
        },
        openHelp() {
            this.$message({type: 'error', message: '触发了帮助选项', duration: 2000});
        },
        F1Click() {         //点击f1触发帮助选项
            let that = this;
            $(document).on('keydown', function(e) {
                let ev = e || event;
                if(ev.keyCode == 112) {
                    e.preventDefault();         //阻止默认事件
                    that.openHelp();
                }
            })
        },
        getSystemInfo() {
            this.$http.get(this.$url + 'systemParameters/selectSystemInfo').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.$store.commit('updateCompanyNames', res.data.data['companyNameChinese']);
                    }
                }
            })
        }
    },
    mounted() {
        this.F1Click();
        this.getSystemInfo();
    }
}
</script>
<style>
.el-badge__content.is-fixed.is-dot{
    right: 40px !important;
    top: 34px !important;
}
</style>
<style lang="less" scoped>
    .header {
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        vertical-align: middle;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        padding: 0 50px;
        min-width: 916px;
        .logo {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
        }
        .date {
            font-size: 12px;
            margin-left: 15px;
        }
        .left {
            margin-left: -25px;
        }
        .right {
            .item {
                float: left;
            }
            a {
                font-size: 14px;
                color: rgb(137, 137, 137);
                margin-left: 30px;
                float: left;
                img {
                    vertical-align: middle;
                    margin-top: -4px;
                    margin-right: 5px;
                }
            }
            .head{
                float: left;
                margin-left: 15px;
                .headImg {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background-color: #dfdfdf;
                    vertical-align: middle;
                    display: inline-block;
                }
            }
            .username {
                color: #0680ff;
            }
        }
    }
</style>
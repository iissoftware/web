<template>
    <header>
        <div class="left" slot="left">
            <img src="../assets/images/logo.png" alt="" class="logo">
            <span class="compony-name">广州妮乔服饰有限公司</span>
            <span class="date">2018年12月31日</span>
        </div>
        <div class="right" slot="right">
            <a href="javascript:;"><img src="../assets/images/logo1.png" alt=""/>首页</a>
            <a href="javascript:;"><img src="../assets/images/logo2.png" alt=""/>常见问题</a>
            <a href="javascript:;"><img src="../assets/images/logo3.png" alt=""/>意见反馈</a>
            <div class="head">
                <div class="headImg"></div>
                <el-dropdown trigger="click">
                <span class="el-dropdown-link username">
                    赵凯文<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>
<style lang="less">
    .el-dropdown-menu {top: 48px !important;}
</style>
<style scoped lang="less">
    header {
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        padding: 0 50px;
        vertical-align: middle;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        min-width: 1200px;
        .left{float: left;}
        .right{float: right;}
        .logo {
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
        }
        .date {
            font-size: 12px;
            margin-left: 15px;
        }
        .right {
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
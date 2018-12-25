<template>
    <div class="sidebar">
        <div class="sidebar-menu">
            <router-link to="/PersonCenter">个人中心</router-link>
            <router-link to="/Approval">财务审批</router-link>
            <router-link to="/Manage">调整管理</router-link>
            <router-link to="/ReportForm">统计报表</router-link>
            <router-link to="/OA">OA办公</router-link>
            <router-link to="/BasicData">基础资料</router-link>
        </div>
    </div>
</template>
<style scoped lang="less">
    .sidebar {
        height: 100%;
        width: 140px;
        background-color: #0089b9;
        color: #fff;
        text-align: center;
        float: left;
        .sidebar-menu {padding-top: 30px;}
        .sidebar-menu > a {
            display: block;
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            cursor: pointer;
            color: #fff;
            &:hover,&.router-link-exact-active{
                background-color: #00698d;
            }
        }
    }
</style>
<template>
    <div class="sidebar">
        <div class="sidebar-menu">
            <router-link to="/" v-if="$store.state.Set.PersonCenter == 1">个人中心</router-link>
            <!-- <router-link to="" class="bgSidebar" v-else>个人中心</router-link> -->
            <router-link to="/FinancialApproval" v-if="$store.state.Set.Approval == 2">财务审批</router-link>
            <!-- <router-link to="" class="bgSidebar" v-else>财务审批</router-link> -->
            <router-link to="/" v-if="$store.state.Set.Manage == 3">调整管理</router-link>
            <!-- <router-link to="" class="bgSidebar" v-else>调整管理</router-link> -->
            <router-link to="/StatisticalReport" v-if="$store.state.Set.ReportForm == 4">统计报表</router-link>
            <!-- <router-link to="" class="bgSidebar" v-else>统计报表</router-link> -->
            <router-link to="/" v-if="$store.state.Set.OA == 5">OA办公</router-link>
            <!-- <router-link to="" class="bgSidebar" v-else>OA办公</router-link> -->
            <router-link to="/BasicData" v-if="$store.state.Set.BasicData == 6 || $store.state.Set.boolBasicData">基础资料</router-link>
            <!-- <router-link to="" class="bgSidebar" v-else>基础资料</router-link> -->
        </div>
    </div>
</template>
<style scoped lang="less">
    .sidebar {
        height: 100%;
        width: 140px;
        background-color: #34485b;
        color: #fff;
        text-align: center;
        float: left;
        .sidebar-menu {
            padding-top: 30px;
            .bgSidebar{
                background-color: inherit !important;
            }
        }
        .sidebar-menu > a {
            display: block;
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            cursor: pointer;
            color: #fff;
            &:hover,&.router-link-exact-active{
                background-color: #e34e42;
            }
        }
    }
</style>
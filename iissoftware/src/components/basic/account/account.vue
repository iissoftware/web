<template>
    <div class="accountManage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="系统参数" name="first">
                <div class="system">
                    <el-tabs v-model="systemBlock">
                        <el-tab-pane label="系统信息" name="one">
                            <system-info/>
                        </el-tab-pane>
                        <el-tab-pane label="会计区间" name="two">
                            <account-year/>
                        </el-tab-pane>
                        <el-tab-pane label="财务参数" name="three">
                            <fd-params/>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="账套列表" name="second">
                <account-list/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-03-2
 * Description: 账套管理组件
*/
import accountList from './accountList'
import systemInfo from './systemInfo'
import accountYear from './accountYear'
import FDParams from './FDParams'
export default {
    components: {
        'account-list': accountList,
        'system-info': systemInfo,
        'account-year': accountYear,
        'fd-params': FDParams
    },
    data() {
        return {
            activeName: 'second',
            systemBlock: 'one',
            status: this.$store.state.accountStore.status
        }
    },
    watch: {
        activeName(newVal) {        //监听系统参数、账套列表之间的切换变化
            this.systemBlock = 'one';
            //如果当前为账套列表页面并且是账套新增页面的情况下（status:1）或者账套信息编辑页面（status: 2）的条件下，那么就初始化回原来的状态，获取系统信息
            if((newVal == 'second' && this.status == 1) || (newVal == 'second' && this.status == 2) || (newVal == 'second' && this.status == 3)) {
                this.$store.commit('accountStore/updateStatus', 0);
            }
        },
        status(newVal) {
            if(newVal[0] == 1 || newVal[0] == 2 || newVal[0] == 3) {
                this.activeName = 'first';
            }
        }
    }
}
</script>
<style>
    .accountManage .el-tabs__content {height: calc(100% - 50px) !important;}
</style>
<style scoped>
    .accountManage {overflow: hidden;min-width: 1000px;}
    .system {height: 100%;}
</style>
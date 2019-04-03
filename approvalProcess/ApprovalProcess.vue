<template>
    <div class="approvalProcess">
        <el-tabs v-model="activeName[0]">
            <el-tab-pane label="会计科目" name="first">
                <v-section-1/>
            </el-tab-pane>
            <el-tab-pane label="部门" name="second">
                <v-section-2/>
            </el-tab-pane>
            <el-tab-pane label="职员" name="three">
                <v-section-3/>            
            </el-tab-pane>
            <el-tab-pane label="金额" name="four">
                <v-section-4/>
            </el-tab-pane>
            <el-tab-pane label="审批步骤" name="five">
                <v-section-5/>
            </el-tab-pane>
        </el-tabs>
        <v-drag :elem="['.tree-left', '.tree-right', '.approvalProcess']" />
    </div>
</template>

<script>
/**
 * Author: iissoftware
 * Date: 2019-02-21
 * Description: 审批流程
 * store: approvalProcessStore
*/
import Section1 from './section1'
import Section2 from './section2'
import Section3 from './section3'
import Section4 from './section4'
import Section5 from './section5'
import Drag from '../../drag'
export default {
    components: {
        'v-section-1': Section1,
        'v-section-2': Section2,
        'v-section-3': Section3,
        'v-section-4': Section4,
        'v-section-5': Section5,
        'v-drag': Drag
    },
    data() {
        return {
            activeName: this.$store.state.approvalProcessStore.activeName,
        }
    },
    methods: {
        getTreeData() {
            this.$http.get(this.$url + '/activiti/selectActiviti').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.$store.dispatch('approvalProcessStore/getTreeData', res.data.data);
                    }
                }
            });
        }
    },
    created() {
        this.$store.commit('approvalProcessStore/updateActiveName', 'first');           //初始化tab为第一个
        this.$store.dispatch('approvalProcessStore/getMemberData', this.$url + 'employee/findEmployeeByDepartment?systemId=' + this.$store.state.systemId + '&id=0');
        this.$nextTick(() => {
            this.$store.dispatch('approvalProcessStore/getTreeData', this.$url + 'activiti/selectBills');
            // this.$store.dispatch('approvalProcessStore/selectActiviti', this.$url + 'activiti/selectActiviti');
        });
    }
}
</script>
<style>
    .approvalProcess .el-tabs__content {height: calc(100% - 40px) !important;}
</style>
<style scoped>
    .approvalProcess {overflow: hidden !important;}
</style>







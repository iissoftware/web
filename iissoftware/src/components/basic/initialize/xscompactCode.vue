<template>
    <!-- 名称弹窗 -->
    <div class="allDepartment">
        <el-input v-model="searchDepartText" placeholder="输入关键字" style="margin-bottom:20px"></el-input>
        <el-table :show-header="false" :highlight-current-row="true" :data="xsData" @row-click="handleSelectionChange" style="width: 100%">
            <el-table-column property="givenNumberOne"></el-table-column>
        </el-table>
    </div>
</template>
<style scoped>
    .allDepartment {position: relative;}
</style>
<script>
    export default {
        data() {
            return {
                searchDepartText: '',
                xsData:this.$store.state.initializeStore.xsData,
                dbClickRow: {
                    name:''
                }
            }
        },
        watch: {
            searchDepartText(val){
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {               //名称选择里面的搜索框
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            handleSelectionChange(row) {               //单击
                this.$store.commit('initializeStore/updateGivenNumberOne', row);
                this.close();
            },
            close() {                               //关闭新增弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
            },
        },
        created() {
            //获取辅助资料树形所有数据
            this.$store.dispatch('initializeStore/getSubClassDetails', {url: this.$url + 'auxiliaryInfoAllCategory/selectContractNumber', id: this.$store.state.initializeStore.xsCompactData[0]['id'], categoryId: this.$store.state.initializeStore.xsCompactData[0]['dataCategoryId']});
        }
    }
</script>
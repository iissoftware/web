<template>
    <!-- 名称弹窗 -->
    <div class="allDepartment">
        <el-input v-model="searchDepartText" placeholder="输入关键字"></el-input>
        <el-tree :data="objectsData" :accordion="true" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="getCurrentTreeData" :default-expand-all="true" :highlight-current="true" style="margin-top:10px;"></el-tree>
    </div>
</template>
<style scoped>
    .allDepartment {position: relative;}
</style>
<script>
/**
 * Author: 赵巧芬
 * Date: 2019-3
 * Description: 选择名称组件
 * accountProjectStore
*/
    export default {
        data() {
            return {
                searchDepartText: '',
                objectsData:this.$store.state.initializeStore.accountProjectData,
                defaultProps: {
                    label: 'name',
                    children: 'accountItems'
                },
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
            getCurrentTreeData(row) {               //单击
                this.$store.commit('initializeStore/updateObject', row);
                this.close();
            },
            close() {                               //关闭新增弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
            },
        },
        created() {
            //获取核算项目下的所有数据
            this.$store.dispatch('initializeStore/getAccountProjectData', this.$url +'accountItem/select');
        }
    }
</script>
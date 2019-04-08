<template>
    <div class="lastType">
        <el-input placeholder="输入关键字搜索" v-model="searchText" style="margin-bottom:10px;"></el-input>
        <div class="treeBox">
            <el-tree class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" @node-click="rowClick" ref="treeBox"></el-tree>
        </div>
    </div>
</template>
<script>
/**
 * Author: 赵巧芬
 * Date: 2018-11-29
 * Description: 核算项目新增
 * accountProjectStore
*/
export default {
    data() {
        return {
            searchText: '',
            treeData: [],
            defaultProps: {
                children: 'accountItems',
                label: 'name'
            }
        }
    },
    watch: {
        searchText(val) {
            this.$refs.treeBox.filter(val);
        }
    },
    methods: {
        getTreeData() {
            this.$http.get(this.$url +'accountItem/select').then(res => {
                if(res.data.code === 20001) {
                    if(res.data.data) {
                        this.treeData = res.data.data;
                    }
                }
            });
        },
        rowClick(row) {
            this.$store.commit('accountProjectStore/updateLastType', row);
            this.close();
        },
        filterNode(value, data) {       //监听上级类别搜索
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        close() {           //关闭新增弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    },
    mounted() {
        this.getTreeData();
    }
}
</script>
<style scoped>
    .lastType {overflow: hidden !important;}
    .treeBox {height: calc(100% - 50px) !important;overflow-y: auto !important;background-color: #fff !important;}
</style>



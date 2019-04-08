<template>
    <div class="tree-left">
        <div class="tree-left-title">核算项目</div>
        <el-tree :data="treeData" ref="treeBox" node-key="id" :default-expanded-keys="expandNodeId" :props="defaultProps" :accordion="false" @node-click="rowClick" :highlight-current="true"></el-tree>           
    </div>
</template>
<script>
/**
 * Author: 赵巧芬
 * Date: 2018-11-29
 * Description: 核算项目组件
*/
    export default {
        data() {
            return {
                treeData: this.$store.state.accountProjectStore.treeData,
                expandNodeId: [],
                defaultProps: {
                    children: 'accountItems',
                    label: 'name'
                },
            }
        },
        watch: {
            treeData() {
                let currentNodeId = this.$store.state.accountProjectStore.currentNodeId;
                if(currentNodeId) {
                    this.expandNodeId = [currentNodeId];
                } else {            //第一次进来
                    this.expandNodeId = [this.treeData[0]['id']]
                }
                //设置高亮
                setTimeout(() => {
                    this.$refs['treeBox'].setCurrentKey(this.expandNodeId.join(''));
                });
            }
        },
        mounted() {
            this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
        },
        methods: {
            rowClick(row) {
                this.$store.commit('accountProjectStore/updateCurrentNodeId', row['id']);
                this.$store.commit('accountProjectStore/updateCurrentRow', row);
                this.$store.commit('accountProjectStore/updateTableData', row['accountItems']);
            }
        }
    }
</script>
<style scoped lang="less">
    .tree-left {
        height: 100%;
        width: 200px;
        background-color: #fff;
        padding: 15px 0;
        box-sizing: border-box;
        border-radius: 6px;
        float: left;
        .tree-left-title {
            padding: 0 15px 15px 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
            font-size: 15px;
            margin-bottom: 10px;
        }
        .el-tree {
            height: calc(100% - 46px) !important;
            overflow: auto !important;
        }
    }
</style>

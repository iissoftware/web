<template>
    <div class="tree-left">
        <div class="tree-left-title">客户资料</div>
        <el-tree :data="treeData" ref="tree" :default-expand-all="true" :accordion="false" node-key="id" :expand-on-click-node="false" :default-expanded-keys="lightId" :props="defaultProps" @node-click="rowClick" :highlight-current="true"></el-tree>
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
                treeData: this.$store.state.customerStore.treeData,               //左侧树形结构数据
                lightId: [],
                defaultProps: {             //树形子类
                    children: 'clients',
                    label: 'name'
                },
            }
        },
        watch: {
            treeData() {
                let treeclickedId = this.$store.state.customerStore.treeclickedId;
                if(treeclickedId) {
                    this.lightId = [treeclickedId];
                } else {            //第一次进来
                    this.lightId = [this.treeData[0]['id']];
                }
                //设置高亮
                setTimeout(() => {
                    this.$refs.tree.setCurrentKey(this.lightId.join(''));
                });
            }
        },
        mounted() {
            this.$store.dispatch('customerStore/getTreeData', this.$url + 'client/findAccountItemByName?name=客户大类&systemId=' + this.$store.state.systemId);
        },
        methods: {
            rowClick(row) {                  //点击左侧树形结构触发该方法
                this.$store.commit('customerStore/updatetreeclickedId', row['id']);
                this.$store.commit('customerStore/updatetreeclicked', row);
                this.$store.commit('customerStore/updateTableData', row['clients']);
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

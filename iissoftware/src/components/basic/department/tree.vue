<template>
    <div class="tree-left">
        <div class="tree-left-title">部门名称</div>
        <el-tree :data="treeData" :props="defaultProps" node-key="id" :default-expanded-keys="dfExpKeys" ref="treeBox" :indent="10" :accordion="false" @node-click="nodeClick" :default-expand-all="false" :highlight-current="true"></el-tree>
    </div>
</template>
<script>
export default {
    data() {
        return {
            treeData: this.$store.state.departmentStore.treeData,
            dfExpKeys: [],
            defaultProps: {
                label: 'name',
                children: 'subDepartment'
            },
            expandNodeId: this.$store.state.departmentStore.expandNodeId,       //要展开的节点id
            systemInfo: this.$store.state.systemInfo[0]
        }
    },
    watch: {
        treeData: {
            handler() {
                let expandNodeId = this.$store.state.departmentStore.expandNodeId;
                //设置高亮
                setTimeout(() => {
                    this.dfExpKeys = expandNodeId;
                    this.$refs['treeBox'].setCurrentKey(this.dfExpKeys.join(''));
                });
            },
            deep: true
        }
    },
    methods: {
        nodeClick(row) {            //点击节点时触发
            console.log(row)
            this.$store.commit('departmentStore/updateParentId', row['id']);
            this.$store.commit('departmentStore/updateLastDepartmentName', row['name']);
            this.$store.commit('departmentStore/updateTableData2', row['subDepartment']);
            this.$store.commit('departmentStore/updateExpandNodeId', row['id']);
        }
    },
    created() {
        this.$store.dispatch('departmentStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.systemInfo['id']);
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
    }
}
.tree-left .el-tree {height: calc(100% - 36px) !important; padding: 10px 0 !important;overflow: auto !important;}
</style>


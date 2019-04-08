<template>
    <div class="department">
        <el-input v-model="text" style="width:100%" placeholder="输入关键字"></el-input>
        <el-tree :data="treeData" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick" :default-expand-all="true" :highlight-current="true" style="margin-top:10px;height:100%"></el-tree>
    </div>
</template>

<script>
export default {
    data(){
        return{
            text:'',
            systemId:this.$store.state.systemId,                                    //系统参数id
            treeData:this.$store.state.reportQuerierStore.DepartmentTreeData,       //树形结构数据
            defaultProps:{                                                          //树的子节点数据
                children: 'subDepartment',
                label: 'name'
            },

        }
    },
    watch:{
        text(val){             
            this.$refs.tree.filter(val);
        }
    },
    methods:{
        filterNode(value, data) {           //部门选择里面的搜索框
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        handleNodeClick(data) {             //点击事件
            this.$store.commit('reportQuerierStore/updateDepartment', data);
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        },
    },
    created(){
        this.$store.dispatch('reportQuerierStore/getDepartmentTreeData', this.$url + 'department/selectObject?parentId=0' + '&systemId=' + this.systemId);
    }
}
</script>

<style scoped>
    .department{
        overflow:hidden;
        height:100%;
    }
    .department .el-tree {height: calc(100% - 50px) !important;overflow-y: auto;}
</style>


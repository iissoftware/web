<template>
    <div class="tree-left">
        <div class="tree-left-title">会计科目</div>
        <!-- default-expanded-keys默认展开的节点，current-node-key默认选中的节点，前面两个要设置node-key才起作用  :current-node-key="currentNodeKey"  -->
        <el-tree :data="treeData" :props="defaultProps" node-key="id" :default-expanded-keys="dfExpKeys" ref="tree" :accordion="false" @node-click="nodeClick" :default-expand-all="false" :highlight-current="true"></el-tree>
        <v-drag :elem="['.tree-left', '.tree-right', '.accountSubject']"/>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-22
 * Description: 树形结构组件
 * name: subjectStore
*/
import Drag from '../../drag'
export default {
    components: {
        'v-drag': Drag
    },
    data() {
        return {
            treeData: this.$store.state.subjectStore.treeData,
            dfExpKeys: [],
            defaultProps: {
                label: 'name',
                children: 'subAssertList'
            },
            systemId: this.$store.state.systemId
        }
    },
    watch: {
        treeData: {
            handler() {
                let expandNodeId = this.$store.state.subjectStore.expandNodeId;
                //设置高亮
                setTimeout(() => {
                    this.dfExpKeys = expandNodeId;
                    this.$refs['tree'].setCurrentKey(this.dfExpKeys.join(''));
                });
            },
            deep: true
        }
    },
    methods: {
        nodeClick(row) {
            this.$store.commit('subjectStore/updateExpandNodeId', row['id']);        //更新当前点击的节点id
            this.$store.dispatch('subjectStore/getTableDataById', this.$url + 'subjectGroup/selectSubjectByObject?id=' + row['id']);
        }
    },
    created() {
        this.$store.dispatch('subjectStore/getTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' + this.systemId);
        this.$store.commit('subjectStore/updateUrl', this.$url + 'subjectGroup/selectSubjectByObject?id=');
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
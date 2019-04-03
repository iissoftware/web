<template>
    <div class="approvalProcessDiv">
        <el-input placeholder="输入关键字" v-model="filterText"></el-input>
        <div class="treebox">
            <el-tree class="filter-tree" ref="tree" :data="treeData" node-key="id" :default-expanded-keys="dfExpKeys" :props="defaultProps" @node-click="nodeClick" :filter-node-method="filterNode"></el-tree>
        </div>
        <div class="el-btn-group" style="margin-top: 10px;text-align: right;">
            <el-button type="primary" size="small" @click="save">确定</el-button>
            <el-button type="danger" size="small" @click="close" style="margin-right: 5px;">关闭</el-button>
        </div>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-02-21
 * Description: 审批流程--部门--新增
 * store: approvalProcessStore
*/
export default {
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    data() {
        return {
            filterText: '',
            dfExpKeys: [],
            treeData: [],
            defaultProps: {
                label: 'name',
                children: 'subDepartment'
            },
            systemId: this.$store.state.systemId,
            systemInfo: this.$store.state.systemInfo[0],
            currentNode: {},        //当前选中的树形节点
        }
    },
    methods: {
        getTreeData() {
            let data = {
                name: this.systemInfo['companyNameChinese'],
                id: this.systemInfo['id'],
                level: 0,
                subDepartment: []
            }
            this.$http.get(this.$url + 'department/selectObject?systemId=' + this.systemId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        data.subDepartment = res.data.data;
                        this.dfExpKeys.push(data['id']);
                    }
                }
            });
            this.treeData = [data];
            //设置高亮
            setTimeout(() => {
                this.$refs['tree'].setCurrentKey(this.dfExpKeys.join(''));
            });
        },
        nodeClick(row) {
            let nodeId = this.$store.state.approvalProcessStore.nodeId,
                rootId = this.$store.state.approvalProcessStore.rootId;
            this.currentNode = {
                id: row['id'],
                name: row['name'],
                parentId: row['parentId'],
                parentName: '',
                pid: nodeId,             //分配一个父级id
                rootId: rootId,      //分配一个根节点
                level: 2,
                subList: [],
                children: []
            }
        },
        filterNode(value, data) {       //过滤查询树形节点
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        save() {
            let allId = this.$store.state.approvalProcessStore.allId;
            let obj = {
                id: allId,
                name: '全部',
                parentId: 0,
                parentName: '无',
                pid: this.currentNode['pid'],
                rootId: this.currentNode['rootId'],
                level: 2,
                subList: [],
                children: []
            }
            if(this.currentNode['parentId'] == 0) {         //如果没有上级部门，也就是上级是公司了，那么parentName就是公司名称
                this.currentNode['parentName'] = this.systemInfo['companyNameChinese'];
                this.$store.commit('approvalProcessStore/updateNodes', {level: 2, node: [obj, this.currentNode]});        //保存后，将当前选中的会计科目节点保存到store里面
                this.close();
            } else {
                this.$http.get(this.$url + 'department/selectObjectById?id=' + this.currentNode['parentId']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.currentNode['parentName'] = res.data.data['name'];
                            obj['parentId'] = this.currentNode['parentId'];
                            this.$store.commit('approvalProcessStore/updateNodes', {level: 2, node: [obj, this.currentNode]});        //保存后，将当前选中的会计科目节点保存到store里面
                            this.close();
                        }
                    }
                });
            }
        },
        close() {
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        },
    },
    created() {
        this.getTreeData();
    }
}
</script>
<style scoped>
    .approvalProcessDiv {position: relative;overflow: hidden !important;}
    .approvalProcessDiv .treebox {height: calc(100% - 92px) !important;background-color: #fff;overflow: hidden;}
    .approvalProcessDiv .treebox .el-tree {height: 100% !important;overflow-y: auto !important;}
    .approvalProcessDiv .el-input {margin-bottom: 10px !important;}
</style>

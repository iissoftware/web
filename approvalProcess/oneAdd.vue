<template>
    <div class="approvalProcessDiv" element-loading-spinner="el-icon-loading" element-loading-text="数据加载中..." element-loading-background="#fff" v-loading.fullscreen.lock="fullLoading">
        <el-input v-model="filterText" placeholder="输入关键字"></el-input>
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
 * Description: 审批流程--会计科目--新增
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
            fullLoading: true,
            treeData: [],
            filterText: '',
            dfExpKeys: [1],
            defaultProps: {
                label: 'name',
                children: 'subAssertList'
            },
            currentNode: {},        //当前选中的树形节点
            systemId: this.$store.state.systemId
        }
    },
    methods: {
        getTreeData() {         //获取树形结构数据
            this.$http.get(this.$url + 'subjectGroup/selectUnion?systemId=' + this.systemId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.treeData = res.data.data;
                        this.setTreeDataNo(this.treeData);
                        this.dfExpKeys = [this.treeData[0]['id']];          //默认高亮展开第0个节点
                        this.fullLoading = false;
                    }
                }
            });
        },
        nodeClick(row) {            //树形结构节点触发
            let store = this.$store.state.approvalProcessStore;
            this.currentNode = {
                id: row['id'],
                name: row['name'],
                pid: store['rootId'],
                rootId: store['rootId'],
                level: 1,
                children: [],
                subList: []
            }
        },
        filterNode(value, data) {       //过滤查询树形节点
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        setTreeDataNo(arr) {     //递归设置（会计科目）树形结构节点加上编码
            for(let key in arr) {
                if(arr[key]['name'] !== '资产' && arr[key]['name'] !== '负债' && arr[key]['name'] !== '共同' && arr[key]['name'] !== '权益' && (arr[key]['name'] !== '成本' || arr[key]['code'] == '10130') && arr[key]['name'] !== '损益' && arr[key]['name'] !== '表外') {
                    arr[key]['name'] = arr[key]['code'] + ' (' + arr[key]['name'] + ')';
                }
                if(arr[key]['subAssertList'] && arr[key]['subAssertList'].length > 0) {
                    this.setTreeDataNo(arr[key]['subAssertList']);
                }
            }
        },
        save() {            //保存
            if(this.currentNode['id']) {
                let store = this.$store.state.approvalProcessStore;
                this.currentNode['subList'].push(
                    {id: store.ttId, name: '全部', pid: this.currentNode['id'], rootId: store.rootId, level: 2, parentName: '无', parentId: 0, children: [], subList: [
                    {id: store.ttId, name: '全部', pid: store.ttId, rootId: store.rootId, level: 3, vercharId: this.currentNode['id'], children: [], subList: [
                    {id: store.ttId, pid: store.ttId, rootId: store.rootId, level: 4, vercharId: this.currentNode['id'], money1: store.minMoney, money2: store.maxMoney, name: store.minMoney + ' ~ ' + store.maxMoney + '元', children: [], subList: []}
                    ]}
                ]});
                let obj = {
                    id: store.ttId,
                    name: '全部',
                    pid: store.rootId,
                    rootId: store.rootId,
                    level: 1,
                    children: [],
                    subList: []
                }
                obj['subList'].push(
                    {id: store.ttId, name: '全部', pid: obj['id'], rootId: store.rootId, level: 2, parentName: '无', parentId: 0, children: [], subList: [
                    {id: store.ttId, name: '全部', pid: store.ttId, rootId: store.rootId, level: 3, vercharId: obj['id'], children: [], subList: [
                    {id: store.ttId, pid: store.ttId, rootId: store.rootId, level: 4, vercharId: obj['id'], money1: store.minMoney, money2: store.maxMoney, name: store.minMoney + ' ~ ' + store.maxMoney + '元', children: [], subList: []}
                    ]}
                ]});
                this.$store.commit('approvalProcessStore/updateNodes', {level: 1, node: [obj, this.currentNode]});        //保存后，将当前选中的会计科目节点保存到store里面
                this.close();
            } else {
                this.$message({message: '只能选中会计科目节点', duration: 1000, type: 'warning'});
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
<style>
    /* .approvalProcessDiv .el-button {padding: } */
</style>
<style scoped>
    .approvalProcessDiv {position: relative;overflow: hidden !important;}
    .approvalProcessDiv .treebox {height: calc(100% - 92px) !important;background-color: #fff;overflow: hidden;}
    .approvalProcessDiv .treebox .el-tree {height: 100% !important;overflow-y: auto !important;}
    .approvalProcessDiv .el-input {margin-bottom: 10px !important;}
</style>


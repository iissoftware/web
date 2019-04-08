<template>
    <div class="allDepartment">
        <el-input v-model="searchDepartText" placeholder="输入关键字"></el-input>
        <div class="treebox">
            <el-tree :data="treeData" :accordion="true" node-key="id" :default-expanded-keys="dfExpKeys" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="nodeClick" :default-expand-all="true" :highlight-current="true"></el-tree>
        </div>
        <div class="el-btn-group" style="margin-top: 10px;text-align: right;">
            <el-button type="primary" size="small" @click="save">确定</el-button>
            <el-button type="danger" size="small" @click="close" style="margin-right: 5px;">关闭</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                searchDepartText: '',
                treeData: [],
                dfExpKeys: [],
                defaultProps: {
                    label: 'name',
                    children: 'subDepartment'
                },
                systemId: this.$store.state.systemId,
                systemInfo: this.$store.state.systemInfo[0],
                currentNode: {
                    name: '',
                    parentId: ''
                }
            }
        },
        watch: {
            searchDepartText(val){
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            getTreeData() {     //获取树形结构数据
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
                }, 1000);
            },
            filterNode(value, data) {               //部门选择里面的搜索框
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            nodeClick(row) {              //点击当前节点触发
                this.currentNode['name'] = row['name'];
                this.currentNode['parentId'] = row['id'];
            },
            save() {            //确定保存
                this.$store.commit('departmentStore/updateParentId', this.currentNode['parentId']);
                this.$store.commit('departmentStore/updateLastDepartmentName', this.currentNode['name']);
                this.close()
            },
            close() {           //关闭新增弹窗
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
    .allDepartment {position: relative;overflow: hidden !important;}
    .allDepartment .treebox {height: calc(100% - 92px) !important;background-color: #fff;overflow: hidden;}
    .allDepartment .treebox .el-tree {height: 100% !important;overflow-y: auto !important;}
    .allDepartment .el-input {margin-bottom: 10px !important;}
</style>

<template>
    <!-- 上级部门弹窗 -->
    <div class="allDepartment">
        <el-input v-model="searchDepartText" placeholder="输入关键字"></el-input>
        <el-tree :data="allTreeData" :accordion="true" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @dbclick.native="dbClickTree" @node-click="getCurrentTreeData" :default-expand-all="true" :highlight-current="true" style="margin-top:10px;"></el-tree>
        <div class="el-btn-group" style="margin-top: 10px;text-align: right;">
            <el-button type="primary" size="small" @click="closeAllDepartment">确定</el-button>
            <el-button type="danger" size="small" @click="close" style="margin-right: 5px;">关闭</el-button>
        </div>
    </div>
</template>
<style scoped>
    .allDepartment {position: relative;}
</style>
<script>
    export default {
        data() {
            return {
                searchDepartText: '',
                allTreeData: [],
                defaultProps: {
                    label: 'name',
                    children: 'subDepartment'
                },
                dbClickRow: {       //双击选中的部门数据
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
            filterNode(value, data) {               //部门选择里面的搜索框
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            getAllTreeData() {                      //获取分管部门数据
                var treeData = {}
                this.$http.get(this.$url + 'systemParameters/selectSystemInfo').then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            treeData['name'] = res.data.data['companyNameChinese'];
                            treeData['id'] = res.data.data['id'];
                            treeData['subDepartment'] = [];
                            setTimeout(() => {
                                this.$http.get(this.$url + 'department/selectObject?parentId=' + treeData['id'] + '&systemId=' + this.$store.state.systemId).then(res => {
                                    if(res.data.code == 20001) {
                                        treeData['subDepartment'] = res.data.data;
                                        this.allTreeData = [treeData];
                                    }
                                })
                            });
                        }
                    }
                });
            },
            getCurrentTreeData(row) {              //获取上级部门弹窗数据
                this.dbClickRow = row;
            },
            closeAllDepartment() {
                this.$store.commit('customerStore/updateDepartment', this.dbClickRow);
                this.close();
            },
            close() {           //关闭新增弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
            },
        },
        mounted() {
            this.getAllTreeData();
        }
    }
</script>
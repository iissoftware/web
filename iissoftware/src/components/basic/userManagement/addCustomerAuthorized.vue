<template>
    <!-- 客户查看权限新增弹窗 -->
    <div class="allDepartment">
        <el-input v-model="searchDepartText" placeholder="输入关键字"></el-input>
        <el-tree :data="allTreeData" :accordion="false" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @dbclick.native="dbClickTree" @node-click="getCurrentTreeData" :default-expand-all="true" :highlight-current="true" style="margin-top:10px;"></el-tree>
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
                allTreeData: this.$store.state.userManagementStore.allTreeData,
                defaultProps: {
                    label: 'name',
                    children: 'clients'
                },
                dbClickRow: {       //双击选中的部门数据
                    name: '',
                    parentId: ''
                },
                currentRow: {}
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
            getCurrentTreeData(row) {              //获取上级部门弹窗数据
                this.currentRow = row;
            },
            closeAllDepartment() {
                this.$store.commit('updateCustomerPer', this.currentRow);
                this.close();
            },
            close() {           //关闭新增弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
            },
        },
        mounted() {
            this.$store.dispatch('userManagementStore/getCustomerData', this.$url + 'userManage/findAccountItem');
            setTimeout(() => {
                this.allTreeData = this.$store.state.userManagementStore.allTreeData
            });
        }
    }
</script>
<template>
    <!-- 右侧树形菜单权限 -->
    <div class="moudle_right">
        <div class="moudle_right_title">菜单权限
            <div class="btn-photo">
                <el-button type="primary" style="padding:4px 4px!important" @click="save">保存</el-button>
                <img src="../../../assets/images/nochoose.png" alt="" title="清空" @click="clearChecked">
                <img src="../../../assets/images/allchoose.png" alt="" title="全选" @click="allChecked">
                <img src="../../../assets/images/helong.png" alt="" title="合拢" v-if="defaultExpand" @click="closeWholeTreeData">
                <img src="../../../assets/images/an.png" alt="" title="展开" v-else @click="closeWholeTreeData">
            </div>
        </div>
        <el-tree :data="treeData" :props="defaultProps" ref="VueTree" node-key="id" show-checkbox :default-expand-all="defaultExpand"></el-tree>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                treeData: this.$store.state.userGroupStore.treeData,            //树形结构数据
                defaultProps: {                                                 //树形子类
                    children: 'submenuList',
                    label: 'name',
                },
                mids: this.$store.state.userGroupStore.mids,                    //存储用户权限id
                defaultExpand: true,                                            //是否合拢
                currentRow: this.$store.state.userGroupStore.currentRow         //选中当前左侧表格的行数据
            }
        },
        watch: {
            mids(newVal, oldVal) {          //监听状态里面的数据变化，如果发生变化就设置选中状态
                setTimeout(() => {
                    this.$refs.VueTree.setCheckedKeys(newVal);
                });
            },
            currentRow: {
                handler(newVal) {
                    let treeData = this.$store.state.userGroupStore.treeData;
                    if(newVal['name'] != '系统管理员') {
                        this.disabledFn(treeData);
                    } else {
                        this.clearDisabledFn(treeData);
                    }
                },
                deep: true
            }
        },
        methods: {
            disabledFn(arr) {               //不允许勾选用户组管理
                if(arr.length > 0) {
                    arr.forEach(item => {
                        if(item['name'] == '用户组管理') {
                            item['disabled'] = true;
                        } else {
                            let submenuList = item['submenuList'];
                            if(submenuList && item['submenuList'].length > 0) {
                                this.disabledFn(item['submenuList']);
                            }
                        }
                    })
                }
            },
            clearDisabledFn(arr) {          //清空不允许勾选
                if(arr.length > 0) {
                    arr.forEach(item => {
                        if(item['name'] == '用户组管理' && item['disabled']) {
                            delete item['disabled'];
                        } else {
                            let submenuList = item['submenuList'];
                            if(submenuList && item['submenuList'].length > 0) {
                                this.clearDisabledFn(item['submenuList']);
                            }
                        }
                    })
                }
            },
            save() {                        //保存菜单权限
                if(this.$store.state.systemId) {
                    let rowName = this.$store.state.userGroupStore.currentRow['name'];
                    if(rowName == '系统管理员') {
                        this.$message.error('系统管理员不能修改权');
                        return false;
                    } else {
                        //获取当前选中的权限id
                        let getCheckedNodesKeys = this.$refs.VueTree.getCheckedKeys();
                        let data = {
                            ugid: this.$store.state.userGroupStore.currentRow['id'],
                            systemId: this.$store.state.systemId,
                            mids: getCheckedNodesKeys,
                        }
                        this.$http({
                            method: "post",
                            url: this.$url + "menu/updateObject",
                            data: data
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message.success('保存成功');
                            } else {
                                this.$message.success('保存失败,请联系管理员');
                            }
                        });
                    }
                } else {
                    this.$message.warning('先添加系统参数');
                }
            },
            clearChecked() {                //清空选中节点
                this.$store.commit('userGroupStore/clearMids');
            },
            allChecked() {                  //全选
                this.$refs.VueTree.setCheckedNodes(this.treeData);
            },
            closeWholeTreeData() {          //合拢
                this.defaultExpand = !this.defaultExpand;
                for(var i = 0; i < this.$refs.VueTree.store._getAllNodes().length; i++){
                    this.$refs.VueTree.store._getAllNodes()[i].expanded = this.defaultExpand;
                }
            }
        },
        mounted() {
            this.$store.dispatch('userGroupStore/getTreeData', this.$url + 'menu/selectObject');           //获取树形结构数据
        }
    }
</script>
<style>
    .moudle_right .el-checkbox.is-disabled + span {
        cursor: not-allowed !important;
        color: #aaa8a8 !important;
    }
</style>

<style scoped>
    .moudle_right .el-tree {height: calc(100% - 51px) !important;overflow-y: auto;}
</style>



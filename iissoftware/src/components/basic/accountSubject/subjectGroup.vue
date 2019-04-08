<template>
    <div class="subjectGroup">
        <div class="block-area">
            <div class="btn-group">
                <el-button type="info" @click="refresh">刷新</el-button>
                <el-button type="primary" v-if="isAdd" disabled>新增</el-button>
                <el-button type="primary" v-else @click="add">新增</el-button>
                <el-button type="success" v-if="isEdit" disabled>编辑</el-button>
                <el-button type="success" v-else @click="update">编辑</el-button>
                <el-button type="warning" v-if="isEdit" disabled>删除</el-button>
                <el-button type="warning" v-else @click="del">删除</el-button>
            </div>
        </div>
        <!-- default-expanded-keys默认展开的节点，current-node-key默认选中的节点，前面两个要设置node-key才起作用  :current-node-key="currentNodeKey"  -->
        <el-tree :data="treeData" :props="defaultProps" node-key="id" :default-expanded-keys="dfExpKeys" ref="treeBox" :accordion="false" @node-click="nodeClick" :default-expand-all="false" :highlight-current="true"></el-tree>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-22
 * Description: 科目组组件
*/
export default {
    data() {
        return {
            isAdd: true,
            isEdit: true,
            dfExpKeys: [],
            treeData: this.$store.state.subjectStore.groupObj.treeData,
            defaultProps: {
                label: 'name',
                children: 'subAssertList'
            },
            systemId: this.$store.state.systemId
        }
    },
    watch: {
        treeData() {
            let currentRow = this.$store.state.subjectStore.groupObj.currentRow[0];
            if(currentRow) {
                this.dfExpKeys = [currentRow['id']];
            } else {
                //默认第一次进来，dfExpKeys为树形节点的第一个节点id
                this.dfExpKeys = [this.treeData[0]['id']];
            }
            //设置高亮
            setTimeout(() => {
                this.$refs['treeBox'].setCurrentKey(this.dfExpKeys.join(''));
            });
        }
    },
    methods: {
        nodeClick(row) {
            this.$store.commit('subjectStore/updateGroupCurrentRow', row);
            row['code'] == '101' ? this.isAdd = true : this.isAdd = false;
            // 7大类目录不可编辑和删除
            if(row['code'] == '101.1' || row['code'] == '101.2' || row['code'] == '101.3' || row['code'] == '101.4' || row['code'] == '101.5' || row['code'] == '101.6' || row['code'] == '101.7' || row['code'].length == 4) {
                this.isEdit = true;
            } else {
                this.isEdit = false;
            }
        },
        refresh() {     //刷新

        },
        add() {         //新增
            this.$util.openSubLayerIframe('增加目录', 13, '450px', '300px', this.$domain + '/#/accountSubject/addSubjectGroup');
        },
        update() {          //修改
            this.$util.openSubLayerIframe('编辑目录', 13, '450px', '250px', this.$domain + '/#/accountSubject/updateSubjectGroup');
        },
        del() {         //删除
            //删除这里需要注意，先判断是否有子节点，有就不能删除，没有的话再判断是否是会计科目下的7大类，
            //是的话就不能被删除，不是的话再次判断该节点的代码是否是4位，是4位也不能被删除，不是的话就可以删除
            let currentRow = this.$store.state.subjectStore.groupObj.currentRow[0];
            if(currentRow['subAssertList'].length > 0) {
                this.$message.warning({message: '需要先删除的节点有子节点', duration: 1000, type: 'warning'});
            } else {
                let code = currentRow['code'].split('.')[0];
                if(code == 101 || code.length == 4) {
                    this.$message.warning({message: '不能删除该节点', duration: 1000, type: 'warning'});
                } else {
                    this.$confirm('删除数据不可恢复, 确定要删除选中的节点吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(this.$url + 'subjectGroup/deleteGroupById?id=' + currentRow['id']).then(res => {
                            if(res.data.code == 20001) {
                                this.$message.success({message: '删除节点成功', duration: 1000, type: 'warning'});
                                setTimeout(() => {
                                    this.$store.dispatch('subjectStore/getGroupTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);      //重新获取数据
                                }, 1000);
                            } else {
                                this.$message.error({message: res.data.msg, duration: 1000, type: 'error'});
                            }
                        });
                    }).catch(() => {
                        this.$message.warning({message: '已取消删除', duration: 1000, type: 'warning'});
                    });
                }
            }
        }
    },
    created() {
        this.$store.dispatch('subjectStore/getGroupTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
    }
}
</script>
<style>
    .subjectGroup .el-tree {height: calc(100% - 52px) !important;overflow-y: auto !important;}
</style>

<style scoped>
    .block-area:nth-of-type(1) {height: auto !important;padding-bottom: 10px !important;}
</style>
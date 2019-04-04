<template>
    <div class="section">
        <div class="tree-left">
            <div class="tree-left-title">单据列表</div>
            <el-tree :data="treeData" ref="tree" :accordion="true" :default-expanded-keys="dfExpKeys" node-key="id" :expand-on-click-node="true" :props="defaultProps" :highlight-current="true" @node-click="nodeClick"></el-tree>
        </div>
        <div class="tree-right">
            <div class="block-area">
                <div class="btn-box">
                    <div class="btn-group">
                        <el-button type="info">刷新</el-button>
                        <el-button type="primary" v-if="!isAdd" disabled>新增</el-button>
                        <el-button type="primary" v-else @click="add">新增</el-button>
                        <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                        <el-button type="danger" v-else @click="del">删除</el-button>
                    </div>
                </div>
                <!-- 表格数据 -->
                <div class="table">
                    <el-table :data="tableData" @selection-change="selectionChange">
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column type="index" label="序号" width="100"></el-table-column>
                        <el-table-column property="money1" label="金额下限"></el-table-column>
                        <el-table-column property="money2" label="金额上限"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * Author: iissoftware
 * Date: 2019-02-21
 * Description: 审批流程－－金额
*/
export default {
    data() {
        return {
            treeData: this.$store.state.approvalProcessStore.treeData,
            tableData: [],
            dfExpKeys: [],
            activeName: this.$store.state.approvalProcessStore.activeName,
            multipleSelection: [],
            selectRowId: [],
            defaultProps: {
                label: 'name',
                children: 'children'
            },
            isAdd: false
        }
    },
    watch: {
        activeName(newVal) {
            if(newVal[0] === 'four') {
                this.isAdd = false;
                let store = this.$store.state.approvalProcessStore,
                    rootId = store.rootId,
                    treeData = store.treeData,
                    dp = null;
                treeData.forEach(rootItem => {
                    rootItem['children'].forEach(vercharItem => {
                        vercharItem['children'].splice(0);
                        vercharItem['subList'].forEach(dpItem => {
                            vercharItem['children'].push(dpItem);
                            if(vercharItem['children'].length > 0) {
                                vercharItem['children'].forEach(dpItem => {
                                    if(dpItem['subList'].length > 0) {
                                        dpItem['children'].splice(0);
                                        dpItem['subList'].forEach(empItem => {
                                            if(empItem['children'].length > 0) empItem['children'].splice(0);
                                            dpItem['children'].push(empItem);
                                        });
                                    }
                                });
                            }
                        });
                    });
                });
                this.treeData = [].concat(treeData);
            }
        }
    },
    methods: {
        setAllNode(id, pid, rootId, name, level) {          //设置默认全部节点
            return {
                id: id,
                pid: pid,
                rootId: rootId,
                name: name,
                level: level,
                subList: [],
                children: []
            }
        },
        nodeClick(row) {
            if(row['level'] === 3) {
                this.isAdd = true;
                this.tableData = row['subList'];
            } else {
                this.isAdd = false;
                this.tableData = [];
            }
        },
        selectionChange(arr) {
            this.multipleSelection = arr;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        add() {
            this.$util.openSubLayerIframe('新增金额', 13, '500px', '250px', this.$domain + '/#/approvalProcess/fourAdd');
        },
        del() {
            this.$confirm('确定删除选中数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({message: '删除成功', duration: 1000, type: 'success'});
                setTimeout(() => {
                    this.$store.commit('approvalProcessStore/deleteNodes', this.multipleSelection);
                }, 1000);
            }).catch(() => {
                this.$message({message: '已取消删除', duration: 1000, type: 'info'});
            });
        }
    }
}
</script>

<style scoped lang="less">
.section {height: 100% !important;}
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
.tree-right {
    height: 100%;
    width: calc(100% - 215px);
    overflow: hidden;
    float: right;
    border-radius: 6px !important;
}
</style>

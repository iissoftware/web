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
                        <el-button type="success" v-if="tableData.length <= 0" disabled>保存</el-button>
                        <el-button type="success" v-else @click="save">保存</el-button>
                        <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                        <el-button type="danger" v-else @click="del">删除</el-button>
                    </div>
                </div>
                <!-- 表格数据 -->
                <div class="table">
                    <el-table :data="tableData" border @selection-change="selectionChange">
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <el-table-column property="name" label="审核人">
                            <template slot-scope="scope">
                                <span v-for="(item,index) in arr" :key="index">
                                    <i style="font-style: normal;" v-if="scope.row.name == item['id']">{{ item['name'] }}</i>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column property="name1" label="并列审核人1">
                            <template slot-scope="scope">
                                <span v-for="(item,index) in arr" :key="index">
                                    <i style="font-style: normal;" v-if="scope.row.name1 == item['id']">{{ item['name'] }}</i>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column property="name2" label="并列审核人2">
                            <template slot-scope="scope">
                                <span v-for="(item,index) in arr" :key="index">
                                    <i style="font-style: normal;" v-if="scope.row.name2 == item['id']">{{ item['name'] }}</i>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column property="name3" label="并列审核人3">
                            <template slot-scope="scope">
                                <span v-for="(item,index) in arr" :key="index">
                                    <i style="font-style: normal;" v-if="scope.row.name3 == item['id']">{{ item['name'] }}</i>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column property="nodeType" label="节点类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.nodeType == 0">审核</span>
                                <span v-if="scope.row.nodeType == 1">知会</span>
                                <span v-if="scope.row.nodeType == 2">抄送</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="generateDocument" label="生成单据">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.generateDocument" disabled="disabled"></el-checkbox>
                            </template>
                        </el-table-column>
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
 * Description: 审批流程－－审批步骤
*/
export default {
    data() {
        return {
            treeData: [],
            tableData: [],
            dfExpKeys: [],
            activeName: this.$store.state.approvalProcessStore.activeName,
            multipleSelection: [],
            selectRowId: [],
            defaultProps: {
                label: 'name',
                children: 'children'
            },
            arr: [],
            systemId: this.$store.state.systemId,
            isAdd: false,
            money1: null,
            money2: null,
            rowIndex: 0            //行号
        }
    },
    watch: {
        tableData(newVal) {
            this.rowIndex = newVal.length;
        },
        activeName(newVal) {
            if(newVal[0] === 'five') {
                this.isAdd = false;
                let store = this.$store.state.approvalProcessStore,
                    rootId = store.rootId,
                    treeData = store.treeData;
                this.arr = store.names;
                treeData.forEach(rootItem => {
                    rootItem['children'].forEach(vercharItem => {
                        if(vercharItem['subList'].length > 0) {
                            vercharItem['children'].splice(0);
                            vercharItem['subList'].forEach(dpItem => {
                                vercharItem['children'].push(dpItem);
                            });
                        }
                        if(vercharItem['children'].length > 0) {
                            vercharItem['children'].forEach(dpItem => {
                                if(dpItem['subList'].length > 0) {
                                    dpItem['children'].splice(0);
                                    dpItem['subList'].forEach(empItem => {
                                        dpItem['children'].push(empItem);
                                    });
                                }
                                if(dpItem['children'].length > 0) {
                                    dpItem['children'].forEach(empItem => {
                                        if(empItem['subList'].length > 0) {
                                            empItem['children'].splice(0);
                                            empItem['subList'].forEach(moneyItem => {
                                                empItem['children'].push(moneyItem);
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
                this.treeData = [].concat(treeData);
            }
        }
    },
    methods: {
        nodeClick(row) {
            if(row['level'] === 4) {
                this.isAdd = true;
                this.tableData = row['subList'];
            } else {
                this.isAdd = false;
                this.tableData = [];
            }
            this.$store.commit('approvalProcessStore/updateId', {nodeId: row['id'], rootId: row['rootId']});
        },
        selectionChange(arr) {
            this.multipleSelection = arr;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        add() {
            this.$util.openSubLayerIframe('新增审核人', 13, '600px', '400px', this.$domain + '/#/approvalProcess/addEmployeeRow');
        },
        del() {         //删除
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
        },
        save() {        //保存
            
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

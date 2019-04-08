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
            arr: this.$store.state.approvalProcessStore.names,
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
                let rootId = this.$store.state.approvalProcessStore.rootId,
                    treeData = this.$store.state.approvalProcessStore.treeData,
                    money = null,
                    step = null;
                treeData.forEach(item => {
                    if(item['children'].length > 0) {
                        item['children'].forEach(item1 => {
                            if(item1['subList'].length > 0) {
                                item1['children'].splice(0);
                                item1['subList'].forEach(item2 => {
                                    item1['children'].push(item2);
                                    money = item1['children'];
                                });
                            }
                            if(money.length > 0) {
                                money.forEach(mnItem => {
                                    if(mnItem['subList'].length > 0) {
                                        mnItem['children'].splice(0);
                                        mnItem['subList'].forEach(mnSubItem => {
                                            //清除职员节点下面的金额节点
                                            if(mnSubItem['children'].length > 0) {
                                                mnSubItem['children'].splice(0);
                                            }
                                            mnItem['children'].push(mnSubItem);
                                            step = mnItem['children'];
                                        });
                                    }
                                    if(step.length > 0) {
                                        step.forEach(stepItem => {
                                            if(stepItem['subList'].length > 0) {
                                                stepItem['subList'].forEach(stepSubItem => {
                                                    stepItem['children'].push(stepSubItem);
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
                this.treeData = [].concat(treeData);
            }
        }
    },
    methods: {
        nodeClick(row) {
            if(row['level'] === 4) {
                let submitObj = this.$store.state.approvalProcessStore.submitObj;
                this.isAdd = true;
                this.tableData = row['subList'];
                this.money1 = row['money1'];
                this.money2 = row['money2'];
                if(this.$util.isNull(submitObj['verchars'])) {          
                    this.$store.commit('approvalProcessStore/updateNodeId', {type: 2, id: row['vercharId']});
                }
                if(this.$util.isNull(submitObj['departments'])) {          
                    this.$store.commit('approvalProcessStore/updateNodeId', {type: 3, id: row['dpid']});
                }
                if(this.$util.isNull(submitObj['employees'])) {          
                    this.$store.commit('approvalProcessStore/updateNodeId', {type: 4, id: row['pid']});
                }
                this.$store.commit('approvalProcessStore/updateNodeId', {type: 5, id: row['id']});
            } else {
                this.isAdd = false;
                this.tableData = [];
            }
            this.$store.commit('approvalProcessStore/updateId', row['id']);
            this.$store.commit('approvalProcessStore/updateRootId', row['rootId']);     //存储当前根节点
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
            let submitObj = this.$store.state.approvalProcessStore.submitObj,
                tableData = this.tableData,
                approvers = [],
                notifyPeoples = [];
            tableData.forEach((item, index) => {
                if(item['nodeType'] == 0) {
                    if(item['name'] !== '') approvers.push(submitObj['amounts'] + ',' + item['name'] + ',' + (index + 1) + ',0');
                    if(item['name1'] !== '') approvers.push(submitObj['amounts'] + ',' + item['name1'] + ',' + (index + 1) + ',0');
                    if(item['name2'] !== '') approvers.push(submitObj['amounts'] + ',' + item['name2'] + ',' + (index + 1) + ',0');
                    if(item['name3'] !== '') approvers.push(submitObj['amounts'] + ',' + item['name3'] + ',' + (index + 1) + ',0');
                }
                if(item['nodeType'] == 1) {
                    if(item['name'] !== '') notifyPeoples.push(submitObj['amounts'] + ',' + item['name'] + ',' + (index + 1) + ',1');
                    if(item['name1'] !== '') notifyPeoples.push(submitObj['amounts'] + ',' + item['name1'] + ',' + (index + 1) + ',1');
                    if(item['name2'] !== '') notifyPeoples.push(submitObj['amounts'] + ',' + item['name2'] + ',' + (index + 1) + ',1');
                    if(item['name3'] !== '') notifyPeoples.push(submitObj['amounts'] + ',' + item['name3'] + ',' + (index + 1) + ',1');
                }
            });
            let obj = {
                bills: [String(this.$store.state.approvalProcessStore.rootId)],        //单据id
                verchars: [String(submitObj.verchars)],          //会计科目id
                departments: [String(submitObj.departments)],      //部门id
                employees: [String(submitObj.employees)],         //职员id
                amounts: [this.money1 + ',' + this.money2],         //金额字符串
                notifyPeoples: notifyPeoples,
                approvers: approvers
            }
            console.log(obj)
            var type = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            this.$http.post(this.$url + 'activiti/insertMain', JSON.stringify(obj), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: res.data.data || '保存成功', duration: 1500, type: 'success'});
                } else {
                    this.$message({message: res.data.msg || '保存失败', duration: 1500, type: 'success'});
                }
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

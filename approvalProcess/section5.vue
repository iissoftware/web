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
            arr: this.$store.state.approvalProcessStore.names,          //所有审核人
            systemId: this.$store.state.systemId,
            isAdd: false,
            money1: null,
            money2: null,
            rowIndex: 0,            //行号
            id: null
        }
    },
    watch: {
        tableData(newVal) {
            this.rowIndex = newVal.length;
        },
        activeName(newVal) {
            if(newVal[0] === 'five') {
                this.isAdd = false;
                let treeData = this.$store.state.approvalProcessStore.treeData;
                treeData.forEach(rootItem => {
                    rootItem['children'].forEach(vercharItem => {
                        if(vercharItem['subList'].length > 0) {
                            if(vercharItem['children'].length > 0) vercharItem['children'].splice(0);
                            vercharItem['subList'].forEach(dpItem => {
                                vercharItem['children'].push(dpItem);
                                if(dpItem['subList'].length > 0) {
                                    dpItem['children'].splice(0);
                                    dpItem['subList'].forEach(empItem => {
                                        dpItem['children'].push(empItem);
                                        if(empItem['subList'].length > 0) {
                                            empItem['children'].splice(0);
                                            empItem['subList'].forEach(mnItem => {
                                                if(mnItem['children'].length > 0) mnItem['children'].splice(0);
                                                empItem['children'].push(mnItem);
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
            if(row['level'] == 4) {
                this.isAdd = true;
                this.tableData = row['subList'];
                this.money1 = row['money1'];
                this.money2 = row['money2'];
                //更新根节点id, 职员id, 金额id
                this.$store.commit('approvalProcessStore/updateId', {rootId: row['rootId'], empId: row['pid'], mnId: row['id']});
                //递归找到部门id
                this.findDpIdByRow(row, this.treeData);           //通过row属性找到当前所属的会计科目id
                //找到是不是同一条审批流程，是的话就加上id一起提交，作为修改。否则就是新增
                this.isCommonRoad(row);
            } else {
                this.isAdd = false;
                this.tableData = [];
            }
        },
        findDpIdByRow(row, arr) {           //通过row找到对应的部门id
            let store = this.$store.state.approvalProcessStore;
            arr.forEach(item => {
                if(item['rootId'] == row['rootId'] && item['vercharId'] == row['vercharId'] && item['id'] == row['pid'] && item['pid'] == row['dpId'] && item['level'] == 3) {
                    //更新部门id，会计科目id
                    this.$store.commit('approvalProcessStore/updateId', {dpId: item['pid'], vercharId: item['vercharId']});
                } else {
                    if(item['children'].length > 0) {
                        this.findDpIdByRow(row, item['children']);
                    }
                }
            });
        },
        isCommonRoad(row) {
            let billList = this.$store.state.approvalProcessStore.billList;
            billList.forEach(item => {
                if(row['rootId'] == item['bills'][0]['id'] && row['vercharId'] == item['verchars'][0]['id'] && row['dpId'] == item['departments'][0]['id'] && row['pid'] == item['employees'][0]['id'] && row['id'] == item['moneys'][0]['id']) {
                    this.id = item['id'];
                } else {
                    this.id = null;
                }
            });
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
                this.$message({message: '删除成功', duration: 1500, type: 'success'});
                setTimeout(() => {
                    this.$store.commit('approvalProcessStore/deleteNodes', {level: 5, arr: this.multipleSelection});
                }, 1000);
            }).catch(() => {
                this.$message({message: '已取消删除', duration: 1000, type: 'info'});
            });
        },
        save() {        //保存
            let store = this.$store.state.approvalProcessStore;
            let tableData = this.tableData,
                approvers = [],
                notifyPeoples = [];
            tableData.forEach((item, index) => {
                if(item['nodeType'] == 0) {
                    if(item['name'] !== '' && typeof(item['name']) != 'undefined') approvers.push(store['mnId'] + ',' + item['name'] + ',' + (index + 1) + ',' + Number(item['generateDocument']));
                    if(item['name1'] !== '' && typeof(item['name1']) != 'undefined') approvers.push(store['mnId'] + ',' + item['name1'] + ',' + (index + 1) + ',' + Number(item['generateDocument']));
                    if(item['name2'] !== '' && typeof(item['name2']) != 'undefined') approvers.push(store['mnId'] + ',' + item['name2'] + ',' + (index + 1) + ',' + Number(item['generateDocument']));
                    if(item['name3'] !== '' && typeof(item['name3']) != 'undefined') approvers.push(store['mnId'] + ',' + item['name3'] + ',' + (index + 1) + ',' + Number(item['generateDocument']));
                }
                if(item['nodeType'] == 1) {
                    if(item['name'] !== '' && typeof(item['name']) != 'undefined') notifyPeoples.push(store['mnId'] + ',' + item['name'] + ',' + (index + 1) + ',' + Number(item['generateDocument']));
                    if(item['name1'] !== '' && typeof(item['name1']) != 'undefined') notifyPeoples.push(store['mnId'] + ',' + item['name1'] + ',' + (index + 1) + ',' + Number(item['generateDocument']));
                    if(item['name2'] !== '' && typeof(item['name2']) != 'undefined') notifyPeoples.push(store['mnId'] + ',' + item['name2'] + ',' + (index + 1) + ',' + Number(item['generateDocument']));
                    if(item['name3'] !== '' && typeof(item['name3']) != 'undefined') notifyPeoples.push(store['mnId'] + ',' + item['name3'] + ',' + (index + 1) + ',' + Number(item['generateDocument']));
                }
            });
            let obj = {
                bills: [String(store.rootId)],
                verchars: [String(store.vercharId)],
                departments: [String(store.dpId)],
                employees: [String(store.empId)],
                amounts: [this.money1 + ',' + this.money2],
                notifyPeoples: notifyPeoples,
                approvers: approvers
            }
            if(this.id) obj['id'] = this.id;            //如果走的是同一条流程，那么就加上id，作为修改
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
    width: 355px;
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
    width: calc(100% - 370px);
    overflow: hidden;
    float: right;
    border-radius: 6px !important;
}
</style>

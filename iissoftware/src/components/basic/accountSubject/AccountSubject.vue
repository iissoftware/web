<template>
    <div class="accountSubject">
        <v-tree/>
        <div class="tree-right">
            <!-- 工具栏　-->
            <div class="block-area">
                <el-input v-model.trim="searchText" placeholder="输入搜索内容" class="sousuo-input" @keyup.enter.native="search"></el-input>
                <el-button type="primary" class="sousuo" @click="search">查询</el-button>
                <div class="btn-group">
                    <el-button type="info" @click="refRow">刷新</el-button>
                    <el-button type="primary" @click="add">新增</el-button>
                    <el-button type="danger" v-if="multipleSelection.length != 1" disabled>删除</el-button>
                    <el-button type="danger" v-else @click="del">删除</el-button>
                    <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                    <el-button type="danger" v-else @click="disabedBtn(0, '禁用')">禁用</el-button>
                    <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                    <el-button type="success" v-else @click="disabedBtn(1, '启用')">启用</el-button>
                    <el-button type="warning" @click="showSubjectGroup">科目组</el-button>
                    <el-button-group class="btn-other">
                        <el-button v-if="multipleSelection.length <= 0" disabled>
                            <img src="../../../assets/images/export.png" alt="">
                        </el-button>
                        <el-button title="导出" v-else @click="exportExcel">
                            <img src="../../../assets/images/export.png" alt="">
                        </el-button>
                        <el-button title="打印">
                            <img src="../../../assets/images/print.png" alt="">
                        </el-button>
                        <el-button title="帮助">
                            <img src="../../../assets/images/help.png" alt="">
                        </el-button>
                    </el-button-group>
                </div>
            </div>
            <div class="block-area">
                <!-- 表格　-->
                <div class="table">
                    <el-table :data="tableData" border highlight-current-row @selection-change="selectionChange">
                        <el-table-column type="selection" fixed></el-table-column>
                        <el-table-column type="index" label="序号" width="80"></el-table-column>
                        <el-table-column property="code" label="编码" :show-overflow-tooltip="true" width="120"></el-table-column>
                        <el-table-column property="name" label="名称" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column property="type" label="类别">
                            <template slot-scope="scope">
                                <span>{{ scope.row.typeName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="balanceDirection" label="余额方向">
                            <template slot-scope="scope">
                                <span v-if="(scope.row.code.split('.')[0].length != 5 && scope.row.balanceDirection == 0) && (scope.row.code.split('.')[0].length != 3 && scope.row.balanceDirection == 0)">借方</span>
                                <span v-if="(scope.row.code.split('.')[0].length != 5 && scope.row.balanceDirection == 1) && (scope.row.code.split('.')[0].length != 3 && scope.row.balanceDirection == 1)">贷方</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="foreignCurrencyCheck" label="外币核算">
                            <template slot-scope="scope">
                                <span v-if="scope.row.foreignCurrencyCheck == 0">不核算</span>
                                <span v-for="item in allUnitTypes" :key="item['id']">
                                    <i style="font-style: normal !important;" v-if="item['id'] == scope.row.foreignCurrencyCheck">{{ item['name'] }}</i>
                                </span>
                                <span v-if="scope.row.foreignCurrencyCheck == 1002">所有币别</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="journal" label="出日记账">
                            <template slot-scope="scope">
                                <el-checkbox v-model="!!scope.row.journal" disabled></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column property="betweenObjects" label="往来科目">
                            <template slot-scope="scope">
                                <el-checkbox v-model="!!scope.row.betweenObject" disabled></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column property="locks" label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.locks === 1" style="color: green;">已启用</span>
                                <span v-else style="color: #f00;">已禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.code != '101'" type="text" size="small" @click="update(scope.row)">修改</el-button>
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
 * Date: 2019-01-22
 * Description: 会计科目组件
*/
import Tree from './tree'
export default {
    components: {'v-tree': Tree},
    data() {
        return {
            searchText: '',
            tableData: this.$store.state.subjectStore.tableData,
            allUnitTypes: this.$store.state.subjectStore.allUnitTypes,
            multipleSelection: [],
            selectRowId: [],
            searchAllResult: this.$store.state.subjectStore.searchAllResult,
            systemId: this.$store.state.systemId
        }
    },
    watch: {
        searchText(newVal) {
            if(!newVal) {
                this.tableData = this.$store.state.subjectStore.tableData;
            }
        },
    },
    methods: {
        search() {          //搜索
            if(this.searchText) {
                let newArr = [],
                    data = this.searchAllResult,
                    searchText = this.searchText;
                let reg = new RegExp(this.searchText, "g");
                data.forEach(item => {
                    if(reg.test(item['code']) || reg.test(item['balanceDirectionName']) || reg.test(item['name']) || (reg.test(item['typeName'])) || (item['toPinYinName'] && reg.test(item['toPinYinName'])) || (item['toPinYinTypeName'] && reg.test(item['toPinYinTypeName'])) || (item['toPinYinBalanceDirectionName'] && reg.test(item['toPinYinBalanceDirectionName'])) || (item['toPinYinForeignCurrencyCheckName'] && reg.test(item['toPinYinForeignCurrencyCheckName'])) || (item['foreignCurrencyCheckName'] && reg.test(item['foreignCurrencyCheckName']))) {
                        newArr.push(item);
                    }
                });
                this.tableData = newArr;
            }
        },
        refRow(){
            this.$store.dispatch('subjectStore/getTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
        },
        selectionChange(arr) {
            this.multipleSelection = arr;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        add() {     //新增
            this.$store.commit('subjectStore/clearObjectList');
            this.$util.openSubLayerIframe('会计科目-新增', 13, '600px', '400px', this.$domain + '/#/accountSubject/addSubject');
        },
        update(row) {          //修改
            this.$store.commit('subjectStore/updateRowId', row['id']);
            this.$store.commit('subjectStore/clearObjectList');
            this.$util.openSubLayerIframe('会计科目-修改', 13, '600px', '400px', this.$domain + '/#/accountSubject/updateSubject');
        },
        del() {
            var type = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            this.$confirm('此操作将永久删除该文件, 确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //开始求删除
                this.$http.get(this.$url + 'subjectGroup/deleteGroupById?id=' + this.selectRowId[0]).then(res => {
                    if(res.data.code == 20001) {
                        this.$message.success(res.data.data);
                        setTimeout(() => {
                            this.$store.dispatch('subjectStore/getTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                        }, 1000);
                    } else {
                        this.$message.error(res.data.msg || '删除失败！');
                    }
                });
            }).catch(() => {
                this.$message({type: 'info', message: '已取消删除', duration: 1000});
            });
        },
        showSubjectGroup() {            //科目组弹窗
            this.$util.openSubLayerIframe('会计科目类别管理', 13, '600px', '400px', this.$domain + '/#/accountSubject/subjectGroup');
        },
        disabedBtn(status, msg) {               //禁用、启用
            if(this.multipleSelection.length > 0) {
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(status == 0) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['locks'] == status) {
                            this.$alert('禁用失败，其中包含已禁用选项，重新选择！', '禁用提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                } else if(status == 1) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['locks'] == status) {
                            this.$alert('启动失败，其中包含已启动选项，重新选择！', '启动提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                }
                this.$http.post(this.$url + 'subjectGroup/enable?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.$store.dispatch('subjectStore/getTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                        }, 1000);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
                
            } else {
                this.$message({message: '选择你要'+ msg +'的数据', type: 'warning'});
            }
        },
        exportExcel() {     //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'subjectGroup/export',{params: { idList: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'subjectGroup/export?list=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                });
            }
        }
    },
    created() {
        this.$store.dispatch('subjectStore/getSubjectTypes', this.$url + 'subjectGroup/selectAll');     //获取所有科目类别
        this.$store.dispatch('subjectStore/getAllUnitType', this.$url + 'currency/findCurrency');       //获取所有外币核算
        this.$store.dispatch('subjectStore/getSearchData', this.$url + 'subjectGroup/likeName');            //获取拼音搜索的总数据
    }
}
</script>

<style>
    .accountSubject .el-table__body-wrapper {height: calc(100% - 41px) !important;overflow-y: auto !important;}
    .accountSubject .block-area .table .el-table td:nth-of-type(3),
    .accountSubject .block-area .table .el-table td:nth-of-type(4),
    .block-area .table .el-table th:nth-of-type(3), .block-area .table .el-table th:nth-of-type(4) {
        text-align: left !important;
    }
</style>
<style scoped>
    .accountSubject {height: 100%;overflow: hidden;}
    .tree-right {
        height: 100%;
        width: calc(100% - 215px);
        overflow: hidden;
        float: right;
        border-radius: 6px !important;
    }
    .tree-right .block-area {min-width: 1000px;overflow-x: auto;}
    .tree-right .block-area:nth-of-type(1) {height: auto !important;}
    .tree-right .block-area:nth-of-type(2) {height: calc(100% - 45px) !important;}
</style>

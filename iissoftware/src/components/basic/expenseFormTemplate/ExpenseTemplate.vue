<template>
    <div>
        <div class="expenseTemplate">
            <div class="block-area">
                <div class="btn-box">
                    <el-input v-model="searchText" class="sousuo-input" placeholder="输入搜索内容" @keyup.enter.native="search"></el-input>
                    <el-button type="primary" class="sousuo" @click.native="search">查询</el-button>
                    <div class="btn-group">
                        <el-button type="info" @click="refreshRow">刷新</el-button>
                        <el-button type="primary" @click="addRow">新增</el-button>
                        <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                        <el-button class="orange" v-else @click="deleteRow">删除</el-button>
                        <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                        <el-button type="danger" v-else @click="disabedBtn(0, '禁用')">禁用</el-button>
                        <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                        <el-button type="success" v-else @click="disabedBtn(1, '启用')">启用</el-button>
                        <el-button-group class="btn-other">
                            <el-button title="导出" @click="exportExcel">
                                <img src="../../../assets/images/export.png" alt="">
                            </el-button>
                            <el-button title="导入">
                                <el-upload class="upload-demo" :action="$url" :show-file-list="false" multiple style="display: inline-block;">
                                    <img src="../../../assets/images/import.png" alt="">
                                </el-upload>
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
                <!-- 表格数据 -->
                <div class="table">
                    <el-table :data="tableData" border @selection-change="handleSelectionChange" class="tb-edit" highlight-current-row> 
                        <el-table-column type="selection" min-width="55" fixed></el-table-column>
                        <el-table-column property="type" label="费用报销类别"></el-table-column>
                        <el-table-column property="subjectLevelOneName" label="一级科目"></el-table-column>
                        <el-table-column property="subjectLevelTwoName" label="二级科目"></el-table-column>
                        <el-table-column property="subjectLevelThreeName" label="三级科目"></el-table-column>
                        <el-table-column property="subjectLevelFourName" label="四级科目"></el-table-column>
                        <el-table-column property="remark" label="备注"></el-table-column>
                        <el-table-column property="state" label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state == 1" style="color: green;">已启用</span>
                                <span v-if="scope.row.state == 0" style="color: #f00;">已禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="lookRow(scope.row)">查看</el-button>
                                <el-button type="text" size="small" @click="updateRow(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchText:'', //搜索的内容
            tableData:this.$store.state.expenseFormTemplateStore.tableData,  //表格数据
            multipleSelection:[],
            selectRowId:[],
            systemId:this.$store.state.systemId, //系统参数id
            searchAllResult:this.$store.state.expenseFormTemplateStore.searchAllResult,  //表格数据
        }
    },
    watch:{
        //监听搜索框内容
        searchText(newVal) {
            if(!newVal) {
                this.tableData = this.$store.state.expenseFormTemplateStore.tableData;
            }
        },
    },
    methods:{
        refreshRow(){                                   //刷新
            this.$store.dispatch('expenseFormTemplateStore/getTableData', this.$url + "expenseAccountCategory/selectObject");//获取表格数据
        },
        handleSelectionChange(row){                     //表格勾选
            this.multipleSelection = row;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        addRow(){                                       //新增
            this.$util.openSubLayerIframe('费用报销类别审批单', 10, '60%', '70%', this.$domain + '/#/expenseFormTemplate/add');
        },
        lookRow(row){                                   //查看
            this.$store.commit('expenseFormTemplateStore/updateRowId', row['id']);
            this.$util.openSubLayerIframe('费用报销类别审批单', 10, '60%', '70%', this.$domain + '/#/expenseFormTemplate/look');
        },
        updateRow(row){                                 //修改
            this.$store.commit('expenseFormTemplateStore/updateRowId', row['id']);
            this.$util.openSubLayerIframe('费用报销类别审批单', 10, '60%', '70%', this.$domain + '/#/expenseFormTemplate/update');
        },
        exportExcel() {                                 //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'expenseAccountCategory/export',{params: { list: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'expenseAccountCategory/export?list=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 2000});
            }
        },
        disabedBtn(status, msg) {                       //禁用、启用
            if(this.multipleSelection.length > 0) {
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(status == 0) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == status) {
                            this.$alert('禁用失败，其中包含已禁用选项，重新选择！', '禁用提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                } else if(status == 1) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == status) {
                            this.$alert('启动失败，其中包含已启动选项，重新选择！', '启动提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                }
                this.$http.post(this.$url + 'expenseAccountCategory/enable?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.$store.dispatch('expenseFormTemplateStore/getTableData', this.$url + "expenseAccountCategory/selectObject");//获取表格数据
                        }, 500);
                    } else {
                        // this.$message.error(this.data.msg);
                    }
                });
                
            } else {
                this.$message({message: '选择你要'+ msg +'的数据', type: 'warning'});
            }
        },
        deleteRow(){                                    //删除
            if(this.multipleSelection.length > 0) {
                this.$confirm('确定删除该条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var type = {
                        headers: {
                            'Content-type': 'application/json;charset=UTF-8'
                        }
                    }
                    this.$http.post(this.$url + 'expenseAccountCategory/deleteById', JSON.stringify(this.selectRowId), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '删除成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                               this.$store.dispatch('expenseFormTemplateStore/getTableData', this.$url + "expenseAccountCategory/selectObject");//获取表格数据
                            }, 500);
                        } else {
                            // this.$message.error(res.data.msg);
                        }
                    });
                })
            } else {
                this.$message({message: '请先选择你要删除的数据', type: 'warning'});
            }
        },
        search(){                               //搜索
            if(this.searchText) {
                let newArr = [],
                    data = this.searchAllResult,
                    searchText = this.searchText;
                let reg = new RegExp(this.searchText, "g");
                data.forEach(item => {
                    if((reg.test(item['type'])) || (reg.test(item['subjectLevelOneName'])) || (reg.test(item['subjectLevelTwoName'])) || (reg.test(item['subjectLevelThreeName'])) || (reg.test(item['subjectLevelFourName'])) || (reg.test(item['remark']) || item['toPinLevelFourName'] && reg.test(item['toPinLevelFourName'])) || (item['toPinLevelOneName'] && reg.test(item['toPinLevelOneName'])) || (item['toPinLevelThreeName'] && reg.test(item['toPinLevelThreeName'])) || (item['toPinLevelTwoName'] && reg.test(item['toPinLevelTwoName'])) || (item['toPinTypeName'] && reg.test(item['toPinTypeName']))) {
                        newArr.push(item);
                    }
                });
                this.tableData = newArr;
            }
        },
    },
    mounted(){
        this.$store.dispatch('expenseFormTemplateStore/getTableData', this.$url + "expenseAccountCategory/selectObject");//获取表格数据
        this.$store.dispatch('expenseFormTemplateStore/getFormData', this.$url + "expenseAccountCategory/view");//获取新增页面数据
    }
}
</script>

<style lang='less'>
    .expenseTemplate{
        .tb-edit .el-input {
            display: none
        }
        .tb-edit .current-row .el-input {
            display: block
        }
        .tb-edit .current-row .el-input+span {
            display: none
        }
    }
</style>
<style lang="less" scoped>
    .expenseTemplate {
        height: 100%;
        overflow: hidden;
        min-width: 880px;
    }
    @media screen and (max-width: 1250px) {
        .expenseTemplate .block-area:nth-of-type(1) {
            overflow-x: auto;
            white-space: nowrap;
        }
        .expenseTemplate .block-area:nth-of-type(1) .el-select,
        .expenseTemplate .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
        }
        .expenseTemplate .block-area:nth-of-type(1) .btn-group {
            margin-right: 0;
            float: right;
        }
    }
</style>


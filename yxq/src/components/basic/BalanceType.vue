<template>
    <div>
        <div id="balanceType" class="dragBox">
            <div class="top">
                <!-- 搜索 -->
                <span class="searchText">搜索内容：</span>
                <el-input v-model.trim="searchText" placeholder="请输入搜索内容" style="width: 180px;margin: 0 10px;height: 36px;line-height: 36px;" @keyup.native.enter="search"></el-input>
                <el-button type="primary" @click="search">查询</el-button>
            </div>
            <div class="top table-main">
                <el-select v-model="sortType" placeholder="排序方式" style="width: 160px;" @change="sortTableData">
                    <el-option label="正序" value="0"></el-option>
                    <el-option label="倒叙" value="1"></el-option>
                </el-select>
                <div class="btn-group">
                    <el-button type="info" @click="refresh">刷新</el-button>
                    <el-button type="primary" @click="addRow">新增</el-button>
                    <el-button type="danger" @click="disabedBtn(0, '禁用')">禁用</el-button>
                    <el-button type="success" @click="disabedBtn(1, '启用')">启用</el-button>
                    <el-upload class="upload-demo" :action="$url + 'closeAccount/importCloseAccount'" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
                        <el-button type="primary" style="font-size: 14px;margin: 0 10px;">导入</el-button>
                    </el-upload>
                    <el-button type="success" @click="exportExcel">导出</el-button>
                    <el-button type="info" @click="printTableData">打印</el-button>
                    <el-button type="danger" @click="deleteMoreRow">删除</el-button>
                    <el-button type="warning">帮助</el-button>
                </div>
                <!-- 表格数据 -->
                <div class="table">
                    <el-table :data="balanceTypeData" v-loading="loading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column type="index" label="编号" width="50"></el-table-column>
                        <el-table-column property="name" label="名称"></el-table-column>
                        <el-table-column property="remark" label="备注"></el-table-column>
                        <el-table-column property="lock" label="是否可用">
                            <template slot-scope="scope">
                                <el-checkbox :checked="scope.row.lock == 1 ? true : false"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column property="state" label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state === 1" style="color: green;">已启用</span>
                                <span v-else style="color: #f00;">已禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="updateRow(scope.row.id)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 新增行区域 -->
        <div class="addRowBlock oparatorLayer" v-if="isShowAddRow">
            <el-form label-width="20%" :model="addRowFormData" ref="addRowForm" status-icon :rules="AddFormRules">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="addRowFormData.name"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input v-model="addRowFormData.remark"></el-input>
                </el-form-item>
                <el-form-item label="是否可用：" prop="lock">
                    <el-checkbox v-model="addRowFormData.lock" :checked="addRowFormData.lock == 1 ? true : false"></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addRowSave('addRowForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 修改行区域 -->
        <div class="updateRowBlock oparatorLayer" v-if="isShowUpdateRow">
            <el-form label-width="20%" :model="addRowFormData" ref="updateRowForm" status-icon :rules="updateFormRules">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="addRowFormData.name"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input v-model="addRowFormData.remark"></el-input>
                </el-form-item>
                <el-form-item label="是否可用：" prop="lock">
                    <el-checkbox v-model="addRowFormData.lock"></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateRowSave('updateRowForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        var validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入名称'));
            }
            callback();
        }
        var validateRemark = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入备注'));
            }
            callback();
        }
        var validateUName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入名称'));
            }
            callback();
        }
        var validateURemark = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入备注'));
            }
            callback();
        }
        return {
            searchText: '',     //搜索内容
            sortType: '',       //排序
            loading: true,      //加载图标
            isShowAddRow: false,        //是否显示新增页面
            isShowUpdateRow: false,     //是否显示修改页面
            selectRowId: [],            //存储选中多条数据时的id
            multipleSelection: [],      //存储选中的数据
            balanceTypeData: [],         //结算数据列表],        
            addRowFormData: {           //新增数据
                name: '',       //名称
                remark: '',     //备注
                lock: 1         //是否可用 1：可用 0：不可用
            },
            updateRowFormData: {           //新增数据
                name: '',       //名称
                remark: '',     //备注
                lock: 1         //是否可用 1：可用 0：不可用
            },
            AddFormRules: {
                name: [{validator: validateName, trigger: 'blur'}],
                remark: [{validator: validateRemark, trigger: 'blur'}]
            },
            updateFormRules: {
                name: [{validator: validateUName, trigger: 'blur'}],
                remark: [{validator: validateURemark, trigger: 'blur'}]
            }
        }
    },
    methods: {
        getData() {         //获取数据
            this.loading = true;
            this.$http.get(this.$url + 'closeAccount/findCloseAccount').then(res => {
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.loading = false;
                        for(var i = 0; i < res.data.data.length; i++) {
                            res.data.data[i]['lock'] = Boolean(res.data.data[i]['lock']);
                        }
                        this.balanceTypeData = res.data.data.reverse();
                        console.log(this.balanceTypeData)
                    }, 500);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        handleSelectionChange(val) {            //选中数据时触发
            this.multipleSelection = val;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        search() {          //查询

        },
        sortTableData() {       //排序方式
            this.balanceTypeData = this.balanceTypeData.reverse();
        },
        refresh() {     //刷新
            this.getData();
        },
        addRow() {      //新增
            this.isShowAddRow = true;
            var that = this;
            setTimeout(() => {
                layer.open({
                    type: 1,
                    title: '结算-新增',
                    shade: 0.3,
                    shadeClose: false,
                    zIndex: 13,
                    maxmin: true,
                    anim: 5,
                    area: ['25%', 'auto'],
                    content: $('.addRowBlock'),
                    end: function() {
                        that.isShowAddRow = false;
                        that.$refs['addRowForm'].resetFields();
                    }
                })
            }, 30);
        },
        addRowSave(formName) {      //新增保存
            this.sendHttp(this.$url + "closeAccount/insertCloseAccount", formName, '新增成功');
        },
        sendHttp($url, $formName, $msg, $id) {            //新增、修改共有的步骤。status = 1 新增 status = 0 修改
            this.$refs[$formName].validate((valid) => {
                if (valid) {
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    var data = {        //重新组装数据
                        name: this.addRowFormData['name'],
                        remark: this.addRowFormData['remark'],
                        lock: this.addRowFormData['lock'] ? 1 : 0
                    }
                    $id ? data['id'] = $id : delete data['id'];         //如果$id存在，是修改，加入到data对象，否则新增，移除id属性
                    // console.log(data);
                    this.$http({
                        method: "post",
                        url: $url,
                        params: data
                    }).then(res => {
                        if(res.data.code === 20001) {
                            this.$message({message: $msg, type: 'success'});
                            setTimeout(() => {
                                layer.close(layer.index);
                                setTimeout(() => {
                                    this.getData();
                                    this.addRowFormData = {};       //清空addRowFormData对象数据
                                }, 500)
                            }, 1000);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                }
            });
        },
        disabedBtn(status, msg) {      //启用、禁用
            if(this.multipleSelection.length > 0) {
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(status == 0) {       //禁用
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == status) {
                            this.$alert('禁用失败，其中包含已禁用选项，请重新选择！', '禁用提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                } else if(status == 1) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == status) {
                            this.$alert('启动失败，其中包含已启动选项，请重新选择！', '启动提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                }
                this.$http.post(this.$url + '/closeAccount/startOrDisableCurrency?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.getData();
                        }, 1000);
                    } else {
                        this.$message.error(this.data.msg);
                    }
                }).catch(err => {
                    this.$message.error(err);
                });
            } else {
                this.$message({message: '请选择你要'+ msg +'的数据', type: 'warning'});
            }
        },
        importExcelSuccess(res) {      //导入成功后回调
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success'});
                setTimeout(() => {
                    this.getData();
                }, 1000);
            }
        },
        exportExcel($id) {         //导出excel
            if(this.multipleSelection.length > 0) {
                var idSting = $id || this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'closeAccount/exportCloseAccount',{params: { idList: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'closeAccount/exportCloseAccount?idList=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '请选择你要导出的数据', type: 'warning', duration: 2000});
            }
        },
        printTableData() {          //打印

        },
        deleteMoreRow() {       //批量删除
            if(this.multipleSelection.length > 0) {
                this.$confirm('此操作将永久删除该文件, 是否继续？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var arr = [];       //存储要删除的数据行id
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == 1) {      //如果删除的数据包含有state = 1的启用项，则不能删除
                            this.$alert('删除失败，其中包含已启用选项，请重新选择！', '删除提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        } else {
                            arr.push(this.multipleSelection[i]['id']);
                        }
                    }
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    //开始请求删除
                    this.$http.post(this.$url + 'closeAccount/deleteCloseAccount', JSON.stringify(arr), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.getData();
                            }, 800);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                });
            } else {
                this.$message({message: '请选择你要删除的数据', type: 'warning'});
                return false;
            }
        },
        search() {              //搜索
            if(this.searchText) {
                this.$http.get(this.$url + 'closeAccount/findCloseAccount?name=' + this.searchText).then(res => {
                    this.loading = true;
                    if(res.data.code == 20001) {
                        setTimeout(() => {
                            this.balanceTypeData = res.data.data;
                            this.loading = false;
                        }, 500)
                    } else {
                        setTimeout(() => {
                            this.balanceTypeData = [];
                            this.loading = false;
                        }, 500)
                    }
                })
            } else {
                this.$message({message: '请输入搜索的内容', type: 'warning'});
            }
        },
        updateRow(id) {        //修改
            this.isShowUpdateRow = true;
            var that = this;
            that.$http.get(that.$url + 'closeAccount/findCloseAccountById?id=' + id).then(res => {      //修改时，弹窗打开后请求数据
                if(res.data.code == 20001) {
                    res.data.data['lock'] = Boolean(res.data.data['lock']);
                    that.addRowFormData = res.data.data;
                } else {
                    that.$message({message: res.data.msg, type: 'error'});
                }
            }).catch(err => {
                that.$message.error(err);
            })
            setTimeout(() => {
                layer.open({
                    type: 1,
                    title: '结算-修改',
                    shade: 0.3,
                    shadeClose: false,
                    zIndex: 13,
                    maxmin: true,
                    anim: 5,
                    area: ['40%', 'auto'],
                    content: $('.updateRowBlock'),
                    end: function() {
                        that.isShowUpdateRow = false;
                        that.$refs['updateRowForm'].resetFields();
                    }
                })
            }, 30);
        },
        updateRowSave(formName) {           //修改保存
            this.sendHttp(this.$url + "closeAccount/updateCloseAccount", formName, '修改成功', this.addRowFormData['id']);
        }
    },
    mounted() {
        this.getData();
    }
}
</script>


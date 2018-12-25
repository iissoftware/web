<template>
    <div>
        <div id="moneyType" class="dragBox">
            <div class="top">
                <!-- 搜索 -->
                <span class="searchText">搜索内容：</span>
                <el-input v-model.trim="searchText" placeholder="请输入搜索内容" style="width: 180px;margin: 0 10px;height: 36px;line-height: 36px;" @keyup.native.enter="search"></el-input>
                <el-button type="primary" @click="search">查询</el-button>
            </div>
            <div class="top table-main">
                <el-select v-model="sortType" placeholder="请选择排序" style="width: 160px;" @change="sortTableData">
                    <el-option label="正序" value="0"></el-option>
                    <el-option label="倒叙" value="1"></el-option>
                </el-select>
                <div class="btn-group">
                    <el-button type="info" @click="refresh">刷新</el-button>
                    <el-button type="primary" @click="addRow">新增</el-button>
                    <el-button type="danger" @click="disabedBtn(0, '禁用')">禁用</el-button>
                    <el-button type="success" @click="disabedBtn(1, '启用')">启用</el-button>
                    <el-upload class="upload-demo" :action="$url + 'currency/importCurrency'" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
                        <el-button type="primary" style="font-size: 14px;margin: 0 10px;">导入</el-button>
                    </el-upload>
                    <el-button type="success" @click="exportExcel">导出</el-button>
                    <el-button type="info" @click="printTableData">打印</el-button>
                    <el-button type="danger" @click="deleteMoreRow">删除</el-button>
                    <el-button type="warning">帮助</el-button>
                </div>
                <!-- 表格数据 -->
                <div class="table">
                    <el-table :data="moneyTypeData" v-loading="loading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column type="index" label="编码" width="50"></el-table-column>
                        <el-table-column property="name" label="名称" width="150"></el-table-column>
                        <el-table-column property="exchangeRate" label="汇率" width="80"></el-table-column>
                        <el-table-column property="convertType" label="折算方式" width="200">
                            <template slot-scope="scope">
                                <span>{{ scope.row.convertType == 1 ? "原币*汇率=本位币" : "原币/汇率=本位币" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="decimals" label="小数位数" width="80"></el-table-column>
                        <el-table-column property="fixedExchangeRate" label="汇率类别">
                            <template slot-scope="scope">
                                <span>{{ scope.row.fixedExchangeRate == 1 ? "固定汇率" : "浮动汇率" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="lock" label="是否可用" width="80">
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
                                <el-button type="text" size="small" @click="updateRow(scope.row)">修改</el-button>
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
                <el-form-item label="汇率：" prop="exchangeRate">
                    <el-input v-model="addRowFormData.exchangeRate"></el-input>
                </el-form-item>
                <el-form-item label="折算方式：" prop="convertType">
                    <el-select v-model="addRowFormData.convertType" placeholder="请选择折算方式">
                        <el-option label="原币*汇率=本位币" value="1"></el-option>
                        <el-option label="原币/汇率=本位币" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小数位：" prop="decimals">
                    <el-input v-model.number="addRowFormData.decimals"></el-input>
                </el-form-item>
                <el-form-item label="汇率类别：" prop="fixedExchangeRate">
                    <el-select v-model="addRowFormData.fixedExchangeRate" placeholder="请选择汇率类别">
                        <el-option label="固定汇率" value="1"></el-option>
                        <el-option label="浮动汇率" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可用：">
                    <el-checkbox v-model="addRowFormData.lock"></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addRowSave('addRowForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 修改行区域 -->
        <div class="updateRowBlock oparatorLayer" v-if="isShowUpdateRow">
            <el-form label-width="20%" :model="updateRowFormData" ref="updateRowForm" status-icon :rules="updateFormRules">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="updateRowFormData.name"></el-input>
                </el-form-item>
                <el-form-item label="汇率：" prop="exchangeRate">
                    <el-input v-model="updateRowFormData.exchangeRate"></el-input>
                </el-form-item>
                <el-form-item label="折算方式：" prop="convertType">
                    <el-select v-model="updateRowFormData.convertType" placeholder="请选择折算方式">
                        <el-option label="原币*汇率=本位币" value="1"></el-option>
                        <el-option label="原币/汇率=本位币" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小数位：" prop="decimals">
                    <el-input v-model.number="updateRowFormData.decimals"></el-input>
                </el-form-item>
                <el-form-item label="汇率类别：" prop="fixedExchangeRate">
                    <el-select v-model="updateRowFormData.fixedExchangeRate" placeholder="请选择汇率类别">
                        <el-option label="固定汇率" value="1"></el-option>
                        <el-option label="浮动汇率" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可用：">
                    <el-checkbox v-model="updateRowFormData.lock"></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateRowSave('updateRowForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 要打印的表格数据区域 -->
        <div class="printDataBlock" id="printDataBlock" v-if="isShowPrintBlock" style="width: 1000px;">
            <el-table :data="printData" class="printTable">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" label="编码" width="80"></el-table-column>
                <el-table-column property="name" label="名称"></el-table-column>
                <el-table-column property="exchangeRate" label="汇率"></el-table-column>
                <el-table-column property="convertType" label="折算方式" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.convertType == 1 ? "原币*汇率=本位币" : "原币/汇率=本位币" }}</span>
                    </template>
                </el-table-column>
                <el-table-column property="decimals" label="小数位数"></el-table-column>
                <el-table-column property="fixedExchangeRate" label="汇率类别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.fixedExchangeRate == 1 ? "固定汇率" : "浮动汇率" }}</span>
                    </template>
                </el-table-column>
                <el-table-column property="lock" label="是否可用"></el-table-column>
                <el-table-column property="state" label="状态"></el-table-column>
            </el-table>
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
        var validateExchangeRate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入汇率'));
            }
            callback();
        }
        var validateConvertType = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择折算方式'));
            }
            callback();
        }
        var validateDecimals = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入小位数'));
            } else if(/[^1-9]/g.test(value)) {
                return callback(new Error('输入只能是数值类型'));
            }
            callback();
        }
        var validateFixExRate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择汇率类别'));
            }
            callback();
        }
        // 修改页面验证
        var validateUName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入名称'));
            }
            callback();
        }
        var validateUExchangeRate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入汇率'));
            }
            callback();
        }
        var validateUConvertType = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择折算方式'));
            }
            callback();
        }
        var validateUDecimals = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入小位数'));
            } else if(/[^1-9]/g.test(value)) {
                return callback(new Error('输入只能是数值类型'));
            }
            callback();
        }
        var validateUFixExRate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择汇率类别'));
            }
            callback();
        }
        return {
            moneyTypeData: [            //币别表格数据
                {
                    name: '',       //名称
                    exchangeRate: '',           //汇率
                    convertType: '',        //折算方式
                    decimals: '',           //小数位数
                    fixedExchangeRate: '',      //汇率类别
                    lock: '',           //是否可用
                    state: ''           //状态 1: 已启用 0: 已禁用
                }
            ],
            sortType: '',           //排序
            searchText: '',         //搜索内容
            loading: true,         //加载提示
            isShowAddRow: false,     //是否显示新增行页面
            isShowUpdateRow: false,     //是否显示修改行页面
            isShowPrintBlock: false,
            multipleSelection: [],          //选中多行
            selectRowId: [],    //存储选中当前行的id
            printData: [],          //要打印的数据
            addRowFormData: {           //存储新增行数据
                name: '',
                exchangeRate: '',
                convertType: '',        //折算方式 1: 原币*汇率=本位币 0: 原币/汇率=本位币
                decimals: '',
                fixedExchangeRate: '',      //汇率类别 1: 固定汇率 0: 浮动汇率
                lock: true
            },
            updateRowFormData: {},        //存储修改行数据,
            AddFormRules: {         //新增数据验证
                name: [{validator: validateName, trigger: 'blur'}],
                exchangeRate: [{validator: validateExchangeRate, trigger: 'blur'}],
                convertType: [{validator: validateConvertType, trigger: 'change'}],
                decimals: [{validator: validateDecimals, trigger: 'blur'}],
                fixedExchangeRate: [{validator: validateFixExRate, trigger: 'change'}],
            },
            updateFormRules: {
                name: [{validator: validateUName, trigger: 'blur'}],
                exchangeRate: [{validator: validateUExchangeRate, trigger: 'blur'}],
                convertType: [{validator: validateUConvertType, trigger: 'change'}],
                decimals: [{validator: validateUDecimals, trigger: 'blur'}],
                fixedExchangeRate: [{validator: validateUFixExRate, trigger: 'change'}],
            }
        }
    },
    methods: {
        sortTableData() {           //选择排序
            this.moneyTypeData = this.moneyTypeData.reverse();
        },
        getData() {         //获取表格数据
            this.loading = true;
            this.$http.get(this.$url + 'currency/findCurrency').then(res => {
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.loading = false;
                        this.moneyTypeData = res.data.data.reverse();
                    }, 500);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        refresh() {         //刷新
            this.getData();
        },
        importExcelSuccess(res) {          //导入成功后回调该函数
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success'});
                setTimeout(() => {
                    this.getData();
                }, 1000);
            }
        },
        exportExcel() {             //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'currency/exportCurrency',{params: { idList: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'currency/exportCurrency?idList=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '请选择你要导出的数据', type: 'warning', duration: 2000});
            }
        },
        printTableData() {          //打印表格数据
            if(this.multipleSelection.length > 0) {
                this.isShowPrintBlock = true;
                this.printData = this.multipleSelection;
                setTimeout(() => {
                    // window.print();
                    this.isShowPrintBlock = false;
                    Print('#printDataBlock');
                }, 20);

            } else {
                this.$message({message: '请选择你要打印的数据', type: 'warning', duration: 2000});
            }
        },
        addRow() {              //新增行数据
            this.isShowAddRow = true;
            var that = this;
            setTimeout(() => {
                layer.open({
                    type: 1,
                    title: '币别-新增',
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
        addRowSave(formName) {          //添加行保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    var data = {        //重新组装数据
                        name: this.addRowFormData['name'],
                        exchangeRate: this.addRowFormData['exchangeRate'],
                        convertType: this.addRowFormData['convertType'],
                        decimals: this.addRowFormData['decimals'],
                        fixedExchangeRate: this.addRowFormData['fixedExchangeRate'],
                        lock: this.addRowFormData['lock'] ? 1 : 0
                    }
                    this.$http({
                        method: "post",
                        url: this.$url + "/currency/insertCurrency",
                        params: data
                    }).then(res => {
                        if(res.data.code === 20001) {
                            this.$message({message: '添加成功', type: 'success'});
                            setTimeout(() => {
                                layer.close(layer.index);
                                setTimeout(() => {
                                    this.getData();
                                }, 500)
                            }, 1000);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                } else {
                    return false;
                }
            });
        },
        deleteMoreRow() {           //删除选中的行
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
                    this.$http.post(this.$url + 'currency/deleteCurrency', JSON.stringify(arr), type).then(res => {
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
        disabedBtn(status, msg) {          //禁用 启用
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
                this.$http.post(this.$url + 'currency/startOrDisableCurrency?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
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
        handleSelectionChange(val) {               //选中当前行触发该函数
            this.multipleSelection = val;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        updateRow(obj) {       //修改当前行
            this.isShowUpdateRow = true;
            var that = this;
            localStorage.setItem('updateRowData', JSON.stringify(obj));
            var updateRowData = JSON.parse(localStorage.getItem('updateRowData'));
            that.updateRowFormData = updateRowData;
            setTimeout(() => {
                layer.open({
                    type: 1,
                    title: '币别-修改',
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
                        localStorage.removeItem('updateRowData');
                    }
                });
            }, 30);
        },
        updateRowSave(formName) {           //修改保存当前行
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    delete this.updateRowFormData.updateTime;
                    delete this.updateRowFormData.createTime;
                    this.$http({
                        method: "post",
                        url: this.$url + "currency/updateCurrency",
                        params: this.updateRowFormData,
                        dataType: 'json'
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '数据修改成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                layer.close(layer.index);
                                setTimeout(() => {
                                    this.getData();
                                }, 500)
                            }, 1000)
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    return false;
                }
            })
        },
        search() {      //查询
            if(this.searchText) {
                this.$http.get(this.$url + 'currency/findCurrency?name=' + this.searchText).then(res => {
                    this.loading = true;
                    if(res.data.code == 20001) {
                        setTimeout(() => {
                            this.moneyTypeData = res.data.data;
                            this.loading = false;
                        }, 500)
                    } else {
                        setTimeout(() => {
                            this.moneyTypeData = [];
                            this.loading = false;
                        }, 500)
                    }
                })
            } else {
                this.$message({message: '请输入搜索的内容', type: 'warning'});
            }
        }
    },
    mounted() {
        this.getData();
        localStorage.removeItem('updateRowData');
    }
}
</script>
<style>
    #moneyType .el-table th {background-color: rgb(244, 244, 244);}
</style>
<style scoped lang="less">
    #moneyType {overflow: hidden;}
</style>
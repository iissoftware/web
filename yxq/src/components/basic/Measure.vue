<template>
<div>
    <div id="measure" class="dragBox">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单位组" name="first">
                <div class="top">
                    <!-- 搜索 -->
                    <span>搜索内容：</span>
                    <el-input v-model="searchText" placeholder="请输入搜索内容" style="width: 200px;margin: 0 10px;height: 36px;line-height: 36px;"></el-input>
                    <el-button type="primary">查询</el-button>
                </div>
                <div class="top table-main">
                    <el-select v-model="sortType" placeholder="请选择排序" style="width: 160px;">
                        <el-option label="正序" value="0"></el-option>
                        <el-option label="倒叙" value="1"></el-option>
                    </el-select>
                    <div class="btn-group">
                        <el-button type="info" @click="refreshone">刷新</el-button>
                        <el-button type="primary" @click="addMeasureOne">新增</el-button>
                        <el-button type="danger" @click="deleteMeasureOne">删除</el-button>
                        <el-button type="danger" @click="disabedBtn">禁用</el-button>
                        <el-button type="success" @click="useBtn">启用</el-button>
                        <el-button type="info">打印</el-button>
                        <el-upload class="upload-demo" :action="$url + 'measureUnit/importGroup'" :show-file-list="false" multiple style="display: inline-block;">
                            <el-button type="primary" style="font-size: 14px;margin: 0 10px;">导入</el-button>
                        </el-upload>
                        <el-button type="success">导出</el-button>
                        <el-button type="warning">帮助</el-button>
                    </div>
                    <!-- 单位组数据表格 -->
                    <div class="table">
                        <el-table :data="unitData" v-loading="loading" @selection-change="handleSelectionChange">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column type="index" label="组号"></el-table-column>
                            <el-table-column property="unitName" label="名称"></el-table-column>
                            <el-table-column property="unitType" label="单位类别"></el-table-column>
                            <el-table-column property="state" label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.state === 1" style="color: green;">已启用</span>
                                    <span v-else style="color: #f00;">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="operation" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="计量单位" name="second">
                <div class="top">
                    <!-- 搜索 -->
                    <span>搜索内容：</span>
                    <el-input v-model="searchText" placeholder="请输入搜索内容" style="width: 200px;margin: 0 10px;height: 36px;line-height: 36px;"></el-input>
                    <el-button type="primary">查询</el-button>
                </div>
                <div class="top table-main">
                    <el-select v-model="sortType" placeholder="请选择排序" style="width: 160px;">
                        <el-option label="正序" value="0"></el-option>
                        <el-option label="倒叙" value="1"></el-option>
                    </el-select>
                    <div class="btn-group">
                        <el-button type="info">刷新</el-button>
                        <el-button type="primary">新增</el-button>
                        <el-button type="danger">删除</el-button>
                        <el-button type="danger">禁用</el-button>
                        <el-button type="success">启用</el-button>
                        <el-button type="info">打印</el-button>
                        <el-upload class="upload-demo" :action="$url + 'openrationLog/importExcel'" :show-file-list="false" multiple style="display: inline-block;">
                            <el-button type="primary" style="font-size: 14px;margin: 0 10px;">导入</el-button>
                        </el-upload>
                        <el-button type="success">导出</el-button>
                        <el-button type="warning">帮助</el-button>
                    </div>
                    <!-- 计量单位数据表格 -->
                    <div class="table">
                        <el-table :data="measureUnitData" v-loading="loading" @selection-change="handleSelectionChange">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column type="index" label="代码"></el-table-column>
                            <el-table-column property="category" label="类别"></el-table-column>
                            <el-table-column property="useUnit" label="使用单位"></el-table-column>
                            <el-table-column property="purchaseSalesUnit" label="采购销售单位" width="150"></el-table-column>
                            <el-table-column property="unitStorage" label="入库单位"></el-table-column>
                            <el-table-column property="available" label="是否可用"></el-table-column>
                            <el-table-column property="state" label="状态"></el-table-column>
                            <el-table-column property="operation" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 单位组新增弹窗 -->
    <div class="addRowMeasureOne oparatorLayer" v-if="isShowAddRow">
    <el-form label-width="20%" :model="addRowMeasureOneData" ref="addRowMeasureOneForm" status-icon :rules="addMeasureOneFormRules">
        <el-form-item label="名称：" prop="unitName">
            <el-input v-model="addRowMeasureOneData.unitName"></el-input>
        </el-form-item>
        <el-form-item label="单位类别：" prop="unitType">
            <el-input v-model="addRowMeasureOneData.unitType"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addRowSave('addRowMeasureOneForm')">保存</el-button>
        </el-form-item>
    </el-form>
</div>
</div>
</template>
<script>
export default {
    data() {
        var validateUnitName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入单位名称'));
            }
            callback();
        }
        var validateUnitType = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入单位类别'));
            }
            callback();
        }
      return {
        activeName: 'first',       //显示第一个tabs
        loading: false,       //是否显示加载中
        sortType: '',        //排序类型
        multipleSelection: [],      //存储多选数据
        searchText: '',         //搜索的内容
        isShowAddRow: false,     //是否显示单位组新增行页面
        unitData: [          //单位组数据
        ],
        addRowMeasureOneData: {           //存储单位组新增行数据
            unitName: '',
            unitType: ''
        },
        addMeasureOneFormRules: {         //单位组新增数据验证
            unitName: [{validator: validateUnitName, trigger: 'blur'}],
            unitType: [{validator: validateUnitType, trigger: 'blur'}]
        },
        measureUnitData: [         //计量单位数据
        ]
      };
    },
    methods: {
        handleClick(tab, event) {         //切换tabs
            console.log(tab, event);
        },
        handleSelectionChange(val) {           //选中当前选中的行
            this.multipleSelection = val;
        },
        getDataOne() {         //获取单位组表格数据
            this.loading = true;
            this.$http.get(this.$url + 'measureUnit/selectGroup').then(res => {
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.loading = false;
                        this.unitData = res.data.data.reverse();
                    }, 500);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        refreshone(){        //单位组刷新
            this.getDataOne();
        },
        addMeasureOne(){      //单位组新增
            this.isShowAddRow = true;
            var that = this;
            setTimeout(() => {
                layer.open({
                    type: 1,
                    title: '单位组-新增',
                    shade: 0.3,
                    shadeClose: false,
                    zIndex: 13,
                    maxmin: true,
                    anim: 5,
                    area: ['40%', 'auto'],
                    content: $('.addRowMeasureOne'),
                    end: function() {
                        that.isShowAddRow = false;
                        that.$refs['addRowMeasureOneForm'].resetFields();
                    }
                })
            }, 30);
        },
        addRowSave(formName) {          //单位组添加行保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    var data = {        //重新组装数据
                        unitName: this.addRowMeasureOneData['unitName'],
                        unitType: this.addRowMeasureOneData['unitType']
                    }
                    this.$http({
                        method: "post",
                        url: this.$url + "measureUnit/insertGroup",
                        params: data
                    }).then(res => {
                        if(res.data.code === 20001) {
                            this.$message({message: '添加成功', type: 'success'});
                            setTimeout(() => {
                                layer.close(layer.index);
                                setTimeout(() => {
                                    this.getDataOne();
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
        deleteMeasureOne() {           //删除单位组选中的行
            if(this.multipleSelection.length > 0) {
                this.$confirm('此操作将永久删除该文件, 是否继续？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var id = [];       //存储要删除的数据行id
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == 1) {      //如果删除的数据包含有state = 1的启用项，则不能删除
                            this.$alert('删除失败，其中包含已启用选项，请重新选择！', '删除提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        } else {
                            id.push(this.multipleSelection[i]['id']);
                        }
                    }
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    //开始请求删除
                    this.$http.delete(this.$url + 'measureUnit/deleteGroup', {data: id}).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.getData();
                            }, 800);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                });
            } else {
                this.$message({message: '请选择你要删除的数据', type: 'warning'});
                return false;
            }
        }
    },
    mounted(){
        this.getDataOne();
    }
}
</script>
<style>
    #measure .el-table th {background-color: rgb(244, 244, 244);}
    #measure .el-input__inner {height: 36px;line-height: 36px;}
    #measure .el-tabs__header{margin: 0px 23px 15px;}
</style>
<style scoped lang="less">
    #measure {overflow: hidden;}
    
</style>
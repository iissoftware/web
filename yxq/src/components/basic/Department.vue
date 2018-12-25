<template>
<div>
    <div id="department" class="dragBox">
        <div class="leftBox">
            <div class="clearbox">
                <div class="clearfix">
                    <span>公司简介</span>
                    <div style="float: right;">
                    <el-button type="text"  @click="departmentRefresh">
                        <i class="el-icon-refresh"></i>
                    </el-button>
                    <!-- <el-button type="text">
                        <i class="el-icon-edit-outline"></i>
                    </el-button>
                    <el-button type="text">
                        <i class="el-icon-printer"></i>
                    </el-button>
                    <el-button type="text">
                        <i class="el-icon-delete"></i>
                    </el-button>
                    <el-button type="text">
                        <i class="el-icon-circle-plus-outline"></i>
                    </el-button> -->
                    </div>
                </div>
                <div class="text item">
                    <el-tree
                    :data="Department"
                    node-key="id"
                    :props="defaultProps"
                    @node-click="departmentTitle"
                    ></el-tree>
                </div>
            </div>
        </div>
        <div class="rightBox">
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
                    <el-button type="primary" @click="addRow">新增</el-button>
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
                <!-- 单位组数据表格 -->
                <div class="table">
                    <el-table :data="departmentData" v-loading="loading" @selection-change="handleSelectionChange">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" property="code" label="代码" width="120"></el-table-column>
                        <el-table-column align="center" property="name" label="名称" width="170"></el-table-column>
                        <el-table-column align="center" property="mnemonicCode" label="助记码" width="170"></el-table-column>
                        <el-table-column align="center" property="parentId" label="上级部门" width="100"></el-table-column>
                        <el-table-column
                            align="center"
                            property="category"
                            label="部门报表属性"
                            width="170"
                        ></el-table-column>
                        <el-table-column align="center" property="supervisor" label="部门主管" width="100"></el-table-column>
                        <el-table-column align="center" property="remark" label="备注" width="150" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"></el-table-column>
                        <el-table-column align="center" property="locks" label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state === 1" style="color: green;">已启用</span>
                                <span v-else style="color: #f00;">已禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                            <el-button type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
        <!-- 新增行区域 -->
    <div class="addRowDepartment oparatorLayer" v-if="isShowAddRow">
        <el-form label-width="20%" :model="addRowFormData" ref="addRowForm" status-icon :rules="AddFormRules">
            <el-form-item label="代码：" prop="code">
                <el-input v-model="addRowFormData.code"></el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="addRowFormData.name"></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="addRowFormData.mnemonicCode"></el-input>
            </el-form-item>
            <el-form-item label="上级部门：" prop="parentId">
                <el-input v-model="parentName" placeholder="" @click.native="parentData"></el-input>
            </el-form-item>
            <el-form-item label="部门报表属性：" prop="category">
                <el-select v-model="addRowFormData.category">
                    <el-option label="管理部门" value="1"></el-option>
                    <el-option label="销售部门" value="2"></el-option>
                    <el-option label="制造部门" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门主管：" prop="supervisor">
                <el-select v-model="addRowFormData.supervisor">
                    <el-option label="张三" value="张三"></el-option>
                    <el-option label="李四" value="李四"></el-option>
                    <el-option label="王五" value="王五"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :rows="2" v-model="addRowFormData.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addRowSave('addRowForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 展示上级部门 -->
    <div class="parentDepartment oparatorLayer" v-if="isShowAddRow">
        <div class="parent">
            <!-- 搜索 -->
            <span>关键字：</span>
            <el-input v-model="paremtSearchText"></el-input>
            <el-button type="primary">搜索</el-button>
        </div>
        <div class="text item">
            <el-tree
            :data="Department"
            default-expand-all
            node-key="id"
            :props="defaultProps"
            :highlight-current="true"
            @node-click="departmentTitle"
            ></el-tree>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        var validateCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入代码'));
            }
            callback();
        }
        var validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入名称'));
            }
            callback();
        }
        var validateParentId = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择上级部门'));
            }
            callback();
        }
      return {
        Department: [],    //部门目录
        defaultProps: {
            children: "subDepartment",
            label: "name"
        },
        loading: true,       //是否显示加载中
        sortType: '',        //排序类型
        multipleSelection: [],   //存储多选数据
        searchText: '',         //搜索的内容
        paremtSearchText:"",  //上级部门搜索内容
        getCurrentKey:[],//点击树状控件获得的值
        parentName:'',//上级部门名称
        departmentData: [   //部门表格数据
            {
                code: '',
                name:'',
                mnemonicCode:'',
                parentId:'',
                category:'',
                supervisor:'',
                remark:''
            }
        ], 
        isShowAddRow: false,     //是否显示新增行页面
        addRowFormData: {           //存储新增行数据
            code: '',
            name:'',
            mnemonicCode:'',
            category:'',
            supervisor:'',
            remark:''
        },
        AddFormRules: {         //新增数据验证
            code: [{validator: validateCode, trigger: 'blur'}],
            name: [{validator: validateName, trigger: 'blur'}],
        },
      };
    },
    methods: {
        handleSelectionChange(val) {           //选中当前选中的行
            this.multipleSelection = val;
        },
        getDepartmentData() {         //获取表格数据
            this.loading = true;
            this.$http.get(this.$url + 'department/selectObject').then(res => {
                console.log(res,'res');
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.loading = false;
                        this.Department = res.data.data.reverse();
                        this.departmentData = res.data.data.reverse();
                    }, 500);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        departmentTitle(val){        //部门目录复选框选中时
            this.getCurrentKey = val;
            var id = this.getCurrentKey.id;
            this.$http.get(this.$url+"/department/selectObject?id="+id).then(res =>{
                this.departmentData = res.data.data;
            })
        },
        departmentRefresh(){        //部门目录刷新
            this.getDepartmentData();
        },
        parentData(){         //点击上级部门输入框弹出所有部门数据
            this.isShowAddRow = true;
            var that = this;
            setTimeout(() => {
                layer.open({
                    type: 1,
                    title: '选择上级部门',
                    shade: 0.3,
                    shadeClose: false,
                    zIndex: 14,
                    maxmin: true,
                    anim: 5,
                    area: ['40%', '500px'],
                    content: $('.parentDepartment'),
                    btn:['确认','关闭'],
                    yes: function(index, layero){
                        that.parentName = that.getCurrentKey.name;
                        console.log('parentName',that.parentName);
                        setTimeout(() => {
                            layer.close(layer.index);
                        })
                    },
                    end: function() {
                        that.isShowAddRow = false;
                        that.$refs['addRowForm'].resetFields();
                    }
                })
            }, 30);
        },
        addRow() {              //新增行数据
            this.isShowAddRow = true;
            var that = this;
            setTimeout(() => {
                layer.open({
                    type: 1,
                    title: '部门-新增',
                    shade: 0.3,
                    shadeClose: false,
                    zIndex: 13,
                    maxmin: true,
                    anim: 5,
                    area: ['40%', 'auto'],
                    content: $('.addRowDepartment'),
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
                        code: this.addRowFormData['code'],
                        name: this.addRowFormData['name'],
                        mnemonicCode: this.addRowFormData['mnemonicCode'],
                        parentId: this.addRowFormData['parentId'],
                        category: this.addRowFormData['category'],
                        supervisor: this.addRowFormData['supervisor'],
                        remark: this.addRowFormData['remark']
                    }
                    this.$http({
                        method: "post",
                        url: this.$url + "/department/insertOrUpdateDepartment",
                        params: data
                    }).then(res => {
                        console.log('department',res);
                        if(res.data.code === 20001) {
                            this.$message({message: '添加成功', type: 'success'});
                            setTimeout(() => {
                                layer.close(layer.index);
                                setTimeout(() => {
                                    this.getDepartmentData();
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
    },
    mounted() {
        this.getDepartmentData();
        // localStorage.removeItem('updateRowData');
    }
}
</script>
<style>
    #department .el-table th {background-color: rgb(244, 244, 244);}
    #department .el-input__inner {height: 36px;line-height: 36px;}
    #department .el-tabs__header{margin: 0px 23px 15px;}
    
</style>
<style scoped lang="less">
    #department {overflow: hidden;}
    #department .leftBox {width: 340px;margin-left: 20px;margin-top: 20px;}
    #department .rightBox {width: 940px;float: right;margin-top: -120px;}
    #department .leftBox .clearfix{padding: 5px 15px;border-bottom: 1px solid #f1f1f1;line-height: 35px;background-color: #fff;}
    .parent{text-align: center;}
    .parent>.el-input{width: 50% !important;}
    .parentDepartment>.text{margin:20px 70px;}
</style>
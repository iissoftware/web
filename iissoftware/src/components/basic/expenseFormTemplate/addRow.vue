<template>
    <div class="addBorrow">
        <div class="block-area">
            <div class="btn-box">
                <div class="btn-group">
                    <el-button type="primary" @click="saveRow">保存</el-button>
                    <el-button type="danger" @click="leaveRow" style="margin-right:20px">关闭</el-button>
                </div>
            </div>
            <div class="company">{{$store.state.companyName}}</div>
            <h3>费用报销类别审批单</h3>
            <el-row style="margin-top:20px">
                <el-col :span="4">
                    <div class="common">账套名</div>
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.accountSet}}</div>  
                </el-col>
                <el-col :span="4">
                    <div class="common">公司名字</div>
                </el-col>
                <el-col :span="12">
                    <div class="common grayBackground">{{formData.company}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="common">行业</div>               
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.industry}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">注册号</div>
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.registration_number}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">归属人</div>
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.belonger}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="common">部门</div>               
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.departmentName}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">姓名</div>
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.name}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">职务</div>
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.position}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="common">费用报销类别</div>               
                </el-col>
                <el-col :span="20">
                    <div class="common">
                        <el-input v-model="formData.type" style="outline:none; box-shadow: none;border-width: 0;"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="common">备注</div>               
                </el-col>
                <el-col :span="20">
                    <div class="common">
                        <el-input v-model="formData.remark" style="outline:none; box-shadow: none;border-width: 0;"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="common"> 一级科目</div>               
                </el-col>
                <el-col :span="6">
                    <div class="common grayBackground">费用</div>
                </el-col>
                <el-col :span="6">
                    <div class="common">二级科目</div>
                </el-col>
                <el-col :span="6">
                    <div class="common grayBackground">
                        <el-select v-model="formData.subjectLevelTwo" clearable filterable @change="selectTree">
                            <el-option v-for="(items, index) in secondarySubject"  :label="items.name" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="common">三级科目</div>               
                </el-col>
                <el-col :span="6">
                    <div class="common grayBackground">
                        <el-select v-model="formData.subjectLevelThree" clearable filterable @change="selectFour">
                            <el-option v-for="(items, index) in TreeSubject"  :label="items.name" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="common">四级科目</div>
                </el-col>
                <el-col :span="6">
                    <div class="common grayBackground">
                        <el-select v-model="formData.subjectLevelFour" clearable filterable>
                            <el-option v-for="(items, index) in FourSubject"  :label="items.name" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="common">审批人</div>               
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.approver}}</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">审核意见</div>
                </el-col>
                <el-col :span="12">
                    <div class="common grayBackground">{{formData.idea}}</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData: this.$store.state.expenseFormTemplateStore.formData,//页面数据
            systemId: this.$store.state.systemId, //系统参数id
            secondarySubject: this.$store.state.expenseFormTemplateStore.secondarySubject,//二级科目
            TreeSubject: this.$store.state.expenseFormTemplateStore.TreeSubject,//三级科目
            FourSubject: this.$store.state.expenseFormTemplateStore.FourSubject,//四级科目
        }
    },
    methods:{
        leaveRow(){                         //离开按钮
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        },
        selectTree(data){                   //点击二级科目显示三级科目
            this.$store.dispatch('expenseFormTemplateStore/getSubjectDataTree', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId + '&parentId=' + data);//获取三级科目的数据
            this.formData['subjectLevelThree'] = '';
            this.formData['subjectLevelFour'] = '';
        },
        selectFour(data){                   //点击三级科目显示四级科目
            this.$store.dispatch('expenseFormTemplateStore/getSubjectDataFour', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId + '&parentId=' + data);//获取三级科目的数据
            this.formData['subjectLevelFour'] = '';
        },
        saveRow(){                          //保存
            if(this.formData['type']){
                let data = {        //重新组装数据
                    accountSet: this.formData['accountSet'],
                    company: this.formData['company'],
                    industry: this.formData['industry'],
                    department: this.formData['department'],
                    name: this.formData['name'],
                    position: this.formData['position'],
                    type: this.formData['type'],
                    subjectLevelTwo: this.formData['subjectLevelTwo'],
                    subjectLevelThree: this.formData['subjectLevelThree'],
                    subjectLevelFour: this.formData['subjectLevelFour'],
                    subjectLevelOne: this.formData['subjectLevelOne'],
                    idea: this.formData['idea'],
                    approver: this.formData['approver'],
                    belonger: this.formData['belonger'],
                    registration_number: this.formData['registration_number'],
                    industryId: this.formData['industryId'],
                    remark: this.formData['remark'],
                }
                this.$http({
                    method: "post",
                    url: this.$url + "expenseAccountCategory/insertOrUpdateObject",
                    params: data,
                    dataType: 'json'
                }).then(res => {
                    if(res.data.code == 20001) {
                        this.$store.dispatch('expenseFormTemplateStore/getTableData', this.$url + "expenseAccountCategory/selectObject");//获取表格数据
                        this.$message({message: '保存成功',type:'success',duration:1500});
                    }else{
                        // this.$message({message: res.data.msg,type:'error'});
                    }
                })
            }else{
                this.$message({type:'error',message:'费用报销类别不能为空',duration:1500})
            }
        }
    },
    mounted(){
        this.$store.dispatch('expenseFormTemplateStore/getSubjectData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId + '&parentId=' + this.formData['subjectLevelOne'] );//获取二级科目的数据
    }
}
</script>

<style>
    .addBorrow .el-input__icon{line-height: 30px !important;}
    .addBorrow .el-input__inner,.addBorrow .el-input__inner:focus{border: none;box-sizing: border-box;color:black}
</style>


<style lang="less" scoped>
    .addBorrow{
        min-width: 770px;
        .company{
            margin-bottom:5px;
        }
        .company,h3{
            text-align:center;
        }
        .el-row {
            width:80%;
            margin:0 auto;
            text-align:center;
            line-height:30px;
            .common{              
                border:1px solid black;
                height:30px;
            }
            .grayBackground{
                background-color:#e6e6e6;
            }
        }
        
            
    }
            
</style>

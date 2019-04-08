<template>
    <div class="addBorrow">
        <div class="block-area">
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
                        <el-input readonly v-model="formData.type" style="outline:none; box-shadow: none;border-width: 0;"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="common">备注</div>               
                </el-col>
                <el-col :span="20">
                    <div class="common">
                        <el-input readonly v-model="formData.remark" style="outline:none; box-shadow: none;border-width: 0;"></el-input>
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
                        <el-select disabled v-model="formData.subjectLevelTwo" filterable>
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
                        <el-select disabled v-model="formData.subjectLevelThree" filterable>
                            <el-option v-for="(items, index) in TreeSubject"  :label="items.name" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="common">四级科目</div>
                </el-col>
                <el-col :span="6">
                    <div class="common grayBackground">
                        <el-select disabled v-model="formData.subjectLevelFour" filterable>
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
            formData:{},//页面数据
            systemId: this.$store.state.systemId, //系统参数id
            secondarySubject: [],//二级科目
            TreeSubject: [],//三级科目
            FourSubject: [],//四级科目
            rowId: this.$store.state.expenseFormTemplateStore.rowId,
        }
    },
    methods:{
        getUpdataRowData(){                 //获取当前要修改的数据
            this.$http.get(this.$url + 'expenseAccountCategory/selectObjectById?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    this.formData = res.data.data;
                    if(this.formData['subjectLevelOne'] || this.formData['subjectLevelOne']){
                        this.$http.get(this.$url + "subjectGroup/selectGroupByObject?systemId=" + this.systemId + '&parentId=' + this.formData['subjectLevelOne']).then(res => {
                            if(res.data.code == 20001) {
                                this.secondarySubject = res.data.data;
                                if(this.formData['subjectLevelTwo'] || this.formData['subjectLevelTwo']){
                                    this.$http.get(this.$url + "subjectGroup/selectGroupByObject?systemId=" + this.systemId + '&parentId=' + this.formData['subjectLevelTwo']).then(res => {
                                        if(res.data.code == 20001) {
                                            this.TreeSubject = res.data.data;
                                            if(this.formData['subjectLevelThree'] || this.formData['subjectLevelThree']){
                                                this.$http.get(this.$url + "subjectGroup/selectGroupByObject?systemId=" + this.systemId + '&parentId=' + this.formData['subjectLevelThree']).then(res => {
                                                    if(res.data.code == 20001) {
                                                        this.FourSubject = res.data.data;
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        },
    },
    mounted(){
        this.getUpdataRowData();
    }
}
</script>

<style>
    .addBorrow .el-input.is-disabled .el-input__inner{text-align:center;background-color: #e6e6e6 !important;border-color: #e6e6e6 !important;color: #333333 !important;}
    .addBorrow .el-input__icon{line-height: 30px !important;}
    .addBorrow .el-input__inner,.addBorrow .el-input__inner:focus{border: none;box-sizing: border-box;color:black;}
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

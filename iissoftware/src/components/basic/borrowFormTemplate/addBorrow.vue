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
            <h3>借款类别审批单</h3>
            <el-row style="margin-top:20px">
                <el-col :span="3">
                    <div class="common">账套名</div>
                </el-col>
                <el-col :span="5">
                    <div class="common grayBackground">{{formData.accountSet}}</div>  
                </el-col>
                <el-col :span="3">
                    <div class="common">公司名字</div>
                </el-col>
                <el-col :span="13">
                    <div class="common grayBackground">{{formData.companyNameChinese}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common">行业</div>               
                </el-col>
                <el-col :span="5">
                    <div class="common grayBackground">{{formData.industryName}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">注册号</div>
                </el-col>
                <el-col :span="5">
                    <div class="common grayBackground">{{formData.registrationNumber}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">归属人</div>
                </el-col>
                <el-col :span="5">
                    <div class="common grayBackground">{{formData.belonger}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common">部门</div>               
                </el-col>
                <el-col :span="5">
                    <div class="common grayBackground">{{formData.deptName}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">姓名</div>
                </el-col>
                <el-col :span="5">
                    <div class="common grayBackground">{{formData.name}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">职务</div>
                </el-col>
                <el-col :span="5">
                    <div class="common grayBackground">{{formData.posionName}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common">借款类别</div>               
                </el-col>
                <el-col :span="21">
                    <div class="common">
                        <el-input v-model="formData.loanCategory" style="outline:none; box-shadow: none;border-width: 0;"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common">备注</div>               
                </el-col>
                <el-col :span="21">
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
                    <div class="common grayBackground">其他应收款</div>
                </el-col>
                <el-col :span="6">
                    <div class="common">二级科目</div>
                </el-col>
                <el-col :span="6">
                    <div class="common grayBackground">
                        <el-select v-model="formData.levelTwoSubjectId" @change="twoSubject" placeholder="选择二级科目" clearable filterable>
                            <el-option v-for="(items, index) in twoList"  :label="items.name" :value="items.id" :key="index"></el-option>
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
                        <el-select v-model="formData.levelThreeSubjectId" @change="threeSubject" placeholder="选择三级科目" filterable clearable>
                            <el-option v-for="(items, index) in threeList"  :label="items.name" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="common">四级科目</div>
                </el-col>
                <el-col :span="6">
                    <div class="common grayBackground">
                        <el-select v-model="formData.levelFourSubjectId" placeholder="选择四级科目" filterable clearable>
                            <el-option v-for="(items, index) in fourList"  :label="items.name" :value="items.id" :key="index"></el-option>
                        </el-select> 
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common">审批人</div>               
                </el-col>
                <el-col :span="6">
                    <div class="common grayBackground"></div>
                </el-col>
                <el-col :span="3">
                    <div class="common">审核意见</div>
                </el-col>
                <el-col :span="12">
                    <div class="common grayBackground"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData:{                      //表格内容
                accountSet:'',
                companyNameChinese:'',
                industryName:'',
                registrationNumber:'',
                belonger:'',
                deptName:'',
                name:'',
                posionName:'',
                loanCategory:'',
                levelOneSubjectId:'',
                levelTwoSubjectId:'',
                levelThreeSubjectId:'',
                levelFourSubjectId:'',
                approver:'',
                approvalOpinion:'',
                remark:'',
            },
            twoList:[],                     //二级下拉框
            threeList:[],                   //三级下拉框
            fourList:[],                    //四级下拉框
        }
    },
    methods:{
        saveRow(){                              //新增保存
            if(this.formData.loanCategory){
                let data = {        //重新组装数据
                    accountSet: this.formData['accountSet'],
                    companyNameChinese: this.formData['companyNameChinese'],
                    industry: this.formData['industry'],
                    registrationNumber: this.formData['registrationNumber'],
                    belonger: this.formData['belonger'],
                    dept: this.formData['dept'],
                    empId: this.formData['empId'],
                    posion: this.formData['posion'],
                    loanCategory: this.formData['loanCategory'],
                    levelOneSubjectId: this.formData['levelOneSubjectId'],
                    levelTwoSubjectId: this.formData['levelTwoSubjectId'],
                    levelThreeSubjectId: this.formData['levelThreeSubjectId'],
                    levelFourSubjectId : this.formData['levelFourSubjectId'],
                    approver: this.formData['approver'],
                    approvalOpinion: this.formData['approvalOpinion'],
                    remark:this.formData['remark']
                }
                this.$http({
                    method: "post",
                    url: this.$url + "loanCategory/insertLoanCategory",
                    params: data,
                    dataType: 'json'
                }).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '保存成功', type: 'success',duration: 1500});
                        setTimeout(() => {
                            this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');                         
                            this.leaveRow();
                        },1000)
                                                  
                    }else{
                        this.$message({message: res.data.msg,type:'error'});
                    }
                })
            }else{
                this.$message({type:'error',message:'借款类别不能为空',duration:1500})
            }
        },
        leaveRow(){                             //离开按钮
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        },
        twoSubject(res){                        //根据二级科目id显示三级科目下拉框
            this.$http.get(this.$url + "loanCategory/selectLevelsubSubject?id=" + res).then(res => {
                if(res.data.code == 20001) {
                    this.threeList = res.data.data;                     
                }
            })
            this.formData.levelThreeSubjectId = '';
            this.formData.levelFourSubjectId = '';
        },
        threeSubject(res){                      //根据三级科目id显示四级科目下拉框
            this.$http.get(this.$url + "loanCategory/selectLevelsubSubject?id=" + res).then(res => {
                if(res.data.code == 20001) {
                    this.fourList = res.data.data;                     
                }
            })
            this.formData.levelFourSubjectId = '';
        },
        getAddData(){
            this.$http.get(this.$url + 'loanCategory/loadInformation').then(res => {
                if(res.data.code == 20001) {
                    this.formData = res.data.data;
                    this.$http.get(this.$url + 'loanCategory/selectLevelsubSubject?id=' + this.formData['levelOneSubjectId']).then(res => {
                        if(res.data.code == 20001){
                            this.twoList = res.data.data
                        }                        
                    })
                }
            })
        }
    },
    mounted(){
        this.getAddData();
    }
}
</script>

<style>
    .addBorrow .el-input__inner,.addBorrow .el-input__inner:focus{border: none;box-sizing: border-box;color:black}
    .addBorrow .el-input__icon {line-height:30px !important}
    .addBorrow .block-area .el-input__inner {padding:7px 15px !important}
</style>


<style lang="less" scoped>
    .addBorrow{
        .company{
            margin-bottom:5px;
        }
        .company,h3{
            text-align:center;
        }
        .el-row {
            width:90%;
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

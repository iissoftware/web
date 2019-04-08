<template>
    <div class="updateBorrow">
        <!-- 前翻后翻组件 -->
        <!-- <modify :tableData="$store.state.borrowTemplateStore.tableData" :currentId="rowId" @getPositionData="getPositionData"/> -->

        <!-- <el-form label-width="100px" :model="updateData" ref="updateData" status-icon style="margin-top:10px">
            <el-form-item label="借款类别：" prop="loanCategory" >
                <el-input v-model="updateData.loanCategory" @keyup.enter.native="enterKey($event, 'S0')"></el-input>
            </el-form-item>
            <el-form-item label="一级科目：" prop="levelOneSubject">
                <el-input v-model="updateData.levelOneSubject" ref="S0" @keyup.enter.native="enterKey($event, 'S1')" disabled></el-input>
            </el-form-item>
            <el-form-item label="二级科目：" prop="levelTwoSubject">
                <el-select v-model="updateData.levelTwoSubject" @change="twoSubject" placeholder="选择二级科目" ref="S1" @keyup.enter.native="enterKey($event, 'S2')" clearable filterable>
                    <el-option v-for="(items, index) in twoList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>    
            </el-form-item>
            <el-form-item label="三级科目：" prop="levelThreeSubject">
                <el-select v-model="updateData.levelThreeSubject" @change="threeSubject" placeholder="选择三级科目" ref="S2" @keyup.enter.native="enterKey($event, 'S3')" filterable clearable>
                    <el-option v-for="(items, index) in threeList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="四级科目：" prop="levelFourSubject">
                <el-select v-model="updateData.levelFourSubject" @change="fourSubject" placeholder="选择四级科目" ref="S3" @keyup.enter.native="enterKey($event, 'S4')" filterable clearable>
                    <el-option v-for="(items, index) in fourList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>              
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="updateData.remark" @keyup.enter.native="enterKey($event, 'S4')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="saveRow('updateData')">保存</el-button>
                <el-button type="danger" size="small" @click="leaveRow">关闭</el-button>
            </el-form-item>
        </el-form> -->
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
// import modify from '../modify'
export default {
    components: {
        // modify
    },
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
            rowId:this.$store.state.borrowTemplateStore.rowId,
        }
    },
    methods:{
        saveRow(){                          //修改保存 
            if(this.formData.loanCategory){           
                let data = {
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
                    remark:this.formData['remark'],
                    id:this.rowId
                }
                this.$http({
                    url: this.$url + 'loanCategory/updateLoanCategory',
                    method: 'post',
                    params: data
                }).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '修改成功', type: 'success',duration:1500});
                        setTimeout(() => {
                            this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
                            this.leaveRow();
                        },500) 
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }else{
                this.$message({type:'error',message:'借款类别不能为空',duration:1500})
            }
        },
        leaveRow(){                             //关闭
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
            this.fourList = '';
        },
        threeSubject(res){                      //根据三级科目id显示四级科目下拉框
            this.$http.get(this.$url + "loanCategory/selectLevelsubSubject?id=" + res).then(res => {
                if(res.data.code == 20001) {
                    this.fourList = res.data.data;                     
                }
            })
            this.formData.levelFourSubjectId = '';
        },
        // getPositionData(row){                   //前翻后翻
        //     this.updateData = row;
        //     if(this.updateData['levelThreeSubject'] || this.updateData['levelTwoSubject']){
        //         this.$http.get(this.$url + "loanCategory/selectLevelsubSubject?id=" + this.updateData['levelTwoSubjectId']).then(res => {
        //             if(res.data.code == 20001) {
        //                 this.threeList = res.data.data;
        //                 if(this.updateData['levelFourSubject'] || this.updateData['levelThreeSubject']){
        //                     this.$http.get(this.$url + "loanCategory/selectLevelsubSubject?id=" + this.updateData['levelThreeSubjectId']).then(res => {
        //                         if(res.data.code == 20001) {
        //                             this.fourList = res.data.data;                     
        //                         }
        //                     })
        //                 }                     
        //             }
        //         })
        //     }
        // },
        getNowData(){                           //当前的修改数据和下拉框数据
            this.$http.get(this.$url + 'loanCategory/findLoanCategoryById?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    this.formData = res.data.data;
                    this.$http.get(this.$url + "loanCategory/selectLevelsubSubject?id=" + res.data.data['levelOneSubjectId']).then(res => {
                        if(res.data.code == 20001) {
                            this.twoList = res.data.data; 
                            if(this.formData['levelThreeSubjectId'] || this.formData['levelTwoSubjectId']){
                                this.$http.get(this.$url + "loanCategory/selectLevelsubSubject?id=" + this.formData['levelTwoSubjectId']).then(res => {
                                    if(res.data.code == 20001) {
                                        this.threeList = res.data.data;
                                        if(this.formData['levelFourSubjectId'] || this.formData['levelThreeSubjectId']){
                                            this.$http.get(this.$url + "loanCategory/selectLevelsubSubject?id=" + this.formData['levelThreeSubjectId']).then(res => {
                                                if(res.data.code == 20001) {
                                                    this.fourList = res.data.data;                     
                                                }
                                            })
                                        }                     
                                    }
                                })
                            }                    
                        }
                    })
                }
            })            
        },
    },
    created(){
        this.getNowData()
    }
    
}
</script>

<style>
    .updateBorrow .el-input__inner,.updateBorrow .el-input__inner:focus{border: none;box-sizing: border-box;color:black}
    .updateBorrow .el-input__icon {line-height:30px !important}
    .updateBorrow .block-area .el-input__inner {padding:7px 15px !important}
</style>


<style lang="less" scoped>
    .updateBorrow{
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

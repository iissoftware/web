<template>
    <div class="reportSearch">
        <div class="top-part">
            <el-form :inline="true" :model="topForm" label-width="82px" ref="topForm" label-position="right">
                <!-- <el-form-item label="日期选择:" prop="startTime">
                    <el-date-picker
                    v-model="topForm.startTime"
                    type="date"
                    placeholder="开始时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item label="日期选择:" prop="startTime">
                    <el-date-picker
                    v-model="topForm.startTime"
                    type="month"
                    placeholder="开始时间"
                    format="yyyy 年 MM 月"
                    value-format="yyyy-MM">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="科目名称:" prop="subjectId">
                    <el-input v-model="subjectName" readonly @click.native="chooseProject" placeholder="选择科目"></el-input>
                    <el-input v-model="topForm.subjectId" readonly style="display:none;"></el-input>
                </el-form-item>
                <el-form-item label="上级科目:" prop="levelTwoSubject">
                    <el-input v-model="topForm.levelTwoSubject" disabled></el-input>
                </el-form-item>
                <el-form-item label="上上级科目:" prop="levelThreeSubject">
                    <el-input v-model="topForm.levelThreeSubject" disabled></el-input>
                </el-form-item>
                <el-form-item label="付款类别:" prop="typeOfPayment">
                    <el-select v-model="topForm.typeOfPayment">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="预付款" value="预付款"></el-option>
                        <el-option label="进度款" value="进度款"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="到:" prop="endTime">
                    <el-date-picker
                    v-model="topForm.endTime"
                    type="date"
                    placeholder="结束时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item label="到:" prop="endTime">
                    <el-date-picker
                    v-model="topForm.endTime"
                    type="month"
                    placeholder="结束时间"
                    format="yyyy 年 MM 月"
                    value-format="yyyy-MM">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="银行账号:" class="bank" prop="bankAccount">
                    <el-input v-model="bankName" readonly @click.native="chooseBank" placeholder="选择账号"></el-input>
                    <el-input v-model="topForm.bankAccount" readonly style="display:none;"></el-input>
                </el-form-item>
                <el-form-item label="事业部:" prop="levelThreeSubjectDept">
                    <el-input v-model="topForm.levelThreeSubjectDept" disabled></el-input>
                </el-form-item>
                <el-form-item label="中心:" prop="levelTwoDept">
                    <el-input v-model="topForm.levelTwoDept" disabled></el-input>
                </el-form-item>
                <el-form-item label="部门:" prop="dept">
                    <el-input v-model="departmentName" readonly @click.native="chooseDepartment" placeholder="选择部门"></el-input>
                    <el-input v-model="topForm.dept" readonly style="display:none;"></el-input>
                </el-form-item>
                <el-form-item label="人员:" prop="emp">
                    <el-input v-model="staffName" readonly @click.native="chooseStaff" placeholder="选择人员"></el-input>
                    <el-input v-model="topForm.emp" readonly style="display:none;"></el-input>
                </el-form-item>
                <el-form-item label="收款类别:" prop="ollectionClasses">
                    <el-select v-model="topForm.ollectionClasses">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="预收款" value="预收款"></el-option>
                        <el-option label="进度款" value="进度款"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="往来单位:" prop="betweenObjects">
                    <el-input v-model="betweenObjectsName" readonly @click.native="chooseBetweenObjects" placeholder="选择往来单位" :disabled="boolean"></el-input>
                    <el-input v-model="topForm.betweenObjects" readonly style="display:none;"></el-input>
                </el-form-item>
                <el-form-item class="last_part">
                    <el-button type="primary" size="small" style="margin-left:20%" @click="searchData">查询</el-button>
                    <el-button type="info" size="small" @click="resetForm('topForm')">复位</el-button>
                </el-form-item>
                <el-form-item class="last_part">
                    <el-button type="primary" size="small" style="margin-left:20%" @click="OrderForm">单据</el-button>
                    <el-button-group class="btn-other" style="margin-left:10px">
                        <el-button title="导出">
                            <img src="../../../assets/images/export.png" alt="">
                        </el-button>
                        <el-button title="打印">
                            <img src="../../../assets/images/print.png" alt="">
                        </el-button>
                        <el-button title="帮助">
                            <img src="../../../assets/images/help.png" alt="">
                        </el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom-part" style="margin-top:10px">
            <el-row style="margin-top:10px">
                <el-col :span="24">
                    <div class="title">会计科目分类明细账</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common">会计科目:</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">{{kuaiji}}</div>
                </el-col>
                <el-col :span="18">
                    <div class="common">期间：{{duringTime}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common">单位:</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">{{danwei}}</div>
                </el-col>
                <el-col :span="8">
                    <div class="common">中心:{{  zhongxin}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">部门:</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">{{bumen}}</div>
                </el-col>
                <el-col :span="1">
                    <div class="common">姓名:</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">{{xingming}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common">日期</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">单据编号</div>
                </el-col>
                <el-col :span="8">
                    <div class="common">摘要</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">借方</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">贷方</div>
                </el-col>
                <el-col :span="1">
                    <div class="common">借/贷</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">余额</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common"></div>
                </el-col>
                <el-col :span="4">
                    <div class="common"></div>
                </el-col>
                <el-col :span="8">
                    <div class="common" style="text-align:left;padding-left:5px">期初余额</div>
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:5px"></div>
                </el-col>
                <el-col :span="3">
                    <div class="common"></div>
                </el-col>
                <el-col :span="1">
                    <div class="common">
                        <template>
                            <span v-if="debitAndCredit == 0">借</span>
                            <span v-else>贷</span>
                        </template>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:5px">{{numberRules(money)}}</div>
                </el-col>
            </el-row>
            <el-row v-if="listData.length < 1">
                <el-col :span="24">
                    <div class="common">暂无数据</div>
                </el-col>
            </el-row>
            <el-row v-else v-for="(item,index) in listData" :key="index" :class="currentIndex == index ? 'active' : ''" class="colCss" @click.native="clickedRow(item, index)">
                <el-col :span="2">
                    <div class="common">{{item.makingTime}}</div>    
                </el-col>
                <el-col :span="4">
                    <div class="common">{{item.receiptNumber}}</div>      
                </el-col>
                <el-col :span="8">
                    <div class="common" style="text-align:left;padding-left:3px">{{item.reason}}</div>  
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:3px">
                        {{numberRules(item.debitBalance)}}
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:3px">
                        {{numberRules(item.creditBalance)}}
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="common">
                        <template>
                            <span v-if="item.debitAndCredit == 1">贷</span>
                            <span v-else>借</span>
                        </template>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:5px">
                        {{numberRules(item.calculateBalance)}}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common"></div>
                </el-col>
                <el-col :span="4">
                    <div class="common"></div>
                </el-col>
                <el-col :span="8">
                    <div class="common">查询期间合计</div>
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:3px">{{numberRules(duringBorrowSum)}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:3px">{{numberRules(duringLendSum)}}</div>
                </el-col>
                <el-col :span="1">
                    <div class="common"></div>
                </el-col>
                <el-col :span="3">
                    <div class="common"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common"></div>
                </el-col>
                <el-col :span="4">
                    <div class="common"></div>
                </el-col>
                <el-col :span="8">
                    <div class="common">本年截至查询期间累计</div>
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:3px">{{numberRules(borrowBalance)}}</div>
                </el-col>
                <el-col :span="3">
                    <div class="common" style="text-align:right;padding-right:3px">{{numberRules(creditBalance)}}</div>
                </el-col>
                <el-col :span="1">
                    <div class="common"></div>
                </el-col>
                <el-col :span="3">
                    <div class="common"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            boolean:true,
            whichOne:'',
            topForm:{
                startTime:'',
                endTime:'',
                dept:'',
                levelTwoDept:'',
                levelThreeSubjectDept:'',
                subjectId:'',
                levelTwoSubject:'',
                levelThreeSubject:'',
                bankAccount:'',
                emp:'',
                betweenObjects:'',
                typeOfPayment:'',
                ollectionClasses:'',
            },
            listData:[],
            subjectName:'',
            proName:this.$store.state.reportQuerierStore.proName,   //会计科目

            departmentName:'',
            depName:this.$store.state.reportQuerierStore.depName,   //部门名字

            bankName:'',
            banName:this.$store.state.reportQuerierStore.banName,   //银行账号
            
            staffName:'',
            staName:this.$store.state.reportQuerierStore.staName,   //人员名字  
            
            betweenObjectsName:'',
            betName:this.$store.state.reportQuerierStore.betName,   //往来单位
            
            listData:[],                            //循环生成的数据
            currentIndex:'',                        //当前选中的表格行
            kuaiji:'',
            duringTime:'',
            danwei:'',
            zhongxin:'',
            bumen:'',
            xingming:'',
            debitAndCredit:'',                      //期初余额是贷1,借0
            money:'',                               //期初余额
            duringBorrowSum:'',                     //查询期间借方总和
            duringLendSum:'',                       //查询期间贷方总和
            creditBalance:'',                       //本年截止合计贷方
            borrowBalance:'',                       //本年截止合计借方
        }
    },
    watch:{
        depName(){                  //观察部门改变
            if(this.depName.length > 0){
                this.departmentName = this.depName[0]['name'];
                this.topForm['dept'] = this.depName[0]['id'];
                this.$http.get(this.$url + 'reportForms/searchDept?id='+ this.depName[0]['id']).then(res => {           //根据部门id获取中心和事业部
                    if(res.data.code === 20001) {                    
                        this.topForm['levelTwoDept'] = res.data.data['levelTwoDept']
                        this.topForm['levelThreeSubjectDept'] = res.data.data['levelThreeSubjectDept']
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$message.error(err);
                })
            }
        },
        proName(){                  //观察会计科目改变
            if(this.proName.length > 0){
                this.subjectName = this.proName[0]['name']
                this.topForm['subjectId'] = this.proName[0]['id'];
                this.$http.get(this.$url + 'reportForms/searchSubjectGroup?id='+this.proName[0]['id']).then(res => {           //根据会计科目id获取上级，上上级会计科目
                    if(res.data.code === 20001) {                    
                        this.topForm['levelTwoSubject'] = res.data.data['levelTwoSubject']
                        this.topForm['levelThreeSubject'] = res.data.data['levelThreeSubject']
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$message.error(err);
                })
                let customerData = this.$store.state.reportQuerierStore.customerData
                let supplierData = this.$store.state.reportQuerierStore.supplierData
                let otherData = this.$store.state.reportQuerierStore.otherData
                for(let i = 0; i < customerData.length; i++){
                    if(customerData[i]['name'] == this.proName[0]['name']){
                        this.boolean = false;
                        this.whichOne = 'one';
                    }
                }
                for(let i = 0; i < supplierData.length; i++){
                    if(supplierData[i]['name'] == this.proName[0]['name']){
                        this.boolean = false;
                        this.whichOne = 'two';
                    }
                }
                for(let i = 0; i < otherData.length; i++){
                    if(otherData[i]['name'] == this.proName[0]['name']){
                        this.boolean = false;
                        this.whichOne = 'three';
                    }
                }
            }
        },
        banName(){                  //观察银行改变
            if(this.banName.length > 0){
                this.bankName = this.banName[0][0]['accountNumber'];
                this.topForm['bankAccount'] = this.banName[0][0]['id'];
            }
        },
        staName(){                  //观察人员改变
            if(this.staName.length > 0){
                this.staffName = this.staName[0][0]['name'];
                this.topForm['emp'] = this.staName[0][0]['id'];
            }
        },
        betName(){                  //观察往来单位
            if(this.betName.length > 0){
                this.betweenObjectsName = this.betName[0][0]['name'];
                this.topForm['betweenObjects'] = this.betName[0][0]['id'];
            }
        }
    },
    methods:{
        chooseDepartment(){                 //显示选择部门页面
            this.$util.openSubLayerIframe('报表查询-部门选择', 15, '500px', '400px', this.$domain + '/#/ReportSearch/department');
        },
        chooseProject(){                    //显示选择会计科目页面
            this.$util.openSubLayerIframe('报表查询-科目选择', 15, '500px', '400px', this.$domain + '/#/ReportSearch/project');
        },
        chooseStaff(){                      //显示选择人员页面
            if(this.topForm['dept']){
                this.$util.openSubLayerIframe('报表查询-人员选择', 15, '600px', '400px', this.$domain + '/#/ReportSearch/staff');
            }else{
                this.$message({message: '先选择部门', type: 'error',duration: 2000});
            }            
        },
        chooseBank(){                       //显示选择银行页面
            this.$util.openSubLayerIframe('报表查询-银行账号选择', 15, '600px', '400px', this.$domain + '/#/ReportSearch/bank');
        },
        chooseBetweenObjects(){             //显示往来对象单位
            if(this.topForm['subjectId'] && this.boolean == false){
                if(this.whichOne == 'one'){
                    this.$util.openSubLayerIframe('报表查询-往来对象选择', 15, '500px', '400px', this.$domain + '/#/ReportSearch/unitOne');
                }else if(this.whichOne == 'two'){
                    this.$util.openSubLayerIframe('报表查询-往来对象选择', 15, '500px', '400px', this.$domain + '/#/ReportSearch/unitTwo');
                }else{
                    this.$util.openSubLayerIframe('报表查询-往来对象选择', 15, '500px', '400px', this.$domain + '/#/ReportSearch/unitThree');
                }                
            }else if(this.topForm['subjectId'] && this.boolean == true){
                this.$message({message: '该会计科目没有往来对象', type: 'error',duration: 2000});
            }else if(!this.topForm['subjectId']){
                this.$message({message: '先选择会计科目', type: 'error',duration: 2000});
            }
            
        },
        resetForm(formName) {               //复位
            this.$refs[formName].resetFields();
            this.departmentName = "";
            this.subjectName = "";
            this.bankName = "";
            this.staffName = "";
            this.betweenObjectsName = "";
        },
        clickedRow(item, index){            //点击当前行的数据
            this.currentIndex = index;
            // this.$http.get(this.$url + 'city/findProvince?parentId='+id).then(res => {
            //     if(res.data.code === 20001) {                    
            //         setTimeout(() => {
            //             this.provinceData = res.data.data;
            //         }, 500);
            //     } else {
            //         this.$message.error(res.data.msg);
            //     }
            // }).catch(err => {
            //     this.$message.error(err);
            // })
        },
        searchData(){                       //查询按钮     (改变listData)
            if(this.topForm['startTime'] && this.topForm['endTime'] && this.topForm['subjectId']){
                this.kuaiji = this.subjectName;
                this.xingming = this.staffName;
                this.duringTime = this.topForm.startTime + ' 至 ' + this.topForm.endTime;
                this.zhongxin = this.topForm['levelTwoDept'];
                this.bumen = this.departmentName;
                this.danwei = this.topForm['levelThreeSubjectDept'];            
                let data = {        //重新组装数据
                    startTime: this.topForm['startTime'],
                    endTime: this.topForm['endTime'],
                    dept: this.topForm['dept'],
                    levelTwoDept: this.topForm['levelTwoDept'],
                    levelThreeSubjectDept:this.topForm['levelThreeSubjectDept'],
                    subjectId: this.topForm['subjectId'],
                    levelTwoSubject: this.topForm['levelTwoSubject'],
                    levelThreeSubject: this.topForm['levelThreeSubject'],
                    bankAccount: this.topForm['bankAccount'],
                    emp: this.topForm['emp'],
                    typeOfPayment: this.topForm['typeOfPayment'],
                    ollectionClasses: this.topForm['ollectionClasses'],
                }
                if(this.whichOne == 'one'){
                    data['customerName'] = this.topForm['betweenObjects']
                }else if (this.whichOne == 'two'){
                    data['supplierName'] = this.topForm['betweenObjects']
                }
                this.$http({
                    method: "post",
                    url: this.$url + "reportForms/searchReportForms",
                    params: data,
                    dataType: 'json'
                }).then(res => {
                    console.log(res,'res')
                    if(res.data.code == 20001) {
                        let obj = res.data.data;
                        this.debitAndCredit = obj['debitAndCredit'];
                        this.money = obj['money'];
                        this.borrowBalance = obj['borrowBalance'];
                        this.creditBalance = obj['creditBalance'];
                        this.listData = obj['reportFinder'];
                        this.duringBorrowSum = 0;               //查询期间借方总和
                        this.duringLendSum = 0;                 //查询期间贷方总和
                        for(let i = 0 ; i < this.listData.length; i++){
                            if(this.listData[i]['debitBalance']){
                                this.duringBorrowSum = this.duringBorrowSum + this.listData[i]['debitBalance'];                                
                            }
                            if(this.listData[i]['creditBalance']){
                                this.duringLendSum = this.duringLendSum + this.listData[i]['creditBalance'];
                            }          
                        }                                          
                    }else{
                        this.$message({message: res.data.msg,type:'error'});
                    }
                })

            }else{
                this.$message({type:'warning',message:'日期段和会计科目不能为空',duration:2000})
            }
        },
        numberRules(a){                     //两位小数和千分号(a为number类型)
            if(a){
                a = a.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return a;
            }else if (a === 0){
                return '0.00';
            }
            else{
                return '';
            }
            
        },
        OrderForm(){                        //单据
            console.log(this.numberRules(0),'kkk')
        }
        // twoDecimals(value){                 //保留两位小数
        //     var value = Math.round(parseFloat(value)*100)/100;
        //     var xsd = value.toString().split(".");
        //     if( xsd.length == 1 ){
        //         value = value.toString() + ".00";
        //         return value;
        //     }
        //     if( xsd.length > 1 ){
        //         if( xsd[1].length < 2 ){
        //             value = value.toString() + "0";
        //         }
        //         return value;
        //     }
        // },
        // thousandBit(num) {                  //千分号             
        //     var parts = num.toString().split(".");
        //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //     return parts.join(".");
        // }

    },
    
}
</script>

<style lang="less">
    .reportSearch .el-form-item__label{padding:0 0 0 0!important;width:75px !important;text-align: right !important;}
    .reportSearch .el-form--inline .el-form-item__content {width:calc(100% - 85px) !important;padding-left:10px !important}
    .reportSearch .el-input__inner {padding: 7px 15px !important;}
    .reportSearch .el-button-group .el-button{padding:7px 8px !important}
    .reportSearch .last_part .el-form-item__content{width:100% !important;}
    .reportSearch .el-date-editor.el-input .el-input__inner{padding: 8px 0 8px 25px !important;font-size:12px !important}
    .reportSearch .el-input__prefix{left:0 !important}
    .reportSearch .bank .el-form-item__content .el-input__inner {font-size:12px !important;padding-left:10px !important;padding-right:0px !important;}
</style>


<style lang='less' scoped>
    .reportSearch{
        width:100%;
        height:100%;
        overflow:hidden;
        .top-part{
            width:100%;
            background-color:white;
            padding:10px 10px;
            .el-form{
                .el-form-item{
                    width: 19%;
                    margin-bottom: 2px;
                    margin-right: 0px !important;
                    .el-date-editor.el-input{width:100% !important;}                    
                    .btn-other img{width:15px;height:15px;}
                }
            }
        }
        .bottom-part{
            background-color: #fff;
            padding:10px 10px;
            height:calc(100% - 160px) !important;
            box-sizing: border-box;
            overflow-y: auto;
            .el-row {
                width:92%;
                margin:0 auto;
                text-align:center;
                line-height:30px;
                font-size:14px;
                .title{
                    height:50px;
                    border:1px solid black;
                    line-height:50px;
                    background-color:#b6caea;
                    font-size:16px;
                    letter-spacing: 1px;
                }
                .common{          
                    border:1px solid black;
                    height:30px;
                }
                .grayBackground{
                    background-color:#e6e6e6;
                }
            }
            .colCss{
                cursor: pointer;
                &:hover{
                    background-color:#f5f7fa;
                }
                &.active{
                    background-color: #f0f7ff;
                }
            }
        }
    }
</style>



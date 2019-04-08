<template>
    <div class="addBorrowOrder">
        <div class="top">
            <div class="btn-box">
                <el-button type="danger">作废</el-button>
                <el-button type="warning">发邮件</el-button>
                <el-button type="success">发微信</el-button>
                <el-button type="primary">发QQ</el-button>
                <div class="btn-group">
                    <el-button type="info">刷新</el-button>            
                    <el-button type="danger">删除</el-button>
                    <el-button type="primary">保存</el-button>
                    <el-button type="success">补单</el-button>
                    <el-button type="warning" @click="checkPage">审核</el-button>
                    <el-button type="primary">附件</el-button>
                    <!-- <el-button type="info">模板</el-button> -->
                    <el-dropdown>
                        <el-button type="info" size="medium">
                            模板<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="importMoudle">导入模板</el-dropdown-item>
                            <el-dropdown-item @click.native="saveMoudle">存为模板</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="info" style="margin-left:10px">打印标准凭证</el-button>
                    <el-button-group class="btn-other">
                        <el-button title="导出">
                            <img src="../../../assets/images/export.png" alt="" style="width:15px;height:15px">
                        </el-button>
                        <el-button title="导入">
                            <el-upload class="upload-demo" :action="$url + ''" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
                                <img src="../../../assets/images/import.png" alt="" style="width:15px;height:15px">
                            </el-upload>
                        </el-button>                        
                        <el-button title="打印">
                            <img src="../../../assets/images/print.png" alt="" style="width:15px;height:15px">
                        </el-button>
                        <el-button title="帮助">
                            <img src="../../../assets/images/help.png" alt="" style="width:15px;height:15px">
                        </el-button>
                    </el-button-group>
                </div>
            </div>
        </div>
        <div class="bottom-part" style="margin-top:10px">
            <div class="company">{{$store.state.companyName}}</div>
            <h3>借款单</h3>
            <el-row style="margin-top:3px">
                <el-col :span="3">
                    <div>单据编号</div>               
                </el-col>
                <el-col :span="4">
                    <div>{{formData.receiptNumber}}</div>
                </el-col>
                <el-col :offset="11" :span="2">
                    <div>制单日期</div>
                </el-col>
                <el-col :span="4">
                    <div>{{formData.borrowTime}}</div>
                </el-col>
            </el-row>
            <div class="scroll_part">
            <el-row style="margin-top:3px">
                <el-col :span="3">
                    <div class="common">事业部</div>               
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.businessUnit}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">中心</div>
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.centre}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">部门</div>
                </el-col>
                <el-col :span="4">
                    <div class="common grayBackground">{{formData.dept}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">姓名</div>
                </el-col>
                <el-col :span="3">
                    <div class="common grayBackground">{{formData.name}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common">借款类别</div>               
                </el-col>
                <el-col :span="4">
                    <div class="common">
                        <el-input v-model="loanName" readonly @click.native="showBorrowTemplate" placeholder="借款类别"></el-input>
                        <el-input v-model="formData.loanCategory" readonly style="display:none;"></el-input>
                    </div>                    
                    <!-- <div class="common" @click="showBorrowTemplate">{{formData.loanCategory}}</div> -->
                </el-col>
                <el-col :span="2">
                    <div class="common">币别</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">
                        <el-select v-model="formData.currency" placeholder="选择币别">
                            <el-option v-for="(items, index) in currencyList"  :label="items.name" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common">付款科目</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">
                        <el-select v-model="formData.paymentSubjects">
                            <el-option label="库存现金" value="库存现金"></el-option>
                            <el-option label="银行存款" value="银行存款"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common">借款余额</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">{{formData.loanBalance}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common">预计还款时间</div>               
                </el-col>
                <el-col :span="4">
                    <div class="common">
                        <el-date-picker
                        v-model="formData.expectedRepaymentDate"
                        type="date" 
                        format="yyyy 年 MM 月 dd 日" placeholder="选择时间"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="common" style="border-bottom-color:transparent">收款</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">银行户主</div>
                </el-col>
                <el-col :span="5">
                    <div class="common">
                        <el-select v-model="formData.householderIncome" placeholder="银行户主" clearable :disabled="canOr">
                            <el-option v-for="(items, index) in householderIncomeList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="common" style="border-bottom-color:transparent">付款</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">银行户主</div>
                </el-col>
                <el-col :span="6">
                    <div class="common">
                        <el-select v-model="formData.householderPay" placeholder="银行户主" clearable disabled>
                            <el-option v-for="(items, index) in payBank"  :label="items.name" :value="items.name" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common" style="border-bottom-color:transparent">借款人员</div>               
                </el-col>
                <el-col :span="1">
                    <div class="common">手机</div>               
                </el-col>
                <el-col :span="3">
                    <div class="common">
                        <el-input v-model="formData.phone"></el-input>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="common" style="border-bottom-color:transparent;border-top-color:transparent;">银行</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">开户银行</div>
                </el-col>
                <el-col :span="5">
                    <div class="common">
                        <el-select v-model="formData.bankIncome" placeholder="开户银行" clearable :disabled="canOr">
                            <el-option v-for="(items, index) in bankIncomeList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="common" style="border-bottom-color:transparent;border-top-color:transparent;">银行</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">开户银行</div>
                </el-col>
                <el-col :span="6">
                    <div class="common">
                        <el-select v-model="formData.bankPay" placeholder="开户银行" clearable disabled>
                            <el-option v-for="(items, index) in payBank"  :label="items.bankName" :value="items.bankName" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common" style="border-top-color:transparent">联系方式</div>               
                </el-col>
                <el-col :span="1">
                    <div class="common">内线</div>               
                </el-col>
                <el-col :span="3">
                    <div class="common">
                        <el-input v-model="formData.interiorWiring"></el-input>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="common" style="border-top-color:transparent">信息</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">银行账号</div>
                </el-col>
                <el-col :span="5">
                    <div class="common">
                        <el-select v-model="formData.bankAccountIncome" placeholder="银行账号" clearable :disabled="canOr">
                            <el-option v-for="(items, index) in bankAccountIncomeList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="common" style="border-top-color:transparent">信息</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">银行账号</div>
                </el-col>
                <el-col :span="6">
                    <div class="common">
                        <el-select v-model="formData.bankAccountPay" placeholder="银行账号" clearable :disabled="canOr" @change="payChange">
                            <el-option v-for="(items, index) in payBank"  :label="items.accountNumber" :value="items.accountNumber" :key="index"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common bigHeight">借款事由</div>
                </el-col>
                <el-col :span="14">
                    <div class="common bigHeight">
                        <el-input
                        type="textarea"
                        placeholder="输入借款事由"
                        v-model="formData.borrowingReason">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="common bigHeight">
                        <el-row style="width:100%">
                            <el-col :span="24">
                                <div class="common" style="border-top-color:transparent;border-left-color:transparent;border-right-color:transparent;">声明</div>
                            </el-col>                            
                        </el-row>
                        <el-row style="width:100%">
                            <el-col :span="24">
                                <div class="commona" style="border-bottom-color:transparent">本借款超过预计还款日期,或报销冲借款后有借款余额，同意从本人工资中扣除。</div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="common">借款大写金额</div>               
                </el-col>
                <el-col :span="9">
                    <div class="common grayBackground">{{formData.amountBig}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">制单金额</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">
                        <!-- onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value=''; -->
                        <el-input v-model="formData.voucherAmount" @change="changeMoney" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"></el-input>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common">审批金额</div>
                </el-col>
                <el-col :span="4">
                    <div class="common">{{formData.approvalAmount}}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common grayBackground">直接主管</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">张三</div>
                </el-col>
                <el-col :span="2">
                    <div class="common grayBackground">间接主管</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">李四</div>
                </el-col>
                <el-col :span="2">
                    <div class="common grayBackground">财务主管</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">王五</div>
                </el-col>
                <el-col :span="2">
                    <div class="common grayBackground">财务经理</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">赵六</div>
                </el-col>
                <el-col :span="2">
                    <div class="common grayBackground">财务总监</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">小明</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleBlue"></div>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleBlue"></div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleBlue"></div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleRed"></div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleNull"></div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common grayBackground">副总经理</div>
                </el-col>
                <el-col :span="2">
                    <div class="common">张总</div>
                </el-col>
                <el-col :span="2">
                    <div class="common grayBackground">总经理</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">李总</div>
                </el-col>
                <el-col :span="2">
                    <div class="common grayBackground">董事长</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">王总</div>
                </el-col>
                <el-col :span="2">
                    <div class="common grayBackground">出纳</div>
                </el-col>
                <el-col :span="3">
                    <div class="common">小红</div>
                </el-col>
                <el-col :span="2">
                    <div class="common"></div>
                </el-col>
                <el-col :span="3">
                    <div class="common"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleNull"></div>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleNull"></div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleNull"></div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        <div class="cirleNull"></div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common displayFlex">
                        <img src="../../../assets/images/gobackto.png" alt="">
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="common displayFlex">
                        
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="common displayFlex">
                        
                    </div>
                </el-col>
            </el-row>
            <dir>附件</dir>
            </div>
        </div>
    </div>
</template>

<script>
var nzhcn = require("nzh/cn"); //直接使用简体中文
export default {
    data(){
        return{
            canOr:false,
            formData:{                                              //新增单据数据
                borrowTime:'',
                receiptNumber:'',
                businessUnit:'',
                centre:'',
                dept:'',
                name:'',
                loanCategory:'',
                currency:'',
                paymentSubjects:'银行存款',
                loanBalance:'',
                expectedRepaymentDate:'',
                phone:'',
                interiorWiring:'',
                householderIncome:'',
                bankIncome:'',
                bankAccountIncome:'',
                householderPay:'',
                bankPay:'',
                bankAccountPay:'',
                borrowingReason:'',
                voucherAmount:'',
                approvalAmount:'',
                amountBig:'',
            },
            currencyList:[],                                        //币别下拉框
            householderIncomeList:[],                               //银行户主
            bankIncomeList:[],                                      //开户银行   
            bankAccountIncomeList:[],                               //银行账号
            payBank:[],                                             //付款银行
            loanList:this.$store.state.borrowOrderStore.loanName,   //借款类别
            loanName:'',                                          
        }
    },
    watch:{
        "formData.paymentSubjects"(newVal) {                    //付款方式是否为库存现金
            if(newVal == '库存现金'){
                this.canOr = true;
                this.formData.accountNumber = "";
                this.formData.householderPay = "";
                this.formData.bankPay = "";
                this.formData. bankAccountPay = "";
                this.formData.householderIncome = "";
                this.formData.bankIncome = "";
            }else{
                this.canOr = false;
            }
        },
        "formData.voucherAmount"(newVal) {                      //制单金额
            if(newVal){
                // if(!(/^[0-9]+$/).test(newVal)){
                    // this.$message({type:'error',message:'只能输入数字',duration:2000})
                    // this.formData.voucherAmount = "";
                // }else{
                    var str = this.formData.voucherAmount;
                    var resultStr = this.formData.voucherAmount.replace(/\,/ig,''); //去掉千分号
                    this.formData.amountBig = nzhcn.toMoney(resultStr,{outSymbol:false});     //转中文金额
                    this.formData.approvalAmount = newVal;
                // }
                
            }else{
                this.formData.amountBig = "";
                this.formData.approvalAmount = "";
            }
        },
        loanList(){
            if(this.loanList.length > 0){
                this.loanName = this.loanList[0][0]['loanCategory']
                this.formData.loanCategory = this.loanList[0][0]['id']
            }
        }
    },
    methods:{
        changeMoney(res){
            this.formData.voucherAmount = this.numberRules(parseInt(res));
        },
        numberRules(a){                     //两位小数和千分号(a为number类型)
            a = a.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            return a;
        },
        importExcelSuccess(){                       //导入成功

        },
        showBorrowTemplate(){                       //借款类别页面
            this.$util.openLayerIframe('借款单-借款类别', 17, '80%', '80%', this.$domain + '/#/borrowOrder/loan');
        },
        getCurrencyList(){                          //币别下拉框
            this.$http.get(this.$url + 'currency/findAllByState').then(res => {
                if(res.data.code == 20001) {
                    this.currencyList = res.data.data;
                    this.formData.currency = '人民币';
                }
            })
        },
        getPayBankInformation(){                    //付款银行下拉框
            this.$http.get(this.$url + 'borrowingForm/findAuxiliaryInfoBank').then(res => {
                if(res.data.code == 20001) {
                    this.payBank = res.data.data;
                    this.formData.householderPay = this.payBank[0]['name'];
                    this.formData.bankPay = this.payBank[0]['bankName'];
                    this.formData.bankAccountPay = this.payBank[0]['accountNumber'];
                }
            })
        },
        payChange(res){                             //付款银行账号改变时触发的函数
            if(res){
                for(let i = 0; i<this.payBank.length; i++){
                    if(res == this.payBank[i]['accountNumber']){
                        this.formData.householderPay = this.payBank[i]['name'];
                        this.formData.bankPay = this.payBank[i]['bankName'];
                    }                        
                }
            }else{
                this.formData.accountNumber = "";
                this.formData.householderPay = "";
                this.formData.bankPay = "";
            }            
        },
        checkPage(){                                //审核页面
            this.$util.openLayerIframe('借款单-审核', 15, '430px', '550px', this.$domain + '/#/borrowOrder/examine');
        },
        importMoudle(){                             //导入模板
            this.$util.openLayerIframe('借款单-导入模板', 15, '900px', '500px', this.$domain + '/#/borrowOrder/importMoudle');
        },
        saveMoudle(){                               //存为模板
            this.$util.openLayerIframe('借款单-存为模板', 15, '900px', '500px', this.$domain + '/#/borrowOrder/saveMoudle');
        },
        getTime(){                                  //制单时间
            var time = new Date();
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            if(month > 0 && month < 10 ){
                month = '0' + month;
            }
            let day = time.getDate();
            if(day >0 && day<10){
                day = '0' + day;
            }
            let all = year + '-' + month + '-' + day;
            this.formData.borrowTime = all;
        },
        getData(){                                  //获取基础资料信息
            this.$http.get(this.$url + 'borrowingForm/loadBorrowingFormVO').then(res => {
                if(res.data.code == 20001) {
                    let data = res.data.data;
                    this.formData.centre = data.centre;
                    this.formData.dept = data.dept;
                    this.formData.businessUnit = data.businessUnit;
                    this.formData.name = data.name;
                    this.formData.phone = data.phone;
                }
            })
        }
    },
    mounted(){
        this.getCurrencyList()
        this.getPayBankInformation()
        this.getData()
        this.getTime()
    }
}
</script>

<style>
    .addBorrowOrder .bottom-part {height:calc(100% - 60px) !important;}
    .addBorrowOrder .bottom-part .el-input__inner {padding:6px 0 6px 0px !important;text-align: center;}
    .addBorrowOrder .el-icon-date:before {content: "";}
    .addBorrowOrder .el-input__inner,.addBorrowOrder .el-input__inner:focus{border: none;box-sizing: border-box;color:#333}
    .addBorrowOrder .el-input.is-disabled .el-input__inner{color:black !important}
    .addBorrowOrder .el-input__icon {line-height:20px !important}
    .addBorrowOrder .el-textarea, .addBorrowOrder .el-textarea__inner {height:100%;}
    .addBorrowOrder .el-textarea__inner,.addBorrowOrder .el-textarea__inner:focus{border: none;box-sizing: border-box;color:#333}
</style>


<style lang="less" scoped>
    .addBorrowOrder{
        height:100%;
        width:100%;
        overflow:hidden;
        .company{
            margin-bottom:5px;
        }
        .company,h3{
            text-align:center;
        }
        .scroll_part{
            height:calc(100% - 75px) !important;
            overflow-y:auto;
        }
        .top{
            background-color: #fff;
            padding:10px 10px;
            height:52px;
            box-sizing: border-box;
            overflow: hidden;
            .el-button {padding: 8px 8px;}
            .el-date-editor.el-input {width:120px !important}
            .sousuoa{margin-left:10px;width: 10%;}
            .el-dropdown{margin-left:10px;}
        }
        .bottom-part {
            background-color: #fff;
            padding:10px 10px;
            height:100%;            
            box-sizing: border-box;
            .el-row {
                width:90%;
                margin:0 auto;
                text-align:center;
                line-height:30px;
                font-size:14px;
                .common{          
                    border:1px solid black;
                    height:30px;
                    .el-date-editor.el-input {width:100% !important;}
                    .el-select{width:100%}
                }
                .commona{
                    height:30px;
                }
                .grayBackground{
                    background-color:#e6e6e6;
                }
                .bigHeight{
                    height:90px !important;
                    line-height:90px !important;
                }
                .displayFlex{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            } 
            .el-row:last-of-type{
                margin-bottom:10px;
            }           
        }
        .cirleBlue{
            width: 15px;
            height: 15px;
            border: 1px solid #000;
            border-radius: 50px;
            background: #409eff;
        }
        .cirleRed{
            width: 15px;
            height: 15px;
            border: 1px solid #000;
            border-radius: 50px;
            background: #f56c6c;
        }
        .cirleNull{
            width: 15px;
            height: 15px;
            border: 1px solid #000;
            border-radius: 50px;
        }
    }
</style>



<template>
    <div class="addBorrow">
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
                    <el-button type="warning" @click="audit">审核</el-button>
                    <el-button type="primary">附件</el-button>
                    <el-button type="info">打印标准凭证</el-button>
                    <el-button-group class="btn-other">
                        <el-button title="导出">
                            <img src="../../../assets/images/export.png" alt="" style="width:15px;height:15px">
                        </el-button>
                        <el-button title="导入">
                            <el-upload class="upload-demo" :action="$url + ''" :show-file-list="false" multiple style="display: inline-block;">
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
            <h3>费用报销单</h3>
            <div class="fyDocumentsBox">
                <el-row style="margin-top:5px">
                    <el-col :span="3">
                        <div>报销年月</div>               
                    </el-col>
                    <el-col :offset="1" :span="2">
                        <div>
                            <el-date-picker
                            class="foryeasClass"
                            v-model="forYeas"
                            type="month"
                            placeholder="选择月"
                            format="yyyy 年 MM 月"
                            :editable="false"
                            value-format="yyyy-MM"
                            :picker-options="pickerOptions0">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :offset="4" :span="3">
                        <div>制单日期</div>
                    </el-col>
                    <el-col :span="3">
                        <div>{{formData.billsDate}}</div>
                    </el-col>
                    <el-col :span="3">
                        <div>单据编号</div>
                    </el-col>
                    <el-col :span="2">
                        <div>{{formData.docCode}}</div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px">
                    <el-col :span="3">
                        <div class="common">事业部</div>               
                    </el-col>
                    <el-col :span="4">
                        <div class="common grayBackground">{{formData.BU}}</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common">中心</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common grayBackground">{{formData.center}}</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common">部门</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common grayBackground">{{formData.deparment}}</div>
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
                        <div class="common">往来上上级科目</div>               
                    </el-col>
                    <el-col :span="4">
                        <div class="common grayBackground">为空</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common">往来上级科目</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common grayBackground">{{}}</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common">往来末级科目</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common grayBackground" style="cursor:pointer" @click="showLevelCourse">{{formData.map.name}}</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="common">借款余额</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common grayBackground">自动显示</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="common" style="text-align:left;padding-left:10px">
                            <div style="display: inline-block;">费用报销单明细信息：</div>
                            <div style="display: inline-block;">
                                <el-button type="primary" size="mini" @click="addRow">新增</el-button>
                                <el-button type="danger" size="mini">删除</el-button>
                                <el-dropdown trigger="click" @command="handleCommand">
                                    <el-button size="mini" type="info">
                                        模板<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="importTemplate">导入模板</el-dropdown-item>
                                        <el-dropdown-item command="saveTemplete">存为模板</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="tableElRow">
                    <el-col :span="24" class="tableElCol">
                        <div class="table">
                            <el-table :data="tableData" border>
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column property="data" label="业务日期" width="150" class="dataBox">
                                    <template slot-scope="scope">
                                        <el-date-picker
                                        v-model="scope.row.data"
                                        type="date"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column property="shixiang" label="报销事项">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.shixaing" @click.native="showReimbursementMatters" placeholder="选择报销事项"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column property="zhaiyao" label="摘要" width="200">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.zhaiyao" placeholder="输入摘要"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column property="zhidanmoney" label="制单金额">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.zhidanmoney" placeholder="输入制单金额"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column property="shenpimoney" label="审批金额">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.shenpimoney" readonly ></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column property="fujian" label="附件数">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.fujian"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column type="expand" label="更多" width="80">
                                    <template slot-scope="scope">
                                        <el-form label-position="left" inline class="demo-table-expand">
                                            <el-form-item label="一级科目">
                                                <span>{{scope.row.yiji}}</span>
                                            </el-form-item>
                                            <el-form-item label="二级科目">
                                                <span>{{scope.row.erji}}</span>
                                            </el-form-item>
                                            <el-form-item label="三级科目">
                                                <span>{{scope.row.sanji}}</span>
                                            </el-form-item>
                                            <el-form-item label="四级科目">
                                                <span>{{scope.row.moji}}</span>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">
                        <div class="common grayBackground">金额大写</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="common grayBackground">
                            <span>{{moneyMax}}</span>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="common grayBackground">金额小写</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common">
                            <el-input v-model="moneySmall"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="common grayBackground">实际应付</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="common"></div>
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
                <!--附件下载模块-->
                <!-- <div class="remarkBox">
                    <div class="remarkContent">
                        <div>2019-03-18  12:00  赵凯文：提交审核</div>
                        <div>
                            <span>12321asdfajsdklfjkliuafsjdkfajdslfa(314.9k)</span>
                            <a href="##">查看</a>
                            <a href="##">下载</a>
                        </div>
                    </div>
                    <div class="remarkContent">
                        <div>2019-03-18  12:00  赵凯文：提交审核</div>
                        <div>
                            <span>12321asdfajsdklfjkliuafsjdkfajdslfa(314.9k)</span>
                            <a href="##">查看</a>
                            <a href="##">下载</a>
                        </div>
                    </div>
                    <div class="remarkContent">
                        <div>2019-03-18  12:00  赵凯文：提交审核</div>
                        <div>
                            <span>12321asdfajsdklfjkliuafsjdkfajdslfa(314.9k)</span>
                            <a href="##">查看</a>
                            <a href="##">下载</a>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
var nzhcn = require("nzh/cn"); //直接使用简体中文
export default {
    data(){
        return{
            formData: this.$store.state.expenseFormStore.expenseOrderAdd,//新增默认显示的数据
            forYeas: '',//报销年月
            pickerOptions0: {//限制报销年月的选择范围，只能选择制单日期当天及之后的日期
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }, 
            tableData: [            //表格数据
                {
                    data: '',
                    shixiang: '车费',
                    zhaiyao: '打滴',
                    zhidanmoney:'100.00',
                    shenpimoney:'100.00',
                    fujian:'1',
                    yiji: '自动显示',
                    erji: '自动显示',
                    sanji: '自动显示',
                    moji: '自动显示'
                },
                {
                    data: '',
                    shixiang: '车费',
                    zhaiyao: '打滴',
                    zhidanmoney:'100.00',
                    shenpimoney:'100.00',
                    fujian:'1',
                    yiji: '自动显示',
                    erji: '自动显示',
                    sanji: '自动显示',
                    moji: '自动显示'
                },
                {
                    data: '',
                    shixiang: '车费',
                    zhaiyao: '打滴',
                    zhidanmoney:'100.00',
                    shenpimoney:'100.00',
                    fujian:'1',
                    yiji: '自动显示',
                    erji: '自动显示',
                    sanji: '自动显示',
                    moji: '自动显示'
                }
            ],
            moneySmall: '300.00',         //金额小写
            moneyMax: '',           //金额大写
        }
    },
    watch: {
        moneySmall(newVal){
            if(newVal){
                var str = this.moneySmall;
                var resultStr = this.moneySmall.replace(/\,/ig,'');//去掉千分号
                this.moneyMax = nzhcn.toMoney(resultStr,{outSymbol:false});//转中文金额
            }
        },
    },
    methods:{
        showLevelCourse(){              //显示往来末级科目弹窗
            this.$util.openSubLayerIframe('选择往来末级科目', 13, '500px', '350px', this.$domain + '/#/expenseOrder/addRow/levelCourse');
        },
        showReimbursementMatters(){     //显示报销事项弹窗
            this.$util.openSubLayerIframe('选择报销事项', 13, '80%', '90%', this.$domain + '/#/expenseOrder/addRow/reimbursementMatters');
        },
        audit(){                        //审核
            this.$util.openSubLayerIframe('审核单据（直接主管）', 13, '35%', '87%', this.$domain + '/#/expenseOrder/addRow/audit');
        },
        handleCommand(command) {        //模板
            if(command == 'importTemplate'){
                this.$util.openSubLayerIframe('导入模板', 13, '85%', '70%', this.$domain + '/#/expenseOrder/addRow/importTemplate');
            }else{
                this.$util.openSubLayerIframe('存为模板', 13, '85%', '35%', this.$domain + '/#/expenseOrder/addRow/saveTemplate');
            }
        },
        addRow(){                       //表格新增
            this.tableData.push({data: '',shixiang: '',zhaiyao: '',zhidanmoney:'',shenpimoney:'',fujian:'',yiji: '',erji: '',sanji: '',moji: ''});
        },
    },
    mounted(){
        this.$store.dispatch('expenseFormStore/getObjectData', this.$url + 'expenseAccount/findParentTree?id='+ this.formData.map['id']);
        if(this.formData){
            let dateStr = this.formData['billsDate'];
            let reg = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/;
            let forData = dateStr.match(reg);
            this.forYeas = RegExp.$1 + '年' + RegExp.$2 + '月'
        }
    }
}
</script>
<style lang="less">
.addBorrow{
    .bottom-part{
        .el-button--mini{padding: 4px 10px !important;}
        .tableElRow{
            height: calc(100% - 296px) !important;
            .tableElCol{
                height: 100% !important;
            }
        }
        .fyDocumentsBox{
            height: calc(100% - 115px) !important;
            overflow-y: auto !important;
            .remarkBox{
                width: 90%;
                margin: 0 auto;
                .remarkContent > div{
                    display: inline-block;
                    font-size: 12px;
                    font-weight: normal;
                    letter-spacing: 1px;
                    color: #424242;
                    margin: 3px 0px;
                }
                .remarkContent > div:nth-of-type(2){
                    float: right;
                }
            }
            .table{
                border:1px solid black;
                margin:0 auto;
                .el-table {
                    tr {
                        height: 32px !important;
                        line-height: 32px !important;
                    }
                    th>.cell{
                        text-align: center;
                    }
                    th.is-leaf{
                        border-bottom: 1px solid #000000 !important;
                        background: #e6e6e6 !important;
                        font-weight: 100 !important;
                        color: #333 !important;
                    }
                    .cell{
                        text-align: center !important;
                        height: 100%;
                    }
                }
                .el-table__body-wrapper {
                    height: calc(100% - 32px) !important;
                    overflow-y: auto;
                }
                .el-table--enable-row-transition .el-table__body td{
                    padding: 0px !important;
                    .cell{
                        padding: 0px !important;
                        .el-input__inner{
                            padding: 8px 30px !important;
                            border-radius: 0px !important;
                        }
                    }
                }
                .demo-table-expand label {
                    width: 90px;
                    color: #99a9bf;
                }
                .demo-table-expand .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 23%;
                }
                .el-date-editor.el-input{
                    width: 100%;
                }
                .el-input--prefix .el-input__inner{
                    padding: 8px 30px !important;
                }
                .el-input__icon{
                    line-height: 20px !important;
                }
            }
            .foryeasClass{
                width: 150px !important;
                margin-left: -30px;
                .el-input__inner{
                    padding: 5px 30px !important;
                    border: 0px !important;
                }
                .el-input__icon{
                    line-height: 20px !important;
                }
            }
        }
    }
    .btn-box{
        .el-button { padding: 6px 8px !important;}
        .btn-other{
            .el-button {padding: 5px 8px !important;}
        }
    }
}
</style>


<style lang="less" scoped>
.addBorrow{
    height:100%;
    width:100%;
    overflow:hidden;
    .company{
        margin-bottom:5px;
    }
    .company,h3{
        text-align:center;
    }
    .top{
        min-width: 1056px;
        background-color: #fff;
        padding:8px 10px;
        padding-bottom:0px;
        height:46px;
        box-sizing: border-box;
        overflow: hidden;
        .el-date-editor.el-input {width:120px !important}
        .sousuoa{margin-left:10px;width: 10%;}
    }
    .bottom-part {
        min-width: 1056px;
        background-color: #fff;
        padding:10px 10px;
        padding-bottom:0px;
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
            }
            .displayFlex{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .grayBackground{
                background-color:#e6e6e6;
            }
        }
    }
    .cirleBlue{
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        border-radius: 50px;
        background: #409eff;
    }
    .cirleRed{
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        border-radius: 50px;
        background: #f56c6c;
    }
    .cirleNull{
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        border-radius: 50px;
    }
}
</style>



<template>
    <div>
        <div class="subsidiaryLedger">
            <!-- 按钮组 -->
            <div class="block-area">
                <div class="btn-box">
                    <el-input class="sousuo-input" placeholder="输入搜索内容" v-model.trim="searchText" @keyup.enter.native="search"></el-input>
                    <el-button type="primary" class="sousuo" @click="search">查询</el-button>
                    <div class="btn-group">
                        <el-button type="info" @click="refData">刷新</el-button>
                        <el-button type="primary" v-if="radioState == 1" disabled>新增</el-button>
                        <el-button type="primary" v-else @click="addBankRow">新增</el-button>
                        <el-button type="primary" v-if="radioState == 1" disabled>删除</el-button>
                        <el-button class="orange" v-else @click.native.prevent="deleteRow(subSidiaryRowId)">删除</el-button>
                        <el-button type="primary" v-if="radioState == 1" disabled>保存</el-button>
                        <el-button type="primary" v-else @click="saveSubsidiary">保存</el-button>
                        <el-button-group class="btn-other">
                            <el-button title="导出" @click="exportExal">
                                <img src="../../../assets/images/export.png" alt="">
                            </el-button>
                            <el-button title="打印">
                                <img src="../../../assets/images/print.png" alt="">
                            </el-button>
                            <el-button title="帮助">
                                <img src="../../../assets/images/help.png" alt="">
                            </el-button>
                        </el-button-group>
                    </div>
                </div>
                    <!-- 表格数据 -->
                <div class="table">
                    <el-table :data="subsidiary1Row" border @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu" class="tb-edit" highlight-current-row>
                        <el-table-column type="selection" fixed></el-table-column>
                        <el-table-column property="account" label="账户名">
                            <template slot-scope="scope">
                                <el-input size="small" type="text" v-model="scope.row.account" @focus="focus($event)" readonly @click.native="getBankData(scope.$index)" placeholder="输入名称"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column property="bankName" label="开户行">
                            <template slot-scope="scope">
                                <el-input size="small" type="text" v-model="scope.row.bankName" readonly></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column property="bankNumber" label="银行账号">
                            <template slot-scope="scope">
                                <el-input size="small" type="text" v-model="scope.row.bankNumber" readonly ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column property="money" label="金额">
                            <template slot-scope="scope">
                                    <el-input size="small" type="number" @focus="focus($event)" v-model="scope.row.money" placeholder="输入金额"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column property="bankId" label="id" class="numberTr" width="1">
                            <template slot-scope="scope">
                                <el-input size="small" type="text" v-model="scope.row.bankId"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[3,5,6,7,8,9,10,11]" class="menuBox" @emitFn="emitFn" />
    </div>
</template>
<script>
    /**
     * Author: 赵巧芬
     * Date: 2019-3
     * Description: 明细账组件
    */
    import MenuBox from '../../MenuBox'
    export default {
        components: {
            'v-menu-box': MenuBox,
        },
        data() {
            return {
                searchText: '',                     //搜索文本
                multipleSelection: [],              //选中的行数据集合
                rightMenu: {
                    isShowIconMove: false,      //是否显示上移、下移、置顶、置底 弹窗
                    rightKeyRow: {},        //右键点击存储的行
                    rightKeyRowIndex: '',       //右键点击表格行的索引
                },
                subsidiary1Row: this.$store.state.initializeStore.subsidiary1Data,                    //表格数据
                subSidiaryRowId:[],                 //选中表格当前行的id
                selectRowId:[],
                searchAllResultTwo: this.$store.state.initializeStore.searchAllResultTwo,           //明细账搜索
                radioState: '',                     //启用系统状态
                rowIndex: '',                       //点击明细账名称获取当前索引
                bankData: this.$store.state.initializeStore.bankObjData,                       //账户名弹窗里的表格数据
            }
        },
        watch: {
            bankData(){
                if(this.bankData.length > 0){
                    for(let i = 0;i < this.subsidiary1Row.length;i++){
                        //如果点击当前名称的索引与表格数据的索引一致
                        if(i == this.rowIndex){
                            //则将选中的名称赋给选中的表格数据
                            this.subsidiary1Row[i]['account'] = this.bankData[0]['name'];
                            this.subsidiary1Row[i]['bankName'] = this.bankData[0]['bankName'];
                            this.subsidiary1Row[i]['bankNumber'] = this.bankData[0]['accountNumber'];
                            this.subsidiary1Row[i]['bankId'] = this.bankData[0]['id'];
                        }
                    }
                }
            },
            //监听搜索框内容
            searchText(newVal) {
                if(!newVal) {
                    this.subsidiary1Row = this.$store.state.initializeStore.subsidiary1Data;
                }
            },
        },
        methods: {
            currency(moneyA){                       //过滤金额
                if (moneyA && moneyA != null) {
                    moneyA = String(moneyA);
                    var left = moneyA.split('.')[0], right = moneyA.split('.')[1];
                    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
                    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                    return (Number(moneyA) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
                    } else if (moneyA === 0) { // 注意===在这里的使用，如果传入的moneyA为0,if中会将其判定为boolean类型，故而要另外做===判断
                    return '0.00';
                    } else {
                    return '';
                }
            },
            emitFn(n) {                            //响应子组件传过来的函数
                switch(n) {
                    case 1:         //刷新
                        this.refData();
                        break;
                    case 2:         //新增
                        this.addRow();
                        break;
                    case 3:         //删除
                        this.deleteSingleRow(this.rightMenu['rightKeyRow']['id']);
                        break;
                    default: break;
                }
            },
            rowContextmenu(row, event) {           //某一行右键点击时触发
                event.preventDefault();     //禁止默认事件
                this.rightMenu['isShowIconMove'] = true;
                this.rightMenu['rightKeyRow'] = row;
                var menuBox = document.querySelector(".menuBox");
                let x = event.clientX,
                    y = event.clientY,
                    w = $('.subsidiaryLedger').outerWidth(true) - $(menuBox).outerWidth(true),
                    h = $('.subsidiaryLedger').outerHeight(true) - $(menuBox).outerHeight(true);
                if(x <= 0) x = 0;
                if(x >= w) x = w;
                if(y <= 0) y = 0;
                if(y >= h) y = h;
                menuBox.style.left = x + 'px';
                menuBox.style.top = y + 'px';
                for(var i = 0; i < this.subsidiary1Row.length; i++) {
                    if(this.subsidiary1Row[i]['id'] == row['id']) {
                        this.rightMenu['rightKeyRowIndex'] = i;
                    }
                }
            },
            handleSelectionChange(val) {            //点击表格选中触发
                this.multipleSelection = val;
                this.subSidiaryRowId = [];
                this.selectRowId = [];
                for(var i = 0; i < this.multipleSelection.length; i++) {
                    this.selectRowId.push(this.multipleSelection[i]['id']);
                    this.subSidiaryRowId.push(this.multipleSelection[i]['id']);
                }
            },
            focus(event) {                          //得到焦点选中
                event.currentTarget.select();
            },
            refData(){                              //刷新
                this.$store.dispatch('initializeStore/getSubsidiary1Data', this.$url + 'betweenObjectBank/selectObjectById?subejctId='+this.$store.state.initializeVal[0]['id']);
            },
            deleteRow($id) {                        //批量删除
                if(this.multipleSelection.length > 0) {
                    this.$confirm('确定删除该条数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var type = {
                            headers: {
                                'Content-type': 'application/json;charset=UTF-8'
                            }
                        }
                        this.$http.post(this.$url + 'betweenObjectBank/batchDeleteObject', JSON.stringify(this.subSidiaryRowId), type).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '删除成功', type: 'success', duration: 2000});
                                this.$store.dispatch('initializeStore/getSubsidiary1Data', this.$url + 'betweenObjectBank/selectObjectById?subejctId='+this.$store.state.initializeVal[0]['id']);
                                setTimeout(() => {
                                    this.getMoneySum(this.$store.state.initializeStore.subsidiary1Data);
                                    this.$store.state.initializeVal[0]['parent'].money = 0;
                                    this.$store.commit('initializeStore/computedMoneySum', this.$store.state.initializeVal[0]['parent'])
                                },500);
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    })
                }else{
                    this.$message({message: '请先选择你要删除的数据', type: 'warning'});
                }
            },
            deleteSingleRow($id) {                  //删除单条明细
                this.$confirm('确定删除该条数据？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    //开始求删除
                    this.$http.post(this.$url + 'betweenObjectBank/batchDeleteObject', JSON.stringify([$id]), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '删除成功', type: 'success', duration: 2000});
                            this.$store.dispatch('initializeStore/getSubsidiary1Data', this.$url + 'betweenObjectBank/selectObjectById?subejctId='+this.$store.state.initializeVal[0]['id']);
                            setTimeout(() => {
                                this.getMoneySum(this.$store.state.initializeStore.subsidiary1Data);
                                this.$store.state.initializeVal[0]['parent'].money = 0;
                                this.$store.commit('initializeStore/computedMoneySum', this.$store.state.initializeVal[0]['parent'])
                            },500);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                });
            },
            addBankRow(){                           //银行存款新增
                this.subsidiary1Row.push({name: '',bankName: '',accountNumber: '',money: ''})
            },
            getBankData(index){                     //账户名弹窗
                this.rowIndex = index;
                this.$util.openSubLayerIframe('选择辅助资料', 13, '60%', '85%', this.$domain + '/#/initialize/bankData');
            },
            getMoneySum(arr){                       //合计金额
                let moneySum = 0;
                if(arr.length > 0){
                    for(let i = 0;i < arr.length;i++){
                        if(arr[i]['money']){
                            moneySum += parseFloat(arr[i]['money']);
                        }
                    }
                    this.$store.commit('initializeStore/setSubSidiaryMoneySum', moneySum)
                }
            },
            saveSubsidiary(){                       //明细账保存
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(this.subsidiary1Row.length > 0){
                    let Arr = this.subsidiary1Row.map(obj => {
                        return {
                            subjectId: this.$store.state.initializeVal[0]['id'],
                            bankId: obj['bankId'],
                            money: obj['money'],
                        }
                    });
                    this.$http.post(this.$url + 'betweenObjectBank/saveObject', JSON.stringify(Arr), type).then(res => {
                        if(res.data.code == 20001){
                            this.$message({message: '保存成功', type: 'success'});
                            setTimeout(() => {
                                this.$store.dispatch('initializeStore/getSubsidiary1Data', this.$url + 'betweenObjectBank/selectObjectById?subejctId='+this.$store.state.initializeVal[0]['id']);
                            });
                            this.getMoneySum(this.subsidiary1Row);
                            this.$store.state.initializeVal[0]['parent'].money = 0;
                            this.$store.commit('initializeStore/computedMoneySum', this.$store.state.initializeVal[0]['parent'])
                        }
                    });
                }else{
                    this.$message({message: '保存成功', type: 'success'});
                }
                
            },
            exportExal(){                           //导出
                if(this.multipleSelection.length > 0) {
                    var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                    this.$http.get(this.$url + 'betweenObjectBank/export',{params: { list: idSting }}).then(res => {
                        this.$message({message: '导出成功', type: 'success'});
                        window.location.href = this.$url + 'betweenObjectBank/export?list=' + idSting;          //导出时触发
                    }).catch(err => {
                        this.$message.error(err);
                    })
                } else {
                    this.$message({message: '选择你要导出的数据', type: 'warning', duration: 2000});
                }
            },
            search(){                               //搜索
                if(this.searchText) {
                    let newArr = [],
                        data = this.searchAllResultTwo,
                        searchText = this.searchText;
                    let reg = new RegExp(this.searchText, "g");
                    data.forEach(item => {
                        if(reg.test(item['account']) || reg.test(item['bankName']) || reg.test(item['bankNumber']) || (reg.test(item['money'])) || (item['toPinyinBankName'] && reg.test(item['toPinyinBankName'])) || (item['toPinyineAccount'] && reg.test(item['toPinyineAccount']))) {
                            newArr.push(item);
                        }
                    });
                    this.subsidiary1Row = newArr;
                }
            }
        },
        mounted() {
            //获取明细账数据
            this.$store.dispatch('initializeStore/getSubsidiary1Data', this.$url + 'betweenObjectBank/selectObjectById?subejctId='+this.$store.state.initializeVal[0]['id']);
            //获取银行账户所有数据
            this.$store.dispatch('initializeStore/getBankData',  {url: this.$url + 'auxiliaryInfoAllCategory/selectBank', id: this.$store.state.initializeStore.bankData[0]['id'], categoryId: this.$store.state.initializeStore.bankData[0]['dataCategoryId']});
            //判断启用系统是否是结束初始化
            if(localStorage.getItem('setRadio')){
                this.radioState = JSON.parse(localStorage.getItem('setRadio'))
            }else{
                this.radioState = 1
            }
        }
    }
</script>
<style lang='less'>
    .subsidiaryLedger{
        .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
            background-color: #409EFF !important;border-color: #409EFF !important;
        }
        .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
            border-color: #fff !important;
        }
        .el-table__body-wrapper {height: calc(100% - 41px) !important;overflow-y: auto !important;overflow-x: hidden;}
        .el-form-item__content .el-button {padding: 8px 10px !important;}
        // .tb-edit .el-input {
        //     display: none
        // }
        .tb-edit .current-row .el-input {
            display: block
        }
        .tb-edit .current-row .el-input+span {
            display: none
        }
        .el-input__icon{
            line-height: 35px !important;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
    }
</style>

<style scoped lang="less">
    .subsidiaryLedger {height: 100%;overflow: hidden;background-color: #fff;border-radius: 6px;min-width: 790px;}
    .subsidiaryLedger .table {height: calc(100% - 42px);}
    .addRowBlock, .updateRowBlock, .LookBlock {height: 260px;padding-top: 20px;}
    .subsidiaryLedger .block-area:nth-of-type(1) {
        height: calc(100% - 10px) !important;
    }
    @media screen and (max-width: 1250px) {
        .subsidiaryLedger .block-area:nth-of-type(1) {
            overflow-x: auto;
            white-space: nowrap;
        }
        .subsidiaryLedger .block-area:nth-of-type(1) .el-select,
        .subsidiaryLedger .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
        }
        .subsidiaryLedger .block-area:nth-of-type(1) .btn-group {
            margin-right: 0;
            float: right;
        }
    }
</style>
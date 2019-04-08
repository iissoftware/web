<template>
    <div>
        <div class="balanceType">
            <!-- 按钮组 -->
            <div class="block-area">
                <div class="btn-box">
                    <!-- <el-input class="sousuo-input" placeholder="输入搜索内容" v-model.trim="searchText" @keyup.enter.native="search"></el-input>
                    <el-button type="primary" class="sousuo" @click="search">查询</el-button> -->
                    <div class="btn-group">
                        <el-button type="info" @click="refInitialize">刷新</el-button>
                        <el-button type="primary" v-if="radioState == 1" disabled>保存</el-button>
                        <el-button type="primary" v-else @click="saveInitialia">保存</el-button>
                        <el-button type="primary" @click="balanceBtn">平衡</el-button>
                        <el-button type="success" @click="subsidiaryLedger($store.state.initializeVal[0])">明细账</el-button>
                        <el-button-group class="btn-other">
                            <el-button title="导出" @click="exportExcel">
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
                    <tree-table :data="data" :columns="columns" class="tb-edit" highlight-current-row>
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop="isJie" label="借/贷" width="60">
                            <template slot-scope="scope">
                                <span v-if="(scope.row.code.split('.')[0].length != 5 && scope.row.balanceDirection == 0) && (scope.row.code.split('.')[0].length != 3 && scope.row.balanceDirection == 0)">借</span>
                                <span v-if="(scope.row.code.split('.')[0].length != 5 && scope.row.balanceDirection == 1) && (scope.row.code.split('.')[0].length != 3 && scope.row.balanceDirection == 1)">贷</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="money" label="金额">
                            <template slot-scope="scope">
                                <div v-if="scope.row.name == '会计科目'">
                                    <span></span>
                                </div>
                                <div v-else-if="radioState == 1">
                                    <span>{{currency(scope.row.money)}}</span>
                                </div>
                                <div v-else-if="scope.row.betweenObject === 1">
                                    <span>{{currency(scope.row.money)}}</span>
                                </div>
                                <div v-else-if="scope.row.subAssertList.length === 0 && scope.row.betweenObject === 0">
                                    <el-input size="small" type="number" @focus="focus($event)" v-model="scope.row.money" placeholder="请输入金额" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                                    <span>{{currency(scope.row.money)}}</span>
                                </div>
                                <div v-else>
                                    <span>{{currency(scope.row.money)}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="betweenObject" label="明细账" width="80">
                            <template slot-scope="scope">
                                <div v-if="scope.row.betweenObject === 0">
                                    <el-checkbox disabled></el-checkbox>
                                </div>
                                <div v-else>
                                    <el-checkbox checked disabled></el-checkbox>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注">
                            <template slot-scope="scope">
                                <div v-if="radioState == 1">
                                    <span>{{scope.row.remark}}</span>
                                </div>
                                <div v-else>
                                    <el-input size="small" type="text" @focus="focus($event)" v-model="scope.row.remark" placeholder="请输入备注" @change="handleRemark(scope.$index, scope.row)"></el-input>
                                    <span>{{scope.row.remark}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </tree-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /**
     * Author: 赵巧芬
     * Date: 2019-3
     * Description: 初始化组件
    */
    import treeTable from '@/components/treeTable'
    export default {
        components: {
            treeTable
        },
        data() {
            return {
                searchText: '',                     //搜索文本
                multipleSelection: [],              //选中的行数据集合
                columns: [                          //表格数据===编码
                    {
                        text: '编码',
                        value: 'code',
                    }
                ],              
                data:this.$store.state.initializeStore.treeData,//表格数据
                credit: [],                         //资产贷数组
                borrow: [],                         //资产借数组
                liabilityCredit: [],                //负债贷数组
                equityCredit: [],                   //权益贷数组
                jieSum: 0,                          //资产借金额总和
                daiSum: 0,                          //资产贷金额总和
                liabiliSum: 0,                       //负债贷金额总和
                equitySum: 0,                       //权益贷金额总和
                dataList: [],                       //树形表格list数据
                searchAllResult: this.$store.state.initializeStore.searchAllResult,//搜索结果
                radioState: '',                     //启用系统状态
                systemId: this.$store.state.systemId
            }
        },
        watch: {
            searchText(newVal) {
                if(!newVal) {
                    this.data = this.$store.state.initializeStore.treeData;
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
            subsidiaryLedger(obj){                     //明细账
                if(obj && obj['name']){
                    if(this.$store.state.initializeVal.length > 0) {
                        if(this.$store.state.initializeVal.length < 2){
                            if(this.$store.state.initializeVal[0]['betweenObject'] == 1){
                                if(obj['name'] == '银行存款'){
                                    this.$util.openSubLayerIframe(obj['name'] + '明细账', 13, '60%', '85%', this.$domain + '/#/initialize/subsidiaryLedger1');
                                }else if(obj['name'] == '应收账款'){
                                    this.$util.openSubLayerIframe(obj['name'] + '明细账', 13, '60%', '85%', this.$domain + '/#/initialize/subsidiaryLedger2');
                                }else if(obj['name'] == '应付账款'){
                                    this.$util.openSubLayerIframe(obj['name'] + '明细账', 13, '70%', '85%', this.$domain + '/#/initialize/subsidiaryLedger3');
                                }else{
                                    this.$util.openSubLayerIframe(obj['name'] + '明细账', 13, '60%', '85%', this.$domain + '/#/initialize/subsidiaryLedger4');
                                }
                            }else{
                                this.$message({message: '该数据没有明细账', type: 'warning'});
                            }
                        } else {
                            this.$message({message: '请选择单条数据', type: 'warning'});
                        }
                    } else {
                        this.$message({message: '请选择有明细账的数据', type: 'warning'});
                    }
                } else {
                    this.$message({message: '请选择有明细账的数据', type: 'warning'});
                }
            },
            cycleInitializeData(arrs){              //遍历data，将明细账金额总和赋值给当前点击的数据金额
                if(arrs.length > 0){
                    arrs.forEach(item => {
                        let subArr = item['subAssertList'];
                        if(subArr && subArr.length > 0){
                            this.cycleInitializeData(subArr);
                        }else{
                            if(this.$store.state.initializeVal[0] && this.$store.state.initializeVal[0]['id']){
                                if(item['id'] == this.$store.state.initializeVal[0]['id']){
                                    item['money'] = this.$store.state.initializeStore.subSidiaryMoneySum;
                                }
                            }
                        }
                    })
                }
            },
            handleEdit(index, row) {                //金额文本框改变触发
                row.parent.money = 0;
                this.computedSum(row.parent);
            },
            handleRemark(index, row){               //备注
            },
            computedSum(parent) {                   //合计总金额
                let parentArr = parent.subAssertList;
                if(parentArr.length > 0) {
                    for(let i = 0; i < parentArr.length; i++) {
                        if(parentArr[i]['money']) {
                            parent.money += parseFloat(parentArr[i]['money']);
                        }
                    }
                }
                if(parent.parent && parent.parent.subAssertList.length > 0) {
                    parent.parent.money = 0;
                    this.computedSum(parent.parent);
                }
            },
            assetsSum(arr){                         //合计资产
                if(arr && arr.length > 0){
                    for(let i = 0; i < arr.length; i++) {
                        if((arr[i]['code'].split('.')[0].length != 5 && arr[i]['balanceDirection'] == 0) && (arr[i]['code'].split('.')[0].length != 3 && arr[i]['balanceDirection'] == 0) && (arr[i]['money'])){
                            if(this.borrow.indexOf(arr[i]) == -1) {
                                this.borrow.push(arr[i]);//借
                            }
                        } else if((arr[i]['code'].split('.')[0].length != 5 && arr[i]['balanceDirection'] == 1) && (arr[i]['code'].split('.')[0].length != 3 && arr[i]['balanceDirection'] == 1) && (arr[i]['money'])) {
                            if(this.credit.indexOf(arr[i]) == -1) {
                                this.credit.push(arr[i]);//贷
                            }
                        }else{
                            this.assetsSum(arr[i]['subAssertList']);
                        }
                    }
                }
            },
            liabilitySum(arr){                      //合计负债
                if(arr && arr.length > 0){
                    for(let i = 0; i < arr.length; i++) {
                        if((arr[i]['code'].split('.')[0].length != 5 && arr[i]['balanceDirection'] == 1) && (arr[i]['code'].split('.')[0].length != 3 && arr[i]['balanceDirection'] == 1) && (arr[i]['money'])) {
                            if(this.liabilityCredit.indexOf(arr[i]) == -1) {
                                this.liabilityCredit.push(arr[i]);
                            }
                        }else{
                            this.liabilitySum(arr[i]['subAssertList']);
                        }
                    }
                }
            },
            equitySums(arr){                         //合计权益
                if(arr && arr.length > 0){
                    for(let i = 0; i < arr.length; i++) {
                        if((arr[i]['code'].split('.')[0].length != 5 && arr[i]['balanceDirection'] == 1) && (arr[i]['code'].split('.')[0].length != 3 && arr[i]['balanceDirection'] == 1) && (arr[i]['money'])) {
                            if(this.equityCredit.indexOf(arr[i]) == -1) {
                                this.equityCredit.push(arr[i]);
                            }
                        }else{
                            this.equitySums(arr[i]['subAssertList']);
                        }
                    }
                }
            },
            differenceSum(borrow,credit,liabilityCredit,equityCredit){//计算差额
                this.jieSum = 0;
                this.daiSum = 0;
                this.liabiliSum = 0;
                this.equitySum = 0;
                if(borrow && borrow.length > 0){
                    for(let i = 0;i < borrow.length;i++){//计算资产借总和
                        if(borrow[i] && borrow[i]['money']){
                            this.jieSum += parseFloat(borrow[i]['money']);
                        }
                    }
                }
                if(credit && credit.length > 0){
                    for(let i = 0;i < credit.length;i++){//计算资产贷总和
                        if(credit[i] && credit[i]['money']){
                            this.daiSum += parseFloat(credit[i]['money']);
                        }
                    }
                }
                if(liabilityCredit && liabilityCredit.length > 0){
                    for(let i = 0;i < liabilityCredit.length;i++){//计算负债贷总和
                        if(liabilityCredit[i] && liabilityCredit[i]['money']){
                            this.liabiliSum += parseFloat(liabilityCredit[i]['money']);
                        }
                    }
                }
                if(equityCredit && equityCredit.length > 0){
                    for(let i = 0;i < equityCredit.length;i++){//计算权益贷总和
                        if(equityCredit[i] && equityCredit[i]['money']){
                            this.equitySum += parseFloat(equityCredit[i]['money']);
                        }
                    }
                }
                this.$store.state.initializeStore.assetNum = this.jieSum - this.daiSum;//资产总和
                this.$store.state.initializeStore.liabilities = this.liabiliSum + this.equitySum;//负债+权益总和
                this.$store.state.initializeStore.difference = this.$store.state.initializeStore.assetNum - this.$store.state.initializeStore.liabilities;//差额
                this.$store.commit('initializeStore/setAssetNum', this.currency(this.$store.state.initializeStore.assetNum))
                this.$store.commit('initializeStore/setLiabilities',this.currency(this.$store.state.initializeStore.liabilities))
                this.$store.commit('initializeStore/setDifference', this.currency(this.$store.state.initializeStore.difference))
            },
            focus(event) {                          //得到焦点选中
                event.currentTarget.select();
            },
            balanceBtn(){                           //平衡
                //负债+权益=负债类科目“贷方”金额之和+权益类科目“贷方”金额之和；
                this.assetsSum(this.$store.state.initializeStore.assetData);
                this.liabilitySum(this.$store.state.initializeStore.liabilitiesData);
                this.equitySums(this.$store.state.initializeStore.equityData);
                this.differenceSum(this.borrow,this.credit,this.liabilityCredit,this.equityCredit);
                let that = this;
                parent.layer.open({
                    type: 2,
                    title: '试算平衡',
                    shade: 0.3,
                    shadeClose: true,
                    zIndex: 13,
                    maxmin: true,
                    anim: 0,
                    fixed: true,
                    area: ['40%', '300px'],
                    content: this.$domain + '/#/initialize/balance',
                    success: function() {
                        $(':focus').blur();
                    },
                    end: function() {
                        that.$store.commit('initializeStore/clearSum')
                        that.borrow = [];
                        that.credit = [];
                        that.liabilityCredit = [];
                        that.equityCredit = [];
                    }
                });
            },
            dataLists(arrs){                        //将树形表格数据转换成list格式
                if(arrs.length > 0) {
                    arrs.forEach(item => {
                        if(!item['money']) item['money'] = null;
                        this.dataList.push({id: item['id'],code: item['code'],name: item['name'],mnemonicCode: item['mnemonicCode'],type: item['type'],balanceDirection: item['balanceDirection'],foreignCurrencyCheck: item['foreignCurrencyCheck'],betweenObject: item['betweenObject'],journal: item['journal'],betweenObjectList: item['betweenObjectList'],locks: item['locks'],money: item['money'],remark: item['remark'],isGroup: item['isGroup']});
                        let subAssertList = item['subAssertList'];
                        if(subAssertList && subAssertList.length > 0) {
                            this.dataLists(subAssertList)
                        }
                    });
                }
            },
            saveInitialia(){                        //保存
                this.dataList = [];
                this.dataLists(this.data);
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                this.$http.post(this.$url + 'subjectGroup/saveSubject', JSON.stringify(this.dataList), type).then(res => {
                    if(res.data.code == 20001){
                        this.$message({message: '保存成功', type: 'success'});
                        setTimeout(() => {
                            this.$store.dispatch('initializeStore/getTreeData', this.$url + 'subjectGroup/selectUnion?systemId=' + this.systemId);
                            this.$store.commit('clearInitializeVal');
                            this.$store.commit('initializeStore/clearInitializeVal')
                        });
                    }
                });
            },
            refInitialize(){                        //刷新
                this.$store.dispatch('initializeStore/getTreeData', this.$url + 'subjectGroup/selectUnion?systemId=' + this.systemId);
            },
            exportExcel(){                          //导出
                if(this.$store.state.initializeVal.length > 0) {
                    var idSting = this.$store.state.initailizeId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                    this.$http.get(this.$url + 'subjectGroup/initExport',{params: { list: idSting }}).then(res => {
                        this.$message({message: '导出成功', type: 'success'});
                        window.location.href = this.$url + 'subjectGroup/initExport?list=' + idSting;          //导出时触发
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
                        dataArr = this.searchAllResult,
                        searchText = this.searchText;
                    let reg = new RegExp(this.searchText, "g");
                    dataArr.forEach(item => {
                        if(reg.test(item['remark']) || reg.test(item['money']) || reg.test(item['code']) || reg.test(item['balanceDirectionName']) || reg.test(item['name']) || (item['toPinYinName'] && reg.test(item['toPinYinName'])) || (item['toPinYinBalanceDirectionName'] && reg.test(item['toPinYinBalanceDirectionName']))) {
                            newArr.push(item);
                        }
                    });
                    // this.data = newArr;
                }
            }
        },
        mounted() {
            this.$store.dispatch('initializeStore/getTreeData', this.$url + 'subjectGroup/selectUnion?systemId=' + this.systemId);//获取初始化树形表格数据
            this.$store.dispatch('initializeStore/getSearchData', this.$url + 'subjectGroup/likeName');//获取拼音搜索的总数据
            this.$store.dispatch('initializeStore/getCompactData', this.$url + 'auxiliary/select');//辅助资料树形所有数据
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
    .balanceType{
        .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
            background-color: #409EFF !important;border-color: #409EFF !important;
        }
        .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
            border-color: #fff !important;
        }
        .el-table__body-wrapper {height: calc(100% - 41px) !important;overflow-y: auto !important;overflow-x: hidden;}
        .el-form-item__content .el-button {padding: 8px 10px !important;}
        .tb-edit .el-input {
            display: none
        }
        .tb-edit .current-row .el-input {
            display: block
        }
        .tb-edit .current-row .el-input+span {
            display: none
        }
        .block-area .table .el-table th:nth-of-type(2) .cell,.block-area .table .el-table td:nth-of-type(2) .cell{
            text-align: left !important;
            // width: 200px;
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
    .balanceType {height: 100%;overflow: hidden;background-color: #fff;border-radius: 6px;}
    .balanceType .table {height: calc(100% - 42px);min-width: 880px;}
    .addRowBlock, .updateRowBlock, .LookBlock {height: 260px;padding-top: 20px;}
    @media screen and (max-width: 1250px) {
        .balanceType .block-area:nth-of-type(1) {
            overflow-x: auto;
            white-space: nowrap;
        }
        .balanceType .block-area:nth-of-type(1) .el-select,
        .balanceType .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
        }
        .balanceType .block-area:nth-of-type(1) .btn-group {
            margin-right: 0;
            float: right;
        }
    }
</style>
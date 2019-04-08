<template>
    <!--客户资料修改与修改弹窗-->
    <div class="updateRow">
        <div style="text-align: right;margin-right: 15px;margin-bottom: 10px;">
            <el-button type="info" size="mini" @click="zuiqian()">最前</el-button>
            <el-button type="info" size="mini" @click="qianfan()">前翻</el-button>
            <el-button type="info" size="mini" @click="houfan()">后翻</el-button>
            <el-button type="info" size="mini" @click="zuihou()">最后</el-button>
        </div>
        <el-form label-width="120px" :model="updateRowData" ref="updateRowForm" status-icon :rules="updateRowForm">
            <el-form-item label="名称：" prop="name">
                <el-input v-model="updateRowData.name" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="updateRowData.mnemonicCode" ref="MA1" @keyup.enter.native="enterKey($event, 'MA2')"></el-input>
            </el-form-item>
            <el-form-item label="简称：" prop="abbreviation">
                <el-input v-model="updateRowData.abbreviation" ref="MA2" @keyup.enter.native="enterKey($event, 'MA3')"></el-input>
            </el-form-item>
            <el-form-item label="客户地址：" prop="address">
                <el-input v-model="updateRowData.address" ref="MA3" @keyup.enter.native="enterKey($event, 'MA4')"></el-input>
            </el-form-item>
            <el-form-item label="区域：" prop="location">
                <el-select v-model="updateRowData.location" clearable filterable  ref="MA4" @keyup.enter.native="enterKey($event, 'MA5')" placeholder="选择区域">
                    <el-option v-for="(items, index) in locationList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="行业：" prop="trade">
                <el-select v-model="updateRowData.trade" clearable filterable ref="MA5" @keyup.enter.native="enterKey($event, 'MA6')" placeholder="选择行业">
                    <el-option v-for="(items, index) in tradeList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人：" prop="linkman">
                <el-input v-model="updateRowData.linkman" ref="MA6" @keyup.enter.native="enterKey($event, 'MA7')"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="tel">
                <el-input v-model="updateRowData.tel" ref="MA7" @keyup.enter.native="enterKey($event, 'MA8')"></el-input>
            </el-form-item>
            <el-form-item label="传真：" prop="fax">
                <el-input v-model="updateRowData.fax" ref="MA8" @keyup.enter.native="enterKey($event, 'MA9')"></el-input>
            </el-form-item>
            <el-form-item label="客户大类：" prop="clientCategoryId">
                <el-select v-model="updateRowData.clientCategoryId" @change="selectNodeClick">
                    <el-option v-for="(items, index) in customerTypeList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户价值分类：" prop="customerValueCategory">
                <el-select v-model="updateRowData.customerValueCategory" clearable filterable ref="MA10" @keyup.enter.native="enterKey($event, 'MA11')" placeholder="选择客户价值分类">
                    <el-option v-for="(items, index) in customerValueCategoryList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户产品分类：" prop="customerProductCategory">
                <el-select v-model="updateRowData.customerProductCategory" clearable filterable ref="MA11" @keyup.enter.native="enterKey($event, 'MA12')" placeholder="选择客户产品分类">
                    <el-option v-for="(items, index) in customerProductCategoryList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开户名1" prop="accountNameOne" class="check">
                <el-input v-model="updateRowData.accountNameOne" ref="MA12" @keyup.enter.native="enterKey($event, 'MA13')"></el-input>
            </el-form-item>
            <el-form-item label="开户银行1" prop="depositBankOne" class="check">
                <el-input v-model="updateRowData.depositBankOne" ref="MA13" @keyup.enter.native="enterKey($event, 'MA14')"></el-input>
            </el-form-item>
            <el-form-item label="银行账户1" prop="bankAccountOne" class="check">
                <el-input v-model="updateRowData.bankAccountOne" ref="MA14" @keyup.enter.native="enterKey($event, 'MA15')"></el-input>
            </el-form-item>
            <el-form-item label="开户名2" prop="accountNameTwo">
                <el-input v-model="updateRowData.accountNameTwo" ref="MA15" @keyup.enter.native="enterKey($event, 'MA16')"></el-input>
            </el-form-item>
            <el-form-item label="开户银行2" prop="depositBankTwo">
                <el-input v-model="updateRowData.depositBankTwo" ref="MA16" @keyup.enter.native="enterKey($event, 'MA17')"></el-input>
            </el-form-item>
            <el-form-item label="银行账户2" prop="bankAccountTwo">
                <el-input v-model="updateRowData.bankAccountTwo" ref="MA17" @keyup.enter.native="enterKey($event, 'MA18')"></el-input>
            </el-form-item>
            <el-form-item label="开户名3" prop="accountNameThree">
                <el-input v-model="updateRowData.accountNameThree" ref="MA18" @keyup.enter.native="enterKey($event, 'MA19')"></el-input>
            </el-form-item>
            <el-form-item label="开户银行3" prop="depositBankThree">
                <el-input v-model="updateRowData.depositBankThree" ref="MA19" @keyup.enter.native="enterKey($event, 'MA20')"></el-input>
            </el-form-item>
            <el-form-item label="银行账户3" prop="bankAccountThree">
                <el-input v-model="updateRowData.bankAccountThree" ref="MA20" @keyup.enter.native="enterKey($event, 'MA21')"></el-input>
            </el-form-item>
            <el-form-item label="税务登记号：" prop="taxRedistrationNumber">
                <el-input v-model="updateRowData.taxRedistrationNumber" ref="MA21" @keyup.enter.native="enterKey($event, 'MA22')"></el-input>
            </el-form-item>
            <el-form-item label="税率：" prop="vatRates">
                <el-select v-model="updateRowData.vatRates" clearable filterable ref="MA22" @keyup.enter.native="enterKey($event, 'MA23')" placeholder="选择税率">
                    <el-option v-for="(items, index) in vatRatesList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在国家：" prop="locationCountry">
                <el-select v-model="updateRowData.locationCountry" @change="locationCountryData" clearable filterable ref="MA25" @keyup.enter.native="enterKey($event, 'MA26')" placeholder="选择国家">
                    <el-option v-for="(items, index) in locationCountryList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在省份：" prop="locationProvince">
                <el-select v-model="updateRowData.locationProvince" @change="locationProvinceData" clearable filterable ref="MA24" @keyup.enter.native="enterKey($event, 'MA25')" placeholder="选择省份">
                    <el-option v-for="(items, index) in locationProvinceList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在城市：" prop="locationCity">
                <el-select v-model="updateRowData.locationCity" @change="locationCityData" clearable filterable ref="MA23" @keyup.enter.native="enterKey($event, 'MA24')" placeholder="选择城市">
                    <el-option v-for="(items, index) in locationCityList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司主页：" prop="homepage">
                <el-input v-model="updateRowData.homepage" ref="MA26" @keyup.enter.native="enterKey($event, 'MA27')">
                    <el-button slot="append" style="padding: 12px !important;" title="跳转">
                        <img src="../../../assets/images/gobackto.png" alt="" @click="searchwebsite">
                    </el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="法人代表：" prop="legalPersonRepresentative">
                <el-input v-model="updateRowData.legalPersonRepresentative" ref="MA27" @keyup.enter.native="enterKey($event, 'MA28')"></el-input>
            </el-form-item>
            <el-form-item label="销售方式：" prop="saleMethod">
                <el-select v-model="updateRowData.saleMethod" clearable ref="MA28" @keyup.enter.native="enterKey($event, 'MA29')" placeholder="选择销售方式">
                    <el-option v-for="(items, index) in saleMethodList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分管部门：" prop="chargeDepartment">
                <el-input v-model="departmentDrog" readonly @click.native="getDepartmentDrogData" @keyup.enter.native="enterKey($event, 'MA30')"></el-input>
                <el-input v-model="updateRowData.chargeDepartment" readonly style="display: none;"></el-input>
            </el-form-item>
            <el-form-item label="专营业务员：" prop="franchiseClerk">
                <el-select v-model="updateRowData.franchiseClerk" clearable filterable ref="MA30" @keyup.enter.native="enterKey($event, 'MA31')" placeholder="选择专营业务员">
                    <el-option v-for="(items, index) in franchiseClerkList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="信用额度：" prop="creditAmount">
                <el-input v-model="updateRowData.creditAmount" ref="MA31" @keyup.enter.native="enterKey($event, 'MA32')"></el-input>
            </el-form-item>
            <el-form-item label="结算期限：" prop="settlementPeriod">
                <el-select v-model="updateRowData.settlementPeriod" clearable filterable ref="MA32" @keyup.enter.native="enterKey($event, 'MA33')" placeholder="选择结算期限">
                    <el-option v-for="(items, index) in settlementPeriodList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="updateRowData.remark" ref="MA33" @keyup.enter.native="addRowSave('updateRowForm')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addRowSave('updateRowForm')">保存</el-button>
                <el-button type="danger" @click="leaveRow">离开</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            var isDepositBankOne = (rule, value, callback) => {
                if(value == ''){
                    if(this.updateRowData.accountNameOne !==''){
                        callback(new Error('开户银行1不能为空'))
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }
            var isBankAccountOne = (rule, value, callback) => {
                if(value == ''){
                    if(this.updateRowData.depositBankOne !==''){
                        callback(new Error('银行账号1不能为空'))
                    }else{
                        callback();
                    }
                }
                else if(value){
                    if(!(/^[0-9]+$/).test(value)){
                        callback(new Error('只能输入数字'))
                    }else{
                        callback();
                    }                
                }
                else{
                    callback();
                }
            }
            var isDepositBankTwo = (rule, value, callback) => {
                if (value == '') {
                    if (this.updateRowData.accountNameTwo !== '') {
                        callback(new Error('开户银行2不能为空！'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }
            var isBankAccountTwo = (rule, value, callback) => {
                if(value == ''){
                    if (this.updateRowData.accountNameTwo !== '' || this.updateRowData.depositBankTwo !== '') {
                    callback(new Error('银行账户2不能为空！'));
                    }else{
                        callback();
                    }
                }
                else if(value){
                    if(!(/^(\d)$/g).test(value)){
                        callback(new Error("只能输入数字!"));
                    }else{
                        callback();
                    }
                }
                else{
                    callback();
                }
            }
            var isDepositBankThree = (rule, value, callback) => {
                if (value == '') {
                    if (this.updateRowData.accountNameThree !== '') {
                        callback(new Error('开户银行3不能为空！'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }
            var isBankAccountThree = (rule, value, callback) => {
                if(value == ''){
                    if (this.updateRowData.accountNameThree !== '' || this.updateRowData.depositBankThree !== '') {
                    callback(new Error('银行账户3不能为空！'));
                    }else{
                        callback();
                    }
                }
                else if(value){
                    if(!(/^(\d)$/g).test(value)){
                        callback(new Error("只能输入数字!"));
                    }else{
                        callback();
                    }
                }
                else{
                    callback();
                }
            }
            var isTel = (rule, value, callback) => {
                if(value){
                    if(!(/^[0-9]+$/).test(value)){
                        callback(new Error('只能输入数字'))
                    }else{
                        callback();
                    }  
                }else{
                    callback();
                }
            }
            var isFax = (rule, value, callback) => {
                if(value){
                    if(!(/^[0-9]+$/).test(value)){
                        callback(new Error('只能输入数字'))
                    }else{
                        callback();
                    }  
                }else{
                    callback();
                }
            }
            var isCreditAmount = (rule, value, callback) => {
                if(value){
                    if(!(/^[0-9]+$/).test(value)){
                        callback(new Error('只能输入数字'))
                    }else{
                        callback();
                    }  
                }else{
                    callback();
                }
            }
            return {
                locationList: this.$store.state.customerStore.locationList,            //区域下拉框列表
                tradeList: this.$store.state.customerStore.tradeList,               //行业下拉框列表
                vatRatesList: this.$store.state.customerStore.vatRatesList,            //税率下拉列表
                saleMethodList: this.$store.state.customerStore.saleMethodList,          //销售方式下拉列表
                settlementPeriodList: this.$store.state.customerStore.settlementPeriodList,    //结算期限下拉列表
                customerTypeList: [],        //客户大类下拉列表
                customerValueCategoryList: this.$store.state.customerStore.customerValueCategoryList,//客户价值分类
                customerProductCategoryList: this.$store.state.customerStore.customerProductCategoryList,//客户产品分类
                locationCountryList: this.$store.state.customerStore.locationCountryList,     //国家下拉列表
                locationProvinceList:this.$store.state.customerStore.locationProvinceList,    //省份下拉列表
                locationCityList:this.$store.state.customerStore.locationCityList,        //城市下拉列表
                findCountryId:'',           //国家id
                countryName:'',             //国家名称
                findProvinceId:'',          //省份id
                provinceName:'',            //省份名称
                cityName:'',                //城市名称
                franchiseClerkList: this.$store.state.customerStore.franchiseClerkList,      //专营业务员下拉列表
                updateRowData: {               //存储修改的数据
                    name:'',
                    mnemonicCode:'',
                    abbreviation:'',
                    address:'',
                    location:'',
                    trade:'',
                    linkman:'',
                    tel:'',
                    fax:'',
                    clientCategoryId:'',
                    customerValueCategory:'',
                    customerProductCategory:'',
                    accountNameOne:'',
                    depositBankOne:'',
                    bankAccountOne:'',
                    accountNameTwo:'',
                    depositBankTwo:'',
                    bankAccountTwo:'',
                    accountNameThree:'',
                    depositBankThree:'',
                    bankAccountThree:'',
                    taxRedistrationNumber:'',
                    vatRates:'',
                    locationCountry:'',
                    locationProvince:'',
                    locationCity:'',
                    homepage:'',
                    legalPersonRepresentative:'',
                    saleMethod:'',
                    chargeDepartment:'',
                    franchiseClerk:'',
                    creditAmount:'',
                    settlementPeriod:'',
                    remark:'',
                    continuousInsert:false,
                },
                updateRowForm: {
                    name: [{required: true, message: '请输入名称', triggle: 'blur'}],
                    linkman: [{required: true, message: '请输入联系人', triggle: 'blur'}],
                    clientCategoryId: [{type:'number',required: true, message: '请输入客户大类', triggle: 'blur'}],
                    depositBankOne: [{required:false,validator:isDepositBankOne,trigger:'blur'}],
                    bankAccountOne: [{required:false,validator:isBankAccountOne,trigger:'blur'}],
                    depositBankTwo: [{required: false, validator:isDepositBankTwo, triggle: 'blur'}],
                    bankAccountTwo: [{required: false, validator:isBankAccountTwo, triggle: 'blur'}],
                    depositBankThree: [{required: false, validator:isDepositBankThree, triggle: 'blur'}],
                    bankAccountThree: [{required: false, validator:isBankAccountThree, triggle: 'blur'}],
                    tel: [{required: false, validator:isTel, triggle: 'blur'}],
                    fax: [{required: false, validator:isFax, triggle: 'blur'}],
                    creditAmount: [{required: false, validator:isCreditAmount, triggle: 'blur'}],
                },
                rowId:this.$store.state.customerStore.rowId,
                index:'',
                refId:'',
                departmentDrog:'',          //分管部门名称
                department: this.$store.state.customerStore.department,         //存储分管部门数据
            }
        },
        watch: {
            department(){
                if(this.department.length>0){
                    this.departmentDrog = this.department[0]['name'];
                    this.updateRowData['chargeDepartment'] = this.department[0]['id'];
                }
            }
        },
        methods: {
            getUpdateCustomer(){
                this.$http.get(this.$url + 'client/findSingleClientById?id=' + this.rowId).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowData = res.data.data;
                            this.departmentDrog = res.data.data['chargeDepartmentName'];
                            this.updateRowData['chargeDepartment'] = res.data.data['chargeDepartment']
                        }
                    }
                });
                for(let i = 0;i < this.$store.state.customerStore.tableData.length; i++){
                    if(this.$store.state.customerStore.tableData[i]['id'] == this.rowId){
                        this.index = i;
                    }
                }
            },
            getDepartmentDrogData() {               //显示分管部门弹窗
                this.$util.openSubLayerIframe('客户资料-分管部门', 15, '500px', '350px', this.$domain + '/#/customer/lastDepartTree');
            },
            locationCountryData(res){               //点击国家显示省份
                for(var i = 0;i < this.locationCountryList.length;i++){
                    if(this.locationCountryList[i]['id'] == res){
                        this.countryName = this.locationCountryList[i]['name'];
                    }
                }
                this.findCountryId = res;
                //  省份
                this.$http.get(this.$url + "city/findProvince?parentId=" + this.findCountryId).then(res => {
                    if(res.data.code == 20001) {
                            this.locationProvinceList = res.data.data;
                    } else {
                            this.$message.error(res.data.msg);
                    }
                })
                this.updateRowData.locationProvince = '';
                this.updateRowData.locationCity = '';
            },
            locationProvinceData(res){              //点击省份显示城市
                for(var i = 0;i < this.locationProvinceList.length;i++){
                    if(this.locationProvinceList[i]['id'] == res){
                        this.provinceName = this.locationProvinceList[i]['name'];
                    }
                }
                this.findProvinceId = res;
                //  城市
                this.$http.get(this.$url + "city/findCity?parentId=" + this.findProvinceId).then(res => {
                    if(res.data.code == 20001) {
                            this.locationCityList = res.data.data;
                    } else {
                            this.$message.error(res.data.msg);
                    }
                })
                this.updateRowData.locationCity = '';
            },
            locationCityData(res){                  //点击城市触发事件
                for(var i = 0;i < this.locationCityList.length;i++){
                    if(this.locationCityList[i]['id'] == res){
                        this.cityName = this.locationCityList[i]['name'];
                    }
                }
            },
            getListData(){                          //获取下拉列表的数据
                // 客户大类
                let kehudalei = encodeURI('客户大类');
                this.$http.get(this.$url + "client/findItemByName?categoryName=" + kehudalei).then(res => {
                    if(res.data.code == 20001) {
                        this.customerTypeList = res.data.data;
                    }
                })
            },
            addRowSave(formName) {                  //修改保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //修改保存
                        let data = {
                            systemId: this.$store.state.systemId,
                            id: this.updateRowData['id'],
                            name: this.updateRowData['name'],
                            mnemonicCode: this.updateRowData['mnemonicCode'],
                            abbreviation: this.updateRowData['abbreviation'],
                            address: this.updateRowData['address'],
                            location: this.updateRowData['location'],
                            trade: this.updateRowData['trade'],
                            linkman: this.updateRowData['linkman'],
                            tel: this.updateRowData['tel'],
                            fax: this.updateRowData['fax'],
                            clientCategoryId: this.updateRowData['clientCategoryId'],//托管商
                            customerValueCategory: this.updateRowData['customerValueCategory'],
                            customerProductCategory: this.updateRowData['customerProductCategory'],
                            accountNameOne: this.updateRowData['accountNameOne'],
                            depositBankOne: this.updateRowData['depositBankOne'],
                            bankAccountOne: this.updateRowData['bankAccountOne'],
                            accountNameTwo: this.updateRowData['accountNameTwo'],
                            depositBankTwo: this.updateRowData['depositBankTwo'],
                            bankAccountTwo: this.updateRowData['bankAccountTwo'],
                            accountNameThree: this.updateRowData['accountNameThree'],
                            depositBankThree: this.updateRowData['depositBankThree'],
                            bankAccountThree: this.updateRowData['bankAccountThree'],
                            taxRedistrationNumber: this.updateRowData['taxRedistrationNumber'],
                            vatRates: this.updateRowData['vatRates'],
                            locationCountry: this.countryName,
                            locationProvince: this.provinceName,
                            locationCity: this.cityName,
                            homepage: this.updateRowData['homepage'],
                            legalPersonRepresentative: this.updateRowData['legalPersonRepresentative'],
                            saleMethod: this.updateRowData['saleMethod'],
                            chargeDepartment: this.updateRowData['chargeDepartment'],
                            franchiseClerk: this.updateRowData['franchiseClerk'],
                            creditAmount: this.updateRowData['creditAmount'],
                            settlementPeriod: this.updateRowData['settlementPeriod'],
                            remark: this.updateRowData['remark'],
                        }
                        this.$http({
                            url: this.$url + 'client/updateClient',
                            method: 'post',
                            params: data
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$store.commit('customerStore/updatetreeclickedId',data.clientCategoryId)
                                this.$message({message: '修改成功', type: 'success'});
                                this.$store.dispatch('customerStore/getSearch',this.$url + 'client/fuzzySearch')
                                setTimeout(() => {
                                    this.$store.dispatch('customerStore/getTreeData', this.$url + 'client/findAccountItemByName?name=客户大类&systemId=' + this.$store.state.systemId);
                                    this.close();
                                },500) 
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                })
            },
            selectNodeClick(row) {                 //修改弹窗选择大类时触发的函数
                this.refId = row;
            },
            searchwebsite(){                        //公司主页跳转
                if(this.updateRowData.homepage){
                    window.parent.location.href = 'http://' + this.updateRowData.homepage;
                }else{
                    this.$message({message: '公司主页地址未填写', type: 'success'});
                }
            },
            leaveRow(){
                this.close();
            },
            zuiqian(){                           //最前
                let tableData = this.$store.state.customerStore.tableData;
                if(this.index != 0){
                    this.index = 0;
                    this.$http.get(this.$url + 'client/findSingleClientById?id=' + tableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowData = res.data.data;
                        }
                    }
                });
                }else{
                    this.$message.error('已经是第一条');
                }
            },
            houfan(){                            //后翻
                let tableData = this.$store.state.customerStore.tableData;
                if(this.index < tableData.length-1){
                    this.index = this.index + 1;
                    this.$http.get(this.$url + 'client/findSingleClientById?id=' + tableData[this.index]['id']).then(res => {
                        if(res.data.code == 20001) {
                            if(res.data.data) {
                                this.updateRowData = res.data.data;
                            }
                        }
                    });
                }else{
                    this.$message.error('已经是最后一条');
                }
            },
            qianfan(){                           //前翻
                let tableData = this.$store.state.customerStore.tableData;
                if(this.index > 0){
                    this.index = this.index - 1;
                    this.$http.get(this.$url + 'client/findSingleClientById?id=' + tableData[this.index]['id']).then(res => {
                        if(res.data.code == 20001) {
                            if(res.data.data) {
                                this.updateRowData = res.data.data;
                            }
                        }
                    });
                }else{
                    this.$message.error('已经是第一条');
                }
            },
            zuihou(){                            //最后
                let tableData = this.$store.state.customerStore.tableData;
                if(this.index != tableData.length - 1){
                    this.index = tableData.length - 1;
                    this.$http.get(this.$url + 'client/findSingleClientById?id=' + tableData[this.index]['id']).then(res => {
                        if(res.data.code == 20001) {
                            if(res.data.data) {
                                this.updateRowData = res.data.data;
                            }
                        }
                    });
                }else{
                    this.$message.error('已经是最后一条');
                }
            },
            close() {                               //关闭修改弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
            },
            enterKey(lastRef, nextRef) {		//回车键换行
                this.$refs[nextRef].focus();
            },
        },
        mounted() {
            let location = encodeURI('区域');
            this.$store.dispatch('customerStore/getLocation', this.$url + "client/InformationByName?categoryName=" + location + '&systemId=0');
            // 行业
            let trade = encodeURI('行业');
            this.$store.dispatch('customerStore/getTrade', this.$url + "client/InformationByName?categoryName=" + trade + '&systemId=0');
            // 税率
            let vatRates = encodeURI('税率');
            this.$store.dispatch('customerStore/getVatRates', this.$url + "client/InformationByName?categoryName=" + vatRates +'&systemId='+this.$store.state.systemId);
            // 销售方式
            let saleMethod = encodeURI('销售方式');
            this.$store.dispatch('customerStore/getSaleMethod', this.$url + "client/InformationByName?categoryName=" + saleMethod +'&systemId='+this.$store.state.systemId);
            // 结算期限
            let settlementPeriod = encodeURI('结算期限');
            this.$store.dispatch('customerStore/getSettlementPeriod', this.$url + "client/InformationByName?categoryName=" + settlementPeriod +'&systemId='+this.$store.state.systemId);
            // 客户价值分类
            let jiazhifenlei = encodeURI('客户价值分类');
            this.$store.dispatch('customerStore/getJiaZhiFenLei', this.$url + "client/findItemByName?categoryName=" + jiazhifenlei);
            // 客户产品分类
            let chanpinfenlei = encodeURI('客户产品分类');
            this.$store.dispatch('customerStore/getChanPinFenlei', this.$url + "client/findItemByName?categoryName=" + chanpinfenlei);
            // 国家
            this.$store.dispatch('customerStore/getContry', this.$url + "city/findCountry");
            // 专营业务员
            this.$store.dispatch('customerStore/getEmployee', this.$url + "employee/findEmployeeByName?systemId=" + this.$store.state.systemId);
            this.getUpdateCustomer();
            this.getListData();
        }
    }
</script>
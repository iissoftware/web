<template>
    <!-- 供应商新增页面 -->
    <div class="addRowBlock">
        <el-form label-width="140px" :model="addRowData" ref="addRowForm" status-icon :rules="addFormRules">
            <el-form-item label="名称：" prop="name">
                <el-input v-model="addRowData.name" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="addRowData.mnemonicCode" ref="MA1" @keyup.enter.native="enterKey($event, 'MA2')"></el-input>
            </el-form-item>
            <el-form-item label="简称：" prop="abbreviation">
                <el-input v-model="addRowData.abbreviation" ref="MA2" @keyup.enter.native="enterKey($event, 'MA3')"></el-input>
            </el-form-item>
            <el-form-item label="供应商地址：" prop="clientAddress">
                <el-input v-model="addRowData.clientAddress" ref="MA3" @keyup.enter.native="enterKey($event, 'MA4')"></el-input>
            </el-form-item>
            <el-form-item label="区域：" prop="clientAreaId">
                <el-select v-model="addRowData.clientAreaId" ref="MA4" @keyup.enter.native="enterKey($event, 'MA5')" placeholder="选择区域" filterable clearable>
                    <el-option v-for="(items, index) in locationList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="行业：" prop="industry">
                <el-select v-model="addRowData.industry" ref="MA5" @keyup.enter.native="enterKey($event, 'MA6')" placeholder="选择行业" filterable clearable>
                    <el-option v-for="(items, index) in tradeList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人：" prop="linkman">
                <el-input v-model="addRowData.linkman" ref="MA6" @keyup.enter.native="enterKey($event, 'MA7')"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="telephone">
                <el-input v-model="addRowData.telephone" ref="MA7" @keyup.enter.native="enterKey($event, 'MA8')"></el-input>
            </el-form-item>
            <el-form-item label="传真：" prop="fax">
                <el-input v-model="addRowData.fax" ref="MA8" @keyup.enter.native="enterKey($event, 'MA9')"></el-input>
            </el-form-item>
            <el-form-item label="供应商大类：" prop="typeId">
                <el-select v-model="addRowData.typeId" ref="MA9" @keyup.enter.native="enterKey($event, 'MA10')" placeholder="选择供应商大类" filterable>
                    <el-option v-for="(items, index) in customerTypeList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商价值分类：" prop="wertKlassifizierungId">
                <el-select v-model="addRowData.wertKlassifizierungId" ref="MA10" @keyup.enter.native="enterKey($event, 'MA11')" placeholder="选择供应商价值分类" filterable clearable>
                    <el-option v-for="(items, index) in customerValueCategoryList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商产品分类：" prop="produkteKlassifizierungId">
                <el-select v-model="addRowData.produkteKlassifizierungId" ref="MA11" @keyup.enter.native="enterKey($event, 'MA12')" placeholder="选择供应商产品分类" filterable clearable>
                    <el-option v-for="(items, index) in customerProductCategoryList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开户名1:" prop="kontoOne">
                <el-input v-model="addRowData.kontoOne" ref="MA12" @keyup.enter.native="enterKey($event, 'MA13')"></el-input>
            </el-form-item>
            <el-form-item label="开户银行1:" prop="kontoBankOne">
                <el-input v-model="addRowData.kontoBankOne" ref="MA13" @keyup.enter.native="enterKey($event, 'MA14')"></el-input>
            </el-form-item>
            <el-form-item label="银行账户1:" prop="bankAccountOne">
                <el-input v-model="addRowData.bankAccountOne" ref="MA14" @keyup.enter.native="enterKey($event, 'MA15')"></el-input>
            </el-form-item>
            <el-form-item label="开户名2:" prop="kontoTwo">
                <el-input v-model="addRowData.kontoTwo" ref="MA15" @keyup.enter.native="enterKey($event, 'MA16')"></el-input>
            </el-form-item>
            <el-form-item label="开户银行2:" prop="kontoBankTwo">
                <el-input v-model="addRowData.kontoBankTwo" ref="MA16" @keyup.enter.native="enterKey($event, 'MA17')"></el-input>
            </el-form-item>
            <el-form-item label="银行账户2:" prop="bankAccountTwo">
                <el-input v-model="addRowData.bankAccountTwo" ref="MA17" @keyup.enter.native="enterKey($event, 'MA18')"></el-input>
            </el-form-item>
            <el-form-item label="开户名3:" prop="kontoThree">
                <el-input v-model="addRowData.kontoThree" ref="MA18" @keyup.enter.native="enterKey($event, 'MA19')"></el-input>
            </el-form-item>
            <el-form-item label="开户银行3:" prop="kontoBankThree">
                <el-input v-model="addRowData.kontoBankThree" ref="MA19" @keyup.enter.native="enterKey($event, 'MA20')"></el-input>
            </el-form-item>
            <el-form-item label="银行账户3:" prop="bankAccountThree">
                <el-input v-model="addRowData.bankAccountThree" ref="MA20" @keyup.enter.native="enterKey($event, 'MA21')"></el-input>
            </el-form-item>
            <el-form-item label="税务登记号：" prop="taxRegistrationNumber">
                <el-input v-model="addRowData.taxRegistrationNumber" ref="MA21" @keyup.enter.native="enterKey($event, 'MA22')"></el-input>
            </el-form-item>
            <el-form-item label="税率：" prop="steuersatzId">
                <el-select v-model="addRowData.steuersatzId" ref="MA22" @keyup.enter.native="enterKey($event, 'MA23')" placeholder="选择税率" filterable clearable>
                    <el-option v-for="(items, index) in vatRatesList" :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>               
            <el-form-item label="所在国家：" prop="countryId">
                <el-select v-model="addRowData.countryId" @change="locationCountryData" ref="MA23" @keyup.enter.native="enterKey($event, 'MA24')" placeholder="选择国家" filterable clearable>
                    <el-option v-for="(items, index) in locationCountryList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在省份：" prop="provinceId">
                <el-select v-model="addRowData.provinceId" @change="locationProvinceData" ref="MA24" @keyup.enter.native="enterKey($event, 'MA25')" placeholder="选择省份" filterable clearable>
                    <el-option v-for="(items, index) in locationProvinceList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在城市：" prop="cityId">
                <el-select v-model="addRowData.cityId" @change="locationCityData" ref="MA25" @keyup.enter.native="enterKey($event, 'MA26')" placeholder="选择城市" filterable clearable>
                    <el-option v-for="(items, index) in locationCityList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>               
            <el-form-item label="公司主页：" prop="website">
                <el-input v-model="addRowData.website" ref="MA26" @keyup.enter.native="enterKey($event, 'MA27')">
                    <el-button slot="append" style="padding: 12px !important;" title="跳转">
                        <img src="../../../assets/images/gobackto.png" alt="" @click="searchwebsite">
                    </el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="法人代表：" prop="legalPerson">
                <el-input v-model="addRowData.legalPerson" ref="MA27" @keyup.enter.native="enterKey($event, 'MA28')"></el-input>
            </el-form-item>
            <el-form-item label="采购方式：" prop="saleMethodId">
                <el-select v-model="addRowData.saleMethodId" ref="MA28" @keyup.enter.native="enterKey($event, 'MA29')" placeholder="选择采购方式" filterable clearable>
                    <el-option v-for="(items, index) in saleMethodList"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分管部门：" prop="divisionDepartmentId">
                <el-input style="width:80%" v-model="departmentDrog" readonly @click.native="getDepartmentDrogData" @keyup.enter.native="enterKey($event, 'MA30')"></el-input>
                <el-button @click="clearDepartment" icon="el-icon-delete"></el-button>              
                <el-input v-model="addRowData.divisionDepartmentId" readonly style="display: none;"></el-input>
            </el-form-item>
            <el-form-item label="采购员：" prop="buyerId">
                <el-select v-model="addRowData.buyerId" ref="MA30" @keyup.enter.native="enterKey($event, 'MA31')" placeholder="选择采购员" filterable clearable>
                    <el-option v-for="(items, index) in franchiseClerkList"  :label="items.name" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="信用额度：" prop="creditLine">
                <el-input v-model="addRowData.creditLine" ref="MA31" @keyup.enter.native="enterKey($event, 'MA32')"></el-input>
            </el-form-item>
            <el-form-item label="结算期限：" prop="settlementPeriod">
                <el-select v-model="addRowData.settlementPeriod" ref="MA32" @keyup.enter.native="enterKey($event, 'MA33')" placeholder="选择结算期限" filterable clearable>
                    <el-option v-for="(items, index) in settlementPeriodList"  :label="items.detailedName" :value="items.detailedName" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input
                type="textarea"
                autosize
                v-model="addRowData.remark"
                ref="MA33">
                </el-input>
            </el-form-item>
            <el-form-item label="连续增加：">
                <el-checkbox v-model="continueAdd"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('addRowForm')">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>        
    </div>
</template>

<script>
export default {
    data(){
        var haveBankOne = (rule, value, callback) => {
            if(value == ''){
                if(this.addRowData.kontoOne !==''){
                    callback(new Error('开户银行1不能为空'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        var haveAccountOne = (rule, value, callback) => {
            if(value == ''){
                if(this.addRowData.kontoBankOne !==''){
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
        var haveBankTwo = (rule, value, callback) => {
            if(value == ''){
                if(this.addRowData.kontoTwo !==''){
                    callback(new Error('开户银行2不能为空'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        var haveAccountTwo = (rule, value, callback) => {
            if(value == ''){
                if(this.addRowData.kontoBankTwo !==''){
                    callback(new Error('银行账号2不能为空'))
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
        var haveBankThree = (rule, value, callback) => {
            if(value == ''){
                if(this.addRowData.kontoThree !==''){
                    callback(new Error('开户银行3不能为空'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        var haveAccountThree = (rule, value, callback) => {
            if(value == ''){
                if(this.addRowData.kontoBankThree !==''){
                    callback(new Error('银行账号3不能为空'))
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
        var istelephone = (rule, value, callback) => {
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
        var iscreditLine = (rule, value, callback) => {
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
        var isfax = (rule, value, callback) => {
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
        return{
            systemId:this.$store.state.systemId,        //系统参数id
            addRowData: {                               //存储新增的数据
                name:'',
                mnemonicCode:'',
                abbreviation:'',
                clientAddress:'',
                clientAreaId:'',
                industry:'',
                linkman:'',
                telephone:'',
                fax:'',
                typeId:'',
                wertKlassifizierungId:'',
                produkteKlassifizierungId:'',
                kontoOne:'',
                kontoBankOne:'',
                bankAccountOne:'',
                kontoTwo:'',
                kontoBankTwo:'',
                bankAccountTwo:'',
                kontoThree:'',
                kontoBankThree:'',
                bankAccountThree:'',
                taxRegistrationNumber:'',
                steuersatzId:'',
                cityId:'',
                provinceId:'',
                countryId:'',
                website:'',
                legalPerson:'',
                saleMethodId:'',
                divisionDepartmentId:'',
                buyerId:'',
                creditLine:'',
                settlementPeriod:'',
                remark:'',
            },
            addFormRules:{                              //新增修改表单验证
                name: [{required: true, message: '名称不能为空', triggle: 'blur'}],
                linkman: [{required: true, message: '联系人不能为空', triggle: 'blur'}],
                typeId:[{required: true, message: '供应商大类不能为空', type:'number',triggle: 'blur,change'}],
                kontoBankOne:[{required:false,validator:haveBankOne,triggle: 'blur'}],
                bankAccountOne:[{required:false,validator:haveAccountOne,triggle: 'blur'}],
                kontoBankTwo:[{required:false,validator:haveBankTwo,triggle: 'blur'}],
                bankAccountTwo:[{required:false,validator:haveAccountTwo,triggle: 'blur'}],
                kontoBankThree:[{required:false,validator:haveBankThree,triggle: 'blur'}],
                bankAccountThree:[{required:false,validator:haveAccountThree,triggle: 'blur'}],
                telephone: [{required: false,validator:istelephone, triggle: 'blur'}],
                creditLine: [{required: false,validator:iscreditLine, triggle: 'blur'}],
                fax: [{required: false,validator:isfax, triggle: 'blur'}],
            },
            continueAdd:false,                          //是否连续新增 
            locationList:[],                            //区域下拉框列表
            tradeList:[],                               //行业下拉框列表
            vatRatesList:[],                            //税率下拉列表
            saleMethodList:[],                          //销售方式下拉列表
            settlementPeriodList:[],                    //结算期限下拉列表
            customerTypeList:[],                        //客户大类下拉列表
            customerValueCategoryList:[],               //客户价值分类
            customerProductCategoryList:[],             //客户产品分类
            locationCountryList:[],                     //国家下拉列表
            locationProvinceList:[],                    //省份下拉列表
            locationCityList:[],                        //城市下拉列表
            findCountryId:'',                           //国家id
            countryName:'',                             //国家名称
            findProvinceId:'',                          //省份id
            provinceName:'',                            //省份名称
            cityName:'',                                //城市名称
            franchiseClerkList:[],                      //专营业务员下拉列表
            departmentDrog:'',                          //分管部门名称
            department:this.$store.state.supplierStore.department ,         //存储分管部门数据

        }
    },
    watch:{
        department(){
            if(this.department.length>0){
                this.departmentDrog = this.department[0]['name'];
                this.addRowData['divisionDepartmentId'] = this.department[0]['id'];
            }
        },
        // addRowData:{
        //     handler(newVal) {
        //         localStorage.setItem('addSupplier', JSON.stringify(this.addRowData));
        //         if(this.department.length > 0){
        //             localStorage.setItem('department', JSON.stringify(this.department));
        //         }
        //     },
        //     deep: true
        // }

    },
    methods:{
        save(formName) {                        //新增保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        supplierCategoryId:this.addRowData['typeId'],
                        name: this.addRowData['name'],
                        mnemonicCode: this.addRowData['mnemonicCode'],
                        abbreviation: this.addRowData['abbreviation'],
                        clientAddress: this.addRowData['clientAddress'],
                        clientAreaId: this.addRowData['clientAreaId'],
                        industry: this.addRowData['industry'],
                        linkman: this.addRowData['linkman'],
                        telephone: this.addRowData['telephone'],
                        fax: this.addRowData['fax'],
                        typeId: this.addRowData['typeId'],
                        wertKlassifizierungId: this.addRowData['wertKlassifizierungId'],
                        produkteKlassifizierungId: this.addRowData['produkteKlassifizierungId'],
                        kontoOne: this.addRowData['kontoOne'],
                        kontoBankOne: this.addRowData['kontoBankOne'],
                        bankAccountOne: this.addRowData['bankAccountOne'],
                        kontoTwo: this.addRowData['kontoTwo'],
                        kontoBankTwo: this.addRowData['kontoBankTwo'],
                        bankAccountTwo: this.addRowData['bankAccountTwo'],
                        kontoThree: this.addRowData['kontoThree'],
                        bankAccountThree: this.addRowData['bankAccountThree'],
                        kontoBankThree: this.addRowData['kontoBankThree'],
                        taxRegistrationNumber: this.addRowData['taxRegistrationNumber'],
                        steuersatzId: this.addRowData['steuersatzId'],
                        cityId: this.addRowData['cityId'],
                        provinceId: this.addRowData['provinceId'],
                        countryId: this.addRowData['countryId'],
                        website: this.addRowData['website'],
                        legalPerson: this.addRowData['legalPerson'],
                        saleMethodId: this.addRowData['saleMethodId'],
                        divisionDepartmentId: this.addRowData['divisionDepartmentId'],
                        buyerId: this.addRowData['buyerId'],
                        creditLine: this.addRowData['creditLine'],
                        settlementPeriod: this.addRowData['settlementPeriod'],
                        remark: this.addRowData['remark'],
                    }
                    this.$http({
                        url: this.$url + 'supplier/insert',
                        method: 'post',
                        params: data
                    }).then(res => {
                        if(res.data.code == 20001) {                            
                            this.$message({message: res.data.data, type: 'success',duration:1500});
                            this.$store.commit('supplierStore/updatetreeclickedId',data.typeId);
                            // localStorage.removeItem('addSupplier');
                            // localStorage.removeItem('department');                                                      
                            if(this.continueAdd) {
                                setTimeout(() => {
                                    this.$refs['addRowForm'].resetFields();
                                    this.addRowData['typeId'] = data.typeId;
                                    this.departmentDrog = '';
                                    this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
                                })                                
                            } else {
                                setTimeout(() => {
                                    this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
                                    this.close();
                                }, 1000);
                            }
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }else{
                    this.$message({message:'必填项不能为空',type:'error',duration:1500})
                }
            })
        },
        getListData(){                          //获取下拉列表的数据
             // 区域
            let location = encodeURI('区域');
            this.$http.get(this.$url + "client/InformationByName?categoryName=" + location + '&systemId=0').then(res => {
                if(res.data.code == 20001) {
                        this.locationList = res.data.data;
                }
            })
            // 行业
            let trade = encodeURI('行业');
            this.$http.get(this.$url + "client/InformationByName?categoryName=" + trade+ '&systemId=0').then(res => {
                if(res.data.code == 20001) {
                        this.tradeList = res.data.data;
                }
            })
            // 税率
            let vatRates = encodeURI('税率');
            this.$http.get(this.$url + "client/InformationByName?categoryName=" + vatRates+ '&systemId='+this.systemId).then(res => {
                if(res.data.code == 20001) {
                        this.vatRatesList = res.data.data;
                }
            })
            // 采购方式
            let saleMethod = encodeURI('采购方式');
            this.$http.get(this.$url + "client/InformationByName?categoryName=" + saleMethod+ '&systemId='+this.systemId).then(res => {
                if(res.data.code == 20001) {
                        this.saleMethodList = res.data.data;
                }
            })
            // 结算期限
            let settlementPeriod = encodeURI('结算期限');
            this.$http.get(this.$url + "client/InformationByName?categoryName=" + settlementPeriod+ '&systemId='+this.systemId).then(res => {
                if(res.data.code == 20001) {
                    this.settlementPeriodList = res.data.data;
                }
            })
            // 供应商大类
            this.$http.get(this.$url + "accountItem/supplierCategory").then(res => {
                if(res.data.code == 20001) {
                    this.customerTypeList = res.data.data;
                }
            })
            // 供应商价值分类
            this.$http.get(this.$url + "accountItem/supplierValue").then(res => {
                if(res.data.code == 20001) {
                        this.customerValueCategoryList = res.data.data;
                }
            })
            // 供应商产品分类
            this.$http.get(this.$url + "accountItem/supplierProduct").then(res => {
                if(res.data.code == 20001) {
                        this.customerProductCategoryList = res.data.data;
                }
            })
            // 国家
            this.$http.get(this.$url + "city/findCountry").then(res => {
                if(res.data.code == 20001) {
                        this.locationCountryList = res.data.data;
                }
            })
            // 专营业务员
            this.$http.get(this.$url + "employee/findEmployeeByName?systemId=" + this.systemId).then(res => {
                if(res.data.code == 20001) {
                        this.franchiseClerkList = res.data.data;
                }
            })
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
                }
            })
            this.addRowData.provinceId = '';
            this.addRowData.cityId = '';
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
                }
            })
            this.addRowData.cityId = '';
        },
        locationCityData(res){                  //点击城市触发事件
            for(var i = 0;i < this.locationCityList.length;i++){
                if(this.locationCityList[i]['id'] == res){
                    this.cityName = this.locationCityList[i]['name'];
                }
            }
        },
        enterKey(lastRef, nextRef) {            //回车键换行
            this.$refs[nextRef].focus();
        },
        searchwebsite(){                        //公司主页跳转
            if(this.addRowData.website){
                window.parent.location.href = 'http://' + this.addRowData.website ;
            }else{
                this.$message({message: '公司主页地址未填写', type: 'warning'});
            }
            
        },
        getDepartmentDrogData() {               //显示分管部门弹窗
            this.$util.openSubLayerIframe('供应商-分管部门', 15, '450px', '350px', this.$domain + '/#/supplierInformation/department');
        },
        clearDepartment(){                      //清空分管部门
            if(this.department.length>0){
                this.departmentDrog = '';
                this.addRowData['divisionDepartmentId'] = '';
            }
        },
        close() {                               //关闭弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        },
    },
    mounted(){
        this.getListData()
        if(this.$store.state.supplierStore.treeclicked.length>0){           //默认供应商大类
            if(this.$store.state.supplierStore.treeclicked[0]['supplierCategoryId']){
                this.addRowData['typeId'] = this.$store.state.supplierStore.treeclicked[0]['supplierCategoryId']
            }else{
                this.addRowData['typeId'] = this.$store.state.supplierStore.treeclickedId;
            }            
        }else{
            this.addRowData['typeId'] = this.$store.state.supplierStore.treeData[0]['id'];
        }
        // if(localStorage.getItem('addSupplier')){                            //缓存
        //     this.addRowData = JSON.parse(localStorage.getItem('addSupplier'))
        //     if(this.addRowData['divisionDepartmentId']) {
        //         let depart = JSON.parse(localStorage.getItem('department'));
        //         this.addRowData['divisionDepartmentId'] = depart[0]['id'];
        //         this.departmentDrog = depart[0]['name'];
        //     }           
        // }
    }
}
</script>

<style>

</style>


<template>
    <!-- 供应商查看页面 -->
    <div class="LookBlock">
        <el-form label-width="140px" :model="LookData" ref="LookForm" status-icon>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="LookData.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="LookData.mnemonicCode" readonly></el-input>
            </el-form-item>
            <el-form-item label="简称：" prop="abbreviation">
                <el-input v-model="LookData.abbreviation" readonly></el-input>
            </el-form-item>
            <el-form-item label="供应商地址：" prop="clientAddress">
                <el-input v-model="LookData.clientAddress" readonly></el-input>
            </el-form-item>
            <el-form-item label="区域：" prop="clientArea">
                <el-input v-model.number="LookData.clientArea" readonly></el-input>
            </el-form-item>
            <el-form-item label="行业：" prop="industryName">
                <el-input v-model.number="LookData.industryName" readonly></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="linkman">
                <el-input v-model="LookData.linkman" readonly></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="telephone">
                <el-input v-model.number="LookData.telephone" readonly></el-input>
            </el-form-item>
            <el-form-item label="传真：" prop="fax">
                <el-input v-model.number="LookData.fax" readonly></el-input>
            </el-form-item>
            <el-form-item label="供应商大类：" prop="type">
                <el-input v-model.number="LookData.type" readonly></el-input>
            </el-form-item>
            <el-form-item label="供应商价值分类：" prop="wertKlassifizierung">
                <el-input v-model.number="LookData.wertKlassifizierung" readonly></el-input>
            </el-form-item>
            <el-form-item label="供应商产品分类：" prop="produkteKlassifizierung">
                <el-input v-model.number="LookData.produkteKlassifizierung" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户名1:" prop="kontoOne">
                <el-input v-model="LookData.kontoOne" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户银行1:" prop="kontoBankOne">
                <el-input v-model="LookData.kontoBankOne" readonly></el-input>
            </el-form-item>
            <el-form-item label="银行账户1:" prop="bankAccountOne">
                <el-input v-model.number="LookData.bankAccountOne" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户名2:" prop="kontoTwo">
                <el-input v-model="LookData.kontoTwo" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户银行2:" prop="kontoBankTwo">
                <el-input v-model="LookData.kontoBankTwo" readonly></el-input>
            </el-form-item>
            <el-form-item label="银行账户2:" prop="bankAccountTwo">
                <el-input v-model.number="LookData.bankAccountTwo" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户名3:" prop="kontoThree">
                <el-input v-model="LookData.kontoThree" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户银行3:" prop="kontoBankThree">
                <el-input v-model="LookData.kontoBankThree" readonly></el-input>
            </el-form-item>
            <el-form-item label="银行账户3:" prop="bankAccountThree">
                <el-input v-model.number="LookData.bankAccountThree" readonly></el-input>
            </el-form-item>
            <el-form-item label="税务登记号：" prop="taxRegistrationNumber">
                <el-input v-model="LookData.taxRegistrationNumber" readonly></el-input>
            </el-form-item>
            <el-form-item label="税率：" prop="steuersatz">
                <el-input v-model.number="LookData.steuersatz" readonly></el-input>
            </el-form-item>               
            <el-form-item label="所在国家：" prop="country">
                <el-input v-model.number="LookData.country" readonly></el-input>
            </el-form-item>
            <el-form-item label="所在省份：" prop="province">
                <el-input v-model.number="LookData.province" readonly></el-input>
            </el-form-item>
            <el-form-item label="所在城市：" prop="city">
                <el-input v-model.number="LookData.city" readonly></el-input>
            </el-form-item>               
            <el-form-item label="公司主页：" prop="website">
                <el-input v-model="LookData.website" readonly></el-input>
            </el-form-item>
            <el-form-item label="法人代表：" prop="legalPerson">
                <el-input v-model="LookData.legalPerson" readonly></el-input>
            </el-form-item>
            <el-form-item label="采购方式：" prop="saleMethod">
                <el-input v-model.number="LookData.saleMethod" readonly></el-input>
            </el-form-item>
            <el-form-item label="分管部门：" prop="divisionDepartment">
                <el-input v-model="LookData.divisionDepartment" readonly></el-input>
            </el-form-item>
            <el-form-item label="采购员：" prop="buyer">
                <el-input v-model.number="LookData.buyer" readonly></el-input>
            </el-form-item>
            <el-form-item label="信用额度：" prop="creditLine">
                <el-input v-model.number="LookData.creditLine" readonly></el-input>
            </el-form-item>
            <el-form-item label="结算期限：" prop="settlementPeriod">
                <el-input v-model="LookData.settlementPeriod" readonly></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="LookData.remark" readonly></el-input>
            </el-form-item>
        </el-form>          
    </div>
</template>

<script>
export default {
    data(){
        return{
            LookData:{},  //查看页面数据
            rowId: this.$store.state.supplierStore.rowId,
        }
    },
    methods:{
        getUpdateData(){
            this.$http.get(this.$url + 'supplier/selectInfoById?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    this.LookData = res.data.data;
                }
            })
        }
    },
    created(){
        this.getUpdateData();
    }
}
</script>


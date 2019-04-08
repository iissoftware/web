<template>
    <!--客户资料修改与修改弹窗-->
    <div class="updateRow">
        <el-form label-width="120px" :model="readerRowData" ref="readerRowForm" status-icon>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="readerRowData.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="readerRowData.mnemonicCode" readonly></el-input>
            </el-form-item>
            <el-form-item label="简称：" prop="abbreviation">
                <el-input v-model="readerRowData.abbreviation" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户地址：" prop="address">
                <el-input v-model="readerRowData.address" readonly></el-input>
            </el-form-item>
            <el-form-item label="区域：" prop="locationName">
                <el-input v-model="readerRowData.locationName" readonly></el-input>
            </el-form-item>
            <el-form-item label="行业：" prop="tradeName">
                <el-input v-model="readerRowData.tradeName" readonly></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="linkman">
                <el-input v-model="readerRowData.linkman" readonly></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="tel">
                <el-input v-model="readerRowData.tel" readonly></el-input>
            </el-form-item>
            <el-form-item label="传真：" prop="fax">
                <el-input v-model="readerRowData.fax" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户大类：" prop="clientCategoryName">
                <el-input v-model="readerRowData.clientCategoryName" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户价值分类：" prop="customerValueCategoryName">
                <el-input v-model="readerRowData.customerValueCategoryName" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户产品分类：" prop="customerProductCategoryName">
                <el-input v-model="readerRowData.customerProductCategoryName" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户名1" prop="accountNameOne" class="check">
                <el-input v-model="readerRowData.accountNameOne" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户银行1" prop="depositBankOne" readonly class="check">
                <el-input v-model="readerRowData.depositBankOne" readonly></el-input>
            </el-form-item>
            <el-form-item label="银行账户1" prop="bankAccountOne" class="check">
                <el-input v-model="readerRowData.bankAccountOne" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户名2" prop="accountNameTwo">
                <el-input v-model="readerRowData.accountNameTwo" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户银行2" prop="depositBankTwo">
                <el-input v-model="readerRowData.depositBankTwo" readonly></el-input>
            </el-form-item>
            <el-form-item label="银行账户2" prop="bankAccountTwo">
                <el-input v-model="readerRowData.bankAccountTwo" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户名3" prop="accountNameThree">
                <el-input v-model="readerRowData.accountNameThree" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户银行3" prop="depositBankThree">
                <el-input v-model="readerRowData.depositBankThree" readonly></el-input>
            </el-form-item>
            <el-form-item label="银行账户3" prop="bankAccountThree">
                <el-input v-model="readerRowData.bankAccountThree" readonly></el-input>
            </el-form-item>
            <el-form-item label="税务登记号：" prop="taxRedistrationNumber">
                <el-input v-model="readerRowData.taxRedistrationNumber" readonly></el-input>
            </el-form-item>
            <el-form-item label="税率：" prop="vatRatesName">
                <el-input v-model="readerRowData.vatRatesName" readonly></el-input>
            </el-form-item>
            <el-form-item label="所在国家：" prop="locationCountry">
                <el-input v-model="readerRowData.locationCountry" readonly></el-input>
            </el-form-item>
            <el-form-item label="所在省份：" prop="locationProvince">
                <el-input v-model="readerRowData.locationProvince" readonly></el-input>
            </el-form-item>
            <el-form-item label="所在城市：" prop="locationCity">
                <el-input v-model="readerRowData.locationCity" readonly></el-input>
            </el-form-item>
            <el-form-item label="公司主页：" prop="homepage">
                <el-input v-model="readerRowData.homepage" readonly></el-input>
            </el-form-item>
            <el-form-item label="法人代表：" prop="legalPersonRepresentative">
                <el-input v-model="readerRowData.legalPersonRepresentative" readonly></el-input>
            </el-form-item>
            <el-form-item label="销售方式：" prop="saleMethodName">
                <el-input v-model="readerRowData.saleMethodName" readonly></el-input>
            </el-form-item>
            <el-form-item label="分管部门：" prop="chargeDepartmentName">
                <el-input v-model="readerRowData.chargeDepartmentName" readonly></el-input>
            </el-form-item>
            <el-form-item label="专营业务员：" prop="franchiseClerkName">
                <el-input v-model="readerRowData.franchiseClerkName" readonly></el-input>
            </el-form-item>
            <el-form-item label="信用额度：" prop="creditAmount">
                <el-input v-model="readerRowData.creditAmount" readonly></el-input>
            </el-form-item>
            <el-form-item label="结算期限：" prop="settlementPeriodName">
                <el-input v-model="readerRowData.settlementPeriodName" readonly></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="readerRowData.remark" readonly></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                readerRowData:{},
                rowId: this.$store.state.customerStore.rowId,
            }
        },
        methods:{
            getUpdateData(){
                this.$http.get(this.$url + 'client/findSingleClientById?id=' + this.rowId).then(res => {
                    if(res.data.code == 20001) {
                        this.readerRowData = res.data.data;
                    }
                })
            }
        },
        mounted() {
            this.getUpdateData();
        }
    }
</script>
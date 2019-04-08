<template>
    <div class="Look">        
        <el-form label-width="100px" :model="LookStaffFormData" ref="LookStaff" status-icon>
            <el-form-item label="登录名：" prop="userName" >
                <el-input v-model="LookStaffFormData.userName" readonly></el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="LookStaffFormData.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="LookStaffFormData.mnemonicCode" readonly></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-input v-model="LookStaffFormData.sex" readonly></el-input>
            </el-form-item>
            <el-form-item label="身份证：" prop="idNumber">
                <el-input v-model="LookStaffFormData.idNumber" readonly></el-input>                    
            </el-form-item>
            <el-form-item label="出生日期：" prop="birthday">
                <el-input v-model="LookStaffFormData.birthday" readonly></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
                <el-input v-model="LookStaffFormData.phone" readonly></el-input>
            </el-form-item>
            <el-form-item label="座机：" prop="telephone">
                <el-input v-model="LookStaffFormData.telephone" readonly></el-input>
            </el-form-item>
            <el-form-item label="微信：" prop="wechatNumber">
                <el-input v-model="LookStaffFormData.wechatNumber" readonly></el-input>
            </el-form-item>
            <el-form-item label="QQ：" prop="qqNumber">
                <el-input v-model="LookStaffFormData.qqNumber" readonly></el-input>
            </el-form-item>
            <el-form-item label="微博：" prop="microblogNumber">
                <el-input v-model="LookStaffFormData.microblogNumber" readonly></el-input>
            </el-form-item>
            <el-form-item label="文化程度：" prop="educationAux">
                <el-input v-model="LookStaffFormData.educationAux" readonly></el-input>
            </el-form-item>
            <el-form-item label="部门：" prop="department">
                <el-input v-model="LookStaffFormData.deptName" readonly></el-input>
            </el-form-item>
            <el-form-item label="职务：" prop="positionAux">
                <el-input v-model="LookStaffFormData.positionAux" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户银行：" prop="bank">
                <el-input v-model="LookStaffFormData.bank" readonly></el-input>
            </el-form-item>
            <el-form-item label="开户网点：" prop="bankBranches">
                <el-input v-model="LookStaffFormData.bankBranches" readonly></el-input>
            </el-form-item>
            <el-form-item label="银行账号：" prop="bankAccount">
                <el-input v-model="LookStaffFormData.bankAccount" readonly></el-input>
            </el-form-item>
            <el-form-item label="入职时间：" prop="hiredate">
                <el-input v-model="LookStaffFormData.hiredate" readonly></el-input>
                
            </el-form-item>
            <el-form-item label="离职时间：" prop="termdate">
                <el-input v-model="LookStaffFormData.termdate" readonly></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
                <el-input v-model="LookStaffFormData.address" readonly></el-input>
            </el-form-item>
            <el-form-item label="职员类别：" prop="typeAux">
                <el-input v-model="LookStaffFormData.typeAux" readonly></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark" readonly>
                <el-input
                type="textarea"
                autosize
                v-model="LookStaffFormData.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            LookStaffFormData:{},      //查看职员的表单
            rowId:this.$store.state.staffStore.rowId,             //修改行的id
        }
    },
    methods:{
        getLookData(){
            this.$http.get(this.$url + 'employee/findSingleEmployee?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    this.LookStaffFormData = res.data.data;
                }
            })
        }
    },
    created(){
        this.getLookData()
    }
}
</script>


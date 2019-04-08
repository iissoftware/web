<template>
    <div class="form">
        <!-- 前翻后翻组件 -->
        <modify :tableData="$store.state.staffStore.staffData" :currentId="rowId" @getPositionData="getPositionData"/>
        <el-form label-width="100px" :model="updateFormDatastaff" ref="UpdateStaff" status-icon :rules="AddFormRules" style="margin-top:10px">
            <el-form-item label="用户名：" prop="userName" >
                <el-input v-model="updateFormDatastaff.userName" @keyup.enter.native="enterKey($event, 'S0')"></el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="updateFormDatastaff.name" ref="S0" @keyup.enter.native="enterKey($event, 'S1')"></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="updateFormDatastaff.mnemonicCode" ref="S1" @keyup.enter.native="enterKey($event, 'S2')"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-select v-model="updateFormDatastaff.sex" filterable default-first-option placeholder="选择性别" ref="S2" @keyup.enter.native="enterKey($event, 'S3')">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="身份证：" prop="idNumber">
                <el-input v-model="updateFormDatastaff.idNumber" ref="S3" @keyup.enter.native="enterKey($event, 'S4')"></el-input>                    
            </el-form-item>
            <el-form-item label="出生日期：" prop="birthday">
                <el-date-picker
                v-model="updateFormDatastaff.birthday"
                type="date"
                placeholder="选择日期" 
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                ref="S4" @keyup.enter.native="enterKey($event, 'S5')">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
                <el-input v-model="updateFormDatastaff.phone" ref="S5" @keyup.enter.native="enterKey($event, 'S6')"></el-input>
            </el-form-item>
            <el-form-item label="座机：" prop="telephone">
                <el-input v-model="updateFormDatastaff.telephone" ref="S6" @keyup.enter.native="enterKey($event, 'S7')"></el-input>
            </el-form-item>
            <el-form-item label="微信：" prop="wechatNumber">
                <el-input v-model="updateFormDatastaff.wechatNumber" ref="S7" @keyup.enter.native="enterKey($event, 'S8')"></el-input>
            </el-form-item>
            <el-form-item label="QQ：" prop="qqNumber">
                <el-input v-model="updateFormDatastaff.qqNumber" ref="S8" @keyup.enter.native="enterKey($event, 'S9')"></el-input>
            </el-form-item>
            <el-form-item label="微博：" prop="microblogNumber">
                <el-input v-model="updateFormDatastaff.microblogNumber" ref="S9" @keyup.enter.native="enterKey($event, 'S10')"></el-input>
            </el-form-item>
            <el-form-item label="文化程度：" prop="education">
                <el-select v-model="updateFormDatastaff.education" placeholder="选择文化程度" ref="S10" @keyup.enter.native="enterKey($event, 'S11')" clearable>
                    <el-option v-for="(items, index) in educationlist"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门：" prop="department">
                <el-input v-model="departmentName" readonly @click.native="chooseDepartment" placeholder="选择部门" ref="S11" @keyup.enter.native="enterKey($event, 'S12')"></el-input>
                <el-input v-model="updateFormDatastaff.department" readonly placeholder="选择部门" style="display:none"></el-input>
            </el-form-item>
            <el-form-item label="职务：" prop="position">
                <el-select v-model="updateFormDatastaff.position" placeholder="选择职务" ref="S12" @keyup.enter.native="enterKey($event, 'S13')">
                    <el-option v-for="(items, index) in positionlist"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开户银行：" prop="bank">
                <el-input v-model="updateFormDatastaff.bank" ref="S13" @keyup.enter.native="enterKey($event, 'S14')"></el-input>
            </el-form-item>
            <el-form-item label="开户网点：" prop="bankBranches">
                <el-input v-model="updateFormDatastaff.bankBranches" ref="S14" @keyup.enter.native="enterKey($event, 'S15')"></el-input>
            </el-form-item>
            <el-form-item label="银行账号：" prop="bankAccount">
                <el-input v-model="updateFormDatastaff.bankAccount" ref="S15" @keyup.enter.native="enterKey($event, 'S16')"></el-input>
            </el-form-item>
            <el-form-item label="入职时间：" prop="hiredate">
                <el-date-picker
                v-model="updateFormDatastaff.hiredate"
                type="date"
                placeholder="选择日期" 
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                ref="S16" @keyup.enter.native="enterKey($event, 'S17')">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="离职时间：" prop="termdate">
                <el-date-picker
                v-model="updateFormDatastaff.termdate"
                type="date"
                placeholder="选择日期" 
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                ref="S17" @keyup.enter.native="enterKey($event, 'S18')">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
                <el-input v-model="updateFormDatastaff.address" ref="S18" @keyup.enter.native="enterKey($event, 'S19')"></el-input>
            </el-form-item>
            <el-form-item label="职员类别：" prop="type">
                <el-select v-model="updateFormDatastaff.type" placeholder="选择职员类别" ref="S19" @keyup.enter.native="enterKey($event, 'S20')" clearable>
                    <el-option v-for="(items, index) in typelist"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input
                type="textarea"
                autosize
                v-model="updateFormDatastaff.remark"
                ref="S20">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="modifysave('UpdateStaff')">保存</el-button>
                <el-button type="danger" size="small" @click="leaveRow">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import modify from '../modify'
export default {
    components: {
        modify
    },
    data(){
        var isName = (rule,value,callback) =>{
            if(!value){
                callback(new Error('名称不能为空'))
            }else{
                var obj = {
                    name: value,
                    id: this.updateFormDatastaff['id'],
                    systemId: this.updateFormDatastaff['systemId']
                }
                this.$http({
                    url: this.$url +'employee/updatecheckEmpName',
                    method: 'post',
                    params: obj
                }).then(res => {
                    if(res.data.code == 20001){
                        callback();
                    }else{
                        callback(new Error(res.data.msg))
                    }
                    callback();
                })
            }
        }
        var isSure = (rule, value, callback) => {
            if (value) {
                let reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(!reg.test(value)){
                    callback(new Error('输入的身份证号有误'))
                }else{
                    callback()
                }
            }else{
                callback();
            }
        }
        var isbankAccount = (rule, value, callback) => {
            if(!value){
                callback(new Error('银行账号不能为空'))
            }else{
                if(!(/^[0-9]+$/).test(value)){
                    callback(new Error('只能输入数字'))
                }else{
                    callback();
                } 
            }
        }
        var isPhone = (rule,value,callback) => {
            if(!value){
                callback(new Error('手机不能为空'))
            }else{
                if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value))){ 
                    callback(new Error('手机号码有误'))
                }else{
                    this.$http.post(this.$url +'employee/findUsernameByPhone?phone='+value).then(res => {
                        if(res.data.code == 20001){
                            callback();
                            this.updateFormDatastaff['userName'] = res.data.data;
                        }
                        callback();
                    })
                }
            }
        }
        return{
            systemId:this.$store.state.systemId,            //系统参数id 
            educationlist:[],                               //学历下拉框列表
            positionlist:[],                                //职务下拉框列表
            typelist:[],                                    // 职员类别下拉框列表
            updateFormDatastaff:{                           //修改职员的表单
                userName:'',
                name:'',
                mnemonicCode:'',
                sex:'',
                idNumber:'',
                birthday:'',
                phone:'',
                telephone:'',
                wechatNumber:'',
                qqNumber:'',
                microblogNumber:'',
                education:'',
                department:'',
                position:'',
                bank:'',
                bankBranches:'',
                bankAccount:'',
                hiredate:'',
                termdate:'',
                address:'',
                type:'',
                remark:'',
            },         
            AddFormRules: {                                 //修改数据验证
                userName:[{required:true,message:'用户名不能为空',trigger:'blur'}],
                name:[{required:true,validator:isName,trigger:'blur'}],
                sex:[{required:true,message:'选择性别',trigger:'change'}],
                department:[{required:true,message:'选择部门',trigger:'change'}],
                position:[{required:true,message:'选择职务',trigger:'change'}],
                bank:[{required:true,message:'开户银行不能为空',trigger:'blur'}],
                bankBranches:[{required:true,message:'开户网点不能为空',trigger:'blur'}],
                idNumber:[{required:false,validator:isSure,trigger:'blur'}],
                phone:[{required: true,validator:isPhone, trigger: 'blur'}],
                bankAccount:[{required:true,validator:isbankAccount,trigger:'blur'}],
            },
            rowId:this.$store.state.staffStore.rowId,        //修改行的id
            departmentName:'',                               //部门名称
            depName:this.$store.state.staffStore.depName,    //部门名字                                      //前翻后翻
        }
    },
    watch:{
        depName(){
            if(this.depName.length > 0){
                this.departmentName = this.depName[0]['name'];
                this.updateFormDatastaff['department'] = this.depName[0]['id'];
            }
        }
    },
    methods:{
        modifysave(formName) {                  //修改职员保存按钮
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.updateFormDatastaff['sex'] == '1'){
                        this.updateFormDatastaff['sex'] = '男'
                    }else if (this.updateFormDatastaff['sex'] == '0'){
                        this.updateFormDatastaff['sex'] = '女'
                    }
                    let data = {        //重新组装数据
                        userName: this.updateFormDatastaff['userName'],
                        name: this.updateFormDatastaff['name'],
                        mnemonicCode: this.updateFormDatastaff['mnemonicCode'],
                        sex: this.updateFormDatastaff['sex'],
                        idNumber: this.updateFormDatastaff['idNumber'],
                        birthday: this.updateFormDatastaff['birthday'],
                        phone: this.updateFormDatastaff['phone'],
                        telephone: this.updateFormDatastaff['telephone'],
                        wechatNumber: this.updateFormDatastaff['wechatNumber'],
                        qqNumber: this.updateFormDatastaff['qqNumber'],
                        microblogNumber: this.updateFormDatastaff['microblogNumber'],
                        education: this.updateFormDatastaff['education'],
                        department : this.updateFormDatastaff['department'],
                        position: this.updateFormDatastaff['position'],
                        bank: this.updateFormDatastaff['bank'],
                        bankBranches:this.updateFormDatastaff['bankBranches'],
                        bankAccount:this.updateFormDatastaff['bankAccount'],
                        hiredate: this.updateFormDatastaff['hiredate'],
                        termdate: this.updateFormDatastaff['termdate'],
                        address: this.updateFormDatastaff['address'],
                        type: this.updateFormDatastaff['type'],
                        remark: this.updateFormDatastaff['remark'],
                        id:this.updateFormDatastaff['id'],
                    }
                    this.$http({
                        method: "post",
                        url: this.$url + "employee/updateEmployee",
                        params: data,
                        dataType: 'json'
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '数据修改成功', type: 'success', duration: 1500});
                            this.$store.commit('staffStore/updateNewdeptId', this.updateFormDatastaff['department'])
                            setTimeout(() => {
                                this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.updateFormDatastaff['department'] + '&systemId=' + this.systemId);
                                this.$store.dispatch('staffStore/getSearch',this.$url + 'employee/selectEmployeeByName')
                                this.leaveRow();
                            },1000)                        
                        }else{
                            this.$message({message: res.data.msg,type:'error'});
                        }
                    })
                } else {
                    this.$message({message: '必填项不能为空', type: 'error',duration: 1500});
                }
            })
        },        
        getNowStaff(){                          //获取当前修改职员信息
            this.$http.get(this.$url + 'employee/findSingleEmployee?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    this.updateFormDatastaff = res.data.data;
                    this.departmentName = res.data.data['deptName']
                }
            })
            // 文化程度
            let text1 = encodeURI('文化程度');
            this.$http.get(this.$url + "employee/InformationByName?categoryName=" + text1 + '&systemId=' + this.systemId).then(res => {
                if(res.data.code == 20001) {
                    this.educationlist = res.data.data;     
                }
            })
            // 职务
            let text2 = encodeURI('职务')
            this.$http.get(this.$url + 'employee/InformationByName?categoryName='+text2 + '&systemId=0').then(res => {
                if(res.data.code == 20001) {
                    this.positionlist = res.data.data;     
                }
            })
            // 职员类型
            let text3 = encodeURI('职员类别');
            this.$http.get(this.$url + 'employee/InformationByName?categoryName='+text3 + '&systemId=' + this.systemId).then(res => {
                if(res.data.code == 20001) {
                    this.typelist = res.data.data;    
                }
            })
        },
        chooseDepartment(){                     //部门选择页面
            this.$util.openSubLayerIframe('职员-部门选择', 15, '400px', '350px', this.$domain + '/#/staff/chooseDepartment');
        },
        getPositionData(row) {                  //前翻后翻
            this.updateFormDatastaff = row;
            this.departmentName = this.updateFormDatastaff['deptName']
        },
        enterKey(lastRef, nextRef) {		    //回车键换行
            this.$refs[nextRef].focus();                     
        },
        leaveRow(){                             //关闭
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }       
    },
    mounted(){
        this.getNowStaff();
    }
}
</script>
<style lang="less">
    .form .el-input--prefix .el-input__inner{padding-left:30px !important;}
</style>

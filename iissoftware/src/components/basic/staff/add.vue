<template>
    <!-- 新增页面 -->
    <div class="add">
        <el-form label-width="100px" :model="addRowFormData" ref="addRowForm" status-icon :rules="AddFormRules">
            <el-form-item label="用户名：" prop="userName" >
                <el-input v-model="addRowFormData.userName" @keyup.enter.native="enterKey($event, 'ST0')" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="addRowFormData.name" ref="ST0" @keyup.enter.native="enterKey($event, 'ST1')"></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="addRowFormData.mnemonicCode" ref="ST1" @keyup.enter.native="enterKey($event, 'ST2')"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-select v-model="addRowFormData.sex" filterable default-first-option placeholder="选择性别" ref="ST2" @keyup.enter.native="enterKey($event, 'ST3')">
                    <el-option label="男" value=1></el-option>
                    <el-option label="女" value=0></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="身份证：" prop="idNumber">
                <el-input v-model="addRowFormData.idNumber" ref="ST3" @keyup.enter.native="enterKey($event, 'ST4')"></el-input>                    
            </el-form-item>
            <el-form-item label="出生日期：" prop="birthday">
                <el-date-picker
                v-model="addRowFormData.birthday"
                type="date"
                placeholder="选择日期" 
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                ref="ST4" @keyup.enter.native="enterKey($event, 'ST5')">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
                <el-input v-model="addRowFormData.phone" ref="ST5" @keyup.enter.native="enterKey($event, 'ST6')"></el-input>
            </el-form-item>
            <el-form-item label="座机：" prop="telephone">
                <el-input v-model="addRowFormData.telephone" ref="ST6" @keyup.enter.native="enterKey($event, 'ST7')"></el-input>
            </el-form-item>
            <el-form-item label="微信：" prop="wechatNumber">
                <el-input v-model="addRowFormData.wechatNumber" ref="ST7" @keyup.enter.native="enterKey($event, 'ST8')"></el-input>
            </el-form-item>
            <el-form-item label="QQ：" prop="qqNumber">
                <el-input v-model="addRowFormData.qqNumber" ref="ST8" @keyup.enter.native="enterKey($event, 'ST9')"></el-input>
            </el-form-item>
            <el-form-item label="微博：" prop="microblogNumber">
                <el-input v-model="addRowFormData.microblogNumber" ref="ST9" @keyup.enter.native="enterKey($event, 'ST10')"></el-input>
            </el-form-item>
            <el-form-item label="文化程度：" prop="education">
                <el-select v-model="addRowFormData.education" placeholder="选择文化程度" ref="ST10" @keyup.enter.native="enterKey($event, 'ST11')" clearable>
                    <el-option v-for="(items, index) in educationlist"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门：" prop="department">
                <el-input v-model="departmentName" readonly @click.native="chooseDepartment" placeholder="选择部门" ref="ST11" @keyup.enter.native="enterKey($event, 'ST12')"></el-input>
                <el-input v-model="addRowFormData.department" readonly placeholder="选择部门" style="display:none;"></el-input>
            </el-form-item>
            <el-form-item label="职务：" prop="position">
                <el-select v-model="addRowFormData.position" placeholder="选择职务" ref="ST12" @keyup.enter.native="enterKey($event, 'ST13')">
                    <el-option v-for="(items, index) in positionlist"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开户银行：" prop="bank">
                <el-input v-model="addRowFormData.bank" ref="ST13" @keyup.enter.native="enterKey($event, 'ST14')"></el-input>
            </el-form-item>
            <el-form-item label="开户网点：" prop="bankBranches">
                <el-input v-model="addRowFormData.bankBranches" ref="ST14" @keyup.enter.native="enterKey($event, 'ST15')"></el-input>
            </el-form-item>
            <el-form-item label="银行账号：" prop="bankAccount">
                <el-input v-model="addRowFormData.bankAccount" ref="ST15" @keyup.enter.native="enterKey($event, 'ST16')"></el-input>
            </el-form-item>
            <el-form-item label="入职时间：" prop="hiredate">
                <el-date-picker
                v-model="addRowFormData.hiredate"
                type="date"
                placeholder="选择日期" ref="ST16"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                @keyup.enter.native="enterKey($event, 'ST17')">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="离职时间：" prop="termdate">
                <el-date-picker
                v-model="addRowFormData.termdate"
                type="date"
                placeholder="选择日期" ref="ST17" 
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                @keyup.enter.native="enterKey($event, 'ST18')">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
                <el-input v-model="addRowFormData.address" ref="ST18" @keyup.enter.native="enterKey($event, 'ST19')"></el-input>
            </el-form-item>
            <el-form-item label="职员类别：" prop="type">
                <el-select v-model="addRowFormData.type" placeholder="选择职员类别" ref="ST19" @keyup.enter.native="enterKey($event, 'ST20')" clearable>
                    <el-option v-for="(items, index) in typelist"  :label="items.detailedName" :value="items.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input
                    type="textarea"
                    autosize
                    v-model="addRowFormData.remark">
                </el-input>
            </el-form-item>
            <el-form-item label="连续增加：">
                <el-checkbox v-model="continuousInsert"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="finishstaff('addRowForm')">保存</el-button>
                <el-button type="danger" size="small" @click="leaveRow">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        var isName = (rule,value,callback) =>{
            if(!value){
                callback(new Error('名称不能为空'))
            }else{
                this.$http.post(this.$url +'employee/insertcheckEmpName?name='+value).then(res => {
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
                            this.addRowFormData['userName'] = res.data.data;
                        }
                        callback();
                    })
                }
            }
        }
        return{
            systemId:this.$store.state.systemId,            //系统参数id 
            addRowFormData:{                                //新增职员信息
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
            AddFormRules: {                                 //新增数据验证
                name:[{required:true,validator:isName,trigger:'blur'}],
                sex:[{required:true,message:'性别不能为空',trigger:'change'}],
                department:[{required:true,message:'部门不能为空'}],
                position:[{required:true,message:'职务不能为空',trigger:'change'}],
                bank:[{required:true,message:'开户银行不能为空',trigger:'blur'}],
                bankBranches:[{required:true,message:'开户网点不能为空',trigger:'blur'}],
                idNumber:[{required:false,validator:isSure,trigger:'blur'}],
                phone:[{required: true,validator:isPhone, trigger: 'blur'}],
                bankAccount:[{required:true,validator:isbankAccount,trigger:'blur'}],
            },
            departmentName:'',                               //部门名称
            continuousInsert: false,
            educationlist:[],                               //文化程度
            positionlist:[],                                //职务
            typelist:[],                                    //职员类别
            depName:this.$store.state.staffStore.depName,   //部门名字
        }
    },
    watch:{
        depName(){
            if(this.depName.length > 0){
                this.departmentName = this.depName[0]['name'];
                this.addRowFormData['department'] = this.depName[0]['id'];
            }
        },
        addRowFormData: {
            handler(newVal) {
                localStorage.setItem('addStaff', JSON.stringify(this.addRowFormData));
                if(this.depName.length > 0){
                    localStorage.setItem('departName', JSON.stringify(this.depName));
                }
            },
            deep: true
        }
    },
    methods:{       
        finishstaff(formName) {             // 新增职员保存按钮    
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    if(this.addRowFormData['sex'] == '1'){
                        this.addRowFormData['sex'] = '男'
                    }else if (this.addRowFormData['sex'] == '0'){
                        this.addRowFormData['sex'] = '女'
                    }
                    var data = {        //重新组装数据
                        userName: this.addRowFormData['userName'],
                        name: this.addRowFormData['name'],
                        mnemonicCode: this.addRowFormData['mnemonicCode'],
                        sex: this.addRowFormData['sex'],
                        idNumber: this.addRowFormData['idNumber'],
                        birthday: this.addRowFormData['birthday'],
                        phone: this.addRowFormData['phone'],
                        telephone: this.addRowFormData['telephone'],
                        wechatNumber: this.addRowFormData['wechatNumber'],
                        qqNumber: this.addRowFormData['qqNumber'],
                        microblogNumber: this.addRowFormData['microblogNumber'],
                        education: this.addRowFormData['education'],
                        department : this.addRowFormData['department'],
                        position: this.addRowFormData['position'],
                        bank: this.addRowFormData['bank'],
                        bankBranches:this.addRowFormData['bankBranches'],
                        bankAccount:this.addRowFormData['bankAccount'],
                        hiredate: this.addRowFormData['hiredate'],
                        termdate: this.addRowFormData['termdate'],
                        address: this.addRowFormData['address'],
                        type: this.addRowFormData['type'],
                        remark: this.addRowFormData['remark'],
                        systemId:this.systemId
                    }
                    this.$http({
                        method: "post",
                        url: this.$url + "employee/insertEmployee",
                        params: data
                    }).then(res => {                        
                        if(res.data.code == 20001) {
                            localStorage.removeItem('addStaff');
                            localStorage.removeItem('departName');
                            this.$message({message: '添加成功', type: 'success',duration: 1500});
                            this.$store.commit('staffStore/updateNewdeptId', this.addRowFormData['department'])
                            if(this.continuousInsert){
                                setTimeout(() => {
                                    this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.addRowFormData['department'] + '&systemId=' + this.systemId);
                                    this.$store.dispatch('staffStore/getSearch',this.$url + 'employee/selectEmployeeByName')
                                    this.$refs['addRowForm'].resetFields();
                                    this.getTime();
                                    this.departmentName = '';
                                },1000)                               
                            }else{
                                setTimeout(() => {
                                    this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.addRowFormData['department'] + '&systemId=' + this.systemId);
                                    this.$store.dispatch('staffStore/getSearch',this.$url + 'employee/selectEmployeeByName')
                                    let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                                    parent.layer.close(index);
                                },1000)
                            }
                        } else {
                            if(res.data.msg) {
                                this.$message.error(res.data.msg);
                            }                    
                        }
                    })
                } else {
                    this.$message({message: '必填项不能为空', type: 'error',duration: 1500});
                }
            });
        },
        chooseDepartment(){                 //显示选择部门页面
            this.$util.openSubLayerIframe('职员-部门选择', 15, '400px', '350px', this.$domain + '/#/staff/chooseDepartment');
        },
        enterKey(lastRef, nextRef) {		//回车键换行
            this.$refs[nextRef].focus();
        },
        leaveRow(){                         //离开按钮
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        },
        getList(){                          //获取下拉框数据
             // 文化程度
            let text1 = encodeURI('文化程度');
            this.$http.get(this.$url + "employee/InformationByName?categoryName=" + text1 + '&systemId=' + this.systemId).then(res => {
                if(res.data.code == 20001) {
                    this.educationlist = res.data.data;    
                }
            })
            // 职务
            let text2 = encodeURI('职务');
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
        getTime(){                          //入职时间
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
            this.addRowFormData.hiredate = all;
        },
    },
    mounted(){
        this.getList();
        this.getTime();
        if(localStorage.getItem('addStaff')){
            this.addRowFormData = JSON.parse(localStorage.getItem('addStaff'))
            if(this.addRowFormData['department']) {
                let depart = JSON.parse(localStorage.getItem('departName'));
                this.addRowFormData['department'] = depart[0]['id'];
                this.departmentName = depart[0]['name'];
            }           
        }
    },
}
</script>

<style lang="less">
    .add .el-input--prefix .el-input__inner{padding-left:30px !important;}
</style>





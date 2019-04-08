<template>
    <div class="systemInfo">
        <div class="block-area" style="overflow: hidden;">
            <div class="btn-group">
                
                <el-button type="primary" size="small" style="margin-bottom: 20px;" v-if="isDisabled">保存</el-button>
                <el-button type="primary" size="small" @click="save('formRef')" style="margin-bottom: 20px;" v-else>保存</el-button>
                <el-button type="primary" size="small" v-if="isDisabled" @click="update">修改</el-button>
                <el-button type="danger" size="small" @click="close" style="margin-bottom: 20px;">关闭</el-button>
                <el-button-group class="btn-other">
                    <el-button title="导出" @click="exportExcel">
                        <img src="../../../assets/images/export.png" alt="">
                    </el-button>
                    <el-button title="导入">
                        <el-upload class="upload-demo" :action="$url + 'systemParameters/importSystemInformation?userName=' + userName" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcel">
                            <img src="../../../assets/images/import.png" alt="">
                        </el-upload>
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
        <div class="title">公司信息</div>
        <div class="formDiv">
            <div class="form">
                <el-form :model="formData" label-position="left" label-width="150px" status-icon ref="formRef" class="demo-ruleForm" :rules="formRules">
                    <el-form-item label="公司名称（中文）：" prop="companyNameChinese">
                        <el-input v-model.trim="formData.companyNameChinese" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称（英文）：" prop="companyNameEnglish">
                        <el-input v-model.trim="formData.companyNameEnglish" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="账套名：" prop="accountSet">
                        <el-input v-model.trim="formData.accountSet" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简称（中文）：" prop="companyAbbreviationChinese">
                        <el-input v-model.trim="formData.companyAbbreviationChinese" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简称（英文）：" prop="companyAbbreviationEnglish">
                        <el-input v-model.trim="formData.companyAbbreviationEnglish" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="行业：" prop="industry">
                        <el-select v-model="formData.industry" filterable placeholder="请选择行业" style="width: 100%">
                            <el-option v-for="item in industry" :key="item['id']" :label="item['detailedName']" :value="item['id']" :disabled="isDisabled"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="税号：" prop="dutyParagraph">
                        <el-input v-model="formData.dutyParagraph" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号：" prop="bankAccount">
                        <el-input v-model="formData.bankAccount" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="国家：" prop="countryId">
                        <el-select v-model="formData.countryId" filterable placeholder="选择国家" style="width: 100% !important">
                            <el-option v-for="country in country" :key="country['id']" :label="country['name']" :value="country['id']" :disabled="isDisabled"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="省份：" prop="proviceId">
                        <el-select v-model="formData.proviceId" filterable placeholder="选择省份" style="width: 100% !important">
                            <el-option v-for="province in province" :key="province['id']" :label="province['name']" :value="province['id']" :disabled="isDisabled"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="城市：" prop="cityId">
                        <el-select v-model="formData.cityId" filterable placeholder="选择城市" style="width: 100% !important">
                            <el-option v-for="cities in city" :key="cities['id']" :label="cities['name']" :value="cities['id']" :disabled="isDisabled"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区/县：" prop="areaId">
                        <el-select v-model="formData.areaId" filterable placeholder="选择区/县" style="width: 100% !important">
                            <el-option v-for="area in area" :key="area['id']" :label="area['name']" :value="area['id']" :disabled="isDisabled"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址（中文）：">
                        <el-input v-model="formData.addressChinese" placeholder="输入详细地址" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="地址（英文）：" prop="addressEnglish">
                        <el-input v-model="formData.addressEnglish" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="电话：" prop="phone">
                        <el-input v-model="formData.phone" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="传真：" prop="fax">
                        <el-input v-model="formData.fax" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="formData.email" :readonly="isDisabled"></el-input>
                    </el-form-item>
                    <div class="line">
                        <el-form-item label="代码：" prop="currencyCode">
                            <el-input v-model="formData.currencyCode" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="名称：" prop="currencyName">
                            <el-select v-model="formData.currencyName" filterable style="width: 100%; !important" @change="selectCurrentName" :disabled="isDisabled">
                                <el-option v-for="item in allUnit" :key="item['id']" :label="item['name']" :value="item['name']"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="小位数：" prop="smallDigit">
                            <el-input v-model="formData.smallDigit" :disabled="isDisabled"></el-input>
                        </el-form-item>
                    </div>
                    <!-- <el-form-item>
                        <el-button type="primary" size="small" style="margin-bottom: 20px;" v-if="isDisabled">保存</el-button>
                        <el-button type="primary" size="small" @click="save('formRef')" style="margin-bottom: 20px;" v-else>保存</el-button>
                        <el-button type="danger" size="small" @click="close" style="margin-bottom: 20px;">关闭</el-button>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    /**
 * Author: iissoftware
 * Date: 2018-12-03
 * Description: 系统信息组件
*/
export default {
    data() {
        return {
            status: this.$store.state.accountStore.status,
            formData: {
                companyNameChinese: '',
                accountSet: '',
                industry: '',
                countryId: '',
                proviceId: '',
                cityId: '',
                areaId: '',
                addressChinese: '',
                currencyCode: 'RMB',
                currencyName: '人民币',
                smallDigit: '2'
            },
            formRules: {
                companyNameChinese: [{required: true, message: '公司名称不能为空', triggle: 'blur'}],
                industry: [{required: true, message: '行业不能为空', triggle: 'change'}],
                accountSet: [{required: true, message: '账套名不能为空', triggle: 'blur'}]
            },
            industry: [],       //行业
            allUnit: [],        //币种单位
            userName: this.$util.getItem('username') || '',
            country: [],        //国家
            province: [],       //省份
            city: [],       //城市
            area: [],       //区/县
            systemId: this.$store.state.systemId,
            companyName: '',            //存储公司名称
            accountSet: '',              //账套名
            isDisabled: false
        }
    },
    watch: {
        status(newVal) {          //监听状态变化
            if(newVal[0] != 2) {
                this.isDisabled = false;
            }
            if(newVal[0] == 1) {
                this.$refs['formRef'].resetFields();
            } else if(newVal[0] == 0) {
                this.getSystemInfo();
            } else if(newVal[0] == 2) {
                //展示双击账套的信息
                let accountId = this.$store.state.accountStore.accountInfoId;
                this.getSystemInfoById(accountId);
                this.isDisabled = true;
            } else if(newVal[0] == 3) {
                let accountId = this.$store.state.accountStore.accountInfoId
                this.getSystemInfoById(accountId);
            }
        },
        'formData.countryId'(newVal, oldVal) {          //监听国家变化
            this.getProvinceData(newVal);
            if(oldVal && (newVal != oldVal)) {
                this.formData['proviceId'] = '';            //清空省份数据
                this.formData['cityId'] = '';               //清空城市数据
                this.formData['areaId'] = '';               //清空区/县数据
                this.formData['addressChinese'] = '';       //清空区/县数据
            }
        },
        'formData.proviceId'(newVal, oldVal) {          //监听省份变化
            this.getCityData(newVal);
            if(oldVal && (newVal != oldVal)) {
                this.formData['cityId'] = '';               //清空城市数据
                this.formData['areaId'] = '';               //清空区/县数据
                this.formData['addressChinese'] = '';       //清空区/县数据
            }
        },
        'formData.cityId'(newVal, oldVal) {          //监听省份变化
            this.getAreaData(newVal);
            if(oldVal && (newVal != oldVal)) {
                this.formData['areaId'] = '';               //清空区/县数据
                this.formData['addressChinese'] = '';       //清空区/县数据
            }
        },
        'formData.areaId'(newVal, oldVal) {          //监听区/县变化
            if(oldVal && (newVal != oldVal)) {
                this.formData['addressChinese'] = '';       //清空区/县数据
            }
        }
    },
    methods: {
        getSystemInfo() {           //获取系统参数
            this.$http.get(this.$url + 'systemParameters/selectSystemInfo?systemId=' + this.systemId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        res.data.data['industry'] = String(res.data.data['industry']);
                        this.formData = res.data.data;
                        this.$store.commit('setSystemId', res.data.data['id']);
                        this.companyName = res.data.data['companyNameChinese'];         //存储当前的公司名称
                        this.accountSet = res.data.data['accountSet'];         //存储当前的账套名
                    }
                }
            });
        },
        getSystemInfoById($id) {            //通过id查找对应的系统信息
            this.$http.get(this.$url + 'systemParameters/selectAccountSetById?id=' + $id).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        res.data.data['industry'] = String(res.data.data['industry']);
                        this.formData = res.data.data;
                    }
                }
            })
        },
        getIndustry() {         //获取行业数据
            this.$http.get(this.$url + 'auxiliaryInfoAllCategory/selectByIndustry').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        let newArr = [],
                            arr = res.data.data;
                        arr.forEach(item => {
                            item['id'] = item['id'].toString();
                            newArr.push(item);
                        });
                        this.industry = newArr;
                    }
                }
            });
        },
        getAllUnit() {          //获取币种单位
            this.$http.get(this.$url + 'currency/findCurrency').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        let newArr = [],
                        arr = res.data.data;
                        arr.forEach(item => item['state'] != 0 && (newArr.push(item)));
                        this.allUnit = newArr;
                    }
                }
            });
        },
        getCountryData() {          //获取国家
            this.$http.get(this.$url + 'city/findCountry').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.country = res.data.data;
                    }
                }
            });
        },
        getProvinceData($countryId) {         //获取省份
            this.$http.get(this.$url + 'city/findProvince?parentId=' + $countryId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.province = res.data.data;
                    }
                }
            });
        },
        getCityData($provinceId) {          //获取城市
            this.$http.get(this.$url + 'city/findCity?parentId=' + $provinceId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.city = res.data.data;
                    }
                }
            });
        },
        getAreaData($cityId) {             //获取区县数据
            this.$http.get(this.$url + 'city/findDistrict?parentId=' + $cityId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.area = res.data.data;
                    }
                }
            });
        },
        selectCurrentName(row) {           //选中币种单位名称
            let allUnit = this.allUnit;
            allUnit.forEach(item => item['name'] == row && (this.formData['currencyCode'] = item['code']));
        },
        save(formName) {        //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    /*
                        保存时，这里要做状态判断：
                        0: 正常显示系统信息（新增、修改）
                        1: 账套新增
                        2: 账套查看
                        3：账套修改
                    */
                    let status = this.$store.state.accountStore.status[0];
                    if(status == 1) {
                        //账套新增
                        this.addSystemInfo('账套新增成功');
                    } else if(status == 2) {
                        this.$message.warning('查看状态不可修改');
                        return false;
                    } else if(status == 3) {
                        //账套编辑
                        this.updateSystemInfo('账套修改成功');
                    } else if(status == 0) {
                        //系统参数新增或修改
                        this.formData['id'] ? this.updateSystemInfo('系统参数修改成功') : this.addSystemInfo('系统参数新增成功');
                    }
                }
            });
        },
        update() {          //修改
            this.$store.commit('accountStore/updateStatus', 3);
            // this.$store.commit('accountStore/updateAccountInfoId', id);
        },
        addSystemInfo(msg) {        //新增系统参数、账套
            if(this.formData['id']) delete this.formData['id'];
            this.$http({
                url: this.$url + 'systemParameters/insertSystemInformation',
                method: 'post',
                params: this.formData
            }).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg, type: 'success', duration: 2000});
                    let companyName = this.$store.state.companyName;            //判断公司名称是否存在，存在的话不让覆盖，只有第一次新增时才覆盖
                    if(!companyName) {
                        if(isUpdateCompanyName) this.$store.commit('updateCompanyNames', this.formData['companyNameChinese']);
                    }
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        updateSystemInfo(msg) {         //修改系统参数、账套
            delete this.formData['createTime'];
            delete this.formData['updateTime'];
            this.$http({
                url: this.$url + 'systemParameters/updateSystemInformation',
                method: 'post',
                params: this.formData
            }).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg, type: 'success', duration: 2000});
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        exportExcel() {         //导出
            if(this.formData['id']) {
                let $id = this.formData['id'].toString();
                this.$http.get(this.$url + 'systemParameters/exportSystemInformation?idStrs=' + $id).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'systemParameters/exportSystemInformation?idStrs=' + $id;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                });
            } else {
                this.$message.error('导出失败，请将系统信息填写完整');
            }
        },
        importExcel(res) {         //导入
            if(res.code === 20001) {    
                this.$message({message: '导入成功', type: 'success'});
                setTimeout(() => {
                    this.getSystemInfo();
                }, 1000);
            } else {
                this.$message.error(res.msg);
            }
        },
        refresh() {     //刷新
            this.getSystemInfo();
        },
        close() {           //关闭新增弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        },
        enterKey(lastRef, nextRef) {		//回车键换行
            if(lastRef.target.value) {
                this.$refs[nextRef].focus();
            }
        }
    },
    created() {
        this.getSystemInfo();
        this.getIndustry();
        this.getAllUnit();
        this.getCountryData();
    }
}
</script>

<style scoped>
    .systemInfo {background-color: #fff;height: 100% !important;}
    .systemInfo .title{
        text-align: center;
        font-size: 18px;
        padding: 15px 0;
    }
    .systemInfo .block-area {height: auto !important;}
    .formDiv {height: calc(100% - 100px) !important;overflow-y: auto !important;}
    .form {width: 50% !important;margin: 0 auto 40px;}
    .line {border: 1px solid #409eff;padding: 20px;border-radius: 6px;position: relative;}
    .line .el-form-item:last-child {margin-bottom: 0 !important;}
    .line:before {
        content: '记账本位币';
        position: absolute;
        top: -10px;
        left: 20px;
        background-color: #fff;
        font-size: 14px;
        padding-left: 10px;
        padding-right: 10px;
        color: #409eff;
    }
</style>


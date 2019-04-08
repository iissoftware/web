<template>
    <div class="systemInfo">
        <div class="block-area" style="overflow: hidden;">
            <div class="btn-group">
                <!-- <el-button type="info" @click="refresh">刷新</el-button> -->
                <el-button-group class="btn-other">
                    <el-button title="导出" @click="exportExcel">
                        <img src="../../../assets/images/export.png" alt="">
                    </el-button>
                    <el-button title="导入">
                        <el-upload class="upload-demo" :action="$url + 'systemParameters/importSysFinancialParameter?systemId=' + systemId" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcel">
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
        <div class="formDiv">
            <div class="form">
                <el-form :model="formData" label-position="left" label-width="150px" status-icon ref="formRef" class="demo-ruleForm" :rules="formRules">
                    <el-form-item label="启用会计年度：" prop="startAccountYear">
                        <el-select v-model="formData.startAccountYear" placeholder="选择启用会计年度" style="width: 100% !important" :disabled="status[0] == 2">
                            <el-option v-for="(item, index) in startAccountYear" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="启用会计期间：" prop="startAccountPeriod">
                        <el-select v-model="formData.startAccountPeriod" placeholder="选择启用会计区间" style="width: 100% !important" :disabled="status[0] == 2">
                            <el-option v-for="(item, index) in startAccountPeriod" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="当前会计年度：" prop="currentAccountYear">
                        <el-input type="text" v-model="formData.currentAccountYear" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="当前会计期间：" prop="currentAccountPeriod">
                        <el-input type="text" v-model="formData.currentAccountPeriod" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 15px !important">
                        <span class="textTip" :class="isOpen ? 'open' : 'close'">财务系统已经启用</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="save('formRef')" :disabled="status[0] == 2">保存</el-button>
                        <el-button type="danger" size="small" @click="close" :disabled="status[0] == 2">关闭</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    /**
 * Author: iissoftware
 * Date: 2018-12-03
 * Description: 财务参数组件
*/
export default {
    data() {
        return {
            isOpen: true,
            userName: this.$util.getItem('username') || '',
            systemId: this.$store.state.systemId,
            formData: {
                startAccountYear: '',
                startAccountPeriod: '',
                currentAccountYear: (new Date().getFullYear()).toString(),
                currentAccountPeriod: new Date().getMonth() + 1
            },
            formRules: {
                startAccountYear: [{required: true, message: '启用会计年度不能为空', triggle: 'blur'}],
                startAccountPeriod: [{required: true, message: '启用会计期间不能为空', triggle: 'blur'}],
            },
            startAccountYear: [],       //启用会计年度
            startAccountPeriod: [],      //启用会计区间
            status: this.$store.state.accountStore.status
        }
    },
    methods: {
        getData() {             //获取财务参数
            this.$http.get(this.$url + 'systemParameters/selectSysFinancialParameterByUser').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.formData['startAccountYear'] = String(res.data.data['startAccountYear']);
                        this.formData['startAccountPeriod'] = String(res.data.data['startAccountPeriod']);
                    } else {
                        this.formData['startAccountYear'] = (new Date().getFullYear()).toString();
                        this.formData['startAccountPeriod'] = (new Date().getMonth() + 1).toString();
                    }
                    this.defaultYear(this.formData['startAccountYear']);
                } else {
                    this.formData['startAccountYear'] = (new Date().getFullYear()).toString();
                    this.formData['startAccountPeriod'] = (new Date().getMonth() + 1).toString();
                    this.defaultYear(this.formData['startAccountYear']);
                }
            });
        },
        refresh() {             //刷新
            this.getData();
        },
        save(formName) {            //保存
            if(this.status[0] == 2) {
                this.$message.warning('查看状态下不可修改');
                return false;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.systemId) {
                        this.$message.error('先添加系统参数');
                        return false;
                    }
                    if(isNaN(this.formData['startAccountYear'])) {
                        this.$message({message: '启用会计年度不是4位数字', duration: 1000, type: 'warning'});
                        return false;
                    }
                    if(this.formData['startAccountYear'].length != 4) {
                        this.$message({message: '启用会计年度长度只能是4位数字', duration: 1000, type: 'warning'});
                        return false;
                    }
                    if(isNaN(this.formData['startAccountPeriod'])) {
                        this.$message({message: '启用会计区间不是一个数字', duration: 1000, type: 'warning'});
                        return false;
                    }
                    if(this.formData['startAccountPeriod'] < 1 || this.formData['startAccountPeriod'] > 12) {
                        this.$message({message: '启用会计区间输入不合法', duration: 1000, type: 'warning'});
                        return false;
                    }
                    let $url;
                    if(this.formData['id']) {
                        //修改
                        delete this.formData['createTime'];
                        delete this.formData['updateTime'];
                        delete this.formData['systemId'];
                        $url = this.$url + 'systemParameters/updateSysFinancialParameter';
                    } else {
                        //新增
                        this.formData['userName'] = this.userName;
                        $url = this.$url + 'systemParameters/insertSysFinancialParameter'
                    }
                    this.$http({
                        url: $url,
                        method: 'post',
                        params: this.formData
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '保存成功', duration: 1000, type: 'success'});
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },
        defaultYear(year) {
            let startYear = year - 100,
                endYear = parseInt(year) + 100;
            for(let i = startYear; i <= endYear; i++) {
                this.startAccountYear.push(i.toString());
            }
        },
        defaultMonth() {
            for(let i = 1; i <= 12; i++) {
                this.startAccountPeriod.push(i.toString());
            }
        },
        exportExcel() {         //导出
            if(!this.formData['id']) {
                this.$message.error({message: '请先添加财务参数', duration: 1000, type: 'warning'});
                return false;
            } else {
                this.$http.get(this.$url + 'systemParameters/exportSysFinancialParameter?idStrs=' + this.formData['id'].toString()).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'systemParameters/exportSysFinancialParameter?idStrs=' + this.formData['id'].toString();          //导出时触发
                });
            }
        },
        importExcel(res) {         //导入
            if(res.code === 20001) {    
                this.$message({message: '导入成功', type: 'success', duration: 1000});
                setTimeout(() => {
                    this.getData();
                }, 1000);
            } else {
                this.$message.error(res.msg);
            }
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
        this.getData();
        this.defaultMonth();
    }
}
</script>

<style scoped>
    .systemInfo {background-color: #fff;height: 100% !important;}
    .systemInfo .block-area {height: auto !important;}
    .form {width: 50% !important;margin: 15px auto 0;}
    .formDiv {height: calc(100% - 45px) !important;overflow-y: hidden !important;}
    .textTip {font-size: 16px;}
    .open {color: #008000;}
    .close {color: #f00;}
</style>


<template>
    <div class="form">
        <!-- 前后翻组件 -->
        <modify :tableData="$store.state.moneyTypeStore.tableData" :currentId="rowId" @getPositionData="getPositionData"/>
        <el-form label-width="95px" :model="formData" :label-position="labelPosition" ref="formRef" :rules="formRules" status-icon>
            <el-form-item label="名称：" prop="name" style="margin-top: 10px !important;">
                <el-input v-model.trim="formData.name" @keyup.enter.native="enterKey($event, 'MU1')"></el-input>
            </el-form-item>
            <el-form-item label="汇率：" prop="exchangeRate">
                <el-input v-model.trim="formData.exchangeRate" ref="MU1" @keyup.enter.native="enterKey($event, 'MU2')"></el-input>
            </el-form-item>
            <el-form-item label="折算方式：" prop="convertType">
                <el-select v-model="formData.convertType" ref="MU2" placeholder="选择折算方式" style="width: 100%">
                    <el-option label="原币*汇率=本位币" value="1"></el-option>
                    <el-option label="原币/汇率=本位币" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小数位：" prop="decimals">
                <el-input v-model.trim="formData.decimals" @keyup.enter.native="enterKey($event, 'MU3')"></el-input>
            </el-form-item>
            <el-form-item label="汇率类别：" prop="fixedExchangeRate">
                <el-select v-model="formData.fixedExchangeRate" ref="MU3" placeholder="选择汇率类别" style="width: 100%">
                    <el-option label="固定汇率" value="1"></el-option>
                    <el-option label="浮动汇率" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否可用：" style="margin-bottom: 10px !important;">
                <el-checkbox v-model="formData.lock"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('formRef')">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
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
    data() {
        let validateIsNum = (rule, value, callback) => {        //验证是否是一个数字
            if(!/^[0-9]+.?[0-9]*$/.test(value)) {
                return callback(new Error('只能输入数字！'));
            }
            callback();
        }
        return {
            labelPosition: 'left',
            formData: {
                name: '',
                exchangeRate: '',
                convertType: '',
                decimals: '',
                fixedExchangeRate: '',
                lock: true
            },
            formRules: {
                name: [{required: true, message: '输入名称', triggle: 'blur'}],
                exchangeRate: [{required: true, message: '输入汇率', triggle: 'blur'}],
                convertType: [{required: true, message: '选择折算方式', triggle: 'change'}],
                decimals: [{required: true, message: '输入小位数', triggle: 'blur'}, {validator: validateIsNum, trigger: 'blur'}],
                fixedExchangeRate: [{required: true, message: '选择汇率类别', trigger: 'change'}],
            },
            rowId: this.$store.state.moneyTypeStore.rowId
        }
    },
    methods: {
        getUpdateData() {           //获取要修改的数据
            this.$http.get(this.$url + 'currency/findCurrencyById?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        res.data.data['lock'] = Boolean(res.data.data['lock']);
                        res.data.data['decimals'] = res.data.data['decimals'].toString();
                        res.data.data['convertType'] = res.data.data['convertType'] == 1 ? '原币*汇率=本位币' : '原币/汇率=本位币';
                        res.data.data['fixedExchangeRate'] = res.data.data['fixedExchangeRate'] == 1 ? '固定汇率' : '浮动汇率';
                        this.formData = res.data.data;
                    }
                }
            });
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        id: this.formData['id'],
                        name: this.formData['name'],
                        exchangeRate: this.formData['exchangeRate'],
                        convertType: this.formData['convertType'] == '原币*汇率=本位币' || (this.formData['convertType'] == 1) ? 1 : 0,
                        decimals: this.formData['decimals'],
                        fixedExchangeRate: this.formData['fixedExchangeRate'] == '固定汇率' || (this.formData['fixedExchangeRate'] == 1) ? 1 : 0,
                        lock: this.formData['lock'] ? 1 : 0
                    }
                    this.$http({
                        method: "post",
                        url: this.$url + "currency/updateCurrency",
                        params: data,
                        dataType: 'json'
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '修改成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.close();
                                this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
                            }, 1000);
                        }
                    });
                }
            });
        },
        getPositionData(row) {          //获取指定位置的数据
            row['locks'] = Boolean(row['locks']);
            row['decimals'] = row['decimals'].toString();
            row['fixedExchangeRate'] = row['fixedExchangeRate'].toString();
            row['convertType'] = row['convertType'].toString();
            this.formData = row;
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
    mounted() {
        this.getUpdateData();
    }
}
</script>


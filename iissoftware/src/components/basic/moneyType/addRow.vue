<template>
    <div class="form">
        <el-form label-width="95px" :label-position="labelPosition" :model="formData" ref="formRef" status-icon :rules="formRules">
            <el-form-item label="名称：" prop="name" style="margin-top: 10px !important;">
                <el-input v-model.trim="formData.name" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
            </el-form-item>
            <el-form-item label="汇率：" prop="exchangeRate">
                <el-input v-model.trim="formData.exchangeRate" ref="MA1" @keyup.enter.native="enterKey($event, 'MA2')"></el-input>
            </el-form-item>
            <el-form-item label="折算方式：" prop="convertType">
                <el-select v-model="formData.convertType" ref="MA2" @keyup.enter.native="enterKey($event, 'MA3')" placeholder="选择折算方式" style="width: 100%;">
                    <el-option label="原币*汇率=本位币" value="1"></el-option>
                    <el-option label="原币/汇率=本位币" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小数位：" prop="decimals">
                <el-input v-model.trim="formData.decimals" ref="MA3" @keyup.enter.native="enterKey($event, 'MA4')"></el-input>
            </el-form-item>
            <el-form-item label="汇率类别：" prop="fixedExchangeRate">
                <el-select v-model="formData.fixedExchangeRate" ref="MA4" placeholder="选择汇率类别" style="width: 100%;">
                    <el-option label="固定汇率" value="1"></el-option>
                    <el-option label="浮动汇率" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否可用：" style="margin-bottom: 0 !important">
                <el-checkbox v-model.trim="formData.lock"></el-checkbox>
            </el-form-item>
            <el-form-item label="连续增加：" style="margin-bottom: 10px !important">
                <el-checkbox v-model="continueAdd"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('formRef')">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            let validateIsNum = (rule, value, callback) => {        //验证是否是一个数字
                if(!/^[0-9]+.?[0-9]*$/.test(value)) {
                    return callback(new Error('只能输入数字！'));
                }
                callback();
            }
            return {
                labelPosition: 'left',
                loading: false,      //是否显示加载
                continueAdd: false,     //是否连续新增
                formData: {
                    name: '',
                    exchangeRate: '',
                    convertType: '',
                    decimals: '',
                    fixedExchangeRate: '',
                    lock: true
                },
                formRules: {    //币别新增验证
                    name: [{required: true, message: '输入名称', triggle: 'blur'}],
                    exchangeRate: [{required: true, message: '输入汇率', triggle: 'blur'}],
                    convertType: [{required: true, message: '选择折算方式', triggle: 'change'}],
                    decimals: [{required: true, message: '输入小位数', triggle: 'blur'}, {validator: validateIsNum, trigger: 'blur'}],
                    fixedExchangeRate: [{required: true, message: '选择汇率类别', trigger: 'change'}],
                },
            }
        },
        methods: {
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            name: this.formData['name'],
                            exchangeRate: this.formData['exchangeRate'],
                            convertType: this.formData['convertType'],
                            decimals: this.formData['decimals'],
                            fixedExchangeRate: this.formData['fixedExchangeRate'],
                            lock: this.formData['lock'] ? 1 : 0
                        }
                        this.$http({
                            method: "post",
                            url: this.$url + "/currency/insertCurrency",
                            params: data
                        }).then(res => {
                            if(res.data.code === 20001) {
                                this.$message({message: '添加成功', type: 'success'});
                                if(this.continueAdd) {          //不要关闭弹窗，继续新增数据，但要清除上一次的添加记录
                                    this.$refs[formName].resetFields();
                                    setTimeout(() => {
                                        this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
                                    }, 1000)
                                } else {        //直接关闭弹窗
                                    setTimeout(() => {
                                        this.close();
                                        this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
                                    }, 1000);
                                }
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    }
                });
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
        }
    }
</script>


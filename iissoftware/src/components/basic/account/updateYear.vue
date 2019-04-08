<template>
    <div class="updateYear">
        <el-form :model="formData" status-icon :rules="formRules" ref="formRef" label-width="100px" class="demo-ruleForm" style="overflow: hidden !important;">
            <el-form-item label="开始年度：" prop="startYear" style="margin-top: 10px !important">
                <el-input type="text" v-model="formData.startYear" autocomplete="off" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
            </el-form-item>
            <el-form-item label="结束年度：" prop="endYear">
                <el-input type="text" v-model="formData.endYear" autocomplete="off" ref="MA1" @keyup.enter.native="enterKey($event, 'MA2')"></el-input>
            </el-form-item>
            <el-form-item label="区　　间：" prop="accountPeriod">
                <el-input type="text" v-model="formData.accountPeriod" autocomplete="off" ref="MA2" @keyup.enter.native="save('formRef')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="save('formRef')">保存</el-button>
                <el-button size="small" type="danger" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formData: {
                startYear: this.$store.state.year[0],
                endYear: this.$store.state.year[this.$store.state.year.length - 1].toString(),
                accountPeriod: 12
            },
            formRules: {
                startYear: [{required: true, message: '开始年度不能为空', triggle: 'blur'}],
                endYear: [{required: true, message: '结束年度不能为空', triggle: 'blur'}]
            }
        }
    },
    methods: {
        save(formName) {            //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(isNaN(this.formData['startYear']) || isNaN(this.formData['startYear'])) {
                        this.$message({message: '输入的年度不合法', duration: 1000, type: 'warning'});
                    } else if(this.formData['startYear'].length != 4 || this.formData['endYear'].length != 4) {
                        this.$message({message: '输入的年度长度不合法', duration: 1000, type: 'warning'});
                    } else if(this.formData['startYear'] > this.formData['endYear']) {
                        this.$message({message: '开始年度不能大于结束年度', duration: 1000, type: 'warning'});
                    } else {
                        this.$http({
                            url: this.$url + 'systemParameters/insertSysAccountInterval',
                            method: 'post',
                            params: this.formData
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '修改成功', type: 'success', duration: 1000});
                                setTimeout(() => {
                                    this.$store.commit('updateYear', {startYear: this.formData['startYear'], endYear: this.formData['endYear']});
                                    this.close();
                                }, 1000);
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    }
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


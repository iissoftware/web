<template>
    <div class="form">
        <el-form :model="formData" ref="formRef" label-width="100px" :rules="formRules" style="overflow: hidden !important;">
            <el-form-item label="编　　码：" prop="code" style="margin-top: 10px !important;">
                <el-input v-model.trim="formData.code" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
            </el-form-item>
            <el-form-item label="名　　称：" prop="name" style="margin-top: 10px !important;">
                <el-input v-model.trim="formData.name" ref="MA1" @keyup.enter.native="save('formRef')"></el-input>
            </el-form-item>
            <el-form-item label="连续新增：" style="margin-bottom: 10px !important">
                <el-checkbox v-model="continueAdd"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('formRef')">确定</el-button>
                <el-button type="danger" size="small" @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-22
 * Description: 科目组新增组件
*/
export default {
    data() {
        return {
            continueAdd: false,
            formData: {
                code: '',
                name: ''
            },
            formRules: {
                code: [{required: true, message: '编码不能为空', triggle: 'blur'}],
                name: [{required: true, message: '名称不能为空', triggle: 'blur'}],
            },
            currentRow: this.$store.state.subjectStore.groupObj.currentRow[0],
            systemId: this.$store.state.systemId
        }
    },
    methods: {
        save(formName) {        //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.formData['code'].length != 5) {
                        this.$message.warning({type: 'warning', duration: 1000, message: '编码长度只能为5位数字'});
                    } else if(isNaN(this.formData['code'])) {
                        this.$message.warning({type: 'warning', duration: 1000, message: '编码包含非数字'});
                    } else {
                        let data = {
                            code: this.formData['code'],
                            name: this.formData['name'],
                            type: this.currentRow['id'],    //父级id
                        }
                        this.$http({
                            url: this.$url + 'subjectGroup/insertOrUpdateByGroup',
                            method: 'post',
                            params: data
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message.success('新增子目录成功');
                                setTimeout(() => {
                                    if(this.continueAdd) {
                                        this.$refs[formName].resetFields();
                                        this.$store.dispatch('subjectStore/getGroupTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                                        this.$store.dispatch('subjectStore/getTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                                    } else {
                                        this.$store.dispatch('subjectStore/getGroupTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                                        this.$store.dispatch('subjectStore/getTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                                        this.close();
                                    }
                                }, 1000);
                            } else {
                                this.$message.error({message: res.data.msg, duration: 1000, type: 'warning'});
                            }
                        });
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
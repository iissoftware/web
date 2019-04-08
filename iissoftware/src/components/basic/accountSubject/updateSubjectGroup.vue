<template>
    <div class="form">
        <el-form :model="formData" ref="formRef" label-width="100px" :rules="formRules" style="overflow: hidden !important;">
            <el-form-item label="编　　码：" prop="code" style="margin-top: 10px !important;">
                <div class="code">{{ formData.code }}</div>
                <el-input v-model.trim="formData.code" style="display: none;"></el-input>
            </el-form-item>
            <el-form-item label="名　　称：" prop="code" style="margin-top: 10px !important;">
                <el-input v-model.trim="formData.name" @keyup.enter.native="save('formRef')"></el-input>
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
 * Description: 科目组编辑组件
*/
export default {
    data() {
        return {
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
        getUpdateData() {       //获取要更新的数据
            this.$http.get(this.$url + 'subjectGroup/selectSubjectByObject?id=' + this.currentRow['id']).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.formData = res.data.data[0];
                    }
                }
            });
        },
        save(formName) {        //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        id: this.formData['id'],
                        code: this.formData['code'],
                        name: this.formData['name'],
                        type: this.currentRow['type']       //父级id
                    }
                    this.$http({
                        url: this.$url + 'subjectGroup/insertOrUpdateByGroup',
                        method: 'post',
                        params: data
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$message.success({message: '编辑子目录成功', duration: 1000, type: 'success'});
                            setTimeout(() => {
                                this.$store.dispatch('subjectStore/getGroupTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                                this.close();
                            }, 1000);
                        } else {
                            this.$message.error({message: res.data.msg, duration: 1000, type: 'error'});
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
    },
    created() {
        this.getUpdateData();
    }
}
</script>
<style scoped>
    .code {
        width: 100%;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 15px;
        border: 1px solid #dcdfe6;
        color: #b4b4b4;
        background-color: #fff;
        border-radius: 4px;
        overflow: hidden;
    }
</style>
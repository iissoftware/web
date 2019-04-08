<template>
    <div class="addRow">
        <el-form label-width="100px" :label-position="labelPosition" :model="addRowData" ref="addRowForm" status-icon :rules="AddFormRules" style="overflow: hidden;">
            <el-form-item label="名称：" prop="name" style="margin-top: 10px !important;">
                <el-input v-model.trim="addRowData.name" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model.trim="addRowData.remark" ref="MA1" @keyup.enter.native="addRowSave('addRowForm', addRowData['id'])"></el-input>
            </el-form-item>
            <el-form-item label="是否可用：" style="margin-bottom: 10px !important;">
                <el-checkbox v-model.trim="addRowData.lock"></el-checkbox>
            </el-form-item>
            <el-form-item label="连续增加：" style="margin-bottom: 10px !important;">
                <el-checkbox v-model="continueAdd"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('addRowForm', addRowData['id'])">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                labelPosition: 'left',
                continueAdd: false,         //连续新增
                systemId: '',
                addRowData: {
                    name: '',
                    remark: '',
                    lock: true
                },
                AddFormRules: {
                    name: [{required: true, message: '输入名称'}]
                }
            }
        },
        methods: {
            getSystemInfo() {           //获取系统信息
                this.$http.get(this.$url + 'systemParameters/selectSystemInfo').then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.systemId = res.data.data['id'];
                        }
                    }
                });
            },
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            name: this.addRowData['name'],
                            remark: this.addRowData['remark'],
                            lock: this.addRowData['lock'] ? 1 : 0,
                            systemId: this.systemId
                        }
                        this.$http({
                            method: "post",
                            url: this.$url + "closeAccount/insertCloseAccount",
                            params: data
                        }).then(res => {
                            if(res.data.code === 20001) {
                                this.$message({message: '添加成功', type: 'success', duration: 2000});
                                if(this.continueAdd) {
                                    setTimeout(() => {
                                        this.$refs[formName].resetFields();
                                        parent.getData();
                                    }, 500);
                                } else {
                                    setTimeout(() => {
                                        parent.getData();
                                        this.close();
                                    }, 800)
                                }
                            }
                        })
                    }
                });
            },
            close() {           //关闭新增弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
                if(parent.idArr) delete parent.idArr;
                if(parent.getData) delete parent.getData;
                if(parent.obj) delete parent.obj;
            },
            enterKey(lastRef, nextRef) {		//回车键换行
                if(lastRef.target.value) {
                    this.$refs[nextRef].focus();
                }
            }
        },
        mounted() {
            this.getSystemInfo();
        }
    }
</script>


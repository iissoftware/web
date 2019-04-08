<template>
    <div class="addRow">
        <el-form label-width="100px" :model="addRowMeasureOneData" ref="addRowMeasureOneForm" status-icon :rules="addMeasureOneFormRules" style="overflow: hidden">
            <el-form-item label="名称：" prop="unitName" style="margin-top: 10px !important;">
                <el-input v-model="addRowMeasureOneData.unitName" @keyup.enter.native="enterKey($event, 'L1')"></el-input>
            </el-form-item>
            <el-form-item label="单位类别：" prop="unitType">
                <el-select v-model="addRowMeasureOneData.unitType"  ref="L1" placeholder="选择单位类别" style="width: 100%;" @keyup.enter.native="addRowSave('addRowMeasureOneForm')">
                    <el-option label="普通单位" value="0"></el-option>
                    <el-option label="组合单位" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="连续增加：" style="margin-bottom: 10px !important;">
                <el-checkbox v-model="continueAdd"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="addRowSave('addRowMeasureOneForm')">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                addRowMeasureOneData: {
                    unitName: '',
                    unitType: ''
                },
                addMeasureOneFormRules: {
                    unitName: [{required: true, message: '名称不能为空', triggle: 'blur'}],
                    unitType: [{required: true, message: '单位类别不能为空', triggle: 'change'}]
                },
                continueAdd: false,      //是否连续新增
            }
        },
        methods: {
            addRowSave(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var data = {        //重新组装数据
                            unitName: this.addRowMeasureOneData['unitName'],
                            unitType: this.addRowMeasureOneData['unitType']
                        }
                        this.$http({
                            method: "post",
                            url: this.$url + "measureUnit/insertGroup",
                            params: data
                        }).then(res => {
                            if(res.data.code === 20001) {
                                this.$message({message: '添加成功', type: 'success'});
                                this.$store.dispatch('measureStore/getSearch',this.$url + 'measureUnit/selectGroup')
                                if(this.continueAdd) {
                                    this.$refs['addRowMeasureOneForm'].resetFields();
                                    this.$store.dispatch('getData1', this.$url);
                                } else {
                                    setTimeout(() => {
                                        this.$store.dispatch('getData1', this.$url);
                                        this.close();
                                    }, 800)
                                }
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    }
                })
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


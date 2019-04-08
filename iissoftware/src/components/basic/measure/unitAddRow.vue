<template>
    <div class="addRow">
        <el-form label-width="100px" :model="addRowMeasureTwoData" :label-position="labelPosition" ref="addRowMeasureTwoForm" status-icon :rules="addMeasureTwoFormRules">
            <el-form-item label="类别：" prop="id" style="margin-top: 10px;">
                <el-select v-model="addRowMeasureTwoData.id" filterable placeholder="选择类别" style="width: 100%;">
                    <el-option
                    v-for="item in unitData"
                    :key="item.id"
                    :label="item.unitName"
                    :value="item.id.toString()"
                    @keyup.enter.native="enterKey($event, 'O1')">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称：" prop="useUnit">
                <el-input ref="O1" v-model="addRowMeasureTwoData.useUnit" @keyup.enter.native="addRowSaveTwo('addRowMeasureTwoForm')"></el-input>
            </el-form-item>
            <el-form-item label="是否可用：" style="margin-bottom: 10px;">
                <el-checkbox v-model="addRowMeasureTwoData.unitLock"></el-checkbox>
            </el-form-item>
            <el-form-item label="连续增加：" style="margin-bottom: 10px;">
                <el-checkbox v-model="continueAdd"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="addRowSaveTwo('addRowMeasureTwoForm')">保存</el-button>
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
                continueAdd: false,
                unitData: [],
                addRowMeasureTwoData: {
                    id: '',
                    useUnit: '',
                    unitLock: ''
                },
                addMeasureTwoFormRules: {
                    id: [{required: true, message: '类别不能为空', triggle: 'change'}],
                    useUnit: [{required: true, message: '名称不能为空', triggle: 'blur'}],
                }
            }
        },
        methods: {
            getUnitData() {
                this.$http.get(this.$url + 'measureUnit/selectGroup').then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.unitData = res.data.data;
                        }
                    }
                });
            },
            addRowSaveTwo(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {        //重新组装数据
                            unitId: this.addRowMeasureTwoData['id'],
                            useUnit: this.addRowMeasureTwoData['useUnit'],
                            unitLock: this.addRowMeasureTwoData['unitLock'] ? 1 : 0
                        }
                        this.$http({
                            method: "post",
                            url: this.$url + "measureUnit/insertUnit",
                            params: data
                        }).then(res => {
                            if(res.data.code === 20001) {
                                this.$message({message: '添加成功', type: 'success'});
                                this.$store.dispatch('measureStore/getSearchTwo',this.$url + 'measureUnit/selectUnit')
                                if(this.continueAdd) {
                                    this.$store.dispatch('getData2', this.$url);
                                    this.$refs['addRowMeasureTwoForm'].resetFields();
                                } else {
                                    setTimeout(() => {
                                        this.$store.dispatch('getData2', this.$url);
                                        this.close();
                                    }, 800);
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
        },
        mounted() {
            this.getUnitData();
        }
    }
</script>


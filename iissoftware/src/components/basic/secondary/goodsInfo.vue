<template>
    <div class="form">
        <el-form :model="formData" status-icon ref="formRef" :rules="formRules" label-width="120px" class="demo-ruleForm" style="overflow: hidden;">
            <el-form-item label="客户名称：" prop="customerName" style="margin-top: 10px !important;">
                <el-input type="text" v-model="formData.customerName" @keyup.enter.native="enterKey($event, 'DPT1')" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="公司货号：" prop="companyNumber">
                <el-input type="text" v-model="formData.companyNumber" autocomplete="off" ref="DPT1" @keyup.enter.native="enterKey($event, 'DPT2')"></el-input>
            </el-form-item>
            <el-form-item label="客户货号：" prop="customerNumber">
                <el-input type="text" v-model="formData.customerNumber" autocomplete="off" ref="DPT2" @keyup.enter.native="enterKey($event, 'DPT3')"></el-input>
            </el-form-item>
            <el-form-item label="产成品名称：" prop="finishProductName">
                <el-input type="text" v-model="formData.finishProductName" autocomplete="off" ref="DPT3" @keyup.enter.native="enterKey($event, 'DPT4')"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remarks">
                <el-input type="text" v-model="formData.remarks" autocomplete="off" ref="DPT4" @keyup.enter.native="save('formRef')"></el-input>
            </el-form-item>
            <el-form-item label="连续新增：" style="margin-bottom: 10px !important;" v-if="!rowId">
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
/**
 * Author: iissoftware
 * Date: 2019-01-18
 * Description: 货号资料明细新增/修改组件
 * name: secondaryStore
*/
export default {
    data() {
        return {
            formData: {},
            continueAdd: false,
            formRules: {
                customerName: [{required: true, message: '客户名称不能为空', triggle: 'blur'}],
                companyNumber: [{required: true, message: '公司货号不能为空', triggle: 'blur'}],
                customerNumber: [{required: true, message: '客户货号不能为空', triggle: 'blur'}],
                finishProductName: [{required: true, message: '产成品名称不能为空', triggle: 'blur'}],
            },
            rowId: this.$store.state.secondaryStore.rowId
        }
    },
    methods: {
        getUpdateData() {           //获取更新数据
            this.$http.get(this.$url + 'auxiliaryInfoAllCategory/selectByGoodsInfoId?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.formData = res.data.data;
                    }
                }
            });
        },
        save(formName) {            //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let row = this.$store.state.secondaryStore.row[0];
                    row['$url'] = this.$url;
                    if(!this.formData['id']) {          //新增保存
                        this.formData['infoId'] = row['id'];            //小类id
                        this.$http({
                            url: this.$url + 'auxiliaryInfoAllCategory/insertGoodsInfo',
                            method: 'post',
                            params: this.formData
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '新增成功', type: 'success', duration: 1500});
                                setTimeout(() => {
                                    this.$store.dispatch('secondaryStore/getSubClassTableData', row);
                                    this.continueAdd ? this.$refs[formName].resetFields() : this.close();
                                }, 1000);
                            }
                        });
                    } else {
                        //修改保存
                        delete this.formData['createTime'];
                        delete this.formData['updateTime'];
                        this.$http({
                            url: this.$url + 'auxiliaryInfoAllCategory/updateGoodsInfo',
                            method: 'post',
                            params: this.formData
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '修改成功', type: 'success', duration: 1500});
                                setTimeout(() => {
                                    this.$store.dispatch('secondaryStore/getSubClassTableData', row);
                                    this.close();
                                }, 1000)
                            }
                        });
                    }
                }
            });
        },
        close() {           //关闭当前弹窗
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
        if(this.rowId) {
            this.getUpdateData();
        }
    }
}
</script>
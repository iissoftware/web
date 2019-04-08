<template>
    <div class="form">
        <el-form :model="formData" status-icon ref="formRef" :rules="formRules" label-width="110px" class="demo-ruleForm" style="overflow: hidden;">
            <el-form-item label="车牌号码：" prop="carNumber" style="margin-top: 10px !important;">
                <el-input type="text" v-model="formData.carNumber" @keyup.enter.native="enterKey($event, 'DPT1')" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="车　　型：" prop="vehicleType">
                <el-input type="text" v-model="formData.vehicleType" ref="DPT1" @keyup.enter.native="enterKey($event, 'DPT2')" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="座 位 数：" prop="seatNumber">
                <el-input type="text" v-model="formData.seatNumber" ref="DPT2" @keyup.enter.native="enterKey($event, 'DPT3')" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备　　注：" prop="remarks">
                <el-input type="text" v-model="formData.remarks" autocomplete="off" ref="DPT3" @keyup.enter.native="save('formRef')"></el-input>
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
 * Description: 车牌号码明细新增/修改组件
*/
export default {
    data() {
        return {
            formData: {},
            continueAdd: false,
            formRules: {
                carNumber: [{required: true, message: '车牌号码不能为空', triggle: 'blur'}],
                vehicleType: [{required: true, message: '车型不能为空', triggle: 'blur'}],
                seatNumber: [{required: true, message: '座位数不能为空', triggle: 'blur'}],
            },
            rowId: this.$store.state.secondaryStore.rowId
        }
    },
    methods: {
        getUpdateData() {           //获取更新数据
            this.$http.get(this.$url + 'auxiliaryInfoAllCategory/selectByCarNumberId?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        res.data.data['seatNumber'] = res.data.data['seatNumber'].toString();
                        this.formData = res.data.data;
                    }
                }
            });
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let row = this.$store.state.secondaryStore.row[0];
                    row['$url'] = this.$url;
                    if(!this.formData['id']) {          //新增保存
                        this.formData['infoId'] = row['id'];            //小类id
                        this.$http({
                            url: this.$url + 'auxiliaryInfoAllCategory/insertCarNumber',
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
                            url: this.$url + 'auxiliaryInfoAllCategory/updateCarNumber',
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
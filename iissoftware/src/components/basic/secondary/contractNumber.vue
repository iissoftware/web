<template>
    <div class="form">
        <el-form :model="formData" status-icon ref="formRef" :rules="formRules" label-width="120px" class="demo-ruleForm" style="overflow: hidden;">
            <el-form-item :label="label['givenName'] + '：'" prop="givenName" style="margin-top: 10px !important;">
                <el-select v-model="formData.givenName" style="width: 100%;">
                    <el-option v-for="item in names" :key="item['id']" :label="item['name']" :value="item['id']"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="label['givenNumberOne'] + '：'" prop="givenNumberOne">
                <el-input type="text" v-model="formData.givenNumberOne" ref="DPT1" @keyup.enter.native="enterKey($event, 'DPT2')" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="label['givenNumberTwo'] + '：'" prop="givenNumberTwo">
                <el-input type="text" v-model="formData.givenNumberTwo" ref="DPT2" @keyup.enter.native="enterKey($event, 'DPT3')" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remarks">
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
 * Description: 合同编号明细新增/修改组件
*/
export default {
    data() {
        return {
            continueAdd: false,
            formData: {},
            formRules: {
                givenName: [{required: true, message: '账号不能为空', triggle: 'change'}],
                givenNumberOne: [{required: true, message: '订单号不能为空', triggle: 'blur'}],
                givenNumberTwo: [{required: true, message: '订单号不能为空', triggle: 'blur'}],
            },
            label: this.$store.state.secondaryStore.label,
            names: this.$store.state.secondaryStore.names,      //名称列表
            rowId: this.$store.state.secondaryStore.rowId,
            systemId: this.$store.state.systemId
        }
    },
    methods: {
        getUpdateData() {           //获取更新数据
            this.$http.get(this.$url + 'auxiliaryInfoAllCategory/selectByContractNumberId?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.formData = res.data.data;
                    }
                }
            });
        },
        save(formName) {      //保存   
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let row = this.$store.state.secondaryStore.row[0];
                    row['$url'] = this.$url;
                    if(!this.formData['id']) {          //新增保存
                        let $id = null;
                        this.formData['infoId'] = row['id'];            //小类id
                        switch(row['categoryName']) {
                            case '采购合同编号':
                                $id = 0;
                                break;
                            case '销售合同编号':
                                $id = 1;
                                break;
                            case '外协厂合同编号':
                                $id = 2;
                                break;
                            case '卖单合同编号':
                                $id = 3;
                                break;
                            default: break;
                        }
                        this.formData['categoryType'] = $id;
                        this.$http({
                            url: this.$url + 'auxiliaryInfoAllCategory/insertContractNumber',
                            method: 'post',
                            params: this.formData
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '新增成功', type: 'success', duration: 1500});
                                setTimeout(() => {
                                    this.$store.dispatch('secondaryStore/getSubClassTableData', row);
                                    this.continueAdd ? this.$refs[formName].resetFields() : this.close();
                                }, 1000);
                            } else {
                                this.$message({message: res.data.msg || '新增失败', type: 'error', duration: 1500});
                            }
                        });
                    } else {
                        //修改保存
                        let data = {
                            id: this.formData['id'],
                            givenName: this.formData['givenName'],
                            givenNumberOne: this.formData['givenNumberOne'],
                            givenNumberTwo: this.formData['givenNumberTwo'],
                            remarks: this.formData['remarks'],
                            state: this.formData['state']
                        }
                        this.$http({
                            url: this.$url + 'auxiliaryInfoAllCategory/updateContractNumber',
                            method: 'post',
                            params: data
                        }).then(res => {
                            console.log(res);
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
<template>
    <div class="form">
        <el-form :model="formData" status-icon ref="formRef" :rules="formRules" label-width="100px" class="demo-ruleForm" style="overflow: hidden;">
            <el-form-item label="类别名称：" prop="categoryName" style="margin-top: 10px !important;">
                <el-input type="text" v-model="formData.categoryName" @keyup.enter.native="enterKey($event, 'DPT1')" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="资料类别：" prop="dataCategory">
                <el-select filterable v-model="formData.dataCategory" placeholder="选择资料类别" ref="DPT1" @keyup.enter.native="enterKey($event, 'DPT2')" style="width: 100%;">
                    <el-option v-for="(item, index) in categoryData" :key="index" :label="item['label']" :value="item['value']"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备　　注：" prop="remarks">
                <el-input type="text" v-model="formData.remarks" autocomplete="off" ref="DPT2" @keyup.enter.native="save('formRef')"></el-input>
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
 * Description: 小类新增、修改组件
*/
export default {
    data() {
        return {
            formData: {},
            continueAdd: false,         //是否连续添加
            categoryData: [
                {
                    label: '车牌号码',
                    value: '0'
                },
                {
                    label: '合同编号',
                    value: '1'
                },
                {
                    label: '货号资料',
                    value: '2'
                },
                {
                    label: '普通资料',
                    value: '3'
                },
                {
                    label: '银行资料',
                    value: '4'
                }
            ],
            formRules: {
                categoryName: [{required: true, message: '名称不能为空', triggle: 'blur'}],
                dataCategory: [{required: true, message: '资料类别不得为空', triggle: 'blur'}]
            },
            rowId: this.$store.state.secondaryStore.rowId
        }
    },
    methods: {
        getUpdateData() {           //获取当条更新数据
            this.$http.get(this.$url + 'auxiliary/selectInformation?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.formData = res.data.data;
                    }
                }
            });
        },
        save(formName) {        //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.formData['id']) {      //新增小类
                        this.$http({
                            url: this.$url + 'auxiliary/insert',
                            method: 'post',
                            params: this.formData
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '新增成功', type: 'success', duration: 2000});
                                this.$store.commit('secondaryStore/updateDfExpKeys', this.formData['dataCategory']);        //更新要展开的节点id
                                if(this.continueAdd) {      //连续新增
                                    this.$refs['formRef'].resetFields();
                                    setTimeout(() => {
                                        this.$store.dispatch('secondaryStore/getTreeData', this.$url + 'auxiliary/select');
                                    }, 1000);
                                } else {
                                    setTimeout(() => {
                                        this.$store.dispatch('secondaryStore/getTreeData', this.$url + 'auxiliary/select');
                                        this.close();
                                    }, 1000);
                                }
                            } else {
                                this.$message({message: res.data.msg || '新增失败', type: 'error', duration: 1500});
                            }
                        });
                    } else {
                        //修改小类
                        let data = {
                            id: this.formData['id'],
                            dataCategory: this.formData['dataCategory'],
                            remarks: this.formData['remarks'],
                            state: this.formData['state'],
                            categoryName: this.formData['categoryName']
                        }
                        this.$http({
                            url: this.$url + 'auxiliary/update',
                            method: 'post',
                            params: data
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '修改成功', type: 'success', duration: 2000});
                                this.$store.commit('secondaryStore/updateDfExpKeys', data['dataCategory']);             //更新要展开的节点id
                                setTimeout(() => {
                                    this.$store.dispatch('secondaryStore/getTreeData', this.$url + 'auxiliary/select');
                                    this.close();
                                }, 1000);
                            } else {
                                this.$message({message: res.data.msg || '修改失败', type: 'error', duration: 1500});
                            }
                        });
                    }
                }
            });
        },
        close() {           //关闭弹窗
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
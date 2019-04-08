<template>
    <div class="form accountSubjectForm">
        <el-tabs v-model="activeName">
            <el-tab-pane label="科目设置" name="first">
                <el-form :model="formData" ref="formRef" label-width="120px" :rules="formRules" style="overflow: hidden;">
                    <el-form-item label="科目代码：" prop="code" style="margin-top: 10px;">
                        <el-input v-model.trim="formData.code" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
                    </el-form-item>
                    <el-form-item label="科目名称：" prop="name">
                        <el-input v-model.trim="formData.name" ref="MA1" @keyup.enter.native="enterKey($event, 'MA2')"></el-input>
                    </el-form-item>
                    <el-form-item label="助记码：" prop="mnemonicCode">
                        <el-input v-model.trim="formData.mnemonicCode" ref="MA2" @keyup.enter.native="enterKey($event, 'MA3')"></el-input>
                    </el-form-item>
                    <el-form-item label="科目类别：" prop="type">
                        <el-select v-model="formData.type" placeholder="选择科目类别" style="width: 100%;" ref="MA3" @keyup.enter.native="enterKey($event, 'MA4')" @change="selectChange">
                            <el-option v-for="item in subjectTypes" :key="item['id']" :label="item['name']" :value="item['id']"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="余额方向：" prop="balanceDirection">
                        <el-select v-model="formData.balanceDirection" placeholder="选择余额方向" style="width: 100%;" ref="MA4" @keyup.enter.native="enterKey($event, 'MA5')">
                            <el-option label="借方" value="0"></el-option>
                            <el-option label="贷方" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="外币核算：" prop="foreignCurrencyCheck">
                        <el-select v-model="formData.foreignCurrencyCheck" placeholder="选择外币核算" style="width: 100%;" ref="MA5">
                            <el-option label="不核算" value="0"></el-option>
                            <el-option v-for="item in allUnitTypes" :key="item['id']" :label="item['name']" :value="item['id']"></el-option>
                            <el-option label="所有币别" value="1002"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出日记账：" prop="journal" style="margin-bottom: 0px !important;">
                        <el-checkbox v-model="formData.journal"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="往来科目：" style="margin-bottom: 0 !important;">
                        <el-checkbox v-model="betweenObject"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="连续新增：" style="margin-bottom: 10px !important;">
                        <el-checkbox v-model="continueAdd"></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="save('formRef')">保存</el-button>
                        <el-button type="danger" size="small" @click="close">关闭</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="往来对象" name="second">
                <v-subject-object/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-22
 * Description: 会计科目新增组件
*/
import subjectObject from './subjectObject'
export default {
    components: {
        'v-subject-object': subjectObject
    },
    data() {
        return {
            activeName: 'first',
            continueAdd: false,     //是否连续新增
            subjectTypes: this.$store.state.subjectStore.subjectTypes,       //科目类别
            allUnitTypes: this.$store.state.subjectStore.allUnitTypes,       //外币核算
            betweenObject: this.$store.state.subjectStore.betweenObject,      //往来科目
            formData: {         //表单数据
                code: '',
                name: '',
                type: '',
                balanceDirection: '',
                foreignCurrencyCheck: ''
            },
            formRules: {
                code: [{required: true, message: '科目代码不能为空', triggle: 'blur'}],
                name: [{required: true, message: '科目名称不能为空', triggle: 'blur'}],
                type: [{required: true, message: '科目类别不能为空'}],
                balanceDirection: [{required: true, message: '余额方向不能为空'}],
                foreignCurrencyCheck: [{required: true, message: '外币核算不能为空'}],
            },
            selectTypeId: '',
            systemId: this.$store.state.systemId
        }
    },
    watch: {
        betweenObject(newVal) {           //监听往来科目是否勾选
            this.$store.commit('subjectStore/updateBetweenObject', newVal);
        }
    },
    methods: {
        save(formName) {            //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        code: this.formData['code'],
                        name: this.formData['name'],
                        type: this.formData['type'],        //科目类别
                        mnemonicCode: this.formData['mnemonicCode'],
                        balanceDirection: this.formData['balanceDirection'],        //余额方向
                        foreignCurrencyCheck: this.formData['foreignCurrencyCheck'],        //外币核算
                        journal: this.formData['journal'] ? 1 : 0,          //出日记账
                        betweenObject: this.betweenObject ? 1 : 0,             //往来科目
                    }
                    let objectList = this.$store.state.subjectStore.objectList;         //获取往来对象数据
                    if(objectList.length > 0) {
                        let newArr = [];
                        objectList.forEach(item => {
                            newArr.push(item['id']);
                        });
                        data['betweenObjectList'] = newArr.join(',')
                    } else {
                        data['betweenObjectList'] = '0';
                    }
                    this.$http({
                        url: this.$url + 'subjectGroup/insertOrUpdateBySubject',
                        method: 'post',
                        params: data
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$message.success('新增成功');
                            if(data['code'].split('.').length == 1 && data['code'].length == 4 && this.selectTypeId) {
                                this.$store.commit('subjectStore/updateExpandNodeId', this.selectTypeId);        //更新当前点击的节点id
                            }
                            setTimeout(() => {
                                if(this.continueAdd) {
                                    this.$refs[formName].resetFields();
                                    this.$store.dispatch('subjectStore/getTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                                } else {
                                    this.$store.dispatch('subjectStore/getTreeData', this.$url + 'subjectGroup/selectGroupByObject?systemId=' +this.systemId);
                                    this.close();
                                }
                            }, 1000);
                        } else {
                            this.$message.error(res.data.msg || '新增失败');
                        }
                    });
                }
            });
        },
        selectChange(val) {
            this.selectTypeId = val;
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
<style>
    .accountSubjectForm .el-tabs__content {
        height: calc(100% - 50px) !important;
    }
    .accountSubjectForm .el-tabs__content form {
        height: 100% !important;
        overflow-y: auto !important;
    }
</style>
<style scoped>
    .form {overflow: hidden !important;position: relative;}
    .form .block-area {padding: 0 !important;height: 250px !important;}
    .form .el-btn-group {margin-top: 10px !important;text-align: right;}
</style>


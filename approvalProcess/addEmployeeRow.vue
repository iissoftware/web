<template>
    <div class="form">
        <el-form label-width="120px" :label-position="labelPosition" :model="formData" ref="formRef" status-icon :rules="formRules" style="overflow: hidden;">
            <el-form-item label="审核人：" prop="name" style="margin-top: 10px !important;">
                <el-select v-model="formData.name" placeholder="选择审核人" style="width: 100% !important;">
                    <el-option v-for="item in arr" :key="item['id']" :label="item['name']" :value="item['id']"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="并列审核人1：" prop="name1">
                <el-select v-model="formData.name1" placeholder="选择并列审核人1" style="width: 100% !important;">
                    <el-option v-for="item in arr" :key="item['id']" :label="item['name']" :value="item['id']"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="并列审核人2：" prop="name2">
                <el-select v-model="formData.name2" placeholder="选择并列审核人2" style="width: 100% !important;">
                    <el-option v-for="item in arr" :key="item['id']" :label="item['name']" :value="item['id']"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="并列审核人3：" prop="name3">
                <el-select v-model="formData.name3" placeholder="选择并列审核人3" style="width: 100% !important;">
                    <el-option v-for="item in arr" :key="item['id']" :label="item['name']" :value="item['id']"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="节点类型：" prop="nodeType">
                <el-select v-model="formData.nodeType" placeholder="选择节点类型" style="width: 100% !important;">
                    <el-option :label="'审核'" value="0"></el-option>
                    <el-option :label="'知会'" value="1"></el-option>
                    <el-option :label="'抄送'" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="生成单据：" prop="generateDocument">
                <el-checkbox v-model="formData.generateDocument"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('formRef')">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        let checkedName = (rule, value, callback) => {
            if(value !== '' && (value == this.formData['name1'] || value == this.formData['name2'] || value == this.formData['name3'])) {
                return callback(new Error('审核人已经存在'));
            }
            callback();
        }
        let checkedName1 = (rule, value, callback) => {
            if(value !== '' && (value == this.formData['name'] || value == this.formData['name2'] || value == this.formData['name3'])) {
                return callback(new Error('审核人已经存在'));
            }
            callback();
        }
        let checkedName2 = (rule, value, callback) => {
            if(value !== '' && (value == this.formData['name'] || value == this.formData['name1'] || value == this.formData['name3'])) {
                return callback(new Error('审核人已经存在'));
            }
            callback();
        }
        let checkedName3 = (rule, value, callback) => {
            if(value !== '' && (value == this.formData['name'] || value == this.formData['name1'] || value == this.formData['name2'])) {
                return callback(new Error('审核人已经存在'));
            }
            callback();
        }
        return {
            labelPosition: 'left',
            formData: {
                name: '',
                name1: '',
                name2: '',
                name3: '',
                nodeType: '',
                generateDocument: false
            },
            formRules: {
                name: [{required: true, message: '审核人不能为空', triggle: 'change'}, {validator: checkedName, triggle: 'change'}],
                name1: [{validator: checkedName1, triggle: 'change'}],
                name2: [{validator: checkedName2, triggle: 'change'}],
                name3: [{validator: checkedName3, triggle: 'change'}],
                nodeType: [{required: true, message: '节点类型不能为空', triggle: 'change'}]
            },
            arr: [],
            systemId: this.$store.state.systemId,  
        }
    },
    methods: {
        getMemberData() {
            this.$http.get(this.$url + 'employee/findEmployeeByDepartment?systemId=' + this.systemId + '&id=0').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        res.data.data.forEach(item => item['id'] = item['id'].toString());
                        this.arr = res.data.data;
                    }
                }
            })
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let store = this.$store.state.approvalProcessStore;
                    let list = {
                        id: ++store.sIndex,
                        name: this.formData['name'],
                        name1: this.formData['name1'],
                        name2: this.formData['name2'],
                        name3: this.formData['name3'],
                        nodeType: this.formData['nodeType'],
                        generateDocument: this.formData['generateDocument'],
                        level: 5,
                        pid: store.mnId,
                        rootId: store.rootId
                    }
                    this.$store.commit('approvalProcessStore/updateNodes', {level: 5, node: [list]});        //保存后，将当前选中的会计科目节点保存到store里面
                    this.$store.commit('approvalProcessStore/updateSIndex', list['id']);        //保存后，更新审核人id
                    this.close();
                }
            });
        },
        close() {           //关闭新增弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    },
    created() {
        this.$nextTick(() => {
            this.getMemberData();
        });
    }
}
</script>
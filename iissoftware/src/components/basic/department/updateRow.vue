<template>
    <div class="form">
        <el-form label-width="120px" :model="formData" ref="formRef" status-icon :rules="formRules" style="overflow: hidden;">
            <el-form-item label="名　　称：" prop="name" style="margin-top: 10px;">
                <el-input v-model="formData.name" @keyup.enter.native="enterKey($event, 'DPT1')"></el-input>
            </el-form-item>
            <el-form-item label="助 记 码：" prop="mnemonicCode">
                <el-input v-model="formData.mnemonicCode" ref="DPT1" @keyup.enter.native="enterKey($event, 'DPT2')"></el-input>
            </el-form-item>
            <el-form-item label="上级部门：" class="readonly" prop="parentId">
                <el-input v-model="lastDepartName" readonly @click.native="getLastTreeData"></el-input>
                <el-input v-model="formData.parentId" readonly style="display: none;"></el-input>
            </el-form-item>
            <el-form-item label="部门类型：" prop="category">
                <el-select v-model="formData.category" filterable placeholder="选择部门类型" ref="DPT2" @keyup.enter.native="enterKey($event, 'DPT3')" style="width: 100%;">
                    <el-option v-for="item in departTypeData" :key="item['id']" :label="item['detailedName']" :value="item['id']"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门主管：" prop="supervisor">
                <el-select v-model="formData.supervisor" filterable placeholder="请选择部门主管" ref="DPT3" @keyup.enter.native="enterKey($event, 'DPT4')" style="width: 100%;">
                    <el-option v-for="item in employee" :key="item['id']" :label="item['name']" :value="item['id']"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" ref="DPT4" v-model="formData.remark" autosize placeholder="输入备注" @keyup.enter.native="save('formRef')"></el-input>
            </el-form-item>
            <el-form-item label="是否可用：" prop="locks" style="margin-bottom: 10px;">
                <el-checkbox v-model="formData.locks"></el-checkbox>
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
        return {
            formData: {
                locks: true
            },
            formRules: {
                name: [{required: true, message: '名称不能为空', triggle: 'blur'}],
                parentId: [{required: true, message: '上级部门不能为空', triggle: 'blur'}],
                category: [{required: true, message: '部门类型不能为空'}]
            },
            departTypeData: this.$store.state.departmentStore.departTypeData,         //部门类型
            employee: this.$store.state.departmentStore.employee,         //部门主管
            expandNodeId: this.$store.state.departmentStore.expandNodeId,
            lastDepartName: '',
            lastDepartmentName: this.$store.state.departmentStore.lastDepartmentName,
            parentId: this.$store.state.departmentStore.parentId,
            systemId: this.$store.state.systemId,
            rowId: this.$store.state.departmentStore.rowId
        }
    },
    watch: {
        lastDepartmentName() {
            let parentId = this.$store.state.departmentStore.parentId,
                lastDepartmentName = this.$store.state.departmentStore.lastDepartmentName;
            this.lastDepartName = lastDepartmentName[0];
            this.formData['parentId'] = parentId[0].toString();
        }
    },
    methods: {
        getUpdateData() {           //获取当条修改数据
            this.$http.get(this.$url + 'department/selectObjectById?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        res.data.data['parentId'] = res.data.data['parentId'].toString();
                        res.data.data['locks'] = Boolean(res.data.data['locks']);
                        this.formData = res.data.data;
                    }
                }
            });
        },
        getLastTreeData() {         //打开上级部门弹窗
            this.$util.openSubLayerIframe('所有部门', 13, '450px', '360px', this.$domain + '/#/department/lastDepartTree');
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        id: this.formData['id'],
                        name: this.formData['name'],
                        mnemonicCode: this.formData['mnemonicCode'],
                        parentId: this.formData['parentId'] == this.systemId ? 0 : this.formData['parentId'],
                        category: this.formData['category'],
                        supervisor: this.formData['supervisor'],
                        remark: this.formData['remark'],
                        locks: this.formData['locks'] ? 1 : 0,
                        systemId: this.systemId
                    }
                    this.$http({
                        url: this.$url + 'department/insertOrUpdateDepartment',
                        method: 'post',
                        params: data
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '修改成功', type: 'success'});
                            //更新要展开高亮的节点id
                            this.$store.commit('departmentStore/updateExpandNodeId', parseInt(data['parentId']) == 0 ? this.systemId : parseInt(data['parentId']));
                            setTimeout(() => {
                                this.$store.dispatch('departmentStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.systemId);
                                this.close();
                            }, 1000);
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
    created() {
        this.getUpdateData();
        this.lastDepartName = this.lastDepartmentName[0];
        this.formData['parentId'] = this.parentId[0].toString();
        this.$store.dispatch('departmentStore/getDepartTypeData', this.$url + '/auxiliaryInfoAllCategory/selectByDepartment');
        this.$store.dispatch('departmentStore/getEmployee', this.$url + 'employee/findEmployeeByName?systemId=' + this.$store.state.systemId);
    }
}
</script>
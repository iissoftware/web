<template>
    <!-- 用户组新增页面 -->
    <div class="addRowBlock">
        <el-form label-width="120px" :model="addRowData" ref="addRowForm" status-icon :rules="addFormRules">
            <el-form-item label="用户组名称：" prop="name" style="margin-top: 10px !important;">
                <el-input v-model="addRowData.name" @keyup.enter.native="save('addRowForm')"></el-input>
            </el-form-item>
            <el-form-item label="连续新增：" style="margin-bottom: 10px !important">
                <el-checkbox v-model="continueAdd"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('addRowForm')">确定</el-button>
                <el-button type="danger" size="small" @click="close">取消</el-button>
            </el-form-item>
        </el-form>           
    </div>
</template>

<script>
export default {
    data(){
        return{
            continueAdd: false,                     //是否连续新增
            addRowData:{                            //新增修改页面数据
                name:'',
            },
            addFormRules:{                          //新增修改表单验证
                name: [{required: true, message: '用户组名称不能为空', triggle: 'blur'}],
            },
            systemId: this.$store.state.systemId    //系统参数id
        }
    },
    methods:{
        save(formName) {                            //新增保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        name: this.addRowData['name'],
                        systemId: this.systemId
                    }
                    this.$http({
                        url: this.$url + 'userGroup/insertOrUpdateUserGroup',
                        method: 'post',
                        params: data
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: res.data.data, type: 'success',duration:1000});
                            this.$store.commit('userGroupStore/clearMids');
                            this.$store.commit('userGroupStore/updateCurrentLightRow',this.$store.state.userGroupStore.groupTableData.length);                            
                            if(this.continueAdd) {
                                setTimeout(() => {
                                    this.$refs['addRowForm'].resetFields();
                                    this.$store.dispatch('userGroupStore/getGroupTableData', this.$url + 'userGroup/selectObject?systemId=' + this.systemId);                                     
                                },1000)                                
                            } else {
                                setTimeout(() => { 
                                    this.$store.dispatch('userGroupStore/getGroupTableData', this.$url + 'userGroup/selectObject?systemId=' + this.systemId);                                 
                                    this.close();
                                }, 1000);
                            }
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            })
        },
        close() {                                   //关闭当前弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        },
    }
}
</script>

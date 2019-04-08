<template>
    <div class="updateRow">
        <div style="text-align: right;margin-right: 15px;">
            <el-button type="info" size="mini" @click="zuiqian()">最前</el-button>
            <el-button type="info" size="mini" @click="qianfan()">前翻</el-button>
            <el-button type="info" size="mini" @click="houfan()">后翻</el-button>
            <el-button type="info" size="mini" @click="zuihou()">最后</el-button>
        </div>
        <el-form label-width="120px" :model="updateRowData" ref="updateRowForm" status-icon :rules="updateFormRules" style="overflow: hidden;">
            <el-form-item label="用户名：" prop="userName" style="margin-top: 10px;">
                <el-input v-model="updateRowData.userName" @keyup.enter.native="enterKey($event, 'DPT1')"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="updateRowData.name" ref="DPT1" @keyup.enter.native="enterKey($event, 'DPT2')" readonly></el-input>
            </el-form-item>
            <el-form-item label="部门：" prop="deptName">
                <el-input v-model="updateRowData.deptName" ref="DPT1" @keyup.enter.native="enterKey($event, 'DPT2')" readonly></el-input>
            </el-form-item>
            <el-form-item label="职务：" prop="positionAux">
                <el-input v-model="updateRowData.positionAux" ref="DPT1" @keyup.enter.native="enterKey($event, 'DPT2')" readonly></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('updateRowForm')">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                updateRowData: {
                    userName: '',
                    name: '',
                    deptName: '',
                    positionAux: '',
                    userId: '',
                },
                updateFormRules: {
                    userName: [{required: true, message: '登录名不能为空', triggle: 'blur'}],
                },
                rowId:this.$store.state.userManagementStore.rowId,
                userManagementRow: [],
                index:'',
            }
        },
        methods: {
            getUpdateData(){                    //获取要修改的数据
                this.$http.get(this.$url + 'userManage/findUserById?id=' + this.rowId).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowData = res.data.data;
                        }
                    }
                });
                for(var i = 0 ;i < this.$store.state.userManagementStore.staffData.length; i++){
                    if(this.$store.state.userManagementStore.staffData[i]['id'] == this.rowId){
                        this.index = i ;
                    }
                }
            },
            save(formName) {                    //保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            userId: this.updateRowData['userId'],
                            userName: this.updateRowData['userName'],
                            systemId: this.$store.state.systemId
                        }
                        this.$http({
                            url: this.$url + 'userManage/updateUser',
                            method: 'post',
                            params: data
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$store.dispatch('userManagementStore/getSearch', this.$url + 'userManage/search');
                                this.$message({message: '数据修改成功', type: 'success', duration: 2000});
                                setTimeout(() => {
                                    this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=' + this.$store.state.userManagementStore.newdeptId + '&systemId=' + this.$store.state.systemId);
                                    this.close();
                                },1000)
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    }
                });
            },
            close() {                           //关闭新增弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
            },
            enterKey(lastRef, nextRef) {		//回车键换行
                if(lastRef.target.value) {
                    this.$refs[nextRef].focus();
                }
            },
            zuiqian(){                       //最前
                let staffData = this.$store.state.userManagementStore.staffData;
                if(this.index != 0){
                    this.index = 0;
                    this.$http.get(this.$url + 'userManage/findUserById?id=' +staffData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowData = res.data.data;
                            this.$store.commit('userManagementStore/updateRowId', staffData[this.index]['userId']);
                        }
                    }
                });
                }else{
                    this.$message.error('已经是第一条');
                }
            },
            houfan(){                        //后翻
                let staffData = this.$store.state.userManagementStore.staffData;
                if(this.index < staffData.length-1){
                    this.index = this.index + 1;
                    this.$http.get(this.$url + 'userManage/findUserById?id=' +staffData[this.index]['id']).then(res => {
                        if(res.data.code == 20001) {
                            if(res.data.data) {
                                this.updateRowData = res.data.data;
                                this.$store.commit('userManagementStore/updateRowId', staffData[this.index]['userId']);
                            }
                        }
                    });
                }else{
                    this.$message.error('已经是最后一条');
                }
            },
            qianfan(){                       //前翻
                let staffData = this.$store.state.userManagementStore.staffData;
                if(this.index > 0){
                    this.index = this.index - 1;
                    this.$http.get(this.$url + 'userManage/findUserById?id=' +staffData[this.index]['id']).then(res => {
                        if(res.data.code == 20001) {
                            if(res.data.data) {
                                this.updateRowData = res.data.data;
                                this.$store.commit('userManagementStore/updateRowId', staffData[this.index]['userId']);
                            }
                        }
                    });
                }else{
                    this.$message.error('已经是第一条');
                }
            },
            zuihou(){                        //最后
                let staffData = this.$store.state.userManagementStore.staffData;
                if(this.index != staffData.length - 1){
                    this.index = staffData.length - 1;
                    this.$http.get(this.$url + 'userManage/findUserById?id=' +staffData[this.index]['id']).then(res => {
                        if(res.data.code == 20001) {
                            if(res.data.data) {
                                this.updateRowData = res.data.data;
                                this.$store.commit('userManagementStore/updateRowId', staffData[this.index]['userId']);
                            }
                        }
                    });
                }else{
                    this.$message.error('已经是最后一条');
                }
            },
        },
        mounted() {
            this.getUpdateData();
        }
    }
</script>
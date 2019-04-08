<template>
    <div class="updateRow">
        <div style="text-align: right;margin-right: 15px;">
            <el-button type="info" size="mini" @click="zuiqian()">最前</el-button>
            <el-button type="info" size="mini" @click="qianfan()">前翻</el-button>
            <el-button type="info" size="mini" @click="houfan()">后翻</el-button>
            <el-button type="info" size="mini" @click="zuihou()">最后</el-button>
        </div>
        <el-form label-width="100px" :label-position="labelPosition" :model="updateRowData" ref="updateRowForm" status-icon :rules="updateFormRules" style="overflow: hidden;">
            <el-form-item label="名称：" prop="name" style="margin-top: 10px !important;">
                <el-input v-model.trim="updateRowData.name" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model.trim="updateRowData.remark" ref="MA1" @keyup.enter.native="save('updateRowForm')"></el-input>
            </el-form-item>
            <el-form-item label="是否可用：" style="margin-bottom: 10px !important;">
                <el-checkbox v-model.trim="updateRowData.lock"></el-checkbox>
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
                labelPosition: 'left',
                updateRowData: {
                    name: '',
                    remark: '',
                    lock: ''
                },
                updateFormRules: {
                    name: [{required: true, message: '输入名称'}]
                },
                index:'',
                balanceTypeData:[]
            }
        },
        methods: {
            getUpdateData() {
                this.$http.get(this.$url + 'closeAccount/findCloseAccountById?id=' + parent.idArr[0]).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            res.data.data['lock'] = Boolean(res.data.data['lock']);
                            this.updateRowData = res.data.data;
                        }
                    }
                });
                for(var i =0; i < this.balanceTypeData.length; i++){
                    if(parent.idArr[0] == this.balanceTypeData[i]['id']){
                        this.index = i;
                    }
                }
            },
            save(formName) {                 //修改保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            id: this.updateRowData['id'],
                            name: this.updateRowData['name'],
                            remark: this.updateRowData['remark'],
                            lock: this.updateRowData['lock'] ? 1 : 0
                        }
                        this.$http({
                            url: this.$url + 'closeAccount/updateCloseAccount',
                            method: 'post',
                            params: data
                        }).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '修改成功', type: 'success'});
                                setTimeout(() => {
                                    parent.getData();
                                    this.close();
                                }, 500)
                            }
                        })
                    }
                });
            },
            zuiqian(){                       //最前
                let balanceTypeData = this.balanceTypeData;
                if(this.index != 0){
                    this.index = 0;
                    this.$http.get(this.$url + 'closeAccount/findCloseAccountById?id=' + balanceTypeData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            res.data.data['lock'] = Boolean(res.data.data['lock']);
                            this.updateRowData = res.data.data;
                        }
                    }
                });
                }else{
                    this.$message.error('已经是第一条');
                }
            },
            houfan(){                        //后翻
                let balanceTypeData = this.balanceTypeData;
                if(this.index < balanceTypeData.length-1){
                    this.index = this.index + 1;
                    this.$http.get(this.$url + 'closeAccount/findCloseAccountById?id=' + balanceTypeData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            res.data.data['lock'] = Boolean(res.data.data['lock']);
                            this.updateRowData = res.data.data;
                        }
                    }
                });
                }else{
                    this.$message.error('已经是最后一条');
                }
            },
            qianfan(){                       //前翻
                let balanceTypeData = this.balanceTypeData;
                if(this.index > 0){
                    this.index = this.index - 1;
                    this.$http.get(this.$url + 'closeAccount/findCloseAccountById?id=' + balanceTypeData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            res.data.data['lock'] = Boolean(res.data.data['lock']);
                            this.updateRowData = res.data.data;
                        }
                    }
                });
                }else{
                    this.$message.error('已经是第一条');
                }
            },
            zuihou(){                        //最后
                let balanceTypeData = this.balanceTypeData;
                if(this.index != balanceTypeData.length - 1){
                    this.index = balanceTypeData.length - 1;
                    this.$http.get(this.$url + 'closeAccount/findCloseAccountById?id=' + balanceTypeData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            res.data.data['lock'] = Boolean(res.data.data['lock']);
                            this.updateRowData = res.data.data;
                        }
                    }
                });
                }else{
                    this.$message.error('已经是最后一条');
                }
            },
            close() {                        //关闭新增弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
                if(window.idArr) delete window.idArr;
                if(window.getData) delete window.getData;
                if(window.obj) delete window.obj;
            },
            enterKey(lastRef, nextRef) {	 //回车键换行
                if(lastRef.target.value) {
                    this.$refs[nextRef].focus();
                }
            }
        },
        mounted() {
            this.getUpdateData();
            this.balanceTypeData = parent.obj.balanceTypeData
        }
    }
</script>


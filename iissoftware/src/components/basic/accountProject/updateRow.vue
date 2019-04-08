<template>
    <div class="addRow">
        <div style="text-align: right;margin-right: 15px;">
            <el-button type="info" size="mini" @click="zuiqian()">最前</el-button>
            <el-button type="info" size="mini" @click="qianfan()">前翻</el-button>
            <el-button type="info" size="mini" @click="houfan()">后翻</el-button>
            <el-button type="info" size="mini" @click="zuihou()">最后</el-button>
        </div>
        <el-form label-width="120px" :model="formData" ref="addRowForm" status-icon :rules="formDataRules" style="overflow: hidden !important;">
            <el-form-item label="上级类别：" prop="superiorId" style="margin-top: 10px !important;">
                <el-input v-model="typeName" readonly @click.native="showLastType"></el-input>
                <el-input v-model="formData.superiorId" readonly style="display: none;"></el-input>
            </el-form-item>
            <el-form-item label="名　　称：" prop="name">
                <el-input v-model="formData.name" ref="ST1" @keyup.enter.native="enterKey($event, 'ST2')"></el-input>
            </el-form-item>
            <el-form-item label="助 记 码：" prop="mnemonicCode">
                <el-input v-model="formData.mnemonicCode" ref="ST2" @keyup.enter.native="enterKey($event, 'ST3')"></el-input>
            </el-form-item>
            <el-form-item label="备　　注：" prop="remark">
                <el-input v-model="formData.remakes" ref="ST3" @keyup.enter.native="addRowSave('addRowForm')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="save('addRowForm')">保存</el-button>
                <el-button size="small" type="danger" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/**
 * Author: 赵巧芬
 * Date: 2018-11-29
 * Description: 核算项目修改
 * accountProjectStore
*/
export default {
    data() {
        return {
            formData: {
                superiorId:'',
                name:'',
                mnemonicCode:'',
                remakes:''
            },
            formDataRules: {
                name:[{required:true, message:'名称不能为空', trigger:'blur'}]
            },
            typeName: '',
            lastType: this.$store.state.accountProjectStore.lastType,            //上级类别数据
            rowId: this.$store.state.accountProjectStore.rowId,
            index:''
        }
    },
    watch: {
        lastType() {          //监听上级类别数据变化
            if(this.lastType.length > 0) {
                this.typeName = this.lastType[0]['name'];
                this.formData['superiorId'] = this.lastType[0]['id'];
            }
        }
    },
    methods: {
        getUpdateData() {
            this.$http.get(this.$url + 'accountItem/selectInfo?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.formData = res.data.data;
                        this.typeName = res.data.data['superiorName'];
                    }
                }
            });
            for(var i =0; i< this.$store.state.accountProjectStore.tableData.length; i ++){
                if(this.$store.state.accountProjectStore.tableData[i]['id'] == this.rowId){
                    this.index = i;
                }
            }
        },
        showLastType() {                //上级类别弹窗
            this.$util.openSubLayerIframe('上级类别', 13, '600px', '420px', this.$domain + '/#/accountProject/lastType');
        },
        save(formName) {                //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //修改保存
                    let data = {
                        id: this.formData['id'],
                        superiorId:this.formData['superiorId'],
                        name: this.formData['name'],
                        mnemonicCode: this.formData['mnemonicCode'],
                        remakes: this.formData['remakes'],
                        state: this.formData['state'],
                    }
                    this.$http({
                        url: this.$url + 'accountItem/update',
                        method: 'post',
                        params: data
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$store.dispatch('accountProjectStore/getSearch',this.$url + 'accountItem/select')
                            this.$message({message: '修改成功', type: 'success'});
                            //更新要刷新的节点id
                            let lastType = this.$store.state.accountProjectStore.lastType;
                            if(lastType.length > 0) {
                                this.$store.commit('accountProjectStore/updateCurrentNodeId', lastType[0]['id']);
                            }
                            setTimeout(() => {
                                this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
                                this.close();
                            }, 1000)
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },
        close() {                       //关闭新增弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
            this.$store.commit('accountProjectStore/clearLastType');
        },
        zuiqian(){                       //最前
            let tableData = this.$store.state.accountProjectStore.tableData
            if(this.index != 0){
                this.index = 0;
                this.$http.get(this.$url + 'accountItem/selectInfo?id=' + tableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.formData = res.data.data;
                            this.typeName = res.data.data['superiorName'];
                        }
                    }
                });
            }else{
                this.$message.error('已经是第一条');
            }
        },
        houfan(){                        //后翻
            let tableData = this.$store.state.accountProjectStore.tableData
            if(this.index < tableData.length-1){
                this.index = this.index + 1;
                this.$http.get(this.$url + 'accountItem/selectInfo?id=' + tableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.formData = res.data.data;
                            this.typeName = res.data.data['superiorName'];
                        }
                    }
                });
            }else{
                this.$message.error('已经是最后一条');
            }
        },
        qianfan(){                       //前翻
            let tableData = this.$store.state.accountProjectStore.tableData
            if(this.index > 0){
                this.index = this.index - 1;
                this.$http.get(this.$url + 'accountItem/selectInfo?id=' + tableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.formData = res.data.data;
                            this.typeName = res.data.data['superiorName'];
                        }
                    }
                });
            }else{
                this.$message.error('已经是第一条');
            }
        },
        zuihou(){                        //最后
            let tableData = this.$store.state.accountProjectStore.tableData
            if(this.index != tableData.length - 1){
                this.index = tableData.length - 1;
                this.$http.get(this.$url + 'accountItem/selectInfo?id=' + tableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.formData = res.data.data;
                            this.typeName = res.data.data['superiorName'];
                        }
                    }
                });
            }else{
                this.$message.error('已经是最后一条');
            }
        },
        enterKey(lastRef, nextRef) {	 //回车键换行
            if(lastRef.target.value) {
                this.$refs[nextRef].focus();
            }
        }
    },
    created() {
        this.getUpdateData();
    }
}
</script>
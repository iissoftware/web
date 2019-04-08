<template>
    <div class="addRow">
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
            <el-form-item label="连续增加：" style="margin-bottom: 10px !important;">
                <el-checkbox v-model="continueAdd"></el-checkbox>
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
 * Description: 核算项目新增
 * accountProjectStore
*/
export default {
    data() {
        return {
            continueAdd: false,     //是否连续新增
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
            currentRow: this.$store.state.accountProjectStore.currentRow,
            lastType: this.$store.state.accountProjectStore.lastType,            //上级类别数据
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
    created() {
        this.typeName = this.currentRow[0]['name'];
        this.formData['superiorId'] = this.currentRow[0]['id'];
    },
    methods: {
        save(formName) {            //保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http({
                        url: this.$url + 'accountItem/insert',
                        method: 'post',
                        params: this.formData
                    }).then(res => {
                        if(res.data.code == 20001) {
                            this.$store.dispatch('accountProjectStore/getSearch',this.$url + 'accountItem/select')
                            this.$message({type: 'success', duration: 1000, message: '添加成功'});
                            //更新要刷新的节点id
                            let lastType = this.$store.state.accountProjectStore.lastType;
                            if(lastType.length > 0) {
                                this.$store.commit('accountProjectStore/updateCurrentNodeId', lastType[0]['id']);
                            }
                            if(this.continueAdd) {
                                this.typeName = this.currentRow[0]['name'];
                                //是否连续新增
                                setTimeout(() => {
                                    this.$refs[formName].resetFields();
                                    this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
                                }, 1000);
                            } else {
                                setTimeout(() => {
                                    this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
                                    this.close();
                                }, 1000);
                            }
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },
        showLastType() {
            this.$util.openSubLayerIframe('上级类别', 13, '600px', '420px', this.$domain + '/#/accountProject/lastType');
        },
        close() {           //关闭新增弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
            this.$store.commit('accountProjectStore/clearLastType');
        },
        enterKey(lastRef, nextRef) {		//回车键换行
            if(lastRef.target.value) {
                this.$refs[nextRef].focus();
            }
        }
    }
}
</script>


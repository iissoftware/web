<template>
    <!-- 用户组修改页面 -->
    <div class="updateRowBlock">
        <div style="text-align: right;margin-right: 15px;margin-bottom:15px">
            <el-button type="info" size="mini" @click="zuiqian()">最前</el-button>
            <el-button type="info" size="mini" @click="qianfan()">前翻</el-button>
            <el-button type="info" size="mini" @click="houfan()">后翻</el-button>
            <el-button type="info" size="mini" @click="zuihou()">最后</el-button>
        </div>
        <el-form label-width="120px" :model="updateRowData" ref="updateRowForm" status-icon :rules="addFormRules">
            <el-form-item label="用户组名称：" prop="name" style="margin-top: 10px !important;">
                <el-input v-model="updateRowData.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('updateRowForm')">确定</el-button>
                <el-button type="danger" size="small" @click="close">取消</el-button>
            </el-form-item>
        </el-form>           
    </div>
</template>

<script>
export default {
    data(){
        return{
            updateRowData:{                                 //修改表单数据
                name:'',
            },
            addFormRules:{                                  //修改表单验证
                name: [{required: true, message: '用户组名称不能为空', triggle: 'blur'}],
            },
            rowId: this.$store.state.userGroupStore.rowId,  //修改数据的id
            systemId: this.$store.state.systemId,           //系统参数id
            index:'',                                       //前翻后翻
        }
    },
    methods:{
        getUpdateData() {                       //获取要更新的数据
            this.$http.get(this.$url + 'userGroup/selectObjectById?id=' + this.rowId).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.updateRowData = res.data.data;
                    }
                }
            })
            for(var i = 0 ; i < this.$store.state.userGroupStore.groupTableData.length; i++){
                if(this.$store.state.userGroupStore.groupTableData[i]['id'] == this.rowId){
                    this.index = i;
                }
            }
        },
        save(formName) {                        //修改保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        id: this.updateRowData['id'],
                        name: this.updateRowData['name'],
                        systemId: this.systemId,
                    }             
                    this.$http({
                        url: this.$url + 'userGroup/insertOrUpdateUserGroup',
                        method: 'post',
                        params: data
                    }).then(res => {
                        if(res.data.code == 20001) {                              
                            this.$message({message: '修改成功', type: 'success', duration: 1000});
                            setTimeout(() => {
                                this.close();
                                this.$store.dispatch('userGroupStore/getGroupTableData', this.$url + 'userGroup/selectObject?systemId=' + this.systemId);
                            }, 1000)
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            })
        },
        zuiqian(){                              //最前
            let groupTableData = this.$store.state.userGroupStore.groupTableData;
            if(this.index != 2){
                this.index = 2;
                this.$http.get(this.$url + 'userGroup/selectObjectById?id=' + groupTableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowData = res.data.data;
                        }
                    }
                })
            }else{
                this.$message({message: '已经是第一条了', type: 'error',duration:1000});
            }
        },
        qianfan(){                              //前翻
            let groupTableData = this.$store.state.userGroupStore.groupTableData;
            if(this.index > 2){
                this.index = this.index - 1;
                this.$http.get(this.$url + 'userGroup/selectObjectById?id=' + groupTableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowData = res.data.data;
                        }
                    }
                })
            }else{
                this.$message({message: '已经是第一条了,不可前翻', type: 'error',duration:1000});
            }
        },
        houfan(){                               //后翻
            let groupTableData = this.$store.state.userGroupStore.groupTableData;
            if(this.index < groupTableData.length-1){
                this.index = this.index + 1;
                this.$http.get(this.$url + 'userGroup/selectObjectById?id=' + groupTableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowData = res.data.data;
                        }
                    }
                })
            }else{
                this.$message({message: '已经是最后一条了,不可后翻', type: 'error',duration:1000});
            }
        },
        zuihou(){                               //最后
            let groupTableData = this.$store.state.userGroupStore.groupTableData;
            if(this.index != groupTableData.length - 1){
                this.index = groupTableData.length - 1;
                this.$http.get(this.$url + 'userGroup/selectObjectById?id=' + groupTableData[this.index]['id']).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowData = res.data.data;                                             
                        }
                    }
                })
            }else{
                this.$message({message: '已经是最后一条了', type: 'error',duration: 1000});
            }
        },
        close(){                                //关闭按钮
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    },
    mounted(){
        this.getUpdateData();
    }

}
</script>



<template>
    <div class="block-area">
        <div class="table">
            <el-table :data="subsidiaryRow" border @cell-click="handClick" :highlight-current-row="true">
                <el-table-column type="index" label="编号" width="80"></el-table-column>
                <el-table-column property="name" label="账户名"></el-table-column>
                <el-table-column property="bankName" label="开户行"></el-table-column>
                <el-table-column property="accountNumber" label="银行账号"></el-table-column>
            </el-table>
        </div>
        <div class="btn">
            <el-button type="primary" @click="save">确定</el-button>
            <el-button type="danger">关闭</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            subsidiaryRow: this.$store.state.initializeStore.bankItemData,
            rowData: []
        }
    },
    methods: {
        handClick(row){
            this.rowData = row;
        },
        save(){
            this.$store.commit('initializeStore/updatebankObj', [this.rowData]);
            this.close();
        },
        close() {                               //关闭新增弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        },
    },
    mounted() {
        
    }
}
</script>
<style lang="less" scoped>
    .table{height: 90%;}
    .btn{text-align: right;margin-top: 10px;}
</style>



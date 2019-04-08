<template>
    <div class="addRow">
        <el-form label-width="120px" :model="addRowData" ref="addRowForm" status-icon>
            <el-form-item label="资产：" prop="assets">
                <el-input v-model="addRowData.assets" @keyup.enter.native="enterKey($event, 'MA1')"></el-input>
            </el-form-item>
            <el-form-item label="负债+权益：" prop="liabilities">
                <el-input v-model="addRowData.liabilities" ref="MA1" @keyup.enter.native="enterKey($event, 'MA2')"></el-input>
            </el-form-item>
            <el-form-item label="差额：" prop="difference">
                <el-input v-if="addRowData.difference == '0.00'" v-model="addRowData.difference" ref="MA2" @keyup.enter.native="addRowSave('addRowForm')" readonly></el-input>
                <el-input v-else v-model="addRowData.difference" class="defferenceColor" ref="MA2" @keyup.enter.native="addRowSave('addRowForm')" readonly></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addRowSave('addRowForm')">计算</el-button>
                <el-button type="danger" @click="leaveRow">退出</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/**
 * 2019/2/28
 * zqf
 * 试算平衡
 */
export default {
    data(){
        return {
            addRowData: {
                assets: this.$store.state.initializeStore.assetNum,         //资产
                liabilities: this.$store.state.initializeStore.liabilities, //负债+权益
                difference: this.$store.state.initializeStore.difference,   //差额
            }
        }
    },
    methods: {
        addRowSave(){                   //计算
            if(this.addRowData['difference'] !== '0.00'){
                this.$message({message: '初始化试算不平衡', type: 'warning'});
            }
        },
        leaveRow(){                     //离开                     
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    }
}
</script>
<style lang="less">
.defferenceColor{
    .el-input__inner{
        color:#f56c6c !important;
        border: 1px solid #f56c6c !important;
    }
}
</style>


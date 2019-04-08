<template>
    <div class="saveTemplete block-area">
        <div class="table">
            <el-row>
                <el-col :span="4">模板名称</el-col>
                <el-col :span="4"></el-col>
                <el-col :span="4">说明</el-col>
                <el-col :span="12"></el-col>
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%;height: 40% !important;">
                        <el-table-column prop="date" label="制单日期"></el-table-column>
                        <el-table-column prop="date" label="单据编号"></el-table-column>
                        <el-table-column prop="date" label="事业部"></el-table-column>
                        <el-table-column prop="date" label="中心"></el-table-column>
                        <el-table-column prop="date" label="部门"></el-table-column>
                        <el-table-column prop="date" label="姓名"></el-table-column>
                        <el-table-column prop="date" label="费用报销类别"></el-table-column>
                        <el-table-column prop="date" label="摘要"></el-table-column>
                        <el-table-column prop="date" label="往来末级科目"></el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="24">
                    <div class="saveBtn">
                        <el-button type="primary">确定</el-button>
                        <el-button type="danger">离开</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData: [
                {
                   date:'2019-3-25' 
                }
            ]
        }
    }
}
</script>

<style lang="less">
.saveTemplete{
    .saveBtn{
        text-align: center;
        margin-top: 10px;
    }
}
</style>

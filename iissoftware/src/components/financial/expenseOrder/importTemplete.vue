<template>
    <div class="importTemplete block-area">
        <div class="table">
            <el-table :data="tableData" style="width: 100%;height: 87% !important;">
                <el-table-column>
                    <el-table-column prop="date" label="模板名称"></el-table-column>
                    <el-table-column prop="date" label="模板信息">
                        <el-table-column prop="date" label="制单日期"></el-table-column>
                        <el-table-column prop="date" label="单据编号"></el-table-column>
                        <el-table-column prop="date" label="事业部"></el-table-column>
                        <el-table-column prop="date" label="中心"></el-table-column>
                        <el-table-column prop="date" label="部门"></el-table-column>
                        <el-table-column prop="date" label="姓名"></el-table-column>
                        <el-table-column prop="date" label="费用报销类别"></el-table-column>
                        <el-table-column prop="date" label="摘要"></el-table-column>
                        <el-table-column prop="date" label="往来末级科目"></el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="importBtn">
                <el-button type="primary">确定</el-button>
                <el-button type="danger">离开</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.importTemplete{
    .el-table tr:first-child{
        display: none;
    }
    .importBtn{
        text-align: center;
        margin-top: 10px;
    }
}
</style>

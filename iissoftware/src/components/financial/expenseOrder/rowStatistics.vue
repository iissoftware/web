<template>
    <div class="rowStatistics">
        <div class="top-part">
            <el-form :inline="true" :model="topForm" label-width="82px">
                <el-form-item label="日期选择:">
                    <el-date-picker
                        v-model="topForm.showTime"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="事业部:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item label="中心:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item label="部门:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item label="制单人:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item label="报销类别:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item label="费用科目:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item label="制单金额:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item label="审批金额:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item label="审批状态:">
                    <el-input v-model="topForm.aaa"></el-input>
                </el-form-item>
                <el-form-item style="width:95%;text-align:right">
                    <el-button type="info" size="mini">重置</el-button>
                    <el-button type="primary" size="mini">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="block-area" style="margin-top:10px">
            <div class="btn-box">
                <div class="btn-group">
                    <el-button type="info">刷新</el-button>
                    <el-button-group class="btn-other">
                        <el-button title="导出">
                            <img src="../../../assets/images/export.png" alt="">
                        </el-button>
                        <el-button title="导入">
                            <el-upload class="upload-demo" :action="$url" :show-file-list="false" multiple style="display: inline-block;">
                                <img src="../../../assets/images/import.png" alt="">
                            </el-upload>
                        </el-button>                        
                        <el-button title="打印">
                            <img src="../../../assets/images/print.png" alt="">
                        </el-button>
                        <el-button title="帮助">
                            <img src="../../../assets/images/help.png" alt="">
                        </el-button>
                    </el-button-group>
                </div>
            </div>
            <!-- 表格数据 -->
            <div class="table">
                <el-table :data="tableData" @selection-change="handleSelectionChange"> 
                    <el-table-column type="selection" min-width="55"></el-table-column>
                    <el-table-column property="userName" label="序号"></el-table-column>
                    <el-table-column property="name" label="单据号"></el-table-column>
                    <el-table-column property="sex" label="制单日期"></el-table-column>
                    <el-table-column  property="deptName" label="制单人" ></el-table-column>
                    <el-table-column property="positionAux" label="费用报销类别"></el-table-column>
                    <el-table-column property="aaa" label="摘要"></el-table-column>
                    <el-table-column property="positionAux" label="数量"></el-table-column>
                    <el-table-column property="positionAux" label="单价"></el-table-column>
                    <el-table-column property="positionAux" label="制单金额"></el-table-column>
                    <el-table-column property="positionAux" label="审批金额"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],       //表格数据
            topForm: {
                showTime:'',
                aaa:''
            }
        }
    },
    methods:{
        handleSelectionChange(){

        },
    },
}
</script>
<style lang="less">
.rowStatistics .table { height: calc(100% - 42px) !important;}
.rowStatistics .table .el-table__body-wrapper {overflow-y: auto !important; height: calc(100% - 41px) !important;}
.rowStatistics .el-select-dropdown__wrap{max-height: 240px !important;}
</style>
<style lang="less" scoped>
.rowStatistics{
    height: 100%;overflow:hidden;min-width: 1230px;
    .top-part{
        min-width: 1230px;
        width:100%;
        background-color:white;
        padding:10px 10px;
        .el-form{
            .el-form-item{
                width: 19%;
                margin-bottom: 2px;
                margin-right: 0px !important;
            }
            .el-date-editor--daterange.el-input__inner{
                width:146px;
                padding:0 0px !important;
                .el-date-editor .el-range-input {font-size:12px !important;margin-left:-5px}
            }
        }
    }
}
</style>

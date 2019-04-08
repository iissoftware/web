<template>
    <div class="rowList">
        <div class="top">
            <el-button plain>暂保存</el-button>
            <el-button plain>全部状态</el-button>
            <el-button plain>未审核</el-button>
            <el-button plain>已审核</el-button>
            <el-button plain>审核中</el-button>
            <el-button plain>审核完成</el-button>
            <el-button plain>审核未通过</el-button>
            <el-button plain>知会我</el-button>
            <el-button plain>我提交</el-button>
            <el-date-picker v-model="startTime" type="date" placeholder="开始时间" size="small"
                value-format="yyyy-MM-dd" style="margin-left:10px"></el-date-picker>
            <span style="margin: 0 5px;">到</span>
            <el-date-picker v-model="endTime" type="date" placeholder="结束时间" size="small"
                value-format="yyyy-MM-dd"></el-date-picker>
            <el-input v-model="searchText" class="sousuoa" placeholder="输入搜索内容" @keyup.enter.native="onSubmit"></el-input>
            <el-button type="primary" class="sousuo" @click.native="onSubmit">查询</el-button>
        </div> 
        <div class="block-area" style="margin-top:10px">
            <div class="btn-box">
                <el-button type="danger">作废</el-button>
                <el-button type="warning">发邮件</el-button>
                <el-button type="success">发微信</el-button>
                <el-button type="primary">发QQ</el-button>
                <div class="btn-group">
                    <el-button type="info">刷新</el-button>
                    <el-button type="primary" @click="add">新增</el-button>
                    <el-button type="danger">删除</el-button>
                    <el-button type="primary">附件</el-button>
                    <el-button-group class="btn-other">
                        <el-button title="导出">
                            <img src="../../../assets/images/export.png" alt="">
                        </el-button>
                        <el-button title="导入">
                            <el-upload class="upload-demo" :action="$url + 'employee/importEmployee'" :show-file-list="false" multiple style="display: inline-block;">
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
                    <el-table-column property="documentNo" label="单据号"></el-table-column>
                    <el-table-column property="reimbursementWay" label="报销方式"></el-table-column>
                    <el-table-column property="reimbursementproject" label="报销项目"></el-table-column>
                    <el-table-column  property="data" label="报销年月" ></el-table-column>
                    <el-table-column property="deptName" label="部门"></el-table-column>
                    <el-table-column property="remark" label="摘要"></el-table-column>
                    <el-table-column property="money" label="报销金额"></el-table-column>
                    <el-table-column property="perpo" label="制单人"></el-table-column>
                    <el-table-column property="state" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state == 1" style="color: green;">已审核</span>
                            <span v-if="scope.row.state == 0" style="color: #f00;">审核未通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template>
                            <el-button type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">审核</el-button> 
                            <el-button type="text" size="small">撤单</el-button>
                            <el-button type="text" size="small">修改</el-button>                                  
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * author:zqf
 * templete:费用报销单----列表
 */
export default {
    data(){
        return{
            startTime:'',                       //开始时间
            endTime:'',                         //结束时间
            searchText:'',                         //查询框
            tableData:[],                        //表格数据
        }
    },
    methods:{
        add(){
            this.$util.openSubLayerIframe('费用报销单-新增', 13, '80%', '95%', this.$domain + '/#/expenseOrder/add');
        },
        onSubmit(){
        },
        handleSelectionChange(){

        }
    },
    mounted(){
        this.$store.dispatch('expenseFormStore/getAddRowData', this.$url + 'expenseAccount/view');
    }
    
}
</script>
<style lang="less">
.rowList .table { height: calc(100% - 42px) !important;}
.rowList .table .el-table__body-wrapper {overflow-y: auto !important; height: calc(100% - 41px) !important;}
.rowList .el-select-dropdown__wrap{max-height: 240px !important;}
</style>

<style lang="less" scoped>
.rowList{
    height: 100%;overflow:hidden;min-width: 1230px;
    .top{
        min-width: 1230px;
        background-color: #fff;
        padding:10px 10px;
        padding-bottom:0px;
        height:52px;
        box-sizing: border-box;
        overflow: hidden;
        .el-button {padding: 8px 8px;}
        .el-date-editor.el-input {width:120px !important}
        .sousuoa{margin-left:10px;width: 10%;}
    }
}
</style>



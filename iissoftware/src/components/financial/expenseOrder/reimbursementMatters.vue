<template>
    <div>
        <div class="expenseTemplate">
            <div class="block-area">
                <div class="btn-box">
                    <el-input v-model="searchText" class="sousuo-input" placeholder="输入搜索内容"></el-input>
                    <el-button type="primary" class="sousuo">查询</el-button>
                    <div class="btn-group">
                        <el-button type="primary" @click="addRow">新增</el-button>
                    </div>
                </div>
                <!-- 表格数据 -->
                <div class="table">
                    <el-table :data="tableData" border @selection-change="handleSelectionChange" class="tb-edit" highlight-current-row> 
                        <el-table-column type="selection" min-width="55" fixed></el-table-column>
                        <el-table-column property="levelOneSubject" label="费用报销类别"></el-table-column>
                        <el-table-column  property="levelTwoSubject" label="一级科目"></el-table-column>
                        <el-table-column property="levelThreeSubject" label="二级科目"></el-table-column>
                        <el-table-column property="levelFourSubject" label="三级科目"></el-table-column>
                        <el-table-column property="levelFourSubject" label="四级科目"></el-table-column>
                        <el-table-column property="remark" label="备注"></el-table-column>
                        <el-table-column property="state" label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state == 1" style="color: green;">已启用</span>
                                <span v-if="scope.row.state == 0" style="color: #f00;">已禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchText:'', //搜索的内容
            tableData:[],  //表格数据
            multipleSelection:[],
            selectRowId:[],
            systemId:this.$store.state.systemId, //系统参数id
        }
    },
    watch:{
    },
    methods:{
        handleSelectionChange(row){                     //表格勾选
            this.multipleSelection = row;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        addRow(){
            this.$util.openSubLayerIframe('费用报销类别审批单', 20, '60%', '70%', this.$domain + '/#/expenseFormTemplate/add');
        },
    },
    mounted(){
    }
}
</script>

<style lang='less'>
    .expenseTemplate{
        .tb-edit .el-input {
            display: none
        }
        .tb-edit .current-row .el-input {
            display: block
        }
        .tb-edit .current-row .el-input+span {
            display: none
        }
    }
</style>
<style lang="less" scoped>
    .expenseTemplate {
        height: 100%;
        overflow: hidden;
    }
</style>
<template>
    <div class="borrowTemplate">
        <div class="block-area">
            <div class="btn-box">
                <el-input v-model="content" class="sousuo-input" placeholder="输入搜索内容" @keyup.enter.native="onSubmit"></el-input>
                <el-button type="primary" class="sousuo" @click.native="onSubmit">查询</el-button>
                <div class="btn-group">
                    <el-button type="primary" @click="add">新增</el-button>
                </div>
            </div>
            <!-- 表格数据 -->
            <div class="table">
                <el-table :data="tableData" border @selection-change="handleSelectionChange"> 
                    <el-table-column type="selection" min-width="55" fixed></el-table-column>
                    <el-table-column property="loanCategory" label="借款类别"></el-table-column>
                    <el-table-column property="levelOneSubject" label="一级科目"></el-table-column>
                    <el-table-column  property="levelTwoSubject" label="二级科目"></el-table-column>
                    <el-table-column property="levelThreeSubject" label="三级科目"></el-table-column>
                    <el-table-column property="levelFourSubject" label="四级科目"></el-table-column>
                    <el-table-column property="remark" label="备注"></el-table-column>
                    <el-table-column property="state" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state == 1" style="color: green;">已启用</span>
                            <span v-if="scope.row.state == 0" style="color: #f00;">已禁用</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import MenuBox from '../../MenuBox'
export default {
    components: {
        'v-menu-box': MenuBox
    },
    data(){
        return{
            content:'',                                                 //搜索的内容
            tableData:this.$store.state.borrowTemplateStore.tableData,  //表格数据
            systemId:this.$store.state.systemId,                        //系统参数id
        }
    },
    watch:{
        content(newVal) {    //查询
            if(!newVal) {
                this.tableData = this.$store.state.borrowTemplateStore.tableData;
            }
        },
    },
    methods:{
        handleSelectionChange(data){                     //表格勾选
            this.$store.commit('borrowOrderStore/updateLoan', data);
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        },
        onSubmit(){                                     //查询按钮
            if(this.content) {
                let arr = this.$store.state.borrowTemplateStore.searchData,
                    newArr = [],
                    reg = new RegExp(this.content, 'g');                    
                arr.forEach(item => {
                    let toNamePinyin = item['toNamePinyin'],
                        loanCategory = item['loanCategory'],
                        toSimplePinyin = item['toSimplePinyin'];
                    if( (toNamePinyin && reg.test(toNamePinyin)) || (loanCategory && reg.test(loanCategory)) || (toSimplePinyin && reg.test(toSimplePinyin))) {
                        newArr.push(item);
                    }

                });
                this.tableData = newArr;                //如果查到结果，就更新表格数据            
            } else {
                this.$message({message: '输入搜索的内容', type: 'warning'});
            }
        },
        add(){                                          //新增
            this.$util.openSubLayerIframe('借款类别审批单', 20, '60%', '70%', this.$domain + '/#/borrowFormTemplate/add');
        },
    },
    mounted(){
        // this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
        // this.$store.dispatch('borrowTemplateStore/getSearch',this.$url + 'loanCategory/searchLoanCategory')
        // console.log(this.systemId,'systemid')
    }
}
</script>

<style lang="less">
    .borrowTemplate{
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
    .borrowTemplate {
        height: 100%;
        overflow: hidden;
        // min-width: 1000px;
    }
</style>



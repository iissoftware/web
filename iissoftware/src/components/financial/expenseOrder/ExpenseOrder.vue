<template>
    <div class="expenseOrder">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单据列表" name="first">
                <v-rowList/>
            </el-tab-pane>
            <el-tab-pane label="费用报销单统计表" name="second">
                <v-rowStatistics/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import rowList from './rowList'
import rowStatistics from './rowStatistics'
export default {
    components: {
        'v-rowList': rowList,
        'v-rowStatistics': rowStatistics
    },
    data(){
        return{
            activeName:'first',
        }
    },
    methods:{
        handleClick(){
            
        }
    }
}
</script>

<style lang="less">
    .expenseOrder .el-date-editor .el-input__inner {
        height: auto !important;
        line-height: 0 !important;
        padding:8px 0px 8px 15px !important;
    }
    .expenseOrder .sousuoa .el-input__inner {
        height: auto !important;
        line-height: 0 !important;
        padding: 7px 10px !important;
    }
    .expenseOrder .el-form--inline .el-form-item__content {width:146px !important;margin-left:-10px !important;}
    .expenseOrder .el-form--inline .el-form-item__content .el-input .el-input__inner{padding:7px 15px !important}
    .expenseOrder .el-icon-date:before {content: "";}
    .expenseOrder .el-form-item:last-child {margin-bottom: 0px !important}
    .expenseOrder .el-form-item:last-child .el-form-item__content{margin-left: 50px !important}
    .expenseOrder .el-date-editor .el-range__icon{display:none;}
    .expenseOrder .el-date-editor .el-range__close-icon{display:none;}
    .expenseOrder .el-date-editor .el-range-input{width:43% !important;font-size:12px}
</style>

<style lang="less" scoped>
    .expenseOrder{
        width:100%;
        height:100%;
        overflow: hidden;
    }
</style>
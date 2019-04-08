<template>
    <div class="borrowOrder">
        <el-tabs v-model="activeName">
            <el-tab-pane label="单据列表" name="first">  
                <v-one></v-one>                          
            </el-tab-pane>
            <el-tab-pane label="借款单统计表" name="second"> 
                <v-two></v-two>               
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import one from "./one"
import two from "./two"
export default {
    components:{
        'v-one': one,
        'v-two': two
    },
    data(){
        return{
            activeName:'first',
        }
    }
}
</script>

<style lang="less">
    // .borrowOrder .el-date-editor .el-input__inner {
    //     height: auto !important;
    //     line-height: 0 !important;
    //     padding:8px 0px 8px 15px !important;
    // }
    // .borrowOrder .sousuoa .el-input__inner {
    //     height: auto !important;
    //     line-height: 0 !important;
    //     padding: 7px 10px !important;
    // }
    // .borrowOrder .el-form--inline .el-form-item__content {width:146px !important;margin-left:-10px !important;}
    // .borrowOrder .el-form--inline .el-form-item__content .el-input .el-input__inner{padding:7px 15px !important}
    // .borrowOrder .el-icon-date:before {content: "";}
    // .borrowOrder .el-form-item:last-child {margin-bottom: 0px !important}
    // .borrowOrder .el-form-item:last-child .el-form-item__content{margin-left: 50px !important}
    // .borrowOrder .el-date-editor .el-range__icon{display:none;}
    // .borrowOrder .el-date-editor .el-range__close-icon{display:none;}
    // .borrowOrder .el-date-editor .el-range-input{width:43% !important;font-size:12px}
</style>


<style lang="less" scoped>
    .borrowOrder{
        width:100%;
        height:100%;
        overflow: hidden;
    }
    

</style>



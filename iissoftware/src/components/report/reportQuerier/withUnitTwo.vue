<template>
    <div class="withUnitTwo">
        <el-input v-model="content" class="sousuo-input" placeholder="输入关键字" @keyup.enter.native="onSubmit"></el-input>
        <el-button type="primary" class="sousuo" @click.native="onSubmit">查询</el-button>
        <el-table :data="tableData" border @row-dblclick="doubleClicked">
            <el-table-column type="index" label="编号" width="50"></el-table-column>
            <el-table-column property="name" label="供应商名称"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:'',                     //搜索内容
            tableData:this.$store.state.reportQuerierStore.unitOneTableData,                   //表格数据
        }
    },
    watch:{
        content(newVal) {    //查询
            if(!newVal) {
                this.tableData = this.$store.state.reportQuerierStore.unitOneTableData;
            }
        },
    },
    methods:{
        onSubmit(){                         //搜索按钮
            if(this.content) {
                let arr = this.$store.state.reportQuerierStore.unitOneTableData,
                    newArr = [],
                    reg = new RegExp(this.content, 'g');                    
                arr.forEach(item => {
                    let toNamePinyin = item['toNamePinyin'],
                        name = item['name'],
                        toSimplePinyin = item['toSimplePinyin'];
                    if((toNamePinyin && reg.test(toNamePinyin)) || (name && reg.test(name)) || (toSimplePinyin && reg.test(toSimplePinyin))
                    ) {
                        newArr.push(item);
                    }
                });
                this.tableData = newArr;     //如果查到结果，就更新表格数据         
            }
        },
        doubleClicked(data){                //双击当前行     
            this.$store.commit('reportQuerierStore/updateBetName', [data]);
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        }
    },
    created(){
        this.$store.dispatch('reportQuerierStore/getUnitTwo', this.$url + 'reportForms/searchSupplier');        
    }
}
</script>

<style lang="less">
    .withUnitTwo .el-input__inner{padding:7px 15px !important;}
    .withUnitTwo .el-button {padding:8px 16px !important;margin-left:10px}
</style>


<style scoped lang="less">
    .withUnitTwo {
        background-color: #fff;
        padding:10px 10px;
        padding-bottom:0px;
        height:100%;
        box-sizing: border-box;
        overflow: hidden;
        .el-table {height: calc(100% - 52px) !important;overflow-y: auto;margin-top:10px;}
        .el-input {width: calc(100% - 80px) !important;}
    }
</style>



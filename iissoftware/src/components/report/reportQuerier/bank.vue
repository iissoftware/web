<template>
    <div class="bank"> 
        <el-input v-model="content" class="sousuo-input" placeholder="输入关键字" @keyup.enter.native="onSubmit"></el-input>
        <el-button type="primary" class="sousuo" @click.native="onSubmit">查询</el-button>
        <el-table :data="tableData" border @row-dblclick="doubleClicked">
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="开户行" prop="bankName"></el-table-column>
            <el-table-column label="账号" prop="accountNumber"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:'',                                                         //搜索内容
            tableData:this.$store.state.reportQuerierStore.bankTableData,       //表格数据
        }
    },
    watch:{
        content(newVal) {    //查询
            if(!newVal) {
                this.tableData = this.$store.state.reportQuerierStore.bankTableData;
            }
        },
    },
    methods:{
        doubleClicked(data){                        //双击
            this.$store.commit('reportQuerierStore/updateBank', [data]);
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        },
        onSubmit(){                                 //查询
            if(this.content) {
                let arr = this.$store.state.reportQuerierStore.bankTableData,
                newArr = [],
                reg = new RegExp(this.content, 'g');                    
                arr.forEach(item => {
                    let toNamePinyin = item['toNamePinyin'],
                        name = item['name'],
                        toSimplePinyin = item['toSimplePinyin'],
                        bankName = item['bankName'],
                        accountNumber = item['accountNumber'];
                    if((toNamePinyin && reg.test(toNamePinyin)) || (name && reg.test(name)) || (toSimplePinyin && reg.test(toSimplePinyin))
                        || (bankName && reg.test(bankName)) || (accountNumber && reg.test(accountNumber))) {
                        newArr.push(item);
                    }
                });
                this.tableData = newArr;     //如果查到结果，就更新表格数据         
            }
        }
    },
    created(){
        this.$store.dispatch('reportQuerierStore/getBankData', this.$url + 'borrowingForm/findAuxiliaryInfoBank');
    }
}
</script>

<style lang="less">
    .bank .el-input__inner{padding:7px 15px !important;}
    .bank .el-button {padding:8px 16px !important;margin-left:10px}

</style>


<style scoped lang="less">
    .bank {
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




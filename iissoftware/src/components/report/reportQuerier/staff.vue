<template>
    <div class="staffaa">
        <el-input v-model="content" class="sousuo-input" placeholder="输入关键字" @keyup.enter.native="onSubmit"></el-input>
        <el-button type="primary" class="sousuo" @click.native="onSubmit">查询</el-button>
        <el-table :data="tableData" border @row-dblclick="doubleClicked">
            <el-table-column type="index" label="编号" width="50"></el-table-column>
            <el-table-column property="userName" label="用户名"></el-table-column>
            <el-table-column property="name" label="姓名" ></el-table-column>
            <el-table-column property="phone" label="电话" ></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:'',
            systemId:this.$store.state.systemId,                                //系统参数id
            tableData:this.$store.state.reportQuerierStore.staffTableData,      //表格数据

        }
    },
    watch:{
        content(newVal) {    //查询
            if(!newVal) {
                this.tableData = this.$store.state.reportQuerierStore.staffTableData;
            }
        },
    },
    methods:{
        onSubmit(){                                 //查询按钮
            if(this.content) {
                let arr = this.$store.state.reportQuerierStore.searchData,
                    newArr = [],
                    reg = new RegExp(this.content, 'g');                    
                arr.forEach(item => {
                    let toNamePinyin = item['toNamePinyin'],
                        name = item['name'],
                        toSimplePinyin = item['toSimplePinyin'],
                        toUserNamePinyin = item['toUserNamePinyin'],
                        toSimpleUsernamePinyin = item['toSimpleUsernamePinyin'],
                        userName = item['userName'];
                    if((toNamePinyin && reg.test(toNamePinyin)) || (name && reg.test(name)) || (toSimplePinyin && reg.test(toSimplePinyin))
                        || (toUserNamePinyin && reg.test(toUserNamePinyin)) || (toSimpleUsernamePinyin && reg.test(toSimpleUsernamePinyin)) || (userName && reg.test(userName)) 
                    ) {
                        newArr.push(item);
                    }
                });
                this.tableData = newArr;     //如果查到结果，就更新表格数据         
            }
        },
        doubleClicked(data){                            //双击当前行     
            this.$store.commit('reportQuerierStore/updateStaff', [data]);
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        }
    },
    created(){
        this.$store.dispatch('reportQuerierStore/getStaffData', this.$url + 'reportForms/searchEmployeeBydeptId?id=0' + '&systemId=' + this.$store.state.systemId);    //根据当前部门id查询该部门下的职员数据
        this.$store.dispatch('reportQuerierStore/getSearch',this.$url + 'employee/selectEmployeeByName')
    }
}
</script>

<style lang="less">
    .staffaa .el-input__inner{padding:7px 15px !important;}
    .staffaa .el-button {padding:8px 16px !important;margin-left:10px}

</style>


<style scoped lang="less">
    .staffaa {
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

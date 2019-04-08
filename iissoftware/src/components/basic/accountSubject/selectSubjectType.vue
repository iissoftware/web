<template>
    <div class="subjectType">
        <div class="block-area">
            <div class="table">
                <el-table :data="tableData" border style="width: 100%" highlight-current-row @row-click="rowClick" @row-dblclick="dbRowClick">
                    <el-table-column label="类别代码" type="index" width="100" :index="indexMethod"></el-table-column>
                    <el-table-column label="类别名称" property="name"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="el-btn-group">
            <el-button size="small" type="primary" @click="save">确定</el-button>  
            <el-button size="small" type="danger" @click="close">关闭</el-button>  
        </div>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-22
 * Description: 核算项目类别组件
*/
export default {
    data() {
        return {
            tableData: [],
            currentRow: {},     //当前单击选中的行
        }
    },
    methods: {
        getData() {         //获取表格数据（数据来源于核算项目）
            this.$http.get(this.$url + 'accountItem/select').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.tableData = res.data.data[0]['accountItems'];
                    }
                }
            });
        },
        rowClick(row) {        //单击
            this.currentRow = row;
        },
        dbRowClick(row) {      //双击
            this.$store.commit('subjectStore/updateObjectList', row);
            this.close();
        },
        indexMethod(index) {
            return '00' + (index + 1);
        },
        save() {        //确定
            this.$store.commit('subjectStore/updateObjectList', this.currentRow);
            this.close();
        },
        close() {
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    },
    created() {
        this.getData();
    }
}
</script>
<style>
    .subjectType .el-table__body-wrapper {height: calc(100% - 42px) !important;overflow-y: auto !important;}
</style>
<style scoped>
    .subjectType {height: 100% !important;overflow: hidden !important;}
    .block-area {height: calc(100% - 42px) !important;}
    .el-btn-group {padding-top: 10px !important;text-align: right !important;}
</style>
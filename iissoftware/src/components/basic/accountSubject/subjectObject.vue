<template>
    <div class="subjectObject">
        <div class="block-area">
            <div class="table">
                <el-table :data="tableData" highlight-current-row @row-click="rowClick">
                    <el-table-column label="类别代码" type="index" width="100" :index="indexMethod"></el-table-column>
                    <el-table-column property="name" label="类别名称"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="el-btn-group">
            <el-button type="primary" size="small" @click="add">增加</el-button>
            <el-button type="success" size="small">保存</el-button>
            <el-button type="warning" size="small" @click="del">删除</el-button>
            <el-button type="danger" size="small" @click="close">关闭</el-button>
        </div>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-22
 * Description: 往来对象组件
*/
export default {
    data() {
        return {
            tableData: this.$store.state.subjectStore.objectList,
            currentRow: {},
            betweenObject: this.$store.state.subjectStore.betweenObject,      //往来科目
        }
    },
    methods: {
        rowClick(row) {
            this.currentRow = row;
        },
        add() {         //新增
            let betweenObject = this.$store.state.subjectStore.betweenObject;
            if(betweenObject) {
                this.$util.openSubLayerIframe('选择核算项目类别', 13, '600px', '400px', this.$domain + '/#/accountSubject/selectSubjectType');
            } else {
                this.$alert('只有往来科目才存在往来对象！');
            }
        },
        del() {         //删除
            if(this.currentRow['id']) {
                this.$store.commit('subjectStore/deleteSubjectTypeById', this.currentRow['id']);          //删除指定id往来对象数据
                this.currentRow = {};
            } else {
                this.$store.commit('subjectStore/deleteSubjectTypeById');          //删除往来独享数据的第0个元素
            }
        },
        indexMethod(index) {
            return '00' + (index + 1);
        },
        close() {       //关闭
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    }
}
</script>
<style>
    .subjectObject .el-table__body-wrapper {height: calc(100% - 42px) !important;overflow-y: auto !important;}
</style>
<style scoped>
    .subjectObject {height: 100% !important;overflow: hidden !important;}
    .block-area {height: calc(100% - 42px) !important;}
    .el-btn-group {padding-top: 10px !important;text-align: right !important;}
</style>


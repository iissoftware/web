<template>
    <div>
        <div class="onlineLog">
            <!-- 按钮组 -->
            <div class="block-area">
                <el-date-picker v-model="startTime" type="date" placeholder="选择开始时间"></el-date-picker>
                <span style="margin: 0 15px;">到</span>
                <el-date-picker v-model="endTime" type="date" placeholder="选择结束时间"></el-date-picker>
                <el-button type="primary" @click="search" class="sousuo">查询</el-button>
                <div class="btn-group">
                    <el-button type="info" @click="refresh">刷新</el-button>
                    <el-button-group class="btn-other">
                        <el-button title="导出" @click="exportExcel">
                            <img src="../../assets/images/export.png" alt="">
                        </el-button>             
                        <el-button title="打印">
                            <img src="../../assets/images/print.png" alt="">
                        </el-button>
                        <el-button title="帮助">
                            <img src="../../assets/images/help.png" alt="">
                        </el-button>
                    </el-button-group>
                </div>
            </div>
            <!-- 表格数据 -->
            <div class="block-area">
                <div class="table">
                    <el-table :data="onlineLogData" border v-loading="loading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" fixed></el-table-column>
                        <el-table-column type="index" label="编号" width="55"></el-table-column>
                        <el-table-column property="name" label="操作员" width="150"></el-table-column>
                        <el-table-column property="bills" label="操作单据"></el-table-column>
                        <el-table-column property="module" label="操作模块"></el-table-column>
                        <el-table-column property="category" label="操作类别"></el-table-column>
                        <el-table-column property="content" label="操作内容"></el-table-column>
                        <el-table-column property="browser" label="浏览器"></el-table-column>
                        <el-table-column property="host" label="机器地址"></el-table-column>
                        <el-table-column property="os" label="客户端"></el-table-column>
                        <el-table-column property="createTime" label="操作时间" width="150"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                startTime: '',                  //开始时间
                endTime: '',                    //结束时间
                sortType: '',                   //排序
                multipleSelection: [],          //选中的行集合
                selectRowId: [],                //选中的行id集合
                onlineLogData: [],              //上机日志数据
            }
        },
        watch: {
            startTime(newVal, oldVal) {
                if(!newVal) {
                    setTimeout(() => {
                        this.getData();
                    }, 500);
                }
            },
            endTime(newVal, oldVal) {
                if(!newVal) {
                    setTimeout(() => {
                        this.getData();
                    }, 500);
                }
            },
        },
        methods: {
            getData() {
                this.$http.get(this.$url + 'openrationLog/selectOpenrationLogforList').then(res => {
                    if(res.data.code == 20001) {
                        setTimeout(() => {
                            this.onlineLogData = res.data.data;
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            },
            search() {                  //日期查询
                if(this.startTime && this.endTime) {            //同时选择了开始和结束时间后再执行查询
                    var startTime = this.$util.formatData(this.startTime);
                    var endTime = this.$util.formatData(this.endTime);
                    this.loading = true;
                    this.$http.get(this.$url + 'openrationLog/selectOpenrationLogByDate?benginTime=' + startTime + '&endTime=' + endTime).then(res => {
                        if(res.data.code === 20001) {
                            setTimeout(() => {
                                this.loading = false;
                                this.onlineLogData = res.data.data;
                            }, 500)
                        } else {
                            this.$message.err(res.data.msg);
                        }
                    }).catch(err => {
                        this.$message.err(err);
                    })
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.selectRowId = [];
                for(var i = 0; i < this.multipleSelection.length; i++) {
                    this.selectRowId.push(this.multipleSelection[i]['id']);
                }
            },
            sortTableData() {           //排序
                this.onlineLogData = this.onlineLogData.reverse();
            },
            refresh() {                 //刷新
                this.getData();
            },
            importExcelSuccess(res) {   //导入成功后回调
                if(res.code === 20001) {
                    this.$message({message: '导入成功', type: 'success'});
                    setTimeout(() => {
                        this.getData();
                    }, 1000);
                }
            },
            exportExcel() {             //导出
                if(this.multipleSelection.length > 0) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        this.selectRowId.push(this.multipleSelection[i]['id']);
                    }
                    var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                    this.$http.get(this.$url + 'openrationLog/export',{params: { list: idSting }}).then(res => {
                        this.$message({message: '导出成功', type: 'success'});
                        window.location.href = this.$url + 'openrationLog/export?list=' + idSting;          //导出时触发
                    }).catch(err => {
                        this.$message.error(err);
                    })
                } else {
                    this.$message({message: '选择你要导出的数据', type: 'warning', duration: 2000});
                }
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>
<style>
    .onlineLog .el-input--prefix.el-input__inner{
        height:32px; line-height:32px;
    }
    .onlineLog .el-input--suffix .el-input__inner{
        height:32px; line-height:32px;
    }
    .onlineLog .el-input__icon {
        line-height:32px
    }
    .onlineLog .el-table__body-wrapper {height: calc(100% - 41px) !important;overflow: auto !important;}
</style>

<style scoped lang="less">
    .onlineLog{
        min-width:1116px;
        height: 100%;
        overflow: hidden;
    }
    .onlineLog .block-area:nth-of-type(1) {
        min-width: 640px;
        height: auto;
    }
    .onlineLog .block-area:nth-of-type(2) {
        height: calc(100% - 42px) !important;
    }
    @media screen and (max-width: 1250px) {
        .onlineLog .block-area:nth-of-type(1) {
            overflow-x: auto;
            white-space: nowrap;
        }
        .onlineLog .block-area:nth-of-type(1) .el-select,
        .onlineLog .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
        }
        .onlineLog .block-area:nth-of-type(1) .btn-group {
            margin-right: 0;
        }
    }
</style>
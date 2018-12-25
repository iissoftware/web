<template>
    <div id="onlineLog" class="dragBox">
        <div class="top">
            <span>时间选择：</span>
            <el-date-picker v-model="startTime" type="date" placeholder="请选择开始时间" style="width: 170px;" @change="filterDate"></el-date-picker>
            <span style="margin: 0 15px;">到</span>
            <el-date-picker v-model="endTime" type="date" placeholder="请选择结束时间" style="width: 170px;" @change="filterDate"></el-date-picker>
        </div>
        <div class="top table-main">
            <el-select v-model="sortType" placeholder="请选择排序" style="width: 160px;" @change="sortTableData">
                <el-option label="正序" value="0"></el-option>
                <el-option label="倒叙" value="1"></el-option>
            </el-select>
            <div class="btn-group">
                <el-button type="info" @click="refresh">刷新</el-button>
                <el-upload class="upload-demo" :action="$url + 'openrationLog/importExcel'" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
                    <el-button type="primary" style="background-color: #445f90;border-color: #445f90;font-size: 14px;margin: 0 10px;">导入</el-button>
                </el-upload>
                <el-button type="success" @click="exportExcel">导出</el-button>
                <el-button type="danger" @click="printTableData">打印</el-button>
                <el-button type="warning">帮助</el-button>
            </div>
            <!-- 表格数据 -->
            <div class="table">
                <el-table :data="logData" v-loading="loading" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column property="createTime" label="操作时间" width="150"></el-table-column>
                    <el-table-column property="name" label="操作员" width="200"></el-table-column>
                    <el-table-column property="bills" label="操作单据"></el-table-column>
                    <el-table-column property="module" label="操作模块"></el-table-column>
                    <el-table-column property="category" label="操作类别"></el-table-column>
                    <el-table-column property="browser" label="机器名"></el-table-column>
                    <el-table-column property="host" label="机器地址"></el-table-column>
                    <el-table-column property="os" label="客户端"></el-table-column>
                    <el-table-column property="content" label="操作内容"></el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 要打印的表格数据区域 -->
        <div class="printDataBlock" v-if="isShowPrintBlock">
            <el-table :data="printLogData" class="printTable">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="createTime" label="操作时间" width="150"></el-table-column>
                <el-table-column property="name" label="操作员" width="200"></el-table-column>
                <el-table-column property="bills" label="操作单据"></el-table-column>
                <el-table-column property="module" label="操作模块"></el-table-column>
                <el-table-column property="category" label="操作类别"></el-table-column>
                <el-table-column property="browser" label="机器名"></el-table-column>
                <el-table-column property="host" label="机器地址"></el-table-column>
                <el-table-column property="os" label="客户端"></el-table-column>
                <el-table-column property="content" label="操作内容"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            startTime: '',         //开始时间
            endTime: '',         //结束时间
            sortType: '',           //排序
            logData: [          //上机日志数据
                {
                    createTime: '',
                    name: '',
                    bills: '',
                    module: '',
                    category: '',
                    browser: '',
                    host: '',
                    os: '',
                    content: ''
                }
            ],
            printLogData: [
                {
                    createTime: '2018-12-22',
                    name: 'iissoftware',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '游智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                },
                {
                    createTime: '2018-12-22',
                    name: '智宁',
                    bills: '1154254517',
                    module: '系统设置',
                    category: '币别',
                    browser: 'chrome',
                    host: '127.0.0.1',
                    os: 'window客户端',
                    content: '此处省略几百个字...'
                }
            ],
            loading: true,       //是否显示加载中
            selectRowId: [],        //存储选中当前行的id
            multipleSelection: [],      //存储多选数据
            isShowPrintBlock: false,        //是否显示打印区域
        }
    },
    methods: {
        getData() {         //获取上机日志数据
            this.loading = true;
            this.$http.get(this.$url + 'openrationLog/selectOpenrationLogforList').then(res => {
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.logData = res.data.data;
                        this.loading = false;
                        // this.isShowElem = true;
                    }, 200)
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        refresh() {         //刷新
            this.getData();
            this.sortType = '';         //重置排列方式字样
        },
        importExcelSuccess(res) {           //导入成功后回调
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success'});
                setTimeout(() => {
                    this.getData();
                }, 1000);
            }
        },
        exportExcel() {             //导出表格数据
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
                this.$message({message: '请选择你要导出的数据', type: 'warning', duration: 2000});
            }
        },
        printTableData() {              //打印
            this.isShowPrintBlock = true;
            this.printLogData = this.multipleSelection;
            setTimeout(() => {
                window.print();
                setTimeout(() => {
                    this.isShowPrintBlock = false;
                }, 10)
            }, 100)
        },
        sortTableData() {           //排序
            this.logData = this.logData.reverse();
        },
        handleSelectionChange(val) {       //选中当前行
            this.multipleSelection = val;
        },
        filterDate() {          //筛选
            if(this.startTime && this.endTime) {            //同时选择了开始和结束时间后再执行查询
                var startTime = this.formatDate(this.startTime);
                var endTime = this.formatDate(this.endTime);
                this.$http.get(this.$url + 'openrationLog/selectOpenrationLogByDate?benginTime=' + startTime + '&endTime=' + endTime).then(res => {
                    if(res.data.code === 20001) {
                        setTimeout(() => {
                            this.logData = res.data.data;
                        }, 500)
                    } else {
                        this.$message.err(res.data.msg);
                    }
                }).catch(err => {
                    this.$message.err(err);
                })
            }
        },
        formatDate(time) {              //格式化日期 xxxx-xx-xx
            var date = new Date(time),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            return year + '-' + month + '-' + day;
        }
    },
    mounted() {
        this.getData();
    }
}
</script>
<style scoped lang="less">
    #onlineLog {overflow: hidden;}
</style>
<template>
    <div>
        <div class="moneyType">        
            <div class="block-area">
                <!-- 搜索框 -->
                <div class="btn-box">
                    <el-input class="sousuo-input" placeholder="输入搜索内容" v-model.trim="searchText" @keyup.enter.native="search"></el-input>
                    <el-button type="primary" @click="search" class="sousuo">查询</el-button>
                    <div class="btn-group">
                        <el-button type="info" @click="refresh">刷新</el-button>
                        <el-button type="primary" @click="add">新增</el-button>
                        <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                        <el-button type="danger" v-else @click="deleteMoreRow">删除</el-button>
                        <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                        <el-button type="danger" v-else @click="disabedBtn(0, '禁用')">禁用</el-button>
                        <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                        <el-button type="success" v-else @click="disabedBtn(1, '启用')">启用</el-button>
                        <el-button-group class="btn-other">
                            <el-button v-if="multipleSelection.length <= 0" disabled>
                                <img src="../../../assets/images/export.png" alt="">
                            </el-button>
                            <el-button v-else @click="exportExcel" title="导出">
                                <img src="../../../assets/images/export.png" alt="">
                            </el-button>
                            <el-button title="导入">
                                <el-upload class="upload-demo" :action="$url + 'currency/importCurrency'" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
                                    <img src="../../../assets/images/import.png" alt="">
                                </el-upload>
                            </el-button>                        
                            <el-button title="打印" @click="print">
                                <img src="../../../assets/images/print.png" alt="">
                            </el-button>
                            <el-button title="帮助">
                                <img src="../../../assets/images/help.png" alt="">
                            </el-button>
                        </el-button-group>
                    </div>
                </div>
                <!-- 表格数据 -->
                <div class="table" id="tablePrint">
                    <el-table :data="tableData" border highlight-current-row ref="mtd" @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu">
                        <el-table-column type="selection" fixed></el-table-column>
                        <el-table-column type="index" label="编码" width="80"></el-table-column>
                        <el-table-column property="name" label="名称"></el-table-column>
                        <el-table-column property="exchangeRate" label="汇率"></el-table-column>
                        <el-table-column property="convertType" label="折算方式" width="200">
                            <template slot-scope="scope">
                                <span>{{ scope.row.convertType == 1 ? "原币*汇率=本位币" : "原币/汇率=本位币" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="decimals" label="小数位数"></el-table-column>
                        <el-table-column property="fixedExchangeRate" label="汇率类别">
                            <template slot-scope="scope">
                                <span>{{ scope.row.fixedExchangeRate == 1 ? "固定汇率" : "浮动汇率" }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="lock" label="是否可用">
                            <template slot-scope="scope">
                                <span>{{ scope.row.lock == 1 ? '是' : '否' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="state" label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state === 1" style="color: green;">已启用</span>
                                <span v-else style="color: #f00;">已禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="update(scope.row.id)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn" />
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2018-11-26
 * Description: 币别组件
*/
    import MenuBox from '../../MenuBox'
    import addRow from './addRow'
    export default {
        components: {
            'v-menu-box': MenuBox,
            'v-add-row': addRow,
        },
        data() {
            let validateIsNum = (rule, value, callback) => {        //验证是否是一个数字
                if(!/^[0-9]+.?[0-9]*$/.test(value)) {
                    return callback(new Error('只能输入数字！'));
                }
                callback();
            }
            return {
                searchText: '',     //搜索文本
                sortType: '',       //排序类型
                multipleSelection: [],          //选中的行数据集合
                selectRowId: [],            //选中的行数据id集合
                tableData: this.$store.state.moneyTypeStore.tableData,         //币别数据列表
                rightMenu: {
                    isShowIconMove: false,      //是否显示上移、下移、置顶、置底 弹窗
                    rightKeyRow: {},        //右键点击存储的行
                    rightKeyRowIndex: '',       //右键点击表格行的索引
                },
                searchResultData: [],       //搜索的所有数据
            }
        },
        watch: {
            searchText(newVal) {
                if(!newVal) {
                    this.tableData = this.$store.state.moneyTypeStore.tableData;
                }
            }
        },
        methods: {
            emitFn(n) {         //响应子组件传过来的函数
                switch(n) {
                    case 1:         //刷新
                        this.refresh();
                        break;
                    case 2:         //新增
                        this.add();
                        break;
                    case 3:         //修改
                        this.update(this.rightMenu['rightKeyRow']['id']);
                        break;
                    case 4:         //删除
                        this.deleteSingleRow(this.rightMenu['rightKeyRow']['id']);
                        break;
                    case 5:         //禁用
                        this.disabedBtnOneList(0, '禁用', this.rightMenu['rightKeyRow']);
                        break;
                    case 6:         //启用
                        this.disabedBtnOneList(1, '启用', this.rightMenu['rightKeyRow']);
                        break;
                    case 8:         //上移
                        this.tableMove(n, this.tableData);
                        break;
                    case 9:         //下移
                        this.tableMove(n, this.tableData);
                        break;
                    case 10:         //置顶
                        this.tableMove(n, this.tableData);
                        break;
                    case 11:        //置底
                        this.tableMove(n, this.tableData);
                        break;
                    default: break;
                }
            },
            rowContextmenu(row, event) {           //某一行右键点击时触发
                event.preventDefault();     //禁止默认事件
                this.rightMenu['isShowIconMove'] = true;
                this.rightMenu['rightKeyRow'] = row;
                var menuBox = document.querySelector(".menuBox");
                let x = event.clientX,
                    y = event.clientY,
                    w = $('.moneyType').outerWidth(true) - $(menuBox).outerWidth(true),
                    h = $('.moneyType').outerHeight(true) - $(menuBox).outerHeight(true);
                if(x <= 0) x = 0;
                if(x >= w) x = w;
                if(y <= 0) y = 0;
                if(y >= h) y = h;
                menuBox.style.left = x + 'px';
                menuBox.style.top = y + 'px';
                for(var i = 0; i < this.tableData.length; i++) {
                    if(this.tableData[i]['id'] == row['id']) {
                        this.rightMenu['rightKeyRowIndex'] = i;
                    }
                }
            },
            tableMove(n, data) {
                if(n == 8) {        //上移
                    if(this.rightMenu['rightKeyRowIndex'] > 0) {
                        let row = data.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                        data.splice(this.rightMenu['rightKeyRowIndex'] - 1, 0, row);
                    } else {
                        this.$message.warning('已经是第一个，不可上移');
                    }
                } else if(n == 9) {     //下移
                    if(this.rightMenu['rightKeyRowIndex'] < data.length - 1) {
                        let row = data.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                        data.splice(this.rightMenu['rightKeyRowIndex'] + 1, 0, row);
                    } else {
                        this.$message.warning('已经是最后一个，不可下移');
                    }
                } else if(n == 10) {        //置顶
                    if(this.rightMenu['rightKeyRowIndex'] > 0) {
                        let row = data.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                        data.unshift(row);
                    } else {
                        this.$message.warning('已经是第一个了，不可置顶');
                    }
                } else if(n == 11) {        //置底
                    if(this.rightMenu['rightKeyRowIndex'] < data.length - 1) {
                        let row = data.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                        data.push(row);
                    } else {
                        this.$message.warning('已经是最后一个，不可置底');
                    }
                }
            },
            refresh() {     //刷新
                this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
            },
            search() {      //搜索
                if(this.searchText) {
                    let data = this.searchResultData,
                        newArr = [],
                        reg = new RegExp(this.searchText, 'g');
                    if(data.length > 0) {
                        data.forEach(item => {
                            if((item['name'] && reg.test(item['name'])) || (item['toNamePinyin'] && reg.test(item['toNamePinyin'])) || (item['toSimplePinyin'] && reg.test(item['toSimplePinyin']))) {
                                newArr.push(item);
                            }
                        });
                        this.tableData = newArr;
                    }
                }
            },
            getSearchResult() {         //获取搜索结果
                this.$http.get(this.$url + 'currency/findAllByName').then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.searchResultData = res.data.data;
                        }
                    }
                });
            },
            add() {      //新增币别
                this.$util.openSubLayerIframe('币别-新增', 13, '550px', '400px', this.$domain + '/#/moneyType/add');
            },
            update($id) {           //修改币别
                this.$store.commit('moneyTypeStore/updateRowId', $id);
                this.$util.openSubLayerIframe('币别-修改', 13, '550px', '400px', this.$domain + '/#/moneyType/update');
            },
            disabedBtn(status, msg) {          //禁用、启用
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(status == 0) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == status) {
                            this.$alert('禁用失败，其中包含已禁用选项，重新选择！', '禁用提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                } else if(status == 1) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == status) {
                            this.$alert('启动失败，其中包含已启动选项，重新选择！', '启动提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                }
                this.$http.post(this.$url + 'currency/startOrDisableCurrency?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
                        }, 1000);
                    } else {
                        this.$message.error(this.data.msg);
                    }
                });
            },
            disabedBtnOneList(status, msg, row) {       //禁用单条
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(status == 0) {
                    if(row['state'] == status) {
                        this.$message.error('禁用失败！当前数据已是禁用状态');
                        return false;
                    }
                }
                if(status == 1) {
                    if(row['state'] == status) {
                        this.$message.error('启用失败！当前数据已是启用状态');
                        return false;
                    }
                }
                this.$http.post(this.$url + 'currency/startOrDisableCurrency?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message.success(msg + '成功');
                        setTimeout(() => {
                            this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
                        }, 500);
                    }
                });
            },
            handleSelectionChange(val) {               //选中当前行触发该函数
                this.multipleSelection = val;
                this.selectRowId = [];
                for(var i = 0; i < this.multipleSelection.length; i++) {
                    this.selectRowId.push(this.multipleSelection[i]['id']);
                }
            },
            exportExcel() {     //导出
                if(this.multipleSelection.length > 0) {
                    var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                    this.$http.get(this.$url + 'currency/exportCurrency',{params: { idList: idSting }}).then(res => {
                        this.$message({message: '导出成功', type: 'success'});
                        window.location.href = this.$url + 'currency/exportCurrency?idList=' + idSting;          //导出时触发
                    }).catch(err => {
                        this.$message.error(err);
                    })
                } else {
                    this.$message({message: '选择你要导出的数据', type: 'warning', duration: 2000});
                }
            },
            importExcelSuccess(res) {
                if(res.code === 20001) {        //导入成功后回调该函数
                    this.$message({message: '导入成功', type: 'success'});
                    setTimeout(() => {
                        this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
                    }, 1000);
                }else{
                    this.$message({message: res.msg, type: 'error'});
                }
            },
            deleteSingleRow($id) {      //删除单条明细
                this.$confirm('确定删除该条数据？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    //开始求删除
                    this.$http.post(this.$url + 'currency/deleteCurrency', JSON.stringify([$id]), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '删除成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
                            }, 800);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                });
            },
            deleteMoreRow() {           //删除
                this.$confirm('此操作将永久删除该文件, 是否继续？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    //开始求删除
                    this.$http.post(this.$url + 'currency/deleteCurrency', JSON.stringify(this.selectRowId), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
                            }, 800);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                });
            },
            enterKey(lastRef, nextRef) {		//回车键换行
                if(lastRef.target.value) {
                    this.$refs[nextRef].focus();
                }
            },
            print() {}
        },
        created() {
            this.$store.dispatch('moneyTypeStore/getTableData', this.$url + 'currency/findCurrency');
            this.getSearchResult();
        }
    }
</script>
<style>
    .moneyType .el-table__body-wrapper {height: calc(100% - 48px) !important;overflow-y: auto !important;overflow-x: hidden;}
</style>
<style scoped lang="less">
    .moneyType{
        height: 100%;
        overflow-y: hidden;
        min-width: 900px;
        background: #fff;
        border-radius: 6px;
        .table {
            height: calc(100% - 52px);
        }
        .el-table--fit {height: 100% !important}
    }
    @media screen and (max-width: 1000px) {
        .moneyType .block-area:nth-of-type(1) {
            overflow-x: auto;
            min-width: 0 !important;
            white-space: nowrap;
        }
        .moneyType .block-area:nth-of-type(1) .el-select,
        .moneyType .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
        }
        .moneyType .block-area:nth-of-type(1) .btn-group {
            float: right;
        }
    }
</style>
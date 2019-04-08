<template>
    <div>
        <div class="balanceType">
            <!-- 按钮组 -->
            <div class="block-area">
                <div class="btn-box">
                    <el-input class="sousuo-input" placeholder="输入搜索内容" v-model.trim="searchText" @keyup.enter.native="search"></el-input>
                    <el-button type="primary" @click="search" class="sousuo">查询</el-button>
                    <div class="btn-group">
                        <el-button type="info" @click="refresh">刷新</el-button>
                        <el-button type="primary" @click="addRow">新增</el-button>
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
                                <el-upload class="upload-demo" :action="$url + 'closeAccount/importCloseAccount?systemId=' + this.systemId" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
                                    <img src="../../../assets/images/import.png" alt="">
                                </el-upload>
                            </el-button>                        
                            <el-button title="打印">
                                <img src="../../../assets/images/print.png" alt="">
                            </el-button>
                            <el-button title="帮助">
                                <img src="../../../assets/images/help.png" alt="">
                            </el-button>
                        </el-button-group>
                    </div>
                </div>
                <!-- 表格数据 -->
                <div class="table">
                    <el-table :data="tableData" border @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu">
                        <el-table-column type="selection" fixed></el-table-column>
                        <el-table-column type="index" label="编号" width="80"></el-table-column>
                        <el-table-column property="name" label="名称"></el-table-column>
                        <el-table-column property="remark" label="备注"></el-table-column>
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
                                <el-button type="text" size="small" @click="updateRow(scope.row.id)">修改</el-button>
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
     * Date: 2018-11-27
     * Description: 结算方式组件
    */
    import MenuBox from '../../MenuBox'
    export default {
        components: {
            'v-menu-box': MenuBox
        },
        data() {
            return {
                searchText: '',                     //搜索文本
                sortType: '',                       //排序类型
                multipleSelection: [],              //选中的行数据集合
                selectRowId: [],                    //选中的行数据id集合
                tableData: [],                //结算类别数据列表                                 //新增结算数据  
                systemId: this.$store.state.systemId,
                rightMenu: {
                    isShowIconMove: false,          //是否显示上移、下移、置顶、置底 弹窗
                    rightKeyRow: {},                //右键点击存储的行
                    rightKeyRowIndex: '',           //右键点击表格行的索引
                },
                searchResultData: [],       //搜索的结果
            }
        },
        watch: {
            searchText(newVal) {
                if(!newVal) {
                    this.getData();
                }
            }
        },
        methods: {
            emitFn(n) {                             //响应子组件传过来的函数
                switch(n) {
                    case 1:         //刷新
                        this.refresh();
                        break;
                    case 2:         //新增
                        this.addRow('结算-新增');
                        break;
                    case 3:         //修改
                        this.updateRow(this.rightMenu['rightKeyRow']['id']);
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
                        this.tableMove(n);
                        break;
                    case 9:         //下移
                        this.tableMove(n);
                        break;
                    case 10:         //置顶
                        this.tableMove(n);
                        break;
                    case 11:        //置底
                        this.tableMove(n);
                        break;
                    default: break;
                }
            },
            rowContextmenu(row, event) {            //某一行右键点击时触发
                event.preventDefault();     //禁止默认事件
                this.rightMenu['isShowIconMove'] = true;
                this.rightMenu['rightKeyRow'] = row;
                var menuBox = document.querySelector(".menuBox");
                let x = event.clientX,
                    y = event.clientY,
                    w = $('.balanceType').outerWidth(true) - $(menuBox).outerWidth(true),
                    h = $('.balanceType').outerHeight(true) - $(menuBox).outerHeight(true);
                if(x <= 0) x = 0;
                if(x >= w) x = w;
                if(y <= 0) y = 0;
                if(y >= h) y = h;
                menuBox.style.left = x + 'px';
                menuBox.style.top = y + 'px';
                for(var i = 0; i < this.balanceTypeData.length; i++) {
                    if(this.balanceTypeData[i]['id'] == row['id']) {
                        this.rightMenu['rightKeyRowIndex'] = i;
                    }
                }
            },
            tableMove(n) {
                if(n == 8) {        //上移
                    if(this.rightMenu['rightKeyRowIndex'] > 0) {
                        let row = this.balanceTypeData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                        this.balanceTypeData.splice(this.rightMenu['rightKeyRowIndex'] - 1, 0, row);
                    } else {
                        this.$message.warning('已经是第一个，不可上移');
                    }
                } else if(n == 9) {     //下移
                    if(this.rightMenu['rightKeyRowIndex'] < this.balanceTypeData.length - 1) {
                        let row = this.balanceTypeData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                        this.balanceTypeData.splice(this.rightMenu['rightKeyRowIndex'] + 1, 0, row);
                    } else {
                        this.$message.warning('已经是最后一个，不可下移');
                    }
                } else if(n == 10) {        //置顶
                    if(this.rightMenu['rightKeyRowIndex'] > 0) {
                        let row = this.balanceTypeData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                        this.balanceTypeData.unshift(row);
                    } else {
                        this.$message.warning('已经是第一个了，不可置顶');
                    }
                } else if(n == 11) {        //置底
                    if(this.rightMenu['rightKeyRowIndex'] < this.balanceTypeData.length - 1) {
                        let row = this.balanceTypeData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                        this.balanceTypeData.push(row);
                    } else {
                        this.$message.warning('已经是最后一个，不可置底');
                    }
                }
            },
            getData() {
                if(this.systemId) {
                    this.$http.get(this.$url + 'closeAccount/findCloseAccount?systemId=' + this.systemId).then(res => {
                        if(res.data.code == 20001) {
                            if(res.data.data) {
                                this.tableData = res.data.data.reverse();
                            }
                        }
                    });
                }
            },
            getSearchResultData() {         //获取搜索的结果
                this.$http.get(this.$url + 'closeAccount/findAllByName').then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.searchResultData = res.data.data;
                        }
                    }
                })
            },
            refresh() {                             //刷新
                this.getData();
            },
            sortTableData() {                       //排序
                this.balanceTypeData = this.balanceTypeData.reverse();
            },
            search() {                              //搜索
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
            addRow() {                    //新增、修改币别
                this.$util.openSubLayerIframe('结算方式-新增', 13, '500px', '350px', this.$domain + '/#/balanceType/add');
                parent.getData = this.getData;          //新增时把刷新的方法挂载在window上
            },
            updateRow($id) {
                this.$util.openSubLayerIframe('结算方式-修改', 13, '500px', '350px', this.$domain + '/#/balanceType/update');
                parent.getData = this.getData;          //新增时把刷新的方法挂载在window上
                parent.idArr = [$id];
                parent.obj = {
                    balanceTypeData: this.tableData,
                    rowId: $id
                }
            },
            disabedBtn(status, msg) {               //禁用、启用
                if(this.multipleSelection.length > 0) {
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
                    this.$http.post(this.$url + 'closeAccount/startOrDisableCurrency?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: msg + '成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.getData();
                            }, 1000);
                        } else {
                            this.$message.error(this.data.msg);
                        }
                    });
                    
                } else {
                    this.$message({message: '选择你要'+ msg +'的数据', type: 'warning'});
                }
            },
            disabedBtnOneList(status, msg, row) {   //禁用单条
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
                this.$http.post(this.$url + 'closeAccount/startOrDisableCurrency?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message.success(msg + '成功');
                        setTimeout(() => {
                            this.getData();
                        }, 500);
                    }
                });
            },
            handleSelectionChange(val) {            //选中当前行触发该函数
                this.multipleSelection = val;
                this.selectRowId = [];
                for(var i = 0; i < this.multipleSelection.length; i++) {
                    this.selectRowId.push(this.multipleSelection[i]['id']);
                }
            },
            exportExcel() {                         //导出
                if(this.multipleSelection.length > 0) {
                    var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                    this.$http.get(this.$url + 'closeAccount/exportCloseAccount',{params: { idList: idSting }}).then(res => {
                        this.$message({message: '导出成功', type: 'success'});
                        window.location.href = this.$url + 'closeAccount/exportCloseAccount?idList=' + idSting;          //导出时触发
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
                        this.getData();
                    }, 1000);
                } else {
                    this.$message.error(res.msg);
                }
            },
            deleteMoreRow() {                       //删除
                if(this.multipleSelection.length > 0) {
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
                        this.$http.post(this.$url + 'closeAccount/deleteCloseAccount', JSON.stringify(this.selectRowId), type).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                                setTimeout(() => {
                                    this.getData();
                                }, 800);
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }).catch(err => {
                            this.$message.error(err);
                        })
                    });
                } else {
                    this.$message({message: '选择你要删除的数据', type: 'warning'});
                }
            },
            deleteSingleRow($id) {                  //删除单条明细
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
                    this.$http.post(this.$url + 'closeAccount/deleteCloseAccount', JSON.stringify([$id]), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.getData();
                            }, 800);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                });
            }
        },
        created() {
            this.getData();
            this.getSearchResultData();
        }
    }
</script>
<style>
    .balanceType .el-table__body-wrapper {height: calc(100% - 41px) !important;overflow-y: auto !important;overflow-x: hidden;}
    .balanceType .el-form-item__content .el-button {padding: 8px 10px !important;}
</style>

<style scoped lang="less">
    .balanceType {height: 100%;overflow: hidden;min-width: 900px;background-color: #fff;border-radius: 6px}
    .balanceType .table {height: calc(100% - 42px);}
    .addRowBlock, .updateRowBlock, .LookBlock {height: 260px;padding-top: 20px;}
    .balanceType .block-area:nth-of-type(1) {
        min-width: 880px;
        height: calc(100% - 10px) !important;
    }
    @media screen and (max-width: 1250px) {
        .balanceType .block-area:nth-of-type(1) {
            overflow-x: auto;
            white-space: nowrap;
        }
        .balanceType .block-area:nth-of-type(1) .el-select,
        .balanceType .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
        }
        .balanceType .block-area:nth-of-type(1) .btn-group {
            margin-right: 0;
            float: right;
        }
    }
</style>
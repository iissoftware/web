<template>
    <div>
        <div class="customer">
            <div class="tree-left">
                <v-tree/>
            </div>
            <div class="tree-right">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input class="sousuo-input" v-model="searchText" placeholder="输入搜索内容" @keyup.enter.native="search"></el-input>
                        <el-button class="sousuo" type="primary" @click.native="search">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info" @click="refreshRow">刷新</el-button>
                            <el-button type="primary" @click="addRow">新增</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                            <el-button type="danger" v-else @click="deleteRow">删除</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="disabedBtn(0, '禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="disabedBtn(1, '启用')">启用</el-button>
                            <el-button-group class="btn-other">
                                <el-button title="导出" @click="exportExcel">
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button title="导入">
                                    <el-upload class="upload-demo" :action="$url + 'client/importClient?systemId=' + this.$store.state.systemId" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
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
                        <el-table :data="customerRow" border @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu">
                            <el-table-column type="selection" fixed></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column property="name" label="名称"></el-table-column>
                            <el-table-column property="mnemonicCode" label="助记码"></el-table-column>
                            <el-table-column property="address" label="地址"></el-table-column>
                            <el-table-column property="locationName" label="区域"></el-table-column>
                            <el-table-column property="tradeName" label="行业"></el-table-column>
                            <el-table-column property="state" label="状态">
                                <template slot-scope="scope">
                                    <span style="color: green;" v-if="scope.row.state == 1">已启用</span>
                                    <span style="color: red;" v-else>已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="readerRow(scope.row.id)">查看</el-button>
                                    <el-button type="text" size="small" @click="updateRow(scope.row.id)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <v-drag :elem="['.tree-left', '.tree-right', '.customer']" />
        </div>
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn" />
    </div>
</template>
<script>
/**
 * Author: 赵巧芳
 * Date: 2019-2-18
 * Description: 客户资料
*/
import Tree from './tree'
import MenuBox from '../../MenuBox'
import Drag from '../../drag'
export default {
    components: {
        'v-menu-box': MenuBox,
        'v-tree': Tree,
        'v-drag': Drag
    },
    watch: {
        filterText(val) {           //监听分管部门搜索框
            this.$refs.tree2.filter(val);
        },

    },
    data() {
        return {
            customerRow: this.$store.state.customerStore.tableData,            //右侧表格数据
            multipleSelection: [],      //选中的行集合
            searchText: '',             //搜索内容
            selectRowId: [],            //表格选中当前行的id
            sortTypeData: '',
            rightMenu: {
                isShowIconMove: false,  //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},        //右键点击存储的行
                rightKeyRowIndex: '',   //右键点击表格行的索引
            },
            dfExpKey: [],               //第一个数节点id
            checkData: {},              //存储点击左侧树形节点的数据
            showId: '',                 //如果有这个id则显示修改页面，如果没有则显示新增页面
            lightId:[],                 //高亮
        }
    },
    watch: {
        //监听搜索框内容
        searchText(newVal) {
            if(!newVal) {
                this.customerRow = this.$store.state.customerStore.tableData;
            }
        },
    },
    methods: {
        emitFn(n) {                            //响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refreshRow();
                    break;
                case 2:         //新增
                    this.addRow('');
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
        rowContextmenu(row, event) {           //某一行右键点击时触发
            event.preventDefault();     //禁止默认事件
            this.rightMenu['isShowIconMove'] = true;
            this.rightMenu['rightKeyRow'] = row;
            var menuBox = document.querySelector(".menuBox");
            let x = event.clientX,
                y = event.clientY,
                w = $('.customer').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('.customer').outerHeight(true) - $(menuBox).outerHeight(true);
            if(x <= 0) x = 0;
            if(x >= w) x = w;
            if(y <= 0) y = 0;
            if(y >= h) y = h;
            menuBox.style.left = x + 'px';
            menuBox.style.top = y + 'px';
            for(var i = 0; i < this.customerRow.length; i++) {
                if(this.customerRow[i]['id'] == row['id']) {
                    this.rightMenu['rightKeyRowIndex'] = i;
                }
            }
        },
        tableMove(n) {
            if(n == 8) {        //上移
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.customerRow.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.customerRow.splice(this.rightMenu['rightKeyRowIndex'] - 1, 0, row);
                } else {
                    this.$message.warning('已经是第一个，不可上移');
                }
            } else if(n == 9) {     //下移
                if(this.rightMenu['rightKeyRowIndex'] < this.customerRow.length - 1) {
                    let row = this.customerRow.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.customerRow.splice(this.rightMenu['rightKeyRowIndex'] + 1, 0, row);
                } else {
                    this.$message.warning('已经是最后一个，不可下移');
                }
            } else if(n == 10) {        //置顶
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.customerRow.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.customerRow.unshift(row);
                } else {
                    this.$message.warning('已经是第一个了，不可置顶');
                }
            } else if(n == 11) {        //置底
                if(this.rightMenu['rightKeyRowIndex'] < this.customerRow.length - 1) {
                    let row = this.customerRow.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.customerRow.push(row);
                } else {
                    this.$message.warning('已经是最后一个，不可置底');
                }
            }
        },
        handleSelectionChange(val) {            //点击表格选中触发
            this.multipleSelection = val;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        addRow(){                               //新增弹窗
            this.$util.openSubLayerIframe('客户资料-新增', 13, '40%', '400px', this.$domain + '/#/customer/add');
        },
        updateRow($id){                         //修改弹窗
            this.$store.commit('customerStore/updateRowId', $id);
            this.$util.openSubLayerIframe('客户资料-修改', 13, '40%', '400px', this.$domain + '/#/customer/update');
        },
        deleteRow() {                           //批量删除数据
            if(this.multipleSelection.length > 0) {
                this.$confirm('确定删除该条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var type = {
                        headers: {
                            'Content-type': 'application/json;charset=UTF-8'
                        }
                    }
                    this.$http.post(this.$url + 'client/deleteClient', JSON.stringify(this.selectRowId), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '删除成功', type: 'success', duration: 2000});
                            this.$store.dispatch('customerStore/getSearch',this.$url + 'client/fuzzySearch')
                            setTimeout(() => {
                               this.$store.dispatch('customerStore/getTreeData', this.$url + 'client/findAccountItemByName?name=客户大类&systemId=' + this.$store.state.systemId);
                            }, 500);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                })
            } else {
                this.$message({message: '请先选择你要删除的数据', type: 'warning'});
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
                this.$http.post(this.$url + 'client/deleteClient', JSON.stringify([$id]), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                        this.$store.dispatch('customerStore/getSearch',this.$url + 'client/fuzzySearch')
                        setTimeout(() => {
                            this.refreshRow();
                        }, 800);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            });
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
                this.$http.post(this.$url + 'client/startOrDisableClient?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.refreshRow();
                        }, 1000);
                    } else {
                        // this.$message.error(this.data.msg);
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
            this.$http.post(this.$url + 'client/startOrDisableClient?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message.success(msg + '成功');
                    setTimeout(() => {
                        this.refreshRow();
                    }, 500);
                }
            });
        },
        exportExcel() {                         //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'client/exportClient',{params: { idList: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'client/exportClient?idList=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 2000});
            }
        },
        importExcelSuccess(res){                //导入
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success'});
                setTimeout(() => {
                    this.refreshRow();
                }, 1000);
            }else{
                this.$message.error(res.msg);
            }
        },
        readerRow($id){                          //查看弹窗
            this.$store.commit('customerStore/updateRowId', $id);
            this.$util.openSubLayerIframe('客户资料-查看', 13, '40%', '400px', this.$domain + '/#/customer/reader');
        },
        refreshRow(){                           //刷新
            this.$store.dispatch('customerStore/getTreeData', this.$url + 'client/findAccountItemByName?name=客户大类&systemId=' + this.$store.state.systemId);
        },
        search(){                               //搜索
            if(this.searchText) {
                let newArr = [],
                    data = this.$store.state.customerStore.searchData,
                    searchText = this.searchText;
                let reg = new RegExp(this.searchText, "g");
                data.forEach(item => {
                    if((reg.test(item['name']) || item['toNamePinyin'] && reg.test(item['toNamePinyin'])) || (item['toSimplePinyin'] && reg.test(item['toSimplePinyin']))) {
                        newArr.push(item);
                    }
                });
                this.customerRow = newArr;
            }
        },
    },
    mounted() {
        this.$store.dispatch('customerStore/getSearch',this.$url + 'client/fuzzySearch')
    }
}
</script>
<style lang="less">
    .tree-left {
        height: 100%;
        width: 200px;
        background-color: #fff;
        padding: 15px 0;
        box-sizing: border-box;
        border-radius: 6px;
        float: left;
        .tree-left-title {
            padding: 0 15px 15px 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
            font-size: 15px;
            margin-bottom: 10px;
        }
        .el-tree {
            height: calc(100% - 46px) !important;
            overflow: auto !important;
        }
    }
    .tree-right {
        height: 100%;
        width: calc(100% - 215px);
        overflow: hidden;
        float: right;
    }
    .customer .table { height: calc(100% - 42px) !important;}
    .customer .table .el-table__body-wrapper {overflow-y: auto !important; height: calc(100% - 41px) !important;}
    .customer .el-select-dropdown__wrap{max-height: 240px !important;}
</style>
<style lang="less" scoped>
    .customer{height: 100%;overflow:hidden;min-width: 950px;}
    .addUpdateRow {
        height: 350px;
        overflow-y: auto;
    }
    .readerRow {
        height: 350px;
        overflow-y: auto;
    }
    .tree-right .block-area {min-width: 1000px;}
</style>

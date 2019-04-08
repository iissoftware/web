<template>
    <div>
        <div class="accountProject">
            <!-- 左侧树形结构 -->
            <div class="tree-left">
                <v-tree/>
            </div>
            <div class="tree-right">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input v-model="searchText" placeholder="输入搜索内容" class="sousuo-input" @keyup.enter.native="search"></el-input>
                        <el-button type="primary" class="sousuo" @click="search">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info" @click="refresh">刷新</el-button>
                            <el-button type="primary" @click="addRow">新增</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                            <el-button class="orange" v-else @click="deleteRow">删除</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="isDisabled(0, '禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="isDisabled(1, '启用')">启用</el-button>
                            <el-button-group class="btn-other">
                                <el-button v-if="multipleSelection.length <= 0" disabled>
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button @click="exportExcel" title="导出" v-else>
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button title="导入" @click="$message.warning('选择你要导入的核算项目目录')" v-if="$store.state.accountProjectStore.currentRow.length <= 0" disabled>
                                    <img src="../../../assets/images/import.png" alt="">
                                </el-button>
                                <el-button title="导入" v-else>
                                    <el-upload class="upload-demo" :action="$url + 'accountItem/import?superiorId=' + $store.state.accountProjectStore.currentNodeId" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
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
                            <el-table-column property="remakes" label="备注"></el-table-column>
                            <el-table-column property="state" label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.state === 1" style="color: green;">已启用</span>
                                    <span v-if="scope.row.state === 0" style="color: #f00;">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="updateRow(scope.row.id)">修改</el-button>                                   
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn" />
    </div>
</template>
<script>
/**
 * Author: 赵巧芬
 * Date: 2018-11-29
 * Description: 核算项目组件
 * accountProjectStore
*/
import Tree from './tree'
import MenuBox from '../../MenuBox'
export default {
    components: {
        'v-tree': Tree,
        'v-menu-box': MenuBox
    },
    data() {
        return {
            searchText: '',
            userName: '',
            handId: '',
            multipleSelection: [],
            selectRowId: [],        //存储选中当前行的id
            tableData: this.$store.state.accountProjectStore.tableData,
            dataList: [],                        //树形表格list数据
            rightMenu: {
                isShowIconMove: false,  //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},        //右键点击存储的行
                rightKeyRowIndex: '',   //右键点击表格行的索引
            },
        }
    },
    watch: {
        searchText(newVal) {
            if(!newVal) {
                this.tableData = this.$store.state.accountProjectStore.tableData;
            }
        },
    },
    methods: {
        emitFn(n) {                                 //响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refresh();
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
        rowContextmenu(row, event) {            //某一行右键点击时触发
            event.preventDefault();     //禁止默认事件
            this.rightMenu['isShowIconMove'] = true;
            this.rightMenu['rightKeyRow'] = row;
            var menuBox = document.querySelector(".menuBox");
            let x = event.clientX,
                y = event.clientY,
                w = $('.accountProject').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('.accountProject').outerHeight(true) - $(menuBox).outerHeight(true);
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
        tableMove(n) {
            if(n == 8) {        //上移
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.tableData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.tableData.splice(this.rightMenu['rightKeyRowIndex'] - 1, 0, row);
                } else {
                    this.$message.warning('已经是第一个，不可上移');
                }
            } else if(n == 9) {     //下移
                if(this.rightMenu['rightKeyRowIndex'] < this.tableData.length - 1) {
                    let row = this.tableData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.tableData.splice(this.rightMenu['rightKeyRowIndex'] + 1, 0, row);
                } else {
                    this.$message.warning('已经是最后一个，不可下移');
                }
            } else if(n == 10) {        //置顶
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.tableData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.tableData.unshift(row);
                } else {
                    this.$message.warning('已经是第一个了，不可置顶');
                }
            } else if(n == 11) {        //置底
                if(this.rightMenu['rightKeyRowIndex'] < this.tableData.length - 1) {
                    let row = this.tableData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.tableData.push(row);
                } else {
                    this.$message.warning('已经是最后一个，不可置底');
                }
            }
        },
        handleSelectionChange(row) {            //点击表格选中触发
            this.multipleSelection = row;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        addRow() {                              //新增
            let that = this;
            parent.layer.open({
                type: 2,
                title: '核算项目-新增',
                shade: 0.3,
                shadeClose: true,
                zIndex: 13,
                maxmin: true,
                anim: 0,
                fixed: true,
                btn: ['确定'],
                area: ['600px', '420px'],
                content: this.$domain + '/#/accountProject/add',
                success: function() {
                    $(':focus').blur();
                },
                end: function() {
                    that.$store.commit('accountProjectStore/clearLastType');
                }
            });
        },
        updateRow($id) {                        //修改
            parent.layer.open({
                type: 2,
                title: '核算项目-修改',
                shade: 0.3,
                shadeClose: true,
                zIndex: 13,
                maxmin: true,
                anim: 0,
                fixed: true,
                btn: ['确定'],
                area: ['600px', '420px'],
                content: this.$domain + '/#/accountProject/update',
                success: function() {
                    $(':focus').blur();
                },
                end: function() {
                    
                }
            });
            this.$store.commit('accountProjectStore/updateRowId', $id);
        },
        deleteRow() {                           //删除
            if(this.multipleSelection.length > 0) {
                this.$confirm('此操作将永久删除该文件, 是否继续？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res => {
                    this.$http.delete(this.$url + 'accountItem/delete', {data: this.selectRowId}).then(res => {
                        if(res.data.code == 20001) {
                            this.$store.dispatch('accountProjectStore/getSearch',this.$url + 'accountItem/select')
                            this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
                            }, 500);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                });
            } else {
                this.$message({message: '选择你要删除的数据', type: 'warning', duration: 1000});
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
                this.$http.delete(this.$url + 'accountItem/delete', {data: [$id]}).then(res => {
                    if(res.data.code == 20001) {
                        this.$store.dispatch('accountProjectStore/getSearch',this.$url + 'accountItem/select')
                        this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            });
        },
        refresh() {                             //刷新
            this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
        },
        exportExcel() {                         //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'accountItem/export',{params: { idStrs: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'accountItem/export?idStrs=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            }
        },
        importExcelSuccess(res) {               //导入成功后触发
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success'});
                setTimeout(() => {
                    this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
                }, 1000);
            }
        },
        isDisabled(status, msg) {               //禁用、启用
            if(this.multipleSelection.length > 0) {
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(status == 0) {       //禁用
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
                this.$http.post(this.$url + 'accountItem/updateSate?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
                        }, 500);
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
            this.$http.post(this.$url + 'accountItem/updateSate?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 2000});
                    setTimeout(() => {
                        this.$store.dispatch('accountProjectStore/getTreeData', this.$url +'accountItem/select');
                    }, 500);
                } else {
                    this.$message.error(this.data.msg);
                }
            });
        },
        dataLists(arrs){                        //将树形表格数据转换成list格式
            if(arrs.length > 0) {
                arrs.forEach(item => {
                    this.dataList.push(item);
                    let accountItems = item['accountItems'];
                    if(accountItems && accountItems.length > 0) {
                        this.dataLists(accountItems)
                    }
                });
            }
        },
        search(){                               //搜索
            if(this.searchText) {
                this.dataList = []
                this.dataLists(this.$store.state.accountProjectStore.searchData);
                let newArr = [];
                let reg = new RegExp(this.searchText, "g");
                this.dataList.forEach(item => {
                    if(reg.test(item['name']) || reg.test(item['remakes']) || reg.test(item['mnemonicCode']) || reg.test(item['superiorName']) || (reg.test(item['mnemonicCodeToPinYin'])) || (item['nameToPinYin'] && reg.test(item['nameToPinYin'])) || (item['remakesToPinYin'] && reg.test(item['remakesToPinYin'])) || (item['superiorNameToPinyin'] && reg.test(item['superiorNameToPinyin']))) {
                        newArr.push(item);
                    }
                });
                this.tableData = newArr;
            }
        }
    },
    mounted(){
        this.$store.dispatch('accountProjectStore/getSearch',this.$url + 'accountItem/select')
    }
}
</script>
<style lang='less'>
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
    .accountProject .table { height: calc(100% - 42px) !important;}
    .accountProject .table .el-table__body-wrapper {overflow-y: auto !important; height: calc(100% - 41px) !important;}
    .accountProject .el-select-dropdown__wrap{max-height: 240px !important;}
</style>
<style scoped lang="less">
    .accountProject{height: 100%;overflow:hidden;min-width: 950px;}
    @media screen and (max-width: 1160px) {
        .accountProject .block-area .sousuo-input {width: 140px !important;}
    }
    @media screen and (max-width: 1250px) {
        .tree-right .block-area:nth-of-type(1) {
            overflow-x: auto;
            min-width: 0 !important;
            white-space: nowrap;
        }
        .accountProject .block-area:nth-of-type(1) .el-select,
        .accountProject .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
        }
        .accountProject .block-area:nth-of-type(1) .btn-group {
            margin-right: 0;
        }
    }
</style>



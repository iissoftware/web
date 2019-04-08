<template>
    <div class="front">
        <div class="secondary2">
            <div class="tree-left">
                <div class="tree-left-title">辅助资料明细</div>
                <ul class="list">
                    <li v-for="(item,index) in treeData2" :class="item['id'] == nodeId ? 'active' : ''" :key="item['id']" @click="nodeClick(item)">{{ item['categoryName'] }}</li>
                </ul>
            </div>
            <div class="tree-right">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input v-model="searchText" placeholder="输入搜索内容" class="sousuo-input"></el-input>
                        <el-button type="primary" class="sousuo">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info">刷新</el-button>
                            <el-button type="primary" @click="add">新增</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                            <el-button type="danger" v-else @click="del">删除</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="disabedBtn(0, '禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="disabedBtn(1, '启用')">启用</el-button>
                            <el-button-group class="btn-other">
                                <el-button title="导出">
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button title="导入">
                                    <img src="../../../assets/images/import.png" alt="">
                                </el-button>                        
                                <el-button title="打印" disabled>
                                    <img src="../../../assets/images/print.png" alt="">
                                </el-button>
                                <el-button title="帮助">
                                    <img src="../../../assets/images/help.png" alt="">
                                </el-button>
                            </el-button-group>
                        </div>
                    </div>
                    <div class="table">
                        <!-- 车牌号码 -->
                        <el-table :data="tableData" border :key="0" ref="multipleTable" style="width: 100%" v-show="row[0] && row[0]['dataCategoryId'] == 0" @selection-change="selectionChange" @row-contextmenu="rowContextmenu">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column label="车牌号码" prop="carNumber"></el-table-column>
                            <el-table-column label="车型" prop="vehicleType"></el-table-column>
                            <el-table-column label="座位数" prop="seatNumber"></el-table-column>
                            <el-table-column label="状态" prop="state">
                                <template slot-scope="scope">
                                    <span style="color: green;" v-if="scope.row.state == 1">已启用</span>
                                    <span style="color: red;" v-if="scope.row.state == 0">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="remarks"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="update(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 合同编号 -->
                        <el-table :data="tableData" border :key="1" ref="multipleTable" style="width: 100%" v-show="row[0] && row[0]['dataCategoryId'] == 1" @selection-change="selectionChange" @row-contextmenu="rowContextmenu">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column :label="label['givenName']" prop="givenName"></el-table-column>
                            <el-table-column :label="label['givenNumberOne']" prop="givenNumberOne"></el-table-column>
                            <el-table-column :label="label['givenNumberTwo']" prop="givenNumberTwo"></el-table-column>
                            <el-table-column label="状态" prop="state">
                                <template slot-scope="scope">
                                    <span style="color: green;" v-if="scope.row.state == 1">已启用</span>
                                    <span style="color: red;" v-if="scope.row.state == 0">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="remarks"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="update(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 货号资料 -->
                        <el-table :data="tableData" border :key="2" ref="multipleTable" style="width: 100%" v-show="row[0] && row[0]['dataCategoryId'] == 2" @selection-change="selectionChange" @row-contextmenu="rowContextmenu">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column label="客户名称" prop="customerName"></el-table-column>
                            <el-table-column label="公司货号" prop="companyNumber"></el-table-column>
                            <el-table-column label="客户货号" prop="customerNumber"></el-table-column>
                            <el-table-column label="产成品名称" prop="finishProductName"></el-table-column>
                            <el-table-column label="状态" prop="state">
                                <template slot-scope="scope">
                                    <span style="color: green;" v-if="scope.row.state == 1">已启用</span>
                                    <span style="color: red;" v-if="scope.row.state == 0">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="remarks"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="update(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 普通资料 -->
                        <el-table :data="tableData" border :key="3" ref="multipleTable" style="width: 100%" v-show="row[0] && row[0]['dataCategoryId'] == 3" @selection-change="selectionChange" @row-contextmenu="rowContextmenu">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column label="名称" prop="detailedName"></el-table-column>
                            <el-table-column label="状态" prop="state">
                                <template slot-scope="scope">
                                    <span style="color: green;" v-if="scope.row.state == 1">已启用</span>
                                    <span style="color: red;" v-if="scope.row.state == 0">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="remarks"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="update(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 银行资料 -->
                        <el-table :data="tableData" border :key="4" ref="multipleTable" style="width: 100%" v-show="row[0] && row[0]['dataCategoryId'] == 4" @selection-change="selectionChange" @row-contextmenu="rowContextmenu">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column label="名称" prop="name"></el-table-column>
                            <el-table-column label="开户行" prop="bankName"></el-table-column>
                            <el-table-column label="账号" prop="accountNumber"></el-table-column>
                            <el-table-column label="状态" prop="state">
                                <template slot-scope="scope">
                                    <span style="color: green;" v-if="scope.row.state == 1">已启用</span>
                                    <span style="color: red;" v-if="scope.row.state == 0">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="remarks"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="update(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 自定义右键菜单 -->
        <v-menu-box v-if="activeName[0] === 'second'" :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[7,12,13]" class="menuBox" @emitFn="emitFn" />
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-18
 * Description: 辅助资料明细组件
*/
import MenuBox from '../../MenuBox'
export default {
    components: {
        'v-menu-box': MenuBox
    },
    data() {
        return {
            searchText: '',
            nodeId: null,
            treeData: this.$store.state.secondaryStore.treeData,
            treeData2: [],
            multipleSelection: [],
            selectRowId: [],
            tableData: this.$store.state.secondaryStore.tableData,
            row: this.$store.state.secondaryStore.row,
            label: this.$store.state.secondaryStore.label,
            dfExpKeys: this.$store.state.secondaryStore.dfExpKeys,
            isDel: false,
            activeName: this.$store.state.secondaryStore.activeName,
            rightMenu: {
                isShowIconMove: false,      //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},        //右键点击存储的行
                rightKeyRowIndex: '',       //右键点击表格行的索引
            }
        }
    },
    watch: {
        activeName(newVal) {
            if(newVal[0] === 'second') {
                this.nodeId = this.treeData2[0]['id'];
                this.treeData2[0]['$url'] = this.$url;
                this.$store.dispatch('secondaryStore/getSubClassTableData', this.treeData2[0]);
            }
        },
        treeData: {
            handler(newVal) {
                let arr = [];
                newVal.forEach(item => {
                    if(item['children'].length > 0) {
                        arr = arr.concat(item['children']);
                    }
                });
                this.treeData2 = arr;
            },
            deep: true
        }
    },
    methods: {
        rowContextmenu(row, event) {
            event.preventDefault();     //禁止默认事件
            this.rightMenu['isShowIconMove'] = true;
            this.rightMenu['rightKeyRow'] = row;
            var menuBox = document.querySelector(".menuBox");
            let x = event.clientX,
                y = event.clientY,
                w = $('.front').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('.front').outerHeight(true) - $(menuBox).outerHeight(true);
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
        emitFn(n) {
            switch(n) {
                case 1:         //刷新
                    break;
                case 2:         //新增
                    this.add();
                    break;
                case 3:         //修改
                    this.update(this.rightMenu['rightKeyRow']);
                    break;
                case 4:         //删除
                    this.del(this.rightMenu['rightKeyRow']);
                    break;
                case 5:         //禁用
                    this.disabedBtn(0, '禁用', this.rightMenu['rightKeyRow']);
                    break;
                case 6:         //启用
                    this.disabedBtn(1, '启用', this.rightMenu['rightKeyRow']);
                    break;
                case 7:         //上移
                    this.tableMove(n, this.tableData);
                    break;
                case 8:         //下移
                    this.tableMove(n, this.tableData);
                    break;
                case 9:         //置顶
                    this.tableMove(n, this.tableData);
                    break;
                case 10:        //置底
                    this.tableMove(n, this.tableData);
                    break;
                default: break;
            }
        },
        tableMove(n, data) {
            if(n == 7) {        //上移
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = data.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    data.splice(this.rightMenu['rightKeyRowIndex'] - 1, 0, row);
                } else {
                    this.$message.warning('已经是第一个，不可上移');
                }
            } else if(n == 8) {     //下移
                if(this.rightMenu['rightKeyRowIndex'] < data.length - 1) {
                    let row = data.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    data.splice(this.rightMenu['rightKeyRowIndex'] + 1, 0, row);
                } else {
                    this.$message.warning('已经是最后一个，不可下移');
                }
            } else if(n == 9) {        //置顶
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = data.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    data.unshift(row);
                } else {
                    this.$message.warning('已经是第一个了，不可置顶');
                }
            } else if(n == 10) {        //置底
                if(this.rightMenu['rightKeyRowIndex'] < data.length - 1) {
                    let row = data.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    data.push(row);
                } else {
                    this.$message.warning('已经是最后一个，不可置底');
                }
            }
        },
        nodeClick(row) {
            this.nodeId = row['id'];
            row['$url'] = this.$url;
			this.$store.dispatch('secondaryStore/getSubClassTableData', row);
        },
        selectionChange(arr) {
            this.multipleSelection = arr;
            this.selectRowId = [];
            for(var i = 0; i < arr.length; i++) {
                this.selectRowId.push(arr[i]['id']);
            }
        },
        add() {         //新增
            this.$store.commit('secondaryStore/updateRowId', '');
            let row = this.$store.state.secondaryStore.row[0];
            switch(row['dataCategoryId']) {
                case 0:
                    this.$util.openSubLayerIframe('车牌号码-新增', 13, '550px', '380px', this.$domain + '/#/secondary/carNumber');
                    break;
                case 1:
                    this.$util.openSubLayerIframe('合同编号-新增', 13, '550px', '380px', this.$domain + '/#/secondary/contractNumber');
                    break;
                case 2:
                    this.$util.openSubLayerIframe('货号资料-新增', 13, '550px', '380px', this.$domain + '/#/secondary/goodsInfo');
                    break;
                case 3:
                    this.$util.openSubLayerIframe('普通资料-新增', 13, '550px', '300px', this.$domain + '/#/secondary/ordinary');
                    break;
                case 4:
                    this.$util.openSubLayerIframe('银行资料-新增', 13, '550px', '380px', this.$domain + '/#/secondary/bank');
                    break;
                default: break;
            }
        },
        update(data) {      //修改
            let row = this.$store.state.secondaryStore.row[0];
            this.$store.commit('secondaryStore/updateRowId', data['id']);
            switch(row['dataCategoryId']) {
                case 0:
                    this.$util.openSubLayerIframe('车牌号码-修改', 13, '550px', '380px', this.$domain + '/#/secondary/carNumber');
                    break;
                case 1:
                    this.$util.openSubLayerIframe('合同编号-修改', 13, '550px', '380px', this.$domain + '/#/secondary/contractNumber');
                    break;
                case 2:
                    this.$util.openSubLayerIframe('货号资料-修改', 13, '550px', '380px', this.$domain + '/#/secondary/goodsInfo');
                    break;
                case 3:
                    this.$util.openSubLayerIframe('普通资料-修改', 13, '550px', '250px', this.$domain + '/#/secondary/ordinary');
                    break;
                case 4:
                this.$util.openSubLayerIframe('银行资料-修改', 13, '550px', '380px', this.$domain + '/#/secondary/bank');
                    break;
                default: break;
            }
        },
        disabedBtn(status, msg, rows) {           //禁用、启用
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            let row = this.$store.state.secondaryStore.row[0];          //拿到当前所属小类数据
            row['$url'] = this.$url;
            if(status == 0) {
                if(rows) {
                    if(rows['state'] == status) {
                        this.$alert('禁用失败，其中包含已禁用选项，重新选择！', '禁用提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                } else {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == status) {
                            this.$alert('禁用失败，其中包含已禁用选项，重新选择！', '禁用提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                }
            } else if(status == 1) {
                if(rows) {
                    if(rows['state'] == status) {
                        this.$alert('启用失败，其中包含已启用选项，重新选择！', '启用提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                } else {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['state'] == status) {
                            this.$alert('启动失败，其中包含已启动选项，重新选择！', '启动提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                }
            }
            let $url = null;
            switch(row['dataCategoryId']) {         //配置各个大类下面的小类禁用、启用api
                case 0:
                    $url = this.$url + 'auxiliaryInfoAllCategory/updateCarNumberState?state=' + status;
                    break;
                case 1:
                    $url = this.$url + 'auxiliaryInfoAllCategory/updateContractNumberState?state=' + status;
                    break;
                case 2:
                    $url = this.$url + 'auxiliaryInfoAllCategory/updateGoodsInfoState?state=' + status;
                    break;
                case 3:
                    $url = this.$url + 'auxiliaryInfoAllCategory/updateOrdinaryState?state=' + status;
                    break;
                case 4:
                    $url = this.$url + 'auxiliaryInfoAllCategory/updateBankState?state=' + status;
                    break;
                default: break;
            }
            this.$http.post($url, JSON.stringify(rows ? [rows['id']] : this.selectRowId), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 1500});
                    setTimeout(() => {
                        this.$store.dispatch('secondaryStore/getSubClassTableData', row);           //刷新数据
                    }, 1000);
                } else {
                    this.$message({message: res.data.msg || msg + '失败', type: 'error', duration: 1500});
                }
            });
        },
        del(rows) {             //删除小类、小类明细
            let msg = null;
            if(rows['id']) {
                msg = '确定删除该条数据？';
            } else {
                msg = '确定删除选中数据？';
            }
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(res => {
                //判断删除的是小类还是小类明细
                let row = this.$store.state.secondaryStore.row[0];
                row['$url'] = this.$url;
                //删除的是小类明细
                let $url = null;
                switch(row['dataCategoryId']) {
                    case 0:
                        $url = $url = this.$url + 'auxiliaryInfoAllCategory/deleteCarNumber';
                        break;
                    case 1:
                        $url = this.$url + 'auxiliaryInfoAllCategory/deleteContractNumber';
                        break;
                    case 2:
                        $url = this.$url + 'auxiliaryInfoAllCategory/deleteGoodsInfo';
                        break;
                    case 3:
                        $url = this.$url + 'auxiliaryInfoAllCategory/deleteOrdinary';
                        break;
                    case 4:
                        $url = this.$url + 'auxiliaryInfoAllCategory/deleteBank';
                        break;
                    default: break;
                }
                this.$http.delete($url, {data: rows['id'] ? [rows['id']] : this.selectRowId}).then(res => {   //这里有右键单条删除和普通多条删除
                    if(res.data.code == 20001) {
                        this.$message.success('删除成功');
                        setTimeout(() => {
                            this.$store.dispatch('secondaryStore/getSubClassTableData', row);
                        }, 1000);
                    } else {
                        this.$message({message: res.data.msg || '删除失败', type: 'error', duration: 1500});
                    }
                });
            }).catch(() => {
                this.$message({message: '已取消删除', type: 'info', duration: 1500});
            });
        },
    }
}
</script>
<style>
    .secondary2 .el-tabs__content {
        height: calc(100% - 40px) !important;
    }
    .secondary2 .el-table__body-wrapper {height: calc(100% - 40px) !important;overflow-y: auto !important;}
</style>

<style scoped>
    .front {height: 100%;}
    .secondary2 {height: 100%;overflow: hidden;min-width: 1000px;}
    .tree-left {
        height: 100%;
        width: 200px;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 6px;
        float: left;
    }
    .tree-left-title {
        border-bottom: 1px solid #eee;
        font-size: 15px;
        padding: 15px;
    }
    .tree-left .el-tree {
        height: calc(100% - 51px) !important;overflow: auto !important;
        padding: 10px 0 !important;
        box-sizing: border-box !important;
    }
    .tree-right {
        height: 100%;
        width: calc(100% - 215px);
        overflow: hidden;
        float: right;
        border-radius: 6px !important;
    }
    .tree-right .block-area {min-width: 1000px;}
    .tree-right .table {height: calc(100% - 45px) !important;}
    .tree-left > ul {
        height: calc(100% - 51px) !important;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .tree-left > ul > li {
        color: #606266;
        font-size: 14px;
        text-align: center;
        height: 26px;
        line-height: 26px;
        cursor: pointer;
    }
    .tree-left > ul > li:hover {
        background-color: #f5f7fa;
    }
    .tree-left > ul > li.active {
        background-color: #f0f7ff;
    }
</style>
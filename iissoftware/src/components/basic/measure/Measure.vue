<template>
<div>
    <div id="measure" class="dragBox">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单位组" name="first">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input class="sousuo-input" v-model="searchText" placeholder="输入搜索内容" @keyup.enter.native="search"></el-input>
                        <el-button type="primary" @click="search" class="sousuo">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info" @click="refreshone">刷新</el-button>
                            <el-button type="primary" @click="addMeasureOne">新增</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                            <el-button type="danger" v-else @click="deleteMeasureOne">删除</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="disabedBtn(0,'禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="disabedBtn(1,'启用')">启用</el-button>
                            <el-button-group class="btn-other">
                                <el-button v-if="multipleSelection.length <= 0" disabled>
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button v-else @click="exportExcel" title="导出">
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button title="导入">
                                    <el-upload class="upload-demo" :action="$url + 'measureUnit/importGroup'" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
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
                    <!-- 单位组数据表格 -->
                    <div class="table">
                            <el-table :data="unitData" border highlight-current-row @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column type="index" label="编码" width="80"></el-table-column>
                                <el-table-column property="unitName" label="名称"></el-table-column>
                                <el-table-column property="unitType" label="单位类别">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.unitType == 0 ? '普通单位' : '组合单位' }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column property="state" label="状态">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.state === 1" style="color: green;">已启用</span>
                                        <span v-else style="color: #f00;">已禁用</span>
                                    </template>
                                </el-table-column>
                                <el-table-column property="operation" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="updateRow(scope.row.id)">修改</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="计量单位" name="second">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input class="sousuo-input" v-model="searchTextTwo" placeholder="输入搜索内容" @keyup.enter.native="searchTwo"></el-input>
                        <el-button class="sousuo" type="primary" @click="searchTwo">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info" @click="refreshoneTwo">刷新</el-button>
                            <el-button type="primary" @click="addMeasureTwo">新增</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                            <el-button type="danger" v-else @click="deleteMeasureTwo">删除</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="disabedBtnTwo(0,'禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="disabedBtnTwo(1,'启用')">启用</el-button>
                            <el-button-group class="btn-other">
                            <el-button v-if="multipleSelection.length <= 0" disabled>
                                <img src="../../../assets/images/export.png" alt="">
                            </el-button>
                            <el-button v-else @click="exportExcelTwo" title="导出">
                                <img src="../../../assets/images/export.png" alt="">
                            </el-button>
                            <el-button @click="importMeasureData" title="导入">
                                    <img src="../../../assets/images/import.png" alt="">
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
                    <!-- 计量单位数据表格 -->
                    <div class="table">
                            <el-table class="block-area-full" border :data="measureUnitData" highlight-current-row @selection-change="handleSelectionChange"  @row-contextmenu="rowContextmenu2">
                                <el-table-column type="selection" fixed></el-table-column>
                                <el-table-column type="index" label="编码" width="80"></el-table-column>
                                <el-table-column property="unitName" label="类别"></el-table-column>
                                <el-table-column property="useUnit" label="名称"></el-table-column>
                                <el-table-column property="unitLock" label="是否可用">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.unitLock == 1 ? '是' : '否' }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column property="state" label="状态">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.state === 1" style="color: green;">已启用</span>
                                        <span v-else style="color: #f00;">已禁用</span>
                                    </template>
                                </el-table-column>
                                <el-table-column property="operation" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="updateRowTwo(scope.row.id)">修改</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                </div>                
            </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 要打印计量单位表格数据区域 -->
    <div class="printDataMeasureTwo" v-if="isShowPrintMeasureTwo">
        <el-table :data="printDataTwo" class="printTable" id="printDataMeasureTwo">
            <el-table-column type="index" label="代码"></el-table-column>
            <el-table-column property="unitId" label="类别"></el-table-column>
            <el-table-column property="useUnit" label="名称"></el-table-column>
            <el-table-column property="unitLock" label="是否可用"></el-table-column>
            <el-table-column property="state" label="状态"></el-table-column>
        </el-table>
    </div>
    <!--导入单位组弹窗-->
    <div class="ImportRow oparatorLayer" v-if="isShowImportRow">
        <el-form label-width="20%" :model="ImportRowData" ref="ImportRowDataForm" status-icon>
            <el-form-item label="名称：" prop="id">
                <el-select v-model="ImportRowData.id" filterable placeholder="选择" style="width: 100%;">
                    <el-option
                    v-for="item in unitData"
                    :key="item.id"
                    :label="item.unitName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-upload class="upload-demo" :action="$url + 'measureUnit/importUnit?grouoId=' + ImportRowData.id" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccessTwo">
                    <el-button type="primary" style="font-size: 14px;margin: 0 10px;">导入</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
    <!-- 自定义右键菜单 -->
    <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn" v-if=" activeName == 'first' " />   
    <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn2" v-if=" activeName == 'second' "/>
</div>
</template>
<script>
/**
 * Author: 赵巧芳
 * Date: 2018-11-26
 * Description: 计量单位组件
*/
import MenuBox from '../../MenuBox'
export default {
    components: {
        'v-menu-box': MenuBox
    },
    data() {
        //计量单位修改验证
        var validateUpdateUnitId = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('输入类别'));
            }
            callback();
        }
        var validateUpdateUseUnit = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('输入使用单位'));
            }
            callback();
        }
        var validateUpdateSalesUnit = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('输入采购销售单位'));
            }
            callback();
        }
        var validateUpdateStorageUnit = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('输入入库单位'));
            }
            callback();
        }
      return {
        activeName: 'first',                    //显示第一个tabs
        labelPosition: 'left',
        sortType: '',                           //排序类型
        multipleSelection: [],                  //存储多选数据
        searchText: '',                         //单位组搜索的内容
        searchTextTwo: '',                      //计量单位搜索的内容
        selectRowId: [],                        //存储选中当前行的id
        isShowPrintMeasureOne: false,           //是否显示单位组打印区域
        printData: [],                          //要打印单位组的数据
        unitData: this.$store.state.measureStore.tableData1,
        isShowAddRowTwo: false,                 //是否显示计量单位新增弹窗
        isShowUpdateRowTwo: false,              //是否显示计量单位修改弹窗
        measureUnitData: this.$store.state.measureStore.tableData2,
        isShowPrintMeasureTwo:false,            //是否显示计量单位打印区域
        printDataTwo:[],                        //要打印计量单位的数据
        addRowMeasureTwoData: {                 //存储新增行数据
            id: '',
            useUnit: '',
            salesUnit: '',
            storageUnit: '',
            unitLock: true,
            continuousInsert:false,
        },
        updateRowMeasureTwoData: {              //存储修改行数据

        },
        updateMeasureTwoFormRules: {            //计量单位修改验证
            unitId: [{validator: validateUpdateUnitId, trigger: 'blur'}],
            useUnit: [{validator: validateUpdateUseUnit, trigger: 'blur'}],
        },
        isShowImportRow:false,                  //是否显示导入单位组弹窗
        ImportRowData:{                         //显示
            id:''
        },
        rightMenu: {
            isShowIconMove: false,              //是否显示上移、下移、置顶、置底 弹窗
            rightKeyRow: {},                    //右键点击存储的行
            rightKeyRowIndex: '',               //右键点击表格行的索引
        },
        selectNum: '',      //选中表格的数据
      };
    },
    watch: {
        //监听搜索框内容
        searchText(newVal) {
            if(!newVal) {
                this.unitData = this.$store.state.measureStore.tableData1;
            }
        },
        searchTextTwo(newVal) {
            if(!newVal) {
                this.measureUnitData = this.$store.state.measureStore.tableData2;
            }
        },
    },
    methods: {
        emitFn(n) {                             //单位组响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refreshone();
                    break;
                case 2:         //新增
                    this.addMeasureOne();
                    break;
                case 3:         //修改
                    this.updateRow(this.rightMenu['rightKeyRow']['id']);
                    break;
                case 4:         //删除
                    this.deleteSingleRow2(this.rightMenu['rightKeyRow']['id']);
                    break;
                case 5:         //禁用
                    this.disabedBtnOneList2(0, '禁用', this.rightMenu['rightKeyRow']);
                    break;
                case 6:         //启用
                    this.disabedBtnOneList2(1, '启用', this.rightMenu['rightKeyRow']);
                    break;
                case 8:         //上移
                    this.tableMove(n,this.unitData);
                    break;
                case 9:         //下移
                    this.tableMove(n,this.unitData);
                    break;
                case 10:         //置顶
                    this.tableMove(n,this.unitData);
                    break;
                case 11:        //置底
                    this.tableMove(n,this.unitData);
                    break;
                default: break;
            }
        },
        rowContextmenu(row, event) {            //单位组某一行右键点击时触发
            event.preventDefault();     //禁止默认事件
            this.rightMenu['isShowIconMove'] = true;
            this.rightMenu['rightKeyRow'] = row;
            var menuBox = document.querySelector(".menuBox");
            let x = event.clientX,
                y = event.clientY,
                w = $('#measure').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('#measure').outerHeight(true) - $(menuBox).outerHeight(true);
            if(x <= 0) x = 0;
            if(x >= w) x = w;
            if(y <= 0) y = 0;
            if(y >= h) y = h;
            menuBox.style.left = x + 'px';
            menuBox.style.top = y + 'px';
            for(var i = 0; i < this.unitData.length; i++) {
                if(this.unitData[i]['id'] == row['id']) {
                    this.rightMenu['rightKeyRowIndex'] = i;
                }
            }
        },
        emitFn2(n) {                            //计量单位响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refreshoneTwo();
                    break;
                case 2:         //新增
                    this.addMeasureTwo();
                    break;
                case 3:         //修改
                    this.updateRowTwo(this.rightMenu['rightKeyRow']['id']);
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
                    this.tableMove(n,this.measureUnitData);
                    break;
                case 9:         //下移
                    this.tableMove(n,this.measureUnitData);
                    break;
                case 10:         //置顶
                    this.tableMove(n,this.measureUnitData);
                    break;
                case 11:        //置底
                    this.tableMove(n,this.measureUnitData);
                    break;
                default: break;
            }
        },
        rowContextmenu2(row, event) {           //计量单位某一行右键点击时触发
            event.preventDefault();     //禁止默认事件
            this.rightMenu['isShowIconMove'] = true;
            this.rightMenu['rightKeyRow'] = row;
            var menuBox = document.querySelector(".menuBox");
            let x = event.clientX,
                y = event.clientY,
                w = $('#measure').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('#measure').outerHeight(true) - $(menuBox).outerHeight(true);
            if(x <= 0) x = 0;
            if(x >= w) x = w;
            if(y <= 0) y = 0;
            if(y >= h) y = h;
            menuBox.style.left = x + 'px';
            menuBox.style.top = y + 'px';
            for(var i = 0; i < this.measureUnitData.length; i++) {
                if(this.measureUnitData[i]['id'] == row['id']) {
                    this.rightMenu['rightKeyRowIndex'] = i;
                }
            }
        },
        tableMove(n,data) {
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
        handleClick(tab, event) {               //切换tabs
            this.multipleSelection = [];
            if(this.activeName == 'first') {
                this.$store.dispatch('measureStore/getData1', this.$url);
            } else if(this.activeName == 'second') {
                this.$store.dispatch('measureStore/getData2', this.$url);
            }
        },
        /** =================================单位组===================================== */
        sortTableData() {                       //选择排序
            this.unitData = this.unitData.reverse();
        },
        handleSelectionChange(val) {            //选中当前选中的行
            this.multipleSelection = val;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        refreshone(){                           //单位组刷新
            this.$store.dispatch('measureStore/getData1', this.$url);
        },
        addMeasureOne(){                        //单位组新增
            this.$util.openSubLayerIframe('单位组-新增', 13, '500px', '300px', this.$domain + '/#/measure/unitGroupAdd');
        },
        updateRow($id) {
            this.$util.openSubLayerIframe('单位组-修改', 13, '500px', '270px', this.$domain + '/#/measure/unitGroupUpdate');
            this.$store.commit('measureStore/updateRowId', $id);
        },
        deleteMeasureOne() {                    //删除单位组选中的行
            if(this.multipleSelection.length > 0) {
                this.$confirm('此操作将永久删除该文件, 是否继续？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var id = [];       //存储要删除的数据行id
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        id.push(this.multipleSelection[i]['id']);
                    }
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    //开始求删除
                    this.$http.delete(this.$url + 'measureUnit/deleteGroup', {data: id}).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                            setTimeout(() => {
                                this.$store.dispatch('measureStore/getData1', this.$url);
                                this.$store.dispatch('measureStore/getSearch',this.$url + 'measureUnit/selectGroup')
                            }, 800);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                });
            } else {
                this.$message({message: '选择你要删除的数据', type: 'warning'});
                return false;
            }
        },
        deleteSingleRow2($id) {                 //删除单条明细
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
                this.$http.delete(this.$url + 'measureUnit/deleteGroup', {data: [$id]}, type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.$store.dispatch('measureStore/getData1', this.$url);
                            this.$store.dispatch('measureStore/getSearch',this.$url + 'measureUnit/selectGroup')
                        }, 800);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            });
        },
        disabedBtn(status, msg) {               //单位组禁用 启用
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
                this.$http.post(this.$url + 'measureUnit/updateGroupState?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        this.$store.dispatch('measureStore/getData1', this.$url);
                    } else {
                        this.$message.error(this.data.msg);
                    }
                }).catch(err => {
                    this.$message.error(err);
                });
            } else {
                this.$message({message: '选择你要'+ msg +'的数据', type: 'warning'});
            }
        },
        disabedBtnOneList2(status, msg, row) {  //禁用单条
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
            this.$http.post(this.$url + 'measureUnit/updateGroupState?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message.success(msg + '成功');
                    this.$store.dispatch('measureStore/getData1', this.$url);
                }
            });
        },
        exportExcel() {                         //单位组导出excel
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'measureUnit/exportGroup',{params: { idStrs: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'measureUnit/exportGroup?idStrs=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 2000});
            }
        },
        importExcelSuccess(res){                //单位组导入excel
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success'});
                this.$store.dispatch('measureStore/getData1', this.$url);
            }
        },
        search() {                              //单位组查询
            if(this.searchText) {
                let newArr = [],
                    data = this.$store.state.measureStore.searchData,
                    searchText = this.searchText;
                let reg = new RegExp(this.searchText, "g");
                data.forEach(item => {
                    if((item['unitNameToPinYin'] && reg.test(item['unitNameToPinYin'])) || (item['unitName'] && reg.test(item['unitName']))) {
                        newArr.push(item);
                    }
                });
                this.unitData = newArr;
            }
        },
        /** =================================计量单位===================================== */
        refreshoneTwo() {                       //计量单位刷新
            this.$store.dispatch('measureStore/getData2', this.$url);
        },
        addMeasureTwo() {                       //计量单位新增页面
            this.$util.openSubLayerIframe('计量单位-新增', 13, '45%', '350px', this.$domain + '/#/measure/unitAdd');
        },
        deleteMeasureTwo(){                     //计量单位删除
            if(this.multipleSelection.length > 0) {
                this.$confirm('此操作将永久删除该文件, 是否继续？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var id = [];       //存储要删除的数据行id
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        id.push(this.multipleSelection[i]['id']);
                    }
                    var type = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    //开始求删除
                    this.$http.delete(this.$url + 'measureUnit/deleteUtil', {data: id}).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                            this.$store.dispatch('measureStore/getData2', this.$url);
                            this.$store.dispatch('measureStore/getSearchTwo',this.$url + 'measureUnit/selectUnit')
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                });
            } else {
                this.$message({message: '选择你要删除的数据', type: 'warning'});
                return false;
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
                this.$http.delete(this.$url + 'measureUnit/deleteUtil', {data: [$id]}, type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '数据删除成功', type: 'success', duration: 2000});
                        this.$store.dispatch('measureStore/getData2', this.$url);
                        this.$store.dispatch('measureStore/getSearchTwo',this.$url + 'measureUnit/selectUnit')
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            });
        },
        disabedBtnTwo(status, msg) {            //计量单位禁用 启用
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
                this.$http.post(this.$url + 'measureUnit/updateUnitState?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        this.$store.dispatch('measureStore/getData2', this.$url);
                    } else {
                        this.$message.error(this.data.msg);
                    }
                }).catch(err => {
                    this.$message.error(err);
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
            this.$http.post(this.$url + 'measureUnit/updateUnitState?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message.success(msg + '成功');
                    this.$store.dispatch('measureStore/getData2', this.$url);
                }
            });
        },
        exportExcelTwo(){                           //计量单位导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'measureUnit/exportUnit',{params: { idStrs: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'measureUnit/exportUnit?idStrs=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 2000});
            }
        },
        importExcelSuccessTwo(res){                 //计量单位导入
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success'});
                this.$store.dispatch('measureStore/getData2', this.$url);
            }else{
                this.$message.error(res.msg);
            }
        },
        updateRowTwo($id) {                          //计量单位修改当前行
            this.$util.openSubLayerIframe('计量单位-修改', 13, '45%', '320px', this.$domain + '/#/measure/unitUpdate');
            this.$store.commit('measureStore/updateRowId', $id);
        },
        searchTwo(){            //计量单位搜索
            if(this.searchTextTwo) {
                let newArr = [],
                    data = this.$store.state.measureStore.searchDataTwo,
                    searchTextTwo = this.searchTextTwo;
                let reg = new RegExp(this.searchTextTwo, "g");
                data.forEach(item => {
                    if((item['unitNameToPinYin'] && reg.test(item['unitNameToPinYin'])) || (item['unitName'] && reg.test(item['unitName'])) || (item['useUnit'] && reg.test(item['useUnit'])) || (item['useUnitToPinYin'] && reg.test(item['useUnitToPinYin']))) {
                        newArr.push(item);
                    }
                });
                this.measureUnitData = newArr;
            }
        },
        sortTableDataTwo() {                        //计量单位选择排序
            this.measureUnitData = this.measureUnitData.reverse();
        },
        importMeasureData(){                        //导入弹出单位组选择界面
            this.isShowImportRow = true;
            var that = this;
            setTimeout(() => {
                layer.open({
                    type: 1,
                    title: '选择单位组',
                    shade: 0.3,
                    shadeClose: false,
                    zIndex: 13,
                    maxmin: true,
                    anim: 5,
                    area: ['30%', 'auto'],
                    content: $('.ImportRow'),
                    btn:['导入','取消'],
                    yes: function(index, layero) {
                        
                        layer.close(index); //如果设定了yes回调，需进行手工关闭
                    },
                    end: function() {
                        that.isShowImportRow = false;
                        that.$refs['ImportRowDataForm'].resetFields();
                    }
                })
            }, 30);
        }
    },
    mounted(){
        this.$store.dispatch('measureStore/getData1', this.$url);
        setTimeout(() => {
            this.unitData = this.$store.state.measureStore.tableData1;
        })
        this.$store.dispatch('measureStore/getSearch',this.$url + 'measureUnit/selectGroup');
        this.$store.dispatch('measureStore/getSearchTwo',this.$url + 'measureUnit/selectUnit')
    }
}
</script>
<style>
    /* 计量单位里头部切换样式 */
    #measure .el-tab-pane {height:100%;}
    #measure .el-table--fit {height: 100% !important;}
    #measure .el-tabs__content {height: calc(100% - 45px);}
    #measure .el-table__body-wrapper {height: calc(100% - 48px) !important;overflow-y: auto !important;overflow-x: hidden;}
    #measure .el-select-dropdown__wrap {max-height: 150px !important;}
</style>
<style scoped lang="less">
    #measure{
        height: 100%;
        overflow: hidden;
        border-radius: 6px;
        min-width: 900px;
        .table {
            height: calc(100% - 42px);
        }
        .el-table--fit {height: 100% !important}
    }
    #measure .tree-left .el-tree {height: calc(100% - 36px) !important;overflow-y: auto;}
    @media screen and (max-width: 1250px) {
        .tree-right .block-area:nth-of-type(1) {
            overflow-x: auto;
            min-width: 0 !important;
            white-space: nowrap;
        }
        #measure .block-area:nth-of-type(1) .el-select,
        #measure .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
        }
        #measure .block-area:nth-of-type(1) .btn-group {
            margin-right: 0;
        }
    }
</style>

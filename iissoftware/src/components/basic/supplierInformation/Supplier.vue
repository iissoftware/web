<template>
    <!-- 供应商主页面 -->
    <div>
        <div id="supplierInformation">
            <div class="tree-left">
                <div class="tree-left-title">供应商目录</div>
                <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :accordion="false" ref="VueTree" node-key="id" :default-expanded-keys="lightId" :highlight-current="true"></el-tree> 
            </div>
            <div class="tree-right">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input class="sousuo-input" v-model="content" placeholder="输入搜索内容" @keyup.enter.native="onSubmit"></el-input>
                        <el-button class="sousuo" type="primary" @click.native="onSubmit">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info" @click="refresh">刷新</el-button>
                            <el-button type="primary" @click="addRow">新增</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                            <el-button class="orange" v-else @click="deleterow">删除</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="useordisuse(0,'禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="useordisuse(1,'启用')">启用</el-button>
                            <el-button-group class="btn-other">
                                <el-button title="导出" @click="exportrow">
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button title="导入">
                                    <el-upload class="upload-demo" :action="$url + 'supplier/importSupplier?systemId='+ systemId" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
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
                        <el-table :data="supplierData" border @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu"> 
                            <el-table-column type="selection" fixed></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column property="name" label="姓名"></el-table-column>
                            <el-table-column property="mnemonicCode" label="助记码"></el-table-column>
                            <el-table-column property="clientAddress" label="地址"></el-table-column>
                            <el-table-column property="clientArea" label="区域"></el-table-column>
                            <el-table-column property="industryName" label="行业"></el-table-column>
                            <el-table-column property="state" label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.state === 1" style="color: green;">已启用</span>
                                    <span v-if="scope.row.state === 0" style="color: #f00;">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" min-width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="lookRow(scope.row.id)" style="padding:10px 5px !important">查看</el-button>
                                    <el-button type="text" size="small" @click="updateRow(scope.row.id)" style="padding:10px 5px !important">修改</el-button>                                   
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>                   
            </div>
            <v-drag :elem="['.tree-left', '.tree-right', '#supplierInformation']" :min="110" />
        </div>       
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn" />
    </div>
    
</template>

<script>
import MenuBox from '../../MenuBox'
import Drag from '../../drag'
export default {
    components: {
        'v-menu-box': MenuBox,
        'v-drag': Drag
    },
    data(){
        return{
            systemId:this.$store.state.systemId,                    //系统参数
            treeData:this.$store.state.supplierStore.treeData,      //树的数据
            defaultProps:{                                          //左侧树的子类
                children: 'suppliers',
                label: 'name'
            },
            supplierData: this.$store.state.supplierStore.tableData,//表格数据
            lightId:[],                                             //高亮
            content:'' ,                                            //搜索框的内容
            multipleSelection: [],
            selectRowId: [],        //存储选中当前行的id
            rightMenu: {
                isShowIconMove: false,      //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},        //右键点击存储的行
                rightKeyRowIndex: '',       //右键点击表格行的索引
            },                         
        }
    },
    watch:{
        treeData() {
            let treeclickedId = this.$store.state.supplierStore.treeclickedId;
            if(treeclickedId) {
                this.lightId = [treeclickedId];
            } else {            //第一次进来
                this.lightId = [this.treeData[0]['id']];
            }
            //设置高亮
            setTimeout(() => {
                this.$refs.VueTree.setCurrentKey(this.lightId.join(''));
            });
        },
        content(newVal){
            if(!newVal) {
                this.supplierData = this.$store.state.supplierStore.tableData;
            }
        }

    },
    methods:{
        emitFn(n) {                             //响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refresh();
                    break;
                case 2:         //新增
                    this.addRow();
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
                w = $('#supplierInformation').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('#supplierInformation').outerHeight(true) - $(menuBox).outerHeight(true);
            if(x <= 0) x = 0;
            if(x >= w) x = w;
            if(y <= 0) y = 0;
            if(y >= h) y = h;
            menuBox.style.left = x + 'px';
            menuBox.style.top = y + 'px';
            for(var i = 0; i < this.supplierData.length; i++) {
                if(this.supplierData[i]['id'] == row['id']) {
                    this.rightMenu['rightKeyRowIndex'] = i;
                }
            }
        },
        tableMove(n) {                          //上移下移
            if(n == 8) {        //上移
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.supplierData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.supplierData.splice(this.rightMenu['rightKeyRowIndex'] - 1, 0, row);
                } else {
                    this.$message.warning('已经是第一个，不可上移');
                }
            } else if(n == 9) {     //下移
                if(this.rightMenu['rightKeyRowIndex'] < this.supplierData.length - 1) {
                    let row = this.supplierData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.supplierData.splice(this.rightMenu['rightKeyRowIndex'] + 1, 0, row);
                } else {
                    this.$message.warning('已经是最后一个，不可下移');
                }
            } else if(n == 10) {        //置顶
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.supplierData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.supplierData.unshift(row);
                } else {
                    this.$message.warning('已经是第一个了，不可置顶');
                }
            } else if(n == 11) {        //置底
                if(this.rightMenu['rightKeyRowIndex'] < this.supplierData.length - 1) {
                    let row = this.supplierData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.supplierData.push(row);
                } else {
                    this.$message.warning('已经是最后一个，不可置底');
                }
            }
        },      
        handleNodeClick(row) {                  //点击左侧树形结构触发该方法
            this.$store.commit('supplierStore/updatetreeclickedId', row['id']);
            this.$store.commit('supplierStore/updatetreeclicked', row);
            this.$store.commit('supplierStore/updateTableData', row['suppliers']); 
        },       
        handleSelectionChange(row) {            //选中当前行
            this.multipleSelection = row;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        refresh(){                              //刷新按钮
            this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
            this.$message({message: '刷新成功', type: 'success', duration: 1500});
        },
        addRow() {                              //新增页面
            this.$util.openSubLayerIframe('供应商-新增', 13, '500px', '400px', this.$domain + '/#/supplierInformation/add');
        },
        updateRow($id){                         //修改页面
            this.$store.commit('supplierStore/updateRowId', $id);
            this.$util.openSubLayerIframe('供应商-修改', 13, '500px', '400px', this.$domain + '/#/supplierInformation/update');
        },
        lookRow($id){                           //查看页面
            this.$store.commit('supplierStore/updateRowId', $id);
            this.$util.openSubLayerIframe('供应商-查看', 13, '500px', '400px', this.$domain + '/#/supplierInformation/look');
        },
        deleterow(){                            //删除
            this.$confirm('确定删除数据？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$url + 'supplier/delete', {data: this.selectRowId}).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '删除成功', type: 'success', duration: 1500});
                        setTimeout(() => {
                            this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }).catch(() => {
                this.$message({message: '已取消删除',type:'info'});          
            });
        },
        deleteSingleRow($id) {                  //删除右键
            this.$confirm('确定删除该条数据？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //开始求删除
                this.$http.delete(this.$url + 'supplier/delete',{data: [$id]}).then(res => {                                     
                    if(res.data.code == 20001) {
                        this.$message({message: '删除成功', type: 'success', duration: 1500});
                        setTimeout(() => {
                            this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }).catch(() => {
                this.$message({message: '已取消删除',type:'info'});          
            });
        },
        useordisuse(status, msg){               //禁用启用
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
                        this.$alert('启用失败，其中包含已启动选项，重新选择！', '启动提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                }
            }
            this.$http.post(this.$url + 'supplier/updateState?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {          
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 1500});
                    setTimeout(() => {
                        this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
                    }, 500);
                } else {
                    this.$message.error(this.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            });
        },
        disabedBtnOneList(status, msg, row) {   //禁用右键
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
            this.$http.post(this.$url + 'supplier/updateState?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success',duration:1500});
                    setTimeout(() => {
                        this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
                    }, 500);
                }
            });
        },
        importExcelSuccess(res){                //导入
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success',duration:1500});
                setTimeout(() => {
                    this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
                }, 1000);
            }else{
                this.$message({message: res.msg, type: 'error',duration:2000});
            }
        },
        exportrow(){                            //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'supplier/export',{params: { idStrs: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'supplier/export?idStrs=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 1500});
            }
        },
        onSubmit(){                             //查询
            if(this.content) {
                let arr = this.$store.state.supplierStore.allTableData,
                    newArr = [],
                    reg = new RegExp(this.content, 'g');                    
                arr.forEach(item => {
                    let clientAddress = item['clientAddress'],
                        clientAddressToPinYin = item['clientAddressToPinYin'],
                        clientArea = item['clientArea'],
                        clientAreaToPinYin = item['clientAreaToPinYin'],
                        clientAreaToFirstPinYin = item['clientAreaToFirstPinYin'],
                        industryName = item['industryName'],
                        industryNameToPinYin = item['industryNameToPinYin'],
                        industryNameToFirstPinYin = item['industryNameToFirstPinYin'],
                        name = item['name'],
                        nameToPinYin = item['nameToPinYin'],
                        nameToFirstPinYin = item['nameToFirstPinYin'],
                        mnemonicCode = item['mnemonicCode'],
                        mnemonicCodeToPinYin = item['mnemonicCodeToPinYin'];
                    if((clientAddress && reg.test(clientAddress)) || (clientAddressToPinYin && reg.test(clientAddressToPinYin)) || (clientArea && reg.test(clientArea))
                        || (clientAreaToPinYin && reg.test(clientAreaToPinYin)) || (industryName && reg.test(industryName)) || (industryNameToPinYin && reg.test(industryNameToPinYin))
                        || (name && reg.test(name)) || (nameToPinYin && reg.test(nameToPinYin)) || (mnemonicCode && reg.test(mnemonicCode)) || (mnemonicCodeToPinYin && reg.test(mnemonicCodeToPinYin))
                        || (nameToFirstPinYin && reg.test(nameToFirstPinYin)) || (industryNameToFirstPinYin && reg.test(industryNameToFirstPinYin)) || (clientAreaToFirstPinYin && reg.test(clientAreaToFirstPinYin))
                    ) {
                        newArr.push(item);
                    }
                });
                this.supplierData = newArr
            }   
        },
    },        
    created(){
        this.$store.dispatch('supplierStore/getTreeData', this.$url + 'supplier/selectTree');
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
    }
    .tree-right {
        height: 100%;
        width: calc(100% - 215px);
        overflow: hidden;
        float: right;
    }
    #supplierInformation .table { height: calc(100% - 42px) !important;}
    #supplierInformation .table .el-table__body-wrapper {overflow-y: auto !important; height: calc(100% - 41px) !important;}
    .el-select-dropdown__wrap{max-height: 240px !important;}
</style>
<style lang="less" scoped>
    #supplierInformation {height: 100%;overflow: hidden;min-width: 1000px;}
    #supplierInformation .tree-left .el-tree {height: calc(100% - 36px) !important;overflow-y: auto;}
    .tree-right .block-area{min-width: 1000px;}
</style>



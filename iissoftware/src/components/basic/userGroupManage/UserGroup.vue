<template>
    <!-- 用户组主页面 -->
    <div id="UserGroup">
        <div class="moudle_left">
            <div class="block-area">
                <div class="btn-box">
                    <el-input class="sousuo-input" v-model="searchText" placeholder="输入搜索内容" @keyup.enter.native="search"></el-input>
                    <el-button class="sousuo" type="primary" @click.native="search">查询</el-button>
                    <div class="btn-group">
                        <el-button type="info" @click="refresh">刷新</el-button>
                        <el-button type="primary" @click="addRow">新增</el-button>
                        <el-button type="danger" v-if="multipleSelection.length <= 0 || multipleSelection.length >1" disabled>删除</el-button>
                        <el-button class="orange" v-else @click="deleteRow">删除</el-button>
                        <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                        <el-button type="danger" v-else @click="isDisabled(0,'禁用')">禁用</el-button>
                        <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                        <el-button type="success" v-else @click="isDisabled(1,'启用')">启用</el-button>
                        <el-button-group class="btn-other">
                            <el-button title="导出" @click="exportExcel">
                                <img src="../../../assets/images/export.png" alt="">
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
                    <el-table ref="table" border :data="userGroupData" @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu" @row-click="rowClick" :highlight-current-row="true"> 
                        <el-table-column type="selection" fixed></el-table-column>
                        <el-table-column type="index" label="编号" width="80"></el-table-column>
                        <el-table-column property="name" min-width="200px" label="用户组名称"></el-table-column>
                        <el-table-column property="locks" label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.locks === 1" style="color: green;">已启用</span>
                                <span v-if="scope.row.locks === 0" style="color: #f00;">已禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="updateRow(scope.row)" style="padding:10px 5px !important">修改</el-button>                                   
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div> 
        </div>
        <v-tree />
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn" />
    </div>
</template>

<script>
import MenuBox from '../../MenuBox'
import Tree from './tree'
export default {
    components: {
        'v-menu-box': MenuBox,
        'v-tree': Tree
    },
    data(){
        return{
            systemId: this.$store.state.systemId,                               //系统参数id
            userGroupData: this.$store.state.userGroupStore.groupTableData,     //表格数据
            mids:this.$store.state.userGroupStore.mids,                         //菜单权限               
            searchText:'',                                                      //搜索框输入内容                 
            arr:[],                                                             //存放所有树节点的id，用于全选函数
            multipleSelection:[],                                               //选中行
            selectRowId: [],                                                    //选中的行数据id集合
            rightMenu: {
                isShowIconMove: false,                                          //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},                                                //右键点击存储的行
                rightKeyRowIndex: '',                                           //右键点击表格行的索引
            },
            boolean:true,            
        }
    },
    watch:{
        userGroupData(){                        //表格数据       
            if(this.boolean){                
                this.$refs.table.setCurrentRow(this.$store.state.userGroupStore.groupTableData[0]);    //默认选中表格第一行
                setTimeout(() => {
                    this.$store.dispatch('userGroupStore/selectObjectById', this.$url + 'menu/selectObjectById?id=' + this.$store.state.userGroupStore.groupTableData[0]['id']);
                },500)                
                this.boolean = false;
            }
            else{
                this.$refs.table.setCurrentRow(this.$store.state.userGroupStore.groupTableData[this.$store.state.userGroupStore.currentLigthRow]);
                this.$store.commit('userGroupStore/updateCurrentRow', this.$store.state.userGroupStore.groupTableData[this.$store.state.userGroupStore.groupTableData.length-1]);

            }           
        },       
        searchText(newVal) {            //查询
            if(!newVal) {
                this.userGroupData = this.$store.state.userGroupStore.groupTableData;
            }
        }
    },
    methods:{
        addRow(){                               //新增页面
            this.$util.openSubLayerIframe('用户组-新增', 13, '500px', '230px', this.$domain + '/#/userGroupManage/add');
        },
        updateRow(row) {                        //修改页面
            if(row['name'] === '系统管理员' || row['name'] === '操作员组') {
                this.$message({message:'该用户组名称默认不可修改',type:'warning',duration:1500});
                return false;
            } else {
                this.$store.commit('userGroupStore/updateRowId', row['id']);
                this.$util.openSubLayerIframe('用户组-修改', 13, '500px', '230px', this.$domain + '/#/userGroupManage/update');
            }
        },       
        handleSelectionChange(val) {            //左侧表格选中当前行           
            this.multipleSelection = val;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
            if(val.length>0){
                for(let i =0 ; i< this.userGroupData.length; i++){
                    if(val[val.length-1]['id'] == this.userGroupData[i]['id']){
                        this.$store.commit('userGroupStore/updateCurrentLightRow',i);
                    }                    
                }
                this.$store.dispatch('userGroupStore/selectObjectById', this.$url + 'menu/selectObjectById?id=' + val[val.length-1]['id']);
                this.$store.commit('userGroupStore/updateCurrentRow', val[val.length-1]);
                this.$refs.table.setCurrentRow(this.$store.state.userGroupStore.groupTableData[this.$store.state.userGroupStore.currentLigthRow]);
            }
            
        },                          
        search(){                               //搜索查询
            if(this.searchText) {
                let arr = this.$store.state.userGroupStore.groupTableData,
                    newArr = [];
                arr.forEach(item => {
                    if((item['toPinyin'] && item['toPinyin'].indexOf(this.searchText) != -1) || (item['name'] && item['name'].indexOf(this.searchText) != -1) || (item['toFirstChar'] && item['toFirstChar'].indexOf(this.searchText) != -1)) {
                        newArr.push(item);
                    }
                });
                this.userGroupData = newArr
            }
        },
        refresh(){                              //刷新
            this.boolean = true;
            this.$store.dispatch('userGroupStore/getGroupTableData', this.$url + 'userGroup/selectObject?systemId=' + this.systemId);
        },
        enablefresh(){                          //右键禁用启用刷新
            this.$store.dispatch('userGroupStore/getGroupTableData', this.$url + 'userGroup/selectObject?systemId=' + this.systemId);
            this.$store.dispatch('userGroupStore/selectObjectById', this.$url + 'menu/selectObjectById?id=' + this.rightMenu['rightKeyRowIndex']['id']);
            setTimeout(()=>{
                this.$refs.table.setCurrentRow(this.userGroupData[this.rightMenu['rightKeyRowIndex']]);
            },500)
            
        },
        deleteRow(){                            //单条删除
            if(this.multipleSelection[0]['name'] === '系统管理员' || this.multipleSelection[0]['name'] === '操作员组') {
                this.$message({message: '该用户组默认不可删除', type: 'error', duration: 1500});
                return false;
            } else {
                this.$confirm('确定删除该条数据？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(this.$url + 'userGroup/deleteById?id='+ parseInt(this.multipleSelection[0]['id']) + '&systemId=' + this.systemId).then(res => {                                   
                        if(res.data.code == 20001) {
                            this.$message({message: '删除成功', type: 'success', duration: 1500});
                            setTimeout(() => {
                                this.refresh()
                            }, 500);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                })
            }
        },
        deleteSingleRow($id) {                  //右键删除单条
            if($id.name == '系统管理员' || $id.name == '操作员组'){
                this.$message({message: '该用户组默认不可删除', type: 'error', duration: 1500});
                return false;
            }
            this.$confirm('确定删除该条数据？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(this.$url + 'userGroup/deleteById?id=' + $id.id + '&systemId=' + this.systemId).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '删除成功', type: 'success', duration: 1500});
                        setTimeout(() => {
                            this.refresh()
                            // this.$store.dispatch('userGroupStore/getGroupTableData', this.$url + 'userGroup/selectObject?systemId=' + this.systemId);                            
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }).catch(() => {
                this.$message({message: '已取消删除',type:'info'});          
            });
        },
        exportExcel(){                          //导出  
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'userGroup/export?systemId=' + this.systemId,{params: { list: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'userGroup/export?list=' + idSting + '&systemId=' + this.systemId;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                });
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 1500});
            }
        },       
        isDisabled(status, msg){                //禁用和启用
            for(let i = 0; i < this.multipleSelection.length; i++) {
                let name = this.multipleSelection[i]['name'];
                if(name === '系统管理员' || name === '操作员组') {
                    this.$message({message: '系统管理员组或操作员组不能' + msg, type: 'error', duration: 1500});
                    return false;
                }
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(status == 0) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['locks'] == status) {
                            this.$alert('禁用失败，其中包含已禁用选项，重新选择！', '禁用提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                } else if(status == 1) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['locks'] == status) {
                            this.$alert('启用失败，其中包含已启动选项，重新选择！', '启动提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                }
                this.$http.post(this.$url + 'userGroup/enable?state=' + status, JSON.stringify(this.selectRowId),type).then(res => {         
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 1500});
                        setTimeout(() => {  
                            this.refresh()
                        }, 1000);
                    } else {
                        this.$message.error(this.data.msg);
                    }
                });
            }
        },
        disabedBtnOneList(status, msg, row) {   //右键禁用单条
             var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            if(status == 0) {
                if(row['locks'] == status) {
                    this.$message.error('禁用失败！当前数据已是禁用状态');
                    return false;
                }
            }
            if(status == 1) {
                if(row['locks'] == status) {
                    this.$message.error('启用失败！当前数据已是启用状态');
                    return false;
                }
            }
            if(row['name'] == '系统管理员' || row['name'] == '操作员组'){
                this.$message({message: '该用户组默认不可' + msg, type: 'error', duration: 1500});
                return false;
            }
            this.$http.post(this.$url + 'userGroup/enable?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message.success(msg + '成功');
                    setTimeout(() => {
                        // this.refresh()
                        this.enablefresh()
                    }, 500);
                }
            });
        },
        rowClick(row) {                         //单击表格行
            this.$store.dispatch('userGroupStore/selectObjectById', this.$url + 'menu/selectObjectById?id=' + row['id']);
            this.$store.commit('userGroupStore/updateCurrentRow', row);
        },
        rowContextmenu(row, event) {            //某一行右键点击时触发
            event.preventDefault();     //禁止默认事件
            this.rightMenu['isShowIconMove'] = true;
            this.rightMenu['rightKeyRow'] = row;
            var menuBox = document.querySelector(".menuBox");
            let x = event.clientX,
                y = event.clientY,
                w = $('#UserGroup').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('#UserGroup').outerHeight(true) - $(menuBox).outerHeight(true);
            if(x <= 0) x = 0;
            if(x >= w) x = w;
            if(y <= 0) y = 0;
            if(y >= h) y = h;
            menuBox.style.left = x + 'px';
            menuBox.style.top = y + 'px';
            for(var i = 0; i < this.userGroupData.length; i++) {
                if(this.userGroupData[i]['id'] == row['id']) {
                    this.rightMenu['rightKeyRowIndex'] = i;
                }
            }
            this.$store.dispatch('userGroupStore/selectObjectById', this.$url + 'menu/selectObjectById?id=' + this.rightMenu['rightKeyRow']['id']);
        },
        tableMove(n) {                          //上移下移
            if(n == 8) {        //上移
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.userGroupData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.userGroupData.splice(this.rightMenu['rightKeyRowIndex'] - 1, 0, row);
                } else {
                    this.$message.warning('已经是第一个，不可上移');
                }
            } else if(n == 9) {     //下移
                if(this.rightMenu['rightKeyRowIndex'] < this.userGroupData.length - 1) {
                    let row = this.userGroupData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.userGroupData.splice(this.rightMenu['rightKeyRowIndex'] + 1, 0, row);
                } else {
                    this.$message.warning('已经是最后一个，不可下移');
                }
            } else if(n == 10) {        //置顶
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.userGroupData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.userGroupData.unshift(row);
                } else {
                    this.$message.warning('已经是第一个了，不可置顶');
                }
            } else if(n == 11) {        //置底
                if(this.rightMenu['rightKeyRowIndex'] < this.userGroupData.length - 1) {
                    let row = this.userGroupData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.userGroupData.push(row);
                } else {
                    this.$message.warning('已经是最后一个，不可置底');
                }
            }
        },
        emitFn(n) {                             //右键方法
            switch(n) {
                case 1:         //刷新
                    this.refresh();
                    break;
                case 2:         //新增
                    this.addRow();
                    break;
                case 3:         //修改
                    this.updateRow(this.rightMenu['rightKeyRow']);
                    break;
                case 4:         //删除
                    this.deleteSingleRow(this.rightMenu['rightKeyRow']);
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
        }
    },
    created() {
        this.$store.dispatch('userGroupStore/getGroupTableData', this.$url + 'userGroup/selectObject?systemId=' + this.systemId);
    }
}
</script>

<style lang="less">
    .moudle_left {
        height: 100%;
        width: 780px;
        box-sizing: border-box;       
        float: left;
        width:calc(100% - 265px);
    }
    .moudle_right {
        height: 100%;
        width:250px;
        overflow: hidden;
        float: right;
        background-color: #fff;
        padding: 10px 0;
        border-radius: 6px;
        .moudle_right_title {
            padding: 0 15px 15px 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            font-size: 15px;
            margin-bottom: 10px;
            .btn-photo{
                float:right;
                img{
                    padding-left:5px;
                    cursor: pointer;
                }
            }
        }        
    }
    #UserGroup .table { height: calc(100% - 42px) !important;}
    #UserGroup .table .el-table__body-wrapper {overflow-y: auto !important; height: calc(100% - 41px) !important;}
    // #UserGroup .layui-layer-btn {
    //     display: block !important;
    //     height: auto !important;
    // }
</style>

<style lang="less" scoped>
    #UserGroup{ height: 100%;overflow: hidden;min-width:1026px;}
</style>


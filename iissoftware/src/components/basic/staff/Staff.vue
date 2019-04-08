<template>
    <div>
        <div id="staff">
            <div class="tree-left">
                <div class="tree-left-title">部门名称</div>
                <el-tree :data="treeData" :props="defaultProps" :accordion="false" @node-click="handleNodeClick" ref="VueTree" node-key="id" :default-expanded-keys="[nowTreeId]" :highlight-current="true"></el-tree>           
            </div>
            <div class="tree-right">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input v-model="content" class="sousuo-input" placeholder="输入搜索内容" @keyup.enter.native="onSubmit"></el-input>
                        <el-button type="primary" class="sousuo" @click.native="onSubmit">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info" @click="refresh">刷新</el-button>
                            <el-button type="primary" @click="addStaff">新增</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                            <el-button class="orange" v-else @click="deleteStaff">删除</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="useordisuse(0,'禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="useordisuse(1,'启用')">启用</el-button>
                            <el-button-group class="btn-other">
                                <el-button title="导出" @click="exportstaff">
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button title="导入">
                                    <el-upload class="upload-demo" :action="$url + 'employee/importEmployee?systemId=' + systemId" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
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
                        <el-table :data="staffData" border @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu"> 
                            <el-table-column type="selection" fixed></el-table-column>
                            <el-table-column property="userName" label="用户名"></el-table-column>
                            <el-table-column property="name" label="姓名" ></el-table-column>
                            <el-table-column property="sex" label="性别" ></el-table-column>
                            <el-table-column  property="deptName" label="部门" ></el-table-column>
                            <el-table-column property="positionAux" label="职务">
                            </el-table-column>
                            <el-table-column property="state" label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.state == 1" style="color: green;">已启用</span>
                                    <span v-if="scope.row.state == 0" style="color: #f00;">已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="lookStaff(scope.row.id)">查看</el-button>
                                    <el-button type="text" size="small" @click="updateStaff(scope.row.id)">修改</el-button>                                   
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>                 
            </div>
            <v-drag :elem="['.tree-left', '.tree-right', '#staff']" />
        </div>
        <v-drag :elem="['.tree-left', '.tree-right', '#staff']" :min="200" />
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
            systemId:this.$store.state.systemId,                       //系统参数id
            treeData:this.$store.state.staffStore.treeData,            //树形结构数据
            defaultProps:{                                             //树的子节点数据
                children: 'subDepartment',
                label: 'name'
            },
            content:'',                                                 //搜索框的内容
            staffData:this.$store.state.staffStore.staffData,           //表格数据
            multipleSelection:[],
            selectRowId:[],
            nowTreeId:'',                                               //树的默认展开
            newdeptId:this.$store.state.staffStore.newdeptId,           //当前选中的树节点,并且该Id高亮
            rightMenu: {                                                //右键
                isShowIconMove: false,                            //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},                                  //右键点击存储的行
                rightKeyRowIndex: '',                             //右键点击表格行的索引
            },
            boolean: true,                                              //是否是第一次进入页面
        };
    },
    watch: {
        content(newVal) {    //查询
            if(!newVal) {
                this.staffData = this.$store.state.staffStore.staffData;
            }
        },
        staffData(){            
            if(this.boolean){
                this.nowTreeId = this.$store.state.systemInfo[0]['id']
                setTimeout(() => {
                    this.$refs['VueTree'].setCurrentKey(this.nowTreeId);         //高亮
                })                        
                this.boolean = false;
            }else{
                this.nowTreeId = this.$store.state.staffStore.newdeptId;
                setTimeout(() => {
                    this.$refs['VueTree'].setCurrentKey(this.nowTreeId)
                })
            }            
        }
    },
    methods: {
        emitFn(n) {                                 //响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refresh();
                    break;
                case 2:         //新增
                    this.addStaff();
                    break;
                case 3:         //修改
                    this.updateStaff(this.rightMenu['rightKeyRow']['id']);
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
        rowContextmenu(row, event) {                //某一行右键点击时触发
            event.preventDefault();     //禁止默认事件
            this.rightMenu['isShowIconMove'] = true;
            this.rightMenu['rightKeyRow'] = row;
            var menuBox = document.querySelector(".menuBox");
            let x = event.clientX,
                y = event.clientY,
                w = $('#staff').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('#staff').outerHeight(true) - $(menuBox).outerHeight(true);
            if(x <= 0) x = 0;
            if(x >= w) x = w;
            if(y <= 0) y = 0;
            if(y >= h) y = h;
            menuBox.style.left = x + 'px';
            menuBox.style.top = y + 'px';
            for(var i = 0; i < this.staffData.length; i++) {
                if(this.staffData[i]['id'] == row['id']) {
                    this.rightMenu['rightKeyRowIndex'] = i;
                }
            }
        },
        tableMove(n) {                              //上移下移
            if(n == 8) {        //上移
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.staffData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.staffData.splice(this.rightMenu['rightKeyRowIndex'] - 1, 0, row);
                } else {
                    this.$message.warning('已经是第一个，不可上移');
                }
            } else if(n == 9) {     //下移
                if(this.rightMenu['rightKeyRowIndex'] < this.staffData.length - 1) {
                    let row = this.staffData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.staffData.splice(this.rightMenu['rightKeyRowIndex'] + 1, 0, row);
                } else {
                    this.$message.warning('已经是最后一个，不可下移');
                }
            } else if(n == 10) {        //置顶
                if(this.rightMenu['rightKeyRowIndex'] > 0) {
                    let row = this.staffData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.staffData.unshift(row);
                } else {
                    this.$message.warning('已经是第一个了，不可置顶');
                }
            } else if(n == 11) {        //置底
                if(this.rightMenu['rightKeyRowIndex'] < this.staffData.length - 1) {
                    let row = this.staffData.splice(this.rightMenu['rightKeyRowIndex'], 1)[0];
                    this.staffData.push(row);
                } else {
                    this.$message.warning('已经是最后一个，不可置底');
                }
            }
        },
        handleNodeClick(val){                       //点击树的节点
            this.$store.commit('staffStore/updateNewdeptId',val['id'])
            if(val['id'] == this.systemId){
                this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=0' + '&systemId=' + this.systemId);
            }else{
                this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + val['id'] + '&systemId=' + this.systemId);
            }
        },
        handleSelectionChange(row){                 //表格中的勾选
            this.multipleSelection = row;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        onSubmit(){                                 //查询搜索
            if(this.content) {
                let arr = this.$store.state.staffStore.searchData,
                    newArr = [],
                    reg = new RegExp(this.content, 'g');                    
                arr.forEach(item => {
                    let toNamePinyin = item['toNamePinyin'],
                        name = item['name'],
                        toSimplePinyin = item['toSimplePinyin'],
                        toUserNamePinyin = item['toUserNamePinyin'],
                        toSimpleUsernamePinyin = item['toSimpleUsernamePinyin'],
                        userName = item['userName'],
                        toPosionPinyin = item['toPosionPinyin'],
                        toSimplePosionPinyin = item['toSimplePosionPinyin'],
                        positionAux = item['positionAux'];
                    if((toNamePinyin && reg.test(toNamePinyin)) || (name && reg.test(name)) || (toSimplePinyin && reg.test(toSimplePinyin))
                        || (toUserNamePinyin && reg.test(toUserNamePinyin)) || (toSimpleUsernamePinyin && reg.test(toSimpleUsernamePinyin)) || (userName && reg.test(userName))
                        || (toPosionPinyin && reg.test(toPosionPinyin)) || (toSimplePosionPinyin && reg.test(toSimplePosionPinyin)) || (positionAux && reg.test(positionAux)) 
                    ) {
                        newArr.push(item);
                    }
                });
                this.staffData = newArr;     //如果查到结果，就更新表格数据         
            }
        },
        refresh(){                                  //刷新
           this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.nowTreeId + '&systemId=' + this.systemId);
           this.$store.dispatch('staffStore/getSearch',this.$url + 'employee/selectEmployeeByName')
           this.$message.success('刷新成功') 
        },
        addStaff(){                                 //新增职员页面
            this.$util.openSubLayerIframe('职员-新增', 13, '500px', '400px', this.$domain + '/#/staff/add');
        },
        updateStaff($id){                           //修改职员页面
            this.$store.commit('staffStore/updateRowId', $id);
            this.$util.openSubLayerIframe('职员-修改', 13, '500px', '400px', this.$domain + '/#/staff/update');
        },
        lookStaff($id){                             //查看职员页面
            this.$store.commit('staffStore/updateRowId', $id);
            this.$util.openSubLayerIframe('职员-查看', 13, '500px', '400px', this.$domain + '/#/staff/look');
        },
        deleteStaff(){                              //删除
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
                //开始请求删除
                this.$http.post(this.$url + 'employee/deleteEmployee', JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '数据删除成功', type: 'success', duration: 1500});
                        setTimeout(() => {
                            this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.nowTreeId + '&systemId=' + this.systemId);
                            this.$store.dispatch('staffStore/getSearch',this.$url + 'employee/selectEmployeeByName')
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }).catch(() => {
                this.$message({message: '已取消删除',type:'info'});          
            });
        },
        deleteSingleRow($id) {                      //右键删除
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
                this.$http.post(this.$url + 'employee/deleteEmployee', JSON.stringify([$id]), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '删除成功', type: 'success', duration: 1500});
                        setTimeout(() => {
                            this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.nowTreeId + '&systemId=' + this.systemId);
                            this.$store.dispatch('staffStore/getSearch',this.$url + 'employee/selectEmployeeByName')
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }).catch(() => {
                this.$message({message: '已取消删除',type:'info',duration:1500});          
            });
        },
        useordisuse(status, msg){                   //禁用启用
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
            this.$http.post(this.$url + 'employee/startOrDisableEmployee?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {             
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 1500});
                    setTimeout(() => {
                        this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.nowTreeId + '&systemId=' + this.systemId);
                    }, 500);
                } else {
                    this.$message.error(this.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
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
            this.$http.post(this.$url + 'employee/startOrDisableEmployee?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 1500});
                    setTimeout(() => {
                        this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.nowTreeId + '&systemId=' + this.systemId);
                    }, 500);
                }
            });
        },
        exportstaff(){                              //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'employee/exportEmployee',{params: { idList: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success',duration:1500});
                    window.location.href = this.$url + 'employee/exportEmployee?idList=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 1500});
            }
        },
        importExcelSuccess(res){                    //导入
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success',duration:1500});
                setTimeout(() => {
                    this.$store.commit('staffStore/updateNewdeptId',this.treeData[0]['id'])
                    this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=' + this.systemId + '&systemId=' + this.systemId);
                    this.$store.dispatch('staffStore/getSearch',this.$url + 'employee/selectEmployeeByName')
                }, 1000);
            }else{
                this.$message({message: res.msg, type: 'error',duration:2000});
            }
        },       
    },
    created(){
        this.$store.dispatch('staffStore/getTreeData', this.$url + 'department/selectObject?parentId=0' + '&systemId=' + this.systemId);             //获取部门树形数据
        setTimeout(() => {
            this.$store.dispatch('staffStore/getStaffData', this.$url + 'employee/findEmployeeByDepartment?id=0' + '&systemId=' + this.systemId);    //根据当前部门id查询该部门下的职员数据
            this.$store.dispatch('staffStore/getSearch',this.$url + 'employee/selectEmployeeByName')                                                 //模糊搜索接口 
        },100)
                                                                                   
        
    },
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
    }
    .tree-right {
        height: 100%;
        width: calc(100% - 215px);
        overflow: hidden;
        float: right;
    }
    #staff .table { height: calc(100% - 42px) !important;}
    #staff .table .el-table__body-wrapper {overflow-y: auto !important; height: calc(100% - 41px) !important;}
    #staff .tree-right .block-area {min-width:790px; overflow-x: auto !important}
</style>

<style lang="less" scoped>
    #staff{
        height: 100%;
        overflow: hidden;
        min-width: 1000px;
    }
    #staff .tree-left .el-tree {height: calc(100% - 36px) !important;overflow-y: auto;}
    .tree-right .block-area {min-width: 1000px;}
</style>

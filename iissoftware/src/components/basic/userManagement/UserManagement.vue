<template>
    <div>
        <div class="userManagement">
            <div class="template">
                <div class="template-title">部门列表</div>
                <el-tree :data="treedata" ref="tree" :props="defaultProps" :expand-on-click-node="false" :accordion="false" node-key="id" :default-expanded-keys="[nowTreeId]" :default-expand-all="true" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
            </div>
            <div class="tree-right">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input class="sousuo-input" v-model="searchText" placeholder="输入搜索内容" @keyup.enter.native="searchBtn"></el-input>
                        <el-button class="sousuo" type="primary" @click="searchBtn">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info" @click="refrense">刷新</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="useordisuse(0,'禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="useordisuse(1,'启用')">启用</el-button>
                            <el-button type="primary" v-if="multipleSelection.length <= 0" disabled>复位</el-button>
                            <el-button type="primary" v-else @click="reset">复位</el-button>
                            <el-button type="primary" v-if="multipleSelection.length <= 0" disabled>授权</el-button>
                            <el-button type="primary" v-else @click="authorization">授权</el-button>
                            <el-button type="primary" v-if="multipleSelection.length <= 0" disabled>单据</el-button>
                            <el-button type="primary" v-else>单据</el-button>
                            <el-button type="primary" v-if="multipleSelection.length <= 0" disabled>报表</el-button>
                            <el-button type="primary" v-else>报表</el-button>
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
                        <el-table :data="userManagementRow" border @selection-change="handleSelectionChange" @row-contextmenu="rowContextmenu">
                            <el-table-column type="selection" fixed></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column property="userName" label="用户名"></el-table-column>
                            <el-table-column property="name" label="姓名"></el-table-column>
                            <el-table-column property="deptName" label="部门"></el-table-column>
                            <el-table-column property="positionAux" label="职务"></el-table-column>
                            <el-table-column property="locks" label="可用">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="!!scope.row.locks" disabled="disabled"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column property="locks" label="状态">
                                <template slot-scope="scope">
                                    <span style="color: green;" v-if="scope.row.locks == 1">已启用</span>
                                    <span style="color: red;" v-else>已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="updateRow(scope.row.id)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <v-drag :elem="['.template', '.tree-right', '.userManagement']" />
        </div>
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[2,4,7,8,9,10,11]" class="menuBox" @emitFn="emitFn" />
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
    data() {
        return {
            treedata: this.$store.state.userManagementStore.treeData,                           //左侧树形数据（部门列表，来源于职员类别）
            multipleSelection:[],                   //选中行
            defaultProps: {
                children: 'subDepartment',
                label: 'name'
            },
            searchText: '',                         //搜索内容
            userManagementRow: this.$store.state.userManagementStore.staffData,                  //右侧表格数据（用户信息，来源于职员资料）
            selectRowId: [],                        //表格选中当前行的id
            userId: [],                             //表格选中当前行的userid
            userName: [],                           //表格选中当前行的username
            name: [],                               //表格选中当前行的name
            rightMenu: {
                isShowIconMove: false,              //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},                    //右键点击存储的行
                rightKeyRowIndex: '',               //右键点击表格行的索引
            },
            systemId: '',                           //顶级id
            nowTreeId:'',                           //默认展开所有节点
            newdeptId:this.$store.state.userManagementStore.newdeptId,           //当前选中的树节点,并且该Id高亮
            boolean: true,
        }
    },
    watch:{
        userManagementRow(){            
            if(this.boolean){
                this.nowTreeId = this.$store.state.userManagementStore.treeData[0]['id'];
                setTimeout(() => {
                    this.$refs['tree'].setCurrentKey(this.$store.state.userManagementStore.treeData[0]['id']);         //高亮
                })                        
                this.boolean = false;
            }else{
                this.nowTreeId = this.$store.state.userManagementStore.newdeptId;
                setTimeout(() => {
                    this.$refs['tree'].setCurrentKey(this.nowTreeId)
                })
            }            
        },
        //监听搜索框内容
        searchText(newVal) {
            if(!newVal) {
                this.userManagementRow = this.$store.state.userManagementStore.staffData;
            }
        },
    },
    methods: {
        emitFn(n) {                                 //响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refrense();
                    break;
                case 2:         //修改
                    this.updateRow(this.rightMenu['rightKeyRow']['id']);
                    break;
                case 3:         //禁用
                    this.disabedBtnOneList(0, '禁用', this.rightMenu['rightKeyRow']);
                    break;
                case 4:         //启用
                    this.disabedBtnOneList(1, '启用', this.rightMenu['rightKeyRow']);
                    break;
                case 5:         //复位
                    this.resetTwo(this.rightMenu['rightKeyRow']);
                    break;
                case 6:         //授权
                    this.authorizationOne(this.rightMenu['rightKeyRow']);
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
                w = $('.userManagement').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('.userManagement').outerHeight(true) - $(menuBox).outerHeight(true);
            if(x <= 0) x = 0;
            if(x >= w) x = w;
            if(y <= 0) y = 0;
            if(y >= h) y = h;
            menuBox.style.left = x + 'px';
            menuBox.style.top = y + 'px';
            for(var i = 0; i < this.$store.state.userManagementStore.staffData.length; i++) {
                if(this.$store.state.userManagementStore.staffData[i]['id'] == row['id']) {
                    this.rightMenu['rightKeyRowIndex'] = i;
                }
            }
        },
        handleSelectionChange(val) {                //点击表格选中触发
            this.multipleSelection = val;
            this.selectRowId = [];
            this.userId = [];
            this.userName = [];
            this.name = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
                this.userId.push(this.multipleSelection[i]['userId']);
                this.userName.push(this.multipleSelection[i]['userName']);
                this.name.push(this.multipleSelection[i]['name']);
            }
        },
        handleNodeClick(row) {                      //点击左侧树形结构触发该方法
            this.$store.commit('userManagementStore/updateNewdeptId',row['id'])
            this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=' + row['id'] + '&systemId=' + this.$store.state.systemId);
        },
        reset() {                                   //复位
            if(this.multipleSelection.length > 0) {
                if(this.multipleSelection.length < 2){
                    this.$confirm('确定复位用户<'+ this.userName +'>的登录密码吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var type = {
                            headers: {
                                'Content-type': 'application/json;charset=UTF-8'
                            }
                        }
                        this.$http.post(this.$url + 'userManage/updatePassword', JSON.stringify(this.userId), type).then(res => {
                            if(res.data.code == 20001) {
                                this.$message({message: this.userName+'用户的登录密码改为123456', type: 'success', duration: 2000});
                            } else {
                                this.$message.error(this.data.msg);
                            }
                        }).catch(err => {
                            this.$message.error(err);
                        });
                    })
                } else {
                    this.$message({message: '请选择单个用户进行复位', type: 'warning'});
                }
            } else {
                this.$message({message: '请选择你要复位的用户', type: 'warning'});
            }
        },
        resetTwo(row) {                             //单个复位
            this.$confirm('确定复位用户<'+ row['userName'] +'>的登录密码吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                this.$http.post(this.$url + 'userManage/updatePassword', JSON.stringify([row['userId']]), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: row['userName'] +'用户的登录密码改为123456', type: 'success', duration: 2000});
                    } else {
                        this.$message.error(this.data.msg);
                    }
                }).catch(err => {
                    this.$message.error(err);
                });
            })
        },
        authorization() {                           //授权
            if(this.multipleSelection.length > 0) {
                if(this.multipleSelection.length < 2){
                    this.$util.openSubLayerIframe('授权', 13, '55%', '85%', this.$domain + '/#/userManagement/Authorization');
                    parent.obj = {
                        userId: this.userId,
                        userName: this.userName,
                        name: this.name,
                    }
                } else {
                    this.$message({message: '只能选择单个用户进行授权', type: 'warning'});
                }
            } else {
                this.$message({message: '选择你要授权的用户', type: 'warning'});
            }
        },
        authorizationOne(row) {                     //单个授权
            this.$util.openSubLayerIframe('授权', 13, '55%', '85%', this.$domain + '/#/userManagement/Authorization');
            parent.obj = {
                userId: [row['userId']],
                userName: [row['userName']],
                name: [row['name']],
            }
        },
        documents() {                               //单据
            if(this.multipleSelection.length > 0) {
                if(this.multipleSelection.length < 2){
                    this.$util.openSubLayerIframe('审批单据授权设置', 13, '61%', '90%', this.$domain + '/#/userManagement/Documents');
                    parent.obj = {
                        systemId: this.$store.state.systemId,
                        pid: this.pid,
                        selectRowId: this.selectRowId,
                        userId: this.userId,
                        userName: this.userName,
                        name: this.name
                    }
                } else {
                    this.$message({message: '只能选择单个用户进行授权', type: 'warning'});
                }
            } else {
                this.$message({message: '选择你要授权的用户', type: 'warning'});
            }
        },
        useordisuse(locks, msg){                    //禁用和启用
            if(this.multipleSelection.length > 0) {
                var type = {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                if(locks == 0) {       //禁用
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['locks'] == locks) {
                            this.$alert('禁用失败，其中包含已禁用选项，重新选择！', '禁用提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                } else if(locks == 1) {
                    for(var i = 0; i < this.multipleSelection.length; i++) {
                        if(this.multipleSelection[i]['locks'] == locks) {
                            this.$alert('启动失败，其中包含已启动选项，重新选择！', '启动提示', {
                                confirmButtonText: '确定'
                            });
                            return false;
                        }
                    }
                }
                this.$http.post(this.$url + 'userManage/locksUser?locks=' + locks, JSON.stringify(this.userId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: msg + '成功', type: 'success', duration: 2000});
                        setTimeout(() => {
                            this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=' + this.nowTreeId + '&systemId=' + this.$store.state.systemId);
                        }, 1000);
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
        disabedBtnOneList(locks, msg, row) {        //禁用单条
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            if(locks == 0) {
                if(row['locks'] == locks) {
                    this.$message.error('禁用失败！当前数据已是禁用状态');
                    return false;
                }
            }
            if(locks == 1) {
                if(row['locks'] == locks) {
                    this.$message.error('启用失败！当前数据已是启用状态');
                    return false;
                }
            }
            this.$http.post(this.$url + 'userManage/locksUser?locks=' + locks, JSON.stringify([row['userId']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 2000});
                    setTimeout(() => {
                        this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=' + this.nowTreeId + '&systemId=' + this.$store.state.systemId);
                    }, 1000);
                } else {
                    this.$message.error(this.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            });
        },
        refrense(){                                 //刷新
            this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=' + this.nowTreeId + '&systemId=' + this.$store.state.systemId);
        },
        exportExcel(){                              //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'userManage/exportUser',{params: { idList: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success'});
                    window.location.href = this.$url + 'userManage/exportUser?idList=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 2000});
            }
        },
        updateRow($id){                             //修改
            this.$store.commit('userManagementStore/updateRowId', $id);
            this.$util.openSubLayerIframe('用户管理-修改', 13, '45%', '400px', this.$domain + '/#/userManagement/updateUserManagement');
        },
        searchBtn(){                                //搜索
            if(this.searchText) {
                let newArr = [],
                    data = this.$store.state.userManagementStore.searchData,
                    searchText = this.searchText;
                let reg = new RegExp(this.searchText, "g");
                data.forEach(item => {
                    if((reg.test(item['name']) || reg.test(item['userName']) || reg.test(item['positionAux']) || reg.test(item['deptName']) || item['toNamePinyin'] && reg.test(item['toNamePinyin'])) || (item['toSimplePinyin'] && reg.test(item['toSimplePinyin'])) || (item['toPosionPinyin'] && reg.test(item['toPosionPinyin'])) || (item['toSimpleUsernamePinyin'] && reg.test(item['toSimpleUsernamePinyin'])) || (item['toUserNamePinyin'] && reg.test(item['toUserNamePinyin'])) || (item['toSimplePosionPinyin'] && reg.test(item['toSimplePosionPinyin']))) {
                        newArr.push(item);
                    }
                });
                this.userManagementRow = newArr;
            }
        }
    },
    mounted() {
        // this.$store.dispatch('userManagementStore/getTopDepartment',this.$url + 'systemParameters/selectSystemInfo')
        this.$store.dispatch('userManagementStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.$store.state.systemId);
        this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=0' + '&systemId=' + this.$store.state.systemId);
        this.$store.dispatch('userManagementStore/getSearch', this.$url + 'userManage/search');
    }
}
</script>
<style lang="less">
.userManagement{
    .template {
        height: 100%;
        width: 200px;
        background-color: #fff;
        padding: 15px 0;
        box-sizing: border-box;
        border-radius: 6px;
        float: left;
        .template-title {
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
    .table { 
        height: calc(100% - 42px) !important;
        .el-table__body-wrapper {
            overflow-y: auto !important; height: calc(100% - 41px) !important;
        }
    }
    .el-select-dropdown__wrap{
        max-height: 240px !important;
    }
    .el-transfer-panel{
        width: 270px !important;
        .el-transfer-panel__header{
            height: 35px !important;line-height: 35px !important;
            .el-checkbox{
                height: 35px !important;
            }
        }
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
        background-color: #409EFF !important;border-color: #409EFF !important;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
        border-color: #fff !important;
    }
    .el-tabs__header{
        margin: -10px 0 0px !important;
    }
    .el-tabs__content{
        display: flex;justify-content: center;
    }
    .layui-layer-content{
        height: calc(100% - 55px) !important;
    }
}
</style>
<style lang="less" scoped>
    .userManagement{height: 100%;overflow:hidden;min-width: 1100px;}
    .userManagement .template .el-tree {height: calc(100% - 36px) !important;overflow-y: auto;}
    .updateRow {
        height: 350px;
        overflow-y: auto;
    }
    .readerRow {
        height: 350px;
        overflow-y: auto;
    }
    .documents {
        height: 100%;
        .documentsForm{
            background: #fff;
            padding: 8px 0px;
            border-radius: 5px;
            .el-form-item--mini.el-form-item{
                width: auto !important;
                margin-bottom: 0px !important;
            }
        }
    }
    .tree-right .block-area{min-width: 1000px;}
</style>

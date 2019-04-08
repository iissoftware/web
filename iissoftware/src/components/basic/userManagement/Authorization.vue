<template>
    <div class="operatorAuthority">
        <el-form :inline="true" :model="readerRowData" ref="readerRowForm" size="mini" class="operatorForm" status-icon>
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="readerRowData.userName" readonly></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="readerRowData.name" readonly></el-input>
            </el-form-item>
        </el-form>
        <div class="operatorDiv" style="height: calc(100% - 80px) !important;min-width: 669px;overflow-x: auto;">
            <el-tabs v-model="activeName2" class="operatorTabs" style="background: #fff;">
                <el-tab-pane label="所属用户组" name="first" class="tabTitle">
                    <div style="height: calc(100% - 10px) !important;">
                        <el-transfer v-model="value1" :props="{key: 'id',label: 'name'}" :titles="['未赋予用户组', '已赋予用户组']" :data="userGroupsData" @left-check-change="leftSave" @right-check-change="rightSave" @change="changeSave"></el-transfer>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="模块权限" name="second" class="tabTitle">
                    <div class="templateO">
                        <div class="templateO-title">
                            <span>模块权限</span>
                            <div class="templateO-btn" style="float: right">
                                <div @click="handleCheckAllEmpty" style="cursor:pointer;"><img src="../../../assets/images/empty.png" alt="" title="清空"></div>
                                <div @click="handleCheckAllChange" style="cursor:pointer;"><img src="../../../assets/images/checkAll.png" alt="" title="全选"></div>
                                <div @click="setCheckedKeys" style="cursor:pointer;"><img src="../../../assets/images/closed.png" alt="" title="合拢"></div>
                                <div @click="setCheckedNodes" style="cursor:pointer;"><img src="../../../assets/images/an.png" alt="" title="展开"></div>
                            </div>
                        </div>
                        <el-tree :data="templeteTreeData" :default-expand-all="defaultExpand" ref="templeteTreeRef" node-key="id" show-checkbox :accordion="false" :props="templleteProps" :highlight-current="true"></el-tree>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="客户查看权限" name="third" class="tabTitle">
                    <div class="templateO">
                        <div class="templateO-title">
                            <span>客户查看权限</span>
                            <div class="templateO-btn" style="float: right">
                                <div @click="emptyCustomer" style="cursor:pointer;"><img src="../../../assets/images/empty.png" alt="" title="清空"></div>
                                <div @click="addCustomerAuthorizedData" style="cursor:pointer;"><img src="../../../assets/images/icon-add.png" alt="" title="新增"></div>
                                <div @click="deleteAuthorization(customerSelectRowId)" style="cursor:pointer;"><img src="../../../assets/images/icon-del.png" alt="" title="删除"></div>
                                <div @click="allAuthorization" style="cursor:pointer;"><img src="../../../assets/images/allAuthorized.png" alt="" title="全部授权"></div>
                                <div @click="customerRefrens" style="cursor:pointer;"><img src="../../../assets/images/icon-refresh.png" alt="" title="刷新"></div>
                            </div>
                        </div>
                        <el-table :show-header="false" :highlight-current-row="true" :data="CustomerPermissionRow" @row-click="handleSelectionChange" style="width: 100%">
                            <el-table-column property="name"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div style="text-align: center;">
            <el-button v-if="activeName2 == 'third'" type="primary" class="operatorBtn" @click="addCustomerAuthorized">保存</el-button>
            <el-button v-if="activeName2 == 'second'" type="primary" class="operatorBtn" @click="saveTempleteData">保存</el-button>
            <el-button v-if="activeName2 == 'first'" type="primary" :disabled="openDisabled" class="operatorBtn" @click="saveUserGroupManageData">保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            readerRowData:{                         //存储授权数据
                userName: '',
                name: ''
            },
            activeName2: 'first',                   //授权默认显示第一个tab
            userGroupsData: [],                     //授权所属用户组数据
            value1: [],
            templeteTreeData: [],
            templleteProps: {
                children: 'submenuList',
                label: 'name'
            },
            defaultExpand:true,                     //默认展开所有节点
            checkedId:[],                           //勾选到的id
            halfCheckedId:[],                       //模块权限半选中的id
            arr:[],                                 //存放所有树节点的id，用于全选函数
            CustomerPermissionRow: this.$store.state.userManagementStore.CustomerPermissionRow,//客户查看权限数据
            customerSelectRowId:[],
            openDisabled: false,
        }
    },
    methods: {
        handleSelectionChange(row, event, column) {            //点击表格选中触发
            this.customerSelectRowId = row['id'];
        },
        handleCheckAllChange(val){                              //模块权限的全选
            this.$refs.templeteTreeRef.setCheckedKeys(this.arr);
            this.checkedId = this.arr;
        },
        handleCheckAllEmpty(){                                  //模块权限的清空
            this.$refs.templeteTreeRef.setCheckedKeys([]);
            this.checkedId = [];
        },
        setCheckedKeys() {                                      //模快权限的合拢事件
            this.defaultExpand=false;
            for(var i=0;i<this.$refs.templeteTreeRef.store._getAllNodes().length;i++){
                this.$refs.templeteTreeRef.store._getAllNodes()[i].expanded=this.defaultExpand;
            }
        },
        setCheckedNodes() {                                     //模快权限的展开事件
            this.defaultExpand=true; //展开所有节点
            for(var i=0;i<this.$refs.templeteTreeRef.store._getAllNodes().length;i++){
                this.$refs.templeteTreeRef.store._getAllNodes()[i].expanded=this.defaultExpand;
            }
        },
        getTempleteData(){                                      //获取模块权限的数据
            this.$http.get(this.$url + 'menu/selectObject').then(res => {
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.templeteTreeData = res.data.data;
                        for(let item of res.data.data){
                            this.arr.push(item.id)
                        };
                        this.disabledFn(res.data.data);
                    }, 500);
                } else {
                    // this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        getCheckTempleteData(){                                 //获取模块权限的数据
            this.$http.get(this.$url + 'userManage/findUserMenu?userId=' + this.userId).then(res => {
                this.$refs.templeteTreeRef.setCheckedKeys(res.data.data)
            }).catch(err => {
                // this.$message.error(err);
            })
        },
        saveTempleteData(){                                     //保存模块权限
            this.checkedId = this.$refs.templeteTreeRef.getCheckedKeys();//全选的
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            this.$http.post(this.$url + 'userManage/saveUserMenu?userId=' + this.userId + '&systemId=' + this.$store.state.systemId,JSON.stringify(this.checkedId),type).then(res => {
                if(res.data.code == 20001) {
                    this.$store.dispatch('userManagementStore/getSearch', this.$url + 'userManage/search');
                    this.$message({message: '保存成功', type: 'success', duration: 2000});
                    this.halfCheckedId = [];
                    setTimeout(() => {
                        this.getTempleteData();
                        this.getCheckTempleteData();
                        this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=' + this.$store.state.userManagementStore.newdeptId + '&systemId=' + this.$store.state.systemId);
                    }, 500)
                }else{
                    this.$message({message: res.data.msg,type:'error'});
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        allAuthorization(){                                     //客户全部授权
            this.$http.get(this.$url + 'userManage/findAllClient').then(res => {
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.CustomerPermissionRow = res.data.data;
                    }, 500);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        customerRefrens(){                                      //客户查看权限刷新
             this.$store.dispatch('userManagementStore/getCustomerPermission', this.$url + 'userManage/findClientPower?userId=' + this.userId);
        },
        addCustomerAuthorized(){                                //客户查看权限保存
            let clientids = [];
            for(var i = 0; i < this.CustomerPermissionRow.length; i++) {
                clientids.push(this.CustomerPermissionRow[i]['id']);
            }
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            this.$http.post(this.$url + 'userManage/saveEmpClient?userId=' + this.userId + '&systemId=' + this.$store.state.systemId, JSON.stringify(clientids),type).then(res => {
                if(res.data.code === 20001) {
                    this.$store.dispatch('userManagementStore/getSearch', this.$url + 'userManage/search');
                    this.$message({message: '保存成功', type: 'success'});
                    setTimeout(() => {
                        this.$store.dispatch('userManagementStore/getCustomerPermission', this.$url + 'userManage/findClientPower?userId=' + this.userId);
                        this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=' + this.$store.state.userManagementStore.newdeptId + '&systemId=' + this.$store.state.systemId);
                    }, 500);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        emptyCustomer(){                                        //客户查看权限清空
            this.CustomerPermissionRow = [];
        },
        addCustomerAuthorizedData(){                            //客户查看权限新增
            let that = this;
            parent.layer.open({
                type: 2,
                title: '新增客户查看权限',
                shade: 0.3,
                shadeClose: true,
                zIndex: 13,
                maxmin: true,
                anim: 0,
                fixed: true,
                btn: ['确定'],
                area: ['450px', '470px'],
                content: this.$domain + '/#/userManagement/addCustomerAuthorized'
            });
        },
        deleteAuthorization(arrs){                              //客户查看权限删除
            let arr = this.CustomerPermissionRow;
            arr.forEach((item, index) => {
                if(item['id'] == arrs) {
                    arr.splice(index, 1)
                }
            });
        },
        getUserGroupManageData(){                               //获取所有用户组数据
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            this.$http.get(this.$url + 'userGroup/selectObject?systemId=' + this.$store.state.systemId,type).then(res => {
                if(res.data.code === 20001) {
                    this.userGroupsData = res.data.data;
                } else {
                    // this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        getBelongsUserGroupManageData(){                        //获取该用户所属的用户组数据
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            this.$http.get(this.$url + 'userManage/findUserGroupByuid?userId=' + this.userId,type).then(res => {
                this.value1 = []
                if(res.data.code === 20001) {
                    for(let i = 0;i < res.data.data.length;i++){
                        this.value1.push(res.data.data[i]['id']);
                    }
                } else {
                    // this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        leftSave(value){
            if(value.length > 0){
                this.openDisabled = true;
            }else{
                this.openDisabled = false;
            }
        },
        rightSave(value){
            let that = this;
            if(value.length > 0){
                this.openDisabled = true
                // for(let i = 0;i < value.length;i++){
                //     if(value[i] == '870297681'){
                //         this.$confirm('确定撤销系统管理员的身份吗?', '提示', {
                //             confirmButtonText: '确定',
                //             cancelButtonText: '取消',
                //             type: 'warning'
                //         }).then(() => {
                            
                //         }).catch(err => {
                //             console.log('aaaaa',$(".el-checkbox__input").is(':checked'));
                //             $(".el-checkbox__input").removeClass('is-checked')
                //             if($(".el-checkbox__input").eq(0).prop("checked") == false){
                //                 $(".el-transfer__button").eq(0).addClass('is-checked')
                //                 console.log('bbbb',$(".el-transfer__button").eq(0).prop("disabled"))
                //             }
                //         })
                //     }
                // }
            }else{
                this.openDisabled = false;
            }
        },
        changeSave(value, direction, movedKeys){
            if(value){
                this.openDisabled = false;
            }else{
                this.openDisabled = true;
            }
        },
        saveUserGroupManageData(){                              //所属用户组
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            this.$http.post(this.$url + 'userManage/saveUserGroup?userId=' + this.userId + '&systemId=' + this.$store.state.systemId,JSON.stringify(this.value1),type).then(res => {
                if(res.data.code == 20001) {
                    this.$store.dispatch('userManagementStore/getSearch', this.$url + 'userManage/search');
                    this.$message({message: '保存成功', type: 'success', duration: 2000});
                    setTimeout(() => {
                        this.getUserGroupManageData();
                        this.getBelongsUserGroupManageData();
                        this.$store.dispatch('userManagementStore/getStaffData', this.$url + 'userManage/findAllUser?id=' + this.$store.state.userManagementStore.newdeptId + '&systemId=' + this.$store.state.systemId);
                    }, 500)
                }else{
                    this.$message({message: res.data.msg,type:'error'});
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        disabledFn(arr) {
            if(arr.length > 0) {
                arr.forEach(item => {
                    if(item['name'] == '用户组管理') {
                        item['disabled'] = true;
                    } else {
                        let submenuList = item['submenuList'];
                        if(submenuList && item['submenuList'].length > 0) {
                            this.disabledFn(item['submenuList']);
                        }
                    }
                })
            }
        },
    },
    mounted(){
        this.userId = parent.obj.userId[0];
        this.readerRowData['userName'] = parent.obj.userName[0];
        this.readerRowData['name'] = parent.obj.name[0];
        this.$store.dispatch('userManagementStore/getCustomerPermission', this.$url + 'userManage/findClientPower?userId=' + this.userId);
        setTimeout(() => {
            this.CustomerPermissionRow = this.$store.state.userManagementStore.CustomerPermissionRow
        });
        this.getTempleteData();
        this.getCheckTempleteData();
        this.getUserGroupManageData();
        this.getBelongsUserGroupManageData();
    }
}
</script>
<style lang="less">
.operatorAuthority {
    height: 100%;
    .operatorForm{
        background: #fff;
        padding: 8px 0px;
        border-radius: 5px 5px 0px 0px;
        padding-left: 10px;
        min-width: 659px;
        .el-form-item--mini.el-form-item{
            width: auto !important;
            margin-bottom: 0px !important;
        }
    }
    .operatorBtn{
        padding: 9px 112px;
    }
    .templateO {
        height: calc(100% - 42px) !important;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 6px;
        width: 100%;
        .templateO-title {
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            font-size: 15px;
            margin-bottom: 10px;
            .templateO-btn{
                float: right;
                div{
                    display: inline-block;
                    margin-left: 10px;
                }
            }
        }
        .el-tree{
            height: calc(100% - 10px) !important;
            overflow-y: auto;
        }
        .templateO-li{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #797979;
            height: calc(100% - 10px) !important;
            overflow-y: auto;
            li{
                margin-bottom: 5px;
            }
        }
    }
    .el-tabs__content{
        height: calc(100% - 55px) !important;
    }
    .el-transfer{
        height: 100% !important;
        .el-transfer-panel{
            width: 260px !important;
            height: calc(100% - 10px) !important;
            .el-transfer-panel__body{
                height: calc(100% - 40px) !important;
                .el-transfer-panel__list{
                    height: calc(100%) !important;
                }
            }
        }
    }
    .el-tabs__nav-scroll{
        padding-left: 20px
    }
    .tabTitle{
        padding: 5px 20px;display: flex;justify-content: center;
    }
    .el-table__body{
        width: 100% !important;
    }
    .el-table td{
        border-bottom: 0px !important;
        padding: 3px 0px !important;
    }
    .el-input--mini .el-input__inner{
        height: 28px !important;
        line-height: 28px !important;
    }
    .el-checkbox.is-disabled + span {
        cursor: not-allowed !important;
        color: #aaa8a8 !important;
    }
}
</style>

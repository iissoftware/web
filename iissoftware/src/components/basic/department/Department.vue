<template>
    <div class="dFront">
        <div class="department">
            <v-tree/>
            <div class="tree-right">
                <div class="block-area">
                    <div class="btn-box">
                        <el-input v-model.trim="searchText" placeholder="输入搜索内容" class="sousuo-input" @keyup.enter.native="search"></el-input>
                        <el-button type="primary" class="sousuo" @click="search">查询</el-button>
                        <div class="btn-group">
                            <el-button type="info">刷新</el-button>
                            <el-button type="primary" v-if="!systemId" disabled>新增</el-button>
                            <el-button type="primary" v-else @click="add">新增</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                            <el-button type="danger" v-else @click="del">删除</el-button>
                            <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                            <el-button type="danger" v-else @click="disabedBtn(0, '禁用')">禁用</el-button>
                            <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                            <el-button type="success" v-else @click="disabedBtn(1, '启用')">启用</el-button>
                            <el-button-group class="btn-other">
                                <el-button title="导出" v-if="multipleSelection.length <= 0" disabled>
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button title="导出" v-else @click="exportExcel">
                                    <img src="../../../assets/images/export.png" alt="">
                                </el-button>
                                <el-button title="导入">
                                    <el-upload class="upload-demo" :action="$url" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
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
                </div>
                <!-- 表格数据 -->
                <div class="block-area block-area-full">
                    <div class="table">
                        <el-table :data="tableData" border @selection-change="selectionChange" @row-contextmenu="rowContextmenu">
                            <el-table-column type="selection" fixed></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column property="name" label="名称"></el-table-column>
                            <el-table-column property="category" label="部门类型">
                                <template slot-scope="scope">
                                    <span v-for="(item, index) in departTypeData" :key="index">{{ item['id'] == scope.row.category ? item['detailedName'] : '' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="supervisor" label="部门主管">
                                <template slot-scope="scope">
                                    <span v-for="item in supervisor" :key="item['id']">
                                        <i v-if="item['id'] == scope.row.supervisor" style="font-style: normal">{{ item['name'] }}</i>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column property="remark" label="备注"></el-table-column>
                            <el-table-column property="locks" label="状态">
                                <template slot-scope="scope">
                                    <span style="color: green;" v-if="scope.row.locks == 1">已启用</span>
                                    <span style="color: red;" v-else>已禁用</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="update(scope.row.id)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <v-drag :elem="['.tree-left', '.tree-right', '.department']" />
        </div>
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn" />
    </div>
</template>
<script>
import Tree from './tree'
import MenuBox from '../../MenuBox'
import Drag from '../../drag'
export default {
    components: {
        'v-tree': Tree,
        'v-menu-box': MenuBox,
        'v-drag': Drag
    },
    data() {
        return {
            searchText: '',
            tableData: this.$store.state.departmentStore.tableData,
            departTypeData: this.$store.state.departmentStore.departTypeData,     //部门类型
            supervisor: this.$store.state.departmentStore.employee,     //部门主管
            multipleSelection: [],          //选中的行集合
            selectRowId: [],
            systemId: this.$store.state.systemId,
            rightMenu: {
                isShowIconMove: false,      //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},        //右键点击存储的行
                rightKeyRowIndex: '',       //右键点击表格行的索引
            },
        }
    },
    watch: {
        currentItem(newVal) {
            this.currentItem = newVal;
        },
        searchText(newVal) {
            if(!newVal) {
                this.tableData = this.$store.state.departmentStore.tableData;
            }
        }
    },
    methods: {
        emitFn(n) {                            //响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refresh();
                    break;
                case 2:         //新增
                    this.add();
                    break;
                case 3:         //修改
                    this.update(this.rightMenu['rightKeyRow']['id']);
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
                    this.tableMove(n, this.tableData);
                    break;
                case 9:         //下移
                    this.tableMove(n, this.tableData);
                    break;
                case 10:         //置顶
                    this.tableMove(n, this.tableData);
                    break;
                case 11:        //置底
                    this.tableMove(n, this.tableData);
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
                w = $('.department').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('.department').outerHeight(true) - $(menuBox).outerHeight(true);
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
        tableMove(n, data) {
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
        selectionChange(val) {
            this.multipleSelection = val;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        search() {          //关键字搜索
            if(this.searchText) {
                let reg = new RegExp(this.searchText, 'g'),
                    newArr = [],
                    data = this.$store.state.departmentStore.searchAllResult;
                if(data.length > 0) {
                    data.forEach(item => {
                        if(reg.test(item['name']) || (item['categoryName'] && reg.test(item['categoryName'])) || (item['supervisorName'] && reg.test(item['supervisorName'])) || (item['toPinName'] && reg.test(item['toPinName'])) || (item['toPinParentName'] && reg.test(item['toPinParentName'])) || (item['toPinCategoryName'] && reg.test(item['toPinCategoryName'])) || (item['toPinSupervisorName'] && reg.test(item['toPinSupervisorName']))) {
                            newArr.push(item);
                        }
                    });
                    this.tableData = newArr;
                }
            }
        },
        refresh() {

        },
        add() {     //新增
            let that = this;
            parent.layer.open({
                type: 2,
                title: '部门资料-新增',
                shade: 0.3,
                shadeClose: true,
                zIndex: 13,
                maxmin: true,
                anim: 0,
                fixed: true,
                btn: ['确定'],
                area: ['600px', '400px'],
                content: this.$domain + '/#/department/addRow',
                success: function() {
                    $(':focus').blur();
                },
                end: function() {   
                    that.$store.commit('departmentStore/updateExpandNodeId', that.systemId);
                }
            });
        },
        update(id) {
            this.$store.commit('departmentStore/updateRowId', id);
            let that = this;
            parent.layer.open({
                type: 2,
                title: '部门资料-修改',
                shade: 0.3,
                shadeClose: true,
                zIndex: 13,
                maxmin: true,
                anim: 0,
                fixed: true,
                btn: ['确定'],
                area: ['600px', '400px'],
                content: this.$domain + '/#/department/updateRow',
                success: function() {
                    $(':focus').blur();
                },
                end: function() {   
                    // that.$store.commit('departmentStore/updateExpandNodeId', that.systemId);
                }
            });
        },
        del() {         //删除
            let type = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let arr = this.multipleSelection;
            arr.forEach(item => {
                if(item['subDepartment'].length > 0) {
                    this.$message({message: '删除失败，该节点包含子节点', duration: 2000, type: 'warning'});
                    return false;
                }
                this.$confirm('确定删除选中部门?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.$url + 'department/deleteById', JSON.stringify(this.selectRowId), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: '删除成功', type: 'success', duration: 2000});
                            //更新要展开高亮的节点id
                            this.$store.commit('departmentStore/updateExpandNodeId', this.multipleSelection[0]['parentId'] == 0 ? this.systemId : this.multipleSelection[0]['parentId']);
                            setTimeout(() => {
                                this.$store.dispatch('departmentStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.systemId);
                            }, 1000);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            });
        },
        deleteSingleRow(row) {
            var type = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            this.$confirm('确定删除该条数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$url + 'department/deleteById', JSON.stringify([row['id']]), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '删除成功', type: 'success', duration: 2000});
                        //更新要展开高亮的节点id
                        this.$store.commit('departmentStore/updateExpandNodeId', parseInt(row['parentId']) == 0 ? this.systemId : parseInt(row['parentId']));
                        setTimeout(() => {
                            this.$store.dispatch('departmentStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.systemId);
                        }, 1000)
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }).catch(() => {
                this.$message({message: '已取消删除', type: 'info', duration: 2000});
            })
        },
        disabedBtn(status, msg) {               //禁用、启用
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
                        this.$alert('启动失败，其中包含已启动选项，重新选择！', '启动提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                }
            }
            this.$http.post(this.$url + 'department/enable?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 2000});
                    //更新要展开高亮的节点id
                    this.$store.commit('departmentStore/updateExpandNodeId', this.multipleSelection[0]['parentId'] == 0 ? this.systemId : this.multipleSelection[0]['parentId']);
                    setTimeout(() => {
                        this.$store.dispatch('departmentStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.systemId);
                    }, 1000);
                }
            });
        },
        disabedBtnOneList(status, msg, row) {   //禁用、启用单条
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            if(status == 0) {
                if(row['locks'] == status) {
                    this.$alert('禁用失败，其中包含已禁用选项，重新选择！', '禁用提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                } else {
                    this.$http.post(this.$url + 'department/enable?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: msg + '成功', type: 'success', duration: 2000});
                            //更新要展开高亮的节点id
                            this.$store.commit('departmentStore/updateExpandNodeId', row['parentId'] == 0 ? this.systemId : row['parentId']);
                            setTimeout(() => {
                                this.$store.dispatch('departmentStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.systemId);
                            }, 1000);
                        }
                    });
                }
            } else if(status == 1) {
                if(row['locks'] == status) {
                    this.$alert('启动失败，其中包含已启动选项，重新选择！', '启动提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                } else {
                    this.$http.post(this.$url + 'department/enable?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                        if(res.data.code == 20001) {
                            this.$message({message: msg + '成功', type: 'success', duration: 2000});
                            this.$store.commit('departmentStore/updateExpandNodeId', row['parentId'] == 0 ? this.systemId : row['parentId']);
                            setTimeout(() => {
                                this.$store.dispatch('departmentStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.systemId);
                            }, 1000);
                        }
                    });
                }
            }
        },
        exportExcel() {                         //导出
            var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
            this.$http.get(this.$url + 'department/export',{params: { idList: idSting }}).then(res => {
                this.$message({message: '导出成功', type: 'success'});
                window.location.href = this.$url + 'department/export?list=' + idSting;          //导出时触发
            }).catch(err => {
                this.$message.error(err);
            });
        },
        importExcelSuccess(res) {               //导入成功后回调
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success'});
                setTimeout(() => {
                    this.$store.dispatch('departmentStore/getTreeData', this.$url + 'department/selectObject?systemId=' + this.systemId);
                }, 1000)
            }
        }
    },
    created() {
        this.$store.dispatch('departmentStore/getDepartTypeData', this.$url + '/auxiliaryInfoAllCategory/selectByDepartment');
        this.$store.dispatch('departmentStore/getEmployee', this.$url + 'employee/findEmployeeByName');
        this.$store.dispatch('departmentStore/getSearchResult', this.$url + 'department/selectObjectAll?systemId=' + this.systemId);
    }
}
</script>
<style>
    .department .el-tabs__content {
        height: calc(100% - 40px) !important;
    }
</style>

<style scoped>
    .department {min-width: 1000px;overflow: hidden;height: 100%;}
    .tree-right {
        height: 100%;
        width: calc(100% - 215px);
        overflow: hidden;
        float: right;
        border-radius: 6px !important;
    }
    .tree-right .block-area {min-width: 1000px;}
    .tree-right .block-area:nth-of-type(1) {height: auto !important;}
    .tree-right .block-area:nth-of-type(2) {height: calc(100% - 45px) !important;}
</style>



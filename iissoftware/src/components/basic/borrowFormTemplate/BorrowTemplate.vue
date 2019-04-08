<template>
    <div class="borrowTemplate">
        <div class="block-area">
            <div class="btn-box">
                <el-input v-model="content" class="sousuo-input" placeholder="输入搜索内容" @keyup.enter.native="onSubmit"></el-input>
                <el-button type="primary" class="sousuo" @click.native="onSubmit">查询</el-button>
                <div class="btn-group">
                    <el-button type="info" @click="refresh">刷新</el-button>
                    <el-button type="primary" @click="add">新增</el-button>
                    <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                    <el-button class="orange" v-else @click="remove">删除</el-button>
                    <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                    <el-button type="danger" v-else @click="useordisuse(0,'禁用')">禁用</el-button>
                    <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                    <el-button type="success" v-else @click="useordisuse(1,'启用')">启用</el-button>
                    <el-button-group class="btn-other">
                        <el-button title="导出" @click="exportForm">
                            <img src="../../../assets/images/export.png" alt="">
                        </el-button>
                        <el-button title="导入">
                            <el-upload class="upload-demo" :action="$url + 'loanCategory/importLoanCategory?systemId=' + systemId" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
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
                <el-table :data="tableData" border @selection-change="handleSelectionChange" class="tb-edit" highlight-current-row @row-contextmenu="rowContextmenu"> 
                    <el-table-column type="selection" min-width="55" fixed></el-table-column>
                    <el-table-column property="loanCategory" label="借款类别"></el-table-column>
                    <el-table-column property="levelOneSubjectName" label="一级科目"></el-table-column>
                    <el-table-column  property="levelTwoSubjectName" label="二级科目">
                        <!-- <template slot-scope="scope">
                            <el-input v-model="scope.row.levelTwoSubject" readonly @click.native="chooseTwo" placeholder="二级科目"></el-input><span>{{scope.row.levelTwoSubject}}</span>
                        </template>                         -->
                    </el-table-column>
                    <el-table-column property="levelThreeSubjectName" label="三级科目"></el-table-column>
                    <el-table-column property="levelFourSubjectName" label="四级科目"></el-table-column>
                    <el-table-column property="remark" label="备注"></el-table-column>
                    <el-table-column property="state" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state == 1" style="color: green;">已启用</span>
                            <span v-if="scope.row.state == 0" style="color: #f00;">已禁用</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button type="text" size="small" @click="lookData(scope.row.id)">查看</el-button> -->
                            <el-button type="text" size="small" @click="updateData(scope.row.id)">修改</el-button>                                   
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div> 
        <!-- 自定义右键菜单 -->
        <v-menu-box :isShow.sync="rightMenu['isShowIconMove']" :disabledItem="[12,13]" class="menuBox" @emitFn="emitFn" />
    </div>
</template>

<script>
import MenuBox from '../../MenuBox'
export default {
    components: {
        'v-menu-box': MenuBox
    },
    data(){
        return{
            content:'',                                                 //搜索的内容
            tableData:this.$store.state.borrowTemplateStore.tableData,  //表格数据
            multipleSelection:[],
            selectRowId:[],
            rightMenu: {                                                //右键
                isShowIconMove: false,                            //是否显示上移、下移、置顶、置底 弹窗
                rightKeyRow: {},                                  //右键点击存储的行
                rightKeyRowIndex: '',                             //右键点击表格行的索引
            },
            systemId:this.$store.state.systemId,                        //系统参数id
        }
    },
    watch:{
        content(newVal) {    //查询
            if(!newVal) {
                this.tableData = this.$store.state.borrowTemplateStore.tableData;
            }
        },
    },
    methods:{
        handleSelectionChange(row){                     //表格勾选
            this.multipleSelection = row;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        refresh(){                                      //刷新
            this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
            this.$message({type:'success',message:'刷新成功',duration:1500})
        },
        onSubmit(){                                     //查询按钮
            if(this.content) {
                let arr = this.$store.state.borrowTemplateStore.tableData,
                    newArr = [],
                    reg = new RegExp(this.content, 'g');                    
                arr.forEach(item => {
                    let toNamePinyin = item['toNamePinyin'],
                        loanCategory = item['loanCategory'],
                        toSimplePinyin = item['toSimplePinyin'];
                    if( (toNamePinyin && reg.test(toNamePinyin)) || (loanCategory && reg.test(loanCategory)) || (toSimplePinyin && reg.test(toSimplePinyin))) {
                        newArr.push(item);
                    }

                });
                this.tableData = newArr;                //如果查到结果，就更新表格数据            
            } else {
                this.$message({message: '输入搜索的内容', type: 'warning'});
            }
        },
        importExcelSuccess(res){                        //导入回调函数
            console.log(res,'import')
            if(res.code === 20001) {
                this.$message({message: '导入成功', type: 'success',duration:1500});
                setTimeout(() => {
                    this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
                }, 1000);
            }else{
                this.$message({message: res.msg, type: 'error',duration:2000});
            }
        },
        exportForm(){                                   //导出
            if(this.multipleSelection.length > 0) {
                var idSting = this.selectRowId.join(',');           //将[1,2,3]格式转为 "1,2,3"
                this.$http.get(this.$url + 'loanCategory/exportLoanCategory',{params: { idList: idSting }}).then(res => {
                    this.$message({message: '导出成功', type: 'success',duration:1500});
                    window.location.href = this.$url + 'loanCategory/exportLoanCategory?idList=' + idSting;          //导出时触发
                }).catch(err => {
                    this.$message.error(err);
                })
            } else {
                this.$message({message: '选择你要导出的数据', type: 'warning', duration: 1500});
            }
        },
        add(){                                          //新增
            this.$util.openSubLayerIframe('借款类别审批单', 20, '800px', '500px', this.$domain + '/#/borrowFormTemplate/add');
        },
        // lookData($id){                                  //查看页面
        //     this.$util.openSubLayerIframe('借款类别模板-查看', 10, '70%', '80%', this.$domain + '/#/borrowFormTemplate/look');
        // },
        updateData($id){                                //修改页面
            this.$store.commit('borrowTemplateStore/updateRowId', $id);
            this.$util.openSubLayerIframe('借款类别模板-修改', 10, '800px', '500px', this.$domain + '/#/borrowFormTemplate/update');
        },
        remove(){                                       //删除
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
                this.$http.post(this.$url + 'loanCategory/deleteLoanCategory', JSON.stringify(this.selectRowId), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '数据删除成功', type: 'success', duration: 1500});
                        setTimeout(() => {
                            this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }).catch(() => {
                this.$message({message: '已取消删除',type:'info'});          
            });
        },
        deleteSingleRow($id) {                          //右键删除
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
                this.$http.post(this.$url + 'loanCategory/deleteLoanCategory', JSON.stringify([$id]), type).then(res => {
                    if(res.data.code == 20001) {
                        this.$message({message: '删除成功', type: 'success', duration: 1500});
                        setTimeout(() => {
                            this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }).catch(() => {
                this.$message({message: '已取消删除',type:'info',duration:1500});          
            });
        },
        useordisuse(status, msg){                       //禁用启用
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
            }else if(status == 1) {
                for(var i = 0; i < this.multipleSelection.length; i++) {
                    if(this.multipleSelection[i]['state'] == status) {
                        this.$alert('启用失败，其中包含已启动选项，重新选择！', '启动提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                }
            }
            this.$http.post(this.$url + 'loanCategory/startOrDisableLoanCategory?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {             
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 1500});
                    setTimeout(() => {
                        this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
                    }, 500);
                } else {
                    this.$message.error(this.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            });
        },
        disabedBtnOneList(status, msg, row) {           //禁用单条
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
            this.$http.post(this.$url + 'loanCategory/startOrDisableLoanCategory?state=' + status, JSON.stringify([row['id']]), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 1500});
                    setTimeout(() => {
                        this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
                    }, 500);
                }
            });
        },
        emitFn(n) {                                     //响应子组件传过来的函数
            switch(n) {
                case 1:         //刷新
                    this.refresh();
                    break;
                case 2:         //新增
                    this.add();
                    break;
                case 3:         //修改
                    this.updateData(this.rightMenu['rightKeyRow']['id']);
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
        rowContextmenu(row, event) {                    //某一行右键点击时触发
            event.preventDefault();     //禁止默认事件
            this.rightMenu['isShowIconMove'] = true;
            this.rightMenu['rightKeyRow'] = row;
            var menuBox = document.querySelector(".menuBox");
            let x = event.clientX,
                y = event.clientY,
                w = $('.borrowTemplate').outerWidth(true) - $(menuBox).outerWidth(true),
                h = $('.borrowTemplate').outerHeight(true) - $(menuBox).outerHeight(true);
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
        tableMove(n) {                                  //上移下移
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
    },
    mounted(){
        this.$store.dispatch('borrowTemplateStore/getTableData', this.$url + 'loanCategory/findLoanCategory');
    }
}
</script>

<style lang="less">
    .borrowTemplate{
        .tb-edit .el-input {
            display: none
        }
        .tb-edit .current-row .el-input {
            display: block
        }
        .tb-edit .current-row .el-input+span {
            display: none
        }
    }
    
</style>


<style lang="less" scoped>
    .borrowTemplate {
        height: 100%;
        overflow: hidden;
        // min-width: 1000px;
    }
</style>



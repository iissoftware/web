<template>
    <div class="accountList">
        <div class="block-area">
            <el-input class="sousuo-input" v-model.trim="searchText" placeholder="输入搜索内容" @keyup.enter.native="search"></el-input>
            <el-button type="primary" class="sousuo" @click="search">查询</el-button>
            <div class="btn-group">
                <el-button type="info" @click="refresh">刷新</el-button>
                <el-button type="primary" @click="add">新增</el-button>
                <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>删除</el-button>
                <el-button type="danger" v-else @click="del">删除</el-button>
                <el-button type="danger" v-if="multipleSelection.length <= 0" disabled>禁用</el-button>
                <el-button type="danger" v-else @click="disabedBtn(0, '禁用')">禁用</el-button>
                <el-button type="success" v-if="multipleSelection.length <= 0" disabled>启用</el-button>
                <el-button type="success" v-else @click="disabedBtn(1, '启用')">启用</el-button>
                <el-button type="success" v-if="multipleSelection.length <= 0" disabled>备份</el-button>
                <el-button type="success" v-else>备份</el-button>
                <el-button type="success">恢复</el-button>
                <el-button type="success" v-if="multipleSelection.length != 1" disabled>查看</el-button>
                <el-button type="success" v-else @click="check">查看</el-button>
                <el-button type="success" v-if="multipleSelection.length != 1" disabled>修改</el-button>
                <el-button type="success" v-else @click="update">修改</el-button>
                <el-button-group class="btn-other">
                    <el-button title="导出">
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
        <div class="block-area">
            <div class="table">
                <el-table :data="tableData" border @selection-change="selectionChange" @row-dblclick="dblClick" style="width: 100%">
                    <el-table-column type="selection" fixed></el-table-column>
                    <el-table-column label="当前账套" width="80">
                        <template slot-scope="scope">
                            <span class="currentAccount" v-if="scope.row.id == systemId"></span>
                        </template>
                    </el-table-column>
                    <el-table-column property="accountSet" label="账套名" width="200" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column property="companyNameChinese" label="公司名称" width="200" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column property="industry" label="行业" width="150">
                        <template slot-scope="scope">
                            <span v-for="item in industry" :key="item['id']">
                                <i v-if="item['id'] == scope.row.industry" style="font-style: normal;">{{ item['detailedName'] }}</i>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="地址" :show-overflow-tooltip="true" width="300">
                        <template slot-scope="scope">
                            {{ scope.row.proviceName + scope.row.cityName + scope.row.areaName + scope.row. addressChinese}}
                        </template>
                    </el-table-column>
                    <el-table-column label="启用年度" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | formatYear }}
                        </template>
                    </el-table-column>
                    <el-table-column label="启用月份" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | formatMonth }}
                        </template>
                    </el-table-column>
                    <el-table-column property="phone" label="电话" width="150"></el-table-column>
                    <el-table-column property="email" label="邮箱" width="200"></el-table-column>
                    <el-table-column label="状态" prop="state" width="100">
                        <template slot-scope="scope">
                            <span style="color: green;" v-if="scope.row.state == 1">已启用</span>
                            <span style="color: red;" v-if="scope.row.state == 0">已禁用</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="update(scope.row.id)">修改</el-button>                                   
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-03-2
 * Description: 账套列表组件
*/
export default {
    data() {
        return {
            tableData: [],
            industry: [],       //行业
            searchText: '',
            multipleSelection: [],
            selectRowId: [],
            systemId: this.$store.state.systemId
        }
    },
    watch: {
        searchText(newVal) {
            if(!newVal) {
                this.getData();
            }
        }
    },
    methods: {
        search() {
            if(this.searchText) {
                let newArr = [],
                    data = this.tableData;
                let reg = new RegExp(this.searchText, "g");
                data.forEach(item => {
                    if((item['accountSet'] && reg.test(item['accountSet'])) || (item['accountSetToPinYin'] && reg.test(item['accountSetToPinYin'])) || (item['companyNameChinese'] && reg.test(item['companyNameChinese'])) || (item['companyNameChineseToPinYin'] && reg.test(item['companyNameChineseToPinYin'])) || (item['industryName'] && reg.test(item['industryName'])) || (item['industryNameToPinYin'] && reg.test(item['industryNameToPinYin'])) || (item['email'] && reg.test(item['email'])) || (item['phone'] && reg.test(item['phone'])) || (item['countryName'] && reg.test(item['countryName'])) || (item['proviceName'] && reg.test(item['proviceName'])) || (item['cityName'] && reg.test(item['cityName'])) || (item['areaName'] && reg.test(item['areaName'])) || (item['addressChinese'] && reg.test(item['addressChinese']))) {
                        newArr.push(item);
                    }
                });
                this.tableData = newArr;
            }
        },
        getData() {
            this.$http.get(this.$url + 'systemParameters/selectAccountSets').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.tableData = res.data.data;
                        console.log(this.tableData)
                    }
                }
            });
        },
        getIndustry() {         //获取行业数据
            this.$http.get(this.$url + 'auxiliaryInfoAllCategory/selectByIndustry').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        let newArr = [],
                            arr = res.data.data;
                        arr.forEach(item => {
                            item['id'] = item['id'].toString();
                            newArr.push(item);
                        });
                        this.industry = newArr;
                    }
                }
            });
        },
        check() {           //查看
            this.$store.commit('accountStore/updateStatus', 2);         //查看，2表示查看当前双击的账套信息
            this.$store.commit('accountStore/updateAccountInfoId', this.selectRowId[0]);       //传入要查找的账套信息id
        },
        dblClick(row, column, event) {                //双击表格行触发
            this.$store.commit('accountStore/updateStatus', 2);         //查看，2表示查看当前双击的账套信息
            this.$store.commit('accountStore/updateAccountInfoId', row['id']);       //传入要查找的账套信息id
        },
        selectionChange(arr) {
            this.multipleSelection = arr;
            this.selectRowId = [];
            for(var i = 0; i < this.multipleSelection.length; i++) {
                this.selectRowId.push(this.multipleSelection[i]['id']);
            }
        },
        refresh() {         //刷新
            this.getData();
        },
        add() {         //新增，跳转到系统参数编辑页面,状态1表示清空编辑页面表单所有字段
            this.$store.commit('accountStore/updateStatus', 1);
        },
        update() {            //修改
            this.$store.commit('accountStore/updateStatus', 3);
            this.$store.commit('accountStore/updateAccountInfoId', this.selectRowId[0]);
        },
        del() {             //删除账套
            this.$confirm('确定删除选中账套?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$url + 'systemParameters/deleteAccountSet', {data: this.selectRowId}).then(res => {
                    if(res.data.code == 20001) {
                        this.$message.success('删除成功');
                        setTimeout(() => {
                            this.getData();
                            this.$store.commit('setSystemId', '');          //清空系统id
                            this.$store.commit('updateCompanyNames', '');       //清空公司名称
                        }, 1000);
                    }
                });
            }).catch(() => {
                this.$message.info('已取消删除');
            })
        },
        disabedBtn(status, msg) {           //禁用、启用
            var type = {
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
            if(status == 0) {
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
            this.$http.post(this.$url + 'systemParameters/updateAccountSetState?state=' + status, JSON.stringify(this.selectRowId), type).then(res => {
                if(res.data.code == 20001) {
                    this.$message({message: msg + '成功', type: 'success', duration: 2000});
                    setTimeout(() => {
                        this.getData();
                    }, 1000);
                } else {
                    this.$message.error(this.data.msg);
                }
            });
        },
    },
    filters: {
        formatYear(date) {
            return new Date(date).getFullYear();
        },
        formatMonth(date) {
            return new Date(date).getMonth() + 1;
        }
    },
    created() {
        this.getData();
        this.getIndustry();
    }
}
</script>
<style>
    .accountList .el-table__body-wrapper {height: calc(100% - 41px) !important;overflow-y: auto !important;}
</style>
<style scoped>
    .accountList {height: 100%;}
    .accountList .block-area:nth-of-type(1) {height: auto !important;}
    .accountList .block-area:nth-of-type(2) {height: calc(100% - 45px) !important;}
    .currentAccount {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #f00;
        border-radius: 50%;
    }
</style>
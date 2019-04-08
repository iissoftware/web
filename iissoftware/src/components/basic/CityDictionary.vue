<template>
    <div id="citydictionary">
        <div class="btn-group" style="position:absolute;right:0;top:0;z-index: 5;">
            <el-button type="primary" size="small">保存</el-button>
            <el-button type="success" size="small">同步</el-button>
            <el-button type="warning" size="small">帮助</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="国家字典维护" name="first">                
                <!-- 表格数据 -->
                <div class="block-area block-area-full">
                    <div class="table">
                        <el-table :data="counteryData" border @selection-change="handleSelectionChange1">
                            <el-table-column type="selection" width="80"></el-table-column>
                            <el-table-column type="index" label="编号" width="80"></el-table-column>
                            <el-table-column property="name" label="名称" min-width="150"></el-table-column>
                            <el-table-column property="locks" label="是否可用" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.locks == 1 ? '是' : '否' }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="省份字典维护" name="second">                
                <div class="tree-left">
                    <ul :model="country" class="ulList">
                        <li v-for="(items,index) in counteryData" :key="index" :class="currentIndex == index ? 'active' : ''" @click="searchId(items.id, index)">{{items.name}}</li>
                    </ul>
                </div>
                <div class="tree-right">
                    <div class="block-area block-area-full">
                        <div class="table">
                            <el-table :data="provinceData" border @selection-change="handleSelectionChange2">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column type="index" label="编号" width="80"></el-table-column>
                                <el-table-column property="name" label="名称" min-width="100"></el-table-column>
                                <el-table-column property="locks" label="是否可用" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.locks == 1 ? '是' : '否' }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <!-- @tab-click="getTreeData" -->
            <el-tab-pane label="城市字典维护" name="third">
                <div class="tree-left">
                    <el-tree :data="treedata" :props="defaultProps" :accordion="true" @node-click="handleNodeClick" :default-expand-all="true" node-key="id" :current-node-key="239" :highlight-current="true" class="tree"></el-tree>
                </div>
                <div class="tree-right">
                    <!-- <div class="block-area" style="height:36px">
                        <div class="btn-group">
                            <el-button type="primary" size="small">保存</el-button>
                            <el-button type="success" size="small">同步</el-button>
                            <el-button type="warning" size="small">帮助</el-button>
                        </div>
                    </div> -->
                    <div class="block-area block-area-full">
                        <div class="table">
                            <el-table :data="cityData" border @selection-change="handleSelectionChange3">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column type="index" label="编号" width="80"></el-table-column>
                                <el-table-column property="name" label="名称" min-width="100"></el-table-column>
                                <el-table-column property="locks" label="是否可用" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.locks == 1 ? '是' : '否' }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    mounted(){
        this.getCountryData()
        this.getTreeData()
    },
    data() {
      return {
        currentIndex: 0,
        country:'',                 //获取国家列表
        city:'',                    //获取城市列表
        sortType1:'',               //国家排序
        sortType2:'',               //省份排序
        sortType3:'',               //城市排序
        bool:true,
        activeName: 'first',
        multipleSelection1:[],      //国家选中行
        multipleSelection2:[],      //省份选中行
        multipleSelection3:[],      //城市选中行
        counteryData:[],            //国家表格数据
        provinceData: [],           //省份表格数据
        cityData:[],                //城市表格数据
        treedata:[],                //树
        treeid:'',                  //选中树节点的id
        defaultProps: {
            children: 'subCity',
            label: 'name'
        },
      };
    },
    methods: {       
        handleClick(tab, event) {
        },
        handleSelectionChange1(val){  //国家选中行
            this.multipleSelection1 = val;
        },
        handleSelectionChange2(val){  //省份选中行
            this.multipleSelection2 = val;
        },
        handleSelectionChange3(val){  //城市选中行
            this.multipleSelection3 = val;
        },
    //-------------------------------------------------------- 国家维护
        getCountryData(){
            this.$http.get(this.$url + 'city/findCountry').then(res => {
                if(res.data.code === 20001) {                    
                    setTimeout(() => {
                        this.counteryData = res.data.data;
                        this.$http.get(this.$url + 'city/findProvince?parentId='+res.data.data[0].id).then(res => {
                            if(res.data.code === 20001) {                    
                                setTimeout(() => {
                                    this.provinceData = res.data.data;
                                }, 500);
                            } else {
                                    this.$message.error(res.data.msg);
                                }
                            })
                    }, 500);
                } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$message.error(err);
                })
        },
    //   ----------------------------------------------------- 省份维护
        searchId(id, index){
            this.currentIndex = index;
            this.$http.get(this.$url + 'city/findProvince?parentId='+id).then(res => {
                if(res.data.code === 20001) {                    
                    setTimeout(() => {
                        this.provinceData = res.data.data;
                    }, 500);
                } else {
                        this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
    // ------------------------------------------------------- 城市省份
        getTreeData(){
            this.$http.get(this.$url + 'city/findCountryAndProvince').then(res => {
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.treedata = [res.data.data[0]];
                        this.$http.get(this.$url + 'city/findCity?parentId='+res.data.data[0].subCity[0].id).then(res => {
                            if(res.data.code === 20001) {
                                setTimeout(() => {
                                    this.cityData = res.data.data;
                                }, 500);
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    }, 500);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        },
        handleNodeClick(data){
            this.treeid = data.id;           
            this.$http.get(this.$url + 'city/findCity?parentId='+this.treeid).then(res => {
                if(res.data.code === 20001) {
                    setTimeout(() => {
                        this.cityData = res.data.data;
                    }, 500);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                this.$message.error(err);
            })
        }
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
        }
    .tree-right {
        height: 100%;
        width: calc(100% - 215px);
        overflow: hidden;
        float: right;
    }
    #citydictionary .el-tabs__content {height: calc(100% - 50px);}
    #citydictionary .el-table__body-wrapper {height: calc(100% - 41px);overflow-y: auto;}
    #citydictionary .el-tabs__header {margin: -5px 0 10px !important;}
</style>
<style lang="less" scoped>
    #citydictionary .tree-left .el-tree {height: 100% !important;overflow-y: auto;}
    #citydictionary{
        height: 100%;
        overflow: hidden;
        position: relative;
        min-width:700px;
        ul{
            text-align: center;
            font-size:14px;
            height: 100%;
            overflow-y: auto;
            li{
                padding:3px 0;
                cursor: pointer;
                color: #606266;
                &:hover{
                    background-color:#f5f7fa;
                }
                &.active{
                    background-color: #f0f7ff;
                }
            }
        }
        .el-table::before{
            height:0 !important
        }
    }
    @media screen and (max-width: 1250px) {
        .tree-right .block-area:nth-of-type(1) {
            overflow-x: auto;
            min-width: 0 !important;
            white-space: nowrap;
        }
        #citydictionary .block-area:nth-of-type(1) .el-select,
        #citydictionary .block-area:nth-of-type(1) .btn-group {
            display: inline-block;
            vertical-align: middle;
        }
    }
    
</style>

<template>
    <!--分管部门显示弹窗-->
    <div class="allDepartment" >
            <el-input placeholder="输入关键字搜索" v-model="filterText" style="margin-bottom:10px;"></el-input>
            <el-tree
            class="filter-tree"
            :data="allTreeData"
            :props="departmentProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="getCurrentTreeData"
            ref="tree"
            style="height:100%;overflow-y:auto !important">
            </el-tree>           
    </div>
</template>

<script>
export default {
    data(){
        return{
            filterText:'',
            allTreeData:[],
            departmentProps:{
                children: 'subDepartment',
                label: 'name'
            }
        }
    },
    watch:{
        filterText(val) {           //监听分管部门搜索框
            this.$refs.tree.filter(val);
        },
    },
    methods:{
        filterNode(value, data) {               //监听分管部门搜索
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        getAllTreeData() {                      //获取分管部门数据
            var treeData = {}
            this.$http.get(this.$url + 'systemParameters/selectSystemInfo').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        treeData['name'] = res.data.data['companyNameChinese'];
                        treeData['id'] = res.data.data['id'];
                        treeData['subDepartment'] = [];
                        setTimeout(() => {
                            this.$http.get(this.$url + 'department/selectObject?parentId=0'+ '&systemId=' + this.$store.state.systemId).then(res => {
                                if(res.data.code == 20001) {
                                    treeData['subDepartment'] = res.data.data;
                                    this.allTreeData = [treeData];
                                }
                            })
                        });
                    }
                }
            });
        },
        getCurrentTreeData(row) {               //点击分管部门数据回显到文本框
            this.$store.commit('supplierStore/updateDepartment', row);
            this.close();
        },
        close(){                                //关闭弹窗
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    },
    mounted(){
        this.getAllTreeData()
    }
}
</script>

<style scoped>
    .allDepartment{
        overflow:hidden;
    }
    .el-tree {height: calc(100% - 50px) !important;overflow-y: auto;} 
</style>

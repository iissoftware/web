<template>
    <div class="threeAdd" element-loading-spinner="el-icon-loading" element-loading-text="数据加载中..." element-loading-background="#fff" v-loading.fullscreen.lock="fullLoading">
        <div class="block-area">
            <div class="table">
                <el-table :data="tableData" border style="width: 100%" @row-dblclick="rowDBClick">
                    <el-table-column property="userName" label="用户名"></el-table-column>
                    <el-table-column property="name" label="姓名" ></el-table-column>
                    <el-table-column property="sex" label="性别" ></el-table-column>
                    <el-table-column  property="deptName" label="部门" ></el-table-column>
                    <el-table-column property="positionAux" label="职务"></el-table-column>
                    <el-table-column property="state" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state == 1" style="color: green;">已启用</span>
                            <span v-if="scope.row.state == 0" style="color: #f00;">已禁用</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fullLoading: true,
            tableData: [],
            systemId: this.$store.state.systemId
        }
    },
    methods: {
        getData() {
            let store = this.$store.state.approvalProcessStore,
                id = store.dpId;        //拿到部门id
            id = id === store.ttId ? 0 : id;
            this.$http.get(this.$url + 'employee/findEmployeeByDepartment?systemId=' + this.systemId + '&id=' + id).then(res => {
                if(res.data.code == 20001) {
                    this.fullLoading = false;
                    if(res.data.data) {
                        this.tableData = res.data.data;
                    }
                }
            });
        },
        rowDBClick(row) {
            let store = this.$store.state.approvalProcessStore;
            let list = {
                id: row['id'],
                name: row['name'],
                pid: store.dpId,
                dpId: store.dpId,
                rootId: store.rootId,
                level: 3,
                vercharId: store.vercharId,
                children: [],
                subList: []
            }
            let obj = {
                id: store.ttId,
                name: '全部',
                pid: store.dpId,
                dpId: store.dpId,
                rootId: store.rootId,
                level: 3,
                vercharId: store.vercharId,
                children: [],
                subList: []
            }
            list['subList'].push({id: store.ttId, pid: list['id'], rootId: store.rootId, level: 4, dpId: store.dpId, vercharId: store.vercharId, money1: store.minMoney, money2: store.maxMoney, name: store.minMoney + ' ~ ' + store.maxMoney + '元', children: [], subList: []});
            obj['subList'].push({id: store.ttId, pid: store.ttId, rootId: store.rootId, level: 4, vercharId: store.vercharId, dpId: store.dpId, money1: store.minMoney, money2: store.maxMoney, name: store.minMoney + ' ~ ' + store.maxMoney + '元', children: [], subList: []});
            this.$store.commit('approvalProcessStore/updateNodes', {level: 3, node: [obj, list]});        //保存后，将当前选中的会计科目节点保存到store里面
            this.close();
        },
        close() {
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    },
    created() {
        this.getData();
    }
}
</script>


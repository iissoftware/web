<template>
    <div class="threeAdd">
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
            tableData: [],
            systemId: this.$store.state.systemId
        }
    },
    methods: {
        getData() {
            let store = this.$store.state.approvalProcessStore;
            let id = store.nodeId;     //拿到部门父级id
            id = id === store.allId ? 0 : id;
            this.$http.get(this.$url + 'employee/findEmployeeByDepartment?systemId=' + this.systemId + '&id=' + id).then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        this.tableData = res.data.data;
                    }
                }
            });
        },
        rowDBClick(row) {
            let store = this.$store.state.approvalProcessStore,
                id = store.nodeId,
                rootId = store.rootId,
                allId = store.allId;
            let list = {
                id: row['id'],
                name: row['name'],
                pid: id,
                rootId: rootId,
                level: 3,
                subList: [{id: allId, pid: row['id'], rootId: row['rootId'], level: 4, money1: store.minMoney, money2: store.maxMoney, name: store.minMoney + ' ~ ' + store.maxMoney + '元', subList: [], children: []}],
                children: []
            }
            let obj = {
                id: allId,
                name: '全部',
                pid: id,
                rootId: rootId,
                level: 3,
                subList: [{id: allId, pid: allId, rootId: rootId, level: 4, money1: store.minMoney, money2: store.maxMoney, name: store.minMoney + ' ~ ' + store.maxMoney + '元', subList: [], children: []}],
                children: []
            }
            this.$store.commit('approvalProcessStore/updateNodes', {level: 3, node: [obj, list]});        //保存后，将当前选中的会计科目节点保存到store里面
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


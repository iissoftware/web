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
            console.log(88888)
            // let id = this.$store.state.approvalProcessStore.nodeId;     //拿到部门父级id
            // console.log(id);
            // this.$http.get(this.$url + 'employee/findEmployeeByDepartment?systemId=' + this.systemId + '&id=' + id).then(res => {
            //     if(res.data.code == 20001) {
            //         if(res.data.data) {
            //             this.tableData = res.data.data;
            //         }
            //     }
            // });
        },
        rowDBClick(row) {
            let id = this.$store.state.approvalProcessStore.nodeId;     //拿到部门父级id
            let rootId = this.$store.state.approvalProcessStore.rootId;     //拿到部门父级id
            let list = {
                id: row['id'],
                name: row['name'],
                pid: id,
                rootId: rootId,
                level: 3,
                subList: [],
                children: []
            }
            this.$store.commit('approvalProcessStore/updateNodes', {level: 3, node: list});        //保存后，将当前选中的会计科目节点保存到store里面
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


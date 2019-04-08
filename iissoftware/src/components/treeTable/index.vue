<template>
    <el-table :data="formData" border style="width: 100%" :row-style="rowStyle" v-bind="$attrs" @selection-change="handleSelectionChange" @select="selectCheck">
        <el-table-column type="selection"></el-table-column>
        <el-table-column v-if="columns.length === 0">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
                    <i v-else class="el-icon-caret-bottom"></i>
                </span>
                {{ scope.$index }}
            </template>
        </el-table-column>
        <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" width="300%">
            <template slot-scope="scope">
                <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
                    <i v-else class="el-icon-caret-bottom"></i>
                </span>
                {{ scope.row[column.value ]}}
                <slot name="checkbox"></slot>
            </template>
        </el-table-column>
        <!-- el-table 之间可以插入内容 -->
        <slot></slot>
    </el-table>
</template>
<script>
import treeToArray from './tree'
export default {
    name: 'treeTable',
    props: {
        data: {
            type: [Array, Object],
            required: true
        },
        columns: {
            type: Array,
            default: () => []
        },
        evalFunc: Function,
        evalArgs: Array,
        expandAll: {
        type: Boolean,
            default: true
        }
    },
    data(){
        return{
            multipleSelection:[],
            selectRowId:[],
        }
    },
    computed: {
        formData() {
            let tmp;
            if(!Array.isArray(this.data)) {
                tmp = [this.data];
            } else {
                tmp = this.data;
            }
            const func = this.evalFunc || treeToArray;
            const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll];
            return func.apply(null, args);
        }
    },
    methods: {
        rowStyle(row) {
            const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true);
            row.row._show = show;
            return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
        },
        toggleExpanded: function(trIndex) {     // 切换下级是否展开
            const record = this.formData[trIndex]
            record._expanded = !record._expanded
        },
        iconShow(index, record) {   //图标显示
            return (index === 0 && record.subAssertList && record.subAssertList.length > 0)
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
            this.selectRowId = [];
            if(this.multipleSelection.length > 0){
                for(var i = 0; i < this.multipleSelection.length; i++) {
                    this.selectRowId.push(this.multipleSelection[i]['id']);
                }
                this.$store.commit('setInitializeVal',this.multipleSelection);
                this.$store.commit('initializeStore/setInitializeValTwo',this.multipleSelection);
                this.$store.commit('setInitializeValId',this.selectRowId)
            }
        },
        selectCheck(selection, row){
            if(selection.length == 0){
                this.$store.commit('clearInitializeVal');
                this.$store.commit('initializeStore/clearInitializeVal')
            }
        }
    }
}
</script>
<style scoped>
    @keyframes treeTableShow {
        from {opacity: 0;}
        to {opacity: 1;}
    }
    @-webkit-keyframes treeTableShow {
        from {opacity: 0;}
        to {opacity: 1;}
    }
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 18px;
        height: 14px;
        &::before {
        content: ""
        }
    }
    .processContainer{
        width: 100%;
        height: 100%;
    }
    table td {
        line-height: 26px;
    }
    .tree-ctrl{
        position: relative;
        cursor: pointer;
        color: #2196F3;
        margin-left: -18px;
    }
</style>


<template>
	<el-tree :data="treeData" :props="defaultProps" node-key="id" :default-expanded-keys="dfExpKeys" ref="tree" :indent="10" accordion @node-click="nodeClick" :default-expand-all="false" :highlight-current="true"></el-tree>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-18
 * Description: 大类树形组件
*/
export default {
	data() {
		return {
			treeData: this.$store.state.secondaryStore.treeData,
			dfExpKeys: this.$store.state.secondaryStore.dfExpKeys,
			defaultProps: {
				label: 'categoryName',
				children: 'children'
			},
			activeName: this.$store.state.secondaryStore.activeName,
		}
	},
	watch: {
		activeName(newVal) {
            if(newVal[0] === 'first') {
				this.$nextTick(() => {
					for(var i = 1;i < this.$refs.tree.store._getAllNodes().length; i++){	//将第一个节点展开，其它节点全部收起来，i从1开始
						this.$refs.tree.store._getAllNodes()[i].expanded = false;
					}
				});
            }
        },
		dfExpKeys(newVal) {			//监听展开节点id的变化，并设置该节点高亮状态
			this.$refs.tree.setCurrentKey(newVal.join(''));
		}
	},
	methods: {
		nodeClick(row) {
			if(row['level'] === 0) {			//大类
				this.$store.commit('secondaryStore/updateRow', row);
			} else if(row['level'] === 1) {			//小类
				row['$url'] = this.$url;
				this.$store.dispatch('secondaryStore/getSubClassTableData', row);
			}
		}
	}
}
</script>
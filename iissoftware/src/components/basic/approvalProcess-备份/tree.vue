<template>
	<el-tree :data="treeData2" ref="tree" :accordion="true" :default-expanded-keys="dfExpKeys" node-key="id" :expand-on-click-node="false" :props="defaultProps" :highlight-current="true" @node-click="nodeClick"></el-tree>
</template>
<script>
	export default {
		data() {
			return {
				treeData2: [],
				treeData: this.$store.state.approvalProcessStore.treeData,
				dfExpKeys: [],
				defaultProps: {
	                label: 'name',
	                children: 'children'
	            }
			}
		},
		watch: {
			treeData: {
				handler() {
					let treeData = this.$store.state.approvalProcessStore.treeData;
					this.treeData2 = treeData;

					//设置高亮
					setTimeout(() => {
						this.dfExpKeys = [0];
	            		this.$refs.tree.setCurrentKey(this.dfExpKeys.join(''));
					});
				},
				deep: true
			}
		},
		methods: {
			nodeClick(row) {
				console.log(row)
				this.$store.commit('approvalProcessStore/updateId', row['id']);
				this.$store.commit('approvalProcessStore/updateRootId', row['rootId']);		//存储当前根节点
			}
		}
	}
</script>
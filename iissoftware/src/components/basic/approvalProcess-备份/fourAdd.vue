<template>
	<div class="form">
		<el-form :model="formData" status-icon :rules="formRules" ref="formRef" label-width="100px" class="demo-ruleForm" style="overflow: hidden;">
			<el-form-item label="金额下限" prop="money1" @keyup.enter.native="enterKey($event, 'DPT1')" style="margin-top: 10px;">
				<el-input type="text" v-model.trim="formData.money1" autocomplete="off" maxlength="16"></el-input>
			</el-form-item>
			<el-form-item label="金额上限" prop="money2" ref="DPT1" @keyup.enter.native="save('formRef')">
				<el-input type="text" v-model.trim="formData.money2" autocomplete="off" maxlength="16"></el-input>
			</el-form-item>
			<el-form-item>
                <el-button type="primary" size="small" @click="save('formRef')">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			var checkNumber = (rule, value, callback) => {
				if(isNaN(value)) {
					return callback(new Error('金额只能是一个数字'));
				}
				callback();
			}
			return {
				formData: {},
				formRules: {
	                money1: [{required: true, message: '下限金额不能为空', triggle: 'blur'}, {validator: checkNumber, trigger: 'blur'}],
	                money2: [{required: true, message: '上限金额不能为空', triggle: 'blur'}, {validator: checkNumber, trigger: 'blur'}]
	            }
			}
		},
		methods: {
			save(formName) {			//保存
				this.$refs[formName].validate((valid) => {
                	if (valid) {
                		let id = this.$store.state.approvalProcessStore.id;
                		let rootId = this.$store.state.approvalProcessStore.rootId;
                		let moneyIndex = this.$store.state.approvalProcessStore.moneyIndex;
                		this.formData['id'] = ++moneyIndex['index' + rootId];			//对应的单据金额索引递增
                		this.formData['pid'] = id;
                		this.formData['rootId'] = rootId;
                		this.formData['name'] = this.formData['money1'] + '元' + '~' + this.formData['money2'] + '元';
                		this.formData['level'] = 4;
                		this.formData['subList'] = [];
                		this.$store.commit('approvalProcessStore/updateNodes', {level: 4, node: this.formData});        //保存后，将当前选中的会计科目节点保存到store里面
                		this.$store.commit('approvalProcessStore/updateIndex', {index: rootId, data: this.formData['id']});			//更新对应的单据金额索引
                		this.close();
                	}
                });
			},
			close() {           //关闭新增弹窗
	            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
	            parent.layer.close(index);
	        },
	        enterKey(lastRef, nextRef) {		//回车键换行
	            if(lastRef.target.value) {
	                this.$refs[nextRef].focus();
	            }
	        }
		}
	}
</script>
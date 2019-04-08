<template>
    <div class="addRow">
        <!-- 前后翻组件 -->
        <modify :tableData="$store.state.measureStore.tableData1" :currentId="$store.state.measureStore.rowId" @getPositionData="getPositionData"/>
        <el-form label-width="100px" :model="updateRowMeasureOneData" ref="updateRowMeasureOneForm" status-icon :rules="updateMeasureOneFormRules" style="overflow: hidden">
            <el-form-item label="名称：" prop="unitName" style="margin-top: 10px !important;">
                <el-input v-model="updateRowMeasureOneData.unitName" @keyup.enter.native="enterKey($event, 'L1')"></el-input>
            </el-form-item>
            <el-form-item label="单位类别：" prop="unitType">
                <el-select v-model="updateRowMeasureOneData.unitType"  ref="L1" placeholder="选择单位类别" style="width: 100%;" @keyup.enter.native="updateRowSave('updateRowMeasureOneForm')">
                    <el-option label="普通单位" value="0"></el-option>
                    <el-option label="组合单位" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="updateRowSave('updateRowMeasureOneForm')">保存</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import modify from '../modify'
    export default {
        components: {
            modify
        },
        data() {
            return {
                updateRowMeasureOneData: {
                    unitName: '',
                    unitType: '',
                    state: ''
                },
                updateMeasureOneFormRules: {
                    unitName: [{required: true, message: '名称不能为空', triggle: 'blur'}],
                    unitType: [{required: true, message: '单位类别不能为空', triggle: 'change'}]
                },
                rowId: this.$store.state.measureStore.rowId,
                index:''
            }
        },
        methods: {
            getUpdateData() {               //获取要修改的数据
                this.$http.get(this.$url + 'measureUnit/selectGroupInfo?id=' + this.rowId).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            res.data.data['unitType'] = res.data.data['unitType'].toString();
                            this.updateRowMeasureOneData = res.data.data;
                        }
                    }
                });
                for(let i = 0; i < this.$store.state.measureStore.tableData1.length; i++){
                    if(this.$store.state.measureStore.tableData1[i]['id'] == this.rowId){
                        this.index = i;
                    }
                }
            },
            getPositionData(row) {          //获取指定位置的数据
                row['unitType'] = row['unitType'].toString();
                this.updateRowMeasureOneData = row;
            },
            updateRowSave(formName) {       //修改保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var data = {        //重新组装数据
                            id: this.updateRowMeasureOneData['id'],
                            unitName: this.updateRowMeasureOneData['unitName'],
                            unitType: this.updateRowMeasureOneData['unitType'],
                            state: this.updateRowMeasureOneData['state']
                        }
                        this.$http({
                            method: "post",
                            url: this.$url + "measureUnit/updateGroup",
                            params: data
                        }).then(res => {
                            if(res.data.code === 20001) {
                                this.$message({message: '修改成功', type: 'success'});
                                this.$store.dispatch('measureStore/getSearch',this.$url + 'measureUnit/selectGroup')
                                setTimeout(() => {
                                    this.$store.dispatch('measureStore/getData1', this.$url);
                                    this.close();
                                }, 800)
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    }
                })
            },
            close() {                       //关闭新增弹窗
                let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
                parent.layer.close(index);
            },
            enterKey(lastRef, nextRef) {    //回车键换行
                if(lastRef.target.value) {
                    this.$refs[nextRef].focus();
                }
            }
        },
            mounted() {
                this.getUpdateData();
            }
    }
</script>


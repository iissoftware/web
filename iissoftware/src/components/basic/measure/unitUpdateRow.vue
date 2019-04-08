<template>
    <div class="addRow">
        <!-- 前后翻组件 -->
        <modify :tableData="$store.state.measureStore.tableData2" :currentId="$store.state.measureStore.rowId" @getPositionData="getPositionData"/>
        <el-form label-width="100px" :model="updateRowMeasureTwoData" :label-position="labelPosition" ref="updateRowMeasureTwoForm" status-icon :rules="updateMeasureTwoFormRules" style="margin-left: 20px;">
            <el-form-item label="类别：" prop="unitId" style="margin-top: 10px;">
                <el-select v-model="updateRowMeasureTwoData.unitId" filterable placeholder="选择" style="width: 100%;">
                    <el-option
                    v-for="item in unitData"
                    :key="item.id"
                    :label="item.unitName"
                    :value="item.id"
                    @keyup.enter.native="enterKey($event, 'P1')">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称：" prop="useUnit">
                <el-input ref="P1" v-model="updateRowMeasureTwoData.useUnit" @keyup.enter.native="updateRowSaveTwo('updateRowMeasureTwoForm')"></el-input>
            </el-form-item>
            <el-form-item label="是否可用：">
                <el-checkbox v-model="!!updateRowMeasureTwoData.unitLock"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="save('updateRowMeasureTwoForm')">保存</el-button>
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
                labelPosition: 'left',
                continueAdd: false,
                unitData: [],
                updateRowMeasureTwoData: {
                    unitId: '',
                    useUnit: '',
                    unitLock: ''
                },
                updateMeasureTwoFormRules: {
                    unitId: [{required: true, message: '类别不能为空'}],
                    useUnit: [{required: true, message: '名称不能为空'}],
                },
                rowId: this.$store.state.measureStore.rowId,
                index:''
            }
        },
        methods: {
            getUnitData() {
                this.$http.get(this.$url + 'measureUnit/selectGroup').then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.unitData = res.data.data;
                        }
                    }
                });
            },
            getPositionData(row) {          //获取指定位置的数据
                this.updateRowMeasureTwoData = row;
            },
            getUpdateData() {
                this.$http.get(this.$url + 'measureUnit/selectUnitInfo?id=' + this.rowId).then(res => {
                    if(res.data.code == 20001) {
                        if(res.data.data) {
                            this.updateRowMeasureTwoData = res.data.data;
                        }
                    }
                });
                for(var i =0; i< this.$store.state.measureStore.tableData2.length; i++){
                    if(this.$store.state.measureStore.tableData2[i]['id'] == this.rowId){
                        this.index = i;
                    }
                }
            },
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {        //重新组装数据
                            id: this.updateRowMeasureTwoData['id'],
                            unitId: this.updateRowMeasureTwoData['unitId'],
                            useUnit: this.updateRowMeasureTwoData['useUnit'],
                            state: this.updateRowMeasureTwoData['state'],
                            unitLock: this.updateRowMeasureTwoData['unitLock'] ? 1 : 0
                        }
                        this.$http({
                            method: "post",
                            url: this.$url + "measureUnit/updateUnit",
                            params: data
                        }).then(res => {
                            if(res.data.code === 20001) {
                                this.$message({message: '修改成功', type: 'success'});
                                this.$store.dispatch('measureStore/getSearchTwo',this.$url + 'measureUnit/selectUnit')
                                setTimeout(() => {
                                    this.$store.dispatch('measureStore/getData2', this.$url);
                                    this.close();
                                }, 800);
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
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
        },
        mounted() {
            this.getUnitData();
            this.getUpdateData();
        }
    }
</script>


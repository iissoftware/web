<template>
    <div class="examineForm">
        <el-form :model="auditInformData">
          <ElFormItem label="审核结果：">
                <el-radio v-model="auditInformData.radio" label="1">审核通过</el-radio>
                <el-radio v-model="auditInformData.radio" label="2">审核未通过</el-radio>
                <div class="line">
                    <el-radio-group v-model="auditInformData.choose" style="padding:0px 10px">
                        <el-radio :label="0" style="display:inline-block" :disabled="auditInformData.radio == 1">退回到上一步</el-radio>
                        <el-radio :label="1" style="display:inline-block" :disabled="auditInformData.radio == 1">退回到制单人</el-radio>
                        <el-radio :label="2" style="margin-left:0" :disabled="auditInformData.radio == 1">退回到指定节点</el-radio>
                        <el-select v-model="auditInformData.choosePart" size="mini" style="margin-left: 15px;" :disabled="auditInformData.choose != 2">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-radio-group>
                </div>
          </ElFormItem>
          <ElFormItem label="审核意见：">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="auditInformData.opinion">
                </el-input>
          </ElFormItem>
          <ElFormItem label="审核留言：">
                <div style="text-align: right;">
                    <span style="font-size: 12px;color: #606266;">留言至指定节点：</span>
                    <el-select v-model="auditInformData.choosePoint" size="mini" multiple>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="auditInformData.message"
                    :disabled="auditInformData.choosePoint == '' ? true:false">
                </el-input>
          </ElFormItem>
          <ElFormItem label="" style="text-align:center;">
              <el-button type="primary" size="mini" style="padding: 10px 100px;">确定</el-button>
          </ElFormItem>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{            
            auditInformData:{
                radio:'1',
                choose:'',                              
                choosePart: '',                         //退回到某一节点          
                opinion:'',                             //审核意见
                choosePoint:'',                         //留言至某个节点
                message:'',                             //审核留言
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
        }
    },
    watch:{
    }
}
</script>

<style lang="less">
    .examineForm{
        .el-input--mini .el-input__inner{
            padding: 8px !important;
        }
        .el-form-item{
            margin-bottom: 5px !important;
            width: 100%;
        }
    }
</style>

<style lang="less" scoped>
    .examineForm{
        width:100%;
        height:100%;
        overflow: hidden;
        min-width: 400px;
        .line {
            border: 1px solid #409eff;
            padding: 5px 10px;
            border-radius: 6px;
            position: relative;
            margin-top:10px;
            .el-radio-group{
                .el-radio{
                    padding: 10px 10px;
                }
            }
        }
        .line:before{
                content: '节点选择';
                position: absolute;
                top: -20px;
                left: 50px;
                background-color: #f1f1f1;
                font-size: 16px;
                padding-left: 10px;
                padding-right: 10px;
                color: #409eff;
            }
    }
</style>


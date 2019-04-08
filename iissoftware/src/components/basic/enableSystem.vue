<template>
    <div class="all">
        <div class="box">
            <div class="line">
                <el-radio-group v-model="radio" style="padding:10px">
                    <el-radio :label="0" style="display:block" :disabled="disabledOne">结束初始化</el-radio>
                    <el-radio :label="1" style="display:block;margin-left:0px !important;padding-top:10px" :disabled="disabledTwo">反初始化</el-radio>
                </el-radio-group>
            </div> 
            <el-row style="float: right;">
                <el-button type="primary" size="small" @click="save">确定</el-button>
                <el-button type="danger" size="small" @click="close">关闭</el-button>
            </el-row>       
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            radio: '',
            disabledOne: '',
            disabledTwo: '',
        }
    },
    methods:{
        save(){
            if(this.radio == 0){
                this.$confirm('确定结束初始化吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.radio = 1;
                    this.disabledOne = true;
                    this.disabledTwo = false;
                    localStorage.setItem('setRadio',JSON.parse(this.radio));
                    localStorage.setItem('setRadioDisableOne',JSON.parse(this.disabledOne));
                    localStorage.setItem('setRadioDisableTwo',JSON.parse(this.disabledTwo));
                })
            }else{
                this.$confirm('确定反初始化吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.radio = 0;
                    this.disabledOne = false;
                    this.disabledTwo = true;
                    localStorage.setItem('setRadio',JSON.parse(this.radio));
                    localStorage.setItem('setRadioDisableOne',JSON.parse(this.disabledOne));
                    localStorage.setItem('setRadioDisableTwo',JSON.parse(this.disabledTwo));
                })
            }
        },
        close(){
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    },
    mounted(){
        if(localStorage.getItem('setRadio')){
            this.radio = JSON.parse(localStorage.getItem('setRadio'))
            this.disabledOne = JSON.parse(localStorage.getItem('setRadioDisableOne'))
            this.disabledTwo = JSON.parse(localStorage.getItem('setRadioDisableTwo'))
        }else{
            this.radio = 1;
            this.disabledOne = true;
            this.disabledTwo = false;
        }
    }
}
</script>

<style scoped lang="less">
    .all{
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .box{
            width: 80% !important;
        }
        .line {
            border: 1px solid #409eff;
            padding: 20px;
            border-radius: 6px;
            position: relative;
            margin-bottom:30px;
        }
        .line:before{
                content: '启用系统设置';
                position: absolute;
                top: -10px;
                left: 20px;
                background-color: #f3f3f3;
                font-size: 16px;
                padding-left: 10px;
                padding-right: 10px;
                color: #409eff;
            }
    }
</style>



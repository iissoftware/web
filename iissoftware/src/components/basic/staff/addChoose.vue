<template>
    <!-- 职员新增方式 -->
    <div class="checkedBlock">
        <el-form label-width="100px">
            <el-form-item label="新增方式：">
                <el-radio-group v-model="radio">
                    <el-radio :label="0">直接新增</el-radio>
                    <el-radio :label="1">邀请新增</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" size="small" @click="addRow">确定</el-button>
                <el-button type="danger" size="small" @click="leaveRow">取消</el-button>
            </el-form-item>
        </el-form>            
    </div>
</template>

<script>
export default {
    data(){
        return{
            radio: 0,
        }
    },
    methods:{
        addRow(){                   //确定
            if(this.radio == 0){               
                this.$util.openSubLayerIframe('职员-新增', 13, '45%', '350px', this.$domain + '/#/staff/add');
            }else if(this.radio == 1){
                this.$message.error('正在开发中')
            }
        },
        leaveRow(){                     //取消
            let index = parent.layer.getFrameIndex(window.name);    //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    }
}
</script>


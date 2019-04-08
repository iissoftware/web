<template>
    <div class="btn-box">
        <div class="btn-group">
            <el-button type="info" @click="refresh">刷新</el-button>
            <el-button type="primary" @click="addRow">新增</el-button>
            <el-button class="orange" @click="deleteMoreRow">删除</el-button>
            <el-button type="danger" @click="disabedBtn(0, '禁用')">禁用</el-button>
            <el-button type="success" @click="disabedBtn(1, '启用')">启用</el-button>
            <el-button-group class="btn-other">
                <el-button @click="exportExcel" title="导出">
                    <img src="../assets/images/export.png" alt="">
                </el-button>
                <el-button title="导入">
                    <el-upload class="upload-demo" :action="$url + 'currency/importCurrency'" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcelSuccess">
                        <img src="../assets/images/import.png" alt="">
                    </el-upload>
                </el-button>                        
                <el-button title="打印">
                    <img src="../assets/images/print.png" alt="">
                </el-button>
                <el-button title="帮助">
                    <img src="../assets/images/help.png" alt="">
                </el-button>
            </el-button-group>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            refresh() {
                this.$emit('refresh', event);
            }
        }
    }
</script>


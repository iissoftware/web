<template>
    <div class="Documents">
        <el-form :inline="true" :model="readerRowData" ref="readerRowForm" size="mini" class="operatorForm" status-icon>
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="readerRowData.userName" readonly></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="readerRowData.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="单据：" prop="name">
                <el-input v-model="readerRowData.document" readonly></el-input>
            </el-form-item>
        </el-form>
        <div class="tree-left">
            <div class="tree-left-title">单据名称</div>
            <el-tree :data="treeData" ref="treeBox" :default-expand-all="true" :accordion="false" node-key="id" :expand-on-click-node="false" :default-expanded-keys="dfExpKey" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
        </div>
        <div class="tree-right">
            <div class="documentsPermissions">
                <div class="documentsPermissions-left-title">单据权限</div>
                <div class="documentsPermissions-content">
                    <ul>
                        <li><el-checkbox v-model="checked">可制单</el-checkbox></li>
                        <li><el-checkbox v-model="checked">可审核</el-checkbox></li>
                        <li><el-checkbox v-model="checked">可打印</el-checkbox></li>
                        <li><el-checkbox v-model="checked">可导出</el-checkbox></li>
                        <li><el-checkbox v-model="checked">可发邮件</el-checkbox></li>
                        <li><el-checkbox v-model="checked">可发QQ</el-checkbox></li>
                        <li><el-checkbox v-model="checked">可发微信</el-checkbox></li>
                        <li><el-checkbox v-model="checked">可作废</el-checkbox></li>
                        <li><el-checkbox v-model="checked">可生成</el-checkbox></li>
                    </ul>
                </div>
            </div>
            <div class="fieldPermissions">
                <div class="fieldPermissions-left-title">字段权限</div>
                <div class="fieldPermissions-content">
                    <div class="table">
                        <el-table :data="fieldPermissionsRow" @selection-change="handleSelectionChange">
                            <el-table-column type="index" label="编号"></el-table-column>
                            <el-table-column property="coding" label="编码"></el-table-column>
                            <el-table-column property="name" label="字段名称"></el-table-column>
                            <el-table-column property="visible" label="可见">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.visible"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column property="revisability" label="可修改">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.revisability"></el-checkbox>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="document-btn">
                <div class="btn-left">
                    <el-button type="info" class="btn-emptyCurrent">清空当前</el-button>
                    <el-button type="info" class="btn-emptyAll">清空所有</el-button>
                </div>
                <div class="btn-right">
                    <el-button type="warning" class="checkAll">全选</el-button>
                    <el-button type="primary" class="save">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            readerRowData:{                         //存储授权数据
                userName: '',
                name: '',
                document: ''
            },
            treeData: [                             //树形数据
                {
                    label: '财务审批',
                    children: [
                        {
                            label: '借款单'
                        },{
                            label: '取款单'
                        },{
                            label: '费用报销单'
                        },{
                            label: '存款单'
                        },
                    ]
                }
            ],
            defaultProps: {                         //树形子类
                children: 'children',
                label: 'label'
            },
            dfExpKey: [],                           //第一个数节点id
            fieldPermissionsRow: [                  //字段授权表格数据
                {
                    coding: 'NKSDFSS',
                    name: '会计科目',
                    visible: true,
                    revisability: true
                },
                {
                    coding: 'LSDFSSS',
                    name: '金额',
                    visible: true,
                    revisability: true
                },
                {
                    coding: 'LJKSDFSEW',
                    name: '银行户主（付款）',
                    visible: true,
                    revisability: true
                }
            ]
        }
    },
    methods: {
        handleNodeClick(row) {                                  //点击左侧树形结构触发该方法
            console.log('row',row)
        },
        handleSelectionChange(row, event, column) {            //点击表格选中触发
            console.log('row',row)
        },
    },
    mounted(){
        this.systemId = parent.obj.systemId;
        this.userId = parent.obj.userId[0];
        this.selectRowId = parent.obj.selectRowId[0];
        this.readerRowData['userName'] = parent.obj.userName[0];
        this.readerRowData['name'] = parent.obj.name[0];
    }
}
</script>
<style lang="less">
.Documents {
    // height: 100%;
    .operatorForm{
        background: #fff;
        padding: 8px 0px;
        border-radius: 5px;
        padding-left: 10px;
        .el-form-item--mini.el-form-item{
            width: auto !important;
            margin-bottom: 0px !important;
        }
    }
    .tree-left {
        height: calc(100% - 55px);
        width: 200px;
        background-color: #fff;
        padding: 10px 0;
        box-sizing: border-box;
        border-radius: 6px;
        float: left;
        margin-top: 10px;
        .tree-left-title {
            padding: 0 15px 10px 15px;
            border-bottom: 1px solid #eee;
            font-size: 15px;
            margin-bottom: 10px;
        }
        .el-tree {
            height: calc(100% - 46px) !important;
            overflow: auto !important;
        }
    }
    .tree-right{
        height: calc(100% - 65px);
        width: calc(100% - 215px);
        overflow: hidden;
        float: right;
        padding: 10px 0;
        .documentsPermissions{
            height: calc(100% - 355px);
            width: 100%;
            background-color: #fff;
            padding: 10px 0;
            box-sizing: border-box;
            border-radius: 6px;
            .documentsPermissions-left-title{
                padding: 0 15px 10px 15px;
                border-bottom: 1px solid #eee;
                font-size: 15px;
                margin-bottom: 10px;
            }
            .documentsPermissions-content{
                ul>li{
                    float: left;
                    width: 98px;
                    margin-left: 20px;
                    margin-bottom: 10px;
                }
            }
        }
        .fieldPermissions{
            height: calc(100% - 163px);
            width: 100%;
            background-color: #fff;
            padding: 10px 0;
            box-sizing: border-box;
            border-radius: 6px;
            margin-top: 10px;
            margin-bottom: 10px;
            .fieldPermissions-left-title{
                padding: 0 15px 10px 15px;
                border-bottom: 1px solid #eee;
                font-size: 15px;
            }
            .fieldPermissions-content{
                height: calc(100% - 20px) !important;
                .table { 
                    .el-table__body-wrapper {
                        overflow-y: auto !important; 
                        height: calc(100% - 41px) !important;
                    }
                    th {
                        text-align: center;
                        font-weight: 500 !important;
                        background: #ebeef5 !important;
                    }
                    td {
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>

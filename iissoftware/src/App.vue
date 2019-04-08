<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 整体样式 */
* {
  margin: 0;
  padding: 0;
}
body {
  /* min-width: 920px; */
  color: #333;
}
html,body,#app,#app > div {
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img {border: none;}
input::-ms-clear{display: none;}
input::-ms-reveal{display: none;}
a {
  text-decoration: none;
}
ul {list-style-type: none;}
.relative {position: relative;}
.absolute {position: absolute;}
.main-content {
  background-color: #f3f3f3;
  position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
}
.left {float: left;}
.right {float: right;}

/* 弹窗样式 */
.layui-layer {
  /* border-radius: 12px !important; */
  background: #f1f1f1;
}

.layui-layer-content {   /* 弹窗主体 */
  height: auto !important;
  background-color: #f1f1f1 !important;
  overflow: hidden!important;
  padding: 10px !important;
  /* border-radius:0 0 12px 12px!important; */
  }

.layui-layer-title {    /* 弹窗头部 */
    position: relative!important;
    font-size: 16px!important;
    padding-left: 30px!important;
    /* border-radius: 12px 12px 0px 0px !important; */
    height: 35px;
    line-height: 35px;
}

.layui-layer-title:before {   /* 弹窗前的伪类 */
    content: "";
    display: block;
    position: absolute;
    left: 16px;
    top: 9px;
    width: 5px;
    height: 18px;
    background-color: #e34e42;
}
.layui-layer-btn{    /* 弹窗右下确定按钮 */
  display: none;
  height: 0;
}
.layui-layer-setwin {   /* 弹窗右上最大最小化关闭组 */     
  top:12px;
}

/* 表格样式 */
.table {height: 100%;}
.el-table__header{
  height: 40px !important;
  line-height: 40px !important;
}
.el-table td{padding:6px 0 !important}
.el-table th {padding:0 !important}
.el-table--fit {height: 100% !important}
.el-checkbox__inner{border: 1px solid #c1c1c1 !important;background-color: #e8e8e8 !important;}
.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color: #409EFF !important;border-color: #409EFF !important;}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color: #ffffff !important;}

/* .table .oparator {
    color: #409eff;
    cursor: pointer;
}
.table .oparator:first-child { margin-right: 10px;}
.table .oparator:hover {color: #3686d8;text-decoration: underline;} */


/* block块 */
.block-area {
    background-color: #fff;
    padding:10px 10px;
    padding-bottom:0px;
    height:100%;
    box-sizing: border-box;
    overflow: hidden;
}
.block-area .table .el-table th {background-color: #f4f4f4;}
.block-area .table .el-table th,
.block-area .table .el-table td{
  text-align: center !important;
  font-weight: normal;
}
.block-area .table .el-table th .cell,
.block-area .table .el-table td .cell {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.block-area .sousuo-input {width:200px !important;}
.block-area .el-input__inner {line-height: 0 !important;height: auto !important;padding: 8px 15px !important;}
.block-area .el-button {padding: 8px 10px;}   

.block-area .btn-box {margin-bottom: 10px;overflow: hidden;}
.btn-group {overflow: hidden;float: right;}
.btn-group .el-input__inner {line-height: 32px;height: 32px;}
.btn-group .el-button {padding: 8px 10px;}
.orange{color: #fff !important;background-color: #f58391 !important;border-color:#f58391 !important;}
.orange:focus,.orange:hover{color: #fff !important;background-color: #f7a3ae !important;border-color: #f7a3ae !important;}
.block-area .btn-other img{width:15px;height:15px}
.block-area .btn-other {margin-left:8px;}
.block-area .el-button .el-button--primary {margin-left:10px !important;}
.block-area .sousuo{margin-left:10px;}

/* 计量单位辅助资料城市字典头部切换样式 */
.el-tabs__header {margin: -10px 0 10px;} 
.el-tabs,
.el-tabs__content,
.el-tab-pane {height:100%;}

/* 新增修改查看的弹窗 */
.addRowBlock,.updateRowBlock,.LookBlock {height: 350px;overflow-y: auto;}
.el-form-item__label {position: relative !important;text-align: left !important;padding-left: 10px !important;}
.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  position: absolute;
  left: 0;
  top: 2px;
}
.el-form-item {width: 98%;}
.el-form-item:last-child {margin-bottom: 5px !important;}
/* .el-tree-node>.el-tree-node__children {overflow: visible !important;} */

.layui-layer-content body {
  width: 100% !important;
}

.el-select-dropdown__wrap {max-height: 200px !important}
[v-cloak] {display: none;}
.el-notification__content {margin-top: 0 !important;}
.el-input__inner {height: auto !important;line-height: 0 !important;padding: 12px 15px !important;}
.el-form-item .el-checkbox__inner {border-color: #409eff !important;}
</style>

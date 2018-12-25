<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
*{margin: 0;padding: 0}
html,body,#app {height: 100%;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 16px;
}
a { text-decoration: none;color: #333;}
.Index,.content {height: 100%;width: 100%;overflow: hidden;}
.content {background-color: #ecf8fb;min-height: 100px;}
.layui-layer-title {
  position: relative;
  font-size: 16px;
  padding-left: 30px;
}
.layui-layer {
  background-color: #f1f1f1;
  border-radius: 12px;
  overflow: hidden !important;
}
.layui-layer-title:before {
  content: '';
  display: block;
  position: absolute;
  left: 16px;
  top: 12px;
  width: 5px;
  height: 18px;
  background-color: #0054ec;
}
.el-table th {background-color: #ffeef1;}
.el-table td, .el-table th {text-align: center}
.el-table__body-wrapper {height: 230px;overflow-y: auto;}
.printDataBlock .el-table__body-wrapper {height: 100%;}
.top {
    background-color: #fff;
    padding: 10px 20px;
    margin: 1% 2%;
}
.btn-group {
    float: right;
}
.table {
    margin-top: 15px;
}
.el-button {padding: 7px 12px;}
.printDataBlock {
    background-color: rgba(0,0,0,.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    .printTable {
        position: absolute;
        top: 50px;
        left: 50%;
        width: 94%;
        min-height: 280px;
        margin-left: -47%;
    }
}
.oparatorLayer {padding-top: 20px;}
.oparatorLayer .el-input {width: 85% !important;}
.oparatorLayer .el-form-item__label {padding: 0 5px 0 0;}
.oparatorLayer .el-select {width: 50%}
.el-input__inner {height: 32px;line-height: 32px;}
.el-input__icon{line-height: 32px;}
.el-form .el-input__inner {height: 40px;line-height: 40px;}
.searchText {font-size: 14px;}
table {width: 100% !important;}
@page {
  size: A3;
  margin: 12mm 10mm;
  padding: 0;
  font-family: "Wenquanyi Micro Hei", "Microsoft YaHei", Simsun, sans-serif;
  font-size: 5pt;
}
</style>

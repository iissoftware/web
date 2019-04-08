<template>
    <!-- 自定义右键菜单 -->
    <div class="menuBox" v-show="isShow">
        <div class="item" v-for="(item, index) in filterData" :key="index" @click="fn(index + 1)">{{ item }}</div>
    </div>
</template>
<script>
/**
 * Description: 自定义右键菜单组件
 * Author: iissoftware
 * Date: 2019-01-16
 * Description: fn(n)点击选中项时触发
 * n = 1：刷新
 * n = 2：新增
 * n = 3：修改
 * n = 4：删除
 * n = 5：禁用
 * n = 6：启用
 * n = 7：打印
 * n = 8：上移
 * n = 9：下移
 * n = 10：置于顶层
 * n = 11：至于底层
*/
    export default {
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            isDisabled: {
                type: Boolean,
                default: true
            },
            x: {
                type: [Number, String],
                default: 0
            },
            y: {
                type: [Number, String],
                default: 0
            },
            disabledItem: Array     //不启用的菜单
        },
        data() {
            return {
                data: ['刷新', '新增', '修改', '删除', '禁用', '启用', '打印', '上移', '下移', '置于顶层', '置于底层', '复位', '授权']
            }
        },
        computed: {
            filterData() {          //过滤禁用的数据
                return this.data.filter((item, index) => {
                    if(this.disabledItem && this.disabledItem.length > 0) {
                        return this.disabledItem.indexOf(index + 1) == -1;
                    } else {
                        return this.data;
                    }
                });
            }
        },
        methods: {
            fn(num) {
                this.$emit('emitFn', num);
            },
            documentClick() {
                var that = this;
                $(document).on('click', function() {
                    that.$emit('update:isShow', false);
                });
            }
        },
        mounted() {
            this.documentClick();
        }
    }
</script>
<style scoped>
    /* 自定义右键菜单 */
    .menuBox {
        width: 100px;
        border: 1px solid #eee;
        position: fixed;
        z-index: 99999999 !important;
        background-color: #f9f9f9;
        font-size: 12px;
        box-shadow: 0 0 10px 1px #e9e9e9;
        padding: 5px 0;
    }
    .menuBox .item {
        line-height: 26px;
        cursor: pointer;
        padding: 5px 0px 5px 20px;
    }
    .menuBox .item:hover {
        background-color: #ccdef7;
        color: #107ef8
    }
</style>



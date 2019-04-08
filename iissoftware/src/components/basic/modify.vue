<template>
    <div class="mdf">
        <el-button type="info" size="mini" @click="first">最前</el-button>
        <el-button type="info" size="mini" @click="prev">前翻</el-button>
        <el-button type="info" size="mini" @click="next">后翻</el-button>
        <el-button type="info" size="mini" @click="last">最后</el-button>
    </div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-03-08
 * Description: 前后翻组件
 * 组件必须要传入两个参数：tableData：表格总数据。 currentId：当前修改的行id
*/
export default {
    data () {
        return {
            id: this.currentId,
            index: null,
            newArr: []
        }
    },
    props: {
        tableData: {            //表格全部数据，必填
            type: Array,
            required: true
        },
        currentId: {            //当前修改行的id，必填
            type: [String, Number],
            required: true
        }
    },
    methods: {
        filterData() {
            let data = this.tableData,
                newArr = [];
            data.forEach(item => {
                let newItem = this.$util.deepClone(item);
                newArr.push(newItem);
            });
            this.newArr = newArr;
        },
        first() {       //获取第一条数据
            this.filterData();
            if(this.index != 0) {
                this.index = 0;
                this.id = this.newArr[0]['id'];      //将当前id赋值给this.id，好方便前翻后翻从此id开始
                this.$emit('getPositionData', this.newArr[0]);
            } else {
                this.$message({message: '已经是第一条了', duration: 1000, type: 'warning'});
            }
        },
        prev() {            //获取当前id的上一条数据
            this.filterData();
            let data = this.newArr;
            data.forEach((item, index) => {
                if(item['id'] == this.id) {
                    if(index <= 0) {
                        index = 0;
                        this.$message({message: '已经是第一条了，不可前翻', duration: 1000, type: 'warning'});
                    } else {
                        index--;
                    }
                    this.index = index;
                }
            });
            this.id = data[this.index]['id'];
            this.$emit('getPositionData', data[this.index]);
        },
        next() {            //获取当前id的下一条数据
            this.filterData();
            let data = this.newArr;
            data.forEach((item, index) => {
                if(item['id'] == this.id) {
                    if(index >= data.length - 1) {
                        index = index = data.length - 1;
                        this.$message({message: '已经是最后一条了，不可后翻', duration: 1000, type: 'warning'});
                    } else {
                        index++;
                    }
                    this.index = index;
                }
            });
            this.id = data[this.index]['id'];
            this.$emit('getPositionData', data[this.index]);
        },
        last() {            //获取最后一条数据
            this.filterData();
            let data = this.newArr;
            if(this.index != data.length - 1){
                this.index = data.length - 1;
                this.id = data[data.length - 1]['id'];          //将当前id赋值给this.id，好方便前翻后翻从此id开始
                this.$emit('getPositionData', data[data.length - 1]);
            }else{
                this.$message({message: '已经是最后一条了', duration: 1000, type: 'warning'});
            }
            
        }
    },
    created() {
        this.filterData();
    }
}
</script>

<style scoped>
    .mdf {text-align: right;margin-right: 15px;}
</style>

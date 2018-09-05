<template>
    <section class="goods_cate">
        <!-- swipe start -->
        <mt-swipe :auto="5000">
            <mt-swipe-item>
                <div v-for="(itemList,index) in goodsList" v-if="index < 10">
                    <div class="goods-item" @click="$router.push({path:'/food',query:{cid: itemList._id,name: itemList.name}})">
                        <img :src="'/api' + itemList.img.substr(1)" width="45" height="45">
                        <span class="goods-item-name">{{itemList.name}}</span>
                    </div>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </section>
</template>
<style scoped>
    .goods_cate {
        height: 176px;
    }
    .goods_cate .goods-item {
        width: 20%;
        float: left;
        text-align: center;
        margin-top: 12px;
    }
    .goods-item-name {
        display: block;
        font-size: 12px;
    }
</style>
<script>
var _ = require('lodash');          //防止抖动
import { mapState } from 'vuex'
export default {
    data () {
        return {
            txt: '',
            answer: 'I cannot give you an answer until you ask a question!'
        }
    },
    computed: {
        ...mapState('goodsModule',['goodsList'])
    },
    watch: {
        txt: function ( newVal, oldVal ){
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer();
        }
    },
    mounted (){
        if( !this.goodsList ) {
            this.getGoodsCate();
        }
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getGoodsCate () {
            this.$http.post('/api/goods/goods_cate').then( res => {
                this.$store.commit('goodsModule/getGoodsCate',res.data.goodsList);
            });
        },
        getAnswer() {
            console.log(this.txt)
            this.answer = this.txt;
        }
    }
}
</script>
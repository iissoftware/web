<template>
    <div>
        <div class="search-input">
            <router-link to="/">
                <img src="../assets/icon/back.png" class="back">
            </router-link>
            <div class="serach-box">
                <input type="text" v-model="value" autofocus="autofocus" placeholder="输入商家、商品名称" @keyup="onchange">
            </div>
        </div>
        <div v-if="isshow">
            <section class="index-22vWR">
                <span>热门搜索</span>
            </section>
            <section class="index-item">
                <span v-for="item in hotData" :key="item" @click="searchFn(item)">{{item}}</span>
            </section>
        </div>
        <div class="shop-list" v-if="!isshow">
            <ul
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="5">
              <li v-for="item in searchResult" class="shoplist">
                  <div class="shoplist-item">
                      <div class="shop-img">
                          <img :src="item.src" width="100%" height="100%">
                      </div>
                      <div class="shop-main">
                        <h3 class="shopname">
                            <span>{{ item.name }}</span>
                        </h3>
                        <div class="rate">
                            <el-rate
                              v-model="item.rate"
                              disabled
                              show-score
                              text-color="#ff9900"
                              score-template="{value}">
                            </el-rate>
                            <span>月售{{item.sales}}单</span>
                        </div>
                        <div class="index-money">
                            <span>￥{{item.takePrice}}起送 | 配送费￥{{item.dispatchPrice}}</span>
                        </div>
                      </div>
                  </div>
              </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .search-input{
        display: flex;
        padding: 30px 15px;
        margin-bottom: 10px;
    }
    .search-input .back{
        display: block;
        width: 58px;
        height: 50px;
        margin-right: 30px;
        margin-top: 5px;
    }
    .serach-box {
        width: 550px;
        height: 60px;
    }
    .serach-box input {
        background-color: #eee;
        border: none;
        height: 100%;
        width: 100%;
        outline: none;
        padding: 0 30px;
        line-height: 60px;
    }

    .index-22vWR {
        font-size: 32px;
        padding: 5px 30px;
        font-weight: 700;
    }
    .index-item  {
        padding: 0 30px;
        overflow: hidden;
        margin-bottom: 30px;
    }
    .index-item > span {
        display: block;
        padding: 15px 20px;
        float: left;
        background-color: #f5f5f5;
        margin-top: 30px;
        margin-right: 20px;
    }
</style>
<script>
export default {
    data () {
        return {
            value: '',
            isshow: true,
            hotData: ['汉堡','蛋糕','麦当劳','麻辣烫','水果减30','会员领红包','小龙虾'],
            searchResult: []
        }
    },
    methods: {
        searchFn ( item ) {
            this.value = item;
            this.isshow = false;
            this.searchResult.splice(0,this.searchResult.length);           //先清空数组
            this.$http.get('/static/recommend-seller.json')
            .then(( res ) => {
                let arr = res.data;
                for( let i = 0; i < arr.length; i++ ) {
                    var name = arr[i]['name'];
                    if( name.indexOf(item) > 0 ) {
                        this.searchResult.push(arr[i]);
                    }
                }
            })
        },
        onchange () {
            if( !this.value ) {
                this.isshow = true;
            }else {
                this.searchFn(this.value);
            }
            
        }
    }
}
</script>

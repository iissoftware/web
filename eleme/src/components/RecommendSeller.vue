<template>
    <div class="shop-list">
        <ul
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5">
          <li v-for="item in shoplist" class="shoplist">
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
</template>
<script>
export default {
    data(){
        return {
            shoplist: []
        }
    },
    created (){
        this.getShopList();
    },
    methods: {
        getShopList () {        //推荐商家
            this.$http.get('/static/recommend-seller.json')
                .then(( res ) => {
                    this.shoplist = res.data;
                })
                .catch(( err ) => {
                    console.log(err)
                });
        }
    }
}
</script>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import userModule from './modules/userModule'
import goodsModule from './modules/goodsModule'
import tjshopModule from './modules/tjshopModule'
import shopListModule from './modules/shopListModule'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        userModule,
        goodsModule,
        tjshopModule,
        shopListModule
    }
});


export default store;
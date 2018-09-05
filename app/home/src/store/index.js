import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,
        mobile: ''
    },
    mutations: {
        login ( state, data ) {                   //登录时设置token
            localStorage.token = data;
            state.token = data;
        },
        logout ( state, data ) {                   //退出删除token
            localStorage.removeItem('token');
            state.token = null;
        }
    }
});


export default store;
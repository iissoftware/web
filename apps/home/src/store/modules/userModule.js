import axios from 'axios'
const userModule = {
    namespaced:true,
    state: {
        token: null,
        mobile: '',
        username: '',
        headImg: ''
    },
    getters: {
        enMobile ( state ) {        //加密手机号
            return state.mobile.replace(/^(\d{3})\d{4}(\d{4})/,'$1****$2');
        },
        head ( state ) {
            return state.headImg.substr(1);
        }
    },
    mutations: {
        login ( state, data ) {                   //登录时设置token
            localStorage.token = data;
            state.token = data;
        },
        logout ( state, data ) {                   //退出删除token
            localStorage.removeItem('token');
            state.token = null;
        },
        getUserInfo ( state, payload ) {            //获取用户信息
            state.mobile = payload.mobile;
            state.username = payload.username;
            state.headImg = payload.url;
        }
    },
    actions: {
        getUserInfo ({commit, rootState}) {
            axios.post('/api/user/getUserInfo').then( res => {
                commit('getUserInfo',res.data);
            })
        }
    }
}

export default userModule;
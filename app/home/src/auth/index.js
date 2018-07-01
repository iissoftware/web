
/* 
    这里是axios对全局路由进行拦截处理
*/
import axios from 'axios'
import store from '../store'
import router from '../router'


//axios配置
axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'https://localhost:3000'



//http request 拦截器
axios.interceptors.request.use(( config ) => {
    if( store.state.token ) {       //如果token存在
        config.headers.Authorization = ` token ${ store.state.token } `;
    }
    return config;
}, ( error ) => {
    return Promise.reject( error );
});



//http response 拦截器
axios.interceptors.response.use( ( response ) => {
    return response;
}, ( err ) => {
    if( err.response ) {
        switch( err.response.status ) {     // 返回 401 清除token信息并跳转到登录页面
            case 401: 
                store.commit('logout');
                router.replace({
                    path: 'login',
                    query: { redirect: router.currentRoute.fullPath }
                });
        }
    }
    return Promise.reject(error.response.data);           // 返回接口返回的错误信息
});


export default axios;
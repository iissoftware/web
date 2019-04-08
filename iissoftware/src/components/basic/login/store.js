const state = {
    activeName: 'second',
    isPhoneLogin: false,        //是否是（手机号 + 手机验证码）登录
    isOpenFotgotPass: false,        //是否打开忘记密码弹窗
}

const mutations = {
    updateActiveName(state, activeName) {
        state.activeName = activeName;
    },
    updatePhoneLogin(state, bool) {
        state.isPhoneLogin = bool;
    },
    updateOpenFotgotPass(state, bool) {
        state.isOpenFotgotPass = bool;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
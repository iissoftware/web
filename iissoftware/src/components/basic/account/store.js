const state = {
    status: [0],      //系统信息状态，0：系统信息展示，1：账套新增（此时编辑页面字段为空），2：账套查看（不可编辑），3：账套修改（可编辑）
    accountInfoId: '',       //账套信息id
}

const mutations = {
    updateStatus(state, status) {
        state.status.length = 0;
        state.status.push(status);
    },
    updateAccountInfoId(state, id) {         //更新账套信息id
        state.accountInfoId = id;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
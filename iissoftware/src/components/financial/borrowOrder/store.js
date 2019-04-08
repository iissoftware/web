import Axios from "axios";

const state = {
    loanName:[]                     //借款类别
}

const mutations = {
    updateLoan(state,data){                          //借款类别弹窗的数据        
        let loanName = state.loanName;
        loanName.length = 0;
        loanName.push(data);
        console.log(state.loanName,'state')
    },

}

const actions = {               //异步提交mutations
    // getProjectTreeData({state, dispatch, commit}, $url) {               //获取会计科目树形结构数据
    //     Axios.get($url).then(res => {
    //         if(res.data.code == 20001) {
    //             if(res.data.data) {
    //                 let projectTreeData = state.projectTreeData,
    //                 data = res.data.data;
    //                 projectTreeData.length = 0;
    //                 data.forEach(item => projectTreeData.push(item));
    //                 commit('setTreeDataNo', projectTreeData);          //给节点加上编码
    //             }
    //         }
    //     });
    // },
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
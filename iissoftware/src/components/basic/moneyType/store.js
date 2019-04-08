import Axios from "axios";

const state = {
    rowId: '',          //修改的行id
    tableData: []
}

const mutations = {             //负责更改state状态下的变量
    updateRowId(state, id) {            //更改行id
        state.rowId = id;
    }
}

const actions = {
    getTableData({state}, $url) {
        Axios.get($url).then(res => {
            if(res.data.code == 20001) {
                if(res.data.data) {
                    let tableData = state.tableData,
                        data = res.data.data;
                    if(data.length > 0) {
                        tableData.length = 0;
                        data.forEach(item => tableData.push(item));
                    } else {
                        tableData.splice(0);
                    }
                }
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
const goodsModule = {
    namespaced:true,
    state: {
        goodsList: ''
    },
    mutations: {
        getGoodsCate ( state, payload ) {
            state.goodsList = payload;
        }
    }
}

export default goodsModule;
const tjshopModule = {
    namespaced:true,
    state: {
        goodsList: ''
    },
    mutations: {
        getTJShop ( state, payload ) {
            state.goodsList = payload;
        }
    }
}

export default tjshopModule;
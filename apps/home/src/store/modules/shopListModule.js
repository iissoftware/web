const shopListModule = {
    namespaced:true,
    state: {
        goodsList: ''
    },
    mutations: {
        getShopList ( state, payload ) {
            state.goodsList = payload;
        }
    }
}

export default shopListModule;
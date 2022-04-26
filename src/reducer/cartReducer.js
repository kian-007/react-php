const CartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                carts: [
                    ...state.carts,
                    action.id,
                ]
            }
        case 'REMOVE_FROM_CART':
            let newCarts = state.carts;
            newCarts.splice(
                state.carts.findIndex((cartId) => cartId === action.id),
                1
            );
            return {
                ...state,
                carts: newCarts,
            }
    }
}

export default CartReducer;
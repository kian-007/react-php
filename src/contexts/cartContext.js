import React,{createContext, useReducer} from 'react';
import CartReducer from '../reducer/cartReducer'

export const CartContext = createContext();

const CartContextProvider = (props) =>{

    const[state, dispatch] = useReducer(CartReducer, {
        carts: []
    })

    let added = false;

    return(
        <CartContext.Provider value={{...props, carts: state.carts, dispatchCart: dispatch, added}} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
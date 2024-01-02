import { useState } from "react";
import CartContext from "./cartContext";

const CartState = (props)=>{
    const [cart, setCart] = useState(0);


    return(
        <CartContext.Provider value={{cart, setCart}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState;
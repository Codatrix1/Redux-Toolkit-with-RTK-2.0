import React from "react";
import CartItem from "./CartItem";

import { useSelector, useDispatch } from "react-redux";

// Actions
// import { clearCart } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

//-----------------------------------------------------------
const CartContainer = () => {
  const dispatch = useDispatch();

  const { cartItems, itemCount, totalPrice } = useSelector(
    (store) => store.cart
  );

  if (itemCount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your cart</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      {/* CART HEADER */}
      <header>
        <h2>your cart</h2>
      </header>
      {/* ITEMS MAPPING */}
      <div>
        {cartItems.map((eachItem) => {
          return <CartItem key={eachItem.id} {...eachItem} />;
        })}
      </div>
      {/* FOOTER */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${`${totalPrice.toFixed(2)}`}</span>
          </h4>
        </div>
        {/* CLEAR CART BUTTON */}
        {/*<button className="btn clear-btn" onClick={() => dispatch(clearCart())}>
          clear cart
      </button>*/}
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;

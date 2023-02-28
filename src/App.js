import React from "react";
import { useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";

import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

//------------------------------------------------------------------
const App = function () {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    /* eslint-disable */
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems("random"));
    /* eslint-disable */
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="loading">...Loading</h2>
      </div>
    );
  }

  return (
    <main>
      {isOpen ? <Modal /> : null}
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;

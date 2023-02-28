import React from "react";
import { CartIcon } from "../icons";

// Redux
import { useSelector } from "react-redux";

const Navbar = () => {
  const { itemCount } = useSelector((store) => store.cart);

  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>

        <div className="nav-container">
          <CartIcon />

          <div className="amount-container">
            <p className="total-amount">{itemCount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Cart({
  isOpen,
  onClose,
  orders,
  addQuantity,
  subtractQuantity,
  openCheckout,
  getTotal,
}) {
  const dialog = useRef();

  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  const total = orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0
  );

  useEffect(() => {
    getTotal(total);
  }, [total, getTotal]);

  return createPortal(
    <dialog ref={dialog} className="modal Cart">
      <h2>Your Cart</h2>
      <ul>
        {orders.map((order, index) => {
          return (
            <li className="cart-item" key={index}>
              <p>
                {order.name} - ${order.price}
              </p>
              <div className="cart-item-actions">
                <button onClick={() => subtractQuantity(index)}>-</button>
                {order.quantity}
                <button onClick={() => addQuantity(index)}>+</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="cart-total">${total.toFixed(2)}</div>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button" onClick={openCheckout}>
          Go to Checkout
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}

export default Cart;

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

function Checkout({ isOpen, onClose, total, orders }) {
  const dialog = useRef();

  const [fullName, setFullName] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (dialog.current.open) {
        dialog.current.close();
      }
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("http://localhost:3000/orders", {
      order: {
        items: orders,
        customer: {
          email: emailAdress,
          name: fullName,
          street: street,
          "postal-code": postalCode,
          city: city,
        },
      },
    });

    onClose();
  }

  return createPortal(
    <dialog ref={dialog} open={isOpen} className="modal Cart">
      <h2>Checkout</h2>
      <p>Total Amount : ${total}</p>
      <form onSubmit={handleSubmit}>
        <div className="control">
          <div className="control">
            <label htmlFor="full-name">Full Name</label>
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="control">
            <label htmlFor="email"> Email Adress</label>
            <input
              id="email"
              type="email"
              value={emailAdress}
              onChange={(e) => setEmailAdress(e.target.value)}
            />
          </div>

          <div className="control">
            <label htmlFor="Street">Street</label>
            <input
              id="Street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="control-row">
            <div className="control">
              <label htmlFor="Postal">Postal Code</label>
              <input
                id="Postal"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="control">
              <label htmlFor="City">City</label>
              <input
                id="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="text-button" onClick={onClose}>
            Close
          </button>
          <button className="button">Submit Order</button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
Checkout;
export default Checkout;

import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { useState } from "react";
import Checkout from "./components/Checkout";

function App() {
  const [itemsLen, setItemsLen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState();

  function addItem(meal) {
    setOrderList((prevItem) => [
      ...prevItem,
      { name: meal.name, price: meal.price, quantity: 1 },
    ]);
    setItemsLen(orderList.length + 1);
  }

  function addQuantity(index) {
    setOrderList((prevOrderList) => {
      const updatedOrderList = [...prevOrderList];
      updatedOrderList[index].quantity += 1;
      return updatedOrderList;
    });
  }

  function subtractQuantity(index) {
    setOrderList((prevOrderList) => {
      const updatedOrderList = [...prevOrderList];
      if (updatedOrderList[index].quantity > 1) {
        updatedOrderList[index].quantity -= 1;
      }
      return updatedOrderList;
    });
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openCheckout() {
    setIsCheckoutOpen(true);
    setIsModalOpen(false);
  }

  function closeCheckout() {
    setIsCheckoutOpen(false);
  }

  function getTotal(e) {
    setTotal(e);
  }

  return (
    <>
      <Header itemsLength={itemsLen} openModal={openModal} />
      <Products addItem={addItem} />
      <Cart
        isOpen={isModalOpen}
        onClose={closeModal}
        orders={orderList}
        addQuantity={addQuantity}
        subtractQuantity={subtractQuantity}
        openCheckout={openCheckout}
        getTotal={getTotal}
      />
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        total={total}
        orders={orderList}
      />
    </>
  );
}

export default App;

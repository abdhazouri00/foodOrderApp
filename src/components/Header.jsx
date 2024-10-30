import "../index.css";
import logo from "../assets/logo.jpg";

function Header({ itemsLength, openModal }) {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} />
        <h1>REACTFOOD</h1>
      </div>
      <button className="button" onClick={openModal}>
        <h1>Cart({itemsLength})</h1>
      </button>
    </div>
  );
}

export default Header;

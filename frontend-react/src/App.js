import { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState(0);

  const clap = () => {
    const amount = 1000;

    if (cart + amount <= 100000) {
      setCart(cart + amount);
    } else {
      alert("Cart limit reached (1,00,000)");
    }
  };

  return (
    <div className="container">
      <h1>Ashok</h1>

      <div className="clap" onClick={clap}>
        👏
      </div>

      <p>Cart Amount: ₹{cart}</p>
    </div>
  );
}

export default App;

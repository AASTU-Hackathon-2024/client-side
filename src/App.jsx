import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import "./i18n";
import CheckOut from "./pages/CheckOut";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wish" element={<WishList />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

// const [first, setfirst] = useState([]);
// useEffect(async () => {
//   const response = await fetch("http://localhost:8000/user/list");
//   const data = await response.json();
//   console.log(data);
//   setfirst(data);
// }, []);

// console.log(first);

// // title, description, category, price, variations

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const data = {
//     title: "test title",
//     description: "test description",
//     category: "test  category",
//     price: "test 2000000",
//     variations: "test variations",
//   };
//   const response = await fetch("http://localhost:8000/product/upload", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   const res = await response.json();
//   console.log(res);
// };

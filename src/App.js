import './App.css';
import Register from './Register';
import Login from './Login';
import Layout from "./Layout";
import Product from "./Product";
import ProductType from "./ProductType";
import Category from "./Category";
import OfferEvent from "./OfferEvent";
import OfferHeader from "./OfferHeader";

import { Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/*<Route element={<RequireAuth />} >*/}
                  <Route path="product" element={<Product />} />
                  <Route path="product-type" element={<ProductType />} />
                  <Route path="category" element={<Category />} />
                  <Route path="offer-event" element={<OfferEvent />} />
                  <Route path="offer-header" element={<OfferHeader />} />
              {/*</Route>*/}

          </Route>
      </Routes>
  );
}

export default App;

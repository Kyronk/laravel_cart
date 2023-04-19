import logo from './logo.svg';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from './pages/product.list.page/Product.list.page';
import ProductItemPage from './pages/product.item.page/Product.item';
import CartPage from './pages/cart.page/Cart.page';
function App() {
    return (
        <Router>
            <Routes>
                hello

                <Route path="/product-list" element={<ProductListPage/>} />
                <Route path="/product-list/item/:id" element={<ProductItemPage /> } />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    );
}

export default App;

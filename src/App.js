import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Home from './components/home/Home';
import AddItem from './components/additem/AddItem';
import Product from './components/product/Product';
import CartItem from './components/cart/CartItem';
import Cart from './components/cart/Cart';
import CartState from './context/cart/cartState';
import Loader from './components/loader/Loader';

function App() {
  return (
    <>
      <BrowserRouter>
        <CartState>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/home' element={<Home/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/addItem' element={<AddItem/>}></Route>
            <Route exact path='/cart' element={<Cart/>}></Route>
            <Route exact path='/loader' element={<Loader/>}></Route>
          </Routes>
        </CartState>
      </BrowserRouter>
    </>
  );
}

export default App;

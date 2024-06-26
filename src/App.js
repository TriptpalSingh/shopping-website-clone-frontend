import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import AddItem from './components/additem/AddItem';
import Product from './components/product/Product';
import CartItem from './components/cart/CartItem';
import Cart from './components/cart/Cart';
import CartState from './context/cart/cartState';
import Loader from './components/loader/Loader';
import { Provider } from 'react-redux';
import store from './state/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <CartState>
            <Routes>
              <Route exact path='/' element={<Home/>}></Route>
              <Route exact path='/home' element={<Home/>}></Route>
              <Route exact path='/login' element={<Login/>}></Route>
              <Route exact path='/addItem' element={<AddItem/>}></Route>
              <Route exact path='/cart' element={<Cart/>}></Route>
              <Route exact path='/signup' element={<Signup/>}></Route>
            </Routes>
          </CartState>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

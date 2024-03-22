import './App.css';
import './css/custom.css';
import './css/style.default.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import Detail from './Detail/Detail';
import History from './History/History';
import Home from './Home/Home';
import Chat from './Share/Chat/Chat';
import Footer from './Share/Footer/Footer';
import Header from './Share/Header/Header';
import Shop from './Shop/Shop';
import { getToken } from './utils/auth';
// import ErrorBoundary from './templates/ErrorBoundary';

function App() {
  const isAuth = useSelector((state) => state.Session.isAuth);
  const token = getToken();
  return (
    <div className="App">
      {/* <ErrorBoundary> */}

      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/history/*" element={<History />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      {(isAuth || token) && <Chat />}
      <Footer />

      {/* </ErrorBoundary> */}
    </div>
  );
}

export default App;

import React, { useEffect, useMemo, useState } from 'react';
import ListCart from './Component/ListCart';
import alertify from 'alertifyjs';
import { Link, Navigate } from 'react-router-dom';
import CartAPI from '../API/CartAPI';
import queryString from 'query-string';
import convertMoney from '../convertMoney';
import notification, { errorNotification } from '../helpers/notification';

function Cart() {
  //id_user được lấy từ redux
  // const id_user = useSelector((state) => state.Cart.id_user)

  const idUser = localStorage.getItem('id_user');

  //listCart được lấy từ redux
  // const listCart = useSelector((state) => state.Cart.listCart);

  const [cart, setCart] = useState([]);

  // const dispatch = useDispatch();

  // //State dùng để Load dữ liệu từ Redux
  // const [loadRedux, setLoadRedux] = useState({
  //   idProduct: '',
  //   count: '',
  // });

  //State dùng để Load dữ liệu từ API
  const [loadAPI, setLoadAPI] = useState(false);

  //Hàm này dùng để Load dữ liệu ở Redux
  // //Khi người dùng chưa đăng nhập
  // useEffect(() => {
  //   const fetchDataRedux = () => {
  //     if (!localStorage.getItem('id_user')) {
  //       setCart(listCart);

  //       getTotal(listCart);
  //     }
  //   };

  //   fetchDataRedux();
  // }, [loadRedux]);

  //Hàm này dùng để tính tổng tiền carts
  // const getTotal = useCallback(
  //   (carts) => {
  //     if (cart.length > 0) {

  //     }
  //   },
  //   [cart, loadAPI],
  // );
  // function getTotal(carts) {
  //   let sub_total = 0;

  //   const sum_total = carts?.map((value) => {
  //     return (sub_total +=
  //       parseInt(value.priceProduct) * parseInt(value.count));
  //   });

  //   setTotal(sub_total);
  // }
  const totalPrice = useMemo(() => {
    return cart?.length > 0
      ? cart
          .map((item) => item.product.price * item.quantity)
          .reduce((acc, cur) => acc + cur, 0)
      : 0;
  }, [cart, loadAPI]);
  // console.log(totalPrice);

  //Hàm này dùng để load dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        idUser,
      };

      const query = '?' + queryString.stringify(params);
      try {
        const response = await CartAPI.getCarts(query);

        setCart(response.data);
      } catch (err) {
        errorNotification(err?.response?.data?.message || err.message);
      }

      // getTotal(response);
    };

    fetchData();

    setLoadAPI(false);
  }, [loadAPI]);

  //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha
  const onDeleteCart = async (getUser, getProduct) => {
    //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu
    try {
      const params = {
        idUser: getUser,
        idProduct: getProduct,
      };

      const query = '?' + queryString.stringify(params);

      await CartAPI.deleteToCart(query);
      //Sau đó thay đổi state loadAPI và load lại hàm useEffect
      setLoadAPI(true);
      notification('Bạn Đã Xóa Hàng Thành Công!', 'error');
    } catch (err) {
      errorNotification(err?.response?.data?.message || err.message);
      // notification(err?.response?.data?.message || err.message, 'error');
    }
  };

  //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha
  const onUpdateCount = async (getUser, getProduct, getCount) => {
    //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu

    const params = {
      idUser: getUser,
      idProduct: getProduct,
      count: getCount,
    };

    const query = '?' + queryString.stringify(params);
    try {
      await CartAPI.putToCart(query);

      setLoadAPI(true);
      notification('Bạn đã sửa hàng thành công', 'success');
    } catch (err) {
      console.log(err);
      notification(err?.response?.data?.message || err.message, 'error');
    }
  };

  //Hàm này dùng để redirect đến page checkout
  const [redirect, setRedirect] = useState(false);

  const onCheckout = () => {
    if (!localStorage.getItem('id_user')) {
      notification('Vui lòng kiểm tra lại đăng nhập', 'error');
      return;
    }

    if (cart.length === 0) {
      errorNotification('Giỏ hàng trống');
      return;
    }

    setRedirect(true);
  };
  // const navigate = useNaigate()

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Cart</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <ListCart
              listCart={cart}
              onDeleteCart={onDeleteCart}
              onUpdateCount={onUpdateCount}
              idUser={idUser}
            />

            <div className="bg-light px-4 py-3">
              <div className="row align-items-center text-center">
                <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                  <Link
                    className="btn btn-link p-0 text-dark btn-sm"
                    to={`/shop`}
                  >
                    <i className="fas fa-long-arrow-alt-left mr-2"> </i>
                    Continue shopping
                  </Link>
                </div>
                <div className="col-md-6 text-md-right">
                  {redirect && (
                    <Navigate to={'/checkout'} state={{ total: totalPrice }} />
                  )}
                  <span
                    className="btn btn-outline-dark btn-sm"
                    onClick={onCheckout}
                  >
                    Proceed to checkout
                    <i className="fas fa-long-arrow-alt-right ml-2"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Cart total</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="text-uppercase small font-weight-bold">
                      Subtotal
                    </strong>
                    <span className="text-muted small">
                      {convertMoney(totalPrice)} VND
                    </span>
                  </li>
                  <li className="border-bottom my-2"></li>
                  <li className="d-flex align-items-center justify-content-between mb-4">
                    <strong className="text-uppercase small font-weight-bold">
                      Total
                    </strong>
                    <span>{convertMoney(totalPrice)} VND</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;

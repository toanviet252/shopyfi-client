import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import convertMoney from '../../convertMoney';
import { tableHead } from '../../constant/table';

ListCart.propTypes = {
  listCart: PropTypes.array,
  onDeleteCart: PropTypes.func,
  onUpdateCount: PropTypes.func,
  idUser: PropTypes.string,
};

ListCart.defaultProps = {
  listCart: [],
  onDeleteCart: null,
  onUpdateCount: null,
  idUser: undefined,
};

function ListCart(props) {
  const { listCart, onDeleteCart, onUpdateCount, idUser } = props;

  const handlerDelete = (idProduct) => {
    if (!onDeleteCart) {
      return;
    }

    onDeleteCart(idUser, idProduct);
  };

  const handlerDown = (getIdUser, getIdProduct, getCount) => {
    if (!onUpdateCount) {
      return;
    }

    if (getCount === 1) {
      // gọi hàm delete
      return handlerDelete(getIdProduct);
    }

    onUpdateCount(getIdUser, getIdProduct, +getCount - 1);
  };

  const handlerUp = (getIdUser, getIdProduct, getCount) => {
    if (!onUpdateCount) {
      return;
    }

    onUpdateCount(getIdUser, getIdProduct, +getCount + 1);
  };

  return (
    <div className="table-responsive mb-4">
      <table className="table">
        <thead className="bg-light">
          <tr className="text-center">
            {tableHead.map((item, index) => {
              return (
                <th className="border-0" scope="col" key={index}>
                  {' '}
                  <strong className="text-small text-uppercase">{item}</strong>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {listCart?.length > 0 &&
            listCart.map((value, index) => (
              <tr className="text-center" key={index}>
                <td className="pl-0 border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor d-block animsition-link"
                      to={`/detail/${value.product._id}`}
                    >
                      <img src={value.product.photos[0]} alt="..." width="70" />
                    </Link>
                  </div>
                </td>
                <td className="align-middle border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor h6 animsition-link"
                      to={`/detail/${value.product._id}`}
                    >
                      {value.product.name}
                    </Link>
                  </div>
                </td>

                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {convertMoney(value.product.price)} VND
                  </p>
                </td>
                <td className="align-middle border-0">
                  <div className="quantity justify-content-center">
                    <button
                      className="dec-btn p-0"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        handlerDown(idUser, value.product._id, value.quantity)
                      }
                    >
                      <i className="fas fa-caret-left"></i>
                    </button>
                    <input
                      className="form-control form-control-sm border-0 shadow-0 p-0"
                      type="text"
                      value={value.quantity}
                      readOnly
                    />
                    <button
                      className="inc-btn p-0"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        handlerUp(idUser, value.product._id, value.quantity)
                      }
                    >
                      <i className="fas fa-caret-right"></i>
                    </button>
                  </div>
                </td>
                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {convertMoney(
                      parseInt(value.product.price) * parseInt(value.quantity),
                    )}{' '}
                    VND
                  </p>
                </td>
                <td className="align-middle border-0">
                  <a
                    className="reset-anchor remove_cart"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlerDelete(value.product._id)}
                  >
                    <i className="fas fa-trash-alt small text-muted"></i>
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCart;

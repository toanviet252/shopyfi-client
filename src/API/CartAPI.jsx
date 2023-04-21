import axiosClient from './axiosClient';

const CartAPI = {
  getCarts: async (query) => {
    const url = `/carts${query}`;
    return await axiosClient.get(url);
  },

  postAddToCart: async (query) => {
    const url = `/carts/add${query}`;
    return await axiosClient.post(url);
  },

  deleteToCart: async (query) => {
    const url = `/carts/delete${query}`;
    return await axiosClient.delete(url);
  },

  putToCart: (query) => {
    const url = `/carts/update${query}`;
    return axiosClient.patch(url);
  },
};

export default CartAPI;

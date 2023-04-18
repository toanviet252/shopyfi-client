import axiosClient from './axiosClient';

const ProductAPI = {
  getAPI: async (params) => {
    const url = '/products';
    return await axiosClient.get(url, { params });
  },

  getCategory: async (query) => {
    const url = `/products/category${query}`;
    return await axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/products/pagination${query}`;
    return axiosClient.get(url);
  },
  getAllProducts: async () => {
    return axiosClient.get('/shop');
  },
};

export default ProductAPI;

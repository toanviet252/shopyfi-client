import axiosClient from './axiosClient';

const CheckoutAPI = {
  postOrder: async (body) => {
    const url = `/checkout`;
    return await axiosClient.post(url, body);
  },
};

export default CheckoutAPI;

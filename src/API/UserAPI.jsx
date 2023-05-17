import axiosClient from './axiosClient';

const UserAPI = {
  getAllData: () => {
    const url = '/users';
    return axiosClient.get(url);
  },
  login: async (data) => {
    const url = '/signin';
    return await axiosClient.post(url, data);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (body) => {
    const url = `/signup`;
    return axiosClient.post(url, body);
  },

  postSignOut: () => {
    const url = '/signout';
    return axiosClient.post(url);
  },

  deleteChatroom: async (roomId) => {
    return await axiosClient.delete(`/chatrooms/${roomId}`);
  },
};

export default UserAPI;

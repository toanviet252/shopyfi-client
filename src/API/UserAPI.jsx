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

    postSignUp: (query) => {
        const url = `/users/signup/${query}`;
        return axiosClient.post(url);
    },
};

export default UserAPI;

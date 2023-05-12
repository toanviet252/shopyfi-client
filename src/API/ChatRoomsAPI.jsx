import axiosClient from './axiosClient';

const ChatRoomsAPI = {
  getMessageByRoomId: (roomId) => {
    const url = `/chatrooms/?roomId=${roomId}`;
    return axiosClient.get(url);
  },

  createNewRoom: (userId) => {
    console.log(userId);
    const url = `/chatrooms?userId=${userId}`;
    return axiosClient.post(url);
  },

  addMessage: (body) => {
    const url = `/chatrooms/addMessage`;
    return axiosClient.post(url, body);
  },
};

export default ChatRoomsAPI;

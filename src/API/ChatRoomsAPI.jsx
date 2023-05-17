import axiosClient from './axiosClient';

const ChatRoomsAPI = {
  getMessageByRoomId: async (roomId) => {
    const url = `/chatrooms/?roomId=${roomId}`;
    return await axiosClient.get(url);
  },

  createNewRoom: (userId) => {
    // console.log(userId);
    const url = `/chatrooms?userId=${userId}`;
    return axiosClient.post(url);
  },

  addMessage: async (body) => {
    const url = `/chatrooms/addMessage`;
    return await axiosClient.post(url, body);
  },

  deleteChatroom: (roomId) => {
    return axiosClient.delete(`/chatrooms/${roomId}`);
  },
};

export default ChatRoomsAPI;

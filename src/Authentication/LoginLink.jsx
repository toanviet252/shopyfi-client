import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteSession } from '../Redux/Action/ActionSession';
import { clearToken } from '../utils/auth';
import { errorNotification } from '../helpers/notification';
import UserAPI from '../API/UserAPI';
import io from 'socket.io-client';

function LoginLink() {
  const dispatch = useDispatch();
  // const socket = io('http://localhost:5000');
  const roomId = localStorage.getItem('room_id');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (!roomId) return;
    try {
      // xóa session và roomid
      await UserAPI.deleteChatroom(roomId);
      await UserAPI.postSignOut();
      clearToken();
      const action = deleteSession('');
      dispatch(action);
      navigate('/signin');

      // socket.disconnect();
    } catch (err) {
      errorNotification(err?.response?.data?.message || err.message);
    }
  };

  return (
    <li className="nav-item" onClick={handleSignOut}>
      <span className="nav-link" style={{ cursor: 'pointer' }}>
        ( Logout )
      </span>
    </li>
  );
}

export default LoginLink;

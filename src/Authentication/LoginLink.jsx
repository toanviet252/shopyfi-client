import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSession } from '../Redux/Action/ActionSession';
import { clearToken } from '../utils/auth';
import { errorNotification } from '../helpers/notification';
import UserAPI from '../API/UserAPI';
import io from 'socket.io-client';

function LoginLink() {
  const dispatch = useDispatch();
  // const socket = io('http://localhost:5000');

  const handleSignOut = async () => {
    try {
      clearToken();
      await UserAPI.postSignOut();
      const action = deleteSession('');
      dispatch(action);

      // socket.disconnect();
    } catch (err) {
      errorNotification(err?.response?.data?.message || err.message);
    }
  };

  return (
    <li className="nav-item" onClick={handleSignOut}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;

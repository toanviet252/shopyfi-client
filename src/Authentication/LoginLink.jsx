import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSession } from '../Redux/Action/ActionSession';
import { clearToken } from '../utils/auth';

function LoginLink() {
  const dispatch = useDispatch();

  const onRedirect = () => {
    clearToken();

    const action = deleteSession('');
    dispatch(action);
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;

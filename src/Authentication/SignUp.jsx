import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import './Auth.css';
import { errorNotification } from '../helpers/notification';
// import queryString from 'query-string';
// import MessengerAPI from '../API/MessengerAPI';

SignUp.propTypes = {};

function SignUp() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [errorEmail, setEmailError] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorFullname, setFullnameError] = useState(false);
  const [errorPhone, setPhoneError] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleInputChange = (e, setFunc) => {
    setFunc(e.target.value);
  };

  const handlerSignUp = (e) => {
    e.preventDefault();

    if (!fullname) {
      setFullnameError(true);
      setEmailError(false);
      setPhoneError(false);
      setPasswordError(false);
      setEmailRegex(false);
      return;
    } else {
      setFullnameError(false);
      setPhoneError(false);
      setPasswordError(false);
      setFullnameError(false);
      setEmailRegex(false);

      if (!email) {
        setFullnameError(false);
        setEmailError(true);
        setPhoneError(false);
        setPasswordError(false);
        return;
      } else {
        setEmailError(false);
        setPhoneError(false);
        setPasswordError(false);
        setFullnameError(false);

        if (!validateEmail(email)) {
          setEmailRegex(true);
          setFullnameError(false);
          setEmailError(false);
          setPhoneError(false);
          setPasswordError(false);
          return;
        } else {
          setEmailRegex(false);

          if (!password) {
            setFullnameError(false);
            setEmailError(false);
            setPhoneError(false);
            setPasswordError(true);
            return;
          } else {
            setFullnameError(false);
            setPhoneError(false);
            setPasswordError(false);
            setFullnameError(false);
            setEmailRegex(false);

            if (!phone) {
              setFullnameError(false);
              setEmailError(false);
              setPhoneError(true);
              setPasswordError(false);
            } else {
              const fetchSignUp = async () => {
                const data = {
                  fullName: fullname,
                  email,
                  password,
                  confirmPassword,
                  phoneNumber: phone,
                  address,
                };

                try {
                  await UserAPI.postSignUp(data);
                  // console.log(response);
                  setSuccess(true);
                } catch (err) {
                  errorNotification(
                    err?.response?.data?.message || err.message,
                  );
                }
              };

              fetchSignUp();

              // // Hàm này dùng để tạo các conversation cho user và admin
              // const fetchConversation = async () => {
              //   const params = {
              //     email: email,
              //     password: password,
              //   };

              //   const query = '?' + queryString.stringify(params);

              //   const response = await MessengerAPI.postConversation(query);
              //   console.log(response);
              // };

              // fetchConversation();
            }
          }
        }
      }
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign Up</span>
          <div className="d-flex justify-content-center pb-5">
            {errorFullname && (
              <span className="text-danger">
                * Please Check Your Full Name!
              </span>
            )}
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email!</span>
            )}
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password!</span>
            )}
            {errorPhone && (
              <span className="text-danger">
                * Please Check Your Phone Number!
              </span>
            )}
          </div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              value={fullname}
              onChange={(e) => handleInputChange(e, setFullName)}
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              type="text"
              placeholder="Email"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={phone}
              onChange={(e) => handleInputChange(e, setPhone)}
              type="text"
              placeholder="Phone"
            />
          </div>
          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={address}
              onChange={(e) => handleInputChange(e, setAddress)}
              type="text"
              placeholder="Address"
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            {success && <Navigate to={'/signin'} />}
            <button className="login100-form-btn" onClick={handlerSignUp}>
              Sign Up
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Login?</span>
            &nbsp;
            <Link to="/signin" className="txt2 hov1">
              Click
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

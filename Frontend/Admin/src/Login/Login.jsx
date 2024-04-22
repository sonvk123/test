import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

import queryString from "query-string";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  
  const [click, setClick] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true" ? true : false;
    isLogin && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    // nếu ko có email
    setClick(true);
    if (!validateEmail(email)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
      if (!validatePassword(password)) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
        const fetchData = async () => {
          const params = {
            email: email,
            password: password,
          };

          const query = "?" + queryString.stringify(params);

          const response = await UserAPI.postSignIn(query);

          if (response.error) {

            setIsError(true);
            setErrorMessage(response.message);
          } else {
            const user = {
              email: response.user.email,
              name_user: response.user.name_user,
            };
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
            localStorage.setItem("name_user_", JSON.stringify(user));
            navigate("/");
            window.location.reload();
          }
        };
        fetchData();
      }
    }
  };
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    const isValid = password.length >= 8;
    return isValid;
  }
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="login">
            <div className="heading">
              <h2>Sign in</h2>
              <form action="#">
                {click && isError && (
                  <div>
                    <span style={{ color: "red" }}>{errorMessage}</span>
                  </div>
                )}
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setClick(false);
                      setIsError(false);
                    }}
                  />
                </div>
                {click && errorEmail && (
                  <div>
                    <span style={{ color: "red" }}>
                      Mời nhập đúng địng dạng email !!!
                    </span>
                  </div>
                )}
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setClick(false);
                      setIsError(false);
                    }}
                  />
                </div>
                {click && errorPassword && (
                  <div>
                    <span style={{ color: "red" }}>
                      Password phải có ít nhất 8 ký tự !!!
                    </span>
                  </div>
                )}
                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { addUser, deleteAllCart } from "../Redux/Action/ActionCart";
import { addSession } from "../Redux/Action/ActionSession";

import "./Auth.css";
import queryString from "query-string";
import CartAPI from "../API/CartAPI";

function SignIn(props) {
  //listCart được lấy từ redux
  const listCart = useSelector((state) => state.Cart.listCart);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const [redirect, setRedirect] = useState(false);

  const [checkPush, setCheckPush] = useState(false);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setErrorMessage(false);
    setErrorEmail(false);
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setErrorMessage(false);
    setErrorPassword(false);
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    // nếu ko có email

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
            setErrorMessage(response.message);
          } else {
            localStorage.setItem("id_user", response.user._id);

            localStorage.setItem("isAdmin", response.user.isAdmin);

            localStorage.setItem("name_user", response.user.name_user);

            localStorage.setItem("njs_asm3_roomId", response.user.roomId);

            const actionAddUser = addUser(response.user._id);
            const actionAddSession = addSession(response.user);

            dispatch(actionAddUser);
            dispatch(actionAddSession);
            setCheckPush(true);
          }
        };
        fetchData();
      }
    }
  };

  // Hàm này dùng để đưa hết tất cả carts vào API của user
  // Nếu lúc chưa login mà user có thêm sản phẩm vào giỏ hàng thì khi login sẽ đưa tất cả sản phẩm đó vào cart trên database
  useEffect(() => {
    const fetchData = async () => {
      //Lần đầu sẽ không thực hiện insert được vì addCart = ''
      if (checkPush === true) {
        if (!listCart && listCart.length === 0) {
        } else {
          const addToCartAsync = async (value) => {
            const params = {
              idUser: localStorage.getItem("id_user"),
              idProduct: value.idProduct,
              quantity: value.quantity,
            };

            const query = "?" + queryString.stringify(params);

            await CartAPI.postAddToCart(query);
          };

          const addToCartBulkAsync = async () => {
            for (const value of listCart) {
              await addToCartAsync(value);
            }
          };
          const ActionDeleteAllCart = deleteAllCart([]);
          dispatch(ActionDeleteAllCart);
          setRedirect(true);
          addToCartBulkAsync();
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkPush]);

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
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign In</span>

          <div className="d-flex justify-content-center pb-5">
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password</span>
            )}
            {errorMessage && (
              <span className="text-danger">{errorMessage}</span>
            )}
          </div>

          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            {redirect && <Redirect to={`/`} />}
            <button className="login100-form-btn" onClick={onSubmit}>
              Sign in
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

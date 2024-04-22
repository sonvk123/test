import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSession } from "../Redux/Action/ActionSession";
import UserAPI from "../API/UserAPI";

function LoginLink(props) {
  const dispatch = useDispatch();

  const fetchData = async () => {
    await UserAPI.getLogout();
  };
  const onRedirect = () => {
    localStorage.clear();

    const action = deleteSession("");
    dispatch(action);
    fetchData();
    window.location.reload();
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

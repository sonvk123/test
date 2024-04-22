import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const { user } = useContext(AuthContext);

  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md">
        <div className="navbar-header" data-logobg="skin6">
          <button
            className="nav-toggler waves-effect waves-light d-block d-md-none"
          >
            <i className="ti-menu ti-close"></i>
          </button>
          <div className="navbar-brand">
            <Link to="/">
              <span className="logo-text">
                <span>Admin Page</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
            <li className="nav-item dropdown">
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <button className="dropdown-item" href="#">
                  Action
                </button>
                <button className="dropdown-item" href="#">
                  Another action
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" href="#">
                  Something else here
                </button>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav float-right">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="/"
              >
                <span className="ml-2 d-none d-lg-inline-block">
                  <span className="text-dark">
                    {user ? `Hello, ${user.name_user}` : ""}
                  </span>
                  <i data-feather="chevron-down" className="svg-icon"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

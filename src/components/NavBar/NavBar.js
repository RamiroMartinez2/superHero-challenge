import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./NavBar.scss";

const NavBar = () => {
  const history = useHistory();
  const isToken = localStorage.getItem("token");

  const [isLogin, setLogin] = useState(isToken);

  const logOut = () => {
    setLogin(localStorage.removeItem("token"));
  };
  const logIn = () => {
    if (isLogin) {
      history.push("/");
    }
  };

  return (
    <header>
      <nav className="nav-bar">
        <ul className="ulist">
          <Link className="list" to="/">
            <li>home</li>
          </Link>
          <Link className="list" to="/search">
            <li>search</li>
          </Link>
          <Link className="list" to="/login">
            {isLogin ? (
              <li onClick={() => logOut()}>log out</li>
            ) : (
              <li onClick={() => logIn()}>login</li>
            )}
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

import React, { useState } from "react";
import { generateToken } from "../../utils";
import { useHistory } from "react-router-dom";
import "./Login.scss";

export const Login = () => {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      window.alert("Inputs cannot be empty");
    } else if (email === "challenge@alkemy.org" && password === "react") {
      const token = generateToken();
      localStorage.setItem("token", token);
      history.push("/");
      window.location.reload();
    } else {
      window.alert("Invalid user or password");
    }
  };

  return (
    <>
      <div className="container">
        <img
          className="background-img"
          src={"https://fondosmil.com/fondo/14671.jpg"}
          alt="background"
        />
        <form className="form-login" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="login-title">login</h2>
          <label className="label" htmlFor="fname">
            email
          </label>
          <input
            placeholder="Type your email here"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label" htmlFor="lname">
            password
          </label>
          <input
            placeholder="Type your password here"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input-submit"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </>
  );
};

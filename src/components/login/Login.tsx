import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";
import Message from "../../utilities/Message";
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";
import { login } from "../../store/loginSlice";
import Loader from "../../utilities/Loader";

const Form: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //global state
  const { error, loading, userInfo } = useAppSelector((state) => state.login);

  //effect
  useEffect(() => {
    if (userInfo?.isAdmin) navigate("/admin/football/predict");
  }, [userInfo, navigate]);
  //submit handler
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setEmailCheck("Please enter your email and password.");
    } else if (!email.includes("@")) {
      setEmailCheck("Please enter a valid email address.");
    } else {
      // Do something with the email and password here, such as logging the user in.
      dispatch(login(email, password));
    }
  };
  //toggle password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.formHeading}>Login Page for admin</h1>
      {error && <Message variant="danger">{error}</Message>}
      <div className={styles.formDiv}>
        <div className={styles.controlGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            autoFocus
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailCheck && <Message variant="danger">{emailCheck}</Message>}
        </div>
        <div className={styles.controlGroup}>
          <label htmlFor="password">Password</label>
          <input
            required
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
            onClick={togglePassword}
          />
        </div>
        {loading ? (
          <Loader></Loader>
        ) : (
          <button className={styles.formButton}>Log In</button>
        )}
      </div>
    </form>
  );
};

export default Form;

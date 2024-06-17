import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.scss";
import style from "./SignUp.module.scss";
import Message from "../../utilities/Message";
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";

import Loader from "../../utilities/Loader";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, userInfo } = useAppSelector((state) => state.login);

  useEffect(() => {
    if (userInfo) navigate("/dashboard");
  }, [userInfo, navigate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      username === ""
    ) {
      setEmailCheck("Please fill in all the fields.");
    } else if (!email.includes("@")) {
      setEmailCheck("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setPasswordCheck("Passwords do not match.");
    } else {
      //   dispatch(login(username, email, password));
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={style.signForm} onSubmit={onSubmit}>
      <h1 className={styles.formHeading}>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      <div className={styles.formDiv}>
        <div className={styles.controlGroup}>
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            required
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.controlGroup}>
          <label htmlFor="email">Email Address</label>
          <input
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
        <div className={styles.controlGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            required
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordCheck && <Message variant="danger">{passwordCheck}</Message>}
        </div>
        {loading ? (
          <Loader></Loader>
        ) : (
          <button className={styles.formButton}>Sign Up</button>
        )}
        <p className={style.switchFormText}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </form>
  );
};

export default SignUp;

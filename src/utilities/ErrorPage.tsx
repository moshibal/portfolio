import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="main">
      <div className="mainNav ">
        <Link to="/">
          <img src="/image/logo.png" className="logo" alt="logo-img"></img>
        </Link>
      </div>
      <div className="middleDiv">
        <h2>Oops! Error Occured!. Looks like your url is incorrect.</h2>
        <h2>
          Go back to home by clicking{" "}
          <Link to="/">
            <span>here!</span>
          </Link>
        </h2>
      </div>

      <div className="copyright">
        <div className="displayBottom">
          <span>copyright </span>
          <span>{new Date().getFullYear()} </span>
          <span>Bishal Karki</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

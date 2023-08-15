import React from "react";
import styles from "./wrapper.module.scss";
import { Link, Outlet } from "react-router-dom";

const Wraper: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={`${styles.mainNav} ${styles.mainNavWithLogo}`}>
        <Link to="/">
          <img src="/image/logo.png" className={styles.logo} alt="logo-img" />
        </Link>
      </div>
      <div className={styles.middleDiv}>
        <Outlet />
      </div>
      <div className={styles.copyright}>
        <div className={styles.displayBotton}>
          <span>copyright</span>
          <span>{new Date().getFullYear()} </span>
          <span>Bishal Karki</span>
        </div>
      </div>
    </div>
  );
};

export default Wraper;

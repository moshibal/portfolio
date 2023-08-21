import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";

import Modal from "react-modal";
import CustomModal from "../modal/Modal";
import styles from "./Nav.module.scss";
import { logout } from "../../store/loginSlice";

const Nav = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModel] = useState(false);
  //authenticate
  const { userInfo } = useAppSelector((state) => state.login);

  //handlers
  const showModel = () => {
    setShowModel(true);
  };
  const closeModel = () => {
    setShowModel(false);
  };

  return (
    <div className={styles.mainNav}>
      <div>
        <img src="/image/logo.png" className={styles.logo} alt="logo-img" />
      </div>
      <ul className={styles.unorderedList}>
        <li>
          {userInfo?.isAdmin ? (
            <Link to="/admin/football/predict">Prediction</Link>
          ) : (
            <a href="#project" className={styles.navLink}>
              Projects
            </a>
          )}
        </li>
        <li>
          {userInfo?.isAdmin ? (
            <Link to="/admin/football">League</Link>
          ) : (
            <a href="#skill" className={styles.navLink}>
              Skills
            </a>
          )}
        </li>
        <li>
          <Link to="#aboutme" onClick={showModel} className={styles.navLink}>
            About Me
          </Link>
          <Modal
            isOpen={showModal}
            onRequestClose={closeModel}
            ariaHideApp={false}
          >
            <CustomModal onShowModal={closeModel} />
          </Modal>
        </li>
        <li>
          {userInfo?.isAdmin ? (
            <Link
              to="/"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Sign-out
            </Link>
          ) : (
            <Link to="/admin" className={styles.navLink}>
              LogIn
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};
export default Nav;

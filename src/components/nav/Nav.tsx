import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/storeHooks";

import Modal from "react-modal";
import CustomModal from "../modal/Modal";
import styles from "./Nav.module.scss";

const Nav = () => {
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
            <Link to="#project" className={styles.navLink}>
              Projects
            </Link>
          )}
        </li>
        <li>
          {userInfo?.isAdmin ? (
            <Link to="/admin/football">League</Link>
          ) : (
            <Link to="#skill" className={styles.navLink}>
              Skills
            </Link>
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
          <Link to="/admin" className={styles.navLink}>
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Nav;

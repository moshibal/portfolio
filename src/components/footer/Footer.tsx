import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Footer.module.scss";
import Modal from "react-modal";
import CustomModal from "../modal/Modal";

import style from "../nav/Nav.module.scss";
const Footer = () => {
  const [showModal, setShowModel] = useState(false);
  const date = new Date();
  const year = date.getFullYear();
  //handlers
  const showModel = () => {
    setShowModel(true);
  };
  const closeModel = () => {
    setShowModel(false);
  };

  return (
    <div className={styles.footerMain}>
      <div className={styles.secondFooter}>
        <div className={styles.logoDiv}>
          <img src="/image/logo.png" className={styles.footerLogo} alt="logo" />
        </div>
        <ul className={styles.ulFirst}>
          <li>
            <a href="https://github.com/moshibal?tab=repositories">GitHub</a>
          </li>
          <li>
            <Link to="#aboutme" onClick={showModel} className={style.navLink}>
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
            <a
              className={styles.detailsButton}
              href="https://www.linkedin.com/in/bishal-karki-60a16630a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Me
            </a>
          </li>
          <li>
            <a
              className={styles.detailsButton}
              href="https://www.linkedin.com/in/bishal-karki-60a16630a"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <hr className={styles.hr} />
      <p className={styles.p}>© {year} Bishal Karki</p>
    </div>
  );
};
export default Footer;

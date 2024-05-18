import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
const Header = () => {
  return (
    <div className={styles.mainHeader} id="main">
      <div className={`${styles.aboutMe} ${styles.equal}`}>
        <div className={styles.details}>
          <h1 className={styles.headingLine}>Hi, I'm Bishal Karki,</h1>
          <p className={styles.paragraphLine}>
            {" "}
            a passionate full-stack developer.
          </p>
          <p className={styles.paraButton}>
            isJobAvailable &&{" "}
            <span>
              <Link
                className={styles.detailsButton}
                to="www.linkedin.com/in/bishal-karki-60a16630a"
              >
                Contact Me
              </Link>
            </span>
          </p>
        </div>
      </div>
      <div className={`${styles.imageDiv} ${styles.equal}`}>
        <img
          src="/image/myphoto.png"
          className={styles.myImage}
          alt="headerImage"
        />
      </div>
    </div>
  );
};
export default Header;

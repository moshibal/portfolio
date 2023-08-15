import styles from "./Footer.module.scss";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
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
            <a href="https://www.linkedin.com/in/bishal-karki-240810142/">
              Contact Me
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/bishal-karki-240810142/">
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

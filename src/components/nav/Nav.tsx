import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";

import styles from "./Nav.module.scss";
import { logout } from "../../store/loginSlice";

const Nav = () => {
  const dispatch = useAppDispatch();

  //authenticate
  const { userInfo } = useAppSelector((state) => state.login);

  const signout = () => {
    dispatch(logout());
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
          {userInfo?.isAdmin ? (
            <Link to="/" onClick={signout}>
              Sign-out
            </Link>
          ) : (
            <Link to="/login" className={styles.navLink}>
              LogIn
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};
export default Nav;

import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
const Navbar = () => {
  const auth = useAuth();
  
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
          <Link href="/Logout">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span>{auth.user.name}</span>
        </div>
        )}
        

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ):(
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <a href="/">Register</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { MENU } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import styles from './navigation.module.css';

function Navigation(props) {
  const router = useLocation();

  const handleLogout = () => {
    props.logoutUser();
    window.location.href = '/login';
  };

  return (
    <div className={styles.navBtns}>
      {MENU.map((menu) => {
        const selected = router.pathname === menu.path

        return (
            <NavLink to={menu.path} exact activeClassName="activeLink" key={menu.title}>
                <button className={styles.button}>
                    {selected ? menu.iconSelected : menu.icon}
                    <TextBoldM>{menu.title}</TextBoldM>
                </button>
            </NavLink>
            );
      })}
      
      {/* User Info & Logout Section */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <TextBoldM>{props.auth.user?.email}</TextBoldM>
          <p style={{fontSize: '12px', color: '#b3b3b3'}}>
            ({props.auth.userType})
          </p>
        </div>
        
        {/* Profile Link */}
        <NavLink to="/profile" className={styles.profileLink}>
          <button className={styles.profileBtn}>
            👤 View Profile
          </button>
        </NavLink>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navigation);
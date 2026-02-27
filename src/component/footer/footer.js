import React from 'react';
import { connect } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';

import CONST from '../../constants/index';
import styles from "./footer.module.css";

function Footer(props){
    const size = useWindowSize();

    return (
        <footer className={styles.footer}>
            <div className={styles.nowplayingbar}>
                <div className={styles.footerContent}>
                    <p>&copy; 2026 Music Streaming App. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

const mapStateToProps = (state) => {
    return {
      // Keep the Redux connection for future use
    };
};
  
export default connect(mapStateToProps)(Footer);
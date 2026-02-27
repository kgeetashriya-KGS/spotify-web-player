import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import useWindowSize from './hooks/useWindowSize';
import Sidebar from './component/sidebar/sidebar';
import MobileNavigation from './component/sidebar/mobile-navigation';
import Footer from './component/footer/footer';
import Home from './pages/home';
import Search from './pages/search';
import Library from './pages/library';
import PlaylistPage from './pages/playlist';
import Profile from './pages/profile';
import Login from './pages/login';
import Signup from './pages/signup';
import LikedSongs from './pages/liked-songs';
import CONST from './constants/index';
import styles from './style/App.module.css';

// Protected Route Component
function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function App(props) {
  const size = useWindowSize();
  const { isAuthenticated } = props.auth;

  // If not logged in, show only login/signup pages
  if (!isAuthenticated) {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    );
  }

  // If logged in, show main app with protected routes
  return (
    <Router>
      <div className={styles.layout}>
        {size.width > CONST.MOBILE_SIZE 
          ? <Sidebar /> 
          : <MobileNavigation />
        }
        <Switch>
          <ProtectedRoute 
            exact 
            path="/" 
            component={Home} 
            isAuthenticated={isAuthenticated}
          />
          <ProtectedRoute 
            path="/search" 
            component={Search} 
            isAuthenticated={isAuthenticated}
          />
          <ProtectedRoute 
            path="/library" 
            component={Library} 
            isAuthenticated={isAuthenticated}
          />
          <ProtectedRoute 
            exact 
            path="/playlist/:path" 
            component={PlaylistPage} 
            isAuthenticated={isAuthenticated}
          />
          <ProtectedRoute 
            path="/profile" 
            component={Profile} 
            isAuthenticated={isAuthenticated}
          />
          <ProtectedRoute 
  path="/liked-songs" 
  component={LikedSongs} 
  isAuthenticated={isAuthenticated}
/>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
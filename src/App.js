import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setArtistDashboard } from './actions/artistDashboardActions';

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
import SongDetailsModal from './component/modals/song-details-modal';
import ArtistProfile from './pages/artist-profile';
import CONST from './constants/index';
import styles from './style/App.module.css';
import ArtistSongs from "./pages/artist-songs";
import ArtistAlbums from "./pages/artist-albums";
import FollowedArtists from "./pages/followed-artists";
import Artists from "./pages/artists";
import MyPlaylistsPage from './pages/my-playlists';
import PublicPlaylistsPage from './pages/public-playlists';
import ArtistProfileEditor from './pages/artist-profile-editor';
import ArtistDashboard from './component/modals/artist-dashboard';

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

function ArtistRoute({ component: Component, isAuthenticated, userType, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && userType === 'artist'
          ? <Component {...props} />
          : <Redirect to="/" />
      }
    />
  );
}

function App(props) {
  const size = useWindowSize();
  const { auth, artistDashboard, setArtistDashboard } = props;

  const isAuthenticated = auth?.isAuthenticated || false;
  const userType = auth?.userType;

  // ✅ FIXED: runs only once when artist logs in
  useEffect(() => {
    if (
      isAuthenticated &&
      userType === 'artist' &&
      auth.user &&
      !artistDashboard.profile.id   // prevents loop
    ) {
      setArtistDashboard({
        id: auth.user.id,
        email: auth.user.email,
        artistName: auth.user.username,
        createdAt: new Date().toISOString(),
        followerCount: 0,
        isActive: true,
      });
    }
  }, [
    isAuthenticated,
    userType,
    auth.user,
    artistDashboard.profile.id,
    setArtistDashboard
  ]);

  return (
    <Router>
      <div className={isAuthenticated ? styles.layout : ''}>

        {isAuthenticated && (
          size.width > CONST.MOBILE_SIZE
            ? <Sidebar />
            : <MobileNavigation />
        )}

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <ProtectedRoute exact path="/" component={Home} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/search" component={Search} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/library" component={Library} isAuthenticated={isAuthenticated} />
          <ProtectedRoute exact path="/playlist/:id" component={PlaylistPage} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/profile" component={Profile} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/liked-songs" component={LikedSongs} isAuthenticated={isAuthenticated} />

          <ArtistRoute path="/artist/profile" component={ArtistProfileEditor} isAuthenticated={isAuthenticated} userType={userType} />
          <ArtistRoute path="/artist/dashboard" component={ArtistDashboard} isAuthenticated={isAuthenticated} userType={userType} />

          <ProtectedRoute path="/artist/:id/songs" component={ArtistSongs} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/artist/:id/albums" component={ArtistAlbums} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/followed-artists" component={FollowedArtists} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/artists" component={Artists} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/artist/:id" component={ArtistProfile} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/my-playlists" component={MyPlaylistsPage} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path="/discover-playlists" component={PublicPlaylistsPage} isAuthenticated={isAuthenticated} />

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>

        {isAuthenticated && <Footer />}
        {isAuthenticated && <SongDetailsModal />}
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  artistDashboard: state.artistDashboard   // 🔥 important
});

export default connect(mapStateToProps, { setArtistDashboard })(App);
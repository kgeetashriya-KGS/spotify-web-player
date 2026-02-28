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
import ArtistDashboard from './pages/artist-dashboard';


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

  // EMERGENCY BYPASS (still enabled)
  const isAuthenticated = props.auth?.isAuthenticated || false;

  return (
    <Router>
      <div className={isAuthenticated ? styles.layout : ''}>

  {/* Hide sidebar on login & signup */}
  {isAuthenticated && (
    size.width > CONST.MOBILE_SIZE
      ? <Sidebar />
      : <MobileNavigation />
  )}

  <Switch>
          <Route path="/login" component={Login} />
  <Route path="/signup" component={Signup} />
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
              <ProtectedRoute
             path="/artist/:id/songs"
            component={ArtistSongs}
            isAuthenticated={isAuthenticated}
            />

            <ProtectedRoute
             path="/artist/:id/albums"
            component={ArtistAlbums}
             isAuthenticated={isAuthenticated}
            />

            <ProtectedRoute
            path="/followed-artists"
            component={FollowedArtists}
            isAuthenticated={isAuthenticated}
            />

            <ProtectedRoute
  path="/artists"
  component={Artists}
  isAuthenticated={isAuthenticated}
/>
          {/* ✅ NEW ARTIST ROUTE */}
          <ProtectedRoute
            path="/artist/:id"
            component={ArtistProfile}
            isAuthenticated={isAuthenticated}
          />
          <Route 
  path="/my-playlists" 
  element={<ProtectedRoute><MyPlaylistsPage /></ProtectedRoute>} 
/>
<Route 
  path="/discover-playlists" 
  element={<PublicPlaylistsPage />} 
/>
<Route 
  path="/artist/profile" 
  element={<ProtectedRoute><ArtistProfileEditor /></ProtectedRoute>} 
/>
<Route 
  path="/artist/dashboard" 
  element={<ProtectedRoute><ArtistDashboard /></ProtectedRoute>} 
/>
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
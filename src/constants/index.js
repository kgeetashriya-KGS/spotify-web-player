import * as Icon from '../component/icons'
import React from 'react'

export default {
  MOBILE_SIZE: 640,
}

export const MENU = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon.Home />,
    iconSelected: <Icon.HomeActive />
  },
  {
    title: 'Search',
    path: '/search',
    icon: <Icon.Search />,
    iconSelected: <Icon.SearchActive />
  },
  {
    title: 'Library',
    path: '/library',
    icon: <Icon.Library />,
    iconSelected: <Icon.LibraryActive />
  },
  {
    title: 'Liked Songs',
    path: '/liked-songs',
    icon: <Icon.Like />,
    iconSelected: <Icon.LikeActive />
  },
  {
    title: 'Artists',
    path: '/artists',
    icon: <Icon.Profile />,
    iconSelected: <Icon.Profile />
  },
  {
    title: 'Followed Artists',
    path: '/followed-artists',
    icon: <Icon.Like />,
    iconSelected: <Icon.LikeActive />
  }
]

export const PLAYLISTBTN = [
  {
    title: 'Create Playlist',
    path: '/',
    ImgName: 'createPlaylist',
  },
  {
    title: 'Liked Songs',
    path: '/liked-songs',
    ImgName: 'popularSong',
  }
]

export const LIBRARYTABS = [
  {
    title: 'Playlists',
    path: '/library'
  },
  {
    title: 'Podcasts',
    path: '/library/podcasts'
  },
  {
    title: 'Artists',
    path: '/library/artists'
  },
  {
    title: 'Albums',
    path: '/library/albums'
  }
]
/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Movies from './modules/movies/Movies';
import MoviesList from './modules/movies/MoviesList';
import Movie from './modules/movies/Movie';
import Search from './modules/movies/Search';
import Login from './modules/movies/Login';
import Signup from './modules/movies/Signup';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('movieapp.Movie', () => Movie, store, Provider);
	Navigation.registerComponent('movieapp.Movies', () => Movies, store, Provider);
	Navigation.registerComponent('movieapp.MoviesList', () => MoviesList, store, Provider);
	Navigation.registerComponent('movieapp.Search', () => Search, store, Provider);
	Navigation.registerComponent('movieapp.Login', () => Login, store, Provider);
	Navigation.registerComponent('movieapp.Signup', () => Signup, store, Provider);
	Navigation.registerComponent('movieapp.Drawer', () => Drawer,store, Provider);
}

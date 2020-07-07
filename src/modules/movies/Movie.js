import React, { Component, PropTypes } from 'react';
import {
	Image,
	Linking,
	RefreshControl,
	ScrollView,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Swiper from 'react-native-swiper';
import Send from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {GetCurrentUser} from '../../action/GetUser';
import {AddComent} from '../../action/AddComent';
import {GetRating} from '../../action/GetRating';
import * as moviesActions from './movies.actions';
import Casts from './tabs/Casts';
import CardTwo from './components/CardTwo'
import DefaultTabBar from '../_global/scrollableTabView/DefaultTabBar';
import Info from './tabs/Info';
import ProgressBar from '../_global/ProgressBar';
import Trailers from './tabs/Trailers';
import rcmdemo from './rcmdemo';
import Comments from './tabs/Comments';
import styles from './styles/Movie';
import firebase from 'firebase';
import { Rating, AirbnbRating } from 'react-native-ratings';
import firebaseConfig from '../_global/firebase/firebaseApp';
import _ from 'lodash';
import { TMDB_IMG_URL, YOUTUBE_API_KEY, YOUTUBE_URL } from '../../constants/api';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }
class Movie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			castsTabHeight: null,
			commentsTabHeight: null,
			heightAnim: null,
			infoTabHeight: null,
			isLoading: true,
			isRefreshing: false,
			showSimilarMovies: true,
			trailersTabHeight: null,
			tab: 0,
			youtubeVideos: [],
			comment: '',
			rating: 0,
		};

		this._getTabHeight = this._getTabHeight.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this._onContentSizeChange = this._onContentSizeChange.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this._onScroll = this._onScroll.bind(this);
		this._viewMovie = this._viewMovie.bind(this);
		this._openYoutube = this._openYoutube.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveDetails();
		this.props.GetCurrentUser();
	}
	componentDidMount = () => {
		this.props.GetRating(this.props.movieId);
		this.props.actions.getRecommendMovie(this.props.details.genres);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.details) this.setState({ isLoading: false });
	}

	async _retrieveDetails(isRefreshed) {
		await this.props.actions.retrieveMovieDetails(this.props.movieId)
			.then(() => {
				this._retrieveYoutubeDetails();
			})
			.catch((err) => {console.log(err,'err retrieveMovieDetails')})
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_retrieveSimilarMovies() {
		this.props.actions.retrieveSimilarMovies(this.props.movieId, 1);
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveDetails('isRefreshed');
	}

	_onScroll(event) {
		const contentOffsetY = event.nativeEvent.contentOffset.y.toFixed();
		if (contentOffsetY > 150) {
			this._toggleNavbar('hidden');
		} else {
			this._toggleNavbar('shown');
		}
	}

	_toggleNavbar(status) {
		this.props.navigator.toggleNavBar({
			to: status,
			animated: true
		});
	}

	_onChangeTab({ i, ref }) {
		this.setState({ tab: i });
	}

	// ScrollView onContentSizeChange prop
	_onContentSizeChange(width, height) {
		if (this.state.tab === 0 && this.state.infoTabHeight === this.state.castsTabHeight) {
			this.setState({ infoTabHeight: height });
		}
	}

	_getTabHeight(tabName, height) {
		if (tabName === 'casts') this.setState({ castsTabHeight: height });
		if (tabName === 'trailers') this.setState({ trailersTabHeight: height });
		if (tabName === 'comments') this.setState({ commentsTabHeight: height });
	}

	_retrieveYoutubeDetails() {
		this.props.details.videos.results.map(item => {
			const request = axios.get(`${YOUTUBE_URL}/?id=${item.key}&key=${YOUTUBE_API_KEY}&part=snippet`)
								.then(res => {
									const data = this.state.youtubeVideos;
									data.push(res.data.items[0]);
								})
								.catch(error => {
									console.log(error); //eslint-disable-line
								});
			return request;
		});
	}

	_viewMovie(movieId) {
		this.props.navigator.push({
			screen: 'movieapp.Movie',
			passProps: {
				movieId
			}
		});
	}

	_openYoutube(youtubeUrl) {
		Linking.canOpenURL(youtubeUrl).then(supported => {
			if (supported) {
				Linking.openURL(youtubeUrl);
			} else {
				ToastAndroid.show(`RN Don't know how to handle this url ${youtubeUrl}`, ToastAndroid.SHORT);
			}
		}).catch(err => {
			console.log(err, 'error canOpenURL')
		})
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	_AddComment = () => {
		this.props.AddComent(this.props.CurrentUser.userID,this.state.comment,this.props.details.id)
	}

	showRating = () => {
			return (
				<View>
				<Rating
				  type="custom"
				  showRating={false}
				  tintColor='#120101'
				  imageSize={20}
				  startingValue={this.props.Rating}
				  size={7}
				  fractions={1}
				/>
				</View>
			)

	}
	render() {
		const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;
		const iconStarOutline = <Icon name="md-star-outline" size={16} color="#F5B642" />;
		const { details } = this.props;
		const info = _.isEmpty(details) ? {
			adult: false,
			backdrop_path: "/dW6yBuKwiMeronJZw8kozYLMorB.jpg",
			belongs_to_collection: null,
			budget: 200000000,
			casts: {cast: [{cast_id: 2, character: "Ian Lightfoot (voice)", credit_id: "5c1201f4925141352eb965f8", gender: 2, id: 1136406}], crew: [{credit_id: "5e925556ca4f6700147f4d42", department: "Directing", gender: 2, id: 20561, job: "Director", name: "James Gray", profile_path: "/6oRlizIlhI2exF3OEGvtB6M7KmZ.jpg"}]},
			genres: [{id: 16, name: "Animation"}],
			id: 508439,
			images: {backdrops: [{aspect_ratio: 1.777777777777778,
				file_path: "/dW6yBuKwiMeronJZw8kozYLMorB.jpg",
				height: 2160,
				iso_639_1: null,
				vote_average: 5.456,
				vote_count: 5,
				width: 3840}], posters: [{
					aspect_ratio: 0.6666666666666666,
					file_path: "/3VqDLgKLfNYSQYEGC5sjGhcPhn7.jpg",
					height: 3000,
					iso_639_1: "en",
					vote_average: 5.738,
					vote_count: 18,
					width: 2000,
				}]
			},
			imdb_id: "tt7146812",
			original_language: "en",
			original_title: "Onward",
			overview: "In a suburban fantasy world, two teenage elf brothers embark on an extraordinary quest to discover if there is still a little magic left out there.",
			popularity: 51.179,
			poster_path: "/f4aul3FyD3jv3v4bul1IrkWZvzq.jpg",
			production_companies: [{id: 11391, logo_path: null, name: "Tribeca Productions", origin_country: "US"},{id: 2, logo_path: "/wdrCwmRnLFJhEoH8GSfymY85KHT.png", name: "Walt Disney Pictures", origin_country: "US"},{id: 38227, logo_path: null, name: "TKBC", origin_country: "GB"}],
			production_countries: [{iso_3166_1: "US", name: "United States of America"}],
			release_date: "2020-02-29",
			revenue: 103181419,
			runtime: 102,
			vote_average: 3,
			vote_count: 2439
		}: details;
		const iconSend = <Send name="send" size={26} color="#9F9F9F" />;
		let height;
		if (this.state.tab === 0) height = this.state.infoTabHeight;
		if (this.state.tab === 1) height = this.state.castsTabHeight;
		if (this.state.tab === 2) height = this.state.trailersTabHeight;
		if (this.state.tab === 3) height = this.state.commentsTabHeight;
		const rcm = _.isEmpty(this.props.recomment) ? rcmdemo : this.props.recomment.slice(0,4);
		const genres2 = _.isEmpty(details) ? ['thief']: details.genres.slice(0,3)
		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView
					style={styles.container}
					onScroll={this._onScroll.bind(this)}
					scrollEventThrottle={100}
					onContentSizeChange={this._onContentSizeChange}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={this._onRefresh}
							colors={['#EA0000']}
							tintColor="white"
							title="loading..."
							titleColor="white"
							progressBackgroundColor="white"
						/>
					}>
				<View style={{ height }}>
					<Swiper
						style={styles.swiper}
						autoplay
						autoplayTimeout={4}
						showsPagination={false}
						height={248}
						loop
						index={5}>
						{
							info.images ? info.images.backdrops.map((item, index) => (
								<View key={index}>
									<Image source={{ uri: `${TMDB_IMG_URL}/w780/${(item.file_path)}` }} style={styles.imageBackdrop} />
									<LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0,0,0, 0.2)', 'rgba(0,0,0, 0.7)']} style={styles.linearGradient} />
								</View>
							)) : null
						}
					</Swiper>
					<View style={styles.cardContainer}>
						<Image source={{ uri: `${TMDB_IMG_URL}/w185/${info.poster_path}` }} style={styles.cardImage} />
						<View style={styles.cardDetails}>
							<Text style={styles.cardTitle}>{info ? info.original_title : null}</Text>
							<Text style={styles.cardTagline}>{info? info.tagline: null}</Text>
							<View style={styles.cardGenre}>
								{
									info && info.genres ? info.genres.map(item => {
										// console.log(item,'item x123');
										<Text key={item.id} style={styles.cardGenreItem}>{item.name}</Text>
									}):null
								}
							</View>
							<View style={styles.cardNumbers}>
								<View style={styles.cardStar}>
										{this.showRating()}
									<Text style={styles.cardStarRatings}>{this.props.Rating}</Text>
								</View>
								<Text style={styles.cardRunningHours} />
							</View>
						</View>
					</View>
					<View style={styles.contentContainer}>
						<ScrollableTabView
							onChangeTab={this._onChangeTab}
							renderTabBar={() => (
								<DefaultTabBar
									textStyle={styles.textStyle}
									underlineStyle={styles.underlineStyle}
									style={styles.tabBar}
								/>
							)}>
							<Info tabLabel="INFO" info={info} />
							<Casts tabLabel="CASTS" info={info} getTabHeight={this._getTabHeight} />
							<Trailers tabLabel="TRAILERS" youtubeVideos={this.state.youtubeVideos} openYoutube={this._openYoutube} getTabHeight={this._getTabHeight} />
							<Comments tabLabel="COMMENTS" rating={this.props.Rating} info={info}/>
						</ScrollableTabView>
					</View>
					{/* begin recomend */}
					<View>
						<View style={styles.listHeading}>
							<Text style={styles.listHeadingLeft}>Recomend for you</Text>
							<TouchableOpacity>
								<Text
									style={styles.listHeadingRight}
									// onPress={this._viewMoviesList.bind(this, 'popular', 'Popular')}
								>
									{genres2.map(item => (
										<Text>{item.name}.</Text>
									))}
								</Text>
							</TouchableOpacity>
						</View>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{ !_.isEmpty(rcm) && rcm.map((info,index) => (
								<CardTwo key={info.id} info={info} viewMovie={this._viewMovie} />
							))}
						</ScrollView>
					</View>
					{/* end recommend */}
				</View>
			</ScrollView>
		);
	}
}

Movie.navigatorStyle = {
	navBarTransparent: true,
	drawUnderNavBar: true,
	navBarTranslucent: true,
	statusBarHidden: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

Movie.propTypes = {
	actions: PropTypes.object.isRequired,
	details: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	movieId: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
	console.log(state.movies.recomment,'?????')
	return {
		details: state.movies.details,
		similarMovies: state.movies.similarMovies,
		CurrentUser: state.LoadUser,
		Rating: state.GetRating,
		recomment: state.movies.recomment
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch),
		GetCurrentUser: bindActionCreators(GetCurrentUser,dispatch),
		AddComent: bindActionCreators(AddComent,dispatch),
		GetRating: bindActionCreators(GetRating,dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);

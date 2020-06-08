import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	ImageBackground,
	Image
} from 'react-native';
// import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import firebaseConfig from '../_global/firebase/firebaseApp';
import styles from './styles/Drawer';
import 'firebase/firestore';
import firebase from 'firebase';


if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }
class Drawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			avatarUser: ""
		}
		this._goToMovies = this._goToMovies.bind(this);
		this._openSearch = this._openSearch.bind(this);
		this._goToLogin = this._goToLogin.bind(this);
		// this._renderLogin = this._renderLogin.bind(this);
		this._goToLogout = this._goToLogout.bind(this);
	}
	_openSearch() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Search',
			title: 'Search'
		});
	}
	componentDidMount = () => {
		firebase.auth().onAuthStateChanged( (user) => {
			if (user) {
			firebase.database().ref('users/' + user.uid).once('value').then( (snapshot) => {
				this.setState({ isLogin: true})
				this.setState({ avatarUser: snapshot.val().avatar})
			  })
			} else {
			}
		  });
	}

	_goToMovies() {
		this._toggleDrawer();
		this.props.navigator.popToRoot({
			screen: 'movieapp.Movies'
		});
	}

	_goToLogin() {
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'movieapp.Login'
		});
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}

	_renderLogin = (iconLogin) => {
		return (
		this.state.isLogin ? 
		<TouchableOpacity onPress={this._goToLogout}>
			<View style={styles.drawerListItem}>
				{iconLogin}
				<Text style={styles.drawerListItemText}>
					Logout
				</Text>
			</View>
		</TouchableOpacity> : 
		<TouchableOpacity onPress={this._goToLogin}>
			<View style={styles.drawerListItem}>
				{iconLogin}
				<Text style={styles.drawerListItemText}>
					Login
				</Text>
			</View>
		</TouchableOpacity>
		)
		
	}
	_renderAvatar = () => {
		if(this.state.isLogin){
			var user = firebase.auth().currentUser;
			//  firebase.database().ref('users/' + user.uid).once('value').then( (snapshot) => {
			// 		  console.log(snapshot.val().avatar,'111111111111')
			// 		this.setState({ avatarUser: snapshot.val().avatar})
			// 	  })
			console.log(user,'usersss')
		}
		return this.state.isLogin ? 
			<View style={styles.avatarUser}>
				<Image source={{uri : this.state.avatarUser}} style={{height: 100, width:100, borderRadius:50, backgroundColor: 'black'}} />
			</View> : null
	}
	_goToLogout = async () => {
		this.setState({ isLogin: false})
		await firebase.auth().signOut();
	}
	render() {
		const iconSearch = (<Icon name="md-search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconMovies = (<Icon name="md-film" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconTV = (<Icon name="ios-desktop" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		const iconLogin = (<Icon name="ios-desktop" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);

		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
				{this._renderAvatar()}
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._openSearch}>
							<View style={styles.drawerListItem}>
								{iconSearch}
								<Text style={styles.drawerListItemText}>
									Search
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToMovies}>
							<View style={styles.drawerListItem}>
								{iconMovies}
								<Text style={styles.drawerListItemText}>
									Movies
								</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.drawerListItem}>
							{iconTV}
							<Text style={styles.drawerListItemText} onPress={() => ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)}>
								TV Shows
							</Text>
						</View>
						<View>
							{this._renderLogin(iconLogin)}
						</View>
					</View>
					<Text style={styles._version}>
						'v1.0.0'
					</Text>
				</View>
			</LinearGradient>
		);
	}
}
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingLeft: 25,
// 		justifyContent: 'center'
// 	},
// 	drawerList: {

// 	},
// 	drawerListIcon: {
// 		width: 27
// 	},
// 	drawerListItem: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginBottom: 23
// 	},
// 	drawerListItemText: {
// 		color: 'white',
// 		fontWeight: 'bold',
// 		fontSize: 23,
// 		paddingLeft: 15,
// 		flex: 1
// 	},
// 	linearGradient: {
// 		// top: 0,
// 		// left: 0,
// 		// right: 0,
// 		// height: 248,
// 		// position: 'absolute'
// 		flex: 1
// 	},
// 	_version: {
// 		color: '#3c3c3c',
// 		position: 'absolute',
// 		bottom: 25,
// 		marginLeft: 53
// 	}
// })
Drawer.propTypes = {
	navigator: PropTypes.object
};

export default Drawer;

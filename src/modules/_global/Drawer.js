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
import IconLogin from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import firebaseConfig from '../_global/firebase/firebaseApp';
import ImagePicker from 'react-native-image-picker';
import styles from './styles/Drawer';
import 'firebase/firestore';
import firebase from 'firebase';


if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }
const options = {
	title: 'Select Avatar',
	customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
	storageOptions: {
	  skipBackup: true,
	  path: 'images',
	},
  };
  
var defaultAvatar = 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
class Drawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			userID: '',
			currentUser: [],
			avatarSource: ''
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
			title: 'Search Movie'
		});
	}
	componentDidMount = async () => {
		await firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					this.setState({userID: user.uid})
				  // User is signed in.
					await firebase.database().ref('users/' + user.uid).once('value').then( (snapshot) => {
					this.setState({ 
						currentUser: snapshot.val(),
						avatarSource: {uri : snapshot.val().avatar},
						fullname: snapshot.val().fullname,
					})
					console.log(2222222222222222222222222222,' avatar user')
				  })
				  this.setState({isLogin:true})
				} else {
				  // No user is signed in.
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

	_changeAvatar = (userID) => {
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);
		  
			if (response.didCancel) {
			  console.log('User cancelled image picker');
			} else if (response.error) {
			  console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
			  console.log('User tapped custom button: ', response.customButton);
			} else {
			  const source = { uri: response.uri };
			firebase.database().ref('users/'+ userID).update({avatar: response.uri})
			  // You can also display the image using data:
			  // const source = { uri: 'data:image/jpeg;base64,' + response.data };
		  
			  this.setState({
				avatarSource: source,
			  });
			}
		  });
	}

	_renderLogin = (iconLogin,iconLogout) => {
		return (
		this.state.isLogin ? 
		<TouchableOpacity onPress={this._goToLogout}>
			<View style={styles.drawerListItem}>
				{iconLogout}
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
	_renderAvatar = (iconUser) => {
		if(this.state.avatarSource != '' && this.state.isLogin){
			return this.state.isLogin ? 
			<View>
				<View style={styles.avatarUser}>
				<Image source={this.state.avatarSource} style={{height: 100, width:100, borderRadius:50, backgroundColor: 'black'}} />
				<TouchableOpacity onPress={()=>this._changeAvatar(this.state.userID)}>
					<View style={styles.drawerListItem}>
						<Text style={styles.changeAvatar}>
							change avatar
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<TouchableOpacity>
				<View style={styles.drawerListItem}>
					{iconUser}
					<Text style={styles.fullname}>
						{this.state.currentUser.fullname}
					</Text>
				</View>
			</TouchableOpacity>
			</View>
			: null
		}
		return this.state.isLogin ? 
			<View style={styles.avatarUser}>
				<Image source={{uri : defaultAvatar}} style={{height: 100, width:100, borderRadius:50, backgroundColor: 'black'}} />
				<TouchableOpacity>
					<View style={styles.drawerListItem}>
						<Text style={styles.fullname}>
							change avatar
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={styles.drawerListItem}>
						{iconUser}
						<Text style={styles.fullname}>
							{this.state.currentUser.fullname}
						</Text>
					</View>
				</TouchableOpacity>
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
		const iconLogin = (<IconLogin name="login" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		const iconLogout = (<IconLogin name="logout" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		const iconUser = (<IconLogin name="user" size={25} color="#9F9F9F" style={styles.drawerListIcon} />);

		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
				{this._renderAvatar(iconUser)}
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
							{this._renderLogin(iconLogin,iconLogout)}
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

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 25,
		justifyContent: 'center'
	},
	drawerList: {

	},
	avatarUser:{
		marginBottom: 10,
		marginLeft: 30
	},
	drawerListIcon: {
		width: 27
	},
	tinyLogo: {
		width: 70,
		height: 70,
		borderWidth: 3,
		borderColor: 'red'
	},
	logo: {
		width: 66,
		height: 58,
	},
	fullname: {
		color: 'white',
		// fontWeight: 'bold',
		fontSize: 18,
		flex: 1,
	},
	drawerListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 23
	},
	drawerListItemText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 23,
		paddingLeft: 15,
		flex: 1
	},
	linearGradient: {
		// top: 0,
		// left: 0,
		// right: 0,
		// height: 248,
		// position: 'absolute'
		flex: 1
	},
	_version: {
		color: 'white',
		position: 'absolute',
		bottom: 25,
		marginLeft: 53
	}
});

export default styles;
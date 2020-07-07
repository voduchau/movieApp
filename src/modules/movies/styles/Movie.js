import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	textStyle: {
		color: 'white',
		paddingTop: 10,
		fontSize: 12,
		fontWeight: 'bold'
	},
	underlineStyle: {
		backgroundColor: '#EA0000'
	},
	tabBar: {
		backgroundColor: '#131313'
	},
	contentContainer: {
		flex: 1,
		marginTop: 157
	},
	input: {
		flex: 1,
		marginLeft: 10,
		backgroundColor: '#fff',
		color: '#424242',
	},
	CommentSection: {
		flex: 1,
		flexDirection: 'row',
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#fff',
	},
	commentText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		paddingTop: 10
	},
	progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		backgroundColor: '#0a0a0a'
	},
	swiper: {
		// position: 'absolute',
		// flex: 1
	},
	linearGradient: {
		top: 0,
		left: 0,
		right: 0,
		height: 248,
		position: 'absolute'
	},
	imageBackdrop: {
		// flex: 1,
		height: 248,
		backgroundColor: 'black'
	},
	cardContainer: {
		flex: 1,
		position: 'absolute',
		top: 200,
		right: 16,
		left: 16,
		flexDirection: 'row'
	},
	cardImage: {
		height: 184,
		width: 135,
		borderRadius: 3
	},
	cardDetails: {
		paddingLeft: 10,
		flex: 1,
		paddingTop: 50
	},
	cardTitle: {
		color: 'white',
		fontSize: 19,
		fontWeight: '500',
		paddingTop: 10
	},
	cardTagline: {
		color: 'white',
		fontSize: 15
	},
	cardGenre: {
		flexDirection: 'row'
	},
	cardGenreItem: {
		textAlign: 'left',
		fontSize: 11,
		marginRight: 3,
		color: 'white'
	},
	InputContainer: {
		width: "80%",
		// marginTop: 30,
		flexDirection: 'row',
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "grey",
		borderRadius: 25,
	},
	iconsend: {
		// marginLeft:5,
		marginTop: 7,
	},
	comment1: {
		color: 'white',
		marginTop: 8,
		marginBottom: 15,
		fontSize: 18
	},
	containerComment: {
		alignItems: "center"
	},
	body: {
		height: 42,
		width: '90%',
		paddingLeft: 20,
		paddingRight: 20,
		color: "#696969"
	},
	cardNumbers: {
		flexDirection: 'row',
		marginTop: 5
	},
	cardStar: {
		flexDirection: 'row'
	},
	cardStarRatings: {
		marginLeft: 5,
		fontSize: 15,
		color: 'white',
		paddingBottom: 7,
		marginBottom: 5
	},
	cardRunningHours: {
		marginLeft: 5,
		fontSize: 12
	},
	listHeading: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
		marginTop: 30
	},
	listHeadingLeft: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18
	},
	listHeadingRight: {
		color: 'white',
		...Platform.select({
			ios: {
				fontSize: 15
			},
			android: {
				fontSize: 13,
				marginLeft: 5,
				paddingLeft: 5
			}
		}),
		marginLeft: 3
	},
});

export default styles;

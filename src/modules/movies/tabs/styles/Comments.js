import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingHorizontal: 16,
		paddingBottom: 25
	},
	overview: {
		marginBottom: 15
	},
	overviewText: {
		color: '#d2d2d2',
		fontSize: 14,
		paddingTop: 10,
		lineHeight: 22
	},
	label: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500'
	},
	value: {
		color: '#d2d2d2',
		fontSize: 14
	},
	labelRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10
	},
	InputContainer: {
		// width: "10%",
		// marginTop: 30,
		flex: 1,
		flexDirection: 'row',
		// justifyContent: 'center',
		// borderWidth: 1,
		// borderColor: 'white',
		// borderStyle: "solid",
		// borderColor: "grey",
		// borderRadius: 25,
	},
	avatar: {
		height: 40,
		width: 40,
		borderRadius:50,
		backgroundColor: 'black',
		marginLeft: 10,
		flexBasis: 20
	},
	iconsend: {
		// marginLeft:5,
		// marginTop: 7,
		width: 40,
		height: 40,
		flexBasis: 20
	},
	containerComment: {
		alignItems: "center"
	},
	body: {
		height: 40,
		width: '70%',
		borderWidth: 1,
		borderColor: 'white',
		borderStyle: "solid",
		borderColor: "grey",
		borderRadius: 25,
		paddingLeft: 20,
		paddingRight: 20,
		color: "#696969",
		flexBasis: 60
	},
	comment1: {
		color: 'white',
		marginTop: 8,
		marginBottom: 15,
		fontSize: 20
	},
	comment2: {
		color: 'white',
		marginTop: 8,
		marginBottom: 15,
		fontSize: 14
	}
});

export default styles;
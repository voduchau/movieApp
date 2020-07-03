import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		marginHorizontal: 16
	},
	thumbnailContainer: {
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	ContainerVideo: {
		flex: 1,
		backgroundColor: 'black',
		borderColor: 'red',
		height: 150,
		borderWidth: 1,
		flexDirection: 'column'
	},
	backgroundVideo: {
		width: '100%',
    	height: 120,
    	backgroundColor: 'black',
	},
	thumbnail: {
		width: 135,
		height: 90,
		borderRadius: 3
	},
	title: {
		// flex: 1,
		color: 'white',
		fontWeight: '500',
		fontSize: 13,
		marginLeft: 10
	}
});

export default styles;
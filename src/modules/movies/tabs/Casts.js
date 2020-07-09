import React, { PropTypes } from 'react';
import {
	Text,
	View,
	Image,
	ScrollView
} from 'react-native';

import styles from './styles/Casts';
import { TMDB_IMG_URL } from '../../../constants/api';

const Casts = ({ info, getTabHeight }) => {
	let data = info.casts.cast;
	console.log(data);
	let dataLength = data.length > 10 ? 10 : data.length;
	let computedHeight = (80 + 15) * dataLength; // (castImage.height + castContainer.marginBottom)
	// computedHeight += 447 + 40; // Header height + container ((20 paddingVertical) = 40)
	console.log(computedHeight,'height cast')
	return (
		<View style={styles.container} onLayout={getTabHeight.bind(this, 'casts', 950)}>
			<ScrollView
                    style={{paddingTop: 10, paddingBottom: 10}}
                >
			{
				data.slice(0,10).map(item => (
					<View key={item.cast_id} style={styles.castContainer}>
						<Image source={{ uri: `${TMDB_IMG_URL}/w185/${item.profile_path}` }} style={styles.castImage} />
						<View style={styles.characterContainer}>
							<Text style={styles.characterName}>
								{item.name}
							</Text>
							<Text style={styles.asCharacter}>
								{item.character && `as ${item.character}`}
							</Text>
						</View>
					</View>
				))
			}
			</ScrollView>
		</View>
	);
};

Casts.propTypes = {
	info: PropTypes.object.isRequired,
	getTabHeight: PropTypes.func.isRequired
};

export default Casts;

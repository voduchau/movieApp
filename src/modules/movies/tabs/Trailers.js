import React, { PropTypes, useState } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import YouTube from 'react-native-youtube';
import Video from 'react-native-video';
import styles from './styles/Trailers';

const Trailers = ({ getTabHeight, youtubeVideos, openYoutube }) => {
	// const [isReady,setisReady] = useState(false)
	// const [status,setstatus] = useState(false)
	const trailers = _.take(youtubeVideos, 10);
	let computedHeight = (90 + 10) * youtubeVideos.length; // (thumbnail.height + thumbnailContainer.marginBottom)
	computedHeight += 447 + 40; // Header height + container ((20 paddingVertical) = 40)
	// const [isReady,setisReady] = useState(false)
	// const [status,setstatus] = useState(null)
	// const [quality,setquality] = useState(null)
	// const [error,seterror] = useState(null)
	// const [isPlaying,setisPlaying] = useState(true)
	// const [isLooping,setisLooping] = useState(true)
	// const [duration,setduration] = useState(0)
	// const [currentTime,setcurrentTime] = useState(0)
	// const [fullscreen,setfullscreen] = useState(false)
	const onBuffer = () => {

	}
	return (
			 <View style={styles.container} onLayout={getTabHeight.bind(this, 'trailers', computedHeight)}>
			{
				trailers.map((item, index) => (
					<TouchableOpacity key={index} onPress={openYoutube.bind(this, `http://youtube.com/watch?v=${item.id}`)} >
						<View style={styles.thumbnailContainer}>
							<Video source={{uri: `https://www.youtube.com/watch?v=${item.id}`}}
								ref={(ref) => {
									this.player = ref
								  }}                                      // Store reference
								  onBuffer={this.onBuffer}                // Callback when remote video is buffering
								  onError={this.videoError}               // Callback when video cannot be loaded
								  controls={true}
								  style={styles.thumbnail}
							/>
							{/* <Image source={{ uri: `${item.snippet.thumbnails.medium.url}` }} style={styles.thumbnail} /> */}
							{/* <YouTube
								apiKey='AIzaSyDIJI0BySl3lPRv6JA4LHSWF7YPfPQURUc'
							  	videoId="KVZ-P-ZI6W4" // The YouTube video ID
							  	play={true} // control playback of video with true/false
							  	// fullscreen // control whether the video should play in fullscreen or inline
								// loop // control whether the video should loop when ended
							  	// // onReady={e => this.setState({ isReady: true })}
							  	// // onChangeState={e => this.setState({ status: e.state })}
							  	// // onChangeQuality={e => this.setState({ quality: e.quality })}
							  	// // onError={e => this.setState({ error: e.error })}
							  	// style={styles.thumbnail}
							/> */}
							<Text style={styles.title}>{item.snippet.title}</Text>
						</View>
					</TouchableOpacity>
				))
			}
			 </View>
	);
};

Trailers.propTypes = {
	getTabHeight: PropTypes.func.isRequired,
	openYoutube: PropTypes.func,
	youtubeVideos: PropTypes.array
};

export default Trailers;

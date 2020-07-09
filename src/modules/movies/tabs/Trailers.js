import React, { PropTypes, useState } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import _, { forInRight } from 'lodash';
import YouTube from 'react-native-youtube';
import Video from 'react-native-video';
import styles from './styles/Trailers';
import firebase from 'firebase';
import firebaseConfig from '../../_global/firebase/firebaseApp';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

class Trailers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			urlVideo: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594208121/video/See_You_Soon_roz8bq.mp4'
		};

		console.log(this.props,'proppsss')
		// this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}
	componentDidMount() {
		// firebase.database().ref('movies/video/').set({
		// 	419704: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594204152/video/1jWrIbIUuE8iYjnJWkMKejwx2_wmi3ypl_1_bccreg.mp4',
		// 	475430: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594204958/video/Disney_s_Artemis_Fowl_-_Teaser_Trailer_bgyxrv.mp4', //altermist
		// 	565743: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594205042/video/The_Vast_Of_Night_Official_Trailer_-_Prime_Video_jdcu0w.mp4', //the vast of night
		// 	338762: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594205155/video/BLOODSHOT_International_Trailer_jp8ov0.mp4', //bloodshot
		// 	585244: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594205204/video/I_Still_Believe_-_-OK-_Clip_bquhbw.mp4', // i still belive
		// 	619264: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594205306/video/THE_PLATFORM_Clip_-_TIFF_2019_irkobb.mp4', //the plaf form
		// 	602147: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594205611/video/Inheritance_-_Official_Trailer_HD_-_Vertical_Entertainment_yieq0v.mp4', //"Inheritance"
		// 	496243: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594205828/video/Parasite_Official_Trailer_In_Theaters_October_11_2019_ssip7f.mp4', // parasite
		// 	581859: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594206148/video/Da_5_Bloods_-_Official_Trailer_-_Netflix_fjbbwm.mp4', // da 5
		// 	443791: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594206174/video/Underwater_-_-Awakened-_TV_Spot_-_20th_Century_FOX_qy3kyk.mp4', // underwater
		// 	514847: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594206402/video/The_Hunt_-_Official_Trailer_HD_o4cofr.mp4', // the hunt
		// 	556678: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594206506/video/EMMA._-_Official_Trailer_HD_-_Now_On_Demand_and_In_Theaters_voppgc.mp4', // emma
		// 	696374: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594206632/video/Gabriel_s_Inferno_-_Teaser_PASSIONFLIX_wk1gwb.mp4', //Grabriel's inferno
		// 	508439: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594206817/video/Introducing_Onward_Featurette_-_In_Theaters_March_6_am7vd6.mp4', // Onward
		// 	475557: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594207030/video/JOKER_-_-_30s_TV_Spot_1_zj37ql.mp4', // joker
		// 	454626: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594207218/video/Sonic_Movie_Trailer_but_with_Sonic_music_t7d4ro.mp4', // sonic
		// 	555974: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594207413/video/Brahms-_The_Boy_II_-_Official_Final_Trailer_2020_Katie_Holmes_z3vrhd.mp4', //Brahms: The Boy II
		// 	522098: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594207585/video/Journey_To_The_East_by_Hulos_2018_-_Trailer_30s_yci4qu.mp4', // Babyteeth
		// 	458305: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594207710/video/VIVARIUM_Trailer_2_2020_afwxfi.mp4', // "Vivarium"
		// 	696007: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594207803/video/SILENCE_30s_Legacy_TV_Spot_--_IN_CINEMAS_9_FEBRUARY_2017_SG_dxczzx.mp4', //"Legacy"
		// 	575773: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594208007/video/ROCKS_-_Official_Trailer_v4vgh4.mp4', //"Rocks"
		// 	495764: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594208121/video/See_You_Soon_roz8bq.mp4', // birds of Prey
		// 	429617: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594208408/video/SPIDER-MAN-_INTO_THE_SPIDER-VERSE_-_Official_Teaser_Trailer_af1qp1.mp4', // spider man
		// })
		firebase.database().ref('movies/video').once('value', (data)=>{
			let urlVideo = 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594208121/video/See_You_Soon_roz8bq.mp4'
			console.log(data.val(),'data trả về')
			for(key in data.val()){
				if(key == this.props.info.id){
					console.log(key,'đây là key thỏa')
					// urlVideo = data.val()[key]
					this.setState({urlVideo: data.val()[key]})
				}
			}
			console.log(this.state.urlVideo,'this is url')
		})
	}
	render() {
 		console.log(this.props.info,'infoooo123')
 		const trailers = _.take(this.props.youtubeVideos, 10).slice(0,1);
 		let computedHeight = (90 + 10) * 2; // (thumbnail.height + thumbnailContainer.marginBottom)
		 computedHeight += 447 + 40; // Header height + container ((20 paddingVertical) = 40)
		 console.log(computedHeight,'height trailer')
		return(
			// <VideoPlayer
			// 				  source={{uri: 'https://res.cloudinary.com/djwg6xkrq/video/upload/v1594204152/video/1jWrIbIUuE8iYjnJWkMKejwx2_wmi3ypl_1_bccreg.mp4'}}
			// 				//   navigator={this.props.navigator}
			// 				  style={styles.thumbnail}
			// />
			<View style={styles.container} onLayout={this.props.getTabHeight.bind(this, 'trailers', 950)}>
 			{
 				trailers.map((item, index) => (
 					// <TouchableOpacity key={index} onPress={this.props.openYoutube.bind(this, `http://youtube.com/watch?v=${item.id}`)} >
 						<View key={index} style={styles.thumbnailContainer}>
 							{/* <Video source={{uri: `https://firebasestorage.googleapis.com/v0/b/movie-didong.appspot.com/o/youtube%2F338762%2FBLOODSHOT%20-%20Official%20Trailer%20(HD).mp4?alt=media&token=eb6526b0-688b-4c6a-b653-585c31dbb790`}}
 								ref={(ref) => {
 									this.player = ref
 								  }}                                // Store reference
 								  onChangeState={e => {
 									this.setState({ status: e.state });
 								  }}
 								  onBuffer={this.onBuffer}                // Callback when remote video is buffering
 								  onError={e => {
       								  this.setState({ error: e.error });
 									  }}              // Callback when video cannot be loaded
 								play={true}
 								controls={true}
 								style={styles.thumbnail}
 							/> */}
 							<VideoPlayer
							  source={{uri: this.state.urlVideo}}
							//   navigator={this.props.navigator}
							toggleResizeModeOnFullscreen
							tapAnywhereToPause={true}
							disableBack={true}
							showOnStart={true}
							onPlay={console.log('on play video')}
							//   style={styles.thumbnail}
							style={{height: '100%', width: '100%', align: 'center',}}
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
 					//  </TouchableOpacity>
 				))
 			}
 			 </View>
 	);
	}
}

// const Trailers = ({ getTabHeight, youtubeVideos, openYoutube, info }) => {
// 	console.log(info,'infoooo123')
// 	const trailers = _.take(youtubeVideos, 10);
// 	let computedHeight = (90 + 10) * youtubeVideos.length; // (thumbnail.height + thumbnailContainer.marginBottom)
// 	computedHeight += 447 + 40; // Header height + container ((20 paddingVertical) = 40)

// 	// const Blob = RNFetchBlob.polyfill.Blob;
// 	// const fs = RNFetchBlob.fs;
// 	// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// 	// window.Blob = Blob
	
// 	const onBuffer = () => {

// 	}
// 	return (
// 			 <View style={styles.container} onLayout={getTabHeight.bind(this, 'trailers', computedHeight)}>
// 			{
// 				trailers.map((item, index) => (
// 					// <TouchableOpacity key={index} onPress={openYoutube.bind(this, `http://youtube.com/watch?v=${item.id}`)} >
// 						<View key={index} style={styles.thumbnailContainer}>
// 							{/* <Video source={{uri: `https://firebasestorage.googleapis.com/v0/b/movie-didong.appspot.com/o/youtube%2F338762%2FBLOODSHOT%20-%20Official%20Trailer%20(HD).mp4?alt=media&token=eb6526b0-688b-4c6a-b653-585c31dbb790`}}
// 								ref={(ref) => {
// 									this.player = ref
// 								  }}                                // Store reference
// 								  onChangeState={e => {
// 									this.setState({ status: e.state });
// 								  }}
// 								  onBuffer={this.onBuffer}                // Callback when remote video is buffering
// 								  onError={e => {
//       								  this.setState({ error: e.error });
// 									  }}              // Callback when video cannot be loaded
// 								play={true}
// 								controls={true}
// 								style={styles.thumbnail}
// 							/> */}
// 							<VideoPlayer
// 							  source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
// 							//   navigator={this.props.navigator}
// 							  style={styles.thumbnail}
// 							/>;
// 							{/* <Image source={{ uri: `${item.snippet.thumbnails.medium.url}` }} style={styles.thumbnail} /> */}
// 							{/* <YouTube
// 								apiKey='AIzaSyDIJI0BySl3lPRv6JA4LHSWF7YPfPQURUc'
// 							  	videoId="KVZ-P-ZI6W4" // The YouTube video ID
// 							  	play={true} // control playback of video with true/false
// 							  	// fullscreen // control whether the video should play in fullscreen or inline
// 								// loop // control whether the video should loop when ended
// 							  	// // onReady={e => this.setState({ isReady: true })}
// 							  	// // onChangeState={e => this.setState({ status: e.state })}
// 							  	// // onChangeQuality={e => this.setState({ quality: e.quality })}
// 							  	// // onError={e => this.setState({ error: e.error })}
// 							  	// style={styles.thumbnail}
// 							/> */}
// 							<Text style={styles.title}>{item.snippet.title}</Text>
// 						</View>
// 					// </TouchableOpacity>
// 				))
// 			}
// 			 </View>
// 	);
// };

Trailers.propTypes = {
	getTabHeight: PropTypes.func.isRequired,
	openYoutube: PropTypes.func,
	youtubeVideos: PropTypes.array
};

export default Trailers;

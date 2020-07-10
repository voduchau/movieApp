import React, { Component, PropTypes } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image, ScrollView, RefreshControl} from 'react-native';
import styles from './styles/Comments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {GetCurrentUser} from '../../../action/GetUser';
import {AddComent} from '../../../action/AddComent';
import {GetComments} from '../../../action/GetComments';
import {GetAllLikes} from '../../../action/GetAllLikes';
import {GetRating} from '../../../action/GetRating';
import {AddTopRate} from '../../../action/AddTopRate';
import Send from 'react-native-vector-icons/MaterialCommunityIcons';
import Like from 'react-native-vector-icons/SimpleLineIcons';
import firebase from 'firebase';
import Video from 'react-native-video';
import { Rating, AirbnbRating } from 'react-native-ratings';
import firebaseConfig from '../../_global/firebase/firebaseApp';
import _ from 'lodash';
import user from '../../../constants/images/user.png'
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

class Comments extends Component {
    constructor(props) {
		super(props);

		this.state = {
            comment: '',
            likeStatus: false,
            isLogin: false,
            isRefreshing: false,
        };
        // this._onScroll = this._onScroll.bind(this);
    }
    componentDidMount = () => {
        this.props.GetCurrentUser();
        this.props.GetAllLikes(this.props.CurrentUser.userID);
        this.props.GetComments(this.props.info.id);
        this.props.GetRating(this.props.info.id)
    }

    _AddComment = () => {
        this.props.AddComent(this.props.CurrentUser.userID,this.props.CurrentUser.email,this.props.CurrentUser.photoURL,this.state.comment,this.props.info.id)
        this.props.GetComments(this.props.info.id)
        this.setState({comment: ''})
    }

    _AddCountLike = async (movieID, commentID) => {
        firebase.database().ref('likes/').push({
            userID: this.props.CurrentUser.userID ,
            commentID: commentID
        }).then(() => {
            firebase.database().ref('likes/').orderByChild('commentID').equalTo(commentID).on('value', (data) =>{
                if(data.val()){
                    firebase.database().ref('comments/' + movieID + '/' + commentID).update({
                        likeCount: Object.keys(data.val()).length
                    }).then(()=>{
                        this.props.GetAllLikes(this.props.CurrentUser.userID);
                        this.props.GetComments(this.props.info.id);
                    })
                }
                else {
                    firebase.database().ref('comments/' + movieID + '/' + commentID).update({
                        likeCount: 0
                    }).then(()=>{
                        this.props.GetAllLikes(this.props.CurrentUser.userID);
                        this.props.GetComments(this.props.info.id);
                    })
                }

            })
        })

        
    }
    _UnLike = async (item,like) => {
        await firebase.database().ref('likes/' + like.likeID).remove().then(()=>{
            firebase.database().ref('comments/' + this.props.info.id + '/' + item.commentID).update({
                likeCount: item.likeCount - 1
            })
        })
        this.props.GetAllLikes(this.props.CurrentUser.userID);
        this.props.GetComments(this.props.info.id);
    }

    checkLike = (like,item) => {
        if(like){
            if(this.props.CurrentUser.userID){
                return (
                    <TouchableOpacity style={styles.iconLike} onPress={()=>this._UnLike(item,like)}>
                          <Like name="like" size={18} color="blue" />
                    </TouchableOpacity>
                )  
            }
            else {
                return (
                    <TouchableOpacity style={styles.iconLike} onPress={()=>{
                        Alert.alert(
                            'You are not logged in',
                            `Please Login before Like this comment`,
                            [
                              { text: 'OK', onPress: () => console.log('click ok')}
                            ],
                            { cancelable: false }
                          );
                    }}>
                          <Like name="like" size={18} color="blue" />
                    </TouchableOpacity>
                )
            }
        }
        else if(like == null){
            if(this.props.CurrentUser.userID){
                return (
                    <TouchableOpacity style={styles.iconLike} onPress={()=>this._AddCountLike(this.props.info.id,item.commentID)}>
                        <Like name="like" size={18} color="white" />
                    </TouchableOpacity>
                )  
            }
            else {
                return (
                    <TouchableOpacity style={styles.iconLike} onPress={()=>{
                        Alert.alert(
                            'You are not logged in',
                            `Please Login before Like this comment`,
                            [
                              { text: 'OK', onPress: () => console.log('click ok')}
                            ],
                            { cancelable: false }
                          );
                    }}>
                        <Like name="like" size={18} color="white" />
                    </TouchableOpacity>
                )
            }
        }
        else {
            if(this.props.CurrentUser.userID){
                return (
                    <TouchableOpacity style={styles.iconLike} onPress={()=>this._AddCountLike(this.props.info.id,item.commentID)}>
                          <Like name="like" size={18} color="white" />
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity style={styles.iconLike} onPress={()=>{
                        Alert.alert(
                            'You are not logged in',
                            `Please Login before Like this comment`,
                            [
                              { text: 'OK', onPress: () => console.log('click ok')}
                            ],
                            { cancelable: false }
                          );
                    }}>
                          <Like name="like" size={18} color="white" />
                    </TouchableOpacity>
                )
            }
        }
    }

    ratingCompleted = async (rating) => {
        console.log("Rating is: " + rating)
        if(this.props.CurrentUser.userID){
            await firebase.database().ref('rating/' + this.props.info.id + '/' + this.props.CurrentUser.userID).set({
                rating: rating
            }).then(()=>{
                this.props.GetRating(this.props.info.id)
                // this.props.AddTopRate(this.props.info,this.props.rating)
            })
        }
        else {
            Alert.alert(
                'You are not logged in',
                `Please Login before Rating`,
                [
                  { text: 'OK', onPress: () => console.log('click ok')}
                ],
                { cancelable: false }
              );
        }
    }

    ShowInputComment = (iconSend) => {
        if(this.props.CurrentUser.userID){
            return (
                <View style={styles.containerComment}>
					<View style={styles.InputContainer}>
                        <Image source={{ uri: this.props.CurrentUser.photoURL}} style={styles.avatar} />
        			    <TextInput
        			        style={styles.body}
        			        placeholder="Add your comment"
        			        onChangeText={text => this.setState({comment: text})}
        			        value={this.state.comment}
        			        // placeholderTextColor= "grey"
        			        underlineColorAndroid="transparent"
        			    />
					    <TouchableOpacity style={styles.iconsend} onPress={() => this._AddComment()}>
					    	  {iconSend}
					    </TouchableOpacity>
        			</View>
				</View>
            )
        }
        else {
            return (
                <View style={styles.containerComment}>
					<View style={styles.InputContainer}>
                        <Image source={user} style={styles.avatar} />
        			    <TextInput
        			        style={styles.body}
        			        placeholder="Add your comment"
        			        onChangeText={text => this.setState({comment: text})}
        			        value={'Please Login before comment'}
        			        placeholderTextColor= "white"
                            underlineColorAndroid="transparent"
                            editable={false} 
                            selectTextOnFocus={false}
        			    />
					    <TouchableOpacity style={styles.iconsend} onPress={()=>{
                            console.log('bạn chưa login')
                            Alert.alert(
                                'You are not logged in',
                                `Please Login before comment`,
                                [
                                  { text: 'OK', onPress: () => console.log('click ok')}
                                ],
                                { cancelable: false }
                              );
                        }}>
					    	  {iconSend}
					    </TouchableOpacity>
        			</View>
				</View>
            )
        }
    }
    showRating = () => {
        if(this.props.CurrentUser.userID){
            return (
                <AirbnbRating
				  showRating
                  imageSize={20}
                  defaultRating={0}
				  reviews={["Rated: 1/5","Rated: 2/5","Rated: 3/5","Rated: 4/5","Rated: 5/5"]}
				  size={13}
				  reviewSize={16}
				  onFinishRating={this.ratingCompleted}
				/>
            )
        }
        else {
            return (
                <AirbnbRating
				//   showRating
                  imageSize={20}
                  defaultRating={0}
                  readonly={true}
				  reviews={["Rated: 1/5","Rated: 2/5","Rated: 3/5","Rated: 4/5","Rated: 5/5"]}
				  size={15}
				  reviewSize={20}
				  onFinishRating={()=>{
                    Alert.alert(
                        'You are not logged in',
                        `Please Login before Rating`,
                        [
                          { text: 'OK', onPress: () => console.log('click ok')}
                        ],
                        { cancelable: false }
                      );
                  }}
				/>
            )
        }
    }
    _toggleNavbar(status) {
		this.props.navigator.toggleNavBar({
			to: status,
			animated: true
		});
	}
    _onScroll = (event) => {
        console.log('vao alo')
		const contentOffsetY = event.nativeEvent.contentOffset.y.toFixed();
		if (contentOffsetY > 150) {
			this._toggleNavbar('hidden');
		} else {
			this._toggleNavbar('shown');
		}
	}
    render() {
        const iconSend = <Send name="send" size={26} color="#9F9F9F" />;
        const iconLike = <Like name="like" size={18} color="white" />
        // this.props.AddTopRate(this.props.info,this.props.rating)
        let computedHeight = (100 * this.props.AllComments.length) + 447 + 40;
        let like;
        return (
            <View style={styles.container} onLayout={this.props.getTabHeight.bind(this, 'comments', 1100)}>
                <Text style={{color:'white', fontSize: 15}}>Rate it:</Text>
                {this.showRating()}
                <Text style={styles.comment1}>Comments:</Text>
                {/* <ScrollView
					style={{}}
					onScroll={()=>this._onScroll()}
					scrollEventThrottle={100}
					// onContentSizeChange={this._onContentSizeChange}
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
					}> */}
                    <FlatList
                        data={this.props.AllComments}
                        keyExtractor={(item,index) => index}
                        renderItem={ ({item})=> {
                        return (
                            <View style={styles.InputContainer1}>
                                <Image source={{ uri: item.photoURL}} style={styles.avatar1} />
                                <View style={styles.viewContent}>
                                    <Text style={{color: 'white', fontSize: 13, marginBottom: 3}}>{item.email}</Text>
                                    <Text style={{color: 'white', fontSize: 11, marginBottom: 10}}>{item.content}</Text>
                                </View>
                                {
                                    like = this.props.AllLikes.find(item1 => {
                                        return item1.commentID == item.commentID
                                    }),
                                    this.checkLike(like,item)
                                }
                                <Text style={{color: 'white', fontSize: 12, marginBottom: 10, marginLeft: 8}}>{item.likeCount}</Text>
        				    </View>
                        )
                        }}
                    />
					{this.ShowInputComment(iconSend)}
                {/* </ScrollView> */}
            </View>
        );
    }
}
function mapStateToProps(state, ownProps) {
    console.log(state.LoadComments,'loadt comment trong comment');
    // console.log(state.LoadComments,'loadd All LoadComments trong comment');
    // console.log(state.GetAllLikes,'loadd All LIKEEEEEEEE trong comment');

	return {
        CurrentUser: state.LoadUser,
        AllComments: state.LoadComments,
        AllLikes: state.GetAllLikes,
	    // Rating: state.GetRating
	};
}

function mapDispatchToProps(dispatch) {
	return {
        AddComent: bindActionCreators(AddComent,dispatch),
        GetCurrentUser: bindActionCreators(GetCurrentUser,dispatch),
        GetComments: bindActionCreators(GetComments,dispatch),
        GetAllLikes: bindActionCreators(GetAllLikes,dispatch),
        GetRating: bindActionCreators(GetRating,dispatch),
        AddTopRate: bindActionCreators(AddTopRate,dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);

import React, { Component, PropTypes } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import styles from './styles/Comments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {GetCurrentUser} from '../../../action/GetUser';
import {AddComent} from '../../../action/AddComent';
import {GetComments} from '../../../action/GetComments';
import {GetAllLikes} from '../../../action/GetAllLikes';
import Send from 'react-native-vector-icons/MaterialCommunityIcons';
import Like from 'react-native-vector-icons/SimpleLineIcons';
import firebase from 'firebase';
import firebaseConfig from '../../_global/firebase/firebaseApp';
import _ from 'lodash';
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
  }

class Comments extends Component {
    constructor(props) {
		super(props);

		this.state = {
            comment: '',
            likeStatus: false,
        };
    }
    componentDidMount = () => {
        this.props.GetCurrentUser();
        this.props.GetAllLikes(this.props.CurrentUser.userID);
        this.props.GetComments(this.props.info.id);
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
                firebase.database().ref('comments/' + movieID + '/' + commentID).update({
                    likeCount: Object.keys(data.val()).length
                }).then(()=>{
                    this.props.GetAllLikes(this.props.CurrentUser.userID);
                    this.props.GetComments(this.props.info.id);
                })
            })
        })

        
    }
    checkLike = (like,iconLike,item) => {
        if(like){
            console.log('okeee bang nhau')
            return (
                <TouchableOpacity style={styles.iconLike}>
                      {iconLike} 
                      <Text style={{color: 'white', fontSize: 13, marginBottom: 3}}>da like</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.iconLike} onPress={()=>this._AddCountLike(this.props.info.id,item.commentID)}>
                      {iconLike}
                      <Text style={{color: 'white', fontSize: 13, marginBottom: 3}}>chua like</Text>
                </TouchableOpacity>
            )
        }
    }
    render() {
        const iconSend = <Send name="send" size={26} color="#9F9F9F" />;
        const iconLike = <Like name="like" size={18} color="white" />
    
        let like;
        return (
            <View>
                <Text style={styles.comment1}>Comments:</Text>
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
                                    this.checkLike(like,iconLike,item)
                                }
                                <Text style={{color: 'white', fontSize: 11, marginBottom: 10}}>{item.likeCount}</Text>
        				    </View>
                        )
                        }}
                    />
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
            </View>
        );
    }
}
function mapStateToProps(state, ownProps) {
    console.log(state.LoadUser,'loadt user trong comment');
    console.log(state.LoadComments,'loadd All LoadComments trong comment');
    console.log(state.GetAllLikes,'loadd All LIKEEEEEEEE trong comment');

	return {
        CurrentUser: state.LoadUser,
        AllComments: state.LoadComments,
        AllLikes: state.GetAllLikes,
	};
}

function mapDispatchToProps(dispatch) {
	return {
        AddComent: bindActionCreators(AddComent,dispatch),
        GetCurrentUser: bindActionCreators(GetCurrentUser,dispatch),
        GetComments: bindActionCreators(GetComments,dispatch),
        GetAllLikes: bindActionCreators(GetAllLikes,dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
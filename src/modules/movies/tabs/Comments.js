import React, { Component, PropTypes } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import styles from './styles/Comments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {GetCurrentUser} from '../../../action/GetUser';
import {AddComent} from '../../../action/AddComent';
import {GetComments} from '../../../action/GetComments';
import Send from 'react-native-vector-icons/MaterialCommunityIcons';
class Comments extends Component {
    constructor(props) {
		super(props);

		this.state = {
			comment: ''
		};

    }
    componentDidMount = () => {
        this.props.GetCurrentUser();
        this.props.GetComments(this.props.info.id)

    }

    // componentDidUpdate = (prevProps) => {
    //     console.log(prevProps,'prevProps');
    //     if (this.props.CurrentUser.photoURL != prevProps.CurrentUser.photoURL) {
    //         this.props.GetCurrentUser();
    //     }
    // }
    _AddComment = () => {
        this.props.AddComent(this.props.CurrentUser.userID,this.props.CurrentUser.photoURL,this.state.comment,this.props.info.id)
        this.props.GetComments(this.props.info.id)
        this.setState({comment: ''})
    }

    render() {
        console.log('vao tab commetn')
        const iconSend = <Send name="send" size={26} color="#9F9F9F" />;
        return (
            <View>
                <Text style={styles.comment1}>Comment:</Text>
                    <FlatList
                        data={this.props.AllComments}
                        keyExtractor={(item,index) => index}
                        renderItem={ ({item})=> {
                        return (
                            <View style={styles.InputContainer}>
                            <Image source={{ uri: item.photoURL}} style={styles.avatar} />
                                <Text style={{color: 'white', fontSize: 20}}>{item.content}</Text>
        				    </View>
                        )
                        }}
                    />
					<View style={styles.containerComment}>
						<View style={styles.InputContainer}>
                            <Image source={{ uri: this.props.CurrentUser.photoURL}} style={styles.avatar} />
        				    <TextInput
        				        style={styles.body}
        				        placeholder="E-mail or phone number"
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
	return {
        CurrentUser: state.LoadUser,
        AllComments: state.LoadComments
	};
}

function mapDispatchToProps(dispatch) {
	return {
        AddComent: bindActionCreators(AddComent,dispatch),
        GetCurrentUser: bindActionCreators(GetCurrentUser,dispatch),
        GetComments: bindActionCreators(GetComments,dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, Image } from "react-native";
import Button from "react-native-button";
import ProgressBar from '../_global/ProgressBar';
// import styles from './styles/Movie';
import firebaseConfig from '../_global/firebase/firebaseApp';
import 'firebase/firestore';
import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      error: "",
      avatarUser: ''
    };
  }
  componentDidMount = () => {
    
  }
  onPressLogin = async () => {
    this.setState({isLoading: true})
   await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
   .then(data => {
     this.setState({isLoading: false});
     if(data.user.emailVerified === false) {
      Alert.alert(
        'your email Verified',
        `Please check ${this.state.email}`,
        [
          { text: 'OK', onPress: () => firebase.auth().signOut()}
        ],
        { cancelable: false }
      );
     }
     else {
       firebase.database().ref('users/' + data.user.uid).update({
        emailVerified: true
       })
        Alert.alert(
          'Login successful',
          `Welcome ${data.user.email}`,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
        this.props.navigator.popToRoot({
         screen: 'movieapp.Movies',
     })
     }
     
   })
   .catch((error) => {
      // Handle Errors here.
      this.setState({isLoading: false})
      var errorMessage = error.message;
      this.setState({ error: "Invalid username or password..." });
    });
  }
  onPressFacebook = () => {

  }
  onPressSignup = () => {
    this.props.navigator.push({
      screen: "movieapp.Signup"
    })
  }
  render() {
    return (
      this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        <Text style={{color: "red", fontSize: 19, alignItems: "center", textAlign: "center", fontStyle: "italic"}}>
          {this.state.error != "" ? this.state.error:null}
        </Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail or phone number"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            // placeholderTextColor= "grey"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            // placeholderTextColor="grey"
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => this.onPressLogin()}
        >
          Log in
        </Button>
        <Button
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => this.onPressFacebook()}
        >
          Login with Facebook
        </Button>
        <Text style={{marginTop: 10}}>You don't have account? Create one now. </Text>
        <Button
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => this.onPressSignup()}
        >
          Sign Up
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  or: {
    fontFamily: "Noto Sans",
    color: "black",
    marginTop: 40,
    marginBottom: 10
  },
  progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4267b2",
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
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
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: 20,
    color: "#696969"
  },
  loginContainer: {
    width: "70%",
    backgroundColor: "#ff5a66",
    borderRadius: 25,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: "white"
  },
  placeholder: {
    fontFamily: "Noto Sans",
    color: "red"
  },
  InputContainer: {
    width: "80%",
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 25
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#696969"
  },
  facebookContainer: {
    width: "70%",
    backgroundColor: "#4267b2",
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    marginTop: 30
  },
  facebookText: {
    color: "white",
    width: "70%",
    borderRadius: 25,
  }
});
export default Login;

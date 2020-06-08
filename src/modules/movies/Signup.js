import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Button from "react-native-button";
import firebaseConfig from '../_global/firebase/firebaseApp';
import 'firebase/firestore';
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const defaultAvatar = 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
class Signup extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: true,
          fullname: "",
          phone: "",
          email: "",
          password: "",
          error: ""
        };
      }

    onRegister = async () => {
        this.setState({ error: ""})
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(data => {
          firebase.database().ref('users/' + data.user.uid).set({
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            avatar: defaultAvatar
          })
        }).catch((err) => {
          console.log('lỗi sign up account')
          this.setState({ error: err.message})
        })

        if(this.state.error == ""){
          this.props.navigator.push({
            screen: 'movieapp.Login'
          })
        }
    }
    render() {
        return (
        <View style={styles.container}>
          <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Full Name"
              onChangeText={text => this.setState({ fullname: text })}
              value={this.state.fullname}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Phone Number"
              onChangeText={text => this.setState({ phone: text })}
              value={this.state.phone}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="E-mail Address"
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            />
          </View>
          <Button
            containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
            style={styles.facebookText}
            onPress={() => this.onRegister()}
          >
            Sign Up
          </Button>
          <View>
            <Text>
              {this.state.error != "" ? <Text>{this.state.error}</Text> :null}
            </Text>
          </View>
          
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#ff5a66",
      marginTop: 20,
      marginBottom: 20
    },
    leftTitle: {
      alignSelf: "stretch",
      textAlign: "left",
      marginLeft: 20
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
      color: "white",
    },
    placeholder: {
      fontFamily:"Noto Sans",
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
      backgroundColor: "#ff5a66",
      borderRadius: 25,
      padding: 10,
      marginTop: 30
    },
    facebookText: {
      color: 'white'
    }
  });

export default Signup;
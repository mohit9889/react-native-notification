import React, { useState } from "react";
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground} from "react-native";
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

import img from "../assets/images/login.jpg";

const Login = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLoginHandler = async () => {
        let action = authActions.login(email, password)
        try {
            await dispatch(action);
            props.navigation.replace("Home");
        } catch (err) {
            console.log("[ERROR]", err);
        }
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={img} style={styles.imageBackground}>
                <Text style={styles.header}>Sign In</Text>
            </ImageBackground>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    defaultValue={email}
                    onChangeText={(text) => {setEmail(text)}}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    defaultValue={password}
                    onChangeText={(text) => {setPassword(text)}}
                />
                <TouchableOpacity onPress={userLoginHandler} style={styles.button}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {props.navigation.navigate('Signup')}} style={styles.signup}>
                    <Text>No account? No worries :) </Text>
                    <Text style={styles.buttonText}>Sign up!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 40,
    fontWeight: "bold",
    color: "white"
  },
  inputContainer: {
      padding: 20,
  },
  textInput: {
      backgroundColor: "#F5F5F5",
      height: 50,
      padding: 10,
      marginBottom: 20,
  },
  button: {
      height: 50,
      backgroundColor: "#212121",
      justifyContent: "center",
      alignContent: "center",
      marginBottom: 20
  },
  buttonText: {
      color: "#E4595D",
      textAlign: "center",
  },
  signup: {
      flexDirection: "row",
      justifyContent: "center"
  }
});

export default Login;
import React, { useState } from "react";
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

const Signup = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpHandler = async () => {
        let action = authActions.signup(email, password)
        try {
            await dispatch(action);
            props.navigation.navigate("Login");
        } catch (err) {
            console.log("[ERROR]", err);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.header}>Sign Up for the First Time</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    defaultValue={email}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    defaultValue={password}
                />
                <TouchableOpacity onPress={signUpHandler} style={styles.button}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {props.navigation.goBack()}} style={styles.signup}>
                    <Text>Have a account? </Text>
                    <Text style={styles.buttonText}>Sign in!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "white",
  },
  inputContainer: {
      padding: 20,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "bold"
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

export default Signup;
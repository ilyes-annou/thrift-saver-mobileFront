import { React, useState, useEffect } from "react";

import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Button,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    Alert,
    SafeAreaView
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const LoginPage = ({ onLogin }) => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleEmailInputChange = (text) => {
        setEmailInput(text);
    };
  
    const handlePasswordInputChange = (text) => {
        setPasswordInput(text);
    };

    const checkLogin = async () => {
        try {
            const result = await axios.post(
                "http://localhost:3080/login/",
                {
                   "email":emailInput,
                   "password":passwordInput 
                }     
            );
            console.log('Token:', result.data.token);
            console.log('id:', result.data.id);
            await AsyncStorage.setItem('token', result.data.token);
            await AsyncStorage.setItem('id', result.data.id);
            await AsyncStorage.setItem('email', emailInput);
            onLogin()
            
        }
          catch(error) {
            console.error('Error making login request:', error);
            Alert.alert(
                "Error",
                "This operation didn't work, try again",
                [
                  {text: 'OK', onPress: () => {
                  }}
                ],)
        }
    };

    const handleLogin = async () => {

        if(emailInput && emailInput!== "" && passwordInput && passwordInput !== ""){
            checkLogin()
        }
        else{
            Alert.alert(
                "Caution",
                "You must specify email and password",
                [
                  {text: 'OK', onPress: () => {
                  }}
                ],)
        }

    }
   
    return (
        <SafeAreaView
            style={{
                flex: 1, 
                justifyContent: 'center', 
            }}>
            <TextInput
                placeholder="email"
                style={styles.input}
                onChangeText={handleEmailInputChange}
                value={emailInput.toString()}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                onChangeText={handlePasswordInputChange}
                value={passwordInput.toString()}
                autoCapitalize='none'
            />
            <Button title="Login" onPress={checkLogin} />
        </SafeAreaView>
    );  
};

const styles = StyleSheet.create({

    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 5,
      paddingHorizontal:10,
      marginHorizontal: 20,
      marginVertical: 10,
    },
  });

export default LoginPage;

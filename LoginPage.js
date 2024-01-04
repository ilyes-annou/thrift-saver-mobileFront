import { React, useState } from "react";

import {
    View,
    TextInput,
    StyleSheet,
    Button,
    Image,
    Alert,
    SafeAreaView
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            console.log("Token:", result.data.token);
            console.log("id:", result.data.id);
            await AsyncStorage.setItem("token", result.data.token);
            await AsyncStorage.setItem("id", result.data.id);
            await AsyncStorage.setItem("email", emailInput);
            onLogin()
            
        }
          catch(error) {
            console.error("Error making login request:", error.message);
            Alert.alert(
                "Error",
                "This operation didn't work, try again",
                [
                  {text: "OK", onPress: () => {
                  }}
                ],)
        }
    };

    const handleCreate = async () => {
        if(emailInput && emailInput!== "" && passwordInput && passwordInput !== ""){
            checkLogin()
            Alert.alert(
                "Caution",
                "Create an account with these info?",
                [
                {text: "Yes", onPress: async() => {


                    try {
                        const result = await axios.post(
                            "http://localhost:3080/user/",
                            {
                            "email":emailInput,
                            "password":passwordInput 
                            }     
                        );
                        
                        Alert.alert(
                            "Info",
                            "Success, try to login",
                            [
                            {text: "OK", onPress: () => {
                            }}
                            ],)
                        
                    }
                    catch(error) {
                        console.error("Error making login request:", error.message);
                        Alert.alert(
                            "Error",
                            "This operation didn't work, try again",
                            [
                            {text: "OK", onPress: () => {
                            }}
                            ],)
                    }

                }},
                {text: "No", onPress: () => {
                    }}
            ],)
        }
        else{
            Alert.alert(
                "Caution",
                "You must specify email and password",
                [
                  {text: "OK", onPress: () => {
                  }}
            ],)
        }


    }

    const handleLogin = async () => {

        if(emailInput && emailInput!== "" && passwordInput && passwordInput !== ""){
            checkLogin()
        }
        else{
            Alert.alert(
                "Caution",
                "You must specify email and password",
                [
                  {text: "OK", onPress: () => {}}
                ],
            )
        }

    }
   
    return (
        <SafeAreaView
            style={{
                flex: 1, 
                justifyContent: "center", 
            }}>
            <Image source={require("./assets/logo.jpg")} style={{
                width: 100, 
                height: 100, 
                marginBottom: 20, 
                borderRadius:20,
                alignSelf:"center"}} />
            <TextInput
                placeholder="email"
                style={styles.input}
                onChangeText={handleEmailInputChange}
                value={emailInput.toString()}
                autoCapitalize="none"
                secureTextEntry={false}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                onChangeText={handlePasswordInputChange}
                value={passwordInput.toString()}
                autoCapitalize="none"
                secureTextEntry={true}
            />

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 100,
                marginTop: 10}}
            >

                <Button title="Login" onPress={handleLogin} />

                <Button title="Create" onPress={handleCreate} />

            </View>
            
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

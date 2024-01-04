import React, { useState, useEffect } from "react";

import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Button,
    Alert,
    SafeAreaView
  } from "react-native";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = ({ onLogout }) => {

    const [email, setEmail]= useState("");
    const [editing, setEditing]= useState(false);
    const [newEmailInput, setNewEmailInput] = useState("");
    const [newPasswordInput, setNewPasswordInput] = useState("");

    const navigation = useNavigation();

    const handleLogout = () => {
      Alert.alert(
        "Caution",
        "Do you really want to log out?",
        [
          {text: "Yes", onPress: () => {
            console.log("OK Pressed");
            onLogout();
          }},
          {text: "No", onPress: () => console.log("No Pressed")}
        ],)
      //onLogout();
    };

    const handleEditProfile = () => {
      console.log(editing);
      setEditing(!editing);
    };

    const fetchData = async () => {
      setEmail(await AsyncStorage.getItem("email"));
    };

    const handleNewEmailInputChange = (text) => {
      setNewEmailInput(text);
  };

  const handleNewPasswordInputChange = (text) => {
      setNewPasswordInput(text);
  };

  const handleConfirm = () => {
    if((newEmailInput && newEmailInput !== "") || (newPasswordInput && newPasswordInput !== "")){
      Alert.alert(
        "Caution",
        "Do you really want to edit your profile?",
        [
          {text: "Yes", onPress: () => {
            console.log("OK Pressed");
            editProfile()
            
          }},
          {text: "No", onPress: () => console.log("No Pressed")}
        ],
      )
    }
    else{
      Alert.alert(
        "Caution",
        "You must specify new email or new password",
        [
          {text: "OK", onPress: () => {
          }}
        ],)
    }
  }

  const editProfile = async() => {
    try{
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const result = await axios.put(
        "http://localhost:3080/user/"+id,
        {
          email: newEmailInput,
          password: newPasswordInput
        },
        {
          headers: {
            "Authorization": token
          },
        }

      );
      await AsyncStorage.setItem("email", newEmailInput);
      setEmail(newEmailInput);
    }
    catch(error){
      console.error("Error making put request", error);
      Alert.alert(
        "Error",
        "This operation didn't work, try again",
        [
          {text: "OK", onPress: () => {
          }}
        ],)
    }
  }


    useEffect( () => {
        
        const unsubscribe = navigation.addListener("focus", () => {
          return unsubscribe;
        });
        //fetchData();
    }, [navigation]);

    useFocusEffect(
      React.useCallback(() => {
          fetchData()
      }, [])
    ); 

    return (

        <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps="handled" >

          <View
            style={{
              //alignSelf:"center",
              marginTop:10,
              paddingTop:20,
              paddingBottom:20,
              paddingLeft:10,
              borderRadius:20,
              backgroundColor: "white"
            }}
          >
            <Text style={{fontWeight:"bold"}}>Your email : { email }</Text>

          </View>

          {editing ? (
            <View>      
              
              <TextInput
                style={styles.input}
                placeholder="New Email"
                onChangeText={handleNewEmailInputChange}
                value={newEmailInput.toString()}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                onChangeText={handleNewPasswordInputChange}
                value={newPasswordInput.toString()}
                autoCapitalize="none"
                secureTextEntry={true}
              />

              <View style={styles.buttonContainer}>

                <Button title="Cancel" onPress={handleEditProfile} />

                <Button title="Confirm" onPress={handleConfirm} />

              </View>

            </View>

            ) : (
              <Button title="Edit Profile" onPress={handleEditProfile} />
            ) }


          <View>

            

            <Button title="Logout" color="red" onPress={handleLogout} /> 

          </View>
  
        </SafeAreaView>
      );

};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 100,
    marginTop: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor:"grey"
  }
})
export default Profile;


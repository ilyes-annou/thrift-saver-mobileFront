import React, { useState, useEffect } from "react";

import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Text,
    TouchableOpacity,
    Button,
    FlatList,
    Alert,
    SafeAreaView
  } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


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
          {text: 'Yes', onPress: () => {
            console.log('OK Pressed');
            onLogout();
          }},
          {text: 'No', onPress: () => console.log('No Pressed')}
        ],)
      //onLogout();
    };

    const handleEditProfile = () => {
      console.log(editing);
      setEditing(!editing);
    };

    const fetchData = async () => {
      setEmail(await AsyncStorage.getItem('email'));
    };

    const handleNewEmailInputChange = (text) => {
      setNewEmailInput(text);
  };

  const handleNewPasswordInputChange = (text) => {
      setNewPasswordInput(text);
  };

  const handleConfirm = () => {
    Alert.alert(
      "Caution",
      "Do you really want to edit your profile?",
      [
        {text: 'Yes', onPress: () => {
          console.log('OK Pressed');
          editProfile()
          
        }},
        {text: 'No', onPress: () => console.log('No Pressed')}
      ],)
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
      await AsyncStorage.setItem('email', newEmailInput);
      setEmail(newEmailInput);
    }
    catch(error){
      console.error("Error making put request", error);
    }
  }


    useEffect(async () => {
        
        const unsubscribe = navigation.addListener("focus", () => {
          return unsubscribe;
        });
        //fetchData();
    }, [navigation]);

    

    return (

        <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps='handled' >

          <Text>Your email : { email }</Text>

          {editing ? (
            <View>      
              
              <TextInput
                style={styles.input}
                placeholder="New Email"
                onChangeText={handleNewEmailInputChange}
                value={newEmailInput.toString()}
                autoCapitalize='none'
              />
              <TextInput
                style={styles.input}
                placeholder="New Passwordd"
                onChangeText={handleNewPasswordInputChange}
                value={newPasswordInput.toString()}
                autoCapitalize='none'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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


import { React, useState, useEffect } from "react";

import {
    View,
    Text,
    SafeAreaView,
    Button,
    TouchableOpacity
  } from "react-native";

import { useNavigation } from "@react-navigation/native";

const Home = () => {

    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('LoginPage');
    };

    

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
          return unsubscribe;
        });
    }, [navigation]);

    return (

        <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps='handled' >
            <View
                style={{
                    alignSelf:"center",
                    marginTop:30,
                }}
            >
                <Text>Hello, welcome to Thrift Saver !</Text>
            </View>

            <View>
                <View
                    style={{
                    }}   
                >
                <Text style = {{}}>My financials</Text>
                </View>

                <View>
                    <Text>Insights</Text> 
                </View>
            </View>

            <Button title="Logout" onPress={handleLogout} /> 
        </SafeAreaView>
      );
};
export default Home;


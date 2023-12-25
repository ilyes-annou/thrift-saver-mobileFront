import { React, useState, useEffect } from "react";

import {
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    Alert,
    SafeAreaView
  } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {

    const navigation = useNavigation();

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
          
        </SafeAreaView>
      );

};
export default Home;


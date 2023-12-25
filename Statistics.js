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

const Statistics = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
          return unsubscribe;
        });
    }, [navigation]);

    return (

        <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps='handled' >
          
    
          
        </SafeAreaView>
      );

};
export default Statistics;


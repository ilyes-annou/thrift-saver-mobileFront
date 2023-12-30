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
import { useNavigation } from "@react-navigation/native";

const LoginPage = ({ onLogin }) => {

   
    return (
        <View>
            <Text>Login Page</Text>
            <Button title="Login" onPress={onLogin} />
        </View>
    );
};

export default LoginPage;

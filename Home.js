import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    SafeAreaView,
    Button,
    FlatList,
    TouchableOpacity,
    Alert
} from "react-native";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home= () => {

    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [spendings, setSpendings]= useState([]);
    const [email, setEmail]= useState("");
    
    

    const fetchData = async () => {
        try {
            const fetchedEmail = await AsyncStorage.getItem('email');
            setEmail(fetchedEmail.split('@')[0])
            const token = await AsyncStorage.getItem('token');
            const id = await AsyncStorage.getItem('id');
            console.log("token "+ token)
            console.log("id "+ id)
            const result = await axios.get(
                "http://localhost:3080/user/"+id+"/spending",
                {
                    headers: {
                      "Authorization": token,
                      "id":id
                    },
                }
            );

            setExpenses((result.data));
            console.log("reesult")
            console.log(result.data)
            console.log("Expenses")
            console.log(expenses)

            let calculatedTotal = 0

            result.data.forEach(expense => {
                calculatedTotal+=expense.price;
                
            });
            setTotal(calculatedTotal);
            console.log("total "+total)
            
        } 
        catch (error) {
            console.warn(error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    

    const navigation = useNavigation();

    

    const deleteSpending = async (id) => {
        console.log(id);
        
        try {
            const token = await AsyncStorage.getItem('token');
            const userid = await AsyncStorage.getItem('id');
            const result = await axios.delete(
                "http://localhost:3080/spending/"+id,
                {
                    headers: {
                        "Authorization": token,
                        "id":userid
                    },
                }
                
            );
            fetchData()
            console.log('DELETE request successful:', result.data);
          }
          catch(error) {
            console.error('Error making DELETE request:', error);
            Alert.alert(
                "Error",
                "This operation didn't work, try again",
                [
                  {text: 'OK', onPress: () => {
                  }}
                ],)
          }
    };

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener("focus", () => {
            
            return unsubscribe;
        });
        
    }, [navigation]);

    const handleDelete = async(id) =>{
        Alert.alert(
            "Caution",
            "Do you really want to delete this spending?",
            [
              {text: 'Yes', onPress: () => {
                console.log('OK Pressed');
                deleteSpending(id)
                
              }},
              {text: 'No', onPress: () => console.log('No Pressed')}
            ],)
    }

    const renderExpenseItem = ({ item, index }) => (
        <View key={index}>
            <Text> {item.description} { item.price}$</Text>
            <TouchableOpacity
                
                onPress={() =>
                    handleDelete(item._id)
                }
            >
                <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          
        </View>
    );

    useEffect(() => {
        console.log("Updated Expenses:", expenses);
        console.log("Updated Total:", total);
    }, [expenses, total]);

    

    return (

        <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps='handled' >
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
                <Text style={{
                    fontWeight:"bold"
                }}>Hello { email } </Text>
            </View>

            <View>
                <View
                    style={{
                    //alignSelf:"center",
                    marginTop:10,
                    paddingTop:20,
                    paddingBottom:20,
                    paddingLeft:10,
                    borderRadius:20,
                    backgroundColor: "white"
                }}>
                    <Text style = {{fontWeight:"bold"}}>Total expenses</Text>
                    <Text style = {{
                        alignSelf:"flex-end",
                        fontWeight:"bold",
                        color:"red"
                    }}> { total } $</Text>
                </View>

                <View
                style={{
                    //alignSelf:"center",
                    marginTop:10,
                    paddingTop:20,
                    paddingBottom:20,
                    paddingLeft:10,
                    borderRadius:20,
                    backgroundColor: "white"
                }}>

                    {expenses[0]? ( <Text style={{
                    fontWeight:"bold"
                }}>Your Expenses</Text>) : (<Text style={{
                    fontWeight:"bold"
                }}>Your don't have any expense</Text> )}
                    

                    

                    <FlatList
                        data={expenses}
                        renderItem={renderExpenseItem}
                        keyExtractor={item => item.id}
                        
                    />


                </View>
            </View>

        </SafeAreaView>
      );
};
export default Home;


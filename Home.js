import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Alert
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home= () => {

    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalEssential, setTotalEssential] = useState(0);
    const [totalAvoidable, setTotalAvoidable] = useState(0);
    const [spendings, setSpendings]= useState([]);
    const [email, setEmail]= useState("");
    
    const fetchData = async () => {
        try {
            const fetchedEmail = await AsyncStorage.getItem("email");
            setEmail(fetchedEmail.split("@")[0])
            const token = await AsyncStorage.getItem("token");
            const id = await AsyncStorage.getItem("id");
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

            let calculatedTotal = 0;
            let calculatedEssentialTotal = 0;
            let calculatedAvoidableTotal = 0;

            result.data.forEach(expense => {
                calculatedTotal+=expense.price;
                if(expense.category === "essential"){
                    calculatedEssentialTotal+=expense.price;
                }
                else{
                    calculatedAvoidableTotal+=expense.price;
                }
                
            });
            setTotal(calculatedTotal);
            setTotalEssential(calculatedEssentialTotal);
            setTotalAvoidable(calculatedAvoidableTotal);
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
            const token = await AsyncStorage.getItem("token");
            const userid = await AsyncStorage.getItem("id");
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
            console.log("DELETE request successful:", result.data);
          }
          catch(error) {
            console.error("Error making DELETE request:", error);
            Alert.alert(
                "Error",
                "This operation didn't work, try again",
                [
                  {text: "OK", onPress: () => {
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
              {text: "Yes", onPress: () => {
                console.log("OK Pressed");
                deleteSpending(id)
                
              }},
              {text: "No", onPress: () => console.log("No Pressed")}
            ],)
    }

    const renderExpenseItem = ({ item, index }) => (
        <View key={index} style={{marginVertical:5}}>
            <Text> {item.description} { item.price}$</Text>
            <Text> {item.date.substring(0,10)} </Text>
            <Text> {item.category.charAt(0).toUpperCase() + item.category.slice(1)} </Text>
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

        <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps="handled" >
            <View
                style={{//alignSelf:"center",
                marginTop:10,
                paddingTop:10,
                paddingBottom:10,
                marginHorizontal:10,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft:10,
                borderRadius:20,
                backgroundColor: "white"}}
            >
                
                <Text style={{
                    fontWeight:"bold",
                    paddingTop:20,
                    paddingBottom:10,
                }}>Hello { email } </Text>

                <Image source={require("./assets/logo.jpg")} style={{
                    width: 50, 
                    height: 50, 
                    marginRight:10,
                    borderRadius:20,
                    }} 
                
                />

            </View>

            <View>
                <View
                    style={styles.container}>
                    <Text style = {{fontWeight:"bold"}}>Total Expenses</Text>
                    
                    <Text style = {{
                        alignSelf:"flex-end",
                        fontWeight:"bold",
                        color:"green"
                    }}> { total } $</Text>
                    
                    <Text style = {{fontWeight:"bold"}}>Total Avoidable</Text>
                    
                    <Text style = {{
                        alignSelf:"flex-end",
                        fontWeight:"bold",
                        color:"green"
                    }}> { totalAvoidable } $</Text>
                    
                    <Text style = {{fontWeight:"bold"}}>Total Essential</Text>
                    
                    <Text style = {{
                        alignSelf:"flex-end",
                        fontWeight:"bold",
                        color:"green"
                    }}> { totalEssential } $</Text>
                </View>

                
                <View
                style={styles.container}>

                    {expenses[0]? ( <Text style={{
                    fontWeight:"bold"
                }}>Your Expenses</Text>) : (<Text style={{
                    fontWeight:"bold"
                }}>Your don't have any expense</Text> )}           

                    <FlatList
                        data={expenses}
                        renderItem={renderExpenseItem}
                        keyExtractor={item => item.id}
                        style={{maxHeight:300}}
                        
                    />


                </View>
            </View>

        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
    container: {
      marginHorizontal:10,
      marginTop:10,
      paddingTop:20,
      paddingBottom:20,
      paddingLeft:10,
      borderRadius:20,
      backgroundColor: "white"
    }
  })
export default Home;


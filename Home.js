import { React, useState, useEffect } from "react";

import {
    View,
    Text,
    SafeAreaView,
    Button,
    FlatList,
    TouchableOpacity
} from "react-native";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Home = () => {

    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchData = async () => {
        try {
            const result = await axios.get(
                "http://localhost:3080/spending/"
            );

            //setData(extractData(result.data));
            
            setExpenses(/*extractExpensesData*/(result.data));
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
            
        } catch (error) {
        console.warn(error);
        }
    };

    /*const extractExpensesData = (data) => {
        expensesList =[];
        data.forEach((expense) => {
            if(expense.description && expense.price){
                expensesList.push({
                    price: expense.price,
                    description: expense.description
                })
            }
        });
        return expensesList;
      };*/

    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('LoginPage');
    };

    const deleteSpending = async (id) => {
        console.log(id);
        try {
            const result = await axios.delete(
                "http://localhost:3080/spending/"+id,
                
            );
            console.log('DELETE request successful:', result.data);
          }
          catch(error) {
            console.error('Error making DELETE request:', error);
          }
    };

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener("focus", () => {
            
            return unsubscribe;
        });
        
    }, [navigation]);

    const renderExpenseItem = ({ item, index }) => (
        <View key={index}>
            <Text> {item.description} { item.price}$</Text>
            <TouchableOpacity
                
                onPress={() =>
                    deleteSpending(item._id)
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
                }}>Hello Username</Text>
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
                    <Text style = {{}}>Total expenses</Text>
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
                    <Text>Last Expenses</Text> 

                    

                    <FlatList
                        data={expenses}
                        renderItem={renderExpenseItem}
                        keyExtractor={item => item.id}
                        
                    />


                </View>
            </View>

            <Button title ="test"  onPress={fetchData}>
                <Text> Search </Text>
            </Button>

            <Button title="Logout" onPress={handleLogout} /> 
        </SafeAreaView>
      );
};
export default Home;


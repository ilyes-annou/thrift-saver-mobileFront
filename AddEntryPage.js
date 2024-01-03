import { React, useState, useEffect } from "react";
import axios from "axios";
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    Platform, 
    Alert,
    SafeAreaView
  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker"
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEntryPage = () => {
  const [amountInput, setAmountInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [date, setDate] = useState(new Date());

    const navigation = useNavigation();

    const handleAmountInputChange = (text) => {
      setAmountInput(text);
    };

    const handleDescriptionInputChange = (text) => {
      setDescriptionInput(text);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
          return unsubscribe;
        });
    }, [navigation]);

    const onChange = (event, date) => {
      const currentDate = date || new Date();
      setDate(currentDate);
    };

    const postSpending = async () => {
      if(amountInput && amountInput !== "" && descriptionInput && descriptionInput!== ""){
        try {
          const token = await AsyncStorage.getItem('token');
          const id = await AsyncStorage.getItem('id');
          console.log(token);
          const result = await axios.post(
              "http://localhost:3080/spending/",
              {
                price: amountInput,
                description: descriptionInput,
                date:date
              },
              {
                headers: {
                  "Authorization": token,
                  "id":id
                },
              }
          );
          console.log('POST request successful:', result.data);
        }
        catch(error) {
          console.error('Error making POST request:', error);
          Alert.alert(
            "Error",
            "This operation didn't work, try again",
            [
              {text: 'OK', onPress: () => {
              }}
            ],)
        }
      }
      else{
        Alert.alert(
          "Caution",
          "You must specify description and price",
          [
            {text: 'OK', onPress: () => {
            }}
          ],)
      }
    }

  
    

    return (

        <SafeAreaView 
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: 'center', 
          }} 
          keyboardShouldPersistTaps='handled' 
        >
        <View>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            onChangeText={handleAmountInputChange}
            value={amountInput.toString()}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            onChangeText={handleDescriptionInputChange}
            value={descriptionInput.toString()}
          />

          <Text style={{marginLeft:20}}>Date</Text>
          
          <DateTimePicker
            testID="dateTimePicker"
            style={{
              marginHorizontal:20,
            }}
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />

          <Button title="Add" onPress={postSpending} />
          
          </View>
        </SafeAreaView>
      );

};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor:"grey"
  },
});
export default AddEntryPage;


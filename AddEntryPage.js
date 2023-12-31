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
      try {
        const result = await axios.post(
            "http://localhost:3080/spending/",
            {
              price: amountInput,
              description: descriptionInput,
              date:date
            }
        );
        console.log('POST request successful:', result.data);
      }
      catch(error) {
        console.error('Error making POST request:', error);
      }
    }

  
    

    return (

        <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps='handled' >
          <TextInput
            placeholder="Amount"
            onChangeText={handleAmountInputChange}
            value={amountInput.toString()}
          />
          <TextInput
            placeholder="Description"
            onChangeText={handleDescriptionInputChange}
            value={descriptionInput.toString()}
          />
          
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />

          <Button title="Add" onPress={postSpending} />
          
        
        </SafeAreaView>
      );

};
export default AddEntryPage;


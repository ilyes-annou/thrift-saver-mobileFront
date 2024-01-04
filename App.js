import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./Profile.js";
import Home from "./Home.js";
import LoginPage from "./LoginPage.js";
import AddEntryPage from "./AddEntryPage.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab= createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  //must be false
  const [loggedIn, setLoggedIn] = useState(false);

  

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto" />

      <NavigationContainer>

        {loggedIn ? (

        <Tab.Navigator
          options={{}}
          screenOptions={{
            headerShown: true,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              backgroundColor: "white",
              position: "absolute",
              paddingBottom:20,
              bottom: 40,
              marginHorizontal: 20,
              height: 60,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: {
                width: 10,
                height: 10,
              },
            },
          }}
        >

          <Tab.Screen
            name={"Home"}
            component={Home}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              
              tabBarLabel: "Home",
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="home"
                  color={focused ? "green" : "black"}
                  size={40}
                  position={"absolute"}
                  top={"35%"}
                />
              ),
            }}
          >
          </Tab.Screen>

          <Tab.Screen
            name={"Add Spending"}
            component={AddEntryPage}
            options={{
              tabBarShowLabel: false,
              headerShown: true,
              tabBarLabel: "AddEntryPage",
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="plus"
                  color={focused ? "green" : "black"}
                  size={40}
                  position={"absolute"}
                  top={"35%"}
                />
              ),
            }}
          ></Tab.Screen>

          <Tab.Screen
            name={"Profile"}
            options={{
              tabBarShowLabel: false,
              headerShown: true,
              tabBarLabel: "Profile",
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="human"
                  color={focused ? "green" : "black"}
                  size={40}
                  position={"absolute"}
                  top={"35%"}
                />
              ),
            }}
          >

            {() => (
              <Profile
                onLogout={async () => {
                  setLoggedIn(false);
                  console.log()
                  await AsyncStorage.clear();}}
              />
            )}

          </Tab.Screen>
       

        </Tab.Navigator>

        
        ):(
          <Stack.Navigator>
            <Stack.Screen
              name="LoginPage"
              component={() => <LoginPage onLogin={() => setLoggedIn(true)} />}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

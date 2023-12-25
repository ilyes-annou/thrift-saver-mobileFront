import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from "./Profile.js";
import Statistics from "./Statistics.js";
import Calendar from "./Calendar.js";
import Home from "./Home.js";
import AddEntryPage from "./AddEntryPage.js";
const { width, height } = Dimensions.get("window");
const Tab= createBottomTabNavigator();
const Stack= createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Tab.Navigator
          options={{}}
          screenOptions={{
            headerShown: true,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              backgroundColor: "white",
              position: "absolute",
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
                  color={focused ? "red" : "black"}
                  size={40}
                  position={"absolute"}
                  top={"35%"}
                />
              ),
            }}
          ></Tab.Screen>


          <Tab.Screen
            name={"Statistics"}
            component={Statistics}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarLabel: "Statistics",
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="heart"
                  color={focused ? "red" : "black"}
                  size={40}
                  position={"absolute"}
                  top={"35%"}
                />
              ),
            }}
          ></Tab.Screen>

          <Tab.Screen
            name={"AddEntryPage"}
            component={AddEntryPage}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarLabel: "AddEntryPage",
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="plus"
                  color={focused ? "red" : "black"}
                  size={40}
                  position={"absolute"}
                  top={"35%"}
                />
              ),
            }}
          ></Tab.Screen>


          <Tab.Screen
            name={"Calendar"}
            component={Calendar}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarLabel: "Calendar",
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="database"
                  color={focused ? "red" : "black"}
                  size={40}
                  position={"absolute"}
                  top={"35%"}
                />
              ),
            }}
          ></Tab.Screen>

          <Tab.Screen
            name={"Profile"}
            component={Profile}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarLabel: "Profile",
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="human"
                  color={focused ? "red" : "black"}
                  size={40}
                  position={"absolute"}
                  top={"35%"}
                />
              ),
            }}
          ></Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

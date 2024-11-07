import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{headerShown: false}} />
          <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#565D94' },
            headerStyle: { backgroundColor: '#EEF2FB' },
            headerLeft: () => null
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

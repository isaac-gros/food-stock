// Stack import
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Screens import
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();
export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

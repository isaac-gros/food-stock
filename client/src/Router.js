// Stack import
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Screens import
import HomeScreen from "./screens/HomeScreen";
import Home2Screen from "./screens/Home2Screen";

const Stack = createStackNavigator();
export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Home2" options={{ headerShown: false }} component={Home2Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

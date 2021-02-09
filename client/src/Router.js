// Stack import
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens import
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();
export default function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

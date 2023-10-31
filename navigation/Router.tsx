import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import HomeTabNavigator from "./HomeTabNavigator";

const Stack = createNativeStackNavigator();

function Router(user) {
  console.log("========== user ==========", user.user);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
            {(props) => <HomeTabNavigator {...props} user={user?.user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;

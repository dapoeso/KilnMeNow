import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ResultsMap from "../screens/ResultsMap";

const Tab = createMaterialTopTabNavigator();

const ResultsTabNavigator = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="List"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Map"
        component={ResultsMap}
      />
    </Tab.Navigator>
  );
};

export default ResultsTabNavigator;

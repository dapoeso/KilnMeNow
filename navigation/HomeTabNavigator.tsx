import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ResultsTabNavigator from "./ResultsTabNavigator";
import Login from "../screens/Login";
import KilnDetails from "../screens/KilnDetails";
import BookingsScreen from "../screens/BookingsScreen";
import SavedItemsScreen from "../screens/SavedItemsScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();

function HomeTabNavigator({ user }) {
    console.log("HomeTabNavigator user", user);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Explore"
        component={ResultsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="compass" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Saved"
        component={SavedItemsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fire" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Messages"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      /> */}
      {user ? (
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        >
            {(props) => <Profile {...props} login={user} />}
        </Tab.Screen>
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default HomeTabNavigator;

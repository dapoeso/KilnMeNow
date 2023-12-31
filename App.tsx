import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, createContext, useContext } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Router from "./navigation/Router";
import { UserData } from "./utils/types";

const Stack = createNativeStackNavigator();
export const UserContext = createContext<User | null>(null);
export const UserDataContext = createContext<UserData>(null);

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);
  return (
    <UserDataContext.Provider value={null}>
      <UserContext.Provider value={user}>
        <Router user={user} />
      </UserContext.Provider>
    </UserDataContext.Provider>
  );
}

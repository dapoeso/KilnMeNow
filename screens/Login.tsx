import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { withExpoSnack, styled } from "nativewind";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Sign in Successful!");
    } catch (error: any) {
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        console.log('Login', userCredential.user);
        axios.post(`http://localhost:6969/users`, {
          email: email,
          id: userCredential.user.uid,
        });
      });
      alert("Successfully Registered");
    } catch (error: any) {
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      {/* <KeyboardAvoidingView behavior="height"> */}
      <Text>Login</Text>
      <StyledTextInput
        className="w-1/2 mt-2 px-4 py-2 border-2 rounded-md"
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      ></StyledTextInput>
      <StyledTextInput
        className="w-1/2 mt-2 px-4 py-2 border-2 rounded-md"
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      ></StyledTextInput>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <Button title="Sign Up" onPress={signUp} />
        </>
      )}
      {/* </KeyboardAvoidingView> */}
    </StyledView>
  );
};

export default withExpoSnack(Login); 
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Button } from 'react-native'
import { withExpoSnack, styled } from 'nativewind';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const StyledText = styled(Text);
const StyledView = styled(View)

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

  return (
    <SafeAreaView>
        <StyledView className="flex-1 items-center justify-center bg-white">
            <StyledText className="text-red-500">Open up App.js to start working on your app!</StyledText>
            <StatusBar style="auto" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log out" />
        </StyledView>
    </SafeAreaView>
  )
}

export default withExpoSnack(HomeScreen)
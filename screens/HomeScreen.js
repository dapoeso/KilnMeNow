import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView } from 'react-native'
import { styled } from 'nativewind';
import { withExpoSnack } from 'nativewind';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

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
        </StyledView>
    </SafeAreaView>
  )
}

export default withExpoSnack(HomeScreen)
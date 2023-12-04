import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const DefaultLoginPrompt = ({text}) => {
    const navigation = useNavigation();

    const handleLogin = () => {
      navigation.navigate('Login');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 16,
      height: '100%',
    },
    text: {
      fontSize: 16,
      marginBottom: 16,
    },
    button: {
      backgroundColor: 'blue',
      padding: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default DefaultLoginPrompt
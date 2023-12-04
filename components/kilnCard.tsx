import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function KilnCard({ id, title, imageSource, location, price }) {
    const navigation = useNavigation();

    const handlePress = () => {
      navigation.navigate('Details', {id});
    };
    
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image source={{uri: imageSource}} style={styles.image} />
        <Text style={styles.description}>{title}</Text>
        <Text style={styles.description}>Location: {location}</Text>
        <Text style={styles.description}>Price: {price}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
      margin: 20,
      // borderWidth: 1,
      // borderColor: '#ccc',
      // borderRadius: 8,
      // marginBottom: 16,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.1,
      // shadowRadius: 4,
      // elevation: 3,
      // width: '100%',
      // marginLeft: 10,
      // marginRight: 10,
    },
    image: {
      width: '100%',
      aspectRatio: 3 / 2,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    description: {
      padding: 4,
      fontSize: 16,
    },
  });

export default KilnCard
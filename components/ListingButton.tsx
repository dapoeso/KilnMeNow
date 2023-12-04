import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'

const ListingButton = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={styles.text}>List Your Kiln</Text>
            <Image style={styles.image} source={require("../assets/cartoonKiln.png")} />
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 100,
      padding: 5,
      margin: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },

    innerContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'space-between',
      },

    image: {
        width: 75,
        height: 75,
        margin: 10,
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5b5b5b',
        marginLeft: 20,
        alignSelf: 'center',
    }
  
  });

export default ListingButton
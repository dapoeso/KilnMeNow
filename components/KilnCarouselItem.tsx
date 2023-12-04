import React from 'react';
import { Text, Image, View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function KilnCarouselItem(props) {
    // console.log('carousel props', props.kiln);
    
    const { kiln_id: id, title, url: imageSource, description, listing_price: price } = props.kiln;

    const width = useWindowDimensions().width;
    const navigation = useNavigation();

    const handlePress = () => {
      navigation.navigate('Details', { id });
    };
    
  return (
    <Pressable onPress={handlePress} style={[styles.container, { width: width - 60}]}>
      <View style={styles.innerContainer}>
        {/* Image  */}
        <Image
          style={styles.image}
          source={{uri: imageSource}}
        />

        <View style={{flex: 1, marginHorizontal: 10}}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          <Text style={styles.prices}>
            <Text style={styles.price}>${price} </Text>
            / shelf
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 120,
      padding: 5,
  
  
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
      overflow: 'hidden'
    },
  
    image: {
      height: '100%',
      aspectRatio: 1,
      resizeMode: 'cover',
    },
  
    title: {
      marginVertical: 10,
      color: '#5b5b5b',
    },
    description: {
      fontSize: 15,
    },
    prices: {
      fontSize: 15,
      marginVertical: 10,
    },
    oldPrice: {
      color: '#5b5b5b',
      textDecorationLine: 'line-through',
    },
    price: {
      fontWeight: 'bold',
    },
    totalPrice: {
      color: '#5b5b5b',
      textDecorationLine: 'underline',
    }
  });
  

export default KilnCarouselItem;
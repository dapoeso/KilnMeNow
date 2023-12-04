import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

const CustomMarker = ({
  latitude,
  longitude,
  listingPrice,
  isSelected,
  onPress
}) => {
  return (
    <Marker
      coordinate={{ latitude, longitude }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: isSelected ? "black" : "white",
          padding: 5,
          borderRadius: 20,
          borderColor: "grey",
          borderWidth: 1,
        }}
      >
        <Text
          style={{ color: isSelected ? "white" : "black", fontWeight: "bold" }}
        >{`$${listingPrice}`}</Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;

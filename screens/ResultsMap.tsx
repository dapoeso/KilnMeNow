import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";


const ResultsMap = () => {

    const [kilns, setKilns] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      console.log("Fetching Data");
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:6969/kilns");
          console.log(response);
          setKilns(response.data);
        } catch (error) {
          console.log(error);
          setError(error);
        }
      };
      fetchData();
    }, []);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 33.45099,
          longitude: -112.07598,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {kilns?.map((kiln) => {
          const { latitude, longitude, listing_price, title } = kiln;
          return (
            <Marker
              coordinate={{ latitude, longitude }}
              title={title}
              description="This is kiln 1"
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 20,
                  borderColor: "grey",
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{ fontWeight: "bold" }}
                >{`$${listing_price}`}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default ResultsMap;

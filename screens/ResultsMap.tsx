import React, { useEffect, useState, useRef } from "react";
import { View, Text, useWindowDimensions, FlatList } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import CustomMarker from "../components/CustomMarker";
import KilnCarouselItem from "../components/KilnCarouselItem";

const ResultsMap = () => {
  const [kilns, setKilns] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const flatlist = useRef();
  const map = useRef<MapView>();

  const viewConfig = useRef({ itemVisiblePercentThreshold: 70 });
  const onViewChanged = useRef(({ viewableItems }) => {
    // console.log('viewableItems', viewableItems[0]?.item.kiln_id);
    if (viewableItems?.length > 0) {
        console.log(viewableItems);
      const selectedPlace = viewableItems[0]?.item;
      console.log('selected place', selectedPlace.kiln_id);
      setSelectedPlaceId(selectedPlace.kiln_id);
    }
  });

  const width = useWindowDimensions().width;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:6969/kilns");
        console.log('=====================',response.data)
        setKilns(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, []);

useEffect(() => {
    if (!selectedPlaceId || !flatlist) {
        return;
    }
    const index = kilns.findIndex((kiln: any) => kiln.kiln_id === selectedPlaceId);
    (flatlist.current as any).scrollToIndex({ index });

    const selectedPlace = kilns[index];
    const region = {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    };
    if (map.current) {
        map.current.animateToRegion(region);
    }
}, [selectedPlaceId]);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <MapView
        ref={map}
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
          const {
            latitude,
            longitude,
            listing_price: listingPrice,
            title,
            kiln_id: id,
          } = kiln;
          console.log('selected place ids', id, selectedPlaceId)
          return (
            <CustomMarker
              latitude={latitude}
              longitude={longitude}
              listingPrice={listingPrice}
              isSelected={id === selectedPlaceId}
              onPress={() => {
                // console.log('pressed', id);
                setSelectedPlaceId(id)
              }}
            />
          );
        })}
      </MapView>

      <View style={{ position: "absolute", bottom: 10 }}>
        <FlatList
          ref={flatlist}
          data={kilns}
          renderItem={({ item }) => <KilnCarouselItem kiln={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          decelerationRate={"fast"}
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={onViewChanged.current}
        />
      </View>
    </View>
  );
};

export default ResultsMap;

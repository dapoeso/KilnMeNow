import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, Button, ScrollView } from "react-native";
import { withExpoSnack, styled } from "nativewind";
import React, { useLayoutEffect, useEffect, useState  } from "react";
import { useNavigation } from "@react-navigation/native";
import KilnCard from "../components/kilnCard";
import mockData from "../mocks/kilns.json";
import axios from "axios";

const StyledText = styled(Text);
const StyledView = styled(View);

const HomeScreen = () => {
  const navigation = useNavigation();

  const [kilns, setKilns] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log('Fetching Data');
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
        <ScrollView>
      <StyledView className="flex flex-col items-center">
        {kilns?.map((kiln) => {
            const {id, title, state, city, url, listing_price} = kiln;
          return <KilnCard key={id} id={id} title={title} imageSource={url} location={`${city}, ${state}`} price={listing_price} />;
        })}
      </StyledView>
      </ScrollView>
      <StyledView className="flex-1 items-center justify-center bg-white">
        <StyledText className="text-red-500">
          Open up App.js to start working on your app!
        </StyledText>
        <StatusBar style="auto" />
      </StyledView>
    </SafeAreaView>
  );
};

export default withExpoSnack(HomeScreen);

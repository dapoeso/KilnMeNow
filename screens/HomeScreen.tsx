import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, Button, ScrollView } from "react-native";
import { withExpoSnack, styled } from "nativewind";
import React, { useLayoutEffect, useEffect, useState  } from "react";
import { useNavigation } from "@react-navigation/native";
import KilnCard from "../components/KilnCard";
import axios from "axios";

const StyledText = styled(Text);
const StyledView = styled(View);

const HomeScreen = () => {
  const navigation = useNavigation();

  const [kilns, setKilns] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("${API_URL}/kilns");
        setKilns(response.data);
      } catch (error) {
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
            const {kiln_id: id, title, state, city, url, listing_price} = kiln;
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

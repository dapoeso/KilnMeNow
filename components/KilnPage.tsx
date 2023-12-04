import React, { useContext, useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "../constants/styles";
import BookingModal from "./BookingModal";
import { UserContext } from "../App";

function KilnPage(props) {

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const user = useContext(UserContext);
  console.log("Kiln Page", user);

  if (props.loading) {
    return <Text>Loading...</Text>;
  } else {
    if (props.kiln == null) {
      return <Text>Not Found</Text>;
    }
    console.log(props.kiln);
    const {
      kiln_id: id,
      title,
      url: imageSource,
      city,
      state,
      address_1,
      listing_price: price,
      description,
      size,
    } = props.kiln[0];
    const navigation = useNavigation();

    const location = `${address_1}, ${city} ${state}`;

    const registrationDetails = {
      price,
      kilnId: id,
      userId: user?.uid,
    }

    const handlePress = () => {
      // navigation.navigate('Details', { title, imageSource, location, price });
    };
    return (
      <View style={styles.container}>
        <Animated.ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Animated.Image source={{ uri: imageSource }} style={styles.image} />

          <View style={styles.infoContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.location}>{location}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={styles.rating}>5.0</Text>
            </View>
            {/* <View style={styles.divider} />
                <View style={styles.hostView}>
                    <Image source={{uri: imageSource}} style={styles.hostImage} />
                    <View style={styles.hostInfo}>
                        <Text style={styles.hostName}>Host Name</Text>
                        <Text style={styles.hostRating}>5.0</Text>
                    </View>
                </View> */}
            <View style={styles.divider} />
            <Text style={styles.description}>{description}</Text>

            <Animated.View
              style={defaultStyles.footer}
              entering={SlideInDown.delay(200)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity style={styles.footerText}>
                  <Text style={styles.footerPrice}>${price}</Text>
                  <Text>{size}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    defaultStyles.btn,
                    { paddingRight: 20, paddingLeft: 20 },
                  ]}
                  onPress={() => setConfirmationVisible(true)}
                >
                  <Text style={defaultStyles.btnText}>Request</Text>
                </TouchableOpacity>
                <BookingModal
                  modalVisible={confirmationVisible}
                  onClose={() => setConfirmationVisible(false)}
                  details={registrationDetails}
                  />
              </View>
            </Animated.View>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 2,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    // fontFamily: 'mon-sb',
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    // fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  description: {
    marginTop: 16,
    fontSize: 16,
    //   fontFamily: 'mon-sb',
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    // fontFamily: 'mon-sb',
  },
  // When Host info is added
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

export default KilnPage;

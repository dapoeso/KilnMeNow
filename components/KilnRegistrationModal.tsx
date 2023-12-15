import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Address, Kiln } from "../utils/types";
import { validateAddress } from "../utils/helpers";
import ImageUpload from "./ImageUpload";
import { API_URL } from "../constants/values";

const KilnRegistrationModal = ({ modalVisible, setModalVisible, userId }) => {
  const [kilnDetails, setKilnDetails] = useState<Kiln>({
    name: "",
    description: "",
    cone: "",
    size: "",
    turnaround: "",
    price: "",
  });
  const [address, setAddress] = useState<Address>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isBilling: false,
  });
  const [error, setError] = useState(null);
  const [image, setImage] = useState<string>(null);

  const handleChange = (value, name) => {
    setKilnDetails({
      ...kilnDetails,
      [name]: value,
    });
  };

  const handleAddressChange = (value, name) => {
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleRegistrationUpdate = async () => {
    await validateAddress(address)
      .then((response) => {
        console.log(response);
        const location = response?.location;
        const addressData = {
          ...address,
          userId: userId,
        };
        axios
          .post(`${API_URL}/address`, addressData)
          .then((response) => {
            console.log(response?.data);
            const kilnData = {
                ...kilnDetails,
                ...location,
                userId: userId,
                isAvailable: true,
                addressId: response?.data?.id,
                url: image,
            }
            axios
              .post(`${API_URL}/kilns`, kilnData)
              .then((response) => {
                console.log(response.data);
                setModalVisible(false);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <ScrollView>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Kiln Information</Text>
          <TextInput
            autoComplete="address-line1"
            style={styles.input}
            placeholder="Name"
            value={kilnDetails.name}
            onChangeText={(e) => handleChange(e, "name")}
          />
          <TextInput
            style={styles.input}
            placeholder="Cone"
            value={kilnDetails.cone}
            onChangeText={(e) => handleChange(e, "cone")}
          />
          <TextInput
            style={styles.input}
            placeholder="Size"
            value={kilnDetails.size}
            onChangeText={(e) => handleChange(e, "size")}
          />
          <TextInput
            style={styles.input}
            placeholder="Turnaround"
            value={kilnDetails.turnaround}
            onChangeText={(e) => handleChange(e, "turnaround")}
          />
          <TextInput
            style={styles.input}
            placeholder="Listing Price"
            value={kilnDetails.price}
            onChangeText={(e) => handleChange(e, "price")}
          />
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholder="Description"
            value={kilnDetails.description}
            onChangeText={(e) => handleChange(e, "description")}
          />
          <ImageUpload userId={userId} setImage={setImage}/>
          {image !== null && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <Text style={styles.modalTitle}>Kiln Address</Text>
          <TextInput
            autoComplete="address-line1"
            style={styles.input}
            placeholder="Address 1"
            value={address.address1}
            onChangeText={(e) => handleAddressChange(e, "address1")}
          />
          <TextInput
            autoComplete="address-line2"
            style={styles.input}
            placeholder="Address 2"
            value={address.address2}
            onChangeText={(e) => handleAddressChange(e, "address2")}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={address.city}
            onChangeText={(e) => handleAddressChange(e, "city")}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={address.state}
            onChangeText={(e) => handleAddressChange(e, "state")}
          />
          <TextInput
            autoComplete="postal-code"
            style={styles.input}
            placeholder="Zip Code"
            value={address.zip}
            onChangeText={(e) => handleAddressChange(e, "zip")}
          />
          <TextInput
            autoComplete="country"
            style={styles.input}
            placeholder="Country"
            value={address.country}
            onChangeText={(e) => handleAddressChange(e, "country")}
          />
          <Button onPress={handleRegistrationUpdate} title="Save" />
          <Button onPress={() => setModalVisible(false)} title="Cancel" />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default KilnRegistrationModal;

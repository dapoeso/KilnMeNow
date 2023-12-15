import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const BookingModal = ({ modalVisible, onClose, details }) => {
  const navigation = useNavigation();

  const sendConfirmation = async () => {
    console.log("Sending confirmation");
    const bookingDetails = {
      ...details,
      status: "requested",
    };
    await axios.post(`${API_URL}/reservation`, bookingDetails).then(response => {
      console.log(response);
      alert("Successfully Booked!");
      onClose();
    }).catch(error => {
      console.log(error);
      alert("Booking failed: " + error.message);
    });
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      {details.userId ? (
        <View style={styles.container}>
          <Text style={styles.title}>Confirmation</Text>
          <TouchableOpacity style={styles.button} onPress={sendConfirmation}>
            <Text style={styles.buttonText}>Confirm Reservation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Please login to reserve!</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default BookingModal;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import axios from "axios";
import ListingButton from "../components/ListingButton";
import KilnRegistrationModal from "../components/KilnRegistrationModal";
import Colors from "../constants/colors";

const profilePic =
  "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

function Profile({ login }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [registrationVisible, setRegistrationVisible] = useState(false);

  useEffect(() => {
    console.log("Fetching Data");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6969/users/${login?.email}`
        );
        console.log(response.data);
        setLoading(false);
        const {
          first_name: firstName,
          last_name: lastName,
          phone,
          user_id,
        } = response.data[0];
        setUser({ firstName, lastName, phone, id: user_id });
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (value, name) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:6969/users/${login?.email}`,
        user
      );
      console.log(response);
      setUser(response.data);
      setEditProfileVisible(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{ uri: profilePic }} style={styles.avatar} />
        <Text style={styles.name}>{user?.firstName}</Text>
      </View>
      <ListingButton onPress={() => setRegistrationVisible(true)} />
      <Button
        onPress={() => setEditProfileVisible(true)}
        title="Edit Profile"
        color={Colors.dark}
      />
      <Button onPress={() => {}} title="View Kilns" color={Colors.dark} />
      <Button onPress={() => {}} title="View Addresses" color={Colors.dark} />
      <Modal visible={editProfileVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={user.firstName}
            onChangeText={(e) => handleChange(e, "firstName")}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={user.lastName}
            onChangeText={(e) => handleChange(e, "lastName")}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={user.phone}
            onChangeText={(e) => handleChange(e, "phone")}
            textContentType="telephoneNumber"
            inputMode="tel"
          />
          <Button onPress={handleProfileUpdate} title="Save" color={Colors.dark}/>
          <Button onPress={() => setEditProfileVisible(false)} title="Cancel" color={Colors.dark} />
        </View>
      </Modal>
      <KilnRegistrationModal
        modalVisible={registrationVisible}
        setModalVisible={setRegistrationVisible}
        userId={user?.id}
      />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log out" color={Colors.dark} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: "100%",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
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

export default Profile;

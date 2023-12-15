import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import axios from "axios";
import ListingButton from "../components/ListingButton";
import KilnRegistrationModal from "../components/KilnRegistrationModal";
import Colors from "../constants/colors";
import ViewKilnsModal from "../components/ViewKilnReservationsModal";

const profilePic =
  "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

const Profile = ({ login }) => {
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
  const [viewKilnsVisible, setViewKilnsVisible] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.9;

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${login?.email}`,
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

  useEffect(() => {
    console.log("Fetching Data");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/${login?.email}`
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


  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{ uri: profilePic }} style={styles.avatar} />
        <Text style={styles.name}>{user?.firstName}</Text>
      </View>
      <ListingButton onPress={() => setRegistrationVisible(true)} />
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity onPress={() => setEditProfileVisible(true)} style={[styles.button, { width: buttonWidth }]}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewKilnsVisible(true)} style={[styles.button, { width: buttonWidth }]}>
          <Text style={styles.buttonText}>View Kilns</Text>
        </TouchableOpacity>
      </View>
      {/* <Button onPress={() => {}} title="View Addresses" color={Colors.dark} /> */}
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
      <ViewKilnsModal
        modalVisible={viewKilnsVisible}
        setModalVisible={setViewKilnsVisible}
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
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;

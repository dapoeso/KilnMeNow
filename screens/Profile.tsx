import React from 'react';
import { View, Text, Button } from 'react-native';
import { FIREBASE_AUTH } from "../FirebaseConfig";

function Profile() {
  return (
    <View>
        <Text>Profile</Text>
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log out" />
    </View>
  )
}

export default Profile
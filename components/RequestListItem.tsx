import axios from 'axios';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Reservation } from '../utils/types';

interface RequestListItemProps {
  id: number;
  title: string;
  status: string;
  thumbnail: string;
  setBookings?: React.Dispatch<React.SetStateAction<Reservation[]>>;
}

const RequestListItem: React.FC<RequestListItemProps> = ({ id, title, status, thumbnail, setBookings }) => {
    console.log('thumbnail', thumbnail);
    const onCancel = async () => {
        await axios.patch(`${API_URL}/cancel-reservation/${id}`).then(response => {
            console.log(response);
            setBookings(prevState => {
                console.log('---------', prevState, id);
                return prevState.filter(booking => booking.reservationId !== id);
            });
        });
    };

    const onAccept = async () => {};

  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  status: {
    fontSize: 14,
    color: 'gray',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 4,
  },
  denyButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RequestListItem;
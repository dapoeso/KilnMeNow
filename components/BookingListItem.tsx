import axios from 'axios';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Reservation } from '../utils/types';

interface BookingListItemProps {
  id: number;
  title: string;
  status: string;
  thumbnail: string;
  setBookings?: React.Dispatch<React.SetStateAction<Reservation[]>>;
}

const BookingListItem: React.FC<BookingListItemProps> = ({ id, title, status, thumbnail, setBookings }) => {
    console.log('thumbnail', thumbnail);
    const onCancel = async () => {
        await axios.patch(`http://localhost:6969/cancel-reservation/${id}`).then(response => {
            console.log(response);
            setBookings(prevState => {
                console.log('---------', prevState, id);
                return prevState.filter(booking => booking.reservationId !== id);
            });
        });
    };
  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.status}>Status: {status}</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
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
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: 'gray',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BookingListItem;
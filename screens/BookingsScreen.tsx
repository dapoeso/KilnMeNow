import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import DefaultLoginPrompt from "../components/DefaultLoginPrompt";
import axios from "axios";
import { Reservation } from "../utils/types";
import BookingListItem from "../components/BookingListItem";

const text = "Please login to view your bookings.";

const BookingsScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  console.log("user", user);
  const [bookings, setBookings] = useState<Reservation[]>([]);

  useEffect(() => {
    const getBookingData = navigation.addListener("focus", () => {
      axios
        .get(`http://localhost:6969/reservation/${user?.uid}`)
        .then((response) => {
          console.log(response.data);
          setBookings(
            response.data.map((booking) => {
              return {
                kilnId: booking.kiln_id,
                kilnName: booking.title,
                userId: booking.user_id,
                image: booking.url,
                status: booking.status,
                reservationId: booking.id,
              } as Reservation;
            })
          );
        });
    });
    return getBookingData;
  }, [user, navigation]);

  return (
    <View>
      {user ? (
        bookings.map((booking) => {
          return (
            <BookingListItem
              id={booking.reservationId}
              key={booking.kilnId}
              title={booking.kilnName}
              thumbnail={booking.image}
              status={booking.status}
              setBookings={setBookings}
            />
          );
        })
      ) : (
        <DefaultLoginPrompt text={text} />
      )}
    </View>
  );
};

export default BookingsScreen;

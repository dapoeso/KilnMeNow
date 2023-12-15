import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Kiln, Request } from "../utils/types";
import RequestListItem from "./RequestListItem";
import axios from "axios";
import { UserContext } from "../App";
import { normalizeData } from "../utils/helpers";
import { AntDesign } from "@expo/vector-icons";

interface ViewKilnsModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewKilnsModal: React.FC<ViewKilnsModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const user = useContext(UserContext);
  const [kilns, setKilns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserKilns = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/kilnsByUser/${user?.uid}`
        );
        const normalizedData = normalizeData(response.data);
        console.log(normalizedData[1]?.requests);
        setLoading(false);
        setKilns(normalizedData);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchUserKilns();
  }, []);

  const toggleExpand = (kilnId: number) => {
    setKilns((prevKilns) =>
      prevKilns.map((kiln) =>
        kiln.id === kilnId ? { ...kiln, expanded: !kiln.expanded } : kiln
      )
    );
  };

  const renderRequestItem = (request: Request) => {
    return (
      <View style={styles.requestItem}>
        <Text>{request.username}</Text>
        {request.status === "requested" ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => acceptRequest(request.reservationId)}
            >
              <Text>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => declineRequest(request.reservationId)}
            >
              <Text>Decline</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text>Status: {request.status}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderKilnItem = (kiln: Kiln) => {
    const hasRequests = kiln?.requests !== null;
    const requests = kiln?.requests?.filter(
      (request) => request.status === "requested"
    );
    const reservations = kiln?.requests?.filter(
      (request) => request.status !== "requested"
    );
    return (
      <View style={styles.kilnItem}>
        <TouchableOpacity onPress={() => toggleExpand(kiln.id)}>
          <View style={styles.kilnCard}>
            <Image source={{ uri: kiln.image }} style={styles.thumbnail} />
            <View style={styles.content}>
              <Text style={styles.title}>{kiln.name}</Text>
            </View>
            {kiln.expanded ? (
              <AntDesign name="upcircle" size={16} color="black" />
            ) : (
              <AntDesign name="downcircle" size={16} color="black" />
            )}
          </View>
        </TouchableOpacity>
        {kiln.expanded && (
          <>
            {hasRequests ? (
              <>
                {requests.length > 0 && (
                  <>
                    <Text style={styles.header}>Requests</Text>
                    <FlatList
                      data={requests}
                      renderItem={({ item }) => renderRequestItem(item)}
                      keyExtractor={(item) => item.userId?.toString() || ""}
                    />
                  </>
                )}
                {reservations.length > 0 && (
                  <>
                    <Text style={styles.header}>Reservations</Text>
                    <FlatList
                      data={reservations}
                      renderItem={({ item }) => renderRequestItem(item)}
                      keyExtractor={(item) => item.userId?.toString() || ""}
                    />
                  </>
                )}
              </>
            ) : (
              <Text>No requests or reservations</Text>
            )}
          </>
        )}
      </View>
    );
  };

  const updateReservation = (status: string, reservationId: number) => {
    axios
      .patch(`${API_URL}/update-reservation/${reservationId}`, {
        status,
      })
      .then(() => {
        setKilns((prevKilns) => {
          const updatedKilns = prevKilns.map((kiln) => {
            const updatedRequests = kiln.requests.map((request) => {
              if (request.reservationId === reservationId) {
                return {
                  ...request,
                  status,
                };
              }
              return request;
            });
            return {
              ...kiln,
              requests: updatedRequests,
            };
          });
          console.log("updated kilns", updatedKilns);
          return updatedKilns;
        });
      })
      .catch((error) => console.log(error));
  };

  const declineRequest = (requestId: number) => {
    // Logic to cancel the request
    updateReservation("declined", requestId);
  };

  const acceptRequest = (requestId: number) => {
    // Logic to accept the request
    updateReservation("accepted", requestId);
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text style={styles.pageTitle}>My Kilns</Text>
              <FlatList
                data={kilns}
                renderItem={({ item }) => renderKilnItem(item)}
                keyExtractor={(item) => item?.id?.toString()}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    padding: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
  },
  kilnItem: {
    marginBottom: 16,
  },
  kilnName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  requestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: "lightgray",
    borderRadius: 4,
  },
  closeButton: {
    backgroundColor: "lightgray",
    padding: 12,
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 16,
  },
  closeButtonText: {
    fontWeight: "bold",
    textAlign: "center",
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
    fontWeight: "bold",
    marginBottom: 8,
  },
  kilnCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
    alignSelf: "center",
  },
});

export default ViewKilnsModal;

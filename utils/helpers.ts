import axios from "axios";
import { Address, Kiln } from "./types";

export const validateAddress = async (address: Address) => {
    const { address1, address2, city, state, zip } = address;
    if (!address1 || !city || !state || !zip) return null;

    const locality = `${city}, ${state}, ${zip}`
    const addressLines = [address1, address2, locality];

    const addressObject = {
        address: {
            regionCode: "US",
            addressLines,
        }
    };

    try {
        const response = await axios.post("https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDM2pDZtle3A5TLLwt9KoMnkZFvyZQDgc8", addressObject);
        console.log(response.data?.result?.address, response.data?.result?.geocode?.location);
        const result = {
            formattedAddress: response.data?.result?.address?.formattedAddress,
            location: response.data?.result?.geocode?.location, 
        };
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
}

interface KilnData {
    kiln_id: number;
    title: string;
    url: string;
    user_id: number;
    status: string;
    username: string;
    reservation_id: number;
  }
  
  
export const normalizeData = (data: KilnData[]): Kiln[] => {
    const normalized: Kiln[] = [];
  
    data.forEach((item) => {
      const { kiln_id: kilnId, title, url, user_id, status, username, reservation_id } = item;
  
      // Check if kilnId already exists in normalized data
      const existingKiln = normalized.find((kiln) => kiln.id === kilnId);
  
      if (existingKiln) {
        // Check if request already exists for the kiln
        const existingRequest = existingKiln.requests.find(
          (request) => request.userId === user_id && request.status === status
        );
  
        if (!existingRequest) {
          // Add new request to existing kiln
          existingKiln.requests.push({ userId: user_id, status, username, reservationId: reservation_id });
        }
      } else {
        // Create new kiln entry
        const newKiln: Kiln = {
          id: kilnId,
          name: title,
          image: url,
          expanded: false,
          requests: reservation_id !== null ? [{ userId: user_id, status, username, reservationId: reservation_id }] : null,
        };
  
        normalized.push(newKiln);
      }
    });
  
    return normalized;
  };
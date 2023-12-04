import axios from "axios";
import { Address } from "./types";

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
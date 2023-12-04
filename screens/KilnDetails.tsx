import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import KilnPage from '../components/KilnPage';
import axios from 'axios';

const KilnDetails = ({route}) => {
    console.log(route.params);

    const [kiln, setKiln] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching Data");
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:6969/kilns/${route?.params?.id}`);
            // const response = await axios.get(`http://localhost:6969/kilns/55`);
            console.log(response);
            setLoading(false);
            setKiln(response.data);
          } catch (error) {
            console.log(error);
            setError(error);
          }
        };
        fetchData();
      }, []);

  return (
    <View>
      <KilnPage kiln={kiln} loading={loading} />
    </View>
  )
}

export default KilnDetails
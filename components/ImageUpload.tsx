import { View, Text, Button } from 'react-native';
import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const ImageUpload = ({userId, setImage}) => {

    const selectImage = async () => {
        const result = await ImagePicker?.launchImageLibraryAsync({
            mediaTypes: ImagePicker?.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            saveImage(result.assets[0].uri);
            // await ensureDirExists();
            // await FileSystem.moveAsync({
            //     from: result.assets[0].uri,
            //     to: imgDir + result.uri.split('/').pop(),
            // });
        }
    }

    const saveImage = async (uri: string) => {
        await ensureDirExists();
        const filename = new Date().getTime() + `_${userId}.jpg`;
        const dest = imgDir + filename;
        await FileSystem.copyAsync({ from: uri, to: dest }).then(() => {
            setImage(dest);
        });
    }
  return (
    <View>
      <Button title="Select Image" onPress={selectImage} />
    </View>
  )
}

export default ImageUpload
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {useRouter} from 'expo-router';
import RegularScrollView from '@/components/RegularScrollView';
import axios from 'axios';

type Gender = 'male' | 'female' | null;


export default function HomeScreen() {

    const [showOptionsFront, setShowOptionsFront] = useState(false);
    const [showOptionsSide, setShowOptionsSide] = useState(false);

    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [sideImage, setSideImage] = useState<string | null>(null);
    const navigation = useNavigation();
    const router= useRouter();
    const [selectedGender, setSelectedGender] = useState<Gender>(null);
    const [showBodyOptions, setShowBodyOptions] = useState(false);




    
    const handleCameraIconPressFront = () => {
      setShowOptionsFront(!showOptionsFront);
    };
    const handleCameraIconPressSide = () => {
      setShowOptionsSide(!showOptionsSide);
    };

    const handlebuttonPress = () => {
      setShowBodyOptions(!showBodyOptions);
    };
  
    const handlePress = async(gender: Gender) => {
      setSelectedGender(gender);
      if (gender === 'male') {
        console.log('Welcome');
      } else if (gender === 'female') {
        console.log('Bye');
      }
 
    // try {
    //   const response = await axios.post('http://your-backend-url/endpoint', { gender });
    //   console.log(response.data.message);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const handleCombinedPress = (gender: Gender) => {
    handlePress(gender);
    handlebuttonPress();
  };


    const pickFFFromGallery = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        Alert.alert("You need to give permission to access the gallery");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setFrontImage(result.assets[0].uri);
        setShowOptionsFront(false);

      }
    };
  
    const pickFFFromCamera = async () => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        Alert.alert("You need to give permission to access the camera");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setFrontImage(result.assets[0].uri);
        setShowOptionsFront(false);

      }
    };
    const pickSFFromGallery = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        Alert.alert("You need to give permission to access the gallery");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setSideImage(result.assets[0].uri);
        setShowOptionsSide(false);
      }
    };
  
    const pickSFFromCamera = async () => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        Alert.alert("You need to give permission to access the camera");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setSideImage(result.assets[0].uri);
        setShowOptionsSide(false);
      }
    };

    // const handleUploadImages = async () => {
    //   if (!frontImage || !sideImage) {
    //     Alert.alert('Please select both images.');
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append('frontImage', {
    //     uri: frontImage,
    //     type: 'image/jpeg',
    //     name: 'front.jpg',
    //   });
    //   formData.append('sideImage', {
    //     uri: sideImage,
    //     type: 'image/jpeg',
    //     name: 'side.jpg',
    //   });
    //   formData.append('gender', selectedGender);

    //   try {
    //     const response = await axios.post('http://your-backend-url/upload', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     console.log('Upload success:', response.data);
    //     // Navigate to the hairstyle suggestion page with the results
    //     navigation.navigate('HairstyleSuggestion', { results: response.data });
    //   } catch (error) {
    //     console.error('Upload error:', error);
    //   }
    // };


    return (

    <RegularScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.genderContainer}>
    
      <TouchableOpacity
        style={[styles.button, selectedGender === 'male' && styles.selected]}
        onPress={() => handleCombinedPress('male')}
      >
        <Text style={styles.buttonText}>Male</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedGender === 'female' && styles.selected]}
        onPress={() => handleCombinedPress('female')}
      >
        <Text style={styles.buttonText}>Female</Text>
      </TouchableOpacity>
      </View>

      {showBodyOptions && (
      <View style={{alignItems:'center'}}>
          <View style={{flexDirection: 'row', gap:35, paddingTop: 80,}}>
            <TouchableOpacity onPress={handleCameraIconPressFront} >
              <View style={{backgroundColor:'#2C3E50'}}>
              <Image 
                source={require('@/assets/images/frontface.png')} 
                style={{ 
                  height:120,
                  width:120,
                  margin:8,
                  alignItems:'center'

                }} />
              </View>
              <View style={{alignItems:'center'}}>
                <Text  style={{ 
                  alignItems:'center',
                  }}>Front Face </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={handleCameraIconPressSide}>
            <View style={{backgroundColor:'#2C3E50'}}>
              <Image 
                source={require('@/assets/images/sideface.png')} 
                style={{ 
                  height:120,
                  width:120,
                  margin:8,
                  alignItems:'center'

                }} />
              </View>
              <View style={{alignItems:'center'}}>
                <Text  style={{ 
                  alignItems:'center',
                  }}>Side Face </Text>
              </View>
            </TouchableOpacity>
          </View>

      <View style={styles.facePictureContainer}>
        <Image
          source={frontImage ? { uri: frontImage } : require('@/assets/images/facepic.png')}
          style={{width:100,height:100,}}
          accessibilityLabel="Profile Picture"
        />
        <Image
          source={sideImage ? { uri: sideImage } : require('@/assets/images/facepic.png')}
          style={{width:100,height:100,}}
          accessibilityLabel="Profile Picture"
        />
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('../select_preferences')}
      >
      <FontAwesome name="arrow-right" size={20} color="#2C3E50" />
      </TouchableOpacity>
        </View>
        )}
        
        {showOptionsFront && (
          <View style={styles.optionsContainerFront}>
            <TouchableOpacity style={styles.option} onPress={pickFFFromCamera}>
              <View style={styles.optionContent}>
                <FontAwesome name="camera" size={20} color="#000" />
                <Text style={styles.optionText}> Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={pickFFFromGallery}>
              <View style={styles.optionContent}>
                <FontAwesome name="upload" size={20} color="#000" />
                <Text style={styles.optionText}>Upload</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => setShowOptionsFront(false)}>
              <View style={styles.optionContent}>
                <FontAwesome name="times" size={20} color="#000" />
                <Text style={styles.optionText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {showOptionsSide && (
          <View style={styles.optionsContainerSide}>
            <TouchableOpacity style={styles.option} onPress={pickSFFromCamera}>
              <View style={styles.optionContent}>
                <FontAwesome name="camera" size={20} color="#000" />
                <Text style={styles.optionText}> Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={pickSFFromGallery}>
              <View style={styles.optionContent}>
                <FontAwesome name="upload" size={20} color="#000" />
                <Text style={styles.optionText}>Upload</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => setShowOptionsSide(false)}>
              <View style={styles.optionContent}>
                <FontAwesome name="times" size={20} color="#000" />
                <Text style={styles.optionText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>

    </RegularScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',


  },
  genderContainer: {
    alignItems: 'center',
    paddingTop: 20,
      paddingHorizontal: 30,
      flexDirection: 'row', 
      gap: 15
  },
  facePictureContainer: {
    alignItems: 'center',
    paddingTop: 80,
      paddingHorizontal: 30,
      flexDirection: 'row', 
      gap: 20
  },
  profilePic: {
    flexDirection: 'row', 
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop:200,
    gap:22
  },
  cameraIcon: {
    position: 'absolute',
    top: '37%',
    left: '65%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 10,
    transform: [{ translateX: -6 }, { translateY: -5 }],
  },
  action: {
    flexDirection: 'row',
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -1,
    paddingLeft: 10,
    color: '#05375a',
  },
  submitButton: {
    marginTop: 70,
    marginBottom: 4,
    
  },
  optionsContainerFront: {
    position: 'absolute',
    top: '50%',
    left: '0%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
  },
    optionsContainerSide: {
      position: 'absolute',
      top: '50%',
      right: '0%',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      zIndex: 1,
  },
  option: {
    paddingVertical: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor:"#2C3E50",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    marginTop: 18, 
    marginBottom: 4
  },
  selected: {
    backgroundColor: '#16A085'
    
  },
  buttonText: {
    fontSize: 18,
  },  
  nextButton: {
    backgroundColor: '#16A085',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 100, 
    marginTop: 60,
    marginLeft:200
  },
});

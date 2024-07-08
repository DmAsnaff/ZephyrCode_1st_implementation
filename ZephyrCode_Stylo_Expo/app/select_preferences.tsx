import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter} from 'expo-router';


interface DropdownItem {
  label: string;
  value: string;
}

const ageRangeData: DropdownItem[] = [
  { label: 'Teens', value: 'teens' },
  { label: 'Youngsters', value: 'youngsters' },
  { label: 'Aged', value: 'aged' },
];

const dressCodeData: DropdownItem[] = [
  { label: 'Party Wear', value: 'party_wear' },
  { label: 'Casual', value: 'casual' },
  { label: 'Formal', value: 'formal' },
];

const hairLengthData: DropdownItem[] = [
  { label: 'Short', value: 'short' },
  { label: 'Medium', value: 'medium' },
  { label: 'Long', value: 'long' },
];

const Preferences: React.FC = () => {
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [dressCode, setDressCode] = useState<string | null>(null);
  const [hairLength, setHairLength] = useState<string | null>(null);
  const [openAgeRange, setOpenAgeRange] = useState(false);
  const [openDressCode, setOpenDressCode] = useState(false);
  const [openHairLength, setOpenHairLength] = useState(false);
  const [itemsAgeRange, setItemsAgeRange] = useState(ageRangeData);
  const [itemsDressCode, setItemsDressCode] = useState(dressCodeData);
  const [itemsHairLength, setItemsHairLength] = useState(hairLengthData);

  const router=useRouter();

 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={[styles.dropdownContainer, openAgeRange && { zIndex: 3000, elevation: 3 }]}>
        <Text style={styles.label}>Age Range</Text>
        <DropDownPicker
          open={openAgeRange}
          value={ageRange}
          items={itemsAgeRange}
          setOpen={setOpenAgeRange}
          setValue={setAgeRange}
          setItems={setItemsAgeRange}
          containerStyle={{ height: 40 }}
          style={styles.dropdown}
          dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
        />
      </View>
      <View style={[styles.dropdownContainer, openDressCode && { zIndex: 2000, elevation: 2 }]}>
        <Text style={styles.label}>Dress Code</Text>
        <DropDownPicker
          open={openDressCode}
          value={dressCode}
          items={itemsDressCode}
          setOpen={setOpenDressCode}
          setValue={setDressCode}
          setItems={setItemsDressCode}
          containerStyle={{ height: 40 }}
          style={styles.dropdown}
          dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
        />
      </View>
      <View style={[styles.dropdownContainer, openHairLength && { zIndex: 1000, elevation: 1 }]}>
        <Text style={styles.label}>Hair Length</Text>
        <DropDownPicker
          open={openHairLength}
          value={hairLength}
          items={itemsHairLength}
          setOpen={setOpenHairLength}
          setValue={setHairLength}
          setItems={setItemsHairLength}
          containerStyle={{ height: 40 }}
          style={styles.dropdown}
          dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>{router.push('RecommendationsScreen')}}>
        <Text style={styles.buttonText}>Recommend</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop:40
  },
  dropdownContainer: {
    marginBottom: 35,
    position: 'relative', // Ensure stacking context
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#16A085',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#16A085',
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});


// mockData.


export const sampleImageLinks = [
  'https://firebasestorage.googleapis.com/v0/b/zephyrcode.appspot.com/o/1.jpg?alt=media&token=7c1b1803-26b4-4035-9b2a-e53605987584',
  'https://firebasestorage.googleapis.com/v0/b/zephyrcode.appspot.com/o/2.jpg?alt=media&token=b462c590-1eed-4658-9f4a-20e8aecaaf68',
  'https://firebasestorage.googleapis.com/v0/b/zephyrcode.appspot.com/o/3.jpg?alt=media&token=00c90c08-764c-4754-a6fd-d42f298ad976',
  'https://firebasestorage.googleapis.com/v0/b/zephyrcode.appspot.com/o/4.jpg?alt=media&token=e4362494-433d-4424-9985-08750826d914',
  'https://firebasestorage.googleapis.com/v0/b/zephyrcode.appspot.com/o/5.jpg?alt=media&token=b402d24b-8e9a-4fc0-bd55-1d5cd3a19a5d',
];

export const mockRecommendations = Array.from({ length: 5 }).map((_, index) => ({
  id: index + 1,
  imageLink: sampleImageLinks[index % sampleImageLinks.length],
  how_to_achieve: `Step ${index + 1}: Apply styling cream, Step ${index + 2}: Blow-dry with a round brush`,
  Products_to_achieve: `Product ${index + 1}, Product ${index + 2}`,
  faceShape: 'Round', // Replace 'Round' with the actual value of faceShape
}));

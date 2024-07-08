import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface DetailHistoryProps {
  dressCode: string;
  hairLength: string;
  ageRange: string;
  frontImageUri: string;  
  sideImageUri: string; 
  selectedHairstyleUri: string;
  sharedImageUri: string; 
  thumbsUpCount: number;  
  thumbsDownCount: number; 
}

const DetailHistory: React.FC<DetailHistoryProps> = ({
  dressCode,
  hairLength,
  ageRange,
  frontImageUri,
  sideImageUri,
  selectedHairstyleUri,
  sharedImageUri,
  thumbsUpCount,
  thumbsDownCount,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: '#2C3E50' }]}>Front/Side Image:</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.imagePlaceholder} source={{ uri: 'frontImageUri' }} />
        <Image style={styles.imagePlaceholder} source={{ uri: 'sideImageUri' }} />
      </View>
      <Text style={[styles.label, { color: '#2C3E50' }]}>Dress Code: <Text style={styles.value}>{dressCode}</Text></Text>
      <Text style={[styles.label, { color: '#2C3E50' }]}>Hair Length: <Text style={styles.value}>{hairLength}</Text></Text>
      <Text style={[styles.label, { color: '#2C3E50' }]}>Age Range: <Text style={styles.value}>{ageRange}</Text></Text>
      <Text style={[styles.text, { color: '#2C3E50' }]}>Selected Hairstyle:</Text>
      <View style={styles.selectedHairstyleContainer}>
        <Image style={styles.roundImagePlaceholder} source={{ uri: selectedHairstyleUri }} />
      </View>
      <Text style={[styles.text, { color: '#2C3E50' }]}>Shared Image on Social Media:</Text>
      <View style={styles.sharedImageContainer}>
        <Image style={styles.roundImagePlaceholder} source={{ uri: sharedImageUri }} />
      </View>
      <View style={styles.thumbsContainer}>
        <View style={styles.thumbsButton}>
          <Icon name="thumbs-up" size={30} color="green" />
          <Text style={[styles.thumbsCount, { color: '#2C3E50' }]}>{thumbsUpCount}</Text>
        </View>
        <View style={styles.thumbsButton}>
          <Icon name="thumbs-down" size={30} color="red" />
          <Text style={[styles.thumbsCount, { color: '#2C3E50' }]}>{thumbsDownCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontWeight: 'bold',
  },
  selectedHairstyleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  sharedImageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  roundImagePlaceholder: {
    width: 90,
    height: 90,
    backgroundColor: '#ddd',
    borderRadius: 50,
  },
  thumbsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  thumbsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbsCount: {
    marginLeft: 5,
    fontSize: 18,
  },
});

export default DetailHistory;



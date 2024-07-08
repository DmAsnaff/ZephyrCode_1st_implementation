import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockRecommendations } from './select_preferences'; // Importing mock data
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native'; // Import Lottie

interface Recommendation {
  id: number;
  imageLink: string;
  how_to_achieve: string;
  Products_to_achieve: string;
  faceShape: string; // Ensure faceShape is included in the interface
}

const RecommendationsScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  // const { faceShape } = route.params as { faceShape: string };
  const faceShape = 'Round'; // Replace with the desired face shape

  const [loading, setLoading] = useState(true);
  const [recommendationData, setRecommendationData] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Mock fetching data
    setTimeout(() => {
      setRecommendationData(mockRecommendations);
      setLoading(false);
    }, 1000);
  }, []);

  const handleImagePress = (recommendation: Recommendation) => {
    router.push({
      pathname: 'Preferred_page',
      params: {
        imageLink: recommendation.imageLink,
        how_to_achieve: recommendation.how_to_achieve,
        Products_to_achieve: recommendation.Products_to_achieve,
      },
    }); // Navigate to the Preferred_page with params
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../assets/animations/Animation - 1720459874935.json')} // Replace with the path to your Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Face Shape: {faceShape}</Text>
      {recommendationData.length === 0 ? (
        <Text style={styles.message}>Sorry, don't have suggestions.</Text>
      ) : (
        <FlatList
          data={recommendationData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item)} style={styles.recommendationItem}>
              <Image source={{ uri: item.imageLink }} style={styles.image} />
              <Text style={styles.description}>How to achieve: {item.how_to_achieve}</Text>
              <Text style={styles.description}>Products to achieve: {item.Products_to_achieve}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  recommendationItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default RecommendationsScreen;

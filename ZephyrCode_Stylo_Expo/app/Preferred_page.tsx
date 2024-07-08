import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useRouter} from 'expo-router';

const preferred_page: React.FC = () => {
  const navigation = useNavigation();
 const router=useRouter();
  const goToTryOnPage = () => {
    router.push('try_on'); 
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagePlaceholder}
        source={{ uri: 'https://via.placeholder.com/150' }} 
      />
       <Text style={[styles.requirementsText, { color: '#2F4F4F' }]}>VERBAL EXPLANATION</Text>
      <View style={styles.textBox}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={[styles.textBoxContent, { color: '#2F4F4F' }]}>
            This is the verbal explanation.
          </Text>
        </ScrollView>
      </View>
      <View style={styles.additionalBox}>
        <Text style={[styles.requirementsText, { color: '#2F4F4F' }]}>PRODUCT REQUIREMENT</Text>
        <View style={styles.textBoxBelow}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={[styles.textBoxContent, { color: '#2F4F4F' }]}>
               "product requirements".
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.button} onPress={goToTryOnPage}>
          <Text style={styles.buttonText}>Try On</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  textBox: {
    height: 100,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textBoxContent: {
    fontSize: 16,
    color: '#2F4F4F', 
  },
  requirementsText: {
    fontSize: 16,
    color: '#2F4F4F', 
  },
  additionalBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  textBoxBelow: {
    height: 100,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#16A085',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default preferred_page;

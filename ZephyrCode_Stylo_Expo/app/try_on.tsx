import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have Ionicons installed for icons
import { useRouter } from 'expo-router';

interface TryOnProps {
  frontImageUri: string;
}

const TryOn: React.FC<TryOnProps> = ({
  frontImageUri,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSharePress = () => {
    setShowAlert(true);
  };

  const router=useRouter();

  const handleConfirmShare = () => {
    // Implement your share functionality here
    setShowAlert(false);
    router.push('./(tabs)/forum'); 
  };

  const handleCancelShare = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.imagePlaceholder} source={{ uri: frontImageUri }} />
        <Text style={styles.arrowMark}>⬇</Text>
        <Image style={styles.imagePlaceholder} source={{ uri: frontImageUri }} />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSharePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Share to Social Forum</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => setShowAlert(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAlert(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Ionicons name="alert-circle-outline" size={60} color="#16A085" />
              <Text style={styles.modalText}>Are you sure you want to share to social forum?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancelShare}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleConfirmShare}>
                  <Text style={[styles.buttonText, { color: '#fff' }]}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#ddd',
  },
  arrowMark: {
    fontSize: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: 250,
    backgroundColor: '#16A085',
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#16A085',
  },
});

export default TryOn;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRouter} from 'expo-router';

interface Props {
  username: string;
  profilePicture?: string;
}

const UserHistory: React.FC<Props> = ({ username, profilePicture }) => {
  const [lastUsedDate, setLastUsedDate] = useState<string>(''); 
  const [lastUsedTime, setLastUsedTime] = useState<string>(''); 
  const navigation = useNavigation();
  const router=useRouter();
  
  useEffect(() => {
    const currentDateTime = new Date();
    const date = currentDateTime.toLocaleDateString(); 
    const time = currentDateTime.toLocaleTimeString(); 
    setLastUsedDate(date); 
    setLastUsedTime(time); 
  }, []);

  const handleDetailsPress = () => {
    // navigation.navigate('Register'); 
    router.push('../DetailHistory')
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.profileSection}>
          <View style={styles.profilePlaceholder}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
              <Icon name="user" size={30} color="#ffffff" />
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>User Name: {username}</Text>
            {lastUsedDate && lastUsedTime ? (
              <>
                <View style={styles.lastUsedDateTimeContainer}>
                  <Icon name="calendar" size={14} color="#777777" style={styles.icon} />
                  <Text style={styles.lastUsedDate}>{lastUsedDate}</Text>
                </View>
                <View style={styles.lastUsedDateTimeContainer}>
                  <Icon name="clock-o" size={14} color="#777777" style={styles.icon} />
                  <Text style={styles.lastUsedTime}>{lastUsedTime}</Text>
                </View>
              </>
            ) : (
              <View style={styles.noHistoryContainer}>
                <Icon name="calendar" size={30} color="#777777" style={styles.icon} />
                <Icon name="clock-o" size={30} color="#777777" style={styles.icon} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleDetailsPress} style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  box: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d3d3d3', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
  },
  lastUsedDateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  lastUsedDate: {
    fontSize: 14,
    color: '#777777',
    marginLeft: 5,
  },
  lastUsedTime: {
    fontSize: 14,
    color: '#777777',
    marginLeft: 5,
  },
  noHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default UserHistory;



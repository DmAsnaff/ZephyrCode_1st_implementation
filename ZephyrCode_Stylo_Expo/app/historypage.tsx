import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  username: string;
  profilePicture?: string;
}

interface HistoryEntry {
  id: string;
  date: string;
  time: string;
}

const UserHistory: React.FC<Props> = ({ username, profilePicture }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const navigation = useNavigation();

  // Using useFocusEffect to run code when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      addHistoryEntry();
    }, [])
  );

  const addHistoryEntry = () => {
    const currentDateTime = new Date();
    const date = currentDateTime.toLocaleDateString();
    const time = currentDateTime.toLocaleTimeString();
    const newEntry = { id: `${date}-${time}`, date, time };
    setHistory((prevHistory) => [...prevHistory, newEntry]);
  };

  const handleDetailsPress = () => {
    navigation.navigate('DetailHistory');
  };

  const renderItem = ({ item }: { item: HistoryEntry }) => (
    <View style={styles.historyBox}>
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
          <View style={styles.lastUsedDateTimeContainer}>
            <Icon name="calendar" size={14} color="#777777" style={styles.icon} />
            <Text style={styles.lastUsedDate}>{item.date}</Text>
          </View>
          <View style={styles.lastUsedDateTimeContainer}>
            <Icon name="clock-o" size={14} color="#777777" style={styles.icon} />
            <Text style={styles.lastUsedTime}>{item.time}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleDetailsPress} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  historyBox: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    alignSelf: 'center',
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
  icon: {
    marginRight: 5,
  },
  detailsButton: {
    backgroundColor: '#16A085',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default UserHistory;

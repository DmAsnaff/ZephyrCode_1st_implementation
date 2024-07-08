import React, { useLayoutEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Title, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const Profile_screen: React.FC = () => {
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 22 }}
            onPress={() => router.push('../edit_profile')}
          >
            <Icon name="account-edit" size={28} color="#9CA3AF" />
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

    const handleLogout = () => {
      // Implement your logout logic here, such as clearing tokens or user data
      console.log('Logout button pressed');

      router.push('/login');
    };

    const showLogoutAlert = () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Logout canceled"),
            style: "cancel"
          },
          { text: "OK", onPress: handleLogout }
        ],
        { cancelable: false }
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Image
              source={require('@/assets/images/profile.png')}
              style={styles.profilePic}
              accessibilityLabel="Profile Picture"
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
                WELCOME
              </Title>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="account" color="#777777" size={20} />
            <Text style={styles.label}>Name:</Text>
          </View>
          <View style={styles.row}>
            <Icon name="account" color="#777777" size={20} />
            <Text style={styles.label}>User Name:</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={styles.label}>Email:</Text>
          </View>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={styles.label}>Address:</Text>
          </View>
          <View style={styles.row}>
            <Icon name="calendar" color="#777777" size={20} />
            <Text style={styles.label}>Date of Birth:</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={styles.label}>Phone Number:</Text>
          </View>
        </View>

        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={showLogoutAlert}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};

export default Profile_screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  logoutButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#16A085',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

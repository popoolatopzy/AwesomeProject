import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { token } = route.params;
  const [profileData, setProfileData] = useState(null);

  const fetchProfile = async (token) => {
    try {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await result.json();
      setProfileData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    }
  }, [token]);

  return (
    <View style={styles.container}>
      {profileData ? (
        <Text style={styles.text}>Welcome, {profileData.display_name}!</Text>
      ) : (
        <Text style={styles.text}>Loading profile...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 20,
  },
});

export default ProfileScreen;

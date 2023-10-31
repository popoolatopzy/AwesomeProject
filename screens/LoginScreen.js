import React from 'react';
import { View, TextInput, Button, StyleSheet} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const LoginScreen = ({ navigation }) => {

  const handleLogin = () => {
    navigation.navigate('Profile', { token:"username" });
  };

  const handleOpenInAppBrowser = async () => {
    const redirectUri = 'url-scheme://Profile'; // Replace with your redirect URI
    const clientID ="94b5e63aaf0840be828bbb985b7315c9";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=token`; // Replace with the URL you want to open
  
    try {
      const response = await InAppBrowser.openAuth(authUrl, redirectUri, {});
  
      if (response.type === 'success' && response.url) {
        const accessToken = response.url.match(/access_token=([^&]*)/)[1];
        console.log('Access Token:', accessToken);
        navigation.navigate('Profile', { token:accessToken });
        // Handle the access token (e.g., store it in state, perform actions, etc.)
      }
    } catch (error) {
      console.error('Error opening InAppBrowser:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
      />
      <Button title="Login" onPress={handleLogin} />
      <Button   title="Login with Spotify" onPress={handleOpenInAppBrowser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },

});

export default LoginScreen;

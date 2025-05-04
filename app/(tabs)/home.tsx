import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    console.log('HomeScreen User:', user);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {user?.fullName || 'User'}!</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Text style={styles.text}>ID: {user?.id}</Text>
      {/* Add more user properties as needed */}
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set background color to black
  },
  text: {
    color: 'white', // Set text color to white
  },
});
import CustomText from '@/components/CustomText';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';




export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />

      <CustomText >This screen does not exist.</CustomText>
      <Link href="/" style={styles.link}>
        <CustomText >Go to home screen!</CustomText>
      </Link>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

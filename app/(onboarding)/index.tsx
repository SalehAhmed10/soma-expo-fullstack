import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function OnboardingIndex() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Onboarding Screen</Text>
      <Link href="/(onboarding)/login" asChild>
        <Button title="Go to Login" />
      </Link>
    </View>
  );
}
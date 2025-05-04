import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react"; // Import useState
import { ActivityIndicator, View, /* useEffect */ } from "react-native"; // Corrected import

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user, loading } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false); // New state variable

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true after the first render
  }, []);

  useEffect(() => {
    if (isMounted && user === null) {
      // Trigger navigation to onboarding when user is null and component is mounted
      router.replace('/(onboarding)');
    }
  }, [user, router, isMounted]); // Add isMounted to the dependency array

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {user ? (
        <Stack key="tabs">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        <Stack key="onboarding">
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack>
      )}

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
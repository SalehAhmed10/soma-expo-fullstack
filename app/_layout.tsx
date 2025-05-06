
// import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack, useRouter } from "expo-router";
// import { StatusBar } from 'expo-status-bar';

// import "../index.css";

// import useAuthStore from "@/store/authStore";
// import { useEffect, useState } from "react"; // Import useState
// import { ActivityIndicator, Text, View } from "react-native"; // Corrected import

// export default function RootLayout() {
//   // const colorScheme = useColorScheme(); // Remove this line
//   const router = useRouter();
//   const { user, loading, error } = useAuthStore(); // Assuming your store has an error state
//   const [isMounted, setIsMounted] = useState(false); // New state variable
//   const [fontsLoaded, fontError] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   const isLoading = loading || !fontsLoaded; // Combined loading state

//   useEffect(() => {
//     setIsMounted(true); // Set isMounted to true after the first render
//   }, []);

//   useEffect(() => {
//     if (isMounted && user === null && !isLoading) {
//       // Trigger navigation to onboarding when user is null, component is mounted, and not loading
//       router.replace('/(onboarding)');
//     }
//   }, [user, router, isMounted, isLoading]); // Add isLoading to the dependency array

//   if (!fontsLoaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     // Display an error message if there's an authentication error
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Authentication Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ThemeProvider value={DefaultTheme}> {/* Use DefaultTheme directly */}
//       {user ? (
//         <Stack key="tabs">
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack>
//       ) : (
//         <Stack key="onboarding">
//           <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
//         </Stack>
//       )}

//       <StatusBar style="dark" />  {/* Changed to 'dark' for better visibility */}
//     </ThemeProvider>
//   );
// }

// filepath: c:\Dev-work\ClientProjects\mobile-app-projects\Soma-Project\GSTUDIO\download\soma-mobile-auth\app\_layout.tsx
// import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack, useRouter } from "expo-router";
// import { StatusBar } from 'expo-status-bar';

// import "../index.css";

// import useAuthStore from "@/store/authStore";
// import { useEffect, useState } from "react"; // Import useState
// import { ActivityIndicator, Text, View } from "react-native"; // Corrected import

// export default function RootLayout() {
//   // const colorScheme = useColorScheme(); // Remove this line
//   const router = useRouter();
//   const { user, loading, error } = useAuthStore(); // Assuming your store has an error state
//   const [isMounted, setIsMounted] = useState(false); // New state variable
//   const [fontsLoaded, fontError] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   const isLoading = loading || !fontsLoaded; // Combined loading state

//   useEffect(() => {
//     setIsMounted(true); // Set isMounted to true after the first render
//   }, []);

//   useEffect(() => {
//     if (isMounted && user === null && !isLoading) {
//       // Trigger navigation to onboarding when user is null, component is mounted, and not loading
//       router.replace('/(onboarding)');
//     }
//   }, [user, router, isMounted, isLoading]); // Add isLoading to the dependency array

//   if (!fontsLoaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     // Display an error message if there's an authentication error
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Authentication Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ThemeProvider value={DefaultTheme}> {/* Use DefaultTheme directly */}
//       {user ? (
//         <Stack key="tabs">
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack>
//       ) : (
//         <Stack key="onboarding">
//           <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
//         </Stack>
//       )}

//       <StatusBar style="dark" />  {/* Changed to 'dark' for better visibility */}
//     </ThemeProvider>
//   );
// }

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import "../index.css";

import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react"; // Import useState
import { ActivityIndicator, Text, View } from "react-native"; // Corrected import

export default function RootLayout() {
  // const colorScheme = useColorScheme(); // Remove this line
  const router = useRouter();
  const { user, loading, error } = useAuthStore(); // Assuming your store has an error state
  const [isMounted, setIsMounted] = useState(false); // New state variable
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const isLoading = loading || !fontsLoaded; // Combined loading state

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true after the first render
  }, []);

  useEffect(() => {
    if (isMounted && user === null && !isLoading) {
      // Trigger navigation to onboarding when user is null, component is mounted, and not loading
      router.replace('/(onboarding)');
    }
  }, [user, router, isMounted, isLoading]); // Add isLoading to the dependency array

  if (!fontsLoaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    // Display an error message if there's an authentication error
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Authentication Error: {error}</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}> {/* Use DefaultTheme directly */}
      {user ? (
        <Stack key="tabs" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        <Stack key="onboarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack>
      )}

      <StatusBar style="dark" />  {/* Changed to 'dark' for better visibility */}
    </ThemeProvider>
  );
}
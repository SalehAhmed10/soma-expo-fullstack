
// import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack, useRouter } from "expo-router";


// import "../index.css";

// import useAuthStore from "@/store/authStore";
// import { useEffect, useState } from "react"; //
// import { ActivityIndicator, StatusBar, Text, View } from "react-native"; //

// export default function RootLayout() {

//   const router = useRouter();
//   const { user, loading, error } = useAuthStore();
//   const [isMounted, setIsMounted] = useState(false);
//   const [fontsLoaded, fontError] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   const isLoading = loading || !fontsLoaded;

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (isMounted && user === null && !isLoading) {

//       router.replace('/(onboarding)');
//     }
//   }, [user, router, isMounted, isLoading]);

//   if (!fontsLoaded) {

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

//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Authentication Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ThemeProvider value={DefaultTheme}>
//       {user ? (
//         <Stack key="tabs" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack>
//       ) : (
//         <Stack key="onboarding" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
//         </Stack>
//       )}

//       <StatusBar barStyle={"dark-content"} />
//     </ThemeProvider>
//   );
// }



import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import "../index.css";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const router = useRouter();
  const { user, loading, error } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const isLoading = loading || !fontsLoaded;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user === null && !isLoading) {
      router.replace('/(onboarding)');
    }
  }, [user, router, isMounted, isLoading]);

  if (!fontsLoaded) {
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
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Authentication Error: {error}</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
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
      <StatusBar
        translucent={true}
        style="dark"
      />

    </ThemeProvider>
  );
}
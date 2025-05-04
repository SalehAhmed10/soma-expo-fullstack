import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home" // This name matches the file name: app/(tabs)/home.tsx
        options={{
          title: "Home",
          // Add any other tab options here, e.g., tabBarIcon
        }}
      />

      {/* Add more Tabs.Screen components for other tab routes */}
    </Tabs>
  );
}

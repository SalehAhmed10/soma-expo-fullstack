// filepath: c:\Dev-work\ClientProjects\mobile-app-projects\Soma-Project\GSTUDIO\download\soma-mobile-auth\app\(onboarding)\_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import React from 'react';


export default function OnboardingLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
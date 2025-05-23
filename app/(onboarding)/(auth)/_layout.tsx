import { Stack } from 'expo-router';

import React from 'react';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
    return (
        <>

            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    contentStyle: { backgroundColor: '#E8E1D9' }
                }}
            >
                <Stack.Screen
                    name="AuthHome"
                    options={{
                        animation: 'slide_from_bottom'
                    }}
                />
                <Stack.Screen
                    name="login"
                    options={{
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name="createaccount"
                    options={{
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name="whatsonyourmind"
                    options={{
                        animation: 'slide_from_right'
                    }}
                />
            </Stack>
        </>
    );
}
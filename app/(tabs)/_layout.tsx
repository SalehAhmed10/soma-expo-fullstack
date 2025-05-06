// filepath: c:\Dev-work\ClientProjects\mobile-app-projects\Soma-Project\GSTUDIO\download\soma-mobile-auth\app\(tabs)\_layout.tsx
import CustomText from '@/components/CustomText';
import useAuthStore from '@/store/authStore';
import { AntDesign, FontAwesome5, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Link, Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function TabsLayout() {
    const { user, loading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!user && !loading) {
            // Redirect to the onboarding flow if the user is not logged in
            router.replace('/(onboarding)');
        }
    }, [user, loading, router]);

    // While checking if the user is logged in, we display a blank screen
    if (loading) {
        return null; // or a loading indicator
    }

    // If the user is not logged in, we don't display the tabs
    if (!user) {
        return null; // or a loading indicator
    }

    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#E8E1D9',
                    borderTopWidth: 0,
                    height: 80,  // Increased from default
                    paddingBottom: 20,
                    paddingTop: 10,
                    elevation: 25,
                    shadowOpacity: 0,
                    position: 'relative',
                },
                tabBarActiveTintColor: '#834518',
                tabBarInactiveTintColor: '#31170C',
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        // outline icon HOME 
                        <SimpleLineIcons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="sessions"
                options={{
                    title: 'Sessions',
                    tabBarIcon: ({ color }) => (
                        <SimpleLineIcons name="control-play" size={24} color={color} />

                    ),
                }}
            />
            <Tabs.Screen
                name="mymat"
                options={{
                    title: 'My Mat',
                    headerStyle: {
                        backgroundColor: '#E8E1D9',
                        shadowOpacity: 0,
                        boxShadow: 'none',
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#31170C',
                        fontFamily: 'Epilogue_600SemiBold',
                        fontSize: 21,
                        fontWeight: '700'
                    },
                    headerRight: () => (

                        <Link href="/mymat/addmat" asChild>
                            <TouchableOpacity
                                className="pr-6"
                            // onPress={() => router.push('/mymat/addmat')}
                            >
                                <AntDesign name="pluscircleo" size={24} color="#31170C" />
                            </TouchableOpacity>
                        </Link>
                    ),
                    tabBarIcon: ({ color }) => (
                        <View className="bg-[#834518] w-[72px] h-[72px] rounded-full items-center justify-center -mt-10 shadow-lg">
                            <FontAwesome5 name="map" size={24} color="#E8E1D9" />
                            <CustomText className="text-xxs text-[#E8E1D9]">My Mat</CustomText>
                        </View>
                    ),
                    headerShown: true,
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen
                name="playlists"
                options={{
                    title: 'Playlists',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name='multitrack-audio' size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <SimpleLineIcons name='user' size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
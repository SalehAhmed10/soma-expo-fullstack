import { View, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import CustomText from '@/components/CustomText';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useState } from 'react';

export interface SessionInterface {
    id: string;
    title: string;
    description: string;
    length: string;
    date: string;
    live: boolean;
    image: any; // For require() image imports
}

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const sessionsData: SessionInterface[] = [
        {
            id: "1",
            title: "Morning Yoga Flow",
            description: "Start your day with energizing yoga sequences",
            length: "45mins",
            date: "2024-03-20",
            live: true,
            image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
        },
        {
            id: "2",
            title: "Mindful Meditation",
            description: "Guided meditation for stress relief",
            length: "30mins",
            date: "2024-03-21",
            live: false,
            image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
        },
        {
            id: "3",
            title: "Evening Sound Bath",
            description: "Relax with healing sound frequencies",
            length: "1hr",
            date: "2024-03-22",
            live: true,
            image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
        },
        {
            id: "4",
            title: "Core Strength",
            description: "Build core strength and stability",
            length: "45mins",
            date: "2024-03-23",
            live: false,
            image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
        },
    ];

    return (
        <View className="flex-1 bg-screen-bg pt-12">
            {/* Search Header */}
            <View className="px-6 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-left" size={24} color="#31170C" />
                </TouchableOpacity>
                <View className="flex-1 flex-row items-center bg-[#E8E1D9] rounded-xl px-4 border border-[#00000024]">
                    <FontAwesome5 name="search" size={16} color="#31170C" />
                    <TextInput
                        placeholder="Search sessions"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="flex-1 h-12 ml-2 text-dark-brown"
                        placeholderTextColor="#31170C80"
                        autoFocus
                    />
                </View>
            </View>

            {/* Sessions List */}
            <ScrollView className="flex-1 px-6 mt-6">
                {sessionsData.map(session => (
                    <TouchableOpacity
                        key={session.id}
                        className="flex-row items-center bg-[#E0D3C7] rounded-xl p-4 mb-4"
                    >
                        <Image
                            source={session.image}
                            className="w-[90px] h-[90px] rounded-lg"
                            resizeMode="cover"
                        />
                        <View className="flex-1 ml-4">
                            <CustomText className="text-base font-bold text-dark-brown">
                                {session.title}
                            </CustomText>
                            <CustomText className="text-sm text-dark-brown opacity-60">
                                {session.description}
                            </CustomText>
                            <View className="flex-row items-center mt-2">
                                <Feather name="clock" size={16} color="#31170C" />
                                <CustomText className="ml-2 text-sm text-dark-brown">
                                    {session.length}
                                </CustomText>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
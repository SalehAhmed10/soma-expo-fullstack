import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, Pressable, TextInput, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import CustomText from '@/components/CustomText';
import { Link, router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { sessionsData } from '@/constants/data';
import CategoryGrid from '@/components/CategoryGrid';



const sessions = [
    { id: '1', title: 'Morning Yoga', instructor: 'Sarah', time: '9:00 AM' },
    { id: '2', title: 'Meditation', instructor: 'John', time: '2:00 PM' },
    { id: '3', title: 'Sound Healing', instructor: 'Maya', time: '5:00 PM' },
];
const { width } = Dimensions.get('window');
const cardWidth = width - 32; // 16px padding on each side


const categories = [
    { id: '1', title: 'Yoga', image: require('@/assets/images/soma/categoriesimages/yoga.png') },
    { id: '2', title: 'Meditation', image: require('@/assets/images/soma/categoriesimages/meditation.png') },
    { id: '3', title: 'Soundbath', image: require('@/assets/images/soma/categoriesimages/soundbath.png') },
    { id: '4', title: 'Breathwork', image: require('@/assets/images/soma/categoriesimages/breathwork.png') },
    { id: '5', title: 'Rest & Relax', image: require('@/assets/images/soma/categoriesimages/restandrelax.png') },
    { id: '6', title: 'Tone , Strengthen & Energise', image: require('@/assets/images/soma/categoriesimages/Tone-strengthen-energise.png') },
];
export default function SessionsScreen() {

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    // Move navigation logic to useEffect or event handler
    const handleSearch = () => {
        router.push('/session/search');
    };
    return (

        <>
            <SafeAreaView className="flex-1 bg-[#E8E1D9]">
                <ScrollView className="flex-1">
                    <View className="px-6 pt-12">

                        {/* session header */}
                        <View className="flex-row justify-between items-center mb-6">
                            <CustomText className="text-xl font-bold text-dark-brown">
                                Sessions
                            </CustomText>
                        </View>

                        {/* Search Bar */}
                        <TouchableOpacity
                            className="flex-1"
                            onPress={handleSearch}
                        >
                            <View className="flex-row items-center bg-[#E8E1D9] rounded-xl mb-6 px-4 border border-[#00000024]">
                                <FontAwesome5 name="search" size={16} color="#31170C" />
                                <View className="flex-1 h-12 ml-2 text-dark-brown justify-center">
                                    <CustomText className="text-[#31170C80]">
                                        Search sessions
                                    </CustomText>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Categories */}
                        <View className="mb-8">

                            <View className="mb-8">
                                <CategoryGrid />
                            </View>


                            {/* Sessions List */}
                            <CustomText className="text-lg font-semibold text-dark-brown mb-4">
                                Live Sessions
                            </CustomText>

                            {sessionsData.map((session) => (
                                <Link
                                    href={`/session/${session.id}`} key={session.id} asChild>
                                    <Pressable>
                                        <View
                                            className="flex-row bg-[#E0BCA226] rounded-xl mb-4"
                                            style={{ width: cardWidth, height: 80 }}
                                        >
                                            {/* Session Image */}
                                            <Image
                                                source={session.image}
                                                style={{ width: 80, height: 64 }}
                                                className="m-2 rounded-lg"
                                            />

                                            {/* Session Info */}
                                            <View className="flex-1 justify-center p-2 pr-3">
                                                <View className="flex-row justify-between items-center">
                                                    <CustomText
                                                        className="text-base font-semibold text-dark-brown"
                                                        numberOfLines={1}
                                                    >
                                                        {session.title}
                                                    </CustomText>
                                                    {/* {session.live && (
                                                <View className="bg-[#31170C] px-2 py-1 rounded ml-2">
                                                    <CustomText className="text-xs text-white">LIVE</CustomText>
                                                </View>
                                            )} */}
                                                </View>

                                                <CustomText
                                                    className="text-xm text-dark-brown opacity-60 mt-1"
                                                    numberOfLines={1}
                                                >
                                                    {session.description}
                                                </CustomText>

                                                <View className="flex-row items-center mt-1">
                                                    <FontAwesome5 name="clock" size={12} color="#31170C" />
                                                    <CustomText className="text-xs text-dark-brown ml-1">
                                                        {session.length}
                                                    </CustomText>
                                                    <CustomText className="text-xs text-dark-brown ml-3">
                                                        {session.date}
                                                    </CustomText>
                                                    {session.live && (
                                                        <View
                                                            className="flex-row items-center px-2 ml-2 justify-center"
                                                            style={{
                                                                width: 65.58,
                                                                height: 23.1,
                                                                borderRadius: 11.55,
                                                                backgroundColor: '#FF8A8070'
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: 6,
                                                                    height: 6,
                                                                    borderRadius: 3,
                                                                    backgroundColor: '#E45841',
                                                                    marginRight: 4
                                                                }}
                                                            />
                                                            <CustomText
                                                                className="text-xs"
                                                                style={{ color: '#E45841' }}
                                                            >
                                                                LIVE
                                                            </CustomText>
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    </Pressable>
                                </Link>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}


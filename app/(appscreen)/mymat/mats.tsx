import { View, SafeAreaView, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import CustomText from '@/components/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function MatsScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [mats, setMats] = useState([
        { id: '1', name: "John's Mat", status: 'Connected' },
        { id: '2', name: "Sarah's Mat", status: 'Connected' },
        { id: '3', name: "Yoga Studio Mat", status: 'Connected' },
    ]);

    return (
        <SafeAreaView className="flex-1 bg-screen-bg">
            {/* Header */}
            <View className="px-6 pt-12 mt-8">
                <CustomText className="text-2xl font-bold text-dark-brown">
                    Mats
                </CustomText>
            </View>

            {/* Search Bar */}
            <View className="px-6 mt-4">
                <View className='flex-row items-center bg-[#E8E1D9] rounded-xl mb-6 px-4 border border-[#00000024]'>
                    <FontAwesome5 name="search" size={16} color="#31170C" />
                    <TextInput
                        placeholder="Search mats"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="flex-1 ml-2"
                    />
                </View>
            </View>

            {/* Mats List */}
            <ScrollView className="flex-1 px-6 mt-4">
                {mats.map((mat) => (
                    <TouchableOpacity
                        key={mat.id}
                        onPress={() => router.push('/mymat/soundlevel')}
                        activeOpacity={0.7}
                    >
                        <View className="bg-[#E0D3C7] rounded-[17px] p-4 mb-3 flex-row items-center h-[100px] w-full">
                            <View className="flex-1 justify-between h-full py-2">
                                <CustomText className="text-lg font-bold text-dark-brown">
                                    {mat.name}
                                </CustomText>
                                <View className="bg-[#d5c4b4] self-start px-3 py-1 rounded-full">
                                    <CustomText className="text-xxs text-dark-brown">
                                        {mat.status}
                                    </CustomText>
                                </View>
                            </View>
                            <View className="w-[100px] h-[100px] justify-center items-center overflow-hidden">
                                <Image
                                    source={require('@/assets/images/soma/mymatimages/mymatphoneimage.png')}
                                    className="w-[1000px] h-[100px] mt-20"
                                    style={{ transform: [{ rotate: '-15deg' }] }}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
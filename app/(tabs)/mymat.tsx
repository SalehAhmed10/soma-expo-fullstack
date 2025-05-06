import { View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native';
import CustomText from '@/components/CustomText';
import { soundProfiles } from '@/constants/data';

import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';



export default function MyMatScreen() {

    const [selectedProfile, setSelectedProfile] = useState(0);

    return (
        <SafeAreaView className="flex-1  bg-screen-bg  ">


            <ScrollView className="flex-1 ">

                {/* Header created in (tabs)/layout */}

                {/* rectangle with background color border radius  8px*/}


                <View className='px-6'>

                    <View className="relative w-full h-[150PX] bg-[#E0D3C7] rounded-[8px] mb-4 overflow-hidden">
                        {/* Background Vector Image */}
                        <ImageBackground
                            source={require('@/assets/images/soma/mymatimages/mymatphonebgvector2.png')}
                            // POSITION THE IMAGE MIDDLE OF THE CONTAINER
                            className="absolute top-0 left-0 right-0 bottom-0 z-0"
                            resizeMode="contain"

                        >
                            {/* Phone Image with Content */}
                            <ImageBackground
                                source={require('@/assets/images/soma/mymatimages/mymatphoneimage.png')}
                                className="w-[90%] h-[150PX] mx-auto my-2"
                                resizeMode="contain"
                                imageStyle={{
                                    transform: [{ scale: 0.8 }]
                                }}
                            >
                                <View className='flex-row justify-between w-full py-4'>
                                    <CustomText className="text-base font-semibold text-dark-brown">
                                        My Mat
                                    </CustomText>
                                    <View className="flex-row items-center bg-[#d5c5b4] rounded-full px-4 py-1">
                                        <Ionicons name="bluetooth-outline" size={16} color="#834518" />
                                        <CustomText className="text-xxs font-semibold text-[#834518]">
                                            Connected
                                        </CustomText>
                                    </View>
                                </View>
                            </ImageBackground>
                        </ImageBackground>
                    </View>



                    {/* Sound Profile Tab row */}
                    <View className="flex flex-col">
                        <CustomText className="py-2 text-base font-semibold text-dark-brown">
                            Sound Profiles
                        </CustomText>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mt-4"
                        >
                            <View className="flex-row items-center">
                                {soundProfiles.map((profile, index) => (
                                    <TouchableOpacity
                                        key={profile.id}
                                        onPress={() => setSelectedProfile(index)}
                                        className="items-center mr-6"
                                    >
                                        <View
                                            className={`w-16 h-16 rounded-full items-center justify-center mb-2 ${selectedProfile === index
                                                ? 'bg-[#A36D47]'
                                                : 'bg-transparent border border-[#A36D47]'
                                                }`}
                                        >
                                            <Image
                                                source={profile.icon}
                                                className="w-6 h-6"
                                                style={{
                                                    tintColor: selectedProfile === index ? '#FFFFFF' : '#A36D47'
                                                }}
                                            />
                                        </View>
                                        <CustomText
                                            className={`text-xs ${selectedProfile === index
                                                ? 'text-dark-brown font-bold'
                                                : 'text-dark-brown'
                                                }`}
                                        >
                                            {profile.name}
                                        </CustomText>
                                    </TouchableOpacity>
                                ))}
                            </View>


                        </ScrollView>


                    </View>



                    {/* // custom setting button  */}
                    <View className="mt-10 w-full ">
                        <TouchableOpacity
                            className="h-[50px] border border-[#A36D47] rounded-full items-center justify-center"
                            onPress={() => router.push('/mymat/soundlevel')}
                        >
                            <CustomText className="">
                                Adjust Sound
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {/* // Sound Control Volume - power and volume +  */}
                    <View className="flex-row items-center justify-center gap-8 mt-10 mb-4">
                        <TouchableOpacity
                            className="w-[64.32px] h-[64.32px] border border-[#A36D47] rounded-full items-center justify-center"
                        >
                            <Feather name="minus" size={24} color="#A36D47" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-[113.79px] h-[113.79px] border-2 border-[#A36D47] rounded-full items-center justify-center"
                        >
                            <Feather name="power" size={40} color="#A36D47" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-[64.32px] h-[64.32px] border border-[#A36D47] rounded-full items-center justify-center"
                        >
                            <Feather name="plus" size={24} color="#A36D47" />
                        </TouchableOpacity>
                    </View>




                </View>


            </ScrollView>

        </SafeAreaView >
    );
}
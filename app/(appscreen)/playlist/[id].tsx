import { View, Image, StatusBar, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import CustomText from '@/components/CustomText';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function PlaylistDetail() {
    const params = useLocalSearchParams();



    interface Track {
        id: string;
        title: string;
        subtitle: string;
        duration: string;
        image: any;
    }


    const recommendedSessions = [
        {
            id: '1',
            title: 'Morning Meditation',
            subtitle: 'Peaceful Mind Series',
            duration: '15 min',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        },
        {
            id: '2',
            title: 'Deep Relaxation',
            subtitle: 'Sleep Well Series',
            duration: '20 min',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        }
    ];

    const tracks: Track[] = [
        {
            id: '1',
            title: 'Morning Meditation',
            subtitle: 'Peaceful Mind Series',
            duration: '1 hr',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        },
        {
            id: '2',
            title: 'Deep Sleep Music',
            subtitle: 'Sleep Well Series',
            duration: '45 min',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        },
        {
            id: '3',
            title: 'Stress Relief',
            subtitle: 'Anxiety Free Series',
            duration: '30 min',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        },
        {
            id: '4',
            title: 'Focus Music',
            subtitle: 'Concentration Series',
            duration: '2 hr',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        },
        {
            id: '5',
            title: 'Energy Morning',
            subtitle: 'Gabs',
            duration: '1 hr',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        },
        {
            id: '6',
            title: 'Energy Morning',
            subtitle: 'Gabs',
            duration: '1 hr',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        },
        {
            id: '7',
            title: 'Energy Morning',
            subtitle: 'Gabs',
            duration: '1 hr',
            image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
        },
    ];

    return (
        <>

            <ScrollView className="flex-1 bg-screen-bg-dark">
                <View>
                    <ImageBackground
                        source={params.image as any}
                        className="w-full h-[310.37px]"
                        resizeMode="cover"
                    >
                        <TouchableOpacity
                            className="absolute top-12 left-6 z-10"
                            onPress={() => router.back()}
                        >
                            <Feather name="arrow-left" size={24} color="#000" />
                        </TouchableOpacity>

                        <LinearGradient
                            colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
                            className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
                        />
                    </ImageBackground>

                    <View className="p-6 -mt-20 flex justify-center flex-col items-center">
                        <CustomText className="text-2xl font-bold text-center text-[#E8E1D9]">
                            {params.name}
                        </CustomText>
                    </View>
                </View>



                {/* Tracks List */}


                {tracks.length === 0 ? (
                    <View className="px-6 py-10 items-center">
                        <CustomText className="text-xl font-bold text-[#E8E1D9] text-center mb-6">
                            Let's start building your playlist
                        </CustomText>
                        <TouchableOpacity
                            className="w-full h-[50px] border border-[#CCB19D] rounded-full items-center justify-center mb-12"
                            onPress={() => router.push('/session/search')}
                        >
                            <CustomText className="text-[#CCB19D] text-base">
                                Add to this playlist
                            </CustomText>
                        </TouchableOpacity>

                        {/* Recommended Sessions */}
                        <View className="w-full">
                            <CustomText className="text-lg font-bold text-[#E8E1D9] mb-6">
                                Recommended Sessions
                            </CustomText>
                            {recommendedSessions.map(session => (
                                <TouchableOpacity
                                    key={session.id}
                                    className="flex-row items-center bg-[#1C2B31] rounded-xl p-4 mb-4"
                                    onPress={() => {/* Handle add session */ }}
                                >
                                    <Image
                                        source={session.image}
                                        className="w-[60px] h-[60px] rounded-lg mr-4"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1">
                                        <CustomText className="text-base font-bold text-[#E8E1D9]">
                                            {session.title}
                                        </CustomText>
                                        <CustomText className="text-sm text-[#E8E1D9] opacity-60">
                                            {session.subtitle}
                                        </CustomText>
                                        <View className="flex-row items-center mt-1">
                                            <Feather name="clock" size={14} color="#E8E1D9" />
                                            <CustomText className="ml-1 text-xs text-[#E8E1D9]">
                                                {session.duration}
                                            </CustomText>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ) : (

                    <View className="px-6 py-10">
                        {tracks.map((track) => (
                            <TouchableOpacity
                                key={track.id}
                                onPress={() => router.push(`/playlist/track/${track.id}`)}
                                className="w-full h-[90px] flex-row gap-5 items-center mb-4 rounded-xl p-4"
                            >
                                <Image
                                    source={track.image}
                                    className="w-[90px] h-[90px] rounded-lg"
                                    resizeMode="cover"
                                />
                                <View className="flex-1 h-full flex-col justify-center">
                                    <CustomText className="text-base font-bold text-[#fff]">
                                        {track.title}
                                    </CustomText>
                                    <CustomText className="text-xs text-white opacity-60">
                                        {track.subtitle}
                                    </CustomText>
                                    <View className="flex-row items-center pt-2">
                                        <Feather name="clock" size={16} color="#fff" />
                                        <CustomText className="ml-2 text-xs text-white">
                                            {track.duration}
                                        </CustomText>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* <View className="px-6 py-10">
                    {mockTracks.map((track) => (
                        <TouchableOpacity
                            key={track.id}
                            onPress={() => router.push(`/playlist/track/${track.id}`)}
                            className="w-full h-[90px] flex-row gap-5 items-center mb-4 rounded-xl p-4"
                        >
                            <Image
                                source={track.image}
                                className="w-[90px] h-[90px] rounded-lg"
                                resizeMode="cover"
                            />
                            <View className="flex-1 h-full flex-col justify-center">
                                <CustomText className="text-base font-bold text-[#fff]">
                                    {track.title}
                                </CustomText>
                                <CustomText className="text-xs text-white opacity-60">
                                    {track.subtitle}
                                </CustomText>
                                <View className="flex-row items-center pt-2">
                                    <Feather name="clock" size={16} color="#fff" />
                                    <CustomText className="ml-2 text-xs text-white">
                                        {track.duration}
                                    </CustomText>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View> */}

            </ScrollView>
            {/* <StatusBar barStyle={'dark-content'} /> */}
        </>
    );
}
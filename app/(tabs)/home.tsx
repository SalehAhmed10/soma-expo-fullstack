// use this

import CustomText from '@/components/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    ImageSourcePropType,
    Pressable,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    ViewToken
} from 'react-native';

const { width } = Dimensions.get('window');

import CategoryGrid from '@/components/CategoryGrid';
import { FeaturedProgramType } from '@/constants/data';
import useAuthStore from '@/store/authStore';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const CARD_WIDTH = width - 48;


export default function HomeScreen() {

    const { user } = useAuthStore();
    const [firstName, setFirstName] = useState('User');

    useEffect(() => {
        if (user && user.fullName) {
            // Split the full name into an array of words
            const nameParts = user.fullName.split(' ');
            // Take the first word as the first name
            setFirstName(nameParts[0]);
        } else {
            setFirstName('User'); // Default value if no user or fullName
        }
    }, [user]);


    const { width } = Dimensions.get('window');
    const CARD_WIDTH = width - 44; // 24px padding on each side

    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const firstViewableItem = viewableItems[0];
            console.log('Current visible item:', firstViewableItem);
        }
    }, []);


    const featuredSessions: FeaturedProgramType[] = [
        {
            id: '1',
            title: 'Morning Meditation',
            description: 'Start your day with peace',
            image: require('@/assets/images/soma/home-features-1.png'),
        },
        {
            id: '2',
            title: 'Morning Meditation',
            description: 'Start your day with peace',
            image: require('@/assets/images/soma/home-features-1.png'),
        },

        {
            id: '3',
            title: 'Morning Meditation',
            description: 'Start your day with peace',
            image: require('@/assets/images/soma/home-features-1.png'),
        },

    ];

    interface PlaylistTrack {
        id: string;
        title: string;
        image: ImageSourcePropType;
        // track duration 
        duration: string;
    }



    const playlistTrack: PlaylistTrack[] = [
        { id: '1', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
        { id: '2', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
        { id: '3', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
        { id: '4', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
        { id: '5', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
        { id: '6', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
    ]


    const scrollX = useRef(new Animated.Value(0)).current;

    // const Pagination = ({ data, scrollX }: PaginationPropsType) => (
    //     <View className="flex-row gap-5 justify-center absolute bottom-2 left-0 right-0">
    //         {data.map((_, i) => {
    //             const inputRange = [
    //                 (i - 1) * CARD_WIDTH,
    //                 i * CARD_WIDTH,
    //                 (i + 1) * CARD_WIDTH,
    //             ];

    //             const width = scrollX.interpolate({
    //                 inputRange,
    //                 outputRange: [8, 16, 8],
    //                 extrapolate: 'clamp',
    //             });

    //             const opacity = scrollX.interpolate({
    //                 inputRange,
    //                 outputRange: [0.3, 1, 0.3],
    //                 extrapolate: 'clamp',
    //             });

    //             return (
    //                 <Animated.View
    //                     key={i}
    //                     className="h-2 bg-dark-brown rounded-full mx-1"
    //                     style={{ width, opacity }}
    //                 />
    //             );
    //         })}
    //     </View>
    // );

    const Pagination = ({ data, scrollX }: { data: FeaturedProgramType[], scrollX: Animated.Value }) => (
        <View className="flex-row bg-screen-bg gap-5 justify-center absolute bottom-0 h-[20px] items-center w-[35%] rounded-[18px] ">
            {data.map((_, i) => {
                const inputRange = [
                    (i - 1) * CARD_WIDTH,
                    i * CARD_WIDTH,
                    (i + 1) * CARD_WIDTH,
                ];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1, 0.8],
                    extrapolate: 'clamp',
                });


                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={i}
                        className="h-3 w-3 bg-dark-brown rounded-full mx-1"
                        style={{
                            opacity,
                            transform: [{ scale }]
                        }}
                    />
                );
            })}
        </View>
    );

    return (
        <SafeAreaView className="flex-1  bg-screen-bg">
            <ScrollView className="flex-1">
                {/* Header Section */}
                <View className="flex-row justify-between items-center px-6 pt-12">
                    <View>
                        <View className="flex-row items-center">
                            <CustomText className="text-base text-dark-brown">
                                Hello,{' '}
                            </CustomText>
                            <CustomText className="text-xl font-bold text-dark-brown">
                                {firstName}
                            </CustomText>
                        </View>


                    </View>
                    <Pressable
                        onPress={() => router.push('/profile')}
                    >
                        <Image
                            source={require("@/assets/images/soma/avatar.png")}
                            className="w-12 h-12 rounded-full"
                        />
                    </Pressable>
                </View>

                {/* Featured Section */}

                <View className="mx-5 py-6">
                    <View >
                        <CustomText className="text-lg font-bold text-dark-brown mb-4">
                            Live Sessions
                        </CustomText>
                    </View>
                    <View className="relative">
                        <AnimatedFlatList
                            data={featuredSessions}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={0}
                            decelerationRate="fast"
                            contentContainerStyle={{ paddingHorizontal: 0 }}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: true }
                            )}
                            renderItem={({ item }: any) => (
                                <View
                                    className={`w-${CARD_WIDTH} h-[200px] rounded-xl overflow-hidden boder border-[#31170C20] mr-4`}


                                >
                                    <ImageBackground
                                        source={item.image}
                                        style={{
                                            width: CARD_WIDTH,
                                            height: 200,
                                            borderRadius: 13,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <LinearGradient
                                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <View className="flex-1 justify-start p-4">
                                                <CustomText className="text-lg font-semibold text-white">
                                                    {item.title}
                                                </CustomText>
                                                <CustomText className="text-sm text-white opacity-60">
                                                    {item.description}
                                                </CustomText>
                                            </View>
                                        </LinearGradient>
                                    </ImageBackground>
                                </View>




                            )}
                        />
                        <View className='relative flex justify-center items-center mt-2'>

                            <Pagination data={featuredSessions} scrollX={scrollX} />
                        </View>
                    </View>
                </View>


                {/* Categories */}

                <View className="px-6 py-6">
                    <CategoryGrid />
                </View>


                {/* Playlist List */}
                <View className="px-6 py-6">
                    <View className='flex flex-row justify-between items-center'>
                        <CustomText className="text-lg font-bold text-dark-brown ">
                            Playlist
                        </CustomText>
                        {/* //see all  */}
                        <TouchableOpacity
                            onPress={() => router.push('/playlists')}
                        >
                            <CustomText className="text-base text-[#1E1E1E] font-semibold">
                                See all
                            </CustomText>
                        </TouchableOpacity>

                    </View>


                    {/* //show list of track single track item styles:  flexrow fullwidth with 3 cols image on left side and title and then play icon   91.06px background linear gradient #31170C right to left   */}
                    {/* playlistTrack */}
                    <View className="flex-col gap-4 mt-4">
                        {playlistTrack.map((track) => (
                            <Pressable
                                key={track.id}
                                onPress={() => router.push('/playlists')}
                                className="flex-row  items-center w-full h-[91.06px] rounded-[9px] overflow-hidden"
                            >
                                <LinearGradient
                                    colors={['rgba(49,23,12,0.9)', 'rgba(0,0,0,0.05)']}
                                    // Darker to lighter
                                    start={{ x: 0, y: 0 }}           // Left
                                    end={{ x: 1, y: 0 }}             // Right
                                    className="absolute w-full h-full"
                                />
                                <View className="flex-row gap-5 items-center w-full px-4">
                                    <Image
                                        source={track.image}
                                        className="w-16 h-16 rounded-[9px]"
                                    />
                                    <View className="flex-1 flex-col ">
                                        <CustomText className="text-sm text-white font-semibold">
                                            {track.title}
                                        </CustomText>
                                        <View className="flex-row items-center">
                                            <FontAwesome5 name="clock" size={12} color="#fff" />
                                            <CustomText className="text-xs text-white font-semibold ml-1">
                                                {track.duration}
                                            </CustomText>
                                        </View>

                                    </View>
                                    <FontAwesome5 name="play" size={20} color="#fff" />
                                </View>
                            </Pressable>
                        ))}
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView >
    );
}
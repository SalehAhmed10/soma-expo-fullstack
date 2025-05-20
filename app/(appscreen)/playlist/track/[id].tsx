// import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import CustomText from '@/components/CustomText';
// import { Feather } from '@expo/vector-icons';
// import { router } from 'expo-router';

// const { width, height } = Dimensions.get('window');

// export default function TrackDetail() {
//     return (
//         <View className="flex-1 bg-[#06171E]">
//             {/* Background Image with Gradient */}
//             <Image
//                 className='h-full'
//                 source={require('@/assets/images/soma/playlistimages/trackbgimage.png')}
//                 style={{
//                     width,
//                     // height: height * 0.6,
//                     position: 'absolute',
//                     top: 0,
//                 }}
//             />
//             <LinearGradient
//                 colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
//                 style={{
//                     width,
//                     height: height * 0.6,
//                     position: 'absolute',
//                     // top: 0,
//                     bottom: 0,
//                 }}
//             />

//             {/* Header */}
//             <View className="px-6 pt-12 mt-8 flex-row justify-between items-center">
//                 <View className="flex-row items-center">
//                     <TouchableOpacity
//                         onPress={() => router.back()}
//                         className="mr-4"
//                     >
//                         <Feather name="arrow-left" size={24} color="white" />
//                     </TouchableOpacity>
//                     <View>

//                         <CustomText className="text-base font-bold text-white">
//                             Now Playing
//                         </CustomText>
//                     </View>
//                 </View>
//                 <TouchableOpacity>
//                     <Feather name="more-vertical" size={24} color="white" />
//                 </TouchableOpacity>
//             </View>

//             {/* Title Section */}
//             <View className="flex-1 justify-center items-center">
//                 <CustomText className="text-2xl font-bold text-white">
//                     Energy Morning
//                 </CustomText>
//                 <CustomText className="text-base text-white opacity-60 mt-2">
//                     Gabs
//                 </CustomText>
//             </View>

//             {/* Track Controls */}
//             <View className="px-6 pb-12">
//                 {/* Volume and Loop Row */}
//                 <View className="flex-row justify-between mb-8">
//                     <TouchableOpacity>
//                         <Feather name="volume-2" size={24} color="#CCB19D" />
//                     </TouchableOpacity>
//                     <View className="flex-row gap-6">
//                         <TouchableOpacity>
//                             <Feather name="repeat" size={24} color="#CCB19D" />
//                         </TouchableOpacity>
//                         <TouchableOpacity>
//                             <Feather name="shuffle" size={24} color="#CCB19D" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Progress Bar */}
//                 <View className="mb-8">
//                     <View className="h-1 bg-[#CCB19D]/20 rounded-full mb-2">
//                         <View className="h-1 bg-[#834518] rounded-full" style={{ width: '30%' }} />
//                     </View>
//                     <View className="flex-row justify-between">
//                         <CustomText className="text-sm text-[#CCB19D]">00:50</CustomText>
//                         <CustomText className="text-sm text-[#CCB19D]">04:00</CustomText>
//                     </View>
//                 </View>

//                 {/* Playback Controls */}
//                 <View className="flex-row justify-center items-center gap-12 mb-12">
//                     <TouchableOpacity>
//                         <Feather name="skip-back" size={24} color="#CCB19D" />
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                         <View className="w-16 h-16 bg-[#CCB19D] rounded-full items-center justify-center">
//                             <Feather name="pause" size={32} color="#06171E" />
//                         </View>
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                         <Feather name="skip-forward" size={24} color="#CCB19D" />
//                     </TouchableOpacity>
//                 </View>

//                 {/* Adjust Sound Button */}
//                 <TouchableOpacity
//                     className="h-[50px] border border-[#CCB19D] rounded-full items-center justify-center"
//                     onPress={() => router.push('/mymat/soundlevel')}
//                 >
//                     <CustomText className="text-[#CCB19D]">
//                         Adjust Sound
//                     </CustomText>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }


// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { View, Image, TouchableOpacity, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import CustomText from '@/components/CustomText';
// import { Feather } from '@expo/vector-icons';
// import { useAudioPlayer, AudioStatus } from 'expo-audio';
// import Slider from '@react-native-community/slider';
// import { useLocalSearchParams, router } from 'expo-router';

// const { width, height } = Dimensions.get('window');

// export default function TrackDetail() {
//     // Get params from navigation
//     const { id, name, description, image } = useLocalSearchParams();

//     // Replace with your real audio URI logic
//     const audioUri = 'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3';

//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isBuffering, setIsBuffering] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

//     const player = useAudioPlayer(audioUri);
//     const playerRef = useRef(player);

//     useEffect(() => {
//         setHasLoadedOnce(false);
//     }, [audioUri]);

//     useEffect(() => {
//         playerRef.current = player;
//         const updateStatus = (status: AudioStatus) => {
//             if (status.isLoaded) {
//                 setIsLoading(false);
//                 setHasLoadedOnce(true);
//                 setDuration(status.duration);
//                 setCurrentTime(status.currentTime);
//                 setIsBuffering(status.isBuffering ?? false);
//             } else {
//                 setIsBuffering(false);
//             }
//         };
//         player.addListener('playbackStatusUpdate', updateStatus);
//         return () => {
//             player.removeListener('playbackStatusUpdate', updateStatus);
//         };
//     }, [player]);

//     const handlePlayPause = useCallback(async () => {
//         if (player) {
//             try {
//                 if (isPlaying) {
//                     await player.pause();
//                     setIsPlaying(false);
//                 } else {
//                     await player.play();
//                     setIsPlaying(true);
//                 }
//             } catch (error) {
//                 console.warn('Error toggling playback:', error);
//             }
//         }
//     }, [player, isPlaying]);

//     const handleSliderValueChange = (value: number) => {
//         setCurrentTime(value);
//     };

//     const handleSlidingComplete = async (value: number) => {
//         if (player) {
//             try {
//                 await player.seekTo(value);
//             } catch (error) {
//                 console.warn('Error seeking audio:', error);
//             }
//         }
//     };

//     const formatTime = (seconds: number) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = Math.floor(seconds % 60);
//         return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//     };

//     return (
//         <View className="flex-1 bg-[#06171E]">
//             {/* Background Image with Gradient */}
//             <Image
//                 className="h-full"
//                 source={Array.isArray(image) ? { uri: image[0] } : typeof image === 'string' ? { uri: image } : image}
//                 style={{
//                     width,
//                     position: 'absolute',
//                     top: 0,
//                 }}
//             />
//             <LinearGradient
//                 colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
//                 style={{
//                     width,
//                     height: height * 0.6,
//                     position: 'absolute',
//                     bottom: 0,
//                 }}
//             />

//             {/* Header */}
//             <View className="px-6 pt-12 mt-8 flex-row justify-between items-center">
//                 <View className="flex-row items-center">
//                     <TouchableOpacity
//                         onPress={() => router.back()}
//                         className="mr-4"
//                     >
//                         <Feather name="arrow-left" size={24} color="white" />
//                     </TouchableOpacity>
//                     <View>
//                         <CustomText className="text-base font-bold text-white">
//                             Now Playing
//                         </CustomText>
//                     </View>
//                 </View>
//                 <TouchableOpacity>
//                     <Feather name="more-vertical" size={24} color="white" />
//                 </TouchableOpacity>
//             </View>

//             {/* Title Section */}
//             <View className="flex-1 justify-center items-center">
//                 <CustomText className="text-2xl font-bold text-white">
//                     {name}
//                 </CustomText>
//                 <CustomText className="text-base text-white opacity-60 mt-2">
//                     {description}
//                 </CustomText>
//             </View>

//             {/* Track Controls */}
//             <View className="px-6 pb-12">
//                 {/* Volume and Loop Row */}
//                 <View className="flex-row justify-between mb-8">
//                     <TouchableOpacity>
//                         <Feather name="volume-2" size={24} color="#CCB19D" />
//                     </TouchableOpacity>
//                     <View className="flex-row gap-6">
//                         <TouchableOpacity>
//                             <Feather name="repeat" size={24} color="#CCB19D" />
//                         </TouchableOpacity>
//                         <TouchableOpacity>
//                             <Feather name="shuffle" size={24} color="#CCB19D" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Progress Bar with Real Audio */}
//                 <View className="mb-8">
//                     <Slider
//                         style={{ width: '100%', height: 30 }}
//                         minimumValue={0}
//                         maximumValue={duration || 1}
//                         value={currentTime}
//                         onValueChange={handleSliderValueChange}
//                         onSlidingComplete={handleSlidingComplete}
//                         minimumTrackTintColor="#834518"
//                         maximumTrackTintColor="#CCB19D"
//                         thumbTintColor="#834518"
//                         disabled={isLoading}
//                     />
//                     {isBuffering && (
//                         <ActivityIndicator
//                             size="small"
//                             color="#834518"
//                             style={{ position: 'absolute', right: 0, top: 8 }}
//                         />
//                     )}
//                     <View className="flex-row justify-between">
//                         <CustomText className="text-sm text-[#CCB19D]">
//                             {formatTime(currentTime)}
//                         </CustomText>
//                         <CustomText className="text-sm text-[#CCB19D]">
//                             {formatTime(duration)}
//                         </CustomText>
//                     </View>
//                 </View>

//                 {/* Playback Controls */}
//                 <View className="flex-row justify-center items-center gap-12 mb-12">
//                     <TouchableOpacity disabled={isLoading}>
//                         <Feather name="skip-back" size={24} color="#CCB19D" />
//                     </TouchableOpacity>
//                     <TouchableOpacity disabled={isLoading} onPress={handlePlayPause}>
//                         <View className="w-16 h-16 bg-[#CCB19D] rounded-full items-center justify-center">
//                             {isPlaying ? (
//                                 <Feather name="pause" size={32} color="#06171E" />
//                             ) : (
//                                 <Feather name="play" size={32} color="#06171E" />
//                             )}
//                         </View>
//                     </TouchableOpacity>
//                     <TouchableOpacity disabled={isLoading}>
//                         <Feather name="skip-forward" size={24} color="#CCB19D" />
//                     </TouchableOpacity>
//                 </View>

//                 {/* Adjust Sound Button */}
//                 <TouchableOpacity
//                     className="h-[50px] border border-[#CCB19D] rounded-full items-center justify-center"
//                     onPress={() => router.push('/mymat/soundlevel')}
//                 >
//                     <CustomText className="text-[#CCB19D]">
//                         Adjust Sound
//                     </CustomText>
//                 </TouchableOpacity>
//             </View>

//             {/* Loading Overlay */}
//             {!hasLoadedOnce && (
//                 <View style={{
//                     ...StyleSheet.absoluteFillObject,
//                     backgroundColor: 'rgba(6,23,30,0.7)',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     zIndex: 10,
//                 }}>
//                     <ActivityIndicator size="large" color="#834518" />
//                 </View>
//             )}
//         </View>
//     );
// }


import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Image, TouchableOpacity, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '@/components/CustomText';
import { Feather } from '@expo/vector-icons';
import { useAudioPlayer, AudioStatus } from 'expo-audio';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams, router } from 'expo-router';
import { playlistCategories } from '@/constants/data';

const { width, height } = Dimensions.get('window');

export default function TrackDetail() {
    // Get params from navigation
    const { id } = useLocalSearchParams();

    // Find the playlist item by id
    const playlistItem = playlistCategories
        .flatMap(cat => cat.playlists)
        .find(item => String(item.id) === String(id));

    // Fallbacks if not found
    const name = playlistItem?.name || 'Unknown';
    const description = playlistItem?.description || '';
    const image = playlistItem?.image;

    // Replace with your real audio URI logic if you have per-track audio
    const audioUri = 'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3';

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const player = useAudioPlayer(audioUri);
    const playerRef = useRef(player);

    useEffect(() => {
        setHasLoadedOnce(false);
    }, [audioUri]);

    useEffect(() => {
        playerRef.current = player;
        const updateStatus = (status: AudioStatus) => {
            if (status.isLoaded) {
                setIsLoading(false);
                setHasLoadedOnce(true);
                setDuration(status.duration);
                setCurrentTime(status.currentTime);
                setIsBuffering(status.isBuffering ?? false);
            } else {
                setIsBuffering(false);
            }
        };
        player.addListener('playbackStatusUpdate', updateStatus);
        return () => {
            player.removeListener('playbackStatusUpdate', updateStatus);
        };
    }, [player]);

    const handlePlayPause = useCallback(async () => {
        if (player) {
            try {
                if (isPlaying) {
                    await player.pause();
                    setIsPlaying(false);
                } else {
                    await player.play();
                    setIsPlaying(true);
                }
            } catch (error) {
                console.warn('Error toggling playback:', error);
            }
        }
    }, [player, isPlaying]);

    const handleSliderValueChange = (value: number) => {
        setCurrentTime(value);
    };

    const handleSlidingComplete = async (value: number) => {
        if (player) {
            try {
                await player.seekTo(value);
            } catch (error) {
                console.warn('Error seeking audio:', error);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <View className="flex-1 bg-[#06171E]">
            {/* Background Image with Gradient */}
            <Image
                className="h-full"
                source={image}
                style={{
                    width,
                    position: 'absolute',
                    top: 0,
                }}
            />
            <LinearGradient
                colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
                style={{
                    width,
                    height: height * 0.6,
                    position: 'absolute',
                    bottom: 0,
                }}
            />

            {/* Header */}
            <View className="px-6 pt-12 mt-8 flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <View>
                        <CustomText className="text-base font-bold text-white">
                            Now Playing
                        </CustomText>
                    </View>
                </View>
                <TouchableOpacity>
                    <Feather name="more-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Title Section */}
            <View className="flex-1 justify-center items-center">
                <CustomText className="text-2xl font-bold text-white">
                    {name}
                </CustomText>
                <CustomText className="text-base text-white opacity-60 mt-2">
                    {description}
                </CustomText>
            </View>

            {/* Track Controls */}
            <View className="px-6 pb-12">
                {/* Volume and Loop Row */}
                <View className="flex-row justify-between mb-8">
                    <TouchableOpacity>
                        <Feather name="volume-2" size={24} color="#CCB19D" />
                    </TouchableOpacity>
                    <View className="flex-row gap-6">
                        <TouchableOpacity>
                            <Feather name="repeat" size={24} color="#CCB19D" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="shuffle" size={24} color="#CCB19D" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Progress Bar with Real Audio */}
                <View className="mb-8">
                    <Slider
                        style={{ width: '100%', height: 30 }}
                        minimumValue={0}
                        maximumValue={duration || 1}
                        value={currentTime}
                        onValueChange={handleSliderValueChange}
                        onSlidingComplete={handleSlidingComplete}
                        minimumTrackTintColor="#834518"
                        maximumTrackTintColor="#CCB19D"
                        thumbTintColor="#834518"
                        disabled={isLoading}
                    />
                    {isBuffering && (
                        <ActivityIndicator
                            size="small"
                            color="#834518"
                            style={{ position: 'absolute', right: 0, top: 8 }}
                        />
                    )}
                    <View className="flex-row justify-between">
                        <CustomText className="text-sm text-[#CCB19D]">
                            {formatTime(currentTime)}
                        </CustomText>
                        <CustomText className="text-sm text-[#CCB19D]">
                            {formatTime(duration)}
                        </CustomText>
                    </View>
                </View>

                {/* Playback Controls */}
                <View className="flex-row justify-center items-center gap-12 mb-12">
                    <TouchableOpacity disabled={isLoading}>
                        <Feather name="skip-back" size={24} color="#CCB19D" />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={isLoading} onPress={handlePlayPause}>
                        <View className="w-16 h-16 bg-[#CCB19D] rounded-full items-center justify-center">
                            {isPlaying ? (
                                <Feather name="pause" size={32} color="#06171E" />
                            ) : (
                                <Feather name="play" size={32} color="#06171E" />
                            )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={isLoading}>
                        <Feather name="skip-forward" size={24} color="#CCB19D" />
                    </TouchableOpacity>
                </View>

                {/* Adjust Sound Button */}
                <TouchableOpacity
                    className="h-[50px] border border-[#CCB19D] rounded-full items-center justify-center"
                    onPress={() => router.push('/mymat/soundlevel')}
                >
                    <CustomText className="text-[#CCB19D]">
                        Adjust Sound
                    </CustomText>
                </TouchableOpacity>
            </View>

            {/* Loading Overlay */}
            {!hasLoadedOnce && (
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(6,23,30,0.7)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                }}>
                    <ActivityIndicator size="large" color="#834518" />
                </View>
            )}
        </View>
    );
}
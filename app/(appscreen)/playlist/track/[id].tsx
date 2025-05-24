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


// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { View, Image, TouchableOpacity, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import CustomText from '@/components/CustomText';
// import { Feather } from '@expo/vector-icons';
// import { useAudioPlayer, AudioStatus } from 'expo-audio';
// import Slider from '@react-native-community/slider';
// import { useLocalSearchParams, router } from 'expo-router';
// import { playlistCategories } from '@/constants/data';

// const { width, height } = Dimensions.get('window');

// export default function TrackDetail() {
//     // Get params from navigation
//     const { id } = useLocalSearchParams();

//     // Find the playlist item by id
//     const playlistItem = playlistCategories
//         .flatMap(cat => cat.playlists)
//         .find(item => String(item.id) === String(id));

//     // Fallbacks if not found
//     const name = playlistItem?.name || 'Unknown';
//     const description = playlistItem?.description || '';
//     const image = playlistItem?.image;

//     // Replace with your real audio URI logic if you have per-track audio
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
//                 source={image}
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
import { View, TouchableOpacity, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '@/components/CustomText';
import { Feather } from '@expo/vector-icons';
import { useAudioPlayer, AudioStatus } from 'expo-audio';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams, router } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import { BLURHASH_PLACEHOLDER } from '@/constants/uiConstants';
import api from '@/utils/api';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface TrackData {
    id: string;
    title: string;
    description: string | null;
    duration: number;
    intention: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
    playlistName?: string;
}

export default function TrackDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();

    // Track data states
    const [trackData, setTrackData] = useState<TrackData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Audio player states
    const [audioUri, setAudioUri] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    // ✅ Move useAudioPlayer to component level with initial empty string
    const player = useAudioPlayer(audioUri);

    // Fetch track data from API
    useEffect(() => {
        if (id) {
            fetchTrackData();
        }
    }, [id]);

    // ✅ Set up audio player listeners when audioUri changes
    useEffect(() => {
        if (!audioUri) return;

        setHasLoadedOnce(false);
        setIsAudioLoading(true);

        const updateStatus = (status: AudioStatus) => {
            console.log('Audio status update:', status);

            if (status.isLoaded) {
                setIsAudioLoading(false);
                setHasLoadedOnce(true);
                setDuration(status.duration || 0);
                setCurrentTime(status.currentTime || 0);
                setIsBuffering(status.isBuffering ?? false);
            } else {
                setIsBuffering(false);
            }
        };

        player.addListener('playbackStatusUpdate', updateStatus);

        return () => {
            player.removeListener('playbackStatusUpdate', updateStatus);
        };
    }, [audioUri, player]);

    const fetchTrackData = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching track detail for ID:', id);

            const response = await api.get(`/track/${id}`);

            if (response.data.success) {
                const track = response.data.data;
                console.log('Track detail response:', track);
                setTrackData(track);

                // ✅ Set audio URI which will trigger useEffect to initialize player
                if (track.fileUrl) {
                    console.log('Setting audio URI:', track.fileUrl);
                    setAudioUri(track.fileUrl);
                } else {
                    setError('No audio file available for this track');
                    setIsAudioLoading(false);
                }
            } else {
                throw new Error(response.data.error || 'Failed to fetch track');
            }
        } catch (err: any) {
            console.error('Error fetching track:', err);
            setError(err.message || 'Failed to load track');
        } finally {
            setLoading(false);
        }
    };

    const handlePlayPause = useCallback(async () => {
        if (player && trackData?.fileUrl && audioUri) {
            try {
                if (isPlaying) {
                    await player.pause();
                    setIsPlaying(false);
                } else {
                    await player.play();
                    setIsPlaying(true);
                }
            } catch (error) {
                console.error('Error toggling playback:', error);
            }
        }
    }, [player, isPlaying, trackData, audioUri]);

    const handleSliderValueChange = (value: number) => {
        setCurrentTime(value);
    };

    const handleSlidingComplete = async (value: number) => {
        if (player && audioUri) {
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

    // Loading state
    if (loading) {
        return (
            <View className="flex-1 bg-[#06171E] justify-center items-center">
                <ActivityIndicator size="large" color="#CCB19D" />
                <CustomText className="text-white mt-4">Loading track...</CustomText>
            </View>
        );
    }

    // Error state
    if (error || !trackData) {
        return (
            <View className="flex-1 bg-[#06171E] justify-center items-center p-6">
                <Feather name="alert-circle" size={48} color="#EF4444" />
                <CustomText className="text-red-500 text-center mt-4 text-lg">
                    {error || 'Track not found'}
                </CustomText>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-[#CCB19D] px-6 py-3 rounded-lg mt-4"
                >
                    <CustomText className="text-[#06171E] font-semibold">
                        Go Back
                    </CustomText>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#06171E]">
            {/* Background Image with Gradient */}
            <ExpoImage
                source={{
                    uri: trackData.thumbnailUrl || 'https://fakeimg.pl/400x400/06171E/E8E1D9?text=♪'
                }}
                style={{
                    width,
                    height,
                    position: 'absolute',
                    top: 0,
                }}
                placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
                contentFit="cover"
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
                        {trackData.playlistName && (
                            <CustomText className="text-sm text-white opacity-60">
                                from {trackData.playlistName}
                            </CustomText>
                        )}
                    </View>
                </View>
                <TouchableOpacity>
                    <Feather name="more-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Title Section */}
            <View className="flex-1 justify-center items-center px-6">
                <CustomText className="text-2xl font-bold text-white text-center">
                    {trackData.title}
                </CustomText>
                {trackData.description && (
                    <CustomText className="text-base text-white opacity-60 mt-2 text-center">
                        {trackData.description}
                    </CustomText>
                )}
                {trackData.intention && (
                    <CustomText className="text-sm text-[#CCB19D] mt-2 text-center italic">
                        {trackData.intention}
                    </CustomText>
                )}
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
                        disabled={isAudioLoading || !audioUri}
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
                    <TouchableOpacity disabled={isAudioLoading || !audioUri}>
                        <Feather name="skip-back" size={24} color="#CCB19D" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={isAudioLoading || !audioUri}
                        onPress={handlePlayPause}
                    >
                        <View className="w-16 h-16 bg-[#CCB19D] rounded-full items-center justify-center">
                            {isAudioLoading ? (
                                <ActivityIndicator size="small" color="#06171E" />
                            ) : isPlaying ? (
                                <Feather name="pause" size={32} color="#06171E" />
                            ) : (
                                <Feather name="play" size={32} color="#06171E" />
                            )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={isAudioLoading || !audioUri}>
                        <Feather name="skip-forward" size={24} color="#CCB19D" />
                    </TouchableOpacity>
                </View>

                {/* Adjust Sound Button */}
                <TouchableOpacity
                    className="h-[50px] border border-[#CCB19D] rounded-full items-center justify-center"
                    onPress={() => router.push('/(appscreen)/mymat/soundlevel')}
                >
                    <CustomText className="text-[#CCB19D]">
                        Adjust Sound
                    </CustomText>
                </TouchableOpacity>
            </View>

            {/* Loading Overlay */}
            {!hasLoadedOnce && audioUri && (
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(6,23,30,0.7)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                }}>
                    <ActivityIndicator size="large" color="#834518" />
                    <CustomText className="text-white mt-4">Loading audio...</CustomText>
                </View>
            )}

            {/* No Audio File Message */}
            {!audioUri && trackData && (
                <View style={{
                    position: 'absolute',
                    bottom: 100,
                    left: 24,
                    right: 24,
                    backgroundColor: 'rgba(239, 68, 68, 0.9)',
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center'
                }}>
                    <Feather name="alert-triangle" size={24} color="white" />
                    <CustomText className="text-white text-center mt-2">
                        No audio file available for this track
                    </CustomText>
                </View>
            )}
        </SafeAreaView>
    );
}
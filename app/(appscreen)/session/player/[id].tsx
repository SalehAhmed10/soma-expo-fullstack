// import { View, SafeAreaView, StatusBar, Pressable, Dimensions } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import { VideoView, useVideoPlayer } from 'expo-video';
// import { FontAwesome5 } from '@expo/vector-icons';
// import CustomText from '@/components/CustomText';
// import { useState, useEffect, useRef } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as ScreenOrientation from 'expo-screen-orientation';

// const { width, height } = Dimensions.get('window');

// export default function VideoPlayerScreen() {
//     const params = useLocalSearchParams();
//     const sessionId = params.id as string;
//     const videoUrl = params.videoUrl as string;
//     const title = params.title as string;
//     const duration = parseInt(params.duration as string) || 0;

//     const [showControls, setShowControls] = useState(true);
//     const [progressBarWidth, setProgressBarWidth] = useState(0);
//     const [screenData, setScreenData] = useState(Dimensions.get('window'));
//     const progressBarRef = useRef<View>(null);

//     // Create video player
//     const player = useVideoPlayer(videoUrl, (player) => {
//         player.loop = false;
//         player.play();
//     });

//     // Handle screen orientation and dimensions
//     useEffect(() => {
//         // Lock to landscape when component mounts
//         const lockOrientation = async () => {
//             try {
//                 await ScreenOrientation.lockAsync(
//                     ScreenOrientation.OrientationLock.LANDSCAPE
//                 );
//             } catch (error) {
//                 console.error('Error locking orientation:', error);
//             }
//         };

//         lockOrientation();

//         // Listen for dimension changes
//         const subscription = Dimensions.addEventListener('change', ({ window }) => {
//             setScreenData(window);
//         });

//         // Cleanup: unlock orientation when component unmounts
//         return () => {
//             subscription?.remove();
//             ScreenOrientation.unlockAsync().catch(console.error);
//         };
//     }, []);

//     // Auto-hide controls after 3 seconds
//     useEffect(() => {
//         if (showControls) {
//             const timer = setTimeout(() => {
//                 setShowControls(false);
//             }, 4000);
//             return () => clearTimeout(timer);
//         }
//     }, [showControls]);

//     // Format time for display
//     const formatTime = (seconds: number) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = Math.floor(seconds % 60);
//         return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//     };

//     // Toggle play/pause
//     const togglePlayPause = () => {
//         if (player.playing) {
//             player.pause();
//         } else {
//             player.play();
//         }
//         setShowControls(true);
//     };

//     // Seek video
//     const seekVideo = (seconds: number) => {
//         const newPosition = Math.max(0, Math.min(player.duration || duration, player.currentTime + seconds));
//         player.currentTime = newPosition;
//         setShowControls(true);
//     };

//     // Handle progress bar press for seeking
//     const handleProgressBarPress = (event: any) => {
//         const { locationX } = event.nativeEvent;
//         const barWidth = progressBarWidth || (screenData.width - 120);
//         const seekPercentage = locationX / barWidth;
//         const seekTime = seekPercentage * (player.duration || duration);

//         player.currentTime = Math.max(0, Math.min(player.duration || duration, seekTime));
//         setShowControls(true);
//     };

//     // Handle back navigation
//     const handleBack = async () => {
//         try {
//             player.pause();
//             await ScreenOrientation.unlockAsync();
//             router.back();
//         } catch (error) {
//             console.error('Error unlocking orientation:', error);
//             router.back();
//         }
//     };

//     return (
//         <View className="flex-1 bg-black">
//             <StatusBar hidden />

//             <Pressable
//                 className="flex-1"
//                 onPress={() => setShowControls(!showControls)}
//             >
//                 {/* Video Player - FIXED: Hide built-in controls */}
//                 <VideoView
//                     style={{
//                         flex: 1,
//                         width: screenData.width,
//                         height: screenData.height
//                     }}
//                     player={player}
//                     allowsFullscreen={false}  // Disable built-in fullscreen
//                     allowsPictureInPicture={false}  // Disable PiP to avoid conflicts
//                     showsTimecodes={false}  // Hide built-in time display
//                     nativeControls={false}  // KEY FIX: Hide built-in controls
//                 />

//                 {/* Custom Controls Overlay */}
//                 {showControls && (
//                     <>
//                         {/* Top Controls */}
//                         <LinearGradient
//                             colors={['rgba(0,0,0,0.8)', 'transparent']}
//                             className="absolute top-0 left-0 right-0 h-20 justify-start pt-4"
//                         >
//                             <View className="flex-row items-center justify-between px-6">
//                                 <Pressable
//                                     onPress={handleBack}
//                                     className="w-12 h-12 rounded-full bg-black/50 items-center justify-center"
//                                 >
//                                     <FontAwesome5 name="arrow-left" size={24} color="white" />
//                                 </Pressable>

//                                 <View className="flex-1 mx-4">
//                                     <CustomText className="text-white text-xl font-semibold" numberOfLines={1}>
//                                         {title}
//                                     </CustomText>
//                                 </View>

//                                 {/* Settings or menu */}
//                                 <Pressable
//                                     onPress={() => {
//                                         setShowControls(true);
//                                         // Add any settings logic here
//                                     }}
//                                     className="w-12 h-12 rounded-full bg-black/50 items-center justify-center"
//                                 >
//                                     <FontAwesome5 name="ellipsis-v" size={20} color="white" />
//                                 </Pressable>
//                             </View>
//                         </LinearGradient>

//                         {/* Center Play/Pause Button */}
//                         <View className="absolute inset-0 items-center justify-center">
//                             <Pressable
//                                 onPress={togglePlayPause}
//                                 className="w-20 h-20 rounded-full bg-black/50 items-center justify-center"
//                             >
//                                 <FontAwesome5
//                                     name={player.playing ? "pause" : "play"}
//                                     size={28}
//                                     color="white"
//                                     style={{ marginLeft: player.playing ? 0 : 4 }}
//                                 />
//                             </Pressable>
//                         </View>

//                         {/* Bottom Controls */}
//                         <LinearGradient
//                             colors={['transparent', 'rgba(0,0,0,0.8)']}
//                             className="absolute bottom-0 left-0 right-0 h-24 justify-end pb-4"
//                         >
//                             <View className="px-6">
//                                 {/* Seek Controls */}
//                                 <View className="flex-row items-center justify-center mb-3">
//                                     <Pressable
//                                         onPress={() => seekVideo(-10)}
//                                         className="w-14 h-14 rounded-full bg-black/50 items-center justify-center mx-6"
//                                     >
//                                         <FontAwesome5 name="backward" size={18} color="white" />
//                                     </Pressable>

//                                     <Pressable
//                                         onPress={togglePlayPause}
//                                         className="w-16 h-16 rounded-full bg-white items-center justify-center mx-6"
//                                     >
//                                         <FontAwesome5
//                                             name={player.playing ? "pause" : "play"}
//                                             size={22}
//                                             color="black"
//                                             style={{ marginLeft: player.playing ? 0 : 3 }}
//                                         />
//                                     </Pressable>

//                                     <Pressable
//                                         onPress={() => seekVideo(10)}
//                                         className="w-14 h-14 rounded-full bg-black/50 items-center justify-center mx-6"
//                                     >
//                                         <FontAwesome5 name="forward" size={18} color="white" />
//                                     </Pressable>
//                                 </View>

//                                 {/* Progress Bar */}
//                                 <View className="flex-row items-center">
//                                     <CustomText className="text-white text-sm mr-3">
//                                         {formatTime(player.currentTime || 0)}
//                                     </CustomText>

//                                     <Pressable
//                                         ref={progressBarRef}
//                                         className="flex-1 h-6 justify-center mx-3"
//                                         onPress={handleProgressBarPress}
//                                         onLayout={(event) => {
//                                             setProgressBarWidth(event.nativeEvent.layout.width);
//                                         }}
//                                     >
//                                         <View className="h-2 bg-white/30 rounded-full">
//                                             <View
//                                                 className="h-full bg-white rounded-full"
//                                                 style={{
//                                                     width: player.duration > 0
//                                                         ? `${(player.currentTime / player.duration) * 100}%`
//                                                         : '0%'
//                                                 }}
//                                             />
//                                         </View>
//                                     </Pressable>

//                                     <CustomText className="text-white text-sm ml-3">
//                                         {formatTime(player.duration || duration)}
//                                     </CustomText>
//                                 </View>
//                             </View>
//                         </LinearGradient>
//                     </>
//                 )}
//             </Pressable>
//         </View>
//     );
// }

import { View, SafeAreaView, StatusBar, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { VideoView, useVideoPlayer, VideoPlayer } from 'expo-video'; // VideoPlayer type might still be useful for player.* properties
import { FontAwesome5 } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import { useState, useEffect, useRef, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function VideoPlayerScreen() {
    const params = useLocalSearchParams();
    const videoUrl = params.videoUrl as string;
    const title = params.title as string;
    const initialDuration = parseInt(params.duration as string) || 0;

    const [showControls, setShowControls] = useState(true);
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [screenData, setScreenData] = useState(Dimensions.get('window'));
    const progressBarRef = useRef<View>(null);
    const isMounted = useRef(true);
    const videoViewRef = useRef<VideoView>(null); // Ref for VideoView component

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(initialDuration);
    const [isLoading, setIsLoading] = useState(true);
    const [isPipActive, setIsPipActive] = useState(false);

    const player = useVideoPlayer(videoUrl, (playerInstance) => {
        setTimeout(() => {
            if (isMounted.current && playerInstance) {
                try {
                    playerInstance.loop = false;
                    playerInstance.play();
                    // setIsPlaying(true); // Will be set by RAF or event listener
                    if (playerInstance.duration) {
                        setVideoDuration(playerInstance.duration);
                    }
                } catch (error) {
                    console.error('Error initializing player playback:', error);
                } finally {
                    if (isMounted.current) setIsLoading(false);
                }
            } else {
                if (isMounted.current) setIsLoading(false);
            }
        }, 0);
    });

    useEffect(() => {
        isMounted.current = true;
        const lockOrientation = async () => {
            try {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            } catch (error) {
                console.error('Error locking orientation:', error);
            }
        };
        lockOrientation();

        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            if (isMounted.current) setScreenData(window);
        });

        return () => {
            isMounted.current = false;
            subscription?.remove();
            ScreenOrientation.unlockAsync().catch(console.error);
            if (player) {
                try {
                    player.pause();
                } catch (e) {
                    // This warning is hard to avoid if unmount races with player release
                    console.warn("Error pausing player on unmount (may be expected if already released):", e);
                }
            }
        };
    }, [player]);

    useEffect(() => {
        if (!player || isLoading) return;

        let animationFrameId: number | null = null;
        const updatePlayerState = () => {
            if (!isMounted.current || !player) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                return;
            }
            try {
                const currentPlayingState = player.playing;
                const currentVideoTime = player.currentTime;
                const currentVideoDuration = player.duration;
                // PiP status is now handled by VideoView events, not polled here

                if (isMounted.current) {
                    setIsPlaying(currentPlayingState ?? false);
                    setCurrentTime(currentVideoTime ?? 0);
                    if (currentVideoDuration && currentVideoDuration > 0) {
                        setVideoDuration(currentVideoDuration);
                    } else if (videoDuration === 0 && initialDuration > 0) {
                        setVideoDuration(initialDuration);
                    }
                    if (currentVideoDuration && currentVideoTime >= currentVideoDuration - 0.5) {
                        if (!player.loop) setIsPlaying(false);
                    }
                }
            } catch (error) {
                // console.warn('RAF Loop: Error accessing player state:', error);
            }
            if (isMounted.current) {
                animationFrameId = requestAnimationFrame(updatePlayerState);
            }
        };
        animationFrameId = requestAnimationFrame(updatePlayerState);
        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [player, isLoading, initialDuration, videoDuration]);

    useEffect(() => {
        if (showControls && !isLoading) {
            const timer = setTimeout(() => {
                if (isMounted.current) setShowControls(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [showControls, isLoading]);

    const formatTime = useCallback((seconds: number) => {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, []);

    const safePlayerAction = useCallback((action: (p: VideoPlayer) => void) => {
        if (!isMounted.current || !player) {
            // console.warn("Skipping player action: Component not mounted or player not available.");
            return;
        }
        // Using setTimeout can still lead to "shared object released" if component unmounts before timeout.
        // For critical actions, direct call with try-catch might be better if timeout is not strictly needed for threading.
        // However, for general player interactions, this deferral can sometimes help.
        setTimeout(() => {
            if (!isMounted.current || !player) return;
            try {
                action(player);
            } catch (error) {
                console.warn('SafePlayerAction Error (player method):', error);
            }
        }, 0);
    }, [player]);

    const togglePlayPause = useCallback(() => {
        safePlayerAction((p) => {
            if (p.playing) {
                p.pause();
            } else {
                if (p.currentTime >= (p.duration || videoDuration || initialDuration) - 0.5 && (p.duration || videoDuration || initialDuration) > 0) {
                    p.currentTime = 0;
                }
                p.play();
            }
        });
        if (isMounted.current) setShowControls(true);
    }, [safePlayerAction, videoDuration, initialDuration]);

    const seekVideo = useCallback((seconds: number) => {
        const newPosition = Math.max(0, Math.min(videoDuration || initialDuration, currentTime + seconds));
        safePlayerAction((p) => {
            p.currentTime = newPosition;
        });
        if (isMounted.current) setShowControls(true);
    }, [currentTime, videoDuration, initialDuration, safePlayerAction]);

    const handleProgressBarPress = useCallback((event: any) => {
        if ((videoDuration === 0 && initialDuration === 0) || progressBarWidth <= 0) return;
        const { locationX } = event.nativeEvent;
        const barWidth = progressBarWidth;
        const seekPercentage = Math.max(0, Math.min(1, locationX / barWidth));
        const seekTime = seekPercentage * (videoDuration || initialDuration);
        safePlayerAction((p) => {
            p.currentTime = seekTime;
        });
        if (isMounted.current) setShowControls(true);
    }, [progressBarWidth, videoDuration, initialDuration, safePlayerAction]);

    const handleBack = useCallback(async () => {
        if (player) {
            // Try direct pause first, as setTimeout in safePlayerAction might be too late on unmount
            try {
                player.pause();
            } catch (e) {
                console.warn("Direct pause on back failed (may be expected if released):", e);
            }
        }
        try {
            await ScreenOrientation.unlockAsync();
        } catch (error) {
            console.error('Error unlocking orientation on back:', error);
        }
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/sessions');
        }
    }, [player, router]); // Removed safePlayerAction as direct attempt is made

    const handleTogglePip = useCallback(async () => {
        if (!videoViewRef.current) {
            console.warn("VideoView ref not available for PiP action");
            return;
        }
        try {
            if (isPipActive) { // isPipActive is our React state, updated by VideoView events
                await videoViewRef.current.stopPictureInPicture();
                // setIsPipActive(false); // State will be updated by onPictureInPictureStop
            } else {
                await videoViewRef.current.startPictureInPicture();
                // setIsPipActive(true); // State will be updated by onPictureInPictureStart
            }
        } catch (error) {
            console.error("Error toggling PiP:", error);
        }
    }, [isPipActive]); // Depends on our local isPipActive state

    return (
        <View className="flex-1 bg-black">
            <StatusBar hidden />
            <Pressable
                className="flex-1"
                onPress={() => { if (isMounted.current) setShowControls(!showControls); }}
            >
                <VideoView
                    ref={videoViewRef} // Assign ref
                    style={{ flex: 1 }}
                    player={player}
                    allowsFullscreen={false}
                    allowsPictureInPicture={true}
                    showsTimecodes={false}
                    nativeControls={false}
                    onPictureInPictureStart={() => {
                        if (isMounted.current) setIsPipActive(true);
                    }}
                    onPictureInPictureStop={() => {
                        if (isMounted.current) setIsPipActive(false);
                    }}
                />

                {isLoading && (
                    <View className="absolute inset-0 bg-black/50 items-center justify-center">
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}

                {showControls && !isLoading && (
                    <>
                        {/* Top Controls */}
                        <LinearGradient
                            colors={['rgba(0,0,0,0.8)', 'transparent']}
                            className="absolute top-0 left-0 right-0 h-20 justify-start pt-4"
                        >
                            <View className="flex-row items-center justify-between px-6">
                                <Pressable
                                    onPress={handleBack}
                                    className="w-12 h-12 rounded-full bg-black/50 items-center justify-center"
                                >
                                    <FontAwesome5 name="arrow-left" size={24} color="white" />
                                </Pressable>
                                <View className="flex-1 mx-4">
                                    <CustomText className="text-white text-xl font-semibold" numberOfLines={1}>
                                        {title}
                                    </CustomText>
                                </View>
                                <Pressable
                                    onPress={handleTogglePip}
                                    className="w-12 h-12 rounded-full bg-black/50 items-center justify-center mr-2"
                                >
                                    <FontAwesome5 name={isPipActive ? "compress-arrows-alt" : "expand-arrows-alt"} size={20} color="white" />
                                </Pressable>
                                <Pressable
                                    onPress={() => { /* TODO: Settings Modal Logic */ }}
                                    className="w-12 h-12 rounded-full bg-black/50 items-center justify-center"
                                >
                                    <FontAwesome5 name="ellipsis-v" size={20} color="white" />
                                </Pressable>
                            </View>
                        </LinearGradient>

                        {/* Center Play/Pause Button */}
                        <View className="absolute inset-0 items-center justify-center">
                            <Pressable
                                onPress={togglePlayPause}
                                className="w-20 h-20 rounded-full bg-black/50 items-center justify-center"
                            >
                                <FontAwesome5
                                    name={isPlaying ? "pause" : "play"}
                                    size={28}
                                    color="white"
                                    style={{ marginLeft: isPlaying ? 0 : 4 }}
                                />
                            </Pressable>
                        </View>

                        {/* Bottom Controls */}
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            className="absolute bottom-0 left-0 right-0 h-24 justify-end pb-4"
                        >
                            <View className="px-6">
                                <View className="flex-row items-center justify-center mb-3">
                                    <Pressable
                                        onPress={() => seekVideo(-10)}
                                        className="w-14 h-14 rounded-full bg-black/50 items-center justify-center mx-6"
                                    >
                                        <FontAwesome5 name="backward" size={18} color="white" />
                                    </Pressable>
                                    <Pressable
                                        onPress={togglePlayPause}
                                        className="w-16 h-16 rounded-full bg-white items-center justify-center mx-6"
                                    >
                                        <FontAwesome5
                                            name={isPlaying ? "pause" : "play"}
                                            size={22}
                                            color="black"
                                            style={{ marginLeft: isPlaying ? 0 : 3 }}
                                        />
                                    </Pressable>
                                    <Pressable
                                        onPress={() => seekVideo(10)}
                                        className="w-14 h-14 rounded-full bg-black/50 items-center justify-center mx-6"
                                    >
                                        <FontAwesome5 name="forward" size={18} color="white" />
                                    </Pressable>
                                </View>
                                <View className="flex-row items-center">
                                    <CustomText className="text-white text-sm mr-3">
                                        {formatTime(currentTime)}
                                    </CustomText>
                                    <Pressable
                                        ref={progressBarRef}
                                        className="flex-1 h-6 justify-center mx-3"
                                        onPress={handleProgressBarPress}
                                        onLayout={(event) => {
                                            if (isMounted.current) setProgressBarWidth(event.nativeEvent.layout.width);
                                        }}
                                    >
                                        <View className="h-2 bg-white/30 rounded-full">
                                            <View
                                                className="h-full bg-white rounded-full"
                                                style={{
                                                    width: videoDuration > 0
                                                        ? `${(currentTime / videoDuration) * 100}%`
                                                        : '0%'
                                                }}
                                            />
                                        </View>
                                    </Pressable>
                                    <CustomText className="text-white text-sm ml-3">
                                        {formatTime(videoDuration)}
                                    </CustomText>
                                </View>
                            </View>
                        </LinearGradient>
                    </>
                )}
            </Pressable>
        </View>
    );
}
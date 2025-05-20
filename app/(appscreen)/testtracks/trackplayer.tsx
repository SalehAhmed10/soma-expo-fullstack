
// import React, { useEffect, useState, useRef } from 'react';
// import { View, Button, StyleSheet, Text } from 'react-native';
// import { useAudioPlayer, AudioPlayer } from 'expo-audio';

// const audioSource = require('../../../assets/audio/sampleaudio.mp3'); // Replace with your file

// const TrackPlayer = () => {
//     const player = useAudioPlayer(audioSource); // Call useAudioPlayer directly
//     const [isPlaying, setIsPlaying] = useState(false);
//     const playerRef = useRef(player); // Use useRef to hold the player instance
//     const isValidRef = useRef(true); // Track if the component is still valid

//     useEffect(() => {
//         playerRef.current = player; // Update the ref when the player changes

//         return () => {
//             isValidRef.current = false; // Set isValid to false when unmounting
//             if (playerRef.current) {
//                 try {
//                     playerRef.current.release(); // Release the player resources
//                 } catch (error) {
//                     console.warn("Error releasing player:", error);
//                 }
//             }
//         };
//     }, [player]); // Add player to the dependency array

//     const togglePlayback = async () => {
//         if (player) {
//             try {
//                 if (isPlaying) {
//                     await player.pause();
//                 } else {
//                     await player.play();
//                 }
//                 setIsPlaying(!isPlaying);
//             } catch (error) {
//                 console.warn("Error toggling playback:", error);
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlayback} />
//             <Text style={styles.text}>Now Playing: Sample Track</Text>
//         </View>
//     );
// };

// export default TrackPlayer;

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     text: {
//         marginTop: 10,
//         fontSize: 16,
//     },
// });




// components/TrackPlayer.tsx
// import React, { useEffect, useState, useRef } from 'react';
// import { View, Button, StyleSheet, Text } from 'react-native';
// import { Slider } from '@miblanchard/react-native-slider'; // Updated import
// import { useAudioPlayer, AudioPlayer, AudioStatus } from 'expo-audio';

// const audioSource = require('../../../assets/audio/sampleaudio.mp3'); // Replace with your file

// const TrackPlayer = () => {
//     const player = useAudioPlayer(audioSource); // Call useAudioPlayer directly
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [volume, setVolume] = useState(1);
//     const volumeRef = useRef(1); // Use useRef for volume
//     const playerRef = useRef(player); // Use useRef to hold the player instance
//     const isValidRef = useRef(true); // Track if the component is still valid

//     useEffect(() => {
//         playerRef.current = player; // Update the ref when the player changes

//         return () => {
//             isValidRef.current = false; // Set isValid to false when unmounting
//             if (playerRef.current) {
//                 try {
//                     playerRef.current.release(); // Release the player resources
//                 } catch (error) {
//                     console.warn('Error releasing player:', error);
//                 }
//             }
//         };
//     }, [player]); // Add player to the dependency array

//     const togglePlayback = async () => {
//         if (player) {
//             try {
//                 if (isPlaying) {
//                     await player.pause();
//                 } else {
//                     await player.play();
//                 }
//                 setIsPlaying(!isPlaying);
//             } catch (error) {
//                 console.warn('Error toggling playback:', error);
//             }
//         }
//     };

//     const handleVolumeChange = (values: number[]) => {
//         const value = values[0]; // Get the first value from the array
//         const clampedValue = Math.max(0, Math.min(1, value)); // Ensure value is between 0 and 1
//         setVolume(clampedValue);
//         volumeRef.current = clampedValue; // Update useRef
//         player.volume = volumeRef.current; // Update player volume immediately
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}>Now Playing: Sample Track</Text>
//             <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlayback} />

//             <View style={styles.volumeContainer}>
//                 <Text>Volume</Text>
//                 <Slider
//                     containerStyle={styles.volumeSliderContainer} // Use containerStyle
//                     thumbStyle={styles.volumeSliderThumb}       // Use thumbStyle
//                     trackStyle={styles.volumeSliderTrack}       // Use trackStyle
//                     minimumValue={0}
//                     maximumValue={1}
//                     value={volume}
//                     onValueChange={handleVolumeChange}
//                 />
//             </View>
//         </View>
//     );
// };

// export default TrackPlayer;

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     text: {
//         marginTop: 10,
//         fontSize: 16,
//     },
//     volumeContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     volumeSliderContainer: {    // Style for the slider container
//         width: 150,
//     },
//     volumeSliderThumb: {        // Style for the slider thumb
//         width: 20,
//         height: 20,
//         borderRadius: 10,
//         backgroundColor: '#007AFF',
//     },
//     volumeSliderTrack: {        // Style for the slider track
//         height: 2,
//         backgroundColor: '#D3D3D3',
//     },
//     volumeSlider: {
//         width: 150,
//         marginLeft: 10,
//     },
// });

// components/TrackPlayer.tsx best choice working
// import React, {
//     useEffect,
//     useState,
//     useRef,
//     useCallback,
// } from 'react';
// import {
//     View,
//     Button,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     Image,
//     ActivityIndicator,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useAudioPlayer, AudioPlayer, AudioStatus } from 'expo-audio';
// import Slider from '@react-native-community/slider';

// const audioBookPlaylist = [
//     {
//         title: 'Hamlet - Act I',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri:
//             'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
//         imageSource:
//             'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
//     {
//         title: 'Hamlet - Act II',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri:
//             'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
//         imageSource:
//             'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
//     {
//         title: 'Hamlet - Act III',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri:
//             'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
//         imageSource:
//             'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
//     {
//         title: 'Hamlet - Act IV',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri:
//             'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
//         imageSource:
//             'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
//     {
//         title: 'Hamlet - Act V',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri:
//             'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
//         imageSource:
//             'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
// ];

// const TrackPlayer = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isBuffering, setIsBuffering] = useState(false);
//     const [isLoading, setIsLoading] = useState(true); // Added loading state
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const volumeRef = useRef(1);
//     const currentAudio = audioBookPlaylist[currentIndex].uri;
//     const player = useAudioPlayer(currentAudio);
//     const playerRef = useRef(player);

//     useEffect(() => {
//         playerRef.current = player;

//         const updateStatus = (status: AudioStatus) => {
//             if (status.isLoaded) {
//                 setIsLoading(false);
//                 setCurrentTime(status.currentTime);
//                 setDuration(status.duration);
//             } else if (!status.isLoaded) {
//                 setIsLoading(false);
//                 console.log('Error loading audio: Audio failed to load.');
//             }
//         };

//         player.addListener('playbackStatusUpdate', updateStatus);

//         return () => {
//             player.removeListener('playbackStatusUpdate', updateStatus);
//         };
//     }, [player]);

//     const loadAudio = useCallback(() => {
//         // No need to load audio manually with useAudioPlayer
//     }, []);

//     const handlePlayPause = useCallback(async () => {
//         if (player) {
//             try {
//                 if (isPlaying) {
//                     await player.pause();
//                 } else {
//                     await player.play();
//                 }
//                 setIsPlaying(!isPlaying);
//             } catch (error) {
//                 console.warn('Error toggling playback:', error);
//             }
//         }
//     }, [player, isPlaying]);

//     const handlePreviousTrack = useCallback(async () => {
//         if (player) {
//             try {
//                 await player.pause();
//                 setIsPlaying(false);
//                 const newIndex =
//                     currentIndex === 0 ? audioBookPlaylist.length - 1 : currentIndex - 1;
//                 setCurrentIndex(newIndex);
//             } catch (error) {
//                 console.warn('Error playing next track:', error);
//             }
//         }
//     }, [player, currentIndex]);

//     const handleNextTrack = useCallback(async () => {
//         if (player) {
//             try {
//                 await player.pause();
//                 setIsPlaying(false);
//                 const newIndex =
//                     currentIndex < audioBookPlaylist.length - 1 ? currentIndex + 1 : 0;
//                 setCurrentIndex(newIndex);
//             } catch (error) {
//                 console.warn('Error playing next track:', error);
//             }
//         }
//     }, [player, currentIndex]);

//     const formatTime = (seconds: number) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = Math.floor(seconds % 60);
//         return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//     };

//     const renderFileInfo = () => {
//         return player ? (
//             <View style={styles.trackInfo}>
//                 <Text style={[styles.trackInfoText, styles.largeText]}>
//                     {audioBookPlaylist[currentIndex].title}
//                 </Text>
//                 <Text style={[styles.trackInfoText, styles.smallText]}>
//                     {audioBookPlaylist[currentIndex].author}
//                 </Text>
//                 <Text style={[styles.trackInfoText, styles.smallText]}>
//                     {audioBookPlaylist[currentIndex].source}
//                 </Text>
//             </View>
//         ) : null;
//     };

//     return (
//         <View style={styles.container}>
//             <Image
//                 style={styles.albumCover}
//                 source={{ uri: audioBookPlaylist[currentIndex].imageSource }}
//             />

//             {isLoading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <>
//                     <View style={styles.timeContainer}>
//                         <Text style={styles.time}>{formatTime(currentTime)}</Text>
//                         <Text style={styles.time}>{formatTime(duration)}</Text>
//                     </View>
//                     <Slider
//                         style={styles.slider}
//                         minimumValue={0}
//                         maximumValue={duration}
//                         value={currentTime}
//                         onValueChange={() => { }}
//                     />
//                 </>
//             )}

//             <View style={styles.controls}>
//                 <TouchableOpacity style={styles.control} onPress={handlePreviousTrack}>
//                     <Ionicons name="play-skip-back" size={48} color="#444" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.control} onPress={handlePlayPause}>
//                     {isPlaying ? (
//                         <Ionicons name="pause" size={48} color="#444" />
//                     ) : (
//                         <Ionicons name="play" size={48} color="#444" />
//                     )}
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.control} onPress={handleNextTrack}>
//                     <Ionicons name="play-skip-forward" size={48} color="#444" />
//                 </TouchableOpacity>
//             </View>
//             {renderFileInfo()}
//         </View>
//     );
// };

// export default TrackPlayer;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     albumCover: {
//         width: 250,
//         height: 250,
//     },
//     trackInfo: {
//         padding: 40,
//         backgroundColor: '#fff',
//     },
//     trackInfoText: {
//         textAlign: 'center',
//         flexWrap: 'wrap',
//         color: '#550088',
//     },
//     largeText: {
//         fontSize: 22,
//     },
//     smallText: {
//         fontSize: 16,
//     },
//     control: {
//         margin: 20,
//     },
//     controls: {
//         flexDirection: 'row',
//     },
//     timeContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '90%',
//         marginTop: 10,
//     },
//     time: {
//         fontSize: 14,
//     },
//     slider: {
//         width: '90%',
//         marginTop: 10,
//     },
// });


import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, AudioPlayer, AudioStatus } from 'expo-audio';
import Slider from '@react-native-community/slider';

const audioBookPlaylist = [
    {
        title: 'Hamlet - Act I',
        author: 'William Shakespeare',
        source: 'Librivox',
        uri: 'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
        imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
    },
    {
        title: 'Hamlet - Act II',
        author: 'William Shakespeare',
        source: 'Librivox',
        uri: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
        imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
    },
    {
        title: 'Hamlet - Act III',
        author: 'William Shakespeare',
        source: 'Librivox',
        uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
        imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
    },
    {
        title: 'Hamlet - Act IV',
        author: 'William Shakespeare',
        source: 'Librivox',
        uri: 'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
        imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
    },
    {
        title: 'Hamlet - Act V',
        author: 'William Shakespeare',
        source: 'Librivox',
        uri: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
        imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
    },
];

const TrackPlayer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const currentAudio = audioBookPlaylist[currentIndex].uri;
    const player = useAudioPlayer(currentAudio);
    const playerRef = useRef(player);

    useEffect(() => {
        setHasLoadedOnce(false); // Reset when track changes
    }, [currentAudio]);

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
                // Don't set isLoading here, let hasLoadedOnce control overlay
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

    const handlePreviousTrack = useCallback(async () => {
        if (player) {
            try {
                await player.pause();
                setIsPlaying(false);

                const newIndex =
                    currentIndex === 0 ? audioBookPlaylist.length - 1 : currentIndex - 1;
                setCurrentIndex(newIndex);
                setIsLoading(true);
            } catch (error) {
                console.warn('Error playing previous track:', error);
            }
        }
    }, [player, currentIndex]);

    const handleNextTrack = useCallback(async () => {
        if (player) {
            try {
                await player.pause();
                setIsPlaying(false);

                const newIndex =
                    currentIndex < audioBookPlaylist.length - 1 ? currentIndex + 1 : 0;
                setCurrentIndex(newIndex);
                setIsLoading(true);
            } catch (error) {
                console.warn('Error playing next track:', error);
            }
        }
    }, [player, currentIndex]);

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

    const renderFileInfo = () => (
        <View style={styles.trackInfo}>
            <Text style={[styles.trackInfoText, styles.largeText]}>
                {audioBookPlaylist[currentIndex].title}
            </Text>
            <Text style={[styles.trackInfoText, styles.smallText]}>
                {audioBookPlaylist[currentIndex].author}
            </Text>
            <Text style={[styles.trackInfoText, styles.smallText]}>
                {audioBookPlaylist[currentIndex].source}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image
                style={styles.albumCover}
                source={{ uri: audioBookPlaylist[currentIndex].imageSource }}
            />

            <View style={styles.timeContainer}>
                <Text style={styles.time}>{formatTime(currentTime)}</Text>
                <Text style={styles.time}>{formatTime(duration)}</Text>
            </View>
            <View style={styles.sliderRow}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration || 1}
                    value={currentTime}
                    onValueChange={handleSliderValueChange}
                    onSlidingComplete={handleSlidingComplete}
                    disabled={isLoading}
                />
                {isBuffering && (
                    <ActivityIndicator
                        size="small"
                        color="#0000ff"
                        style={styles.bufferingIndicator}
                    />
                )}
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.control} onPress={handlePreviousTrack} disabled={isLoading}>
                    <Ionicons name="play-skip-back" size={48} color={isLoading ? "#ccc" : "#444"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.control} onPress={handlePlayPause} disabled={isLoading}>
                    {isPlaying ? (
                        <Ionicons name="pause" size={48} color={isLoading ? "#ccc" : "#444"} />
                    ) : (
                        <Ionicons name="play" size={48} color={isLoading ? "#ccc" : "#444"} />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.control} onPress={handleNextTrack} disabled={isLoading}>
                    <Ionicons name="play-skip-forward" size={48} color={isLoading ? "#ccc" : "#444"} />
                </TouchableOpacity>
            </View>
            {renderFileInfo()}

            {!hasLoadedOnce && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </View>
    );
};

export default TrackPlayer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumCover: {
        width: 250,
        height: 250,
    },
    trackInfo: {
        padding: 40,
        backgroundColor: '#fff',
    },
    trackInfoText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#550088',
    },
    largeText: {
        fontSize: 22,
    },
    smallText: {
        fontSize: 16,
    },
    control: {
        margin: 20,
    },
    controls: {
        flexDirection: 'row',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 10,
    },
    time: {
        fontSize: 14,
    },
    sliderRow: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    slider: {
        flex: 1,
    },
    bufferingIndicator: {
        marginLeft: 10,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
});



// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import {
//     View,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     Image,
//     ActivityIndicator,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useAudioPlayer, AudioPlayer, AudioStatus } from 'expo-audio';
// import Slider from '@react-native-community/slider';

// const audioBookPlaylist = [
//     {
//         title: 'Hamlet - Act I',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri: 'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
//         imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
//     {
//         title: 'Hamlet - Act II',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
//         imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
//     {
//         title: 'Hamlet - Act III',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
//         imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
//     {
//         title: 'Hamlet - Act IV',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri: 'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
//         imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
//     {
//         title: 'Hamlet - Act V',
//         author: 'William Shakespeare',
//         source: 'Librivox',
//         uri: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
//         imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
//     },
// ];

// const TrackPlayer = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const currentAudio = audioBookPlaylist[currentIndex].uri;
//     const player = useAudioPlayer(currentAudio);
//     const playerRef = useRef(player);

//     useEffect(() => {
//         playerRef.current = player;

//         const updateStatus = (status: AudioStatus) => {
//             if (status.isLoaded) {
//                 setIsLoading(false);
//                 setCurrentTime(status.currentTime);
//                 setDuration(status.duration);
//             } else {
//                 setIsLoading(true);
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
//                 } else {
//                     await player.play();
//                 }
//                 setIsPlaying(!isPlaying);
//             } catch (error) {
//                 console.warn('Error toggling playback:', error);
//             }
//         }
//     }, [player, isPlaying]);

//     const handlePreviousTrack = useCallback(async () => {
//         if (player) {
//             try {
//                 await player.pause();
//                 setIsPlaying(false);
//                 const newIndex =
//                     currentIndex === 0 ? audioBookPlaylist.length - 1 : currentIndex - 1;
//                 setCurrentIndex(newIndex);
//             } catch (error) {
//                 console.warn('Error playing previous track:', error);
//             }
//         }
//     }, [player, currentIndex]);

//     const handleNextTrack = useCallback(async () => {
//         if (player) {
//             try {
//                 await player.pause();
//                 setIsPlaying(false);
//                 const newIndex =
//                     currentIndex < audioBookPlaylist.length - 1 ? currentIndex + 1 : 0;
//                 setCurrentIndex(newIndex);
//             } catch (error) {
//                 console.warn('Error playing next track:', error);
//             }
//         }
//     }, [player, currentIndex]);

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

//     const renderFileInfo = () => {
//         return player ? (
//             <View style={styles.trackInfo}>
//                 <Text style={[styles.trackInfoText, styles.largeText]}>
//                     {audioBookPlaylist[currentIndex].title}
//                 </Text>
//                 <Text style={[styles.trackInfoText, styles.smallText]}>
//                     {audioBookPlaylist[currentIndex].author}
//                 </Text>
//                 <Text style={[styles.trackInfoText, styles.smallText]}>
//                     {audioBookPlaylist[currentIndex].source}
//                 </Text>
//             </View>
//         ) : null;
//     };

//     return (
//         <View style={styles.container}>
//             <Image
//                 style={styles.albumCover}
//                 source={{ uri: audioBookPlaylist[currentIndex].imageSource }}
//             />

//             {isLoading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <>
//                     <View style={styles.timeContainer}>
//                         <Text style={styles.time}>{formatTime(currentTime)}</Text>
//                         <Text style={styles.time}>{formatTime(duration)}</Text>
//                     </View>
//                     <Slider
//                         style={styles.slider}
//                         minimumValue={0}
//                         maximumValue={duration}
//                         value={currentTime}
//                         onValueChange={handleSliderValueChange}
//                         onSlidingComplete={handleSlidingComplete}
//                     />
//                 </>
//             )}

//             <View style={styles.controls}>
//                 <TouchableOpacity style={styles.control} onPress={handlePreviousTrack}>
//                     <Ionicons name="play-skip-back" size={48} color="#444" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.control} onPress={handlePlayPause}>
//                     {isPlaying ? (
//                         <Ionicons name="pause" size={48} color="#444" />
//                     ) : (
//                         <Ionicons name="play" size={48} color="#444" />
//                     )}
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.control} onPress={handleNextTrack}>
//                     <Ionicons name="play-skip-forward" size={48} color="#444" />
//                 </TouchableOpacity>
//             </View>
//             {renderFileInfo()}
//         </View>
//     );
// };

// export default TrackPlayer;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     albumCover: {
//         width: 250,
//         height: 250,
//     },
//     trackInfo: {
//         padding: 40,
//         backgroundColor: '#fff',
//     },
//     trackInfoText: {
//         textAlign: 'center',
//         flexWrap: 'wrap',
//         color: '#550088',
//     },
//     largeText: {
//         fontSize: 22,
//     },
//     smallText: {
//         fontSize: 16,
//     },
//     control: {
//         margin: 20,
//     },
//     controls: {
//         flexDirection: 'row',
//     },
//     timeContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '90%',
//         marginTop: 10,
//     },
//     time: {
//         fontSize: 14,
//     },
//     slider: {
//         width: '90%',
//         marginTop: 10,
//     },
// });
// import { View, Animated, ImageBackground, ScrollView, Pressable, TouchableOpacity, Image } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AntDesign } from '@expo/vector-icons';
// import CustomText from '@/components/CustomText';
// import { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'expo-router';



// interface PlaylistItem {
//     id: number;
//     name: string;
//     description?: string;
//     image?: any;
// }

// interface Category {
//     id: number;
//     name: string;
//     playlists: PlaylistItem[];
// }

// const playlistCategories: Category[] = [
//     {
//         id: 1,
//         name: "Soma Sounds",
//         playlists: [
//             { id: 1, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
//             { id: 2, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
//             { id: 3, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
//             { id: 4, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },

//         ]
//     },
//     {
//         id: 2,
//         name: "Exclusive Release",
//         // randomize 
//         playlists: [

//             { id: 1, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
//             { id: 2, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
//             { id: 3, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
//             { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
//         ]
//     },

//     {
//         id: 3,
//         name: "Soma Playlists",
//         // randomize change order of list 
//         playlists: [
//             { id: 1, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
//             { id: 2, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
//             { id: 3, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
//             { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
//         ]

//     },
//     {
//         id: 4,
//         name: "Morning Playlists",
//         // randomize change order of list
//         playlists: [
//             { id: 1, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
//             { id: 2, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
//             { id: 3, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
//             { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
//         ]

//     }


// ];







// export default function PlaylistsScreen() {
//     // Inside component:
//     const [activeTab, setActiveTab] = useState(0);

//     const router = useRouter();

//     const handlePlaylistPress = (playlist: PlaylistItem) => {
//         router.push({
//             pathname: '/playlist/track/[id]',
//             params: {
//                 id: playlist.id,
//                 name: playlist.name,
//                 description: playlist.description,
//                 image: playlist.image // This works if image is a require() or a string URL
//             }
//         });
//     };

//     // Add inside component, before return:
//     const fadeAnim = useRef(new Animated.Value(1)).current;

//     const handleTabChange = (index: number) => {
//         Animated.sequence([
//             Animated.timing(fadeAnim, {
//                 toValue: 0,
//                 duration: 150,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(fadeAnim, {
//                 toValue: 1,
//                 duration: 150,
//                 useNativeDriver: true,
//             })
//         ]).start();
//         setActiveTab(index);
//     };


//     return (
//         <View className="flex-1 bg-screen-bg">


//             {/* Header Section */}
//             <View className="h-[250px]">
//                 <ImageBackground
//                     source={require("@/assets/images/soma/playlistimages/playlisthomeheader.png")}
//                     className="absolute top-0 left-0 right-0 h-[250px]"
//                 >
//                     <LinearGradient
//                         colors={['rgba(232, 225, 217, 0.1)', 'rgba(232, 225, 217, 0.2)', 'rgba(232, 225, 217, 0.8)']}
//                         className="flex-1 h-[250px] absolute w-full top-0 left-0 right-0"
//                     >
//                         <View className="flex flex-row justify-between items-center px-4 pt-12 mt-8">
//                             <CustomText className="text-2xl font-bold text-white">
//                                 Playlists
//                             </CustomText>
//                             <TouchableOpacity onPress={() => router.push('/playlist/new')}>
//                                 <AntDesign name="pluscircleo" size={24} color="#FFF" />
//                             </TouchableOpacity>
//                         </View>
//                     </LinearGradient>
//                 </ImageBackground>
//             </View>

//             {/* Fixed Tab Navigation */}
//             <View className="px-6 -mt-6 ">
//                 <View className="relative border-b border-gray-300 pb-4">
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         persistentScrollbar={true}
//                         className="flex-row mt-4"
//                         indicatorStyle="black"
//                     >
//                         {playlistCategories.map((category, index) => (
//                             <Pressable
//                                 key={category.id}
//                                 onPress={() => handleTabChange(index)}
//                                 className={`px-4 py-2 mr-2 border-b-2 ${activeTab === index ? "border-dark-brown" : "border-transparent"
//                                     }`}
//                             >
//                                 <CustomText
//                                     className={`text-sm ${activeTab === index ? "text-color-primary font-bold" : "text-gray-500"
//                                         }`}
//                                 >
//                                     {category.name}
//                                 </CustomText>
//                             </Pressable>
//                         ))}
//                     </ScrollView>
//                 </View>
//             </View>

//             {/* Scrollable Content */}
//             <ScrollView className="flex-1 px-6">
//                 <View className="flex-1 mt-4">
//                     <View className="flex-row flex-wrap justify-between">
//                         {playlistCategories[activeTab]?.playlists.map((playlist) => (
//                             <Pressable
//                                 key={playlist.id}
//                                 className="w-[48%] mb-4"
//                                 onPress={() => handlePlaylistPress(playlist)}
//                             >
//                                 <Image
//                                     source={playlist.image}
//                                     className="w-full h-[120px] rounded-lg mb-2"
//                                     resizeMode="cover"
//                                 />
//                                 <CustomText className="text-base truncate">
//                                     {playlist.name}
//                                 </CustomText>
//                             </Pressable>
//                         ))}
//                     </View>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// }

// import { View, Animated, ImageBackground, ScrollView, Pressable, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AntDesign } from '@expo/vector-icons';
// import CustomText from '@/components/CustomText';
// import { useState, useRef, useEffect, useCallback } from 'react';
// import { useRouter } from 'expo-router';
// import { Image as ExpoImage } from 'expo-image';
// import { usePlaylistStore, CategoryPlaylist } from '@/store/playlistStore';
// import { BLURHASH_PLACEHOLDER } from '@/constants/uiConstants';

// interface PlaylistItemProps {
//     playlist: CategoryPlaylist;
//     onPress: () => void;
// }

// const PlaylistItem = ({ playlist, onPress }: PlaylistItemProps) => (
//     <Pressable
//         className="w-[48%] mb-4"
//         onPress={onPress}
//     >
//         <ExpoImage
//             source={{
//                 uri: playlist.image || 'https://fakeimg.pl/300x200?text=Playlist'
//             }}
//             style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }}
//             placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
//             contentFit="cover"
//             transition={300}
//             cachePolicy="memory-disk"
//         />
//         <CustomText className="text-base font-medium text-dark-brown" numberOfLines={1}>
//             {playlist.name}
//         </CustomText>
//         <CustomText className="text-sm text-gray-600 mt-1" numberOfLines={1}>
//             {playlist.trackCount} tracks
//         </CustomText>
//         {playlist.isOwner && (
//             <View className="absolute top-2 right-2 bg-dark-brown px-2 py-1 rounded">
//                 <CustomText className="text-white text-xs font-semibold">
//                     Mine
//                 </CustomText>
//             </View>
//         )}
//     </Pressable>
// );

// const LoadingSkeleton = () => (
//     <View className="flex-row flex-wrap justify-between">
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//             <View key={i} className="w-[48%] mb-4">
//                 <View className="w-full h-[120px] bg-gray-200 rounded-lg mb-2 animate-pulse" />
//                 <View className="h-4 bg-gray-200 rounded mb-1 animate-pulse" />
//                 <View className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
//             </View>
//         ))}
//     </View>
// );

// export default function PlaylistsScreen() {
//     const router = useRouter();
//     const fadeAnim = useRef(new Animated.Value(1)).current;

//     // Store state
//     const {
//         categories,
//         isCategoriesLoading,
//         error,
//         fetchCategoriesWithPlaylists,
//         clearError
//     } = usePlaylistStore();

//     // Local state
//     const [activeTab, setActiveTab] = useState(0);
//     const [refreshing, setRefreshing] = useState(false);

//     // Fetch data on mount
//     useEffect(() => {
//         fetchCategoriesWithPlaylists();
//     }, []);

//     // Handle tab change
//     const handleTabChange = useCallback((index: number) => {
//         Animated.sequence([
//             Animated.timing(fadeAnim, {
//                 toValue: 0,
//                 duration: 150,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(fadeAnim, {
//                 toValue: 1,
//                 duration: 150,
//                 useNativeDriver: true,
//             })
//         ]).start();

//         setActiveTab(index);
//     }, [fadeAnim]);

//     // Handle playlist press
//     const handlePlaylistPress = useCallback((playlist: CategoryPlaylist) => {
//         router.push({
//             pathname: '/(appscreen)/playlist/[id]',
//             params: {
//                 id: playlist.id
//             }
//         });
//     }, [router]);

//     // Handle refresh
//     const onRefresh = useCallback(async () => {
//         setRefreshing(true);
//         clearError();
//         await fetchCategoriesWithPlaylists();
//         setRefreshing(false);
//     }, [fetchCategoriesWithPlaylists, clearError]);

//     // Get current category and its playlists
//     const currentCategory = categories[activeTab];
//     const currentPlaylists = currentCategory?.playlists || [];

//     // Create tab labels
//     const tabLabels = categories.map(cat => cat.name);

//     return (
//         <View className="flex-1 bg-screen-bg">
//             {/* Header Section */}
//             <View className="h-[250px]">
//                 <ImageBackground
//                     source={require("@/assets/images/soma/playlistimages/playlisthomeheader.png")}
//                     className="absolute top-0 left-0 right-0 h-[250px]"
//                 >
//                     <LinearGradient
//                         colors={['rgba(232, 225, 217, 0.1)', 'rgba(232, 225, 217, 0.2)', 'rgba(232, 225, 217, 0.8)']}
//                         className="flex-1 h-[250px] absolute w-full top-0 left-0 right-0"
//                     >
//                         <View className="flex flex-row justify-between items-center px-4 pt-12 mt-8">
//                             <CustomText className="text-2xl font-bold text-white">
//                                 Playlists
//                             </CustomText>
//                             <TouchableOpacity onPress={() => router.push('/(appscreen)/playlist/new')}>
//                                 <AntDesign name="pluscircleo" size={24} color="#FFF" />
//                             </TouchableOpacity>
//                         </View>
//                     </LinearGradient>
//                 </ImageBackground>
//             </View>

//             {/* Fixed Tab Navigation */}
//             <View className="px-6 -mt-6">
//                 <View className="relative border-b border-gray-300 pb-4">
//                     {isCategoriesLoading ? (
//                         <View className="flex-row mt-4">
//                             {[1, 2, 3].map((i) => (
//                                 <View key={i} className="px-4 py-2 mr-2">
//                                     <View className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
//                                 </View>
//                             ))}
//                         </View>
//                     ) : (
//                         <ScrollView
//                             horizontal
//                             showsHorizontalScrollIndicator={false}
//                             className="flex-row mt-4"
//                         >
//                             {tabLabels.map((label, index) => (
//                                 <Pressable
//                                     key={index}
//                                     onPress={() => handleTabChange(index)}
//                                     className={`px-4 py-2 mr-2 border-b-2 ${activeTab === index ? "border-dark-brown" : "border-transparent"
//                                         }`}
//                                 >
//                                     <CustomText
//                                         className={`text-sm ${activeTab === index ? "text-color-primary font-bold" : "text-gray-500"
//                                             }`}
//                                     >
//                                         {label}
//                                     </CustomText>
//                                 </Pressable>
//                             ))}
//                         </ScrollView>
//                     )}
//                 </View>
//             </View>

//             {/* Content */}
//             <ScrollView
//                 className="flex-1 px-6"
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                         colors={["#31170C"]}
//                         tintColor="#31170C"
//                     />
//                 }
//             >
//                 <Animated.View className="flex-1 mt-4" style={{ opacity: fadeAnim }}>
//                     {error ? (
//                         <View className="flex-1 justify-center items-center py-8">
//                             <CustomText className="text-red-500 text-center mb-4">
//                                 {error}
//                             </CustomText>
//                             <TouchableOpacity
//                                 onPress={onRefresh}
//                                 className="bg-dark-brown px-6 py-3 rounded-lg"
//                             >
//                                 <CustomText className="text-white font-semibold">
//                                     Try Again
//                                 </CustomText>
//                             </TouchableOpacity>
//                         </View>
//                     ) : isCategoriesLoading ? (
//                         <LoadingSkeleton />
//                     ) : categories.length === 0 ? (
//                         <View className="flex-1 justify-center items-center py-8">
//                             <CustomText className="text-gray-500 text-center">
//                                 No categories found
//                             </CustomText>
//                         </View>
//                     ) : currentPlaylists.length === 0 ? (
//                         <View className="flex-1 justify-center items-center py-8">
//                             <CustomText className="text-gray-500 text-center">
//                                 No playlists in this category
//                             </CustomText>
//                         </View>
//                     ) : (
//                         <View className="flex-row flex-wrap justify-between">
//                             {currentPlaylists.map((playlist) => (
//                                 <PlaylistItem
//                                     key={playlist.id}
//                                     playlist={playlist}
//                                     onPress={() => handlePlaylistPress(playlist)}
//                                 />
//                             ))}
//                         </View>
//                     )}
//                 </Animated.View>
//             </ScrollView>
//         </View>
//     );
// }

import {
    View,
    Animated,
    ImageBackground,
    ScrollView,
    Pressable,
    TouchableOpacity,
    RefreshControl,
    TextInput,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';
import { usePlaylistStore, CategoryPlaylist } from '@/store/playlistStore';
import { BLURHASH_PLACEHOLDER } from '@/constants/uiConstants';

interface PlaylistItemProps {
    playlist: CategoryPlaylist;
    onPress: () => void;
    onLongPress?: () => void;
}

const PlaylistItem = ({ playlist, onPress, onLongPress }: PlaylistItemProps) => (
    <Pressable
        className="w-[48%] mb-4"
        onPress={onPress}
        onLongPress={onLongPress}
    >
        <View className="relative">
            <ExpoImage
                source={{
                    uri: playlist.image || 'https://fakeimg.pl/300x200/31170C/ffffff?text=Playlist'
                }}
                style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }}
                placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
            />
            {playlist.isOwner && (
                <View className="absolute top-2 right-2 bg-dark-brown/80 px-2 py-1 rounded">
                    <CustomText className="text-white text-xs font-semibold">
                        Mine
                    </CustomText>
                </View>
            )}
            {playlist.trackCount === 0 && (
                <View className="absolute inset-0 bg-black/40 rounded-lg flex justify-center items-center">
                    <AntDesign name="plus" size={24} color="white" />
                    <CustomText className="text-white text-xs mt-1">
                        Add Tracks
                    </CustomText>
                </View>
            )}
        </View>
        <CustomText className="text-base font-medium text-dark-brown" numberOfLines={1}>
            {playlist.name}
        </CustomText>
        <CustomText className="text-sm text-gray-600 mt-1" numberOfLines={1}>
            {playlist.trackCount} {playlist.trackCount === 1 ? 'track' : 'tracks'}
        </CustomText>
        {playlist.description && (
            <CustomText className="text-xs text-gray-500 mt-1" numberOfLines={2}>
                {playlist.description}
            </CustomText>
        )}
    </Pressable>
);

const LoadingSkeleton = () => (
    <View className="flex-row flex-wrap justify-between">
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} className="w-[48%] mb-4">
                <View className="w-full h-[120px] bg-gray-200 rounded-lg mb-2" />
                <View className="h-4 bg-gray-200 rounded mb-1" />
                <View className="h-3 bg-gray-200 rounded w-3/4" />
            </View>
        ))}
    </View>
);

const EmptyState = ({
    title,
    message,
    actionText,
    onAction,
    icon = "folder1"
}: {
    title: string;
    message: string;
    actionText?: string;
    onAction?: () => void;
    icon?: string;
}) => (
    <View className="flex-1 justify-center items-center py-16">
        <AntDesign name={icon as any} size={64} color="#9CA3AF" />
        <CustomText className="text-gray-700 text-xl font-semibold mt-4">
            {title}
        </CustomText>
        <CustomText className="text-gray-500 text-center mt-2 text-base px-8">
            {message}
        </CustomText>
        {actionText && onAction && (
            <TouchableOpacity
                onPress={onAction}
                className="bg-dark-brown px-6 py-3 rounded-lg mt-6"
            >
                <CustomText className="text-white font-semibold">
                    {actionText}
                </CustomText>
            </TouchableOpacity>
        )}
    </View>
);

const SearchBar = ({
    value,
    onChangeText,
    onClear
}: {
    value: string;
    onChangeText: (text: string) => void;
    onClear: () => void;
}) => (
    <View className="px-6 mb-4">
        <View className="relative">
            <TextInput
                className="bg-white border border-gray-300 rounded-lg px-12 py-3 text-dark-brown"
                placeholder="Search playlists..."
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#9CA3AF"
                style={{ fontSize: 16 }}
            />
            <Ionicons
                name="search"
                size={20}
                color="#9CA3AF"
                style={{ position: 'absolute', left: 16, top: 14 }}
            />
            {value.length > 0 && (
                <TouchableOpacity
                    onPress={onClear}
                    style={{ position: 'absolute', right: 16, top: 14 }}
                >
                    <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                </TouchableOpacity>
            )}
        </View>
    </View>
);

export default function PlaylistsScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Store state
    const {
        categories,
        isCategoriesLoading,
        error,
        fetchCategoriesWithPlaylists,
        clearError,
        clearCache
    } = usePlaylistStore();

    // Local state
    const [activeTab, setActiveTab] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Fetch data on mount
    useEffect(() => {
        if (categories.length === 0) {
            fetchCategoriesWithPlaylists();
        }
    }, []);

    // Handle tab change with animation
    const handleTabChange = useCallback((index: number) => {
        if (index === activeTab) return;

        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            })
        ]).start();

        setActiveTab(index);
        setSearchQuery(''); // Clear search when changing tabs
    }, [fadeAnim, activeTab]);

    // Handle playlist press
    const handlePlaylistPress = useCallback((playlist: CategoryPlaylist) => {
        router.push({
            pathname: '/(appscreen)/playlist/[id]',
            params: { id: playlist.id }
        });
    }, [router]);

    // Handle long press for additional options
    const handlePlaylistLongPress = useCallback((playlist: CategoryPlaylist) => {
        if (playlist.isOwner) {
            Alert.alert(
                playlist.name,
                'What would you like to do?',
                [
                    { text: 'Edit', onPress: () => console.log('Edit playlist:', playlist.id) },
                    { text: 'Share', onPress: () => console.log('Share playlist:', playlist.id) },
                    { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete playlist:', playlist.id) },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        } else {
            Alert.alert(
                playlist.name,
                'What would you like to do?',
                [
                    { text: 'Share', onPress: () => console.log('Share playlist:', playlist.id) },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        }
    }, []);

    // Handle refresh
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        clearError();
        try {
            await fetchCategoriesWithPlaylists(false); // Force refresh without cache
        } finally {
            setRefreshing(false);
        }
    }, [fetchCategoriesWithPlaylists, clearError]);

    // Handle cache clear
    const handleClearCache = useCallback(async () => {
        Alert.alert(
            'Clear Cache',
            'Are you sure you want to clear the cached data?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        await clearCache();
                        onRefresh();
                    }
                }
            ]
        );
    }, [clearCache, onRefresh]);

    // Get current category and filter playlists
    const currentCategory = categories[activeTab];
    const allPlaylists = currentCategory?.playlists || [];

    const filteredPlaylists = useMemo(() => {
        if (!searchQuery.trim()) return allPlaylists;

        return allPlaylists.filter(playlist =>
            playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            playlist.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allPlaylists, searchQuery]);

    // Handle search
    const handleSearchChange = useCallback((text: string) => {
        setSearchQuery(text);
    }, []);

    const handleSearchClear = useCallback(() => {
        setSearchQuery('');
    }, []);

    const toggleSearch = useCallback(() => {
        setShowSearch(!showSearch);
        if (showSearch) {
            setSearchQuery('');
        }
    }, [showSearch]);

    return (
        <View className="flex-1 bg-screen-bg">
            {/* Header Section */}
            <View className="h-[250px]">
                <ImageBackground
                    source={require("@/assets/images/soma/playlistimages/playlisthomeheader.png")}
                    className="absolute top-0 left-0 right-0 h-[250px]"
                >
                    <LinearGradient
                        colors={['rgba(232, 225, 217, 0.1)', 'rgba(232, 225, 217, 0.2)', 'rgba(232, 225, 217, 0.8)']}
                        className="flex-1 h-[250px] absolute w-full top-0 left-0 right-0"
                    >
                        <View className="flex flex-row justify-between items-center px-4 pt-12 mt-8">
                            <CustomText className="text-2xl font-bold text-white">
                                Playlists
                            </CustomText>
                            <View className="flex-row gap-3">
                                <TouchableOpacity onPress={toggleSearch}>
                                    <Ionicons name="search" size={24} color="#FFF" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push('/(appscreen)/playlist/new')}>
                                    <AntDesign name="pluscircleo" size={24} color="#FFF" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleClearCache}>
                                    <Ionicons name="refresh" size={24} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {/* Search Bar */}
            {showSearch && (
                <SearchBar
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    onClear={handleSearchClear}
                />
            )}

            {/* Tab Navigation */}
            <View className="px-6 -mt-6">
                <View className="relative border-b border-gray-300 pb-4">
                    {isCategoriesLoading ? (
                        <View className="flex-row mt-4">
                            {[1, 2, 3].map((i) => (
                                <View key={i} className="px-4 py-2 mr-2">
                                    <View className="h-4 w-16 bg-gray-200 rounded" />
                                </View>
                            ))}
                        </View>
                    ) : categories.length > 0 ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="flex-row mt-4"
                        >
                            {categories.map((category, index) => (
                                <Pressable
                                    key={category.id}
                                    onPress={() => handleTabChange(index)}
                                    className={`px-4 py-2 mr-2 border-b-2 ${activeTab === index ? "border-dark-brown" : "border-transparent"
                                        }`}
                                >
                                    <CustomText
                                        className={`text-sm ${activeTab === index ? "text-color-primary font-bold" : "text-gray-500"
                                            }`}
                                    >
                                        {category.name}
                                    </CustomText>
                                    {category.playlists.length > 0 && (
                                        <CustomText
                                            className={`text-xs ${activeTab === index ? "text-color-primary" : "text-gray-400"
                                                }`}
                                        >
                                            {category.playlists.length}
                                        </CustomText>
                                    )}
                                </Pressable>
                            ))}
                        </ScrollView>
                    ) : null}
                </View>
            </View>

            {/* Content */}
            <ScrollView
                className="flex-1 px-6"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#31170C"]}
                        tintColor="#31170C"
                    />
                }
            >
                <Animated.View className="flex-1 mt-4" style={{ opacity: fadeAnim }}>
                    {/* Search Results Header */}
                    {searchQuery.trim().length > 0 && (
                        <View className="mb-4">
                            <CustomText className="text-gray-600 text-sm">
                                {filteredPlaylists.length} result{filteredPlaylists.length !== 1 ? 's' : ''} for "{searchQuery}"
                            </CustomText>
                        </View>
                    )}

                    {error ? (
                        <View className="flex-1 justify-center items-center py-8">
                            <AntDesign name="exclamationcircleo" size={48} color="#EF4444" />
                            <CustomText className="text-red-500 text-center mb-4 mt-4">
                                {error}
                            </CustomText>
                            <TouchableOpacity
                                onPress={onRefresh}
                                className="bg-dark-brown px-6 py-3 rounded-lg"
                            >
                                <CustomText className="text-white font-semibold">
                                    Try Again
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    ) : isCategoriesLoading ? (
                        <LoadingSkeleton />
                    ) : categories.length === 0 ? (
                        <EmptyState
                            title="No Categories Found"
                            message="It looks like there are no playlist categories available yet."
                            actionText="Refresh"
                            onAction={onRefresh}
                        />
                    ) : filteredPlaylists.length === 0 ? (
                        searchQuery.trim().length > 0 ? (
                            <EmptyState
                                title="No Results"
                                message={`No playlists found matching "${searchQuery}"`}
                                icon="search1"
                            />
                        ) : (
                            <EmptyState
                                title="No Playlists Yet"
                                message={`No playlists in ${currentCategory?.name || 'this category'} yet.`}
                                actionText="Create Playlist"
                                onAction={() => router.push('/(appscreen)/playlist/new')}
                            />
                        )
                    ) : (
                        <View className="flex-row flex-wrap justify-between">
                            {filteredPlaylists.map((playlist) => (
                                <PlaylistItem
                                    key={playlist.id}
                                    playlist={playlist}
                                    onPress={() => handlePlaylistPress(playlist)}
                                    onLongPress={() => handlePlaylistLongPress(playlist)}
                                />
                            ))}
                        </View>
                    )}
                </Animated.View>
            </ScrollView>
        </View>
    );
}
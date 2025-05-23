// // use this

// import CustomText from '@/components/CustomText';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useCallback, useRef, useEffect, useState } from 'react';
// import {
//     Animated,
//     Dimensions,
//     FlatList,
//     Image,
//     ImageBackground,
//     ImageSourcePropType,
//     Pressable,
//     SafeAreaView,
//     ScrollView,
//     TouchableOpacity,
//     View,
//     ViewToken
// } from 'react-native';

// const { width } = Dimensions.get('window');

// import CategoryGrid from '@/components/CategoryGrid';
// import { FeaturedProgramType } from '@/constants/data';
// import useAuthStore from '@/store/authStore';

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// const CARD_WIDTH = width - 48;


// export default function HomeScreen() {

//     const { user } = useAuthStore();
//     const [firstName, setFirstName] = useState('User');

//     useEffect(() => {
//         if (user && user.fullName) {
//             // Split the full name into an array of words
//             const nameParts = user.fullName.split(' ');
//             // Take the first word as the first name
//             setFirstName(nameParts[0]);
//         } else {
//             setFirstName('User'); // Default value if no user or fullName
//         }
//     }, [user]);


//     const { width } = Dimensions.get('window');
//     const CARD_WIDTH = width - 44; // 24px padding on each side

//     const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
//         if (viewableItems.length > 0) {
//             const firstViewableItem = viewableItems[0];
//             console.log('Current visible item:', firstViewableItem);
//         }
//     }, []);


//     const featuredSessions: FeaturedProgramType[] = [
//         {
//             id: '1',
//             title: 'Morning Meditation',
//             description: 'Start your day with peace',
//             image: require('@/assets/images/soma/home-features-1.png'),
//         },
//         {
//             id: '2',
//             title: 'Morning Meditation',
//             description: 'Start your day with peace',
//             image: require('@/assets/images/soma/home-features-1.png'),
//         },

//         {
//             id: '3',
//             title: 'Morning Meditation',
//             description: 'Start your day with peace',
//             image: require('@/assets/images/soma/home-features-1.png'),
//         },

//     ];

//     interface PlaylistTrack {
//         id: string;
//         title: string;
//         image: ImageSourcePropType;
//         // track duration 
//         duration: string;
//     }



//     const playlistTrack: PlaylistTrack[] = [
//         { id: '1', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
//         { id: '2', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
//         { id: '3', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
//         { id: '4', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
//         { id: '5', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
//         { id: '6', title: 'Morning Meditation', duration: '10:00', image: require('@/assets/images/soma/homeimages/playlisttrackplaceholder.png') },
//     ]


//     const scrollX = useRef(new Animated.Value(0)).current;

//     // const Pagination = ({ data, scrollX }: PaginationPropsType) => (
//     //     <View className="flex-row gap-5 justify-center absolute bottom-2 left-0 right-0">
//     //         {data.map((_, i) => {
//     //             const inputRange = [
//     //                 (i - 1) * CARD_WIDTH,
//     //                 i * CARD_WIDTH,
//     //                 (i + 1) * CARD_WIDTH,
//     //             ];

//     //             const width = scrollX.interpolate({
//     //                 inputRange,
//     //                 outputRange: [8, 16, 8],
//     //                 extrapolate: 'clamp',
//     //             });

//     //             const opacity = scrollX.interpolate({
//     //                 inputRange,
//     //                 outputRange: [0.3, 1, 0.3],
//     //                 extrapolate: 'clamp',
//     //             });

//     //             return (
//     //                 <Animated.View
//     //                     key={i}
//     //                     className="h-2 bg-dark-brown rounded-full mx-1"
//     //                     style={{ width, opacity }}
//     //                 />
//     //             );
//     //         })}
//     //     </View>
//     // );

//     const Pagination = ({ data, scrollX }: { data: FeaturedProgramType[], scrollX: Animated.Value }) => (
//         <View className="flex-row bg-screen-bg gap-5 justify-center absolute bottom-0 h-[20px] items-center w-[35%] rounded-[18px] ">
//             {data.map((_, i) => {
//                 const inputRange = [
//                     (i - 1) * CARD_WIDTH,
//                     i * CARD_WIDTH,
//                     (i + 1) * CARD_WIDTH,
//                 ];

//                 const scale = scrollX.interpolate({
//                     inputRange,
//                     outputRange: [0.8, 1, 0.8],
//                     extrapolate: 'clamp',
//                 });


//                 const opacity = scrollX.interpolate({
//                     inputRange,
//                     outputRange: [0.3, 1, 0.3],
//                     extrapolate: 'clamp',
//                 });

//                 return (
//                     <Animated.View
//                         key={i}
//                         className="h-3 w-3 bg-dark-brown rounded-full mx-1"
//                         style={{
//                             opacity,
//                             transform: [{ scale }]
//                         }}
//                     />
//                 );
//             })}
//         </View>
//     );

//     return (
//         <SafeAreaView className="flex-1  bg-screen-bg">
//             <ScrollView className="flex-1">
//                 {/* Header Section */}
//                 <View className="flex-row justify-between items-center px-6 pt-12">
//                     <View>
//                         <View className="flex-row items-center">
//                             <CustomText className="text-base text-dark-brown">
//                                 Hello,{' '}
//                             </CustomText>
//                             <CustomText className="text-xl font-bold text-dark-brown">
//                                 {firstName}
//                             </CustomText>
//                         </View>


//                     </View>
//                     <Pressable
//                         onPress={() => router.push('/profile')}
//                     >
//                         <Image
//                             source={require("@/assets/images/soma/avatar.png")}
//                             className="w-12 h-12 rounded-full"
//                         />
//                     </Pressable>
//                 </View>

//                 {/* Featured Section */}

//                 <View className="mx-5 py-6">
//                     <View >
//                         <CustomText className="text-lg font-bold text-dark-brown mb-4">
//                             Live Sessions
//                         </CustomText>
//                     </View>
//                     <View className="relative">
//                         <AnimatedFlatList
//                             data={featuredSessions}
//                             horizontal
//                             pagingEnabled
//                             showsHorizontalScrollIndicator={false}
//                             snapToInterval={0}
//                             decelerationRate="fast"
//                             contentContainerStyle={{ paddingHorizontal: 0 }}
//                             onScroll={Animated.event(
//                                 [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                                 { useNativeDriver: true }
//                             )}
//                             renderItem={({ item }: any) => (
//                                 <View
//                                     className={`w-${CARD_WIDTH} h-[200px] rounded-xl overflow-hidden boder border-[#31170C20] mr-4`}


//                                 >
//                                     <ImageBackground
//                                         source={item.image}
//                                         style={{
//                                             width: CARD_WIDTH,
//                                             height: 200,
//                                             borderRadius: 13,
//                                             overflow: 'hidden'
//                                         }}
//                                     >
//                                         <LinearGradient
//                                             colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
//                                             style={{
//                                                 position: 'absolute',
//                                                 left: 0,
//                                                 right: 0,
//                                                 top: 0,
//                                                 bottom: 0,
//                                             }}
//                                         >
//                                             <View className="flex-1 justify-start p-4">
//                                                 <CustomText className="text-lg font-semibold text-white">
//                                                     {item.title}
//                                                 </CustomText>
//                                                 <CustomText className="text-sm text-white opacity-60">
//                                                     {item.description}
//                                                 </CustomText>
//                                             </View>
//                                         </LinearGradient>
//                                     </ImageBackground>
//                                 </View>




//                             )}
//                         />
//                         <View className='relative flex justify-center items-center mt-2'>

//                             <Pagination data={featuredSessions} scrollX={scrollX} />
//                         </View>
//                     </View>
//                 </View>


//                 {/* Categories */}

//                 <View className="px-6 py-6">
//                     <CategoryGrid />
//                 </View>


//                 {/* Playlist List */}
//                 <View className="px-6 py-6">
//                     <View className='flex flex-row justify-between items-center'>
//                         <CustomText className="text-lg font-bold text-dark-brown ">
//                             Playlist
//                         </CustomText>
//                         {/* //see all  */}
//                         <TouchableOpacity
//                             onPress={() => router.push('/playlists')}
//                         >
//                             <CustomText className="text-base text-[#1E1E1E] font-semibold">
//                                 See all
//                             </CustomText>
//                         </TouchableOpacity>

//                     </View>


//                     {/* //show list of track single track item styles:  flexrow fullwidth with 3 cols image on left side and title and then play icon   91.06px background linear gradient #31170C right to left   */}
//                     {/* playlistTrack */}
//                     <View className="flex-col gap-4 mt-4">
//                         {playlistTrack.map((track) => (
//                             <Pressable
//                                 key={track.id}
//                                 onPress={() => router.push('/playlists')}
//                                 className="flex-row  items-center w-full h-[91.06px] rounded-[9px] overflow-hidden"
//                             >
//                                 <LinearGradient
//                                     colors={['rgba(49,23,12,0.9)', 'rgba(0,0,0,0.05)']}
//                                     // Darker to lighter
//                                     start={{ x: 0, y: 0 }}           // Left
//                                     end={{ x: 1, y: 0 }}             // Right
//                                     className="absolute w-full h-full"
//                                 />
//                                 <View className="flex-row gap-5 items-center w-full px-4">
//                                     <Image
//                                         source={track.image}
//                                         className="w-16 h-16 rounded-[9px]"
//                                     />
//                                     <View className="flex-1 flex-col ">
//                                         <CustomText className="text-sm text-white font-semibold">
//                                             {track.title}
//                                         </CustomText>
//                                         <View className="flex-row items-center">
//                                             <FontAwesome5 name="clock" size={12} color="#fff" />
//                                             <CustomText className="text-xs text-white font-semibold ml-1">
//                                                 {track.duration}
//                                             </CustomText>
//                                         </View>

//                                     </View>
//                                     <FontAwesome5 name="play" size={20} color="#fff" />
//                                 </View>
//                             </Pressable>
//                         ))}
//                     </View>


//                 </View>
//             </ScrollView>
//         </SafeAreaView >
//     );
// }


// import CustomText from '@/components/CustomText';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useCallback, useRef, useEffect, useState } from 'react';
// import {
//     Animated,
//     Dimensions,
//     FlatList,
//     Image,
//     ImageBackground,
//     Pressable,
//     SafeAreaView,
//     ScrollView,
//     TouchableOpacity,
//     View,
//     ViewToken,
//     ActivityIndicator,
//     FlatListProps,
// } from 'react-native';
// import CategoryGrid from '@/components/CategoryGrid';
// import useAuthStore from '@/store/authStore';
// import api from '@/utils/api';
// import { ListRenderItem } from 'react-native';

// const { width } = Dimensions.get('window');

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as React.ComponentType<FlatListProps<any>>;
// const CARD_WIDTH = width - 48;
// const FEATURED_CARD_HEIGHT = 220;



// const ROUTES = {
//     PROFILE: {
//         pathname: '/(appscreen)/profile/account' as const
//     },
//     PLAYLIST: {
//         pathname: '/(appscreen)/playlist/new' as const
//     },
//     PLAYLIST_DETAIL: (id: string) => ({
//         pathname: '/(appscreen)/playlist/[id]' as const,
//         params: { id }
//     }),

//     SESSION_DETAIL: (id: string) => ({
//         pathname: '/session/[id]' as const,
//         params: { id }
//     }),

//     CATEGORY_DETAIL: (id: string) => ({
//         pathname: '/category/[id]' as const,
//         params: { id }
//     }),
// } as const;



// interface HomeScreenSession {
//     id: string;
//     title: string;
//     description: string | null;
//     type: 'LIVE' | 'SCHEDULED' | 'PRE_RECORDED';
//     category?: string | null;

//     duration: number | null;
//     level: string | null;
//     intention: string | null;
//     fileUrl: string | null;
//     thumbnailUrl: string | null;

//     startTime?: string | null;
//     instructor?: string | null;
// }


// interface Content {
//     id: string;
//     title: string;
//     description: string | null;
//     type: 'AUDIO' | 'VIDEO';
//     category?: string | null;
//     subcategory?: string | null;
//     duration: number | null;
//     level?: string | null;
//     intention?: string | null;
//     fileUrl: string | null;
//     thumbnailUrl: string | null;
// }



// interface Playlist {
//     id: string;
//     name: string;
//     description: string | null;
//     contentCount: number;
//     contents: Content[];
//     thumbnailUrl?: string | null;
// }


// interface ApiResponse<T> {
//     success: boolean;
//     data: T;
//     error?: string;
// }

// export default function HomeScreen() {
//     const { user } = useAuthStore();
//     const router = useRouter();
//     const [firstName, setFirstName] = useState('User');

//     const [featuredSessions, setFeaturedSessions] = useState<HomeScreenSession[]>([]);
//     const [playlistTracks, setPlaylistTracks] = useState<Playlist[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const scrollX = useRef(new Animated.Value(0)).current;


//     useEffect(() => {
//         if (user && user.fullName) {
//             const nameParts = user.fullName.split(' ');
//             setFirstName(nameParts[0]);
//         } else {
//             setFirstName('User');
//         }
//     }, [user]);


//     const fetchFeaturedSessions = async () => {
//         try {

//             const response = await api.get<ApiResponse<HomeScreenSession[]>>('/session/live-sessions');
//             if (response.data.success) {
//                 setFeaturedSessions(response.data.data);
//             } else {
//                 console.error('API Error fetching featured sessions:', response.data.error);
//                 setError(response.data.error || 'Failed to load featured sessions');
//             }
//         } catch (err: any) {
//             console.error('Error fetching featured sessions:', err);
//             setError(err.message || 'Failed to load featured sessions');
//         }
//     };


//     const fetchPlaylists = async () => {
//         try {
//             const response = await api.get<ApiResponse<Playlist[]>>('/playlist');
//             if (response.data.success) {
//                 setPlaylistTracks(response.data.data);
//             } else {
//                 console.error('API Error fetching playlists:', response.data.error);
//                 setError(response.data.error || 'Failed to load playlists');
//             }
//         } catch (err: any) {
//             console.error('Error fetching playlists:', err);
//             setError(err.message || 'Failed to load playlists');
//         }
//     };


//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             try {
//                 await Promise.all([
//                     fetchFeaturedSessions(),
//                     fetchPlaylists(),
//                 ]);
//             } catch (err) {
//                 console.error('Error during initial data fetch:', err);
//                 setError('Failed to load data');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();

//     }, [api]);


//     const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
//         if (viewableItems.length > 0) {
//             const firstViewableItem = viewableItems[0];

//         }
//     }, []);


//     const viewabilityConfig = useRef({
//         itemVisiblePercentThreshold: 50
//     }).current;



//     const Pagination = ({ data, scrollX }: { data: HomeScreenSession[], scrollX: Animated.Value }) => (
//         <View className="flex-row bg-screen-bg gap-5 justify-center absolute bottom-0 h-[20px] items-center w-[35%] rounded-[18px]">
//             {data.map((_, i) => {

//                 const inputRange = [
//                     (i - 1) * CARD_WIDTH,
//                     i * CARD_WIDTH,
//                     (i + 1) * CARD_WIDTH,
//                 ];


//                 const scale = scrollX.interpolate({
//                     inputRange,
//                     outputRange: [0.8, 1, 0.8],
//                     extrapolate: 'clamp',
//                 });


//                 const opacity = scrollX.interpolate({
//                     inputRange,
//                     outputRange: [0.3, 1, 0.3],
//                     extrapolate: 'clamp',
//                 });

//                 return (
//                     <Animated.View
//                         key={i}
//                         className="h-3 w-3 bg-dark-brown rounded-full mx-1"
//                         style={{
//                             opacity,
//                             transform: [{ scale }]
//                         }}
//                     />
//                 );
//             })}
//         </View>
//     );


//     const renderFeaturedItem: ListRenderItem<HomeScreenSession> = useCallback(({ item }) => (

//         <Pressable
//             className={`w-[${CARD_WIDTH}px] h-[${FEATURED_CARD_HEIGHT}px] rounded-xl overflow-hidden border border-[#31170C20] mr-4`}
//             onPress={() => {

//                 if (item.id) {
//                     router.push(ROUTES.SESSION_DETAIL(item.id));
//                 }
//             }}
//         >
//             <ImageBackground
//                 source={{ uri: item.thumbnailUrl || '' }}
//                 style={{
//                     width: '100%',
//                     height: '100%',
//                     borderRadius: 13,
//                     overflow: 'hidden'
//                 }}
//                 resizeMode="cover"
//             >
//                 <LinearGradient
//                     colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
//                     style={{
//                         position: 'absolute',
//                         left: 0,
//                         right: 0,
//                         top: 0,
//                         bottom: 0,
//                     }}
//                 >
//                     <View className="flex-1 justify-start p-4">

//                         <CustomText className="text-lg font-semibold text-white">
//                             {item.title}
//                         </CustomText>
//                         <CustomText className="text-sm text-white opacity-60">
//                             {item.description}
//                         </CustomText>

//                         {item.type === 'LIVE' && (
//                             <TouchableOpacity className="mt-2 bg-dark-brown px-4 py-2 rounded-full self-start">
//                                 <CustomText className="text-white font-semibold">
//                                     JOIN NOW
//                                 </CustomText>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </LinearGradient>
//             </ImageBackground>
//         </Pressable>
//     ), [CARD_WIDTH, FEATURED_CARD_HEIGHT, router]);

//     return (
//         <SafeAreaView className="flex-1 bg-screen-bg">
//             <ScrollView className="flex-1">
//                 {/* Header Section */}
//                 <View className="flex-row justify-between items-center px-6 pt-12">
//                     <View>
//                         <View className="flex-row items-center">
//                             <CustomText className="text-base text-dark-brown">
//                                 Hello,{' '}
//                             </CustomText>
//                             <CustomText className="text-xl font-bold text-dark-brown">
//                                 {firstName}
//                             </CustomText>
//                         </View>
//                     </View>
//                     <Pressable onPress={() => router.push(ROUTES.PROFILE)}>
//                         <Image
//                             source={require("@/assets/images/soma/avatar.png")}
//                             className="w-12 h-12 rounded-full"
//                         />
//                     </Pressable>
//                 </View>


//                 <View className="mx-5 py-6">
//                     <View>
//                         <CustomText className="text-lg font-bold text-dark-brown mb-4">
//                             Live Sessions
//                         </CustomText>
//                     </View>
//                     {isLoading ? (
//                         <ActivityIndicator size="large" color="#31170C" />
//                     ) : error ? (
//                         <CustomText className="text-red-500">{error}</CustomText>
//                     ) : featuredSessions.length === 0 ? (
//                         <CustomText className="text-dark-brown text-center py-4">No live sessions available</CustomText>
//                     ) : (
//                         <View className="relative">
//                             <AnimatedFlatList
//                                 data={featuredSessions}
//                                 horizontal
//                                 pagingEnabled
//                                 showsHorizontalScrollIndicator={false}
//                                 snapToInterval={0}
//                                 decelerationRate="fast"
//                                 contentContainerStyle={{ paddingHorizontal: 0 }}
//                                 onScroll={Animated.event(
//                                     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                                     { useNativeDriver: true }
//                                 )}
//                                 renderItem={({ item }) => (
//                                     <View
//                                         style={{
//                                             width: CARD_WIDTH,
//                                             height: 200,
//                                             borderRadius: 12,
//                                             overflow: 'hidden',
//                                             marginRight: 16,
//                                             borderWidth: 1,
//                                             borderColor: 'rgba(49, 23, 12, 0.12)'
//                                         }}
//                                     >
//                                         <ImageBackground
//                                             source={{ uri: item.thumbnailUrl || 'placeholder_image_url' }}
//                                             style={{
//                                                 width: CARD_WIDTH,
//                                                 height: 200,
//                                                 borderRadius: 13,
//                                                 overflow: 'hidden'
//                                             }}
//                                             resizeMode="cover"
//                                         >
//                                             <LinearGradient
//                                                 colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
//                                                 style={{
//                                                     position: 'absolute',
//                                                     left: 0,
//                                                     right: 0,
//                                                     top: 0,
//                                                     bottom: 0,
//                                                 }}
//                                             >
//                                                 <View className="flex-1 justify-start p-4">
//                                                     <CustomText className="text-lg font-semibold text-white">
//                                                         {item.title}
//                                                     </CustomText>
//                                                     <CustomText className="text-sm text-white opacity-60">
//                                                         {item.description}
//                                                     </CustomText>
//                                                     {item.type === 'LIVE' && (
//                                                         <TouchableOpacity className="mt-2 bg-dark-brown px-4 py-2 rounded-full self-start">
//                                                             <CustomText className="text-white font-semibold">
//                                                                 JOIN NOW
//                                                             </CustomText>
//                                                         </TouchableOpacity>
//                                                     )}
//                                                 </View>
//                                             </LinearGradient>
//                                         </ImageBackground>
//                                     </View>
//                                 )}
//                                 keyExtractor={(item) => item.id}
//                                 onViewableItemsChanged={onViewableItemsChanged}
//                                 viewabilityConfig={viewabilityConfig}
//                             />
//                             <View className='relative flex justify-center items-center mt-2'>
//                                 <Pagination data={featuredSessions} scrollX={scrollX} />
//                             </View>
//                         </View>
//                     )}
//                 </View>


//                 <View className="px-6 py-6">

//                     <CategoryGrid />
//                 </View>


//                 <View className="px-6 py-6">
//                     <View className='flex flex-row justify-between items-center'>
//                         <CustomText className="text-lg font-bold text-dark-brown">
//                             Playlist
//                         </CustomText>
//                         <TouchableOpacity
//                             onPress={() => router.push(ROUTES.PLAYLIST)}
//                         >
//                             <CustomText className="text-base text-[#1E1E1E] font-semibold">
//                                 See all
//                             </CustomText>
//                         </TouchableOpacity>
//                     </View>

//                     {isLoading ? (
//                         <ActivityIndicator size="large" color="#31170C" />
//                     ) : error ? (
//                         <CustomText className="text-red-500">{error}</CustomText>
//                     ) : (
//                         <View className="flex-col gap-4 mt-4">
//                             {playlistTracks.map((playlist) => (
//                                 <Pressable
//                                     key={playlist.id}
//                                     onPress={() => router.push(ROUTES.PLAYLIST_DETAIL(playlist.id))}
//                                     className="flex-row items-center w-full h-[91.06px] rounded-[9px] overflow-hidden"
//                                 >
//                                     <LinearGradient
//                                         colors={['rgba(49,23,12,0.9)', 'rgba(0,0,0,0.05)']}
//                                         start={{ x: 0, y: 0 }}
//                                         end={{ x: 1, y: 0 }}
//                                         className="absolute w-full h-full"
//                                     />
//                                     <View className="flex-row gap-5 items-center w-full px-4">
//                                         <Image
//                                             source={{ uri: playlist.contents[0]?.thumbnailUrl || 'playlist_placeholder_image_url' }}
//                                             className="w-16 h-16 rounded-[9px]"
//                                         />
//                                         <View className="flex-1 flex-col">
//                                             <CustomText className="text-sm text-white font-semibold">
//                                                 {playlist.name}
//                                             </CustomText>
//                                             <View className="flex-row items-center">
//                                                 <FontAwesome5 name="clock" size={12} color="#fff" />
//                                                 <CustomText className="text-xs text-white font-semibold ml-1">
//                                                     {playlist.contentCount} tracks
//                                                 </CustomText>
//                                             </View>
//                                         </View>
//                                         <FontAwesome5 name="play" size={20} color="#fff" />
//                                     </View>
//                                 </Pressable>
//                             ))}
//                         </View>
//                     )}
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// import CustomText from '@/components/CustomText';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useCallback, useRef, useEffect, memo, useState } from 'react';
// import {
//     Animated,
//     Dimensions,
//     FlatList,
//     Pressable,
//     SafeAreaView,
//     ScrollView,
//     TouchableOpacity,
//     View,
//     ViewToken,
//     FlatListProps,
//     RefreshControl,
// } from 'react-native';
// import { Image as ExpoImage } from 'expo-image';
// import CategoryGrid from '@/components/CategoryGrid';
// import useAuthStore from '@/store/authStore';
// import { HomeScreenSession, Playlist, useContentStore } from '@/store/contentStore';
// import { BLURHASH_PLACEHOLDER, IMAGE_ASSETS } from '@/constants/uiConstants';
// // Import skeleton loaders
// import {
//     FeaturedSessionsSkeleton,
//     CategoryGridSkeleton,
//     PlaylistsSkeleton,
//     SectionHeaderSkeleton
// } from '@/components/custom/SkeletonLoaders';

// // Constants
// const { width } = Dimensions.get('window');
// const CARD_WIDTH = width - 48;
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as React.ComponentType<FlatListProps<any>>;
// const blurhashPlaceholder = BLURHASH_PLACEHOLDER;

// interface FeaturedSessionItemProps {
//     item: HomeScreenSession;
//     onPress: () => void;
// }

// interface PlaylistItemProps {
//     playlist: Playlist;
//     onPress: () => void;
// }

// // Navigation routes
// const ROUTES = {
//     PROFILE: {
//         pathname: '/(appscreen)/profile/account' as const
//     },
//     PLAYLIST: {
//         pathname: '/(appscreen)/playlist/new' as const
//     },
//     PLAYLIST_DETAIL: (id: string) => ({
//         pathname: '/(appscreen)/playlist/[id]' as const,
//         params: { id }
//     }),
//     SESSION_DETAIL: (id: string) => ({
//         pathname: '/session/[id]' as const,
//         params: { id }
//     })
// };

// // Pagination component (memoized)
// const Pagination = memo(({ data, scrollX }: { data: any[], scrollX: Animated.Value }) => (
//     <View className="flex-row bg-screen-bg gap-5 justify-center absolute bottom-0 h-[20px] items-center w-[35%] rounded-[18px]">
//         {data.map((_, i) => {
//             const inputRange = [
//                 (i - 1) * CARD_WIDTH,
//                 i * CARD_WIDTH,
//                 (i + 1) * CARD_WIDTH,
//             ];

//             const scale = scrollX.interpolate({
//                 inputRange,
//                 outputRange: [0.8, 1, 0.8],
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
//                     className="h-3 w-3 bg-dark-brown rounded-full mx-1"
//                     style={{
//                         opacity,
//                         transform: [{ scale }]
//                     }}
//                 />
//             );
//         })}
//     </View>
// ));

// // FeaturedSessionItem component (memoized)
// const FeaturedSessionItem = memo(({ item, onPress }: FeaturedSessionItemProps) => (
//     <Pressable
//         style={{
//             width: CARD_WIDTH,
//             height: 200,
//             borderRadius: 12,
//             overflow: 'hidden',
//             marginRight: 16,
//             borderWidth: 1,
//             borderColor: 'rgba(49, 23, 12, 0.12)'
//         }}
//         onPress={onPress}
//     >
//         <View style={{ width: '100%', height: '100%', position: 'relative' }}>
//             <ExpoImage
//                 style={{ width: '100%', height: '100%', position: 'absolute' }}
//                 source={{ uri: item.thumbnailUrl || 'placeholder_image_url' }}
//                 placeholder={{ blurhash: blurhashPlaceholder }}
//                 contentFit="cover"
//                 transition={300}
//                 cachePolicy="memory-disk"
//             />
//             <LinearGradient
//                 colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
//                 style={{
//                     position: 'absolute',
//                     left: 0,
//                     right: 0,
//                     top: 0,
//                     bottom: 0,
//                 }}
//             >
//                 <View className="flex-1 justify-start p-4">
//                     <CustomText className="text-lg font-semibold text-white">
//                         {item.title}
//                     </CustomText>
//                     <CustomText className="text-sm text-white opacity-60">
//                         {item.description}
//                     </CustomText>
//                     {item.type === 'LIVE' && (
//                         <TouchableOpacity className="mt-2 bg-dark-brown px-4 py-2 rounded-full self-start">
//                             <CustomText className="text-white font-semibold">
//                                 JOIN NOW
//                             </CustomText>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </LinearGradient>
//         </View>
//     </Pressable>
// ));

// // PlaylistItem component (memoized)
// const PlaylistItem = memo(({ playlist, onPress }: PlaylistItemProps) => (
//     <Pressable
//         onPress={onPress}
//         className="flex-row items-center w-full h-[91.06px] rounded-[9px] overflow-hidden mb-4"
//     >
//         <LinearGradient
//             colors={['rgba(49,23,12,0.9)', 'rgba(0,0,0,0.05)']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             className="absolute w-full h-full"
//         />
//         <View className="flex-row gap-5 items-center w-full px-4">
//             <View style={{ width: 64, height: 64, borderRadius: 9, overflow: 'hidden' }}>
//                 <ExpoImage
//                     source={{ uri: playlist.contents[0]?.thumbnailUrl || 'playlist_placeholder_image_url' }}
//                     style={{ width: '100%', height: '100%' }}
//                     placeholder={{ blurhash: blurhashPlaceholder }}
//                     contentFit="cover"
//                     cachePolicy="memory-disk"
//                 />
//             </View>
//             <View className="flex-1 flex-col">
//                 <CustomText className="text-sm text-white font-semibold">
//                     {playlist.name}
//                 </CustomText>
//                 <View className="flex-row items-center">
//                     <FontAwesome5 name="clock" size={12} color="#fff" />
//                     <CustomText className="text-xs text-white font-semibold ml-1">
//                         {playlist.contentCount} tracks
//                     </CustomText>
//                 </View>
//             </View>
//             <FontAwesome5 name="play" size={20} color="#fff" />
//         </View>
//     </Pressable>
// ));

// export default function HomeScreen() {
//     const router = useRouter();
//     const { user } = useAuthStore();

//     // Fix TypeScript error by using individual selectors
//     const featuredSessions = useContentStore(state => state.featuredSessions);
//     const playlists = useContentStore(state => state.playlists);
//     const isLoading = useContentStore(state => state.isLoading);
//     const error = useContentStore(state => state.error);
//     const fetchAllHomeData = useContentStore(state => state.fetchAllHomeData);

//     // Add refresh state
//     const [refreshing, setRefreshing] = useState(false);

//     const scrollX = useRef(new Animated.Value(0)).current;
//     const firstName = user?.fullName?.split(' ')[0] || 'User';

//     // Handle pull-to-refresh
//     const onRefresh = useCallback(() => {
//         setRefreshing(true);
//         fetchAllHomeData().finally(() => {
//             setRefreshing(false);
//         });
//     }, [fetchAllHomeData]);

//     // Fetch data on mount if not already loaded
//     useEffect(() => {
//         if ((featuredSessions.length === 0 || playlists.length === 0) && !isLoading) {
//             fetchAllHomeData();
//         }
//     }, [featuredSessions.length, playlists.length, isLoading, fetchAllHomeData]);

//     const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
//         // Track viewable items if needed
//     }, []);

//     const viewabilityConfig = useRef({
//         itemVisiblePercentThreshold: 50
//     }).current;

//     const renderFeaturedItem = useCallback(({ item }: { item: HomeScreenSession }) => (
//         <FeaturedSessionItem
//             item={item}
//             onPress={() => router.push(ROUTES.SESSION_DETAIL(item.id))}
//         />
//     ), [router]);

//     return (
//         <SafeAreaView className="flex-1 bg-screen-bg">
//             <ScrollView
//                 className="flex-1"
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                         colors={["#31170C"]}
//                         tintColor="#31170C"
//                         title="Refreshing..."
//                         titleColor="#31170C"
//                     />
//                 }
//             >
//                 {/* Header Section */}
//                 <View className="flex-row justify-between items-center px-6 pt-12">
//                     <View>
//                         <View className="flex-row items-center">
//                             <CustomText className="text-base text-dark-brown">
//                                 Hello,{' '}
//                             </CustomText>
//                             <CustomText className="text-xl font-bold text-dark-brown">
//                                 {firstName}
//                             </CustomText>
//                         </View>
//                     </View>
//                     <Pressable onPress={() => router.push(ROUTES.PROFILE)}>
//                         <ExpoImage
//                             source={require("@/assets/images/soma/avatar.png")}
//                             style={{ width: 48, height: 48, borderRadius: 24 }}
//                             contentFit="cover"
//                         />
//                     </Pressable>
//                 </View>

//                 {/* Featured Section (Live Sessions) */}
//                 <View className="mx-5 py-6">
//                     <View>
//                         <CustomText className="text-lg font-bold text-dark-brown mb-4">
//                             Live Sessions
//                         </CustomText>
//                     </View>
//                     {isLoading && !refreshing ? (
//                         <FeaturedSessionsSkeleton />
//                     ) : error ? (
//                         <CustomText className="text-red-500">{error}</CustomText>
//                     ) : featuredSessions.length === 0 ? (
//                         <CustomText className="text-dark-brown text-center py-4">No live sessions available</CustomText>
//                     ) : (
//                         <View className="relative">
//                             <AnimatedFlatList
//                                 data={featuredSessions}
//                                 horizontal
//                                 pagingEnabled
//                                 showsHorizontalScrollIndicator={false}
//                                 snapToInterval={0}
//                                 decelerationRate="fast"
//                                 contentContainerStyle={{ paddingHorizontal: 0 }}
//                                 onScroll={Animated.event(
//                                     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                                     { useNativeDriver: true }
//                                 )}
//                                 renderItem={renderFeaturedItem}
//                                 keyExtractor={(item) => item.id}
//                                 onViewableItemsChanged={onViewableItemsChanged}
//                                 viewabilityConfig={viewabilityConfig}
//                                 removeClippedSubviews={true}
//                                 initialNumToRender={2}
//                                 maxToRenderPerBatch={2}
//                                 windowSize={3}
//                             />
//                             <View className='relative flex justify-center items-center mt-2'>
//                                 <Pagination data={featuredSessions} scrollX={scrollX} />
//                             </View>
//                         </View>
//                     )}
//                 </View>

//                 {/* Categories */}
//                 <View className="px-6 py-6">
//                     {isLoading && !refreshing ? (
//                         <CategoryGridSkeleton />
//                     ) : (
//                         <CategoryGrid />
//                     )}
//                 </View>

//                 {/* Playlist List */}
//                 <View className="px-6 py-6">
//                     <View className='flex flex-row justify-between items-center'>
//                         <CustomText className="text-lg font-bold text-dark-brown">
//                             Playlist
//                         </CustomText>
//                         <TouchableOpacity
//                             onPress={() => router.push(ROUTES.PLAYLIST)}
//                         >
//                             <CustomText className="text-base text-[#1E1E1E] font-semibold">
//                                 See all
//                             </CustomText>
//                         </TouchableOpacity>
//                     </View>

//                     {isLoading && !refreshing ? (
//                         <PlaylistsSkeleton />
//                     ) : error ? (
//                         <CustomText className="text-red-500">{error}</CustomText>
//                     ) : (
//                         <View className="flex-col mt-4">
//                             {playlists.slice(0, 5).map((playlist) => (
//                                 <PlaylistItem
//                                     key={playlist.id}
//                                     playlist={playlist}
//                                     onPress={() => router.push(ROUTES.PLAYLIST_DETAIL(playlist.id))}
//                                 />
//                             ))}
//                         </View>
//                     )}
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

import CustomText from '@/components/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useEffect, memo, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    ViewToken,
    FlatListProps,
    RefreshControl,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import CategoryGrid from '@/components/CategoryGrid';
import useAuthStore from '@/store/authStore';
import { HomeScreenSession, Playlist, useContentStore } from '@/store/contentStore';
import { BLURHASH_PLACEHOLDER, IMAGE_ASSETS } from '@/constants/uiConstants';
// Import skeleton loaders
import {
    FeaturedSessionsSkeleton,
    CategoryGridSkeleton,
    PlaylistsSkeleton,
    SectionHeaderSkeleton
} from '@/components/custom/SkeletonLoaders';

// Constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as React.ComponentType<FlatListProps<any>>;
const blurhashPlaceholder = BLURHASH_PLACEHOLDER;

interface FeaturedSessionItemProps {
    item: HomeScreenSession;
    onPress: () => void;
}

interface PlaylistItemProps {
    playlist: Playlist;
    onPress: () => void;
}

// Navigation routes
const ROUTES = {
    PROFILE: {
        pathname: '/(appscreen)/profile/account' as const
    },
    PLAYLIST: {
        pathname: '/(appscreen)/playlist/new' as const
    },
    PLAYLIST_DETAIL: (id: string) => ({
        pathname: '/(appscreen)/playlist/[id]' as const,
        params: { id }
    }),
    SESSION_DETAIL: (id: string) => ({
        pathname: '/session/[id]' as const,
        params: { id }
    })
};

// Pagination component (memoized)
const Pagination = memo(({ data, scrollX }: { data: any[], scrollX: Animated.Value }) => (
    <View className="flex-row bg-screen-bg gap-5 justify-center absolute bottom-0 h-[20px] items-center w-[35%] rounded-[18px]">
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
));

// FeaturedSessionItem component (memoized)
const FeaturedSessionItem = memo(({ item, onPress }: FeaturedSessionItemProps) => (
    <Pressable
        style={{
            width: CARD_WIDTH,
            height: 200,
            borderRadius: 12,
            overflow: 'hidden',
            marginRight: 16,
            borderWidth: 1,
            borderColor: 'rgba(49, 23, 12, 0.12)'
        }}
        onPress={onPress}
    >
        <View style={{ width: '100%', height: '100%', position: 'relative' }}>
            <ExpoImage
                style={{ width: '100%', height: '100%', position: 'absolute' }}
                source={{ uri: item.thumbnailUrl || 'placeholder_image_url' }}
                placeholder={{ blurhash: blurhashPlaceholder }}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
            />
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
                    {item.type === 'LIVE' && (
                        <TouchableOpacity className="mt-2 bg-dark-brown px-4 py-2 rounded-full self-start">
                            <CustomText className="text-white font-semibold">
                                JOIN NOW
                            </CustomText>
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>
        </View>
    </Pressable>
));

// PlaylistItem component (memoized)
const PlaylistItem = memo(({ playlist, onPress }: PlaylistItemProps) => (
    <Pressable
        onPress={onPress}
        className="flex-row items-center w-full h-[91.06px] rounded-[9px] overflow-hidden mb-4"
    >
        <LinearGradient
            colors={['rgba(49,23,12,0.9)', 'rgba(0,0,0,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="absolute w-full h-full"
        />
        <View className="flex-row gap-5 items-center w-full px-4">
            <View style={{ width: 64, height: 64, borderRadius: 9, overflow: 'hidden' }}>
                <ExpoImage
                    source={{ uri: playlist.contents[0]?.thumbnailUrl || 'playlist_placeholder_image_url' }}
                    style={{ width: '100%', height: '100%' }}
                    placeholder={{ blurhash: blurhashPlaceholder }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                />
            </View>
            <View className="flex-1 flex-col">
                <CustomText className="text-sm text-white font-semibold">
                    {playlist.name}
                </CustomText>
                <View className="flex-row items-center">
                    <FontAwesome5 name="clock" size={12} color="#fff" />
                    <CustomText className="text-xs text-white font-semibold ml-1">
                        {playlist.contentCount} tracks
                    </CustomText>
                </View>
            </View>
            <FontAwesome5 name="play" size={20} color="#fff" />
        </View>
    </Pressable>
));

export default function HomeScreen() {
    const router = useRouter();
    const { user } = useAuthStore();

    // Use specific loading states
    const featuredSessions = useContentStore(state => state.featuredSessions);
    const playlists = useContentStore(state => state.playlists);
    const isFeaturedSessionsLoading = useContentStore(state => state.isFeaturedSessionsLoading);
    const isPlaylistsLoading = useContentStore(state => state.isPlaylistsLoading);
    const error = useContentStore(state => state.error);
    const fetchAllHomeData = useContentStore(state => state.fetchAllHomeData);

    // Add refresh state
    const [refreshing, setRefreshing] = useState(false);

    const scrollX = useRef(new Animated.Value(0)).current;
    const firstName = user?.fullName?.split(' ')[0] || 'User';

    // Handle pull-to-refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchAllHomeData().finally(() => {
            setRefreshing(false);
        });
    }, [fetchAllHomeData]);

    // Fetch data on mount if not already loaded
    useEffect(() => {
        if ((featuredSessions.length === 0 || playlists.length === 0) && !refreshing) {
            fetchAllHomeData();
        }
    }, [featuredSessions.length, playlists.length, refreshing, fetchAllHomeData]);

    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        // Track viewable items if needed
    }, []);

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const renderFeaturedItem = useCallback(({ item }: { item: HomeScreenSession }) => (
        <FeaturedSessionItem
            item={item}
            onPress={() => router.push(ROUTES.SESSION_DETAIL(item.id))}
        />
    ), [router]);

    return (
        <SafeAreaView className="flex-1 bg-screen-bg">
            <ScrollView
                className="flex-1"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#31170C"]}
                        tintColor="#31170C"
                        title="Refreshing..."
                        titleColor="#31170C"
                    />
                }
            >
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
                    <Pressable onPress={() => router.push(ROUTES.PROFILE)}>
                        <ExpoImage
                            source={require("@/assets/images/soma/avatar.png")}
                            style={{ width: 48, height: 48, borderRadius: 24 }}
                            contentFit="cover"
                        />
                    </Pressable>
                </View>

                {/* Featured Section (Live Sessions) */}
                <View className="mx-5 py-6">
                    <View>
                        <CustomText className="text-lg font-bold text-dark-brown mb-4">
                            Live Sessions
                        </CustomText>
                    </View>
                    {isFeaturedSessionsLoading && featuredSessions.length === 0 ? (
                        <FeaturedSessionsSkeleton />
                    ) : error ? (
                        <CustomText className="text-red-500">{error}</CustomText>
                    ) : featuredSessions.length === 0 ? (
                        <CustomText className="text-dark-brown text-center py-4">No live sessions available</CustomText>
                    ) : (
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
                                renderItem={renderFeaturedItem}
                                keyExtractor={(item) => item.id}
                                onViewableItemsChanged={onViewableItemsChanged}
                                viewabilityConfig={viewabilityConfig}
                                removeClippedSubviews={true}
                                initialNumToRender={2}
                                maxToRenderPerBatch={2}
                                windowSize={3}
                            />
                            <View className='relative flex justify-center items-center mt-2'>
                                <Pagination data={featuredSessions} scrollX={scrollX} />
                            </View>
                        </View>
                    )}
                </View>

                {/* Categories */}
                <View className="px-6 py-6">
                    <CategoryGrid />
                </View>

                {/* Playlist List */}
                <View className="px-6 py-6">
                    <View className='flex flex-row justify-between items-center'>
                        <CustomText className="text-lg font-bold text-dark-brown">
                            Playlist
                        </CustomText>
                        <TouchableOpacity
                            onPress={() => router.push(ROUTES.PLAYLIST)}
                        >
                            <CustomText className="text-base text-[#1E1E1E] font-semibold">
                                See all
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {isPlaylistsLoading && playlists.length === 0 ? (
                        <PlaylistsSkeleton />
                    ) : error ? (
                        <CustomText className="text-red-500">{error}</CustomText>
                    ) : (
                        <View className="flex-col mt-4">
                            {playlists.slice(0, 5).map((playlist) => (
                                <PlaylistItem
                                    key={playlist.id}
                                    playlist={playlist}
                                    onPress={() => router.push(ROUTES.PLAYLIST_DETAIL(playlist.id))}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
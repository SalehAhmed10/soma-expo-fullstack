// import React, { useState } from 'react';
// import { View, SafeAreaView, ScrollView, Pressable, TextInput, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
// import CustomText from '@/components/CustomText';
// import { Link, router } from 'expo-router';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { sessionsData } from '@/constants/data';
// import CategoryGrid from '@/components/CategoryGrid';



// const sessions = [
//     { id: '1', title: 'Morning Yoga', instructor: 'Sarah', time: '9:00 AM' },
//     { id: '2', title: 'Meditation', instructor: 'John', time: '2:00 PM' },
//     { id: '3', title: 'Sound Healing', instructor: 'Maya', time: '5:00 PM' },
// ];
// const { width } = Dimensions.get('window');
// const cardWidth = width - 32; // 16px padding on each side


// const categories = [
//     { id: '1', title: 'Yoga', image: require('@/assets/images/soma/categoriesimages/yoga.png') },
//     { id: '2', title: 'Meditation', image: require('@/assets/images/soma/categoriesimages/meditation.png') },
//     { id: '3', title: 'Soundbath', image: require('@/assets/images/soma/categoriesimages/soundbath.png') },
//     { id: '4', title: 'Breathwork', image: require('@/assets/images/soma/categoriesimages/breathwork.png') },
//     { id: '5', title: 'Rest & Relax', image: require('@/assets/images/soma/categoriesimages/restandrelax.png') },
//     { id: '6', title: 'Tone , Strengthen & Energise', image: require('@/assets/images/soma/categoriesimages/Tone-strengthen-energise.png') },
// ];
// export default function SessionsScreen() {

//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//     // Move navigation logic to useEffect or event handler
//     const handleSearch = () => {
//         router.push('/session/search');
//     };
//     return (

//         <>
//             <SafeAreaView className="flex-1 bg-[#E8E1D9]">
//                 <ScrollView className="flex-1">
//                     <View className="px-6 pt-12">

//                         {/* session header */}
//                         <View className="flex-row justify-between items-center mb-6">
//                             <CustomText className="text-xl font-bold text-dark-brown">
//                                 Sessions
//                             </CustomText>
//                         </View>

//                         {/* Search Bar */}
//                         <TouchableOpacity
//                             className="flex-1"
//                             onPress={handleSearch}
//                         >
//                             <View className="flex-row items-center bg-[#E8E1D9] rounded-xl mb-6 px-4 border border-[#00000024]">
//                                 <FontAwesome5 name="search" size={16} color="#31170C" />
//                                 <View className="flex-1 h-12 ml-2 text-dark-brown justify-center">
//                                     <CustomText className="text-[#31170C80]">
//                                         Search sessions
//                                     </CustomText>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>

//                         {/* Categories */}
//                         <View className="mb-8">

//                             <View className="mb-8">
//                                 <CategoryGrid />
//                             </View>


//                             {/* Sessions List */}
//                             <CustomText className="text-lg font-semibold text-dark-brown mb-4">
//                                 Live Sessions
//                             </CustomText>

//                             {sessionsData.map((session) => (
//                                 <Link
//                                     href={`/session/${session.id}`} key={session.id} asChild>
//                                     <Pressable>
//                                         <View
//                                             className="flex-row bg-[#E0BCA226] rounded-xl mb-4"
//                                             style={{ width: cardWidth, height: 80 }}
//                                         >
//                                             {/* Session Image */}
//                                             <Image
//                                                 source={session.image}
//                                                 style={{ width: 80, height: 64 }}
//                                                 className="m-2 rounded-lg"
//                                             />

//                                             {/* Session Info */}
//                                             <View className="flex-1 justify-center p-2 pr-3">
//                                                 <View className="flex-row justify-between items-center">
//                                                     <CustomText
//                                                         className="text-base font-semibold text-dark-brown"
//                                                         numberOfLines={1}
//                                                     >
//                                                         {session.title}
//                                                     </CustomText>
//                                                     {/* {session.live && (
//                                                 <View className="bg-[#31170C] px-2 py-1 rounded ml-2">
//                                                     <CustomText className="text-xs text-white">LIVE</CustomText>
//                                                 </View>
//                                             )} */}
//                                                 </View>

//                                                 <CustomText
//                                                     className="text-xm text-dark-brown opacity-60 mt-1"
//                                                     numberOfLines={1}
//                                                 >
//                                                     {session.description}
//                                                 </CustomText>

//                                                 <View className="flex-row items-center mt-1">
//                                                     <FontAwesome5 name="clock" size={12} color="#31170C" />
//                                                     <CustomText className="text-xs text-dark-brown ml-1">
//                                                         {session.length}
//                                                     </CustomText>
//                                                     <CustomText className="text-xs text-dark-brown ml-3">
//                                                         {session.date}
//                                                     </CustomText>
//                                                     {session.live && (
//                                                         <View
//                                                             className="flex-row items-center px-2 ml-2 justify-center"
//                                                             style={{
//                                                                 width: 65.58,
//                                                                 height: 23.1,
//                                                                 borderRadius: 11.55,
//                                                                 backgroundColor: '#FF8A8070'
//                                                             }}
//                                                         >
//                                                             <View
//                                                                 style={{
//                                                                     width: 6,
//                                                                     height: 6,
//                                                                     borderRadius: 3,
//                                                                     backgroundColor: '#E45841',
//                                                                     marginRight: 4
//                                                                 }}
//                                                             />
//                                                             <CustomText
//                                                                 className="text-xs"
//                                                                 style={{ color: '#E45841' }}
//                                                             >
//                                                                 LIVE
//                                                             </CustomText>
//                                                         </View>
//                                                     )}
//                                                 </View>
//                                             </View>
//                                         </View>
//                                     </Pressable>
//                                 </Link>
//                             ))}
//                         </View>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </>
//     );
// }


import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, Pressable, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomText from '@/components/CustomText';
import { Link, router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import CategoryGrid from '@/components/CategoryGrid';
import { useContentStore, HomeScreenSession } from '@/store/contentStore'; // Import store and type

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // 16px padding on each side

// Helper function to format duration (e.g., 3600 seconds to "1 hr" or "60 min")
const formatDuration = (seconds: number | null): string => {
    if (seconds === null || seconds === undefined) return 'N/A';
    if (seconds < 60) return `${seconds} sec`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours} hr`;
    return `${hours} hr ${remainingMinutes} min`;
};

// Helper function to format date (e.g., "2025-05-22T01:37:00.000Z" to "May 22, 2025")
const formatDate = (dateString?: string | null): string => {
    if (!dateString) return 'Date N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
        return 'Invalid Date';
    }
};


export default function SessionsScreen() {
    const {
        featuredSessions, // These are your live sessions from the store
        fetchFeaturedSessions,
        isFeaturedSessionsLoading,
        error
    } = useContentStore();

    // const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Keep if needed for category filtering later

    useEffect(() => {
        fetchFeaturedSessions(); // Fetch live sessions when the component mounts
    }, [fetchFeaturedSessions]);

    const handleSearch = () => {
        router.push('/session/search');
    };

    // Filter for sessions that are explicitly of type 'LIVE'
    // The endpoint /session/live-sessions should ideally only return live sessions,
    // but an extra client-side filter can be a safeguard.
    const liveSessionsToDisplay = featuredSessions.filter(session => session.type === 'LIVE');

    return (
        <>
            <SafeAreaView className="flex-1 bg-[#E8E1D9]">
                <ScrollView className="flex-1">
                    <View className="px-6 pt-12">

                        {/* session header */}
                        <View className="flex-row justify-between items-center mb-6">
                            <CustomText className="text-xl font-bold text-dark-brown">
                                Sessions
                            </CustomText>
                        </View>

                        {/* Search Bar */}
                        <TouchableOpacity
                            className="flex-1"
                            onPress={handleSearch}
                        >
                            <View className="flex-row items-center bg-[#E8E1D9] rounded-xl mb-6 px-4 border border-[#00000024]">
                                <FontAwesome5 name="search" size={16} color="#31170C" />
                                <View className="flex-1 h-12 ml-2 text-dark-brown justify-center">
                                    <CustomText className="text-[#31170C80]">
                                        Search sessions
                                    </CustomText>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Categories */}
                        <View className="mb-8">
                            <View className="mb-8">
                                <CategoryGrid />
                            </View>

                            {/* Sessions List */}
                            <CustomText className="text-lg font-semibold text-dark-brown mb-4">
                                Live Sessions
                            </CustomText>

                            {isFeaturedSessionsLoading && (
                                <View className="flex-1 justify-center items-center py-10">
                                    <ActivityIndicator size="large" color="#31170C" />
                                    <CustomText className="mt-2 text-dark-brown">Loading live sessions...</CustomText>
                                </View>
                            )}

                            {!isFeaturedSessionsLoading && error && (
                                <View className="flex-1 justify-center items-center py-10">
                                    <CustomText className="text-red-500 text-center">Error loading sessions: {error}</CustomText>
                                    <TouchableOpacity onPress={() => fetchFeaturedSessions()} className="mt-4 bg-dark-brown py-2 px-4 rounded">
                                        <CustomText className="text-white">Try Again</CustomText>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {!isFeaturedSessionsLoading && !error && liveSessionsToDisplay.length === 0 && (
                                <View className="flex-1 justify-center items-center py-10">
                                    <CustomText className="text-dark-brown opacity-70">No live sessions available at the moment.</CustomText>
                                </View>
                            )}

                            {!isFeaturedSessionsLoading && !error && liveSessionsToDisplay.length > 0 && (
                                liveSessionsToDisplay.map((session: HomeScreenSession) => (
                                    <Link
                                        href={{
                                            pathname: "/session/player/[id]",
                                            params: {
                                                id: session.id,
                                                videoUrl: session.fileUrl || 'default_video_url_if_null', // Provide a fallback or handle null
                                                title: session.title,
                                                duration: session.duration?.toString() || '0',
                                            }
                                        }}
                                        key={session.id}
                                        asChild
                                    >
                                        <Pressable>
                                            <View
                                                className="flex-row bg-[#E0BCA226] rounded-xl mb-4"
                                                style={{ width: cardWidth, height: 80 }}
                                            >
                                                {/* Session Image */}
                                                <Image
                                                    source={session.thumbnailUrl ? { uri: session.thumbnailUrl } : require('@/assets/images/soma/placeholder.png')} // Fallback image
                                                    style={{ width: 80, height: 64 }}
                                                    className="m-2 rounded-lg"
                                                />

                                                {/* Session Info */}
                                                <View className="flex-1 justify-center p-2 pr-3">
                                                    <View className="flex-row justify-between items-center">
                                                        <CustomText
                                                            className="text-base font-semibold text-dark-brown"
                                                            numberOfLines={1}
                                                        >
                                                            {session.title}
                                                        </CustomText>
                                                    </View>

                                                    <CustomText
                                                        className="text-sm text-dark-brown opacity-60 mt-1"
                                                        numberOfLines={1}
                                                    >
                                                        {session.description || 'No description available.'}
                                                    </CustomText>

                                                    <View className="flex-row items-center mt-1">
                                                        <FontAwesome5 name="clock" size={12} color="#31170C" />
                                                        <CustomText className="text-xs text-dark-brown ml-1">
                                                            {formatDuration(session.duration)}
                                                        </CustomText>
                                                        <CustomText className="text-xs text-dark-brown ml-3">
                                                            {formatDate(session.startTime)}
                                                        </CustomText>
                                                        {session.type === 'LIVE' && (
                                                            <View
                                                                className="flex-row items-center px-2 ml-2 justify-center"
                                                                style={{
                                                                    width: 65.58,
                                                                    height: 23.1,
                                                                    borderRadius: 11.55,
                                                                    backgroundColor: '#FF8A8070'
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        width: 6,
                                                                        height: 6,
                                                                        borderRadius: 3,
                                                                        backgroundColor: '#E45841',
                                                                        marginRight: 4
                                                                    }}
                                                                />
                                                                <CustomText
                                                                    className="text-xs"
                                                                    style={{ color: '#E45841' }}
                                                                >
                                                                    LIVE
                                                                </CustomText>
                                                            </View>
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </Link>
                                ))
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
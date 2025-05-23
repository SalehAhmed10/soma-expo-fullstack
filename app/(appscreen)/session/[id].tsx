


// import { View, Image, ScrollView, Pressable, Dimensions, SafeAreaView } from 'react-native';
// import { useLocalSearchParams, router, usePathname } from 'expo-router';
// import CustomText from '@/components/CustomText';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { sessionsData } from '@/constants/data';
// import CustomButton from '@/components/buttons/CustomButton';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width } = Dimensions.get('window');

// export default function SessionDetailScreen() {
//     const { id } = useLocalSearchParams();
//     const session = sessionsData.find(s => s.id === id);



//     if (!session) {
//         router.back();
//         return null;
//     }

//     return (


//         <SafeAreaView className="flex-1 bg-screen-bg">
//             <ScrollView className="flex-1">
//                 {/* Header Image */}
//                 <View className="relative">
//                     <Image
//                         source={session.image}
//                         className="bg-gray-200"
//                         style={{ width, height: 250 }}
//                     />
//                     <LinearGradient
//                         colors={['rgba(232, 225, 217, 0)', 'rgba(232, 225, 217, 1)']}
//                         className="absolute bottom-0 left-0 right-0 h-32"
//                     />
//                     <Pressable
//                         className="absolute top-12 left-4 w-10 h-10 bg-[#E8E1D9] rounded-full items-center justify-center"
//                         onPress={() => router.back()}
//                     >
//                         <FontAwesome5 name="arrow-left" size={20} color="#31170C" />
//                     </Pressable>
//                     <Pressable
//                         className="absolute top-12 right-4 w-10 h-10 bg-[#E8E1D9] rounded-full items-center justify-center"
//                         onPress={() => {/* Add menu handler */ }}
//                     >
//                         <FontAwesome5 name="ellipsis-v" size={20} color="#31170C" />
//                     </Pressable>
//                 </View>

//                 {/* Content */}
//                 <View className="px-6 pt-6 pb-20">
//                     {/* Title and Live Badge */}
//                     <View className="flex-row items-center justify-between mb-2">
//                         <CustomText className="text-xl font-semibold text-dark-brown flex-1">
//                             {session.title}

//                         </CustomText>

//                     </View>
//                     {/* Session Info */}
//                     <View className="flex-row items-center mb-4">
//                         <FontAwesome5 name="clock" size={14} color="#31170C" />
//                         <CustomText className="text-sm text-dark-brown ml-2">
//                             {session.length}
//                         </CustomText>
//                         <CustomText className="text-sm text-dark-brown ml-4">
//                             {session.date}
//                         </CustomText>
//                         {session.live && (
//                             <View
//                                 className="flex-row items-center px-2 ml-2 justify-center"
//                                 style={{
//                                     width: 65.58,
//                                     height: 23.1,
//                                     borderRadius: 11.55,
//                                     backgroundColor: '#FF8A8070'
//                                 }}
//                             >
//                                 <View
//                                     style={{
//                                         width: 6,
//                                         height: 6,
//                                         borderRadius: 3,
//                                         backgroundColor: '#E45841',
//                                         marginRight: 4
//                                     }}
//                                 />
//                                 <CustomText
//                                     className="text-xs"
//                                     style={{ color: '#E45841' }}
//                                 >
//                                     LIVE
//                                 </CustomText>
//                             </View>
//                         )}
//                     </View>

//                     {/* Description */}
//                     <CustomText className="text-base text-dark-brown opacity-80 mb-6">
//                         {session.description}
//                     </CustomText>

//                 </View>
//             </ScrollView>

//             {/* Fixed Button at Bottom */}
//             <View className="px-6 pb-8 pt-4 bg-screen-bg">
//                 <CustomButton
//                     // onPress={() => handleSessionAction()}
//                     variant="primary"
//                 >
//                     {session.live ? 'Join Session' : 'Book Session'}
//                 </CustomButton>
//             </View>
//         </SafeAreaView>
//     );
// }


// import { View, Image, ScrollView, Pressable, Dimensions, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import CustomText from '@/components/CustomText';
// import { FontAwesome5 } from '@expo/vector-icons';
// import CustomButton from '@/components/buttons/CustomButton';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useEffect, useState } from 'react';
// import api from '@/utils/api'; // Assuming you have an API utility

// const { width } = Dimensions.get('window');

// interface SessionDetail {
//     id: string;
//     title: string;
//     description: string | null; // Description can be null
//     sessionCategoryId: string;
//     startTime: string | null;
//     eventDuration: number | null; // Duration in minutes, optional
//     instructor: string | null; // Instructor can be null
//     type: string; // e.g., "LIVE", "PRE_RECORDED"
//     sessionItem: {
//         content: {
//             id: string;
//             title: string;
//             duration: number; // Duration in seconds
//             type: string; // Content type, e.g., "VIDEO", "AUDIO"
//             level: string;
//             intention: string | null;
//             fileUrl: string | null;
//             thumbnailUrl: string | null;
//             signedFileUrl: string | null;
//             signedThumbnailUrl: string | null;
//             createdAt: string;
//             updatedAt: string;
//         } | null;
//     } | null;
//     category: {
//         id: string;
//         name: string;
//         description: string | null;
//         imageUrl: string | null;
//         isDefault: boolean;
//         parentId: string | null;
//         createdAt: string;
//         updatedAt: string;
//     };
//     user: { // User who created the session
//         id: string;
//         fullName: string | null;
//         email: string;
//         profileImage: string | null;
//         signedProfileImageUrl: string | null;
//     };
// }

// interface ApiResponse {
//     success: boolean;
//     data: SessionDetail;
//     error?: string;
// }

// export default function SessionDetailScreen() {
//     const { id } = useLocalSearchParams();
//     const [session, setSession] = useState<SessionDetail | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchSession = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 console.log(`Fetching session detail for ID: ${id}`);

//                 // Use your API service with the correct endpoint
//                 const response = await api.get<ApiResponse>(`/session/session-detail/${id}`);

//                 if (response.data.success) {
//                     setSession(response.data.data);
//                     console.log('Session data loaded successfully:', response.data.data?.title);
//                 } else {
//                     setError(response.data.error || 'Failed to fetch session details');
//                     console.error('API returned error:', response.data.error);
//                 }
//             } catch (error: any) {
//                 console.error('Error fetching session:', error);
//                 setError(error.message || 'Failed to load session');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchSession();
//         }
//     }, [id]);

//     // Loading state
//     if (loading) {
//         return (
//             <SafeAreaView className="flex-1 bg-screen-bg">
//                 
//                 <View className="flex-1 justify-center items-center">
//                     <ActivityIndicator size="large" color="#31170C" />
//                     <CustomText className="text-dark-brown mt-4">Loading session...</CustomText>
//                 </View>
//             </SafeAreaView>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <SafeAreaView className="flex-1 bg-screen-bg">
//                 
//                 <View className="flex-1 justify-center items-center px-6">
//                     <CustomText className="text-red-500 text-center mb-4">{error}</CustomText>
//                     <CustomButton
//                         variant="secondary"
//                         onPress={() => router.back()}
//                     >
//                         Go Back
//                     </CustomButton>
//                 </View>
//             </SafeAreaView>
//         );
//     }

//     // Session not found
//     if (!session) {
//         return (
//             <SafeAreaView className="flex-1 bg-screen-bg">
//                 
//                 <View className="flex-1 justify-center items-center px-6">
//                     <CustomText className="text-dark-brown text-center mb-4">Session not found</CustomText>
//                     <CustomButton
//                         variant="secondary"
//                         onPress={() => router.back()}
//                     >
//                         Go Back
//                     </CustomButton>
//                 </View>
//             </SafeAreaView>
//         );
//     }

//     // Format duration from seconds to HH:MM or MM:SS
//     const formatDuration = (totalSeconds: number | null) => {
//         if (totalSeconds === null || totalSeconds < 0) return 'N/A';

//         const hours = Math.floor(totalSeconds / 3600);
//         const minutes = Math.floor((totalSeconds % 3600) / 60);
//         const seconds = Math.floor(totalSeconds % 60);

//         if (hours > 0) {
//             return `${hours}hr ${minutes}min`;
//         } else if (minutes > 0) {
//             return `${minutes}min`;
//         } else {
//             return `${seconds}sec`; // Or just show 0min if seconds are 0
//         }
//     };


//     // Format date and time like "24 August 2024, 5:00 AM"
//     const formatDateTime = (dateString: string | null) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);

//         const optionsDate: Intl.DateTimeFormatOptions = {
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric',
//         };
//         const optionsTime: Intl.DateTimeFormatOptions = {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//         };

//         const formattedDate = date.toLocaleDateString('en-US', optionsDate);
//         const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

//         return `${formattedDate}, ${formattedTime}`;
//     };

//     // Determine which duration to use
//     const durationInSeconds = session.sessionItem?.content?.duration ?? (session.eventDuration !== null ? session.eventDuration * 60 : null);


//     return (
//         <SafeAreaView className="flex-1 bg-screen-bg">
//             
//             <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
//                 {/* Header Image */}
//                 <View className="relative">
//                     <Image
//                         source={
//                             session.sessionItem?.content?.signedThumbnailUrl || session.category?.imageUrl
//                                 ? { uri: session.sessionItem?.content?.signedThumbnailUrl || session.category?.imageUrl || undefined }
//                                 : require('@/assets/images/soma/placeholder.png') // Add a local placeholder image
//                         }
//                         className="bg-gray-200"
//                         style={{ width, height: 250 }}
//                         resizeMode="cover"
//                     />
//                     {/* Gradient Overlay */}
//                     <LinearGradient
//                         colors={['rgba(232, 225, 217, 0)', 'rgba(232, 225, 217, 1)']}
//                         className="absolute bottom-0 left-0 right-0 h-32"
//                         pointerEvents="none"
//                     />
//                     {/* Back Button */}
//                     <Pressable
//                         className="absolute top-12 left-4 w-10 h-10 bg-[#E8E1D9] rounded-full items-center justify-center"
//                         onPress={() => router.back()}
//                     >
//                         <FontAwesome5 name="arrow-left" size={20} color="#31170C" />
//                     </Pressable>
//                     {/* Menu Button */}
//                     <Pressable
//                         className="absolute top-12 right-4 w-10 h-10 bg-[#E8E1D9] rounded-full items-center justify-center"
//                         onPress={() => {/* Add menu handler */ }}
//                     >
//                         <FontAwesome5 name="ellipsis-v" size={20} color="#31170C" />
//                     </Pressable>
//                 </View>

//                 {/* Content */}
//                 <View className="px-6 pt-6">
//                     {/* Title */}
//                     <CustomText className="text-xl font-semibold text-dark-brown mb-4">
//                         {session.title}
//                     </CustomText>

//                     {/* Session Info: Duration, Date, Live Badge */}
//                     <View className="mb-4">
//                         {/* Duration and Date Row */}
//                         <View className="flex-row items-center mb-2">
//                             {durationInSeconds !== null && (
//                                 <View className="flex-row items-center mr-6">
//                                     <FontAwesome5 name="clock" size={14} color="#31170C" />
//                                     <CustomText className="text-sm text-dark-brown ml-2">
//                                         {formatDuration(durationInSeconds)}
//                                     </CustomText>
//                                 </View>
//                             )}

//                             {session.startTime && (
//                                 <View className="flex-row items-center flex-1">
//                                     <FontAwesome5 name="calendar-alt" size={14} color="#31170C" />
//                                     <CustomText className="text-sm text-dark-brown ml-2" numberOfLines={1}>
//                                         {formatDateTime(session.startTime)}
//                                     </CustomText>
//                                 </View>
//                             )}
//                         </View>

//                         {/* Live Badge Row */}
//                         {session.type === 'LIVE' && (
//                             <View className="flex-row">
//                                 <View
//                                     className="flex-row items-center px-2 justify-center"
//                                     style={{
//                                         height: 23.1,
//                                         borderRadius: 11.55,
//                                         backgroundColor: '#FF8A8070'
//                                     }}
//                                 >
//                                     <View
//                                         style={{
//                                             width: 6,
//                                             height: 6,
//                                             borderRadius: 3,
//                                             backgroundColor: '#E45841',
//                                             marginRight: 4
//                                         }}
//                                     />
//                                     <CustomText
//                                         className="text-xs"
//                                         style={{ color: '#E45841' }}
//                                     >
//                                         LIVE
//                                     </CustomText>
//                                 </View>
//                             </View>
//                         )}
//                     </View>

//                     {/* Description */}
//                     {session.description && (
//                         <CustomText className="text-base text-dark-brown opacity-80 mb-6">
//                             {session.description}
//                         </CustomText>
//                     )}
//                 </View>
//             </ScrollView>

//             {/* Fixed Button at Bottom */}
//             <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-screen-bg">
//                 <CustomButton
//                     variant="primary"
//                     onPress={() => {
//                         // Add session start/join logic here
//                         console.log(`${session.type === 'LIVE' ? 'Joining' : 'Starting'} session:`, session.id);
//                     }}
//                 >
//                     {session.type === 'LIVE' ? 'JOIN NOW' : 'START SESSION'}
//                 </CustomButton>
//             </View>

//             <StatusBar barStyle="dark-content" backgroundColor={'#E8E1D9'} />
//         </SafeAreaView>
//     );
// }


import { View, Image, ScrollView, Pressable, Dimensions, SafeAreaView, ActivityIndicator, StatusBar, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import CustomText from '@/components/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '@/components/buttons/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import api from '@/utils/api';

const { width } = Dimensions.get('window');

interface SessionDetail {
    id: string;
    title: string;
    description: string | null;
    sessionCategoryId: string;
    startTime: string | null;
    eventDuration: number | null;
    instructor: string | null;
    type: string;
    sessionItem: {
        content: {
            id: string;
            title: string;
            duration: number;
            type: string;
            level: string;
            intention: string | null;
            fileUrl: string | null;
            thumbnailUrl: string | null;
            signedFileUrl: string | null;
            signedThumbnailUrl: string | null;
            createdAt: string;
            updatedAt: string;
        } | null;
    } | null;
    category: {
        id: string;
        name: string;
        description: string | null;
        imageUrl: string | null;
        isDefault: boolean;
        parentId: string | null;
        createdAt: string;
        updatedAt: string;
    };
    user: {
        id: string;
        fullName: string | null;
        email: string;
        profileImage: string | null;
        signedProfileImageUrl: string | null;
    };
}

interface ApiResponse {
    success: boolean;
    data: SessionDetail;
    error?: string;
}

export default function SessionDetailScreen() {
    const { id } = useLocalSearchParams();
    const [session, setSession] = useState<SessionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log(`Fetching session detail for ID: ${id}`);

                const response = await api.get<ApiResponse>(`/session/session-detail/${id}`);

                if (response.data.success) {
                    setSession(response.data.data);
                    console.log('Session data loaded successfully:', response.data.data?.title);
                } else {
                    setError(response.data.error || 'Failed to fetch session details');
                    console.error('API returned error:', response.data.error);
                }
            } catch (error: any) {
                console.error('Error fetching session:', error);
                setError(error.message || 'Failed to load session');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSession();
        }
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-screen-bg">

                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#31170C" />
                    <CustomText className="text-dark-brown mt-4">Loading session...</CustomText>
                </View>
            </SafeAreaView>
        );
    }

    // Error state
    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-screen-bg">

                <View className="flex-1 justify-center items-center px-6">
                    <CustomText className="text-red-500 text-center mb-4">{error}</CustomText>
                    <CustomButton
                        variant="secondary"
                        onPress={() => router.back()}
                    >
                        Go Back
                    </CustomButton>
                </View>
            </SafeAreaView>
        );
    }

    // Session not found
    if (!session) {
        return (
            <SafeAreaView className="flex-1 bg-screen-bg">

                <View className="flex-1 justify-center items-center px-6">
                    <CustomText className="text-dark-brown text-center mb-4">Session not found</CustomText>
                    <CustomButton
                        variant="secondary"
                        onPress={() => router.back()}
                    >
                        Go Back
                    </CustomButton>
                </View>
            </SafeAreaView>
        );
    }

    // Format duration from seconds
    const formatDuration = (totalSeconds: number | null) => {
        if (totalSeconds === null || totalSeconds < 0) return 'N/A';

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        if (hours > 0) {
            return `${hours}hr ${minutes}min`;
        } else if (minutes > 0) {
            return `${minutes}min`;
        } else {
            return `${seconds}sec`;
        }
    };

    // Format date and time
    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);

        const optionsDate: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        const optionsTime: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        };

        const formattedDate = date.toLocaleDateString('en-US', optionsDate);
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

        return `${formattedDate}, ${formattedTime}`;
    };

    // Determine which duration to use
    const durationInSeconds = session.sessionItem?.content?.duration ??
        (session.eventDuration !== null ? session.eventDuration * 60 : null);

    // Get image source safely
    const getImageSource = () => {
        const imageUrl = session.sessionItem?.content?.signedThumbnailUrl || session.category?.imageUrl;
        if (imageUrl) {
            return { uri: imageUrl };
        }
        return require('@/assets/images/soma/placeholder.png');
    };

    // Handle session action
    const handleSessionAction = () => {
        if (session.type === 'LIVE') {
            console.log('Joining live session:', session.id);
            Alert.alert('Live Session', 'Live session functionality coming soon!');
        } else {
            const videoUrl = session.sessionItem?.content?.signedFileUrl;

            if (videoUrl) {
                router.push({
                    pathname: '/session/player/[id]', // This will now work correctly
                    params: {
                        id: session.id,
                        videoUrl: videoUrl,
                        title: session.title,
                        duration: durationInSeconds?.toString() || '0'
                    }
                });
            } else {
                Alert.alert(
                    'Video Unavailable',
                    'This session video is not available at the moment. Please try again later.',
                    [{ text: 'OK', style: 'default' }]
                );
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-screen-bg">

            <ScrollView className="flex-1">
                {/* Header Image */}
                <View className="relative">
                    <Image
                        source={getImageSource()}
                        className="bg-gray-200"
                        style={{ width, height: 250 }}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['rgba(232, 225, 217, 0)', 'rgba(232, 225, 217, 1)']}
                        className="absolute bottom-0 left-0 right-0 h-32"
                    />
                    <Pressable
                        className="absolute top-12 left-4 w-10 h-10 bg-[#E8E1D9] rounded-full items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <FontAwesome5 name="arrow-left" size={20} color="#31170C" />
                    </Pressable>
                    <Pressable
                        className="absolute top-12 right-4 w-10 h-10 bg-[#E8E1D9] rounded-full items-center justify-center"
                        onPress={() => {/* Add menu handler */ }}
                    >
                        <FontAwesome5 name="ellipsis-v" size={20} color="#31170C" />
                    </Pressable>
                </View>

                {/* Content */}
                <View className="px-6 pt-6 pb-20">
                    {/* Title */}
                    <View className="flex-row items-center justify-between mb-2">
                        <CustomText className="text-xl font-semibold text-dark-brown flex-1">
                            {session.title}
                        </CustomText>
                    </View>

                    {/* Session Info */}
                    <View className="flex-row items-center mb-4">
                        <FontAwesome5 name="clock" size={14} color="#31170C" />
                        <CustomText className="text-sm text-dark-brown ml-2">
                            {formatDuration(durationInSeconds)}
                        </CustomText>

                        {session.startTime && (
                            <CustomText className="text-sm text-dark-brown ml-4">
                                {new Date(session.startTime).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </CustomText>
                        )}

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

                    {/* Instructor */}
                    {session.instructor && (
                        <View className="flex-row items-center mb-4">
                            <FontAwesome5 name="user" size={14} color="#31170C" />
                            <CustomText className="text-sm text-dark-brown ml-2">
                                {session.instructor}
                            </CustomText>
                        </View>
                    )}

                    {/* Description */}
                    {session.description && (
                        <CustomText className="text-base text-dark-brown opacity-80 mb-6">
                            {session.description}
                        </CustomText>
                    )}

                    {/* Additional Info */}
                    {session.sessionItem?.content && (
                        <View className="mt-4">
                            {session.sessionItem.content.level && (
                                <View className="flex-row items-center mb-2">
                                    <FontAwesome5 name="signal" size={14} color="#31170C" />
                                    <CustomText className="text-sm text-dark-brown ml-2">
                                        Level: {session.sessionItem.content.level}
                                    </CustomText>
                                </View>
                            )}

                            {session.sessionItem.content.intention && (
                                <View className="flex-row items-center mb-2">
                                    <FontAwesome5 name="heart" size={14} color="#31170C" />
                                    <CustomText className="text-sm text-dark-brown ml-2">
                                        {session.sessionItem.content.intention}
                                    </CustomText>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Fixed Button at Bottom */}
            <View className="px-6 pb-8 pt-4 bg-screen-bg">
                <CustomButton
                    variant="primary"
                    onPress={handleSessionAction}
                >
                    {session.type === 'LIVE' ? 'Join Session' : 'Start Session'}
                </CustomButton>
            </View>
        </SafeAreaView>
    );
}
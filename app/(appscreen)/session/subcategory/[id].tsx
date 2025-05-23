// import { View, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
// import { router, useLocalSearchParams } from 'expo-router';
// import CustomText from '@/components/CustomText';
// import { Feather } from '@expo/vector-icons';
// import { sessionsData, subCategories } from '@/constants/data';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function SubCategoryDetailScreen() {
//     const params = useLocalSearchParams();
//     const subCategory = subCategories.find(sc => sc.id === params.id);
//     const filteredSessions = sessionsData.filter(s => s.subCategoryId === params.id);
//     const { width } = Dimensions.get('window');

//     return (
//         <SafeAreaView className="flex-1 bg-screen-bg-dark">
//             <ScrollView className="flex-1">
//                 {/* Header */}
//                 <View>
//                     <ImageBackground
//                         source={subCategory?.image}
//                         className="w-full h-[310.37px]"
//                         resizeMode="cover"
//                     >
//                         <TouchableOpacity
//                             className="absolute top-12 left-6 z-10"
//                             onPress={() => router.back()}
//                         >
//                             <Feather name="arrow-left" size={24} color="#fff" />
//                         </TouchableOpacity>

//                         <LinearGradient
//                             colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
//                             className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
//                         />
//                     </ImageBackground>

//                     <View className="p-6 -mt-20 flex justify-center flex-col items-center">
//                         <CustomText className="text-2xl font-bold text-center text-[#E8E1D9]">
//                             {subCategory?.title}
//                         </CustomText>
//                     </View>
//                 </View>

//                 {/* Sessions List */}
//                 <View className="px-6">
//                     {filteredSessions.map(session => (
//                         <TouchableOpacity
//                             key={session.id}
//                             className="flex-row items-center bg-[#1C2B31] rounded-xl p-4 mb-4"
//                             onPress={() => router.push(`/session/${session.id}`)}
//                         >
//                             <Image
//                                 source={session.image}
//                                 className="w-16 h-16 rounded-lg mr-4"
//                                 resizeMode="cover"
//                             />
//                             <View className="flex-1">
//                                 <CustomText className="text-base font-bold text-[#E8E1D9]">
//                                     {session.title}
//                                 </CustomText>
//                                 <View className="flex-row items-center mt-1">
//                                     <Feather name="clock" size={14} color="#E8E1D9" />
//                                     <CustomText className="ml-1 text-xs text-[#E8E1D9]">
//                                         {session.length}
//                                     </CustomText>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

import { View, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import CustomText from '@/components/CustomText';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import { IMAGE_ASSETS } from '@/constants/uiConstants';
import api from '@/utils/api';

interface Session {
    id: string;
    title: string;
    description: string;
    instructor: string | null;
    type: 'LIVE' | 'PRE_RECORDED';
    eventDuration: number | null;
    sessionItem: {
        content: {
            duration: number;
            thumbnailUrl: string;
            level: string;
            intention: string | null;
        }
    }
}

interface SubcategoryData {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string;
    sessions: Session[];
}

interface ApiResponse {
    success: boolean;
    data: SubcategoryData;
    error?: string;
}

export default function SubCategoryDetailScreen() {
    const params = useLocalSearchParams();
    const subcategoryId = params.id as string;

    const [subcategoryData, setSubcategoryData] = useState<SubcategoryData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const { width } = Dimensions.get('window');

    // Fetch subcategory and its sessions
    useEffect(() => {
        fetchSubcategoryData();
    }, [subcategoryId]);

    const fetchSubcategoryData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log(`Fetching subcategory data for ID: ${subcategoryId}`);

            const response = await api.get<ApiResponse>(`/session/session-category/${subcategoryId}`);

            if (response.data.success) {
                setSubcategoryData(response.data.data);
                console.log(`Found ${response.data.data.sessions.length} sessions for subcategory: ${response.data.data.name}`);
            } else {
                setError(response.data.error || 'Failed to fetch subcategory data');
            }
        } catch (err: any) {
            console.error('Error fetching subcategory data:', err);
            setError(err.message || 'Failed to load subcategory');
        } finally {
            setIsLoading(false);
        }
    };

    // Format duration from seconds to readable format
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes}m`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    // Handle image loading errors
    const handleImageError = (sessionId: string) => {
        setImageErrors(prev => ({ ...prev, [sessionId]: true }));
    };

    // Get full S3 URL for thumbnails
    const getThumbnailUrl = (thumbnailUrl: string) => {
        if (!thumbnailUrl) return null;

        // If it's already a full URL, return as is
        if (thumbnailUrl.startsWith('http')) {
            return thumbnailUrl;
        }

        // Otherwise, construct the S3 URL (you might need to adjust this based on your S3 setup)
        return `https://soma-app-bucket.s3.eu-north-1.amazonaws.com/${thumbnailUrl}`;
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-screen-bg-dark">

                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#E8E1D9" />
                    <CustomText className="text-[#E8E1D9] mt-4">Loading subcategory...</CustomText>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-screen-bg-dark">

                <View className="flex-1 justify-center items-center px-6">
                    <CustomText className="text-red-500 text-center mb-4">{error}</CustomText>
                    <TouchableOpacity
                        onPress={fetchSubcategoryData}
                        className="bg-[#1C2B31] px-6 py-3 rounded-lg"
                    >
                        <CustomText className="text-[#E8E1D9]">Retry</CustomText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (!subcategoryData) {
        return (
            <SafeAreaView className="flex-1 bg-screen-bg-dark">

                <View className="flex-1 justify-center items-center">
                    <CustomText className="text-[#E8E1D9]">Subcategory not found</CustomText>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-screen-bg-dark">

            <ScrollView className="flex-1">
                {/* Header */}
                <View>
                    <ImageBackground
                        source={subcategoryData.imageUrl ? { uri: subcategoryData.imageUrl } : IMAGE_ASSETS.CATEGORY_PLACEHOLDER}
                        className="w-full h-[310.37px]"
                        resizeMode="cover"
                    >
                        <TouchableOpacity
                            className="absolute top-12 left-6 z-10"
                            onPress={() => router.back()}
                        >
                            <View className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
                                <Feather name="arrow-left" size={24} color="#fff" />
                            </View>
                        </TouchableOpacity>

                        <LinearGradient
                            colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
                            className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
                        />
                    </ImageBackground>

                    <View className="p-6 -mt-20 flex justify-center flex-col items-center">
                        <CustomText className="text-2xl font-bold text-center text-[#E8E1D9]">
                            {subcategoryData.name}
                        </CustomText>
                        {subcategoryData.description && (
                            <CustomText className="text-sm text-[#E8E1D9]/70 text-center mt-2">
                                {subcategoryData.description}
                            </CustomText>
                        )}
                    </View>
                </View>

                {/* Sessions List */}
                <View className="px-6 mt-4">
                    <View className="mb-4">
                        <CustomText className="text-lg font-semibold text-[#E8E1D9] mb-1">
                            Sessions ({subcategoryData.sessions.length})
                        </CustomText>
                    </View>

                    {subcategoryData.sessions.length === 0 ? (
                        <View className="flex-1 justify-center items-center py-10">
                            <CustomText className="text-[#E8E1D9]/70 text-center">
                                No sessions available for this category yet.
                            </CustomText>
                        </View>
                    ) : (
                        subcategoryData.sessions.map(session => {
                            const thumbnailUrl = getThumbnailUrl(session.sessionItem.content.thumbnailUrl);
                            const duration = session.eventDuration || session.sessionItem.content.duration;

                            return (
                                <TouchableOpacity
                                    key={session.id}
                                    className="flex-row items-center bg-[#1C2B31] rounded-xl p-4 mb-4"
                                    onPress={() => router.push({
                                        pathname: '/session/[id]',
                                        params: { id: session.id }
                                    })}
                                >
                                    <View className="relative">
                                        <Image
                                            source={
                                                thumbnailUrl && !imageErrors[session.id]
                                                    ? { uri: thumbnailUrl }
                                                    : IMAGE_ASSETS.CATEGORY_PLACEHOLDER
                                            }
                                            className="w-16 h-16 rounded-lg mr-4"
                                            resizeMode="cover"
                                            onError={() => handleImageError(session.id)}
                                        />

                                        {/* Session type badge */}
                                        <View className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full ${session.type === 'LIVE' ? 'bg-red-500' : 'bg-green-500'
                                            }`}>
                                            <CustomText className="text-white text-xs font-bold">
                                                {session.type === 'LIVE' ? 'LIVE' : 'REC'}
                                            </CustomText>
                                        </View>
                                    </View>

                                    <View className="flex-1">
                                        <CustomText className="text-base font-bold text-[#E8E1D9] mb-1">
                                            {session.title}
                                        </CustomText>

                                        {session.instructor && (
                                            <CustomText className="text-xs text-[#E8E1D9]/70 mb-1">
                                                By {session.instructor}
                                            </CustomText>
                                        )}

                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-row items-center">
                                                <Feather name="clock" size={14} color="#E8E1D9" />
                                                <CustomText className="ml-1 text-xs text-[#E8E1D9]">
                                                    {formatDuration(duration)}
                                                </CustomText>
                                            </View>

                                            {session.sessionItem.content.level && (
                                                <View className="bg-[#E8E1D9]/20 px-2 py-1 rounded">
                                                    <CustomText className="text-xs text-[#E8E1D9]">
                                                        {session.sessionItem.content.level}
                                                    </CustomText>
                                                </View>
                                            )}
                                        </View>

                                        {session.sessionItem.content.intention && (
                                            <CustomText className="text-xs text-[#E8E1D9]/50 mt-1">
                                                {session.sessionItem.content.intention}
                                            </CustomText>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
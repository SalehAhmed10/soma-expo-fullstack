

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
    PLAYLISTNEW: {
        pathname: '/(appscreen)/playlist/new' as const
    },
    PLAYLIST: {
        pathname: '/playlists' as const
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
                source={{ uri: item.thumbnailUrl || 'https://fakeimg.pl/600x400?text=Session' }}
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

// PlaylistItem component (memoized) - Updated to use 'tracks' instead of 'contents'
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
                    source={{
                        uri: playlist.tracks?.[0]?.thumbnailUrl ||
                            playlist.image ||
                            'https://fakeimg.pl/600x400?text=Playlist'
                    }}
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
                        {playlist.contentCount || 0} tracks
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
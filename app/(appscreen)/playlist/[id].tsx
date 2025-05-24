
import { View, Image, StatusBar, ImageBackground, ScrollView, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import CustomText from '@/components/CustomText';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { BLURHASH_PLACEHOLDER } from '@/constants/uiConstants';
import api from '@/utils/api';

interface PlaylistTrack {
    id: string;
    title: string;
    description: string | null;
    duration: number;
    intention: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
    order: number;
}

interface PlaylistDetail {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    isPublic: boolean;
    isOwner: boolean;
    trackCount: number;
    tracks: PlaylistTrack[];
    owner: {
        id: string;
        name: string;
        email: string;
    } | null;
    category: {
        id: string;
        name: string;
    } | null;
    createdAt: string;
    updatedAt: string;
}

interface RecommendedSession {
    id: string;
    title: string;
    description: string | null;
    duration: number | null;
    thumbnailUrl: string | null;
    type: 'LIVE' | 'SCHEDULED' | 'PRE_RECORDED';
}

export default function PlaylistDetail() {
    const params = useLocalSearchParams<{ id: string; name?: string; image?: string }>();
    const [playlist, setPlaylist] = useState<PlaylistDetail | null>(null);
    const [recommendedSessions, setRecommendedSessions] = useState<RecommendedSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        if (params.id) {
            fetchPlaylistDetail();
            fetchRecommendedSessions();
        }
    }, [params.id]);

    const fetchPlaylistDetail = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching playlist detail for ID:', params.id);

            const response = await api.get(`/playlist/${params.id}`);

            if (response.data.success) {
                const playlistData = response.data.data;
                console.log('Playlist detail response:', playlistData);
                setPlaylist(playlistData);
                setEditName(playlistData.name);
                setEditDescription(playlistData.description || '');
            } else {
                throw new Error(response.data.error || 'Failed to fetch playlist');
            }
        } catch (err: any) {
            console.error('Error fetching playlist:', err);
            setError(err.message || 'Failed to load playlist');
        } finally {
            setLoading(false);
        }
    };

    const fetchRecommendedSessions = async () => {
        try {
            // Fetch some live sessions as recommendations
            const response = await api.get('/session/live-sessions?limit=3');

            if (response.data.success) {
                setRecommendedSessions(response.data.data || []);
            }
        } catch (err) {
            console.error('Error fetching recommended sessions:', err);
            // Don't show error for recommendations, just log it
        }
    };

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    const handleAddSession = async (sessionId: string) => {
        try {
            // Add session to playlist
            const response = await api.post(`/playlist/${params.id}/add-session`, {
                sessionId: sessionId
            });

            if (response.data.success) {
                Alert.alert('Success', 'Session added to playlist');
                fetchPlaylistDetail(); // Refresh playlist data
            } else {
                throw new Error(response.data.error || 'Failed to add session');
            }
        } catch (err: any) {
            console.error('Error adding session:', err);
            Alert.alert('Error', err.message || 'Failed to add session to playlist');
        }
    };

    const handlePlayTrack = (track: PlaylistTrack) => {
        // Navigate to audio player or handle play action
        console.log('Playing track:', track.title);
        router.push({
            pathname: '/(appscreen)/playlist/track/[id]',
            params: { id: track.id }
        });
    };

    const handleEditPlaylist = () => {
        if (!playlist?.isOwner) {
            Alert.alert('Permission Denied', 'You can only edit playlists you created.');
            return;
        }
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await api.put(`/playlist/${params.id}`, {
                name: editName.trim(),
                description: editDescription.trim() || null
            });

            if (response.data.success) {
                setPlaylist(prev => prev ? {
                    ...prev,
                    name: editName.trim(),
                    description: editDescription.trim() || null
                } : null);
                setIsEditing(false);
                Alert.alert('Success', 'Playlist updated successfully');
            } else {
                throw new Error(response.data.error || 'Failed to update playlist');
            }
        } catch (err: any) {
            console.error('Error updating playlist:', err);
            Alert.alert('Error', err.message || 'Failed to update playlist');
        }
    };

    const handleCancelEdit = () => {
        setEditName(playlist?.name || '');
        setEditDescription(playlist?.description || '');
        setIsEditing(false);
    };

    const handleDeletePlaylist = () => {
        if (!playlist?.isOwner) {
            Alert.alert('Permission Denied', 'You can only delete playlists you created.');
            return;
        }

        Alert.alert(
            'Delete Playlist',
            `Are you sure you want to delete "${playlist?.name}"? This action cannot be undone.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/playlist/${params.id}`);
                            router.back();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete playlist');
                        }
                    }
                }
            ]
        );
    };

    const handleRemoveTrack = async (trackId: string) => {
        if (!playlist?.isOwner) {
            Alert.alert('Permission Denied', 'You can only remove tracks from playlists you created.');
            return;
        }

        Alert.alert(
            'Remove Track',
            'Are you sure you want to remove this track from the playlist?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await api.delete(`/playlist/${params.id}/track/${trackId}`);
                            if (response.data.success) {
                                fetchPlaylistDetail(); // Refresh playlist data
                            } else {
                                throw new Error(response.data.error || 'Failed to remove track');
                            }
                        } catch (err: any) {
                            Alert.alert('Error', err.message || 'Failed to remove track');
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View className="flex-1 bg-screen-bg-dark justify-center items-center">
                <ActivityIndicator size="large" color="#E8E1D9" />
                <CustomText className="text-[#E8E1D9] mt-4">Loading playlist...</CustomText>
            </View>
        );
    }

    if (error || !playlist) {
        return (
            <View className="flex-1 bg-screen-bg-dark justify-center items-center p-6">
                <AntDesign name="exclamationcircleo" size={48} color="#EF4444" />
                <CustomText className="text-red-500 text-center mt-4 text-lg">
                    {error || 'Playlist not found'}
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

    // Check if this is user's own playlist (from "My Playlist" category)
    const isMyPlaylist = playlist.isOwner;

    return (
        <>
            <ScrollView className="flex-1 bg-screen-bg-dark">
                <View>
                    <ImageBackground
                        source={{
                            uri: playlist.image ||
                                playlist.tracks?.[0]?.thumbnailUrl ||
                                'https://fakeimg.pl/400x400/06171E/E8E1D9?text=Playlist'
                        }}
                        className="w-full h-[310.37px]"
                        resizeMode="cover"
                    >
                        <TouchableOpacity
                            className="absolute top-12 left-6 z-10"
                            onPress={() => router.back()}
                        >
                            <Feather name="arrow-left" size={24} color="#fff" />
                        </TouchableOpacity>

                        {/* Action buttons for playlist owner only */}
                        {isMyPlaylist && (
                            <View className="absolute top-12 right-6 z-10 flex-row gap-3">
                                {isEditing ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={handleSaveEdit}
                                            className="bg-green-600/80 p-2 rounded-full"
                                        >
                                            <AntDesign name="check" size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handleCancelEdit}
                                            className="bg-red-600/80 p-2 rounded-full"
                                        >
                                            <AntDesign name="close" size={20} color="#fff" />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity
                                            onPress={handleEditPlaylist}
                                            className="bg-black/50 p-2 rounded-full"
                                        >
                                            <AntDesign name="edit" size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handleDeletePlaylist}
                                            className="bg-black/50 p-2 rounded-full"
                                        >
                                            <AntDesign name="delete" size={20} color="#EF4444" />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        )}

                        <LinearGradient
                            colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
                            className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
                        />
                    </ImageBackground>

                    <View className="p-6 -mt-20 flex justify-center flex-col items-center">
                        {isEditing ? (
                            <View className="w-full">
                                <TextInput
                                    value={editName}
                                    onChangeText={setEditName}
                                    className="text-2xl font-bold text-center text-[#E8E1D9] mb-2 border-b border-[#CCB19D] pb-2"
                                    placeholder="Playlist name..."
                                    placeholderTextColor="#9CA3AF"
                                />
                                <TextInput
                                    value={editDescription}
                                    onChangeText={setEditDescription}
                                    className="text-sm text-[#E8E1D9] text-center border-b border-[#CCB19D] pb-2"
                                    placeholder="Description (optional)..."
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                />
                            </View>
                        ) : (
                            <>
                                <CustomText className="text-2xl font-bold text-center text-[#E8E1D9] mb-2">
                                    {playlist.name}
                                </CustomText>
                                {playlist.description && (
                                    <CustomText className="text-sm text-[#E8E1D9] opacity-60 text-center mb-2">
                                        {playlist.description}
                                    </CustomText>
                                )}
                            </>
                        )}

                        <View className="flex-row items-center gap-4 mt-2">
                            <CustomText className="text-xs text-[#E8E1D9] opacity-60">
                                {playlist.trackCount} tracks
                            </CustomText>
                            {playlist.category && (
                                <CustomText className="text-xs text-[#E8E1D9] opacity-60">
                                    {playlist.category.name}
                                </CustomText>
                            )}
                            {playlist.owner && (
                                <CustomText className="text-xs text-[#E8E1D9] opacity-60">
                                    by {playlist.owner.name}
                                </CustomText>
                            )}
                            {isMyPlaylist && (
                                <View className="bg-[#CCB19D] px-2 py-1 rounded">
                                    <CustomText className="text-[#06171E] text-xs font-semibold">
                                        My Playlist
                                    </CustomText>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Play All Button */}
                {/* {playlist.tracks.length > 0 && (
                    <View className="px-6 mb-6">
                        <TouchableOpacity
                            className="w-full h-[50px] bg-[#CCB19D] rounded-full items-center justify-center flex-row"
                            onPress={() => console.log('Play all tracks')}
                        >
                            <AntDesign name="play" size={20} color="#06171E" />
                            <CustomText className="text-[#06171E] text-base font-semibold ml-2">
                                Play All
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                )} */}

                {/* Tracks List */}
                {playlist.tracks.length === 0 ? (
                    <View className="px-6 py-10 items-center">
                        <CustomText className="text-xl font-bold text-[#E8E1D9] text-center mb-6">
                            {isMyPlaylist ? "Let's start building your playlist" : "This playlist is empty"}
                        </CustomText>

                        {isMyPlaylist && (
                            <TouchableOpacity
                                className="w-full h-[50px] border border-[#CCB19D] rounded-full items-center justify-center mb-12"
                                onPress={() => router.push('/session/search')}
                            >
                                <CustomText className="text-[#CCB19D] text-base">
                                    Add to this playlist
                                </CustomText>
                            </TouchableOpacity>
                        )}

                        {/* Recommended Sessions */}
                        {recommendedSessions.length > 0 && isMyPlaylist && (
                            <View className="w-full">
                                <CustomText className="text-lg font-bold text-[#E8E1D9] mb-6">
                                    Recommended Sessions
                                </CustomText>
                                {recommendedSessions.map(session => (
                                    <TouchableOpacity
                                        key={session.id}
                                        className="flex-row items-center bg-[#1C2B31] rounded-xl p-4 mb-4"
                                        onPress={() => handleAddSession(session.id)}
                                    >
                                        <ExpoImage
                                            source={{
                                                uri: session.thumbnailUrl || 'https://fakeimg.pl/60x60/1C2B31/E8E1D9?text=♪'
                                            }}
                                            style={{ width: 60, height: 60, borderRadius: 8, marginRight: 16 }}
                                            placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
                                            contentFit="cover"
                                            transition={300}
                                        />
                                        <View className="flex-1">
                                            <CustomText className="text-base font-bold text-[#E8E1D9]">
                                                {session.title}
                                            </CustomText>
                                            {session.description && (
                                                <CustomText className="text-sm text-[#E8E1D9] opacity-60" numberOfLines={1}>
                                                    {session.description}
                                                </CustomText>
                                            )}
                                            {session.duration && (
                                                <View className="flex-row items-center mt-1">
                                                    <Feather name="clock" size={14} color="#E8E1D9" />
                                                    <CustomText className="ml-1 text-xs text-[#E8E1D9]">
                                                        {formatDuration(session.duration)}
                                                    </CustomText>
                                                </View>
                                            )}
                                        </View>
                                        <AntDesign name="plus" size={20} color="#CCB19D" />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                ) : (
                    <View className="px-6 py-4">
                        <CustomText className="text-lg font-bold text-[#E8E1D9] mb-4">
                            Tracks
                        </CustomText>
                        {playlist.tracks
                            .sort((a, b) => a.order - b.order) // Sort by order
                            .map((track, index) => (
                                <TouchableOpacity
                                    key={track.id}
                                    onPress={() => handlePlayTrack(track)}
                                    className="w-full flex-row gap-4 items-center mb-4 bg-[#0F1C23]/50 rounded-xl p-4"
                                >
                                    <CustomText className="text-[#E8E1D9] text-lg font-bold w-6">
                                        {index + 1}
                                    </CustomText>
                                    <ExpoImage
                                        source={{
                                            uri: track.thumbnailUrl || 'https://fakeimg.pl/90x90/0F1C23/E8E1D9?text=♪'
                                        }}
                                        style={{ width: 60, height: 60, borderRadius: 8 }}
                                        placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
                                        contentFit="cover"
                                        transition={300}
                                    />
                                    <View className="flex-1">
                                        <CustomText className="text-base font-bold text-[#E8E1D9]" numberOfLines={1}>
                                            {track.title}
                                        </CustomText>
                                        {track.description && (
                                            <CustomText className="text-xs text-white opacity-60" numberOfLines={1}>
                                                {track.description}
                                            </CustomText>
                                        )}
                                        {track.intention && (
                                            <CustomText className="text-xs text-[#CCB19D]" numberOfLines={1}>
                                                {track.intention}
                                            </CustomText>
                                        )}
                                        <View className="flex-row items-center pt-1">
                                            <Feather name="clock" size={14} color="#E8E1D9" />
                                            <CustomText className="ml-1 text-xs text-[#E8E1D9]">
                                                {formatDuration(track.duration)}
                                            </CustomText>
                                        </View>
                                    </View>
                                    <View className="flex-row gap-2">
                                        <TouchableOpacity className="p-2">
                                            <AntDesign name="play" size={20} color="#CCB19D" />
                                        </TouchableOpacity>
                                        {isMyPlaylist && (
                                            <TouchableOpacity
                                                className="p-2"
                                                onPress={() => handleRemoveTrack(track.id)}
                                            >
                                                <AntDesign name="delete" size={20} color="#EF4444" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </View>
                )}
            </ScrollView>
        </>
    );
}
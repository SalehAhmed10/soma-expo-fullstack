import { View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
import CustomText from '@/components/CustomText';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

export default function NewPlaylist() {
    const [playlistName, setPlaylistName] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-[#E8E1D9]">
            {/* Header */}
            <View className="px-6 pt-12 mt-8 flex-row justify-end">
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="close" size={24} color="#31170C" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="flex-1 flex px-6 justify-center items-center w-full">
                <CustomText className="text-xl font-bold text-dark-brown text-center mb-6">
                    Give your playlist a name
                </CustomText>


                <TextInput
                    value={playlistName}
                    onChangeText={setPlaylistName}
                    placeholder="Playlist name"
                    className="w-[335.88px] h-[50px] border border-[#a36d47] rounded-[9px] px-6 mb-6"
                />

                <TouchableOpacity
                    className={`w-[262.84px] h-[59.93] rounded-[29.96px] items-center justify-center ${!playlistName.trim() ? 'bg-[#31170C]/50' : 'bg-[#31170C]'
                        }`}
                    onPress={() => {
                        if (!playlistName.trim()) return;

                        const newPlaylistId = Date.now().toString();
                        router.push({
                            pathname: '/playlist/[id]',
                            params: {
                                id: newPlaylistId,
                                name: playlistName,
                                image: require('@/assets/images/soma/playlistimages/playlistmusicimage.png')
                            }
                        });
                    }}
                >

                    <CustomText className="text-white text-base">
                        Create
                    </CustomText>
                </TouchableOpacity>

                <Link href="/(appscreen)/testtracks/trackplayer" asChild>
                    <CustomText className="text-base text-dark-brown mt-4 underline">
                        TEST TRACK PLAYER
                    </CustomText>
                </Link>
            </View>
        </SafeAreaView>
    );
}
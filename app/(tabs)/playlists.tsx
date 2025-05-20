import { View, Animated, ImageBackground, ScrollView, Pressable, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';



interface PlaylistItem {
    id: number;
    name: string;
    description?: string;
    image?: any;
}

interface Category {
    id: number;
    name: string;
    playlists: PlaylistItem[];
}

const playlistCategories: Category[] = [
    {
        id: 1,
        name: "Soma Sounds",
        playlists: [
            { id: 1, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
            { id: 2, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
            { id: 3, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
            { id: 4, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },

        ]
    },
    {
        id: 2,
        name: "Exclusive Release",
        // randomize 
        playlists: [

            { id: 1, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
            { id: 2, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
            { id: 3, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
            { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
        ]
    },

    {
        id: 3,
        name: "Soma Playlists",
        // randomize change order of list 
        playlists: [
            { id: 1, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
            { id: 2, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
            { id: 3, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
            { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
        ]

    },
    {
        id: 4,
        name: "Morning Playlists",
        // randomize change order of list
        playlists: [
            { id: 1, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
            { id: 2, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
            { id: 3, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
            { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
        ]

    }


];







export default function PlaylistsScreen() {
    // Inside component:
    const [activeTab, setActiveTab] = useState(0);

    const router = useRouter();

    const handlePlaylistPress = (playlist: PlaylistItem) => {
        router.push({
            pathname: '/playlist/track/[id]',
            params: {
                id: playlist.id,
                name: playlist.name,
                description: playlist.description,
                image: playlist.image // This works if image is a require() or a string URL
            }
        });
    };

    // Add inside component, before return:
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleTabChange = (index: number) => {
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
    };


    return (
        <View className="flex-1 bg-screen-bg">
            <StatusBar style="light" />

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
                            <TouchableOpacity onPress={() => router.push('/playlist/new')}>
                                <AntDesign name="pluscircleo" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {/* Fixed Tab Navigation */}
            <View className="px-6 -mt-6 ">
                <View className="relative border-b border-gray-300 pb-4">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        persistentScrollbar={true}
                        className="flex-row mt-4"
                        indicatorStyle="black"
                    >
                        {playlistCategories.map((category, index) => (
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
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView className="flex-1 px-6">
                <View className="flex-1 mt-4">
                    <View className="flex-row flex-wrap justify-between">
                        {playlistCategories[activeTab]?.playlists.map((playlist) => (
                            <Pressable
                                key={playlist.id}
                                className="w-[48%] mb-4"
                                onPress={() => handlePlaylistPress(playlist)}
                            >
                                <Image
                                    source={playlist.image}
                                    className="w-full h-[120px] rounded-lg mb-2"
                                    resizeMode="cover"
                                />
                                <CustomText className="text-base truncate">
                                    {playlist.name}
                                </CustomText>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
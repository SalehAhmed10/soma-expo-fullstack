import { View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import CustomText from '@/components/CustomText';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';




interface SoundLevels {
    head: number;
    sacrum: number;
    feet: number;
}

type SoundType = keyof SoundLevels;


interface Profile {
    id: number;
    name: string;
    icon: any; // Consider using proper image type
}


export default function SoundLevelScreen() {
    const [selectedProfile, setSelectedProfile] = useState(0);
    const [soundLevels, setSoundLevels] = useState<SoundLevels>({
        head: 50,
        sacrum: 50,
        feet: 50
    });


    const updateSoundLevel = (type: SoundType, value: number) => {
        setSoundLevels(prev => ({ ...prev, [type]: Math.round(value) }));
    };

    const profiles: Profile[] = [
        {
            id: 1,
            name: "Listen",
            icon: require('@/assets/images/soma/mymatimages/icons/profilelisten.png')
        },
        {
            id: 2,
            name: "Move",
            icon: require('@/assets/images/soma/mymatimages/icons/profilemove.png')
        },
        {
            id: 3,
            name: "Sit",
            icon: require('@/assets/images/soma/mymatimages/icons/profilesit.png')
        },
        {
            id: 4,
            name: "Lay Down",
            icon: require('@/assets/images/soma/mymatimages/icons/profilelaydown.png')
        },
        {
            id: 5,
            name: "Custom",
            icon: require('@/assets/images/soma/mymatimages/icons/profilecustom.png')
        },

    ]


    return (
        <SafeAreaView className="flex-1 bg-screen-bg">

            <ScrollView className="flex-1 ">


                {/* Header */}
                <View className="flex-row justify-between items-center px-6 pt-12 mt-8">
                    <CustomText className="text-base font-bold text-dark-brown">
                        Sound Levels
                    </CustomText>
                    <TouchableOpacity onPress={() => router.back()}>
                        <AntDesign name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View className="px-6 mt-8">
                    <CustomText className="text-sm text-dark-brown mb-6">
                        Lorem ipsum dolor sit amet consectetur. Sed magna etiam ut pretium nam tortor tellus.
                    </CustomText>

                    {/* Sound Level Section */}
                    <View className="bg-[#E0D3C7] rounded-lg h-[140.44px] mb-8 overflow-hidden">
                        <Image source={require('@/assets/images/soma/mymatimages/soundlevelheader.png')} className="rounded-lg" style={{
                            width: '100%',

                            resizeMode: 'contain',
                            transform: [{ scale: 1 }]
                        }}

                        />
                        <View className="flex-row justify-between px-4 items-end flex-1 py-2">
                            <CustomText className="text-xs font-semibold text-dark-brown">
                                HEAD
                            </CustomText>
                            <CustomText className="text-xs font-semibold text-dark-brown">
                                SACRUM
                            </CustomText>
                            <CustomText className="text-xs font-semibold text-dark-brown">
                                FEET
                            </CustomText>
                        </View>
                    </View>




                    {/* Profile Tabs */}
                    <View className="items-center justify-center w-full my-4">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                flexGrow: 1
                            }}
                        >
                            <View className="flex-row items-center justify-center">
                                {profiles.map((profile, index) => (
                                    <TouchableOpacity
                                        key={profile.id}
                                        onPress={() => setSelectedProfile(index)}
                                        className="items-center mx-3"
                                    >
                                        <View
                                            className={`w-14 h-14 rounded-full items-center justify-center mb-2 ${selectedProfile === index
                                                ? 'bg-[#A36D47]'
                                                : 'bg-transparent border border-[#A36D47]'
                                                }`}
                                        >
                                            <Image
                                                source={profile.icon}
                                                className="w-5 h-5"
                                                style={{
                                                    tintColor: selectedProfile === index ? '#FFFFFF' : '#A36D47'
                                                }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <CustomText
                                            className={`text-xs ${selectedProfile === index
                                                ? 'text-dark-brown font-bold'
                                                : 'text-dark-brown'
                                                }`}
                                        >
                                            {profile.name}
                                        </CustomText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>


                    {/* Sound Level Sliders */}
                    <View className="mb-8">
                        {(['head', 'sacrum', 'feet'] as SoundType[]).map((type) => (
                            <View key={type} className="mb-6">
                                <CustomText className="text-dark-brown mb-2">
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </CustomText>
                                <Slider
                                    value={soundLevels[type]}
                                    onSlidingComplete={(value) => updateSoundLevel(type, value)}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={1}
                                    minimumTrackTintColor="#A36D47"
                                    maximumTrackTintColor="#E0D3C7"
                                    thumbTintColor="#A36D47"
                                    style={{ height: 40 }}
                                />
                            </View>
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <TouchableOpacity
                        className="w-full h-[50px] bg-transparent   rounded-full items-center justify-center mb-4
                    border border-[#A36D47]"

                        // on press route to mymat
                        onPress={() => router.canGoBack() ? router.back() : router.push('/mymat')}
                    >
                        <CustomText className=" text-base">Done</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {/* Handle apply for all */ }}
                        className="mb-12"  // Add margin bottom
                    >
                        <CustomText className="text-dark-brown text-center">
                            Apply for all Mats
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}
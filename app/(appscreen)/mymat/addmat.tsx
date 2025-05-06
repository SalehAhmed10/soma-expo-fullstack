import { View, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import CustomText from '@/components/CustomText';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

export default function AddMatScreen() {
    const [isDiscovering, setIsDiscovering] = useState(false);
    const [isPaired, setIsPaired] = useState(false);
    const [matName, setMatName] = useState('');

    const handleMatSelection = () => {
        setIsDiscovering(true);
        // Simulate discovery process for 3 seconds
        setTimeout(() => {
            setIsDiscovering(false);
            setIsPaired(true);
        }, 3000);
    };

    return (
        <SafeAreaView className="flex-1 bg-screen-bg">
            <ScrollView className="flex-1">
                {/* Header Section */}
                <View>
                    <View className="flex flex-row justify-between items-center px-6 pt-12 mt-8">
                        <CustomText className="text-base font-bold text-dark-brown">
                            {isDiscovering ? 'Adding Mat' : 'Add Mat'}
                        </CustomText>
                        <TouchableOpacity onPress={() => router.back()}>
                            <AntDesign name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                {!isDiscovering && !isPaired && (
                    <View className='flex flex-col px-6 gap-5 my-10'>
                        <TouchableOpacity onPress={handleMatSelection}>
                            <ImageBackground
                                className='px-4'
                                source={require('@/assets/images/soma/mymatimages/addmatimage1.png')}
                                style={{
                                    height: 145,
                                    borderRadius: 13,
                                    overflow: 'hidden',
                                    justifyContent: 'center',
                                }}
                            >
                                <LinearGradient
                                    colors={['rgba(49, 23, 12, 0.2)', 'rgba(15, 0, 0, 1)']}
                                    start={[1, 0]}
                                    end={[0, 1]}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 145,
                                        borderRadius: 13,
                                    }}
                                />
                                <CustomText className="text-white text-xl font-semibold">
                                    For Your Self
                                </CustomText>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleMatSelection}>
                            <ImageBackground
                                className='px-4'
                                source={require('@/assets/images/soma/mymatimages/addmatimage2.png')}
                                style={{
                                    height: 145,
                                    borderRadius: 13,
                                    overflow: 'hidden',
                                    justifyContent: 'center',
                                }}
                            >
                                <LinearGradient
                                    colors={['rgba(49, 23, 12, 0.2)', 'rgba(15, 0, 0, 1)']}
                                    start={[1, 0]}
                                    end={[0, 1]}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 145,
                                        borderRadius: 13,
                                    }}
                                />
                                <CustomText className="text-white text-xl font-semibold">
                                    As A Instructor
                                </CustomText>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}

                {isDiscovering && (
                    <View className="px-6 py-10 items-center">
                        <Image
                            source={require('@/assets/images/soma/mymatimages/mymatphoneimage.png')}
                            className="w-full h-[200px] mb-4"
                            resizeMode="contain"
                        />
                        <CustomText className="text-base text-dark-brown text-center mt-4">
                            Discovering Mat near you{'\n'}Please wait...
                        </CustomText>
                    </View>
                )}

                {isPaired && (
                    <View className="px-6 py-10">
                        <Image
                            source={require('@/assets/images/soma/mymatimages/mymatphoneimage.png')}
                            className="w-full h-[200px] mb-4"
                            resizeMode="contain"
                        />
                        <CustomText className="text-base text-dark-brown text-center mb-6">
                            Paired successfully
                        </CustomText>

                        <TextInput
                            placeholder="Name your mat"
                            value={matName}
                            onChangeText={setMatName}
                            className="w-full h-[50px] border border-[#a36d47] rounded-[9px] px-6 mb-6"
                        />

                        <TouchableOpacity
                            className="w-full h-[50px] bg-dark-brown rounded-full items-center justify-center"
                            onPress={() => router.push('/mymat/mats')}
                        >
                            <CustomText className="text-white text-base">Done</CustomText>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '@/components/CustomText';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function TrackDetail() {
    return (
        <View className="flex-1 bg-[#06171E]">
            {/* Background Image with Gradient */}
            <Image
                className='h-full'
                source={require('@/assets/images/soma/playlistimages/trackbgimage.png')}
                style={{
                    width,
                    // height: height * 0.6,
                    position: 'absolute',
                    top: 0,
                }}
            />
            <LinearGradient
                colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
                style={{
                    width,
                    height: height * 0.6,
                    position: 'absolute',
                    // top: 0,
                    bottom: 0,
                }}
            />

            {/* Header */}
            <View className="px-6 pt-12 mt-8 flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <View>

                        <CustomText className="text-base font-bold text-white">
                            Now Playing
                        </CustomText>
                    </View>
                </View>
                <TouchableOpacity>
                    <Feather name="more-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Title Section */}
            <View className="flex-1 justify-center items-center">
                <CustomText className="text-2xl font-bold text-white">
                    Energy Morning
                </CustomText>
                <CustomText className="text-base text-white opacity-60 mt-2">
                    Gabs
                </CustomText>
            </View>

            {/* Track Controls */}
            <View className="px-6 pb-12">
                {/* Volume and Loop Row */}
                <View className="flex-row justify-between mb-8">
                    <TouchableOpacity>
                        <Feather name="volume-2" size={24} color="#CCB19D" />
                    </TouchableOpacity>
                    <View className="flex-row gap-6">
                        <TouchableOpacity>
                            <Feather name="repeat" size={24} color="#CCB19D" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="shuffle" size={24} color="#CCB19D" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Progress Bar */}
                <View className="mb-8">
                    <View className="h-1 bg-[#CCB19D]/20 rounded-full mb-2">
                        <View className="h-1 bg-[#834518] rounded-full" style={{ width: '30%' }} />
                    </View>
                    <View className="flex-row justify-between">
                        <CustomText className="text-sm text-[#CCB19D]">00:50</CustomText>
                        <CustomText className="text-sm text-[#CCB19D]">04:00</CustomText>
                    </View>
                </View>

                {/* Playback Controls */}
                <View className="flex-row justify-center items-center gap-12 mb-12">
                    <TouchableOpacity>
                        <Feather name="skip-back" size={24} color="#CCB19D" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View className="w-16 h-16 bg-[#CCB19D] rounded-full items-center justify-center">
                            <Feather name="pause" size={32} color="#06171E" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="skip-forward" size={24} color="#CCB19D" />
                    </TouchableOpacity>
                </View>

                {/* Adjust Sound Button */}
                <TouchableOpacity
                    className="h-[50px] border border-[#CCB19D] rounded-full items-center justify-center"
                    onPress={() => router.push('/mymat/soundlevel')}
                >
                    <CustomText className="text-[#CCB19D]">
                        Adjust Sound
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
}
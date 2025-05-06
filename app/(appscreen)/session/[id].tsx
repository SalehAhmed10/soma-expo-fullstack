


import { View, Image, ScrollView, Pressable, Dimensions, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router, usePathname } from 'expo-router';
import CustomText from '@/components/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import { sessionsData } from '@/constants/data';
import CustomButton from '@/components/buttons/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SessionDetailScreen() {
    const { id } = useLocalSearchParams();
    const session = sessionsData.find(s => s.id === id);



    if (!session) {
        router.back();
        return null;
    }

    return (


        <SafeAreaView className="flex-1 bg-screen-bg">
            <ScrollView className="flex-1">
                {/* Header Image */}
                <View className="relative">
                    <Image
                        source={session.image}
                        className="bg-gray-200"
                        style={{ width, height: 250 }}
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
                    {/* Title and Live Badge */}
                    <View className="flex-row items-center justify-between mb-2">
                        <CustomText className="text-xl font-semibold text-dark-brown flex-1">
                            {session.title}

                        </CustomText>

                    </View>
                    {/* Session Info */}
                    <View className="flex-row items-center mb-4">
                        <FontAwesome5 name="clock" size={14} color="#31170C" />
                        <CustomText className="text-sm text-dark-brown ml-2">
                            {session.length}
                        </CustomText>
                        <CustomText className="text-sm text-dark-brown ml-4">
                            {session.date}
                        </CustomText>
                        {session.live && (
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

                    {/* Description */}
                    <CustomText className="text-base text-dark-brown opacity-80 mb-6">
                        {session.description}
                    </CustomText>

                </View>
            </ScrollView>

            {/* Fixed Button at Bottom */}
            <View className="px-6 pb-8 pt-4 bg-screen-bg">
                <CustomButton
                    // onPress={() => handleSessionAction()}
                    variant="primary"
                >
                    {session.live ? 'Join Session' : 'Book Session'}
                </CustomButton>
            </View>
        </SafeAreaView>
    );
}
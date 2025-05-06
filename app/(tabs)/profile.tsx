import { View, Image, Pressable, ScrollView, ImageBackgroundBase, ImageBackground, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import CustomText from '@/components/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export default function ProfileScreen() {
    return (
        <ScrollView className="flex-1 bg-[#e8e1d9]">
            {/* Header */}
            <View className="flex-row justify-between items-center px-6 pt-12 mb-8">
                <CustomText className="text-xl font-semibold text-dark-brown">
                    Profile
                </CustomText>
                <Link href="/profile/account" asChild>
                    <Pressable>
                        <FontAwesome5 name="cog" size={24} color="#31170C" />
                    </Pressable>
                </Link>
            </View>

            {/* Profile Section */}
            <View className="items-center mb-8">
                <Image
                    source={require('@/assets/images/soma/avatar.png')}
                    className="w-24 h-24 rounded-full mb-4"
                />
                <CustomText className="text-xl font-semibold text-dark-brown mb-1">
                    Sarah Johnson
                </CustomText>
                <CustomText className="text-sm text-dark-brown opacity-60">
                    Joined 20 July 2024
                </CustomText>
            </View>

            {/* Stats Section */}
            <View className="px-6 mb-8">
                <CustomText className="text-lg font-semibold text-dark-brown mb-4">
                    Stats
                </CustomText>

                {/* Meditation Length Stat */}
                <View className="flex-row items-center  rounded-xl p-4 mb-3">
                    <View className="w-12 h-12 rounded-full bg-[#E0D3C7] items-center justify-center mr-4">
                        <FontAwesome5 name="clock" size={20} color="#31170C" />
                    </View>
                    <View>
                        <CustomText className="text-base font-semibold text-dark-brown">
                            4 minutes
                        </CustomText>
                        <CustomText className="text-sm text-dark-brown opacity-60">
                            Average meditation length
                        </CustomText>
                    </View>
                </View>

                {/* Meditation Length Stat */}
                <View className="flex-row items-center  rounded-xl p-4 mb-3">
                    <View className="w-12 h-12 rounded-full bg-[#E0D3C7] items-center justify-center mr-4">
                        <FontAwesome5 name="clock" size={20} color="#31170C" />
                    </View>
                    <View>
                        <CustomText className="text-base font-semibold text-dark-brown">
                            44 minutes
                        </CustomText>
                        <CustomText className="text-sm text-dark-brown opacity-60">
                            Average meditation length
                        </CustomText>
                    </View>
                </View>

                {/* Sessions Completed Stat */}
                <View className="flex-row items-center  rounded-xl p-4 mb-3">
                    <View className="w-12 h-12 rounded-full bg-[#E0D3C7] items-center justify-center mr-4">
                        <FontAwesome5 name="check-circle" size={20} color="#31170C" />
                    </View>
                    <View>
                        <CustomText className="text-base font-semibold text-dark-brown">
                            6 sessions
                        </CustomText>
                        <CustomText className="text-sm text-dark-brown opacity-60">
                            Completed this month
                        </CustomText>
                    </View>
                </View>



            </View>
            {/* Yoga Section reviewd and told me to remove this section*/}
            {/* <View className="px-6 mb-8">
                <CustomText className="text-lg font-semibold text-dark-brown mb-4">
                    Yoga Streaks
                </CustomText>

                <View className="flex-row items-center  rounded-xl p-4 mb-3">
                    <View className="w-12 h-12 rounded-full bg-[#E0D3C7] items-center justify-center mr-4">
                        <FontAwesome5 name="fire" size={20} color="#31170C" />
                    </View>
                    <View>
                        <CustomText className="text-base font-semibold text-dark-brown">
                            3 days
                        </CustomText>
                        <CustomText className="text-sm text-dark-brown opacity-60">
                            Current streak
                        </CustomText>
                    </View>
                </View>
            </View> */}
            {/* Subscription Section */}
            <View
                className="mb-6 px-6"
                style={{ height: 124.26 }}
            >
                <View style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    height: '100%'
                }}>
                    <ImageBackground
                        source={require("@/assets/images/soma/profileimages/subscriptionbg.png")}
                        className="w-full h-full justify-center p-4"
                        resizeMode="cover"
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.1)', 'rgba(49,23,12,0.5)']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                borderRadius: 12
                            }}
                        >
                            <TouchableOpacity
                                className='h-[124.26px] flex flex-col gap-2 p-4'
                                onPress={() => router.push('/subscription')}
                            >
                                <CustomText className="text-base text-white">
                                    Premium Monthly
                                </CustomText>
                                <CustomText className="text-sm text-white opacity-80">
                                    Next billing date: March 20, 2024
                                </CustomText>
                            </TouchableOpacity>
                        </LinearGradient>
                    </ImageBackground>
                </View>
            </View>
        </ScrollView>
    );
}
import CustomText from '@/components/CustomText';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AccountScreen() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || 'N/A');
            setEmail(user.email || 'N/A');
        }
    }, [user]);

    return (
        <View className="flex-1 bg-[#F3ECE6]">

            <View className="flex-row items-center pt-10 pb-4 px-4 border-b border-[#E5DED7] bg-[#F3ECE6]">
                <Pressable onPress={() => router.back()} className="pr-2">
                    <AntDesign name="arrowleft" size={28} color="#31170C" />
                </Pressable>
                <CustomText className="flex-1 text-xl font-bold text-[#31170C] text-center -ml-8">
                    Account & Subscription
                </CustomText>
            </View>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 8 }}>
                <View className="px-4 pt-4">

                    <View className="mb-4">
                        <View className="flex-row items-center justify-between mb-1">
                            <CustomText className="text-base font-semibold text-[#31170C]">Full Name</CustomText>
                            <Pressable>
                                <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
                            </Pressable>
                        </View>
                        <CustomText className="text-sm text-[#31170C]">{fullName}</CustomText>
                    </View>
                    <View className="h-[1px] bg-[#E5DED7] mb-2" />


                    <View className="mb-4">
                        <View className="flex-row items-center justify-between mb-1">
                            <CustomText className="text-base font-semibold text-[#31170C]">Email address</CustomText>
                            <Pressable>
                                <CustomText className="text-sm text-[#A97A50] font-medium">MANAGE</CustomText>
                            </Pressable>
                        </View>
                        <CustomText className="text-sm text-[#31170C]">{email}</CustomText>
                    </View>
                    <View className="h-[1px] bg-[#E5DED7] mb-2" />


                    <View className="mb-4">
                        <View className="flex-row items-center justify-between mb-1">
                            <CustomText className="text-base font-semibold text-[#31170C]">Password</CustomText>
                            <Pressable>
                                <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
                            </Pressable>
                        </View>
                        <CustomText className="text-sm text-[#31170C]">********</CustomText>
                    </View>
                    <View className="h-[1px] bg-[#E5DED7] mb-2" />


                    <View className="mb-4">
                        <View className="flex-row items-center justify-between mb-1">
                            <CustomText className="text-base font-semibold text-[#31170C]">Subscription details</CustomText>
                            <Pressable>
                                <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
                            </Pressable>
                        </View>
                        <CustomText className="text-sm text-[#31170C]">Free-Trial</CustomText>
                    </View>
                    <View className="h-[1px] bg-[#E5DED7] mb-2" />


                    <View className="mb-4">
                        <View className="flex-row items-center justify-between">
                            <CustomText className="text-base font-semibold text-[#31170C]">Delete Account</CustomText>
                            <Pressable>
                                <CustomText className="text-sm font-semibold text-[#E45841]">DELETE</CustomText>
                            </Pressable>
                        </View>
                    </View>


                    <View className="mb-4">


                        <Pressable onPress={() => {
                            logout();

                        }
                        } className="flex-row items-center justify-between">
                            <CustomText className="text-sm font-semibold text-[#E45841]">Logout</CustomText>
                        </Pressable>

                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
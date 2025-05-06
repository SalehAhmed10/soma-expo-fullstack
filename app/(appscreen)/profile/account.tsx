import CustomText from '@/components/CustomText';
import useAuthStore from '@/store/authStore';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';

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
        <>
            <Stack.Screen
                name="account"
                options={{
                    headerTitle: "Account & Subscription",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#E8E1D9'
                    },
                    headerTintColor: '#31170C'
                }}
            />
            <ScrollView className="flex-1 bg-screen-bg">
                <View className="px-6 pt-12">
                    {/* Name Section */}
                    <View className="mb-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <CustomText className="text-lg font-semibold text-dark-brown">
                                Full Name
                            </CustomText>
                            <Pressable onPress={() => { /* Implement edit logic */ }}>
                                <CustomText className="text-base text-dark-brown opacity-60">
                                    Edit
                                </CustomText>
                            </Pressable>
                        </View>
                        <CustomText className="text-sm text-dark-brown">
                            {fullName}
                        </CustomText>
                    </View>

                    <View className="h-[1px] bg-[#31170C20]" />

                    {/* Email Section */}
                    <View className="my-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <CustomText className="text-lg font-semibold text-dark-brown">
                                Email Address
                            </CustomText>
                            <Pressable onPress={() => { /* Implement manage logic */ }}>
                                <CustomText className="text-base text-dark-brown opacity-60">
                                    Manage
                                </CustomText>
                            </Pressable>
                        </View>
                        <CustomText className="text-sm text-dark-brown">
                            {email}
                        </CustomText>
                    </View>

                    <View className="h-[1px] bg-[#31170C20]" />

                    {/* Password Section */}
                    <View className="my-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <CustomText className="text-lg font-semibold text-dark-brown">
                                Password
                            </CustomText>
                            <Pressable onPress={() => { /* Implement edit logic */ }}>
                                <CustomText className="text-base text-dark-brown opacity-60">
                                    Edit
                                </CustomText>
                            </Pressable>
                        </View>
                        <CustomText className="text-sm text-dark-brown">
                            ********
                        </CustomText>
                    </View>

                    <View className="h-[1px] bg-[#31170C20]" />

                    {/* Subscription Section */}
                    <View className="my-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <CustomText className="text-lg font-semibold text-dark-brown">
                                Subscription
                            </CustomText>
                            <Pressable
                                onPress={() => router.push('/subscription/subscriptiondetail')}
                            >
                                <CustomText className="text-base text-dark-brown opacity-60">
                                    Edit
                                </CustomText>
                            </Pressable>
                        </View>
                        <CustomText className="text-sm text-dark-brown">
                            Monthly
                        </CustomText>
                    </View>

                    <View className="h-[1px] bg-[#31170C20]" />

                    {/* Delete Account Section */}
                    <View className="my-6">
                        <View className="flex-row items-center justify-between">
                            <CustomText className="text-lg font-semibold text-[#E45841]">
                                Delete Account
                            </CustomText>
                            <Pressable onPress={() => { /* Implement delete logic */ }}>
                                <CustomText className="text-base text-dark-brown opacity-60">
                                    Edit
                                </CustomText>
                            </Pressable>
                        </View>
                    </View>
                </View>
                {/* Logout Button */}

                <Link href="/(appscreen)/testapi/userprofile" asChild>
                    <Pressable>
                        <CustomText className="text-base text-dark-brown opacity-60">
                            GO TO TESTPROFILE
                        </CustomText>
                    </Pressable>
                </Link>
                <TouchableOpacity
                    className=" h-[50px] bg-[#834518] rounded-full items-center justify-center mt-8 mx-6"
                    onPress={() => logout()}
                >
                    <CustomText className="text-lg font-semibold text-white">
                        Logout
                    </CustomText>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}
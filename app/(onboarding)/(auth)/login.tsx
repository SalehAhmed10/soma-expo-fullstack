import CustomButton from '@/components/buttons/CustomButton';
import SocialButton from '@/components/buttons/SocialButton';
import CustomText from '@/components/CustomText';
import useAuthStore from '@/store/authStore';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import api from '@/utils/api';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        setLoading(true);
        try {
            // Use the shared API instance
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            console.log(`Login response:`, response.data); // Log the response data
            if (response.data && response.data.user && response.data.token) {
                // Store the token in AsyncStorage
                await AsyncStorage.setItem('authToken', response.data.token);
                login(response.data.user, response.data.token);
                router.replace('/(tabs)/home');
            } else {
                Alert.alert('Login Failed', 'Invalid response from server.');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', error.response?.data?.message || error.response?.data || 'An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1  bg-screen-bg">
            <ScrollView className="flex-1 px-4">
                <View className="items-center justify-start py-20">
                    {/* Logo */}
                    <View className="w-full items-center py-8 mb-16">
                        <Image
                            source={require("../../../assets/images/soma/logo.png")}
                            className="w-[175px] h-[45px]"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Title */}
                    <CustomText className="text-xl font-bold text-dark-brown mb-10 text-center">
                        Log in
                    </CustomText>

                    {/* Login Form */}
                    <View className="w-full px-5">
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            className="w-full h-[50px] border border-[#a36d47] rounded-[9px] px-6 mb-4"
                            placeholderTextColor="#31170C"
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            className="w-full h-[50px] border border-[#a36d47] rounded-[9px] px-6 mb-2 "
                            placeholderTextColor="#31170C"
                        />

                        {/* <CustomText className="text-xs text-dark-brown font-bold text-right">
                            Forgot Password?
                        </CustomText> */}

                        {/* Login Button */}
                        <CustomButton
                            onPress={handleLogin}
                            variant="primary"
                            className="w-full mt-[20px] mb-6 "
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Login'}
                        </CustomButton>



                        {/* Register Link */}
                        <View className="flex-row justify-center mt-4">
                            <CustomText className="text-base text-dark-brown">
                                Don't have an account?{' '}
                            </CustomText>
                            <Link href="/createaccount">
                                <CustomText className="text-base  text-burnt-orange font-semibold">
                                    Create one
                                </CustomText>
                            </Link>
                        </View>

                        {/* <Link href="/mymat" className="flex-row justify-center mt-4">
                            <CustomText className="text-base text-dark-brown font-bold">
                                GO TO HOME
                            </CustomText>
                        </Link> */}

                        <View>
                            <CustomText className="text-base py-2 text-dark-brown text-center">
                                or
                            </CustomText>

                            {/* Social Media Buttons */}
                            <View className="flex-row justify-center mt-4">
                                <SocialButton
                                    onPress={() => console.log('Apple pressed')}
                                    icon="apple"
                                    className=""
                                />
                                <SocialButton
                                    onPress={() => console.log('Facebook pressed')}
                                    icon="facebook-f"
                                    iconColor="#3B5998"
                                    className=""
                                />
                                <SocialButton
                                    onPress={() => console.log('Google pressed')}
                                    icon="google"
                                    iconColor="#DB4437"
                                    className=""
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
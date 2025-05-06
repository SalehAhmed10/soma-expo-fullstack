import CustomButton from '@/components/buttons/CustomButton';
import SocialButton from '@/components/buttons/SocialButton';
import CustomText from '@/components/CustomText';
import useAuthStore from '@/store/authStore';
import api from '@/utils/api'; // Import your API instance
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';

export default function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const handleCreateAccount = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please enter all fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/register', { // Use the API instance
                fullName: name,
                email,
                password,
            });

            // Check if response.data exists
            if (response.data) {
                // Assuming the token should be in response.data as well, but it's missing.
                // You might need to adjust your backend to include the token in the response.
                const user = response.data; // The entire response data is the user object
                // const token = 'YOUR_DEFAULT_TOKEN'; // Replace with how you get the token or a default value

                if (user) {
                    // login(user, token); // REMOVE THIS LINE
                    // router.replace('/(tabs)/home'); // REMOVE THIS LINE - IMPORTANT
                    router.replace('/(onboarding)/(auth)/login'); // Navigate to verify email screen
                    Alert.alert('Success', 'Account created successfully! Please verify your email.');
                } else {
                    Alert.alert('Registration Failed', 'User data is missing in the response.');
                }
            } else {
                Alert.alert('Registration Failed', 'Invalid response from server.');
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            Alert.alert('Registration Failed', error.response?.data || 'An error occurred during registration.');
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
                        Create an account
                    </CustomText>

                    {/* Registration Form */}
                    <View className="w-full px-5">
                        <TextInput
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                            className="w-full h-[50px] border border-[#a36d47] rounded-[9px]  px-6 mb-4"
                            placeholderTextColor="#31170C"
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="w-full h-[50px] border border-[#a36d47] rounded-[9px] px-6 mb-4"
                            placeholderTextColor="#31170C"
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            className="w-full h-[50px] border border-[#a36d47] rounded-[9px] px-6 mb-6"
                            placeholderTextColor="#31170C"
                        />

                        {/* Submit Button */}
                        <CustomButton
                            onPress={handleCreateAccount}
                            variant="primary"
                            className="w-full mb-6"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign up'}
                        </CustomButton>

                        {/* Login Link */}
                        <View className="flex-row justify-center mt-4">
                            <CustomText className="text-base text-dark-brown">
                                Already have an account?{' '}
                            </CustomText>
                            <Link href="/login">
                                <CustomText className="text-base text-burnt-orange font-semibold">
                                    Login
                                </CustomText>
                            </Link>
                        </View>

                        <View>
                            <CustomText className="text-base py-2 text-dark-brown text-center">
                                or
                            </CustomText>

                            {/* Social Media Buttons */}
                            <View className="flex-row justify-center mt-4">
                                <SocialButton
                                    onPress={() => console.log('Apple pressed')}
                                    icon="apple"
                                />
                                <SocialButton
                                    onPress={() => console.log('Facebook pressed')}
                                    icon="facebook-f"
                                    iconColor="#3B5998"
                                />
                                <SocialButton
                                    onPress={() => console.log('Google pressed')}
                                    icon="google"
                                    iconColor="#DB4437"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
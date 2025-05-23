// import CustomText from '@/components/CustomText';
// import useAuthStore from '@/store/authStore';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Pressable, ScrollView, View } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';

// export default function AccountScreen() {
//     const { user, logout } = useAuthStore();
//     const router = useRouter();
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');

//     useEffect(() => {
//         if (user) {
//             setFullName(user.fullName || 'N/A');
//             setEmail(user.email || 'N/A');
//         }
//     }, [user]);

//     return (
//         <View className="flex-1 bg-[#F3ECE6]">

//             <View className="flex-row items-center pt-10 pb-4 px-4 border-b border-[#E5DED7] bg-[#F3ECE6]">
//                 <Pressable onPress={() => router.back()} className="pr-2">
//                     <AntDesign name="arrowleft" size={28} color="#31170C" />
//                 </Pressable>
//                 <CustomText className="flex-1 text-xl font-bold text-[#31170C] text-center -ml-8">
//                     Account & Subscription
//                 </CustomText>
//             </View>
//             <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 8 }}>
//                 <View className="px-4 pt-4">

//                     <View className="mb-4">
//                         <View className="flex-row items-center justify-between mb-1">
//                             <CustomText className="text-base font-semibold text-[#31170C]">Full Name</CustomText>
//                             <Pressable>
//                                 <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
//                             </Pressable>
//                         </View>
//                         <CustomText className="text-sm text-[#31170C]">{fullName}</CustomText>
//                     </View>
//                     <View className="h-[1px] bg-[#E5DED7] mb-2" />


//                     <View className="mb-4">
//                         <View className="flex-row items-center justify-between mb-1">
//                             <CustomText className="text-base font-semibold text-[#31170C]">Email address</CustomText>
//                             <Pressable>
//                                 <CustomText className="text-sm text-[#A97A50] font-medium">MANAGE</CustomText>
//                             </Pressable>
//                         </View>
//                         <CustomText className="text-sm text-[#31170C]">{email}</CustomText>
//                     </View>
//                     <View className="h-[1px] bg-[#E5DED7] mb-2" />


//                     <View className="mb-4">
//                         <View className="flex-row items-center justify-between mb-1">
//                             <CustomText className="text-base font-semibold text-[#31170C]">Password</CustomText>
//                             <Pressable>
//                                 <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
//                             </Pressable>
//                         </View>
//                         <CustomText className="text-sm text-[#31170C]">********</CustomText>
//                     </View>
//                     <View className="h-[1px] bg-[#E5DED7] mb-2" />


//                     <View className="mb-4">
//                         <View className="flex-row items-center justify-between mb-1">
//                             <CustomText className="text-base font-semibold text-[#31170C]">Subscription details</CustomText>
//                             <Pressable>
//                                 <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
//                             </Pressable>
//                         </View>
//                         <CustomText className="text-sm text-[#31170C]">Free-Trial</CustomText>
//                     </View>
//                     <View className="h-[1px] bg-[#E5DED7] mb-2" />


//                     <View className="mb-4">
//                         <View className="flex-row items-center justify-between">
//                             <CustomText className="text-base font-semibold text-[#31170C]">Delete Account</CustomText>
//                             <Pressable>
//                                 <CustomText className="text-sm font-semibold text-[#E45841]">DELETE</CustomText>
//                             </Pressable>
//                         </View>
//                     </View>


//                     <View className="mb-4">


//                         <Pressable onPress={() => {
//                             logout();

//                         }
//                         } className="flex-row items-center justify-between">
//                             <CustomText className="text-sm font-semibold text-[#E45841]">Logout</CustomText>
//                         </Pressable>

//                     </View>

//                 </View>
//             </ScrollView>
//         </View>
//     );
// }

import CustomText from '@/components/CustomText';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, View, Alert } from 'react-native'; // Added Alert
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const handleEditFullName = () => {
        Alert.alert('Edit Full Name', 'Navigate to edit full name screen.');
        // Example: router.push('/profile/edit-name');
    };

    const handleManageEmail = () => {
        Alert.alert('Manage Email', 'Navigate to manage email screen.');
        // Example: router.push('/profile/manage-email');
    };

    const handleEditPassword = () => {
        Alert.alert('Edit Password', 'Navigate to edit password screen.');
        // Example: router.push('/profile/edit-password');
    };

    const handleEditSubscription = () => {
        Alert.alert('Edit Subscription', 'Navigate to subscription management screen.');
        // Example: router.push('/profile/subscription');
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        console.log('Account deletion initiated');
                        // Implement account deletion logic here
                        // After deletion, likely logout and navigate
                        // logout(); 
                        // router.replace('/(onboarding)'); 
                    },
                },
            ]
        );
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        logout();
                        // The RootLayout should handle navigation to onboarding
                        // when user becomes null.
                    },
                },
            ]
        );
    };


    return (
        <SafeAreaView className="flex-1 bg-screen-bg">
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center  pb-4 px-4 ">
                    <Pressable onPress={() => router.back()}>
                        <AntDesign name="arrowleft" size={28} color="#31170C" />
                    </Pressable>
                    <CustomText className="text-lg font-bold text-[#31170C] text-center ml-4">
                        Account & Subscription
                    </CustomText>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 8 }}>
                    <View className="px-4 pt-4">

                        {/* Full Name */}
                        <View className="mb-4">
                            <View className="flex-row items-center justify-between mb-1">
                                <CustomText className="text-base font-semibold text-[#31170C]">Full Name</CustomText>
                                <Pressable onPress={handleEditFullName}>
                                    <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
                                </Pressable>
                            </View>
                            <CustomText className="text-sm text-[#31170C]">{fullName}</CustomText>
                        </View>
                        <View className="h-[1px] bg-[#E5DED7] mb-2" />

                        {/* Email Address */}
                        <View className="mb-4">
                            <View className="flex-row items-center justify-between mb-1">
                                <CustomText className="text-base font-semibold text-[#31170C]">Email address</CustomText>
                                <Pressable onPress={handleManageEmail}>
                                    <CustomText className="text-sm text-[#A97A50] font-medium">MANAGE</CustomText>
                                </Pressable>
                            </View>
                            <CustomText className="text-sm text-[#31170C]">{email}</CustomText>
                        </View>
                        <View className="h-[1px] bg-[#E5DED7] mb-2" />

                        {/* Password */}
                        <View className="mb-4">
                            <View className="flex-row items-center justify-between mb-1">
                                <CustomText className="text-base font-semibold text-[#31170C]">Password</CustomText>
                                <Pressable onPress={handleEditPassword}>
                                    <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
                                </Pressable>
                            </View>
                            <CustomText className="text-sm text-[#31170C]">********</CustomText>
                        </View>
                        <View className="h-[1px] bg-[#E5DED7] mb-2" />

                        {/* Subscription Details */}
                        <View className="mb-4">
                            <View className="flex-row items-center justify-between mb-1">
                                <CustomText className="text-base font-semibold text-[#31170C]">Subscription details</CustomText>
                                <Pressable onPress={handleEditSubscription}>
                                    <CustomText className="text-sm text-[#A97A50] font-medium">EDIT</CustomText>
                                </Pressable>
                            </View>
                            <CustomText className="text-sm text-[#31170C]">Free-Trial</CustomText>
                        </View>
                        <View className="h-[1px] bg-[#E5DED7] mb-2" />

                        {/* Delete Account */}
                        <View className="mb-4">
                            <View className="flex-row items-center justify-between">
                                <CustomText className="text-base font-semibold text-[#31170C]">Delete Account</CustomText>
                                <Pressable onPress={handleDeleteAccount}>
                                    <CustomText className="text-sm font-semibold text-[#E45841]">DELETE</CustomText>
                                </Pressable>
                            </View>
                        </View>
                        <View className="h-[1px] bg-[#E5DED7] mb-2" />


                        {/* Logout */}
                        <View className="mb-4">
                            <Pressable onPress={handleLogout} className="flex-row items-center">
                                <CustomText className="text-base font-semibold text-[#E45841]">Logout</CustomText>
                            </Pressable>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
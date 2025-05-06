import { View, Text, SafeAreaView, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import CustomText from '@/components/CustomText'
import { router } from 'expo-router'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'


export default function SubscriptionDetail() {
    const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');

    interface TimelineStep {
        id: number;
        icon: string;  // icon name from vector icons
        iconSet: 'material' | 'materialCommunity';
        title: string;
        description: string;
    }


    const timelineSteps: TimelineStep[] = [
        {
            id: 1,
            icon: "timer",
            iconSet: 'material',
            title: "Today",
            description: "Unlock our library of meditations, sleep sounds, and more."
        },
        {
            id: 2,
            icon: "calendar-check",
            iconSet: 'materialCommunity',
            title: "Annual Plan",
            description: "We'll send you a reminder that your trial is endding soon."
        },
        {
            id: 3,
            icon: "autorenew",
            iconSet: 'material',
            title: "In 7 days",
            description: "You'll be charged on March 28 can cancel anytime before."
        },
    ];

    return (

        <SafeAreaView className="flex-1 bg-[#E8E1D9]">
            <ScrollView className="flex-1">


                {/* header */}
                <View className='px-6 py-12 flex-row justify-end'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <AntDesign name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* content */}
                <View className='flex-1 px-6 py-0'>

                    <View className='flex-1 justify-start pt-5'>

                        {/* title */}
                        <CustomText className='text-xl font-bold text-dark-brown mb-4 text-center'>
                            How your trial works
                        </CustomText>

                        {/* //  decription */}
                        <CustomText className='text-base text-center text-dark-brown mb-8 opacity-80'>
                            First 7 days free, then $12.99/month
                        </CustomText>

                        {/* Annual or Monthly switch Button */}
                        <View className="px-6 flex-row justify-center relative">
                            <View className="flex-row bg-[#D2C9C0] rounded-[24px] p-1 relative">
                                <TouchableOpacity
                                    onPress={() => setSelectedPlan('annual')}
                                    className={`z-10 px-8 py-3 rounded-[24px] ${selectedPlan === 'annual'
                                        ? 'bg-[#31170C] -mr-4'
                                        : 'bg-transparent'
                                        }`}
                                >
                                    <CustomText
                                        className={`${selectedPlan === 'annual'
                                            ? 'text-white'
                                            : 'text-dark-brown'
                                            }`}
                                    >
                                        Annual
                                    </CustomText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setSelectedPlan('monthly')}
                                    className={`z-0 px-8 py-3 rounded-[24px] ${selectedPlan === 'monthly'
                                        ? 'bg-[#31170C]'
                                        : 'bg-transparent'
                                        }`}
                                >
                                    <CustomText
                                        className={`${selectedPlan === 'monthly'
                                            ? 'text-white'
                                            : 'text-dark-brown'
                                            }`}
                                    >
                                        Monthly
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>



                        {/* Timeline Section */}
                        <View className="px-6 mt-8">
                            {timelineSteps.map((step, index) => (
                                <View key={step.id} className="flex-row items-start mb-6 relative">
                                    {/* Timeline Line */}
                                    {index !== timelineSteps.length && (
                                        <View
                                            className="absolute left-4 top-10"
                                            style={{ height: 40 }}
                                        >
                                            <LinearGradient
                                                colors={['#e0ccbb', '#c8cfc3']}
                                                className="w-[8px] h-full "
                                                style={{ borderRadius: 4 }}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                            />
                                        </View>
                                    )}

                                    {/* Icon Circle */}
                                    <View className="w-10 h-10 rounded-full bg-[#c37b5e] items-center justify-center z-10">
                                        {step.iconSet === 'material' ? (
                                            <MaterialIcons name={step.icon as any} size={20} color="#fff" />
                                        ) : (
                                            <MaterialCommunityIcons name={step.icon as any} size={20} color="#fff" />
                                        )}
                                    </View>

                                    {/* Content */}
                                    <View className="flex-1 ml-4">
                                        <CustomText className="text-base font-bold text-dark-brown">
                                            {step.title}
                                        </CustomText>
                                        <CustomText className="text-sm text-dark-brown opacity-60 mt-1">
                                            {step.description}
                                        </CustomText>
                                    </View>

                                </View>
                            ))}

                            <TouchableOpacity className='flex justify-center items-center '>
                                <CustomText className="text-sm text-[#404a6d] mt-2">
                                    Restore Purchase
                                </CustomText>

                            </TouchableOpacity>
                        </View>

                    </View>

                    <View className='flex-1 justify-end py-5'>
                        <Pressable
                            onPress={() => router.push('/subscription')}
                            className=" rounded-full bg-dark-brown p-4 mt-4 mx-6 ">
                            <CustomText className="text-white text-center text-base font-bold">
                                START MY FREE TRIAL
                            </CustomText>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
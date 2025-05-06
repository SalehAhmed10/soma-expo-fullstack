import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';


interface InputOption {
    id: string;
    placeholder: string;
}

export default function WhatOnYourMind() {

    const [selectedInput, setSelectedInput] = useState<string | null>(null);

    const inputOptions: InputOption[] = [
        { id: '0', placeholder: 'Learning Yoga' },
        { id: '1', placeholder: 'Meditation' },
        { id: '2', placeholder: 'Feel calm and relaxed' },
        { id: '3', placeholder: 'Something else' },
    ];

    const inputStyle = "text-white text-base mx-7 border border-[#FFFFFF6E] rounded-[110px] px-[20px] "
    // py-[23px] px-[27px]

    const selectedStyle = "bg-[#E0BCA226]";



    return (
        <SafeAreaView className="flex-1 bg-[#06171E]">
            <StatusBar style='light' />
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="relative w-full">
                    <Image
                        source={require("../../../assets/images/soma/whatsonyourmindheader.png")}
                        resizeMode="stretch"
                        className="w-full h-[200px]"
                    />
                    <LinearGradient
                        colors={['#06171E', '#06171E']}
                        locations={[0.01, 1]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            opacity: 0.7
                        }}
                    />
                </View>



                {/* Title */}
                <Text className="text-[#E8E1D9] text-xl text-center font-bold -mt-[50px] mb-[23px]">
                    What's on your mind?
                </Text>


                {/* Input Fields */}
                {
                    inputOptions.map((option, index) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => setSelectedInput(option.id === selectedInput ? null : option.id)}
                            className={`flex-row h-[60.82px]  justify-between items-center ${inputStyle} ${selectedInput === option.id ? selectedStyle : ''
                                } ${index === inputOptions.length - 1 ? 'mb-16' : 'mb-[23px]'}`}
                        >
                            <Text className="text-white text-base">
                                {option.placeholder}
                            </Text>
                            {selectedInput === option.id && (
                                <View className="bg-[#E0BCA2] rounded-full w-[32.57px] h-[32.57px] items-center justify-center">
                                    <FontAwesome5 name="check" size={16} color="#31170C" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))
                }


                {/* Continue Button */}
                <TouchableOpacity
                    className="items-center bg-[#E0BCA2] rounded-[29px]  justify-center  mb-[59px] h-[59.93px] mx-7"
                    onPress={() => router.replace('/(tabs)/home')}
                >
                    <Text className="text-[#31170C] text-base">
                        Continue
                    </Text>
                </TouchableOpacity>

            </ScrollView >
        </SafeAreaView >
    )
}
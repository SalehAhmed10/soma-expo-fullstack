import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, Animated, Image } from 'react-native';
import CustomText from '@/components/CustomText';

const { width } = Dimensions.get('window');

const featuredPrograms = [
    { id: '1', title: 'Morning Yoga', image: require('@/assets/images/soma/featured1.png') },
    { id: '2', title: 'Meditation', image: require('@/assets/images/soma/featured2.png') },
    { id: '3', title: 'Breathing', image: require('@/assets/images/soma/featured3.png') },
];

const Pagination = ({ data, scrollX }: any) => {
    return (
        <View className="flex-row justify-center mt-4">
            {data.map((_: any, idx: any) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 16, 8],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={idx}
                        className="h-2 rounded-full bg-[#834518] mx-1"
                        style={{
                            width: dotWidth,
                            opacity,
                        }}
                    />
                );
            })}
        </View>
    );
};

// Replace existing Featured Section with this:
const scrollX = useRef(new Animated.Value(0)).current;

{/* Featured Section */ }
<View className="px-6 py-6">
    <CustomText className="text-lg font-semibold text-dark-brown mb-4">
        Featured Programs
    </CustomText>
    <FlatList
        data={featuredPrograms}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
            <View style={{ width: width - 48 }} className="h-[200px] rounded-2xl overflow-hidden">
                <Image
                    source={item.image}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
        )}
        keyExtractor={item => item.id}
    />
    <Pagination data={featuredPrograms} scrollX={scrollX} />
</View>
import { categories } from '@/constants/data'
import React from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import CustomText from './CustomText';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function CategoryGrid() {

    const { width } = Dimensions.get('window');

    return (
        <View className="flex-row flex-wrap gap-3">
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={{ width: (width - 48 - 16) / 3 }}
                    className="h-[125.97px] rounded-xl overflow-hidden mb-2"
                    onPress={() => router.push({
                        pathname: '/session/category/[id]',
                        params: { id: category.id }
                    })}
                >
                    <View
                        key={category.id}
                        style={{ width: (width - 48 - 16) / 3 }}
                        className="h-[125.97px] rounded-xl overflow-hidden mb-2 relative"
                    >
                        <Image
                            source={category.image}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        <LinearGradient
                            colors={['rgba(49, 23, 12, 0)', 'rgba(49, 23, 12, 1)']}
                            className="absolute bottom-0 left-0 right-0 h-[100px]"
                        />
                        <View className="absolute bottom-2 left-2 right-2">
                            <CustomText className="text-white text-xs text-center">
                                {category.title}
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}
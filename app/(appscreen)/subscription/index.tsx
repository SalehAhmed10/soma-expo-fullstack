import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import CustomText from '@/components/CustomText';
import { AntDesign } from '@expo/vector-icons';

export default function SubscriptionScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#E8E1D9]">
            {/* Header */}
            <View className="px-6 py-12 flex-row justify-end">
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="close" size={24} color="#31170C" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="px-6 mt-8">
                <CustomText className="text-xl font-bold text-dark-brown mb-4 text-center">
                    12 months of SOMAnastic
                </CustomText>

                <CustomText className="text-base text-center text-dark-brown mb-8 opacity-80">
                    Lorem ipsum dolor sit amet consectetur. Sed magna etiam ut pretium nam tortor tellus.
                </CustomText>

                <View className="mb-8 flex flex-col justify-center items-center">
                    <CustomText className="text-lg font-bold text-dark-brown mb-2">
                        Your current monhly membership
                    </CustomText>
                    <CustomText className="text-xl font-bold text-dark-brown mb-4">
                        155.88/yr
                    </CustomText>


                    <CustomText className="text-lg font-bold text-dark-brown mb-2">
                        Annual membership
                    </CustomText>
                    <CustomText className="text-xl font-bold text-dark-brown mb-4">
                        $69.99
                    </CustomText>
                    <CustomText className="text-base text-dark-brown opacity-80 text-center">
                        Lorem ipsum dolor sit amet consectetur. Sed magna etiam ut pretium nam tortor tellus.
                    </CustomText>
                </View>
            </View>

            {/* Bottom Buttons */}
            <View className="px-6 mt-auto mb-8">
                <TouchableOpacity
                    className="w-full h-[50px] bg-[#31170C] rounded-full items-center justify-center mb-4"
                    onPress={() => {/* Handle upgrade */ }}
                >
                    <CustomText className="text-white text-base">
                        Become an annual member
                    </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full h-[50px] items-center justify-center"
                    onPress={() => router.push('/profile')}
                >
                    <CustomText className="text-[#31170C] text-base">
                        No, I'll stay monthly
                    </CustomText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
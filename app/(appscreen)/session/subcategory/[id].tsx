import { View, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import CustomText from '@/components/CustomText';
import { Feather } from '@expo/vector-icons';
import { sessionsData, subCategories } from '@/constants/data';
import { LinearGradient } from 'expo-linear-gradient';

export default function SubCategoryDetailScreen() {
    const params = useLocalSearchParams();
    const subCategory = subCategories.find(sc => sc.id === params.id);
    const filteredSessions = sessionsData.filter(s => s.subCategoryId === params.id);
    const { width } = Dimensions.get('window');

    return (
        <SafeAreaView className="flex-1 bg-screen-bg-dark">
            <ScrollView className="flex-1">
                {/* Header */}
                <View>
                    <ImageBackground
                        source={subCategory?.image}
                        className="w-full h-[310.37px]"
                        resizeMode="cover"
                    >
                        <TouchableOpacity
                            className="absolute top-12 left-6 z-10"
                            onPress={() => router.back()}
                        >
                            <Feather name="arrow-left" size={24} color="#fff" />
                        </TouchableOpacity>

                        <LinearGradient
                            colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
                            className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
                        />
                    </ImageBackground>

                    <View className="p-6 -mt-20 flex justify-center flex-col items-center">
                        <CustomText className="text-2xl font-bold text-center text-[#E8E1D9]">
                            {subCategory?.title}
                        </CustomText>
                    </View>
                </View>

                {/* Sessions List */}
                <View className="px-6">
                    {filteredSessions.map(session => (
                        <TouchableOpacity
                            key={session.id}
                            className="flex-row items-center bg-[#1C2B31] rounded-xl p-4 mb-4"
                            onPress={() => router.push(`/session/${session.id}`)}
                        >
                            <Image
                                source={session.image}
                                className="w-16 h-16 rounded-lg mr-4"
                                resizeMode="cover"
                            />
                            <View className="flex-1">
                                <CustomText className="text-base font-bold text-[#E8E1D9]">
                                    {session.title}
                                </CustomText>
                                <View className="flex-row items-center mt-1">
                                    <Feather name="clock" size={14} color="#E8E1D9" />
                                    <CustomText className="ml-1 text-xs text-[#E8E1D9]">
                                        {session.length}
                                    </CustomText>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
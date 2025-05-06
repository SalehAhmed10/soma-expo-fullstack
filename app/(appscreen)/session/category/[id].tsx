// import { View, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView, StatusBar } from 'react-native';
// import { router, useLocalSearchParams } from 'expo-router';
// import CustomText from '@/components/CustomText';
// import { Feather } from '@expo/vector-icons';
// import { sessionsData, categories } from '@/constants/data';
// import { LinearGradient } from 'expo-linear-gradient';
// import React from 'react';

// export default function CategoryDetailScreen() {
//     const params = useLocalSearchParams();
//     const category = categories.find(c => c.id === params.id);
//     const filteredSessions = sessionsData.filter(s => s.categoryId === params.id);

//     const { width } = Dimensions.get('window');
//     const itemWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)


//     return (
//         <>

//             <SafeAreaView className="flex-1 bg-screen-bg-dark">
//                 <ScrollView className="flex-1 ">
//                     <View>
//                         <ImageBackground
//                             source={category?.image}
//                             className="w-full h-[310.37px]"
//                             resizeMode="cover"
//                         >
//                             <TouchableOpacity
//                                 className="absolute top-12 left-6 z-10"
//                                 onPress={() => router.back()}
//                             >
//                                 <Feather name="arrow-left" size={24} color="#fff" />
//                             </TouchableOpacity>

//                             <LinearGradient
//                                 colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
//                                 className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
//                             />
//                         </ImageBackground>

//                         <View className="p-6 -mt-20 flex justify-center flex-col items-center">
//                             <CustomText className="text-2xl font-bold text-center text-[#E8E1D9]">
//                                 {category?.title}
//                             </CustomText>
//                         </View>
//                     </View>

//                     {/* Sessions List */}
//                     <View className="flex-1 mt-4">
//                         <View className="flex-row flex-wrap px-4 justify-between">
//                             {filteredSessions.map(session => (
//                                 <TouchableOpacity
//                                     key={session.id}
//                                     style={{ width: itemWidth }}
//                                     className="mb-4"
//                                     onPress={() => router.push(`/session/${session.id}`)}
//                                 >
//                                     <Image
//                                         source={session.image}
//                                         className="w-full h-[160px] rounded-xl mb-2"
//                                         resizeMode="cover"
//                                     />
//                                     <CustomText
//                                         className="text-xs font-bold text-[#E8E1D9] text-center"
//                                         numberOfLines={2}
//                                     >
//                                         {session.title}
//                                     </CustomText>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     </View>
//                 </ScrollView>

//             </SafeAreaView>

//             <StatusBar barStyle="dark-content" />
//         </>
//     );
// }

import CustomText from '@/components/CustomText';
import { categories, subCategories } from '@/constants/data';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';

export default function CategoryDetailScreen() {
    const params = useLocalSearchParams();
    const category = categories.find(c => c.id === params.id);
    const filteredSubCategories = subCategories.filter(sc => sc.parentId === params.id);

    // ...existing header code...
    const { width } = Dimensions.get('window');
    const itemWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)

    return (
        <SafeAreaView className="flex-1 bg-screen-bg-dark">

            <ScrollView className="flex-1">
                {/* Header Section */}
                <View>
                    <ImageBackground
                        source={category?.image}
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
                            {category?.title}
                        </CustomText>
                    </View>
                </View>

                {/* Subcategories Grid */}
                <View className="flex-1 mt-4">
                    <View className="flex-row flex-wrap px-4 justify-between">
                        {filteredSubCategories.map(subCategory => (
                            <TouchableOpacity
                                key={subCategory.id}
                                style={{ width: itemWidth }}
                                className="mb-4"
                                onPress={() => router.push({
                                    pathname: '/session/subcategory/[id]',
                                    params: { id: subCategory.id }
                                })}
                            >
                                <Image
                                    source={subCategory.image}
                                    className="w-full h-[160px] rounded-xl mb-2"
                                    resizeMode="cover"
                                />
                                <CustomText
                                    className="text-xs font-bold text-[#E8E1D9] text-center"
                                    numberOfLines={2}
                                >
                                    {subCategory.title}
                                </CustomText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <StatusBar barStyle="dark-content" />
        </SafeAreaView>
    );
}
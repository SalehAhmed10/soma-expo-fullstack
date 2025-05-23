
// import CustomText from '@/components/CustomText';
// import { categories, subCategories } from '@/constants/data';
// import { Feather } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router, useLocalSearchParams } from 'expo-router';
// import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';

// export default function CategoryDetailScreen() {
//     const params = useLocalSearchParams();
//     const category = categories.find(c => c.id === params.id);
//     const filteredSubCategories = subCategories.filter(sc => sc.parentId === params.id);

//     // ...existing header code...
//     const { width } = Dimensions.get('window');
//     const itemWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)

//     return (
//         <SafeAreaView className="flex-1 bg-screen-bg-dark">

//             <ScrollView className="flex-1">
//                 {/* Header Section */}
//                 <View>
//                     <ImageBackground
//                         source={category?.image}
//                         className="w-full h-[310.37px]"
//                         resizeMode="cover"
//                     >
//                         <TouchableOpacity
//                             className="absolute top-12 left-6 z-10"
//                             onPress={() => router.back()}
//                         >
//                             <Feather name="arrow-left" size={24} color="#fff" />
//                         </TouchableOpacity>

//                         <LinearGradient
//                             colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
//                             className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
//                         />
//                     </ImageBackground>

//                     <View className="p-6 -mt-20 flex justify-center flex-col items-center">
//                         <CustomText className="text-2xl font-bold text-center text-[#E8E1D9]">
//                             {category?.title}
//                         </CustomText>
//                     </View>
//                 </View>

//                 {/* Subcategories Grid */}
//                 <View className="flex-1 mt-4">
//                     <View className="flex-row flex-wrap px-4 justify-between">
//                         {filteredSubCategories.map(subCategory => (
//                             <TouchableOpacity
//                                 key={subCategory.id}
//                                 style={{ width: itemWidth }}
//                                 className="mb-4"
//                                 onPress={() => router.push({
//                                     pathname: '/session/subcategory/[id]',
//                                     params: { id: subCategory.id }
//                                 })}
//                             >
//                                 <Image
//                                     source={subCategory.image}
//                                     className="w-full h-[160px] rounded-xl mb-2"
//                                     resizeMode="cover"
//                                 />
//                                 <CustomText
//                                     className="text-xs font-bold text-[#E8E1D9] text-center"
//                                     numberOfLines={2}
//                                 >
//                                     {subCategory.title}
//                                 </CustomText>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 </View>
//             </ScrollView>

//         </SafeAreaView>
//     );
// }

// import CustomText from '@/components/CustomText';
// import { Feather } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { Dimensions, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View, ActivityIndicator } from 'react-native';
// import { useContentStore } from '@/store/contentStore';
// import { Image as ExpoImage } from 'expo-image';
// import { BLURHASH_PLACEHOLDER, IMAGE_ASSETS } from '@/constants/uiConstants';

// export default function CategoryDetailScreen() {
//     const params = useLocalSearchParams();
//     const categoryId = params.id as string;

//     // Get data from content store
//     const {
//         categories,
//         subCategories,
//         isSubCategoriesLoading,
//         fetchSubCategories,
//         error
//     } = useContentStore();

//     // Find the selected category
//     const category = categories.find(c => c.id === categoryId);

//     // Track image load state
//     const [headerImageLoaded, setHeaderImageLoaded] = useState(false);

//     // Track image loading errors
//     const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

//     // Set a timeout to prevent infinite spinner
//     useEffect(() => {
//         // If header image hasn't loaded within 5 seconds, force it to show fallback
//         const timer = setTimeout(() => {
//             if (!headerImageLoaded) {
//                 console.log('Header image load timeout - forcing fallback');
//                 setHeaderImageLoaded(true);
//                 setImageErrors(prev => ({ ...prev, header: true }));
//             }
//         }, 5000);

//         return () => clearTimeout(timer);
//     }, [headerImageLoaded]);

//     // Calculate dimensions
//     const { width } = Dimensions.get('window');
//     const itemWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)

//     // Fetch subcategories when component mounts
//     useEffect(() => {
//         if (categoryId) {
//             fetchSubCategories(categoryId);
//         }
//     }, [categoryId, fetchSubCategories]);

//     // Handle image error
//     const handleImageError = (id: string) => {
//         setImageErrors(prev => ({ ...prev, [id]: true }));
//         console.log(`Failed to load image for subcategory: ${id}`);
//     };

//     // Debug the header image URL
//     useEffect(() => {
//         if (category?.image) {
//             console.log(`Category header image URL: ${category.image.substring(0, 50)}...`);
//         } else {
//             console.log('No header image URL found for this category');
//         }
//     }, [category]);

//     // Render subcategories content based on loading state
//     const renderSubcategoriesContent = () => {
//         if (isSubCategoriesLoading) {
//             return (
//                 <View className="flex-1 justify-center items-center py-10">
//                     <ActivityIndicator size="large" color="#E8E1D9" />
//                 </View>
//             );
//         }

//         if (error) {
//             return (
//                 <View className="flex-1 justify-center items-center py-10">
//                     <CustomText className="text-red-500 text-center">{error}</CustomText>
//                 </View>
//             );
//         }

//         if (subCategories.length === 0) {
//             return (
//                 <View className="flex-1 justify-center items-center py-10">
//                     <CustomText className="text-[#E8E1D9] text-center">
//                         No subcategories found for this category.
//                     </CustomText>
//                 </View>
//             );
//         }

//         // Filter subcategories to only show those with this category as parent
//         const filteredSubCategories = subCategories.filter(sub => sub.parentId === categoryId);

//         if (filteredSubCategories.length === 0) {
//             return (
//                 <View className="flex-1 justify-center items-center py-10">
//                     <CustomText className="text-[#E8E1D9] text-center">
//                         No subcategories found for this category.
//                     </CustomText>
//                 </View>
//             );
//         }

//         // Render subcategories grid
//         return (
//             <View className="flex-row flex-wrap px-4 justify-between">
//                 {filteredSubCategories.map(subCategory => {
//                     // Only try to use the image if we haven't had an error for this item
//                     const useImageUrl = subCategory.image && !imageErrors[subCategory.id];

//                     return (
//                         <TouchableOpacity
//                             key={subCategory.id}
//                             style={{ width: itemWidth }}
//                             className="mb-4"
//                             onPress={() => router.push({
//                                 pathname: '/session/subcategory/[id]',
//                                 params: { id: subCategory.id }
//                             })}
//                         >
//                             <View className="relative w-full h-[160px] rounded-xl overflow-hidden mb-2">
//                                 <ExpoImage
//                                     source={useImageUrl ? { uri: subCategory.image } : IMAGE_ASSETS.CATEGORY_PLACEHOLDER}
//                                     placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
//                                     contentFit="cover"
//                                     transition={300}
//                                     style={{ width: '100%', height: '100%' }}
//                                     onError={() => handleImageError(subCategory.id)}
//                                     cachePolicy="memory-disk"
//                                 />
//                             </View>
//                             <CustomText
//                                 className="text-xs font-bold text-[#E8E1D9] text-center"
//                                 numberOfLines={2}
//                             >
//                                 {subCategory.title}
//                             </CustomText>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//         );
//     };

//     return (
//         <SafeAreaView className="flex-1 bg-screen-bg-dark">
//             <StatusBar barStyle="light-content" />
//             <ScrollView className="flex-1">
//                 {/* Header Section */}
//                 <View>
//                     <View className="w-full h-[310.37px] relative">
//                         {!headerImageLoaded && (
//                             <View className="absolute inset-0 bg-gray-800 flex items-center justify-center">
//                                 <ActivityIndicator size="large" color="#E8E1D9" />
//                             </View>
//                         )}

//                         {/* Use regular Image component instead of ExpoImage for header */}
//                         <ExpoImage
//                             source={
//                                 category?.image && !imageErrors['header']
//                                     ? { uri: category.image }
//                                     : IMAGE_ASSETS.CATEGORY_PLACEHOLDER
//                             }
//                             placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
//                             contentFit="cover"
//                             transition={300}
//                             className="w-full h-full"
//                             onLoadEnd={() => {
//                                 console.log('Header image loaded successfully');
//                                 setHeaderImageLoaded(true);
//                             }}
//                             onError={() => {
//                                 console.log('Header image failed to load - using fallback');
//                                 setImageErrors(prev => ({ ...prev, header: true }));
//                                 setHeaderImageLoaded(true);
//                             }}
//                             // Force memory-only caching for these URLs since they expire
//                             cachePolicy="memory"
//                         />

//                         <TouchableOpacity
//                             className="absolute top-12 left-6 z-10"
//                             onPress={() => router.back()}
//                         >
//                             <Feather name="arrow-left" size={24} color="#fff" />
//                         </TouchableOpacity>

//                         <LinearGradient
//                             colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
//                             className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
//                         />
//                     </View>

//                     <View className="p-6 -mt-20 flex justify-center flex-col items-center">
//                         <CustomText className="text-2xl font-bold text-center text-[#E8E1D9]">
//                             {category?.title || 'Category Title'}
//                         </CustomText>
//                     </View>
//                 </View>

//                 {/* Subcategories Grid */}
//                 <View className="flex-1 mt-4">
//                     {renderSubcategoriesContent()}
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }


import CustomText from '@/components/CustomText';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { useContentStore } from '@/store/contentStore';
import { Image as ExpoImage } from 'expo-image';
import { BLURHASH_PLACEHOLDER, IMAGE_ASSETS } from '@/constants/uiConstants';

export default function CategoryDetailScreen() {
    const params = useLocalSearchParams();
    const categoryId = params.id as string;

    // Get data from content store
    const {
        categories,
        subCategories,
        isSubCategoriesLoading,
        fetchSubCategories,
        error
    } = useContentStore();

    // Find the selected category
    const category = categories.find(c => c.id === categoryId);

    // Track image load state
    const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    // Preload image optimization
    const [headerImagePreloaded, setHeaderImagePreloaded] = useState(false);

    // Calculate dimensions
    const { width } = Dimensions.get('window');
    const itemWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)

    // Fetch subcategories and preload header image
    useEffect(() => {
        if (categoryId) {
            fetchSubCategories(categoryId);

            // Find the category and preload its image
            const currentCategory = categories.find(c => c.id === categoryId);
            if (currentCategory?.image) {
                // Preload image with Image.prefetch (for network images)
                Image.prefetch(currentCategory.image)
                    .then(() => {
                        console.log('Header image prefetched successfully');
                        setHeaderImagePreloaded(true);
                    })
                    .catch(error => {
                        console.log('Error prefetching header image:', error);
                    });
            }
        }
    }, [categoryId, fetchSubCategories, categories]);

    // Handle image error
    const handleImageError = (id: string) => {
        setImageErrors(prev => ({ ...prev, [id]: true }));
        console.log(`Failed to load image for subcategory: ${id}`);
    };

    // Debug the category data
    useEffect(() => {
        if (category) {
            console.log(`Category: ${category.title}, Image URL: ${category.image?.substring(0, 50)}...`);
        }
    }, [category]);

    // Auto-dismiss loading spinner after shorter timeout (1s instead of 3s)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!headerImageLoaded) {
                setHeaderImageLoaded(true);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Render subcategories content based on loading state
    const renderSubcategoriesContent = () => {
        if (isSubCategoriesLoading) {
            return (
                <View className="flex-1 justify-center items-center py-10">
                    <ActivityIndicator size="large" color="#E8E1D9" />
                </View>
            );
        }

        if (error) {
            return (
                <View className="flex-1 justify-center items-center py-10">
                    <CustomText className="text-red-500 text-center">{error}</CustomText>
                </View>
            );
        }

        // Filter subcategories to only show those with this category as parent
        const filteredSubCategories = subCategories.filter(sub => sub.parentId === categoryId);

        if (filteredSubCategories.length === 0) {
            return (
                <View className="flex-1 justify-center items-center py-10">
                    <CustomText className="text-[#E8E1D9] text-center">
                        No subcategories found for this category.
                    </CustomText>
                </View>
            );
        }

        // Render subcategories grid
        return (
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
                        <View className="relative w-full h-[160px] rounded-xl overflow-hidden mb-2">
                            {/* Use standard Image component for better compatibility */}
                            <Image
                                source={subCategory.image ? { uri: subCategory.image } : IMAGE_ASSETS.CATEGORY_PLACEHOLDER}
                                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                onError={() => handleImageError(subCategory.id)}
                            />
                        </View>
                        <CustomText
                            className="text-xs font-bold text-[#E8E1D9] text-center"
                            numberOfLines={2}
                        >
                            {subCategory.title}
                        </CustomText>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    // Determine what image to show
    const headerImageSource = category?.image && !imageErrors['header']
        ? { uri: category.image }
        : IMAGE_ASSETS.CATEGORY_PLACEHOLDER;

    return (
        <SafeAreaView className="flex-1 bg-screen-bg-dark">
            <StatusBar barStyle="light-content" />
            <ScrollView className="flex-1">
                {/* Header Section */}
                <View>
                    <View className="w-full h-[310.37px] relative">
                        {/* Only show placeholder when we need to */}
                        <Image
                            source={IMAGE_ASSETS.CATEGORY_PLACEHOLDER}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                                opacity: headerImageLoaded && !imageErrors['header'] && category?.image ? 0 : 1
                            }}
                        />

                        {/* Actual image - optimized loading approach */}
                        {category?.image && (
                            <ExpoImage
                                source={{ uri: category.image }}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                }}
                                contentFit="cover"
                                transition={100}
                                cachePolicy="memory-disk"
                                onLoadStart={() => console.log('Starting to load header image')}
                                onLoad={() => {
                                    console.log('Header image loaded successfully');
                                    setHeaderImageLoaded(true);
                                }}
                                onError={() => {
                                    console.log('Header image failed to load - using fallback');
                                    setImageErrors(prev => ({ ...prev, header: true }));
                                    setHeaderImageLoaded(true);
                                }}
                            />
                        )}

                        {/* Loading indicator */}
                        {!headerImageLoaded && (
                            <View className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <ActivityIndicator size="large" color="#E8E1D9" />
                            </View>
                        )}

                        {/* Back button */}
                        <TouchableOpacity
                            className="absolute top-12 left-6 z-10"
                            onPress={() => router.back()}
                        >
                            <View className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
                                <Feather name="arrow-left" size={24} color="#fff" />
                            </View>
                        </TouchableOpacity>

                        {/* Gradient overlay */}
                        <LinearGradient
                            colors={['rgba(6, 23, 30, 0)', 'rgba(6, 23, 30, 1)']}
                            className="flex-1 h-[250px] absolute w-full bottom-0 left-0 right-0"
                        />
                    </View>

                    <View className="p-6 -mt-20 flex justify-center flex-col items-center">
                        <CustomText className="text-2xl font-bold text-center text-[#E8E1D9]">
                            {category?.title || 'Category Title'}
                        </CustomText>
                    </View>
                </View>

                {/* Subcategories Grid */}
                <View className="flex-1 mt-4">
                    {renderSubcategoriesContent()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
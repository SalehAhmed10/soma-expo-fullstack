// import { categories } from '@/constants/data'
// import React from 'react'
// import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
// import CustomText from './CustomText';
// import { router } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function CategoryGrid() {

//     const { width } = Dimensions.get('window');

//     return (
//         <View className="flex-row flex-wrap gap-3">
//             {categories.map((category) => (
//                 <TouchableOpacity
//                     key={category.id}
//                     style={{ width: (width - 48 - 16) / 3 }}
//                     className="h-[125.97px] rounded-xl overflow-hidden mb-2"
//                     onPress={() => router.push({
//                         pathname: '/session/category/[id]',
//                         params: { id: category.id }
//                     })}
//                 >
//                     <View
//                         key={category.id}
//                         style={{ width: (width - 48 - 16) / 3 }}
//                         className="h-[125.97px] rounded-xl overflow-hidden mb-2 relative"
//                     >
//                         <Image
//                             source={category.image}
//                             className="w-full h-full"
//                             resizeMode="cover"
//                         />
//                         <LinearGradient
//                             colors={['rgba(49, 23, 12, 0)', 'rgba(49, 23, 12, 1)']}
//                             className="absolute bottom-0 left-0 right-0 h-[100px]"
//                         />
//                         <View className="absolute bottom-2 left-2 right-2">
//                             <CustomText className="text-white text-xs text-center">
//                                 {category.title}
//                             </CustomText>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     )
// }

// import React, { useEffect, useState } from 'react'
// import { Dimensions, Image, TouchableOpacity, View, ActivityIndicator } from 'react-native'
// import CustomText from './CustomText';
// import { router } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import api from '@/utils/api';

// interface Category {
//     id: string;
//     title: string;
//     image: any; // You might want to use a default image if none is provided
// }

// interface ContentResponse {
//     id: string;
//     category: string;
//     title: string;
//     description: string;
//     type: 'AUDIO' | 'VIDEO';
//     subcategory: string;
//     duration: number;
//     level: string;
//     intention: string;
//     fileUrl: string;
//     thumbnailUrl: string;
// }

// interface ApiResponse {
//     success: boolean;
//     data: ContentResponse[];
// }

// export default function CategoryGrid() {
//     const { width } = Dimensions.get('window');
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await api.get<ApiResponse>('/content');
//                 if (response.data.success) {
//                     // Get unique categories from the content, filtering out null/undefined
//                     const uniqueCategories = Array.from(
//                         new Set(response.data.data
//                             .map((item) => item.category)
//                             .filter(Boolean))
//                     ).map((category, index) => ({
//                         id: `category-${index}`,
//                         title: category as string,
//                         image: require('@/assets/images/soma/homeimages/category-placeholder.png')
//                     }));
//                     setCategories(uniqueCategories);
//                 }
//             } catch (err) {
//                 console.error('Error fetching categories:', err);
//                 setError('Failed to load categories');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchCategories();
//     }, []);

//     if (isLoading) {
//         return (
//             <View className="flex-1 justify-center items-center">
//                 <ActivityIndicator size="large" color="#31170C" />
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View className="flex-1 justify-center items-center">
//                 <CustomText className="text-red-500">{error}</CustomText>
//             </View>
//         );
//     }

//     return (
//         <View className="flex-row flex-wrap gap-3">
//             {categories.map((category) => (
//                 <TouchableOpacity
//                     key={category.id}
//                     style={{ width: (width - 48 - 16) / 3 }}
//                     className="h-[125.97px] rounded-xl overflow-hidden mb-2"
//                     onPress={() => router.push({
//                         pathname: '/session/category/[id]',
//                         params: { id: category.id }
//                     })}
//                 >
//                     <View
//                         key={category.id}
//                         style={{ width: (width - 48 - 16) / 3 }}
//                         className="h-[125.97px] rounded-xl overflow-hidden mb-2 relative"
//                     >
//                         <Image
//                             source={category.image}
//                             className="w-full h-full"
//                             resizeMode="cover"
//                         />
//                         <LinearGradient
//                             colors={['rgba(49, 23, 12, 0)', 'rgba(49, 23, 12, 1)']}
//                             className="absolute bottom-0 left-0 right-0 h-[100px]"
//                         />
//                         <View className="absolute bottom-2 left-2 right-2">
//                             <CustomText className="text-white text-xs text-center">
//                                 {category.title}
//                             </CustomText>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     )
// }

// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import { Dimensions, Image, View, ActivityIndicator, Pressable } from 'react-native';
// import CustomText from './CustomText';
// import { router } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import api from '@/utils/api';

// const ROUTES = {
//     CATEGORY_DETAIL: (id: string) => ({
//         pathname: '/session/category/[id]' as const,
//         params: { id }
//     }),
// } as const;

// interface SessionCategory {
//     id: string;
//     name: string;
//     description: string | null;
//     parentId: string | null;
//     thumbnailUrl: string | null;
// }

// interface Category {
//     id: string;
//     title: string;
//     image: string | null;
// }

// interface ApiResponse<T> {
//     success: boolean;
//     data: T;
//     error?: string;
// }

// const NUM_COLUMNS = 3;
// const ITEM_GAP = 12;

// interface CategoryGridProps {
//     onCategoryPress?: (categoryId: string) => void;
// }

// export default function CategoryGrid({ onCategoryPress }: CategoryGridProps) {
//     const { width } = Dimensions.get('window');
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const screenPaddingHorizontal = 48;
//     const availableWidth = width - screenPaddingHorizontal;
//     const itemSize = (availableWidth - (NUM_COLUMNS - 1) * ITEM_GAP) / NUM_COLUMNS;
//     const ITEM_HEIGHT = itemSize * 1.15;

//     useEffect(() => {
//         const fetchCategories = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {

//                 const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');
//                 if (response.data.success) {
//                     const parentCategories = response.data.data.filter(category => category.parentId === null);

//                     const formattedCategories: Category[] = parentCategories.map(category => ({
//                         id: category.id,
//                         title: category.name,
//                         image: category.thumbnailUrl || null,
//                     }));

//                     setCategories(formattedCategories);

//                 } else {
//                     setError(response.data.error || 'Failed to fetch categories');
//                 }

//             } catch (err: any) {
//                 console.error('Error fetching categories:', err);
//                 setError(err.message || 'Failed to load categories');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchCategories();
//     }, [api]);

//     const renderCategoryGrid = useMemo(() => (
//         categories.length > 0 ? (
//             <View className="flex-row flex-wrap -mx-[6]">
//                 {categories.map((category) => (
//                     <Pressable
//                         key={category.id}
//                         style={{
//                             width: itemSize,
//                             marginHorizontal: ITEM_GAP / 2,
//                             height: ITEM_HEIGHT,
//                         }}
//                         className="mb-3 rounded-xl overflow-hidden border border-[#31170C20]"
//                         onPress={() => onCategoryPress ? onCategoryPress(category.id) : router.push({
//                             pathname: ROUTES.CATEGORY_DETAIL(category.id).pathname,
//                             params: ROUTES.CATEGORY_DETAIL(category.id).params
//                         })}
//                     >
//                         <View className="flex-1 relative justify-end">
//                             {category.image ? (
//                                 <Image
//                                     source={{ uri: category.image }}
//                                     style={{ position: 'absolute', width: '100%', height: '100%' }}
//                                     resizeMode="cover"
//                                 />
//                             ) : (
//                                 <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#E5DCD1' }} />
//                             )}
//                             <LinearGradient
//                                 colors={['rgba(49, 23, 12, 0)', 'rgba(49, 23, 12, 0.8)']}
//                                 style={{
//                                     position: 'absolute',
//                                     left: 0,
//                                     right: 0,
//                                     bottom: 0,
//                                     height: '70%',
//                                 }}
//                             />
//                             <View className="absolute bottom-2 left-1 right-1 items-center">
//                                 <CustomText className="text-white text-xs text-center font-semibold">
//                                     {category.title}
//                                 </CustomText>
//                             </View>
//                         </View>
//                     </Pressable>
//                 ))}
//             </View>
//         ) : (
//             !isLoading && !error ? (
//                 <View className="flex-1 justify-center items-center py-5">
//                     <CustomText className="text-gray-600">No categories found.</CustomText>
//                 </View>
//             ) : null
//         )
//     ), [categories, itemSize, ITEM_HEIGHT, ITEM_GAP, onCategoryPress, router, isLoading, error]);

//     if (isLoading) {
//         return (
//             <View className="flex-1 justify-center items-center min-h-[100]">
//                 <ActivityIndicator size="large" color="#31170C" />
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View className="flex-1 justify-center items-center p-5">
//                 <CustomText className="text-red-500 text-center">{error}</CustomText>
//             </View>
//         );
//     }

//     return renderCategoryGrid;
// }
// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import { Dimensions, Image, View, ActivityIndicator, Pressable } from 'react-native';
// import CustomText from './CustomText';
// import { router } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import api from '@/utils/api';

// // Single fallback image for all categories
// const FALLBACK_IMAGE = require('@/assets/images/soma/homeimages/category-placeholder.png');

// const ROUTES = {
//     CATEGORY_DETAIL: (id: string) => ({
//         pathname: '/session/category/[id]' as const,
//         params: { id }
//     }),
// } as const;

// // Updated interface to match the API response
// interface SessionCategory {
//     id: string;
//     name: string;
//     description: string | null;
//     imageUrl: string | null;
//     isDefault: boolean;
//     parentId: string | null;
//     createdAt: string;
//     updatedAt: string;
// }

// interface Category {
//     id: string;
//     title: string;
//     image: string | null;
// }

// interface ApiResponse<T> {
//     success: boolean;
//     data: T;
//     error?: string;
// }

// const NUM_COLUMNS = 3;
// const ITEM_GAP = 12;

// interface CategoryGridProps {
//     onCategoryPress?: (categoryId: string) => void;
// }

// export default function CategoryGrid({ onCategoryPress }: CategoryGridProps) {
//     const { width } = Dimensions.get('window');
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const screenPaddingHorizontal = 48;
//     const availableWidth = width - screenPaddingHorizontal;
//     const itemSize = (availableWidth - (NUM_COLUMNS - 1) * ITEM_GAP) / NUM_COLUMNS;
//     const ITEM_HEIGHT = itemSize * 1.15;

//     useEffect(() => {
//         const fetchCategories = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');
//                 if (response.data.success) {
//                     // Only include parent categories (those without a parentId)
//                     const parentCategories = response.data.data.filter(category => category.parentId === null);
//                     console.log('Parent categories:', parentCategories);

//                     const formattedCategories: Category[] = parentCategories.map(category => ({
//                         id: category.id,
//                         title: category.name,
//                         image: category.imageUrl || null,
//                     }));

//                     setCategories(formattedCategories);
//                 } else {
//                     setError(response.data.error || 'Failed to fetch categories');
//                 }
//             } catch (err: any) {
//                 console.error('Error fetching categories:', err);
//                 setError(err.message || 'Failed to load categories');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchCategories();
//     }, []); // Removed api from dependency array

//     const renderCategoryGrid = useMemo(() => (
//         categories.length > 0 ? (
//             <View className="flex-row flex-wrap -mx-[6]">
//                 {categories.map((category) => (
//                     <Pressable
//                         key={category.id}
//                         style={{
//                             width: itemSize,
//                             marginHorizontal: ITEM_GAP / 2,
//                             height: ITEM_HEIGHT,
//                         }}
//                         className="mb-3 rounded-xl overflow-hidden border border-[#31170C20]"
//                         onPress={() => onCategoryPress ? onCategoryPress(category.id) : router.push({
//                             pathname: ROUTES.CATEGORY_DETAIL(category.id).pathname,
//                             params: ROUTES.CATEGORY_DETAIL(category.id).params
//                         })}
//                     >
//                         <View className="flex-1 relative justify-end">
//                             {/* Try to load from URL, fall back to local image on error */}
//                             {category.image ? (
//                                 <Image
//                                     source={{ uri: category.image }}
//                                     style={{ position: 'absolute', width: '100%', height: '100%' }}
//                                     resizeMode="cover"
//                                     onError={() => console.log(`Falling back to local image for ${category.title}`)}
//                                     defaultSource={FALLBACK_IMAGE} // This works on iOS but not Android
//                                 />
//                             ) : (
//                                 <Image
//                                     source={FALLBACK_IMAGE}
//                                     style={{ position: 'absolute', width: '100%', height: '100%' }}
//                                     resizeMode="cover"
//                                 />
//                             )}
//                             <LinearGradient
//                                 colors={['rgba(49, 23, 12, 0)', 'rgba(49, 23, 12, 0.8)']}
//                                 style={{
//                                     position: 'absolute',
//                                     left: 0,
//                                     right: 0,
//                                     bottom: 0,
//                                     height: '70%',
//                                 }}
//                             />
//                             <View className="absolute bottom-2 left-1 right-1 items-center">
//                                 <CustomText className="text-white text-xs text-center font-semibold">
//                                     {category.title}
//                                 </CustomText>
//                             </View>
//                         </View>
//                     </Pressable>
//                 ))}
//             </View>
//         ) : (
//             !isLoading && !error ? (
//                 <View className="flex-1 justify-center items-center py-5">
//                     <CustomText className="text-gray-600">No categories found.</CustomText>
//                 </View>
//             ) : null
//         )
//     ), [categories, itemSize, ITEM_HEIGHT, ITEM_GAP, onCategoryPress, router, isLoading, error]);

//     if (isLoading) {
//         return (
//             <View className="flex-1 justify-center items-center min-h-[100]">
//                 <ActivityIndicator size="large" color="#31170C" />
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View className="flex-1 justify-center items-center p-5">
//                 <CustomText className="text-red-500 text-center">{error}</CustomText>
//             </View>
//         );
//     }

//     return renderCategoryGrid;
// }

//working

// import React, { memo, useMemo } from 'react';
// import { Dimensions, View, Pressable } from 'react-native';
// import CustomText from './CustomText';
// import { router } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Image as ExpoImage } from 'expo-image';
// import { useContentStore } from '@/store/contentStore';
// import { Category } from '@/store/contentStore';
// import { BLURHASH_PLACEHOLDER, IMAGE_ASSETS } from '@/constants/uiConstants';
// import { CategoryGridSkeleton } from './custom/SkeletonLoaders';

// // Use shared constants
// const FALLBACK_IMAGE = IMAGE_ASSETS.CATEGORY_PLACEHOLDER;

// const ROUTES = {
//     CATEGORY_DETAIL: (id: string) => ({
//         pathname: '/session/category/[id]' as const,
//         params: { id }
//     }),
// } as const;

// const NUM_COLUMNS = 3;
// const ITEM_GAP = 12;

// interface CategoryGridProps {
//     onCategoryPress?: (categoryId: string) => void;
// }

// function CategoryGrid({ onCategoryPress }: CategoryGridProps) {
//     const { width } = Dimensions.get('window');
//     const { categories, isLoading, error, fetchCategories } = useContentStore();

//     // Calculate layout dimensions
//     const screenPaddingHorizontal = 48;
//     const availableWidth = width - screenPaddingHorizontal;
//     const itemSize = useMemo(() =>
//         (availableWidth - (NUM_COLUMNS - 1) * ITEM_GAP) / NUM_COLUMNS,
//         [availableWidth]
//     );
//     const ITEM_HEIGHT = useMemo(() => itemSize * 1.15, [itemSize]);

//     // Fetch categories if not already loaded
//     React.useEffect(() => {
//         if (categories.length === 0 && !isLoading) {
//             fetchCategories();
//         }
//     }, [categories.length, isLoading, fetchCategories]);

//     // Added explicit type annotation for category parameter
//     const renderCategoryItem = useMemo(() => (category: Category) => (
//         <Pressable
//             key={category.id}
//             style={{
//                 width: itemSize,
//                 marginHorizontal: ITEM_GAP / 2,
//                 height: ITEM_HEIGHT,
//             }}
//             className="mb-3 rounded-xl overflow-hidden border border-[#31170C20]"
//             onPress={() => onCategoryPress ? onCategoryPress(category.id) : router.push({
//                 pathname: ROUTES.CATEGORY_DETAIL(category.id).pathname,
//                 params: ROUTES.CATEGORY_DETAIL(category.id).params
//             })}
//         >
//             <View className="flex-1 relative justify-end">
//                 <ExpoImage
//                     source={category.image ? { uri: category.image } : FALLBACK_IMAGE}
//                     style={{ position: 'absolute', width: '100%', height: '100%' }}
//                     contentFit="cover"
//                     placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
//                     transition={200}
//                     cachePolicy="memory-disk"
//                 />
//                 <LinearGradient
//                     colors={['rgba(49, 23, 12, 0)', 'rgba(49, 23, 12, 0.8)']}
//                     style={{
//                         position: 'absolute',
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         height: '70%',
//                     }}
//                 />
//                 <View className="absolute bottom-2 left-1 right-1 items-center">
//                     <CustomText className="text-white text-xs text-center font-semibold">
//                         {category.title}
//                     </CustomText>
//                 </View>
//             </View>
//         </Pressable>
//     ), [itemSize, ITEM_HEIGHT, ITEM_GAP, onCategoryPress, router]);

//     const renderCategoryGrid = useMemo(() => (
//         categories.length > 0 ? (
//             <View className="flex-row flex-wrap -mx-[6]">
//                 {categories.map(renderCategoryItem)}
//             </View>
//         ) : (
//             !isLoading && !error ? (
//                 <View className="flex-1 justify-center items-center py-5">
//                     <CustomText className="text-gray-600">No categories found.</CustomText>
//                 </View>
//             ) : null
//         )
//     ), [categories, renderCategoryItem, isLoading, error]);

//     // Use skeleton loader instead of ActivityIndicator
//     if (isLoading) {
//         return <CategoryGridSkeleton />;
//     }

//     if (error) {
//         return (
//             <View className="flex-1 justify-center items-center p-5">
//                 <CustomText className="text-red-500 text-center">{error}</CustomText>
//             </View>
//         );
//     }

//     return renderCategoryGrid;
// }

// // Memoize the component to prevent unnecessary re-renders
// export default memo(CategoryGrid);


import React, { memo, useMemo } from 'react';
import { Dimensions, View, Pressable } from 'react-native';
import CustomText from './CustomText';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image as ExpoImage } from 'expo-image';
import { useContentStore } from '@/store/contentStore';
import { Category } from '@/store/contentStore';
import { BLURHASH_PLACEHOLDER, IMAGE_ASSETS } from '@/constants/uiConstants';
import { CategoryGridSkeleton } from './custom/SkeletonLoaders';

// Use shared constants
const FALLBACK_IMAGE = IMAGE_ASSETS.CATEGORY_PLACEHOLDER;

const ROUTES = {
    CATEGORY_DETAIL: (id: string) => ({
        pathname: '/(appscreen)/session/category/[id]' as const,
        params: { id }
    }),
} as const;

const NUM_COLUMNS = 3;
const ITEM_GAP = 12;

interface CategoryGridProps {
    onCategoryPress?: (categoryId: string) => void;
}

function CategoryGrid({ onCategoryPress }: CategoryGridProps) {
    const { width } = Dimensions.get('window');
    const { categories, isCategoriesLoading, error, fetchCategories } = useContentStore();

    // Calculate layout dimensions
    const screenPaddingHorizontal = 48;
    const availableWidth = width - screenPaddingHorizontal;
    const itemSize = useMemo(() =>
        (availableWidth - (NUM_COLUMNS - 1) * ITEM_GAP) / NUM_COLUMNS,
        [availableWidth]
    );
    const ITEM_HEIGHT = useMemo(() => itemSize * 1.15, [itemSize]);

    // Fetch categories only if they haven't been loaded yet
    React.useEffect(() => {
        if (categories.length === 0 && !isCategoriesLoading) {
            fetchCategories();
        }
    }, [categories.length, isCategoriesLoading, fetchCategories]);

    // Added explicit type annotation for category parameter
    const renderCategoryItem = useMemo(() => (category: Category) => (
        <Pressable
            key={category.id}
            style={{
                width: itemSize,
                marginHorizontal: ITEM_GAP / 2,
                height: ITEM_HEIGHT,
            }}
            className="mb-3 rounded-xl overflow-hidden border border-[#31170C20]"
            onPress={() => onCategoryPress ? onCategoryPress(category.id) : router.push({
                pathname: ROUTES.CATEGORY_DETAIL(category.id).pathname,
                params: ROUTES.CATEGORY_DETAIL(category.id).params
            })}
        >
            <View className="flex-1 relative justify-end">
                <ExpoImage
                    source={category.image ? { uri: category.image } : FALLBACK_IMAGE}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                    contentFit="cover"
                    placeholder={{ blurhash: BLURHASH_PLACEHOLDER }}
                    transition={200}
                    cachePolicy="memory-disk"
                />
                <LinearGradient
                    colors={['rgba(49, 23, 12, 0)', 'rgba(49, 23, 12, 0.8)']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '70%',
                    }}
                />
                <View className="absolute bottom-2 left-1 right-1 items-center">
                    <CustomText className="text-white text-xs text-center font-semibold">
                        {category.title}
                    </CustomText>
                </View>
            </View>
        </Pressable>
    ), [itemSize, ITEM_HEIGHT, ITEM_GAP, onCategoryPress, router]);
    const renderCategoryGrid = useMemo(() => (
        categories.length > 0 ? (
            <View className="flex-row flex-wrap -mx-[6]">
                {categories.map(renderCategoryItem)}
            </View>
        ) : (
            !isCategoriesLoading && !error ? (
                <View className="flex-1 justify-center items-center py-5">
                    <CustomText className="text-gray-600">No categories found.</CustomText>
                </View>
            ) : null
        )
    ), [categories, renderCategoryItem, isCategoriesLoading, error]);

    // Only show skeleton loader during initial loading, not during refresh
    if (isCategoriesLoading && categories.length === 0) {
        return <CategoryGridSkeleton />;
    }

    if (error && categories.length === 0) {
        return (
            <View className="flex-1 justify-center items-center p-5">
                <CustomText className="text-red-500 text-center">{error}</CustomText>
            </View>
        );
    }

    return renderCategoryGrid;
}

// Memoize the component to prevent unnecessary re-renders
export default memo(CategoryGrid);
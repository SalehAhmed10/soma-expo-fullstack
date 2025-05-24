

// import { create } from 'zustand';
// import api from '@/utils/api';

// // Define missing types
// export interface ApiResponse<T> {
//     success: boolean;
//     data: T;
//     error?: string;
// }

// export interface HomeScreenSession {
//     id: string;
//     title: string;
//     description: string | null;
//     type: 'LIVE' | 'SCHEDULED' | 'PRE_RECORDED';
//     category?: string | null;
//     duration: number | null;
//     level: string | null;
//     intention: string | null;
//     fileUrl: string | null;
//     thumbnailUrl: string | null;
//     startTime?: string | null;
//     instructor?: string | null;
// }

// export interface Content {
//     id: string;
//     title: string;
//     description: string | null;
//     type: 'AUDIO' | 'VIDEO';
//     category?: string | null;
//     subcategory?: string | null;
//     duration: number | null;
//     level?: string | null;
//     intention?: string | null;
//     fileUrl: string | null;
//     thumbnailUrl: string | null;
// }

// export interface Playlist {
//     id: string;
//     name: string;
//     description: string | null;
//     contentCount: number;
//     contents: Content[];
//     thumbnailUrl?: string | null;
// }

// export interface SessionCategory {
//     id: string;
//     name: string;
//     description: string | null;
//     imageUrl: string | null;
//     isDefault: boolean;
//     parentId: string | null;
//     createdAt: string;
//     updatedAt: string;
// }

// export interface Category {
//     id: string;
//     title: string;
//     image: string | null;
// }

// export interface SubCategory extends Category {
//     parentId: string;
// }

// // Define types for the store with separate loading states
// interface ContentState {
//     featuredSessions: HomeScreenSession[];
//     playlists: Playlist[];
//     categories: Category[];
//     subCategories: SubCategory[];
//     isLoading: boolean;
//     isFeaturedSessionsLoading: boolean;
//     isPlaylistsLoading: boolean;
//     isCategoriesLoading: boolean;
//     isSubCategoriesLoading: boolean;
//     error: string | null;

//     // Actions
//     fetchFeaturedSessions: () => Promise<void>;
//     fetchPlaylists: () => Promise<void>;
//     fetchCategories: () => Promise<void>;
//     fetchSubCategories: (parentId: string) => Promise<void>;
//     fetchAllHomeData: () => Promise<void>;
// }

// export const useContentStore = create<ContentState>((set, get) => ({
//     featuredSessions: [],
//     playlists: [],
//     categories: [],
//     subCategories: [],
//     isLoading: false,
//     isFeaturedSessionsLoading: false,
//     isPlaylistsLoading: false,
//     isCategoriesLoading: false,
//     isSubCategoriesLoading: false,
//     error: null,

//     fetchFeaturedSessions: async () => {
//         try {
//             set(state => ({ ...state, isFeaturedSessionsLoading: true }));
//             const response = await api.get<ApiResponse<HomeScreenSession[]>>('/session/live-sessions');
//             if (response.data.success) {
//                 set(state => ({
//                     ...state,
//                     featuredSessions: response.data.data,
//                     isFeaturedSessionsLoading: false
//                 }));
//             } else {
//                 set(state => ({
//                     ...state,
//                     error: response.data.error || 'Failed to load sessions',
//                     isFeaturedSessionsLoading: false
//                 }));
//             }
//         } catch (err: any) {
//             console.error('Error fetching featured sessions:', err);
//             set(state => ({
//                 ...state,
//                 error: err.message || 'Failed to load sessions',
//                 isFeaturedSessionsLoading: false
//             }));
//         }
//     },

//     fetchPlaylists: async () => {
//         try {
//             set(state => ({ ...state, isPlaylistsLoading: true }));
//             const response = await api.get<ApiResponse<Playlist[]>>('/playlist');
//             if (response.data.success) {
//                 set(state => ({
//                     ...state,
//                     playlists: response.data.data,
//                     isPlaylistsLoading: false
//                 }));
//             } else {
//                 set(state => ({
//                     ...state,
//                     error: response.data.error || 'Failed to load playlists',
//                     isPlaylistsLoading: false
//                 }));
//             }
//         } catch (err: any) {
//             console.error('Error fetching playlists:', err);
//             set(state => ({
//                 ...state,
//                 error: err.message || 'Failed to load playlists',
//                 isPlaylistsLoading: false
//             }));
//         }
//     },

//     fetchCategories: async () => {
//         try {
//             set(state => ({ ...state, isCategoriesLoading: true }));
//             const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');

//             if (response.data.success) {
//                 const parentCategories = response.data.data.filter(category => category.parentId === null);

//                 const formattedCategories: Category[] = parentCategories.map((category: SessionCategory) => {
//                     // Log and sanitize image URL
//                     let imageUrl = category.imageUrl;
//                     if (imageUrl) {
//                         // Get base URL without query parameters (to avoid S3 expiry issues)
//                         const baseUrl = imageUrl.split('?')[0];
//                         console.log(`Category ${category.id} - ${category.name} image: ${baseUrl}`);

//                         // Use the full URL as it comes from the API
//                         return {
//                             id: category.id,
//                             title: category.name,
//                             image: imageUrl
//                         };
//                     }

//                     return {
//                         id: category.id,
//                         title: category.name,
//                         image: null
//                     };
//                 });

//                 set(state => ({
//                     ...state,
//                     categories: formattedCategories,
//                     isCategoriesLoading: false
//                 }));
//             } else {
//                 set(state => ({
//                     ...state,
//                     error: response.data.error || 'Failed to fetch categories',
//                     isCategoriesLoading: false
//                 }));
//             }
//         } catch (err: any) {
//             console.error('Error fetching categories:', err);
//             set(state => ({
//                 ...state,
//                 error: err.message || 'Failed to load categories',
//                 isCategoriesLoading: false
//             }));
//         }
//     },

//     fetchSubCategories: async (parentId: string) => {
//         try {
//             set(state => ({ ...state, isSubCategoriesLoading: true }));
//             console.log(`Fetching subcategories for parent ID: ${parentId}`);

//             // Fetch specific category to get the details including subcategories
//             const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');

//             if (response.data.success) {
//                 // Filter client-side for categories with matching parentId
//                 const childCategories = response.data.data.filter(
//                     category => category.parentId === parentId
//                 );

//                 console.log(`Found ${childCategories.length} subcategories for parent ${parentId}`);

//                 const formattedSubCategories: SubCategory[] = childCategories.map((category: SessionCategory) => {
//                     // Log and sanitize image URL
//                     let imageUrl = category.imageUrl;
//                     if (imageUrl) {
//                         // Log the base URL for debugging
//                         const baseUrl = imageUrl.split('?')[0];
//                         console.log(`Subcategory ${category.id} - ${category.name} image: ${baseUrl}`);

//                         // Use the full URL as returned from the API
//                         return {
//                             id: category.id,
//                             title: category.name,
//                             image: imageUrl,
//                             parentId: category.parentId || parentId
//                         };
//                     }

//                     return {
//                         id: category.id,
//                         title: category.name,
//                         image: null,
//                         parentId: category.parentId || parentId
//                     };
//                 });

//                 set(state => ({
//                     ...state,
//                     subCategories: formattedSubCategories,
//                     isSubCategoriesLoading: false
//                 }));
//             } else {
//                 set(state => ({
//                     ...state,
//                     error: response.data.error || 'Failed to fetch subcategories',
//                     isSubCategoriesLoading: false
//                 }));
//             }
//         } catch (err: any) {
//             console.error('Error fetching subcategories:', err);
//             set(state => ({
//                 ...state,
//                 error: err.message || 'Failed to load subcategories',
//                 isSubCategoriesLoading: false
//             }));
//         }
//     },

//     fetchAllHomeData: async () => {
//         set(state => ({
//             ...state,
//             isLoading: true,
//             isFeaturedSessionsLoading: true,
//             isPlaylistsLoading: true,
//             isCategoriesLoading: true,
//             error: null
//         }));

//         try {
//             await Promise.all([
//                 get().fetchFeaturedSessions(),
//                 get().fetchPlaylists(),
//                 get().fetchCategories(),
//             ]);
//         } catch (err: any) {
//             console.error('Error fetching all data:', err);
//             set(state => ({ ...state, error: 'Failed to load data' }));
//         } finally {
//             set(state => ({
//                 ...state,
//                 isLoading: false
//             }));
//         }
//     }
// }));

import { create } from 'zustand';
import api from '@/utils/api';

// Define missing types
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

export interface HomeScreenSession {
    id: string;
    title: string;
    description: string | null;
    type: 'LIVE' | 'SCHEDULED' | 'PRE_RECORDED';
    category?: string | null;
    duration: number | null;
    level: string | null;
    intention: string | null;
    fileUrl: string | null;
    thumbnailUrl: string | null;
    startTime?: string | null;
    instructor?: string | null;
}

// Updated track interface to match API response
export interface Track {
    id: string;
    title: string;
    description: string | null;
    duration: number;
    intention: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
    order: number;
}

// Updated playlist interface to match new API structure
export interface Playlist {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    isPublic: boolean;
    isOwner: boolean;
    categoryId: string | null;
    owner: {
        id: string;
        name: string;
        email: string;
    } | null;
    category: {
        id: string;
        name: string;
    } | null;
    contentCount: number;
    tracks: Track[]; // Changed from 'contents' to 'tracks'
    createdAt: string;
    updatedAt: string;
}

export interface SessionCategory {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    isDefault: boolean;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    title: string;
    image: string | null;
}

export interface SubCategory extends Category {
    parentId: string;
}

// Define types for the store with separate loading states
interface ContentState {
    featuredSessions: HomeScreenSession[];
    playlists: Playlist[];
    categories: Category[];
    subCategories: SubCategory[];
    isLoading: boolean;
    isFeaturedSessionsLoading: boolean;
    isPlaylistsLoading: boolean;
    isCategoriesLoading: boolean;
    isSubCategoriesLoading: boolean;
    error: string | null;

    // Actions
    fetchFeaturedSessions: () => Promise<void>;
    fetchPlaylists: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    fetchSubCategories: (parentId: string) => Promise<void>;
    fetchAllHomeData: () => Promise<void>;
}

export const useContentStore = create<ContentState>((set, get) => ({
    featuredSessions: [],
    playlists: [],
    categories: [],
    subCategories: [],
    isLoading: false,
    isFeaturedSessionsLoading: false,
    isPlaylistsLoading: false,
    isCategoriesLoading: false,
    isSubCategoriesLoading: false,
    error: null,

    fetchFeaturedSessions: async () => {
        try {
            set(state => ({ ...state, isFeaturedSessionsLoading: true, error: null }));
            console.log('Fetching featured sessions...');

            const response = await api.get<ApiResponse<HomeScreenSession[]>>('/session/live-sessions');
            console.log('Featured sessions response:', response.data);

            if (response.data.success) {
                set(state => ({
                    ...state,
                    featuredSessions: response.data.data || [],
                    isFeaturedSessionsLoading: false
                }));
            } else {
                throw new Error(response.data.error || 'Failed to load sessions');
            }
        } catch (err: any) {
            console.error('Error fetching featured sessions:', err);
            set(state => ({
                ...state,
                error: err.message || 'Failed to load sessions',
                isFeaturedSessionsLoading: false
            }));
        }
    },

    fetchPlaylists: async () => {
        try {
            set(state => ({ ...state, isPlaylistsLoading: true, error: null }));
            console.log('Fetching playlists...');

            const response = await api.get('/playlist');
            console.log('Playlists API response:', response.data);

            if (response.data.success) {
                // Handle both old and new response structures
                const playlistData = response.data.data;
                let playlists: Playlist[] = [];

                if (Array.isArray(playlistData)) {
                    playlists = playlistData;
                } else if (playlistData && Array.isArray(playlistData.playlists)) {
                    playlists = playlistData.playlists;
                } else {
                    console.warn('Unexpected playlist data structure:', playlistData);
                    playlists = [];
                }

                console.log('Processed playlists:', playlists.length);

                set(state => ({
                    ...state,
                    playlists: playlists,
                    isPlaylistsLoading: false
                }));
            } else {
                throw new Error(response.data.error || 'Failed to load playlists');
            }
        } catch (err: any) {
            console.error('Error fetching playlists:', err);
            set(state => ({
                ...state,
                error: err.message || 'Failed to load playlists',
                isPlaylistsLoading: false
            }));
        }
    },

    fetchCategories: async () => {
        try {
            set(state => ({ ...state, isCategoriesLoading: true, error: null }));
            console.log('Fetching categories...');

            const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');
            console.log('Categories response:', response.data);

            if (response.data.success) {
                const parentCategories = response.data.data.filter(category => category.parentId === null);

                const formattedCategories: Category[] = parentCategories.map((category: SessionCategory) => {
                    let imageUrl = category.imageUrl;
                    if (imageUrl) {
                        const baseUrl = imageUrl.split('?')[0];
                        console.log(`Category ${category.id} - ${category.name} image: ${baseUrl}`);
                        return {
                            id: category.id,
                            title: category.name,
                            image: imageUrl
                        };
                    }

                    return {
                        id: category.id,
                        title: category.name,
                        image: null
                    };
                });

                set(state => ({
                    ...state,
                    categories: formattedCategories,
                    isCategoriesLoading: false
                }));
            } else {
                throw new Error(response.data.error || 'Failed to fetch categories');
            }
        } catch (err: any) {
            console.error('Error fetching categories:', err);
            set(state => ({
                ...state,
                error: err.message || 'Failed to load categories',
                isCategoriesLoading: false
            }));
        }
    },

    fetchSubCategories: async (parentId: string) => {
        try {
            set(state => ({ ...state, isSubCategoriesLoading: true, error: null }));
            console.log(`Fetching subcategories for parent ID: ${parentId}`);

            const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');

            if (response.data.success) {
                const childCategories = response.data.data.filter(
                    category => category.parentId === parentId
                );

                console.log(`Found ${childCategories.length} subcategories for parent ${parentId}`);

                const formattedSubCategories: SubCategory[] = childCategories.map((category: SessionCategory) => {
                    let imageUrl = category.imageUrl;
                    if (imageUrl) {
                        const baseUrl = imageUrl.split('?')[0];
                        console.log(`Subcategory ${category.id} - ${category.name} image: ${baseUrl}`);
                        return {
                            id: category.id,
                            title: category.name,
                            image: imageUrl,
                            parentId: category.parentId || parentId
                        };
                    }

                    return {
                        id: category.id,
                        title: category.name,
                        image: null,
                        parentId: category.parentId || parentId
                    };
                });

                set(state => ({
                    ...state,
                    subCategories: formattedSubCategories,
                    isSubCategoriesLoading: false
                }));
            } else {
                throw new Error(response.data.error || 'Failed to fetch subcategories');
            }
        } catch (err: any) {
            console.error('Error fetching subcategories:', err);
            set(state => ({
                ...state,
                error: err.message || 'Failed to load subcategories',
                isSubCategoriesLoading: false
            }));
        }
    },

    fetchAllHomeData: async () => {
        set(state => ({
            ...state,
            isLoading: true,
            error: null
        }));

        try {
            await Promise.all([
                get().fetchFeaturedSessions(),
                get().fetchPlaylists(),
                get().fetchCategories(),
            ]);
        } catch (err: any) {
            console.error('Error fetching all data:', err);
            set(state => ({ ...state, error: 'Failed to load data' }));
        } finally {
            set(state => ({
                ...state,
                isLoading: false
            }));
        }
    }
}));
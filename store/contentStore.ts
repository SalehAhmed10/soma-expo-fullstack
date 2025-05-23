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

// // Define types for the store
// interface ContentState {
//     featuredSessions: HomeScreenSession[];
//     playlists: Playlist[];
//     categories: Category[];
//     isLoading: boolean;
//     error: string | null;

//     // Actions
//     fetchFeaturedSessions: () => Promise<void>;
//     fetchPlaylists: () => Promise<void>;
//     fetchCategories: () => Promise<void>;
//     fetchAllHomeData: () => Promise<void>;
// }

// export const useContentStore = create<ContentState>((set, get) => ({
//     featuredSessions: [],
//     playlists: [],
//     categories: [],
//     isLoading: false,
//     error: null,

//     fetchFeaturedSessions: async () => {
//         try {
//             set(state => ({ ...state, isLoading: true }));
//             const response = await api.get<ApiResponse<HomeScreenSession[]>>('/session/live-sessions');
//             if (response.data.success) {
//                 set(state => ({
//                     ...state,
//                     featuredSessions: response.data.data,
//                     isLoading: false
//                 }));
//             } else {
//                 set(state => ({
//                     ...state,
//                     error: response.data.error || 'Failed to load sessions',
//                     isLoading: false
//                 }));
//             }
//         } catch (err: any) {
//             console.error('Error fetching featured sessions:', err);
//             set(state => ({
//                 ...state,
//                 error: err.message || 'Failed to load sessions',
//                 isLoading: false
//             }));
//         }
//     },

//     fetchPlaylists: async () => {
//         try {
//             set(state => ({ ...state, isLoading: true }));
//             const response = await api.get<ApiResponse<Playlist[]>>('/playlist');
//             if (response.data.success) {
//                 set(state => ({
//                     ...state,
//                     playlists: response.data.data,
//                     isLoading: false
//                 }));
//             } else {
//                 set(state => ({
//                     ...state,
//                     error: response.data.error || 'Failed to load playlists',
//                     isLoading: false
//                 }));
//             }
//         } catch (err: any) {
//             console.error('Error fetching playlists:', err);
//             set(state => ({
//                 ...state,
//                 error: err.message || 'Failed to load playlists',
//                 isLoading: false
//             }));
//         }
//     },

//     fetchCategories: async () => {
//         try {
//             set(state => ({ ...state, isLoading: true }));
//             const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');
//             if (response.data.success) {
//                 const parentCategories = response.data.data.filter(category => category.parentId === null);
//                 const formattedCategories: Category[] = parentCategories.map((category: SessionCategory) => ({
//                     id: category.id,
//                     title: category.name,
//                     image: category.imageUrl || null,
//                 }));

//                 set(state => ({
//                     ...state,
//                     categories: formattedCategories,
//                     isLoading: false
//                 }));
//             } else {
//                 set(state => ({
//                     ...state,
//                     error: response.data.error || 'Failed to fetch categories',
//                     isLoading: false
//                 }));
//             }
//         } catch (err: any) {
//             console.error('Error fetching categories:', err);
//             set(state => ({
//                 ...state,
//                 error: err.message || 'Failed to load categories',
//                 isLoading: false
//             }));
//         }
//     },

//     fetchAllHomeData: async () => {
//         set(state => ({ ...state, isLoading: true, error: null }));
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
//             set(state => ({ ...state, isLoading: false }));
//         }
//     }
// }));

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

// // Define types for the store with separate loading states
// interface ContentState {
//     featuredSessions: HomeScreenSession[];
//     playlists: Playlist[];
//     categories: Category[];
//     isLoading: boolean;
//     isFeaturedSessionsLoading: boolean;
//     isPlaylistsLoading: boolean;
//     isCategoriesLoading: boolean;
//     error: string | null;

//     // Actions
//     fetchFeaturedSessions: () => Promise<void>;
//     fetchPlaylists: () => Promise<void>;
//     fetchCategories: () => Promise<void>;
//     fetchAllHomeData: () => Promise<void>;
// }

// export const useContentStore = create<ContentState>((set, get) => ({
//     featuredSessions: [],
//     playlists: [],
//     categories: [],
//     isLoading: false,
//     isFeaturedSessionsLoading: false,
//     isPlaylistsLoading: false,
//     isCategoriesLoading: false,
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
//                 const formattedCategories: Category[] = parentCategories.map((category: SessionCategory) => ({
//                     id: category.id,
//                     title: category.name,
//                     image: category.imageUrl || null,
//                 }));

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

export interface Content {
    id: string;
    title: string;
    description: string | null;
    type: 'AUDIO' | 'VIDEO';
    category?: string | null;
    subcategory?: string | null;
    duration: number | null;
    level?: string | null;
    intention?: string | null;
    fileUrl: string | null;
    thumbnailUrl: string | null;
}

export interface Playlist {
    id: string;
    name: string;
    description: string | null;
    contentCount: number;
    contents: Content[];
    thumbnailUrl?: string | null;
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
            set(state => ({ ...state, isFeaturedSessionsLoading: true }));
            const response = await api.get<ApiResponse<HomeScreenSession[]>>('/session/live-sessions');
            if (response.data.success) {
                set(state => ({
                    ...state,
                    featuredSessions: response.data.data,
                    isFeaturedSessionsLoading: false
                }));
            } else {
                set(state => ({
                    ...state,
                    error: response.data.error || 'Failed to load sessions',
                    isFeaturedSessionsLoading: false
                }));
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
            set(state => ({ ...state, isPlaylistsLoading: true }));
            const response = await api.get<ApiResponse<Playlist[]>>('/playlist');
            if (response.data.success) {
                set(state => ({
                    ...state,
                    playlists: response.data.data,
                    isPlaylistsLoading: false
                }));
            } else {
                set(state => ({
                    ...state,
                    error: response.data.error || 'Failed to load playlists',
                    isPlaylistsLoading: false
                }));
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
            set(state => ({ ...state, isCategoriesLoading: true }));
            const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');

            if (response.data.success) {
                const parentCategories = response.data.data.filter(category => category.parentId === null);

                const formattedCategories: Category[] = parentCategories.map((category: SessionCategory) => {
                    // Log and sanitize image URL
                    let imageUrl = category.imageUrl;
                    if (imageUrl) {
                        // Get base URL without query parameters (to avoid S3 expiry issues)
                        const baseUrl = imageUrl.split('?')[0];
                        console.log(`Category ${category.id} - ${category.name} image: ${baseUrl}`);

                        // Use the full URL as it comes from the API
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
                set(state => ({
                    ...state,
                    error: response.data.error || 'Failed to fetch categories',
                    isCategoriesLoading: false
                }));
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
            set(state => ({ ...state, isSubCategoriesLoading: true }));
            console.log(`Fetching subcategories for parent ID: ${parentId}`);

            // Fetch specific category to get the details including subcategories
            const response = await api.get<ApiResponse<SessionCategory[]>>('/session/session-category');

            if (response.data.success) {
                // Filter client-side for categories with matching parentId
                const childCategories = response.data.data.filter(
                    category => category.parentId === parentId
                );

                console.log(`Found ${childCategories.length} subcategories for parent ${parentId}`);

                const formattedSubCategories: SubCategory[] = childCategories.map((category: SessionCategory) => {
                    // Log and sanitize image URL
                    let imageUrl = category.imageUrl;
                    if (imageUrl) {
                        // Log the base URL for debugging
                        const baseUrl = imageUrl.split('?')[0];
                        console.log(`Subcategory ${category.id} - ${category.name} image: ${baseUrl}`);

                        // Use the full URL as returned from the API
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
                set(state => ({
                    ...state,
                    error: response.data.error || 'Failed to fetch subcategories',
                    isSubCategoriesLoading: false
                }));
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
            isFeaturedSessionsLoading: true,
            isPlaylistsLoading: true,
            isCategoriesLoading: true,
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
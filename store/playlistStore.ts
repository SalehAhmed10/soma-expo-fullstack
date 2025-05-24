// import { create } from 'zustand';
// import api from '@/utils/api';

// export interface PlaylistCategory {
//     id: string;
//     name: string;
//     description: string | null;
//     isPublic: boolean;
//     playlists: CategoryPlaylist[];
// }

// export interface CategoryPlaylist {
//     id: string;
//     name: string;
//     description: string | null;
//     image: string | null;
//     trackCount: number;
//     isPublic: boolean;
//     isOwner: boolean;
//     createdAt: string;
//     updatedAt: string;
// }

// export interface PlaylistOwner {
//     id: string;
//     name: string;
//     email: string;
// }

// export interface PlaylistTrack {
//     id: string;
//     title: string;
//     description: string | null;
//     duration: number;
//     intention: string | null;
//     fileUrl: string;
//     thumbnailUrl: string | null;
//     order: number;
// }

// export interface Playlist {
//     id: string;
//     name: string;
//     description: string | null;
//     image: string | null;
//     isPublic: boolean;
//     isOwner: boolean;
//     categoryId: string | null;
//     owner: PlaylistOwner | null;
//     category: {
//         id: string;
//         name: string;
//     } | null;
//     contentCount: number;
//     tracks: PlaylistTrack[];
//     createdAt: string;
//     updatedAt: string;
// }

// export interface PlaylistResponse {
//     success: boolean;
//     data: Playlist[];
//     pagination: {
//         page: number;
//         limit: number;
//         totalCount: number;
//         totalPages: number;
//         hasNextPage: boolean;
//         hasPreviousPage: boolean;
//     };
// }

// export interface CreatePlaylistRequest {
//     name: string;
//     description?: string;
//     categoryId?: string;
//     imageUrl?: string;
// }

// interface PlaylistState {
//     // Categories with playlists
//     categories: PlaylistCategory[];

//     // All playlists (from main endpoint)
//     playlists: Playlist[];

//     // Loading states
//     isLoading: boolean;
//     isCategoriesLoading: boolean;
//     isCreating: boolean;

//     // Error handling
//     error: string | null;

//     // Pagination for main playlists
//     currentPage: number;
//     totalPages: number;
//     hasNextPage: boolean;

//     // Filters
//     activeCategory: string | null;
//     searchQuery: string;

//     // Actions
//     fetchPlaylists: (page?: number, categoryId?: string, search?: string) => Promise<void>;
//     fetchCategoriesWithPlaylists: () => Promise<void>;
//     createPlaylist: (data: CreatePlaylistRequest) => Promise<Playlist | null>;
//     setActiveCategory: (categoryId: string | null) => void;
//     setSearchQuery: (query: string) => void;
//     clearError: () => void;
//     resetPagination: () => void;
// }

// export const usePlaylistStore = create<PlaylistState>((set, get) => ({
//     categories: [],
//     playlists: [],
//     isLoading: false,
//     isCategoriesLoading: false,
//     isCreating: false,
//     error: null,
//     currentPage: 1,
//     totalPages: 1,
//     hasNextPage: false,
//     activeCategory: null,
//     searchQuery: '',

//     fetchPlaylists: async (page = 1, categoryId?: string, search?: string) => {
//         try {
//             set({ isLoading: true, error: null });

//             const params = new URLSearchParams({
//                 page: page.toString(),
//                 limit: '20'
//             });

//             if (categoryId) params.append('categoryId', categoryId);
//             if (search) params.append('search', search);

//             console.log('Fetching playlists with params:', params.toString());

//             const response = await api.get<PlaylistResponse>(`/playlist?${params.toString()}`);

//             if (response.data.success) {
//                 const { data, pagination } = response.data;

//                 set(state => ({
//                     playlists: page === 1 ? data : [...state.playlists, ...data],
//                     currentPage: pagination.page,
//                     totalPages: pagination.totalPages,
//                     hasNextPage: pagination.hasNextPage,
//                     isLoading: false
//                 }));
//             } else {
//                 throw new Error('Failed to fetch playlists');
//             }
//         } catch (error: any) {
//             console.error('Error fetching playlists:', error);
//             set({
//                 error: error.message || 'Failed to load playlists',
//                 isLoading: false
//             });
//         }
//     },

//     fetchCategoriesWithPlaylists: async () => {
//         try {
//             set({ isCategoriesLoading: true, error: null });

//             console.log('Fetching categories with playlists...');

//             const response = await api.get('/playlist/categories');

//             if (response.data.success) {
//                 console.log('Categories response:', response.data.data);
//                 set({
//                     categories: response.data.data,
//                     isCategoriesLoading: false
//                 });
//             } else {
//                 throw new Error('Failed to fetch categories');
//             }
//         } catch (error: any) {
//             console.error('Error fetching categories:', error);
//             set({
//                 error: error.message || 'Failed to load categories',
//                 isCategoriesLoading: false
//             });
//         }
//     },

//     createPlaylist: async (data: CreatePlaylistRequest) => {
//         try {
//             set({ isCreating: true, error: null });

//             const response = await api.post('/playlist', data);

//             if (response.data.success) {
//                 const newPlaylist = response.data.data;

//                 // Add to the beginning of the playlists array
//                 set(state => ({
//                     playlists: [newPlaylist, ...state.playlists],
//                     isCreating: false
//                 }));

//                 // Refresh categories to include the new playlist
//                 get().fetchCategoriesWithPlaylists();

//                 return newPlaylist;
//             } else {
//                 throw new Error(response.data.error || 'Failed to create playlist');
//             }
//         } catch (error: any) {
//             console.error('Error creating playlist:', error);
//             set({
//                 error: error.message || 'Failed to create playlist',
//                 isCreating: false
//             });
//             return null;
//         }
//     },

//     setActiveCategory: (categoryId: string | null) => {
//         set({ activeCategory: categoryId });
//         // Reset and fetch with new category
//         get().resetPagination();
//         get().fetchPlaylists(1, categoryId || undefined, get().searchQuery || undefined);
//     },

//     setSearchQuery: (query: string) => {
//         set({ searchQuery: query });
//         // Reset and fetch with new search
//         get().resetPagination();
//         get().fetchPlaylists(1, get().activeCategory || undefined, query || undefined);
//     },

//     clearError: () => set({ error: null }),

//     resetPagination: () => set({
//         playlists: [],
//         currentPage: 1,
//         totalPages: 1,
//         hasNextPage: false
//     })
// }));

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';

// Cache keys
const CACHE_KEYS = {
    CATEGORIES: 'playlist_categories',
    PLAYLISTS: 'playlists_cache'
};

export interface PlaylistCategory {
    id: string;
    name: string;
    description: string | null;
    isPublic: boolean;
    playlists: CategoryPlaylist[];
}

export interface CategoryPlaylist {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    trackCount: number;
    isPublic: boolean;
    isOwner: boolean;
    categoryId: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
}

export interface PlaylistOwner {
    id: string;
    name: string;
    email: string;
}

export interface PlaylistTrack {
    id: string;
    title: string;
    description: string | null;
    duration: number;
    intention: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
    order: number;
}

export interface Playlist {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    isPublic: boolean;
    isOwner: boolean;
    categoryId: string | null;
    owner: PlaylistOwner | null;
    category: {
        id: string;
        name: string;
    } | null;
    contentCount: number;
    tracks: PlaylistTrack[];
    createdAt: string;
    updatedAt: string;
}

export interface PlaylistResponse {
    success: boolean;
    data: Playlist[];
    pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface CreatePlaylistRequest {
    name: string;
    description?: string;
    categoryId?: string;
    imageUrl?: string;
}

interface PlaylistState {
    // Categories with playlists
    categories: PlaylistCategory[];

    // All playlists (from main endpoint)
    playlists: Playlist[];

    // Loading states
    isLoading: boolean;
    isCategoriesLoading: boolean;
    isCreating: boolean;

    // Error handling
    error: string | null;

    // Pagination for main playlists
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;

    // Filters and search
    activeCategory: string | null;
    searchQuery: string;

    // Cache management
    lastCacheUpdate: number | null;

    // Actions
    fetchPlaylists: (page?: number, categoryId?: string, search?: string) => Promise<void>;
    fetchCategoriesWithPlaylists: (useCache?: boolean) => Promise<void>;
    createPlaylist: (data: CreatePlaylistRequest) => Promise<Playlist | null>;
    setActiveCategory: (categoryId: string | null) => void;
    setSearchQuery: (query: string) => void;
    clearError: () => void;
    resetPagination: () => void;
    clearCache: () => Promise<void>;
}

// Helper functions
const cacheCategories = async (categories: PlaylistCategory[]) => {
    try {
        await AsyncStorage.setItem(
            CACHE_KEYS.CATEGORIES,
            JSON.stringify({
                data: categories,
                timestamp: Date.now()
            })
        );
    } catch (error) {
        console.error('Failed to cache categories:', error);
    }
};

const loadCachedCategories = async (): Promise<PlaylistCategory[]> => {
    try {
        const cached = await AsyncStorage.getItem(CACHE_KEYS.CATEGORIES);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            // Use cache if less than 1 hour old
            if (Date.now() - timestamp < 3600000) {
                return data;
            }
        }
    } catch (error) {
        console.error('Failed to load cached categories:', error);
    }
    return [];
};

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
    categories: [],
    playlists: [],
    isLoading: false,
    isCategoriesLoading: false,
    isCreating: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    activeCategory: null,
    searchQuery: '',
    lastCacheUpdate: null,

    fetchPlaylists: async (page = 1, categoryId?: string, search?: string) => {
        try {
            set({ isLoading: true, error: null });

            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20'
            });

            if (categoryId) params.append('categoryId', categoryId);
            if (search) params.append('search', search);

            console.log('Fetching playlists with params:', params.toString());

            const response = await api.get<PlaylistResponse>(`/playlist?${params.toString()}`);

            if (response.data.success) {
                const { data, pagination } = response.data;

                set(state => ({
                    playlists: page === 1 ? data : [...state.playlists, ...data],
                    currentPage: pagination.page,
                    totalPages: pagination.totalPages,
                    hasNextPage: pagination.hasNextPage,
                    isLoading: false
                }));
            } else {
                throw new Error('Failed to fetch playlists');
            }
        } catch (error: any) {
            console.error('Error fetching playlists:', error);
            set({
                error: error.message || 'Failed to load playlists',
                isLoading: false
            });
        }
    },

    fetchCategoriesWithPlaylists: async (useCache = true) => {
        try {
            set({ isCategoriesLoading: true, error: null });

            // Try to load from cache first
            if (useCache) {
                const cachedCategories = await loadCachedCategories();
                if (cachedCategories.length > 0) {
                    console.log('Using cached categories:', cachedCategories.length);
                    set({
                        categories: cachedCategories,
                        isCategoriesLoading: false,
                        lastCacheUpdate: Date.now()
                    });
                    return;
                }
            }

            console.log('Fetching categories from API...');

            const response = await api.get('/playlist/categories');

            if (response.data.success) {
                console.log('Categories response:', response.data.data.length);

                // Cache the data
                await cacheCategories(response.data.data);

                set({
                    categories: response.data.data,
                    isCategoriesLoading: false,
                    lastCacheUpdate: Date.now()
                });
            } else {
                throw new Error(response.data.error || 'Failed to fetch categories');
            }
        } catch (error: any) {
            console.error('Error fetching categories:', error);
            set({
                error: error.message || 'Failed to load categories',
                isCategoriesLoading: false
            });
        }
    },

    createPlaylist: async (data: CreatePlaylistRequest) => {
        try {
            set({ isCreating: true, error: null });

            const response = await api.post('/playlist', data);

            if (response.data.success) {
                const newPlaylist = response.data.data;

                set(state => ({
                    playlists: [newPlaylist, ...state.playlists],
                    isCreating: false
                }));

                // Refresh categories to include the new playlist
                get().fetchCategoriesWithPlaylists(false); // Don't use cache

                return newPlaylist;
            } else {
                throw new Error(response.data.error || 'Failed to create playlist');
            }
        } catch (error: any) {
            console.error('Error creating playlist:', error);
            set({
                error: error.message || 'Failed to create playlist',
                isCreating: false
            });
            return null;
        }
    },

    setActiveCategory: (categoryId: string | null) => {
        set({ activeCategory: categoryId });
        get().resetPagination();
        get().fetchPlaylists(1, categoryId || undefined, get().searchQuery || undefined);
    },

    setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().resetPagination();
        get().fetchPlaylists(1, get().activeCategory || undefined, query || undefined);
    },

    clearError: () => set({ error: null }),

    resetPagination: () => set({
        playlists: [],
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false
    }),

    clearCache: async () => {
        try {
            await AsyncStorage.removeItem(CACHE_KEYS.CATEGORIES);
            await AsyncStorage.removeItem(CACHE_KEYS.PLAYLISTS);
            set({ lastCacheUpdate: null });
        } catch (error) {
            console.error('Failed to clear cache:', error);
        }
    }
}));
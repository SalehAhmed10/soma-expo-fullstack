import { Animated, ImageSourcePropType } from "react-native";

interface SessionInterface {
  id: string;
  title: string;
  description: string;
  length: string;
  date: string;
  live: boolean;
  categoryId: string;
  subCategoryId: string; // Add this field
  image: any;
}

export interface FeaturedProgramType {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export interface PaginationPropsType {
  data: FeaturedProgramType[];
  scrollX: Animated.Value;
}
export const featuredProgramsData: FeaturedProgramType[] = [
  {
    id: "1",
    title: "Energy Morning",
    description: "Start your morning with yoga energy",
    image: require("@/assets/images/soma/home-features-1.png"),
  },
  {
    id: "2",
    title: "Energy Morning",
    description: "Start your morning with yoga energy",
    image: require("@/assets/images/soma/home-features-1.png"),
  },
  {
    id: "3",
    title: "Energy Morning",
    description: "Start your morning with yoga energy",
    image: require("@/assets/images/soma/home-features-1.png"),
  },
];

// Sound Profile type and data
interface SoundProfile {
  id: number;
  name: string;
  icon: any; // Consider using proper image type
}

const soundProfiles: SoundProfile[] = [
  {
    id: 1,
    name: "Listen",
    icon: require("@/assets/images/soma/mymatimages/icons/profilelisten.png"),
  },
  {
    id: 2,
    name: "Move",
    icon: require("@/assets/images/soma/mymatimages/icons/profilemove.png"),
  },
  {
    id: 3,
    name: "Sit",
    icon: require("@/assets/images/soma/mymatimages/icons/profilesit.png"),
  },
  {
    id: 4,
    name: "Lay Down",
    icon: require("@/assets/images/soma/mymatimages/icons/profilelaydown.png"),
  },
  {
    id: 5,
    name: "Custom",
    icon: require("@/assets/images/soma/mymatimages/icons/profilecustom.png"),
  },
];

// const sessionsData: SessionInterface[] = [
//   {
//     id: "1",
//     title: "Morning Yoga Flow",
//     description: "Start your day with energizing yoga sequences",
//     length: "45mins",
//     date: "2024-03-20",
//     live: true,
//     categoryId: "1", // For Movement category
//     image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
//   },
//   {
//     id: "2",
//     title: "Mindful Meditation",
//     description: "Guided meditation for stress relief",
//     length: "30mins",
//     date: "2024-03-21",
//     live: false,
//     categoryId: "2", // For Meditation category
//     image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
//   },
//   {
//     id: "3",
//     title: "Evening Sound Bath",
//     description: "Relax with healing sound frequencies",
//     length: "1hr",
//     date: "2024-03-22",
//     live: true,
//     categoryId: "3", // For Sound Healing category
//     image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
//   },
//   {
//     id: "4",
//     title: "Core Strength",
//     description: "Build core strength and stability",
//     length: "45mins",
//     date: "2024-03-23",
//     live: false,
//     categoryId: "1", // For Movement category
//     image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
//   },
//   {
//     id: "5",
//     title: "Breathwork",
//     description: "Breathwork for emotional release",
//     length: "30mins",
//     date: "2024-03-24",
//     live: true,
//     categoryId: "4", // For Breathwork category
//     image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
//   },
//   {
//     id: "6",
//     title: "Restorative Yoga",
//     description: "Relax and restore with gentle yoga",
//     length: "1hr",
//     date: "2024-03-25",
//     live: false,
//     categoryId: "5", // For Rest & Relax category
//     image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
//   },
//   {
//     id: "7",
//     title: "Strength & Tone",
//     description: "Tone and strengthen your body",
//     length: "45mins",
//     date: "2024-03-26",
//     live: true,

//     categoryId: "6", // For Movement category
//     image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
//   },
// ];

// Add Hatha Yoga sessions
const sessionsData: SessionInterface[] = [
  {
    id: "hatha-1",
    title: "Beginner Hatha Yoga",
    description: "Perfect introduction to foundational yoga poses",
    length: "45mins",
    date: "2024-03-20",
    live: true,
    categoryId: "1",
    subCategoryId: "yoga-1", // Hatha Yoga
    image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
  },
  {
    id: "hatha-2",
    title: "Morning Hatha Practice",
    description: "Energizing morning sequence with traditional poses",
    length: "60mins",
    date: "2024-03-21",
    live: false,
    categoryId: "1",
    subCategoryId: "yoga-1",
    image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
  },
  {
    id: "hatha-3",
    title: "Deep Stretch Hatha",
    description: "Focus on flexibility and alignment",
    length: "50mins",
    date: "2024-03-22",
    live: true,
    categoryId: "1",
    subCategoryId: "yoga-1",
    image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
  },

  // meditation / minfulness
  {
    id: "mindfulness-1",
    title: "Mindfulness for Beginners",
    description: "Introduction to mindfulness meditation",
    length: "30mins",
    date: "2024-03-23",
    live: false,
    categoryId: "2",
    subCategoryId: "meditation-1",
    image: require("@/assets/images/soma/sessionsimages/sessionplaceholder.png"),
  },
];

// Category Type and Data
interface CategoryInterface {
  id: string;
  title: string;
  image: any;
}

const categories: CategoryInterface[] = [
  {
    id: "1",
    title: "Yoga",
    image: require("@/assets/images/soma/categoriesimages/yoga.png"),
  },
  {
    id: "2",
    title: "Meditation",
    image: require("@/assets/images/soma/categoriesimages/meditation.png"),
  },
  {
    id: "3",
    title: "Soundbath",
    image: require("@/assets/images/soma/categoriesimages/soundbath.png"),
  },
  {
    id: "4",
    title: "Breathwork",
    image: require("@/assets/images/soma/categoriesimages/breathwork.png"),
  },
  {
    id: "5",
    title: "Rest & Relax",
    image: require("@/assets/images/soma/categoriesimages/restandrelax.png"),
  },
  {
    id: "6",
    title: "Tone , Strengthen & Energise",
    image: require("@/assets/images/soma/categoriesimages/Tone-strengthen-energise.png"),
  },
];

interface SubCategory {
  id: string;
  parentId: string; // matches category.id
  title: string;
  image: any;
}

const subCategories: SubCategory[] = [
  {
    id: "yoga-1",
    parentId: "1", // Yoga parent category
    title: "Hatha Yoga",
    image: require("@/assets/images/soma/sessionsimages/subcategory/hathayoga.png"),
  },
  {
    id: "yoga-2",
    parentId: "1",
    title: "Yoga Flow",
    image: require("@/assets/images/soma/sessionsimages/subcategory/yogaflow.png"),
  },
  {
    id: "yoga-3",
    parentId: "1",
    title: "Yoga therapy ",
    image: require("@/assets/images/soma/sessionsimages/subcategory/yogatherapy .png"),
  },
  {
    id: "yoga-4",
    parentId: "1",
    title: "Yin Yoga",
    image: require("@/assets/images/soma/sessionsimages/subcategory/somaticmovement.png"),
  },
  {
    id: "yoga-5",
    parentId: "1",
    title: "Yin Yoga",
    image: require("@/assets/images/soma/sessionsimages/subcategory/somaticmovement.png"),
  },

  // Subcategories for Meditation
  {
    id: "meditation-1",
    parentId: "2",
    title: "Mindfulness",
    image: require("@/assets/images/soma/sessionsimages/subcategory/somaticmovement.png"),
  },
  {
    id: "meditation-2",
    parentId: "2",
    title: "Guided Meditation",
    image: require("@/assets/images/soma/sessionsimages/subcategory/somaticmovement.png"),
  },
  {
    id: "meditation-3",
    parentId: "2",
    title: "Breath Awareness",
    image: require("@/assets/images/soma/sessionsimages/subcategory/yogatherapy .png"),
  },
  {
    id: "meditation-4",
    parentId: "2",
    title: "Body Scan",
    image: require("@/assets/images/soma/sessionsimages/subcategory/yogatherapy .png"),
  },
  {
    id: "meditation-5",
    parentId: "2",
    title: "Loving Kindness",
    image: require("@/assets/images/soma/sessionsimages/subcategory/hathayoga.png"),
  },
];

export { sessionsData, soundProfiles, categories, subCategories };


interface PlaylistItem {
  id: number;
  name: string;
  description?: string;
  image?: any;
}
interface Category {
  id: number;
  name: string;
  playlists: PlaylistItem[];
}

export const playlistCategories: Category[] = [
  {
    id: 1,
    name: "Soma Sounds",
    playlists: [
      { id: 1, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
      { id: 2, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
      { id: 3, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
      { id: 4, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },

    ]
  },
  {
    id: 2,
    name: "Exclusive Release",
    // randomize 
    playlists: [

      { id: 1, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
      { id: 2, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
      { id: 3, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
      { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
    ]
  },

  {
    id: 3,
    name: "Soma Playlists",
    // randomize change order of list 
    playlists: [
      { id: 1, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
      { id: 2, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
      { id: 3, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
      { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
    ]

  },
  {
    id: 4,
    name: "Morning Playlists",
    // randomize change order of list
    playlists: [
      { id: 1, name: "Sleep", description: "Late night tunes", image: require('@/assets/images/soma/playlistimages/playlisttabcontent3.png') },
      { id: 2, name: "Focus", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
      { id: 3, name: "Relax", description: "Start your day right", image: require('@/assets/images/soma/playlistimages/playlisttabcontent1.png') },
      { id: 4, name: "energise", description: "Relax and unwind", image: require('@/assets/images/soma/playlistimages/playlisttabcontent2.png') },
    ]

  }


];
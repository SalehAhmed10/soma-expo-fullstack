import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, ViewStyle } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

// Define proper TypeScript interface with more specific width types
interface SkeletonItemProps {
    width?: number | "auto" | `${number}%`;  // Only allow valid ViewStyle width values
    height?: number;
    borderRadius?: number;
    style?: ViewStyle;
    backgroundColor?: string;
}

// Base skeleton component with pulse animation
const SkeletonItem = ({
    width: itemWidth = "100%", // Default using proper format
    height = 20,
    borderRadius = 4,
    style = {},
    backgroundColor = 'rgba(49, 23, 12, 0.1)'
}: SkeletonItemProps) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.6,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );

        pulse.start();

        return () => {
            pulse.stop();
        };
    }, [opacity]);

    // No need for complex handling since we've properly typed itemWidth now
    return (
        <Animated.View
            style={[
                {
                    width: itemWidth,
                    height,
                    borderRadius,
                    backgroundColor,
                    opacity,
                },
                style,
            ]}
        />
    );
};

// Export the SkeletonItem component so it can be used elsewhere
export { SkeletonItem };

// Fix CategoryCardSkeleton typing
export const CategoryCardSkeleton = ({ size }: { size: number }) => (
    <View style={{ marginHorizontal: 6, marginBottom: 12 }}>
        <SkeletonItem height={size * 1.15} width={size} borderRadius={12} />
    </View>
);

// Featured session card skeleton
export const FeaturedSessionSkeleton = () => (
    <View style={{ marginBottom: 16 }}>
        <SkeletonItem height={200} width={CARD_WIDTH} borderRadius={12} />
    </View>
);

// FeaturedSessions list skeleton with pagination indicator
export const FeaturedSessionsSkeleton = () => (
    <View>
        <FeaturedSessionSkeleton />
        <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {[...Array(3)].map((_, i) => (
                    <SkeletonItem
                        key={i}
                        width={12}
                        height={12}
                        borderRadius={6}
                        style={{ marginHorizontal: 4 }}
                    />
                ))}
            </View>
        </View>
    </View>
);

// Category grid with multiple skeletons
export const CategoryGridSkeleton = () => {
    const screenPaddingHorizontal = 48;
    const availableWidth = width - screenPaddingHorizontal;
    const ITEM_GAP = 12;
    const NUM_COLUMNS = 3;
    const itemSize = (availableWidth - (NUM_COLUMNS - 1) * ITEM_GAP) / NUM_COLUMNS;

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 }}>
            {[...Array(6)].map((_, index) => (
                <CategoryCardSkeleton key={index} size={itemSize} />
            ))}
        </View>
    );
};

// Playlist item skeleton
export const PlaylistItemSkeleton = () => (
    <View style={{ marginBottom: 16 }}>
        <SkeletonItem height={91} width="100%" borderRadius={9} />
    </View>
);

// Multiple playlist items skeleton
export const PlaylistsSkeleton = () => (
    <View style={{ marginTop: 16 }}>
        {[...Array(3)].map((_, index) => (
            <PlaylistItemSkeleton key={index} />
        ))}
    </View>
);

// Section header skeleton (title + optional "See all" button)
export const SectionHeaderSkeleton = ({ hasAction = true }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <SkeletonItem width={120} height={24} borderRadius={4} />
        {hasAction && <SkeletonItem width={60} height={18} borderRadius={4} />}
    </View>
);

// Home screen header with avatar skeleton
export const HomeHeaderSkeleton = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 48 }}>
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SkeletonItem width={50} height={18} borderRadius={4} style={{ marginRight: 4 }} />
                <SkeletonItem width={80} height={24} borderRadius={4} />
            </View>
        </View>
        <SkeletonItem width={48} height={48} borderRadius={24} />
    </View>
);

// Complete home screen skeleton
export const HomeScreenSkeleton = () => (
    <View style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
        <HomeHeaderSkeleton />

        <View style={{ marginVertical: 24, paddingHorizontal: 24 }}>
            <SectionHeaderSkeleton hasAction={false} />
            <View style={{ height: 16 }} />
            <FeaturedSessionsSkeleton />
        </View>

        <View style={{ marginVertical: 16, paddingHorizontal: 24 }}>
            <CategoryGridSkeleton />
        </View>

        <View style={{ marginVertical: 16, paddingHorizontal: 24 }}>
            <SectionHeaderSkeleton />
            <PlaylistsSkeleton />
        </View>
    </View>
);
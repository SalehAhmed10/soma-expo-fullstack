import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';

interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    role: string;
    isVerified: boolean;
    profileImage: string | null;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
}

const UserProfileTest = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                console.log("Token from AsyncStorage:", token); // Add this line
                if (!token) {
                    setError('No token found. Please login.');
                    return;
                }

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await api.get('/user/profile');

                if (response.data.success) {
                    setProfile(response.data.data);
                } else {
                    setError(response.data.error || 'Failed to fetch profile');
                }
            } catch (e: any) {
                setError('An unexpected error occurred.');
                console.error("Error fetching user profile:", e);
            }
        };

        fetchUserProfile();
    }, []);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (!profile) {
        return (
            <View style={styles.container}>
                <Text>Loading user profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>User Profile:</Text>
            <Text>ID: {profile.id}</Text>
            <Text>Full Name: {profile.fullName}</Text>
            <Text>Email: {profile.email}</Text>
            {/* Display other profile information as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
    },
});

export default UserProfileTest;
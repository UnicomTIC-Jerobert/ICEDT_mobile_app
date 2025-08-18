import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Theme'; // Adjust path if needed

// Mock icons for now
const HomeIcon = () => <Text style={styles.icon}>🏠</Text>;
const ProfileIcon = () => <Text style={styles.icon}>👤</Text>;
const SettingsIcon = () => <Text style={styles.icon}>⚙️</Text>;

const AppLayout = () => {
    return (
        <View style={styles.container}>
            {/* --- Side Navigation Rail --- */}
            <View style={styles.sidebar}>
                <Link href="/levels" asChild>
                    <TouchableOpacity style={styles.navButton}>
                        <HomeIcon />
                        <Text style={styles.navText}>Levels</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.navButton}>
                    <ProfileIcon />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <SettingsIcon />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>
            </View>

            {/* --- Main Content Area --- */}
            <View style={styles.content}>
                <Stack screenOptions={{ headerShown: false }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', // Main axis is horizontal
        backgroundColor: COLORS.white,
    },
    sidebar: {
        width: '18%', // Adjust width as needed
        maxWidth: 120,
        backgroundColor: COLORS.primaryGreen,
        paddingTop: 40,
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    navButton: {
        alignItems: 'center',
        paddingVertical: 15,
        width: '100%',
    },
    icon: {
        fontSize: 30,
    },
    navText: {
        color: COLORS.textLight,
        marginTop: 4,
    },
});

export default AppLayout;
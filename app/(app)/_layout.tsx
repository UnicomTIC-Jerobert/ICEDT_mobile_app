import { Link, Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Theme';

// --- Menu Icons ---
const HomeIcon = () => <Text style={styles.icon}>🏠</Text>;
const ProfileIcon = () => <Text style={styles.icon}>👤</Text>;
const SettingsIcon = () => <Text style={styles.icon}>⚙️</Text>;
const HamburgerIcon = () => <Text style={styles.hamburgerIcon}>☰</Text>;
const CloseIcon = () => <Text style={styles.closeIcon}>✕</Text>;

// --- Constants ---
const MENU_WIDTH = 180;
const ANIMATION_DURATION = 250;

const AppLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuAnimation = useRef(new Animated.Value(-MENU_WIDTH)).current;

    // Toggles the menu state and runs the animation
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close the menu. Useful for navigation links.
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // When isMenuOpen changes, trigger the slide animation
    useEffect(() => {
        Animated.timing(menuAnimation, {
            toValue: isMenuOpen ? 0 : -MENU_WIDTH,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
    }, [isMenuOpen, menuAnimation]);

    const menuTransformStyle = {
        transform: [{ translateX: menuAnimation }],
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Stack screenOptions={{ headerShown: false }} />
            </View>

            {isMenuOpen && (
                <Pressable
                    style={styles.overlay}
                    onPress={toggleMenu}
                />
            )}

            <Animated.View style={[styles.drawer, menuTransformStyle]}>
                <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
                    <CloseIcon />
                </TouchableOpacity>

                <Link href="/levels" asChild onPress={closeMenu}>
                    <TouchableOpacity style={styles.navButton}>
                        <HomeIcon />
                        <Text style={styles.navText}>Levels</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.navButton} onPress={closeMenu}>
                    <ProfileIcon />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={closeMenu}>
                    <SettingsIcon />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
                {!isMenuOpen && <HamburgerIcon />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
    },
    hamburgerButton: {
        position: 'absolute',
        top: 25,
        left: 15,
        zIndex: 100,
        padding: 10,
    },
    hamburgerIcon: {
        fontSize: 30,
        color: COLORS.textDark,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 20,
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: MENU_WIDTH,
        backgroundColor: COLORS.primaryGreen,
        paddingTop: 80,
        zIndex: 30,
    },
    closeButton: {
        position: 'absolute',
        top: 25,
        right: 15,
        padding: 10,
    },
    closeIcon: {
        fontSize: 24,
        color: COLORS.white,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
    },
    icon: {
        fontSize: 24,
        color: COLORS.white,
    },
    navText: {
        color: COLORS.textLight,
        fontSize: 18,
        marginLeft: 15,
    },
});

export default AppLayout;
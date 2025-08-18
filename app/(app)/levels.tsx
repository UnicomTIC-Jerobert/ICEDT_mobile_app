import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as levelApi from '../../api/levelApi';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';
import { Level } from '../../types/level';

const LevelsScreen = () => {
    const [levels, setLevels] = useState<Level[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const data = await levelApi.getAll();
                setLevels(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLevels();
    }, []);

    const renderLevelItem = ({ item }: { item: Level }) => (
        <Link href={`/lessons?levelId=${item.levelId}&levelName=${item.levelName}`} asChild>
            <TouchableOpacity style={styles.levelCard}>
                <Image
                    source={{ uri: item.coverImageUrl || 'https://via.placeholder.com/150' }}
                    style={styles.levelImage}
                />
                <Text style={styles.levelName}>{item.levelName}</Text>
            </TouchableOpacity>
        </Link>
    );

    if (isLoading) {
        return <ActivityIndicator size="large" color={COLORS.primaryGreen} style={styles.centered} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>வணக்கம்!</Text>
            <Text style={styles.subHeader}>பயிற்சிக்கு தயாராகுங்கள்</Text>

            <FlatList
                data={levels}
                renderItem={renderLevelItem}
                keyExtractor={(item) => item.levelId.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightYellow,
        paddingTop: 50,
        paddingHorizontal: 80,
        paddingBottom: SIZES.padding,
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        ...FONTS.h1,
        color: COLORS.textDark,
    },
    subHeader: {
        ...FONTS.h3,
        color: COLORS.textMedium,
        marginBottom: SIZES.padding,
    },
    listContainer: {
        alignItems: 'center',
    },
    levelCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.base * 2,
        margin: SIZES.base,
        alignItems: 'center',
        width: SIZES.width / 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    levelImage: {
        width: 120,
        height: 120,
        borderRadius: SIZES.radius,
        marginBottom: SIZES.base,
    },
    levelName: {
        ...FONTS.h3,
        color: COLORS.textDark,
        textAlign: 'center',
    },
});

export default LevelsScreen;
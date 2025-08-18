import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as lessonApi from '../../api/lessonApi';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';
import { Lesson } from '../../types/lesson';

const LessonsScreen = () => {
    const { levelId, levelName } = useLocalSearchParams<{ levelId: string; levelName: string }>();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!levelId) return;

        const fetchLessons = async () => {
            try {
                const data = await lessonApi.getLessonsByLevelId(levelId);
                setLessons(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLessons();
    }, [levelId]);

    const renderLessonItem = ({ item, index }: { item: Lesson, index: number }) => (
        // Wrap the TouchableOpacity with a Link component
        <Link href={`/lessonDetails?lessonId=${item.lessonId}`} asChild>
            <TouchableOpacity style={styles.lessonRow}>
                <View style={styles.iconContainer}>
                    <Image source={{ uri: item.lessonImageUrl || `https://picsum.photos/seed/${item.lessonId}/100` }} style={styles.lessonIcon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.lessonIndex}>{index + 1}</Text>
                    <Text style={styles.lessonName}>{item.lessonName}</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>▶</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    if (isLoading) {
        return <ActivityIndicator size="large" color={COLORS.primaryGreen} style={styles.centered} />;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: levelName || 'பாடங்கள்' }} />
            <FlatList
                data={lessons}
                renderItem={renderLessonItem}
                keyExtractor={(item) => item.lessonId.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGreen,
        paddingTop: 120, 
        paddingHorizontal: SIZES.padding,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lessonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
        borderRadius: SIZES.radius * 4,
        padding: SIZES.base,
        elevation: 2,
        shadowColor: '#000',
    },
    iconContainer: {
         backgroundColor: '#fff',
         borderRadius: 50,
         padding: 5,
    },
    lessonIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
     textContainer: {
        flex: 1,
        marginLeft: SIZES.base,
        flexDirection: 'row',
        alignItems: 'center'
    },
    lessonIndex: {
        ...FONTS.h2,
        color: COLORS.primaryOrange,
        marginHorizontal: SIZES.padding / 2,
    },
    lessonName: {
        ...FONTS.h3,
        color: COLORS.textDark,
    },
    arrowContainer: {
        paddingHorizontal: SIZES.padding,
    },
    arrow: {
        fontSize: 24,
        color: COLORS.primaryGreen,
    }
});

export default LessonsScreen;
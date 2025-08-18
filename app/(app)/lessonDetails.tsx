import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as lessonApi from '../../api/lessonApi';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';
import { Lesson } from '../../types/lesson';

const LessonDetailsScreen = () => {
    const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!lessonId) return;

        const fetchLesson = async () => {
            try {
                const data = await lessonApi.getLessonById(lessonId);
                setLesson(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLesson();
    }, [lessonId]);

    const handleOptionPress = (option: string, content?: string) => {
        // For now, we'll just show an alert.
        // Later, you can navigate to a new screen or open a modal here.
        Alert.alert(option, content || "No content available yet.");
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color={COLORS.primaryGreen} style={styles.centered} />;
    }

    if (!lesson) {
        return <View style={styles.centered}><Text>Lesson not found.</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: lesson.lessonName || 'Lesson Details' }} />
            <Text style={styles.header}>{lesson.lessonName}</Text>

            <View style={styles.optionsGrid}>
                {lesson.learnContent && (
                    <TouchableOpacity
                        style={[styles.optionButton, { backgroundColor: COLORS.buttonBlue }]}
                        onPress={() => handleOptionPress('Learn', lesson.learnContent)}
                    >
                        <Text style={styles.optionText}>Learn</Text>
                    </TouchableOpacity>
                )}

                {lesson.exerciseContent && (
                    <TouchableOpacity
                        style={[styles.optionButton, { backgroundColor: COLORS.primaryOrange }]}
                        onPress={() => handleOptionPress('Exercise', lesson.exerciseContent)}
                    >
                        <Text style={styles.optionText}>Exercise</Text>
                    </TouchableOpacity>
                )}

                {lesson.soundUrl && (
                    <TouchableOpacity
                        style={[styles.optionButton, { backgroundColor: COLORS.primaryGreen }]}
                        onPress={() => handleOptionPress('Sound', lesson.soundUrl)}
                    >
                        <Text style={styles.optionText}>Sound</Text>
                    </TouchableOpacity>
                )}

                {lesson.videoUrl && (
                    <TouchableOpacity
                        style={[styles.optionButton, { backgroundColor: COLORS.buttonRed }]}
                        onPress={() => handleOptionPress('Video', lesson.videoUrl)}
                    >
                        <Text style={styles.optionText}>Video</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightYellow,
        padding: SIZES.padding,
        paddingTop: 40, 
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        ...FONTS.h1,
        color: COLORS.textDark,
        textAlign: 'center',
        marginBottom: SIZES.padding * 2,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionButton: {
        width: SIZES.width * 0.2,
        height: SIZES.width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius * 4,
        margin: SIZES.base,
        elevation: 5,
        shadowColor: '#000',
    },
    optionText: {
        ...FONTS.h2,
        color: COLORS.white,
    }
});

export default LessonDetailsScreen;
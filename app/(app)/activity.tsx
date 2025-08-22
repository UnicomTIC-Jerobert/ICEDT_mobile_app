import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as activityApi from '../../api/activityApi';
import ActivityRenderer from '../../components/activity-types/ActivityRenderer'; // Import the new renderer
import { COLORS, FONTS, SIZES } from '../../constants/Theme';
import { Activity, ActivityContent } from '../../types/activity';

const ActivityScreen = () => {
    const { activityId } = useLocalSearchParams<{ activityId: string }>();
    const [activity, setActivity] = useState<Activity | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // --- NEW: State for managing exercises ---
    const [exercises, setExercises] = useState<ActivityContent[]>([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    useEffect(() => {
        if (!activityId) return;
        const fetchActivityData = async () => {
            setIsLoading(true);
            const data = await activityApi.getActivityById(activityId);
            setActivity(data);

            if (data) {
                // This logic mirrors your web version:
                // Check if the main content is an array (multiple exercises) or a single object.
                const content = data.content;
                const exerciseList = Array.isArray(content) ? content : [content];
                setExercises(exerciseList);
            }
            
            setCurrentExerciseIndex(0); // Always start at the first exercise
            setIsLoading(false);
        };
        fetchActivityData();
    }, [activityId]);

    // When the user navigates between exercises, reset internal component state if needed
    useEffect(() => {
        // This effect can be used if child components need a key change to re-mount
    }, [currentExerciseIndex]);

    const currentExercise = exercises[currentExerciseIndex];
    const totalExercises = exercises.length;

    const handleNextExercise = () => {
        if (currentExerciseIndex < totalExercises - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
        }
    };

    const handlePreviousExercise = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(prev => prev - 1);
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color={COLORS.primaryGreen} style={styles.centered} />;
    }

    if (!activity || !currentExercise) {
        return <View style={styles.centered}><Text style={styles.errorText}>Activity data could not be loaded.</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: activity.title || 'Activity' }} />
            
            {/* Header Area */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{activity.title}</Text>
                {totalExercises > 1 && (
                    <Text style={styles.progressText}>Exercise {currentExerciseIndex + 1} of {totalExercises}</Text>
                )}
            </View>

            {/* Content Area - Uses the Renderer */}
            <View style={styles.activityContent}>
                <ActivityRenderer exerciseContent={currentExercise} />
            </View>

            {/* Footer Area - Outer Navigation for Exercises */}
            {totalExercises > 1 && (
                <View style={styles.navigationBar}>
                    <TouchableOpacity onPress={handlePreviousExercise} disabled={currentExerciseIndex === 0}>
                        <Text style={[styles.navButtonText, currentExerciseIndex === 0 && styles.disabledButtonText]}>Prev Exercise</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNextExercise} disabled={currentExerciseIndex === totalExercises - 1}>
                        <Text style={[styles.navButtonText, currentExerciseIndex === totalExercises - 1 && styles.disabledButtonText]}>Next Exercise</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGreen,
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    headerTitle: { ...FONTS.h3, color: COLORS.textDark },
    activityContent: { flex: 1 },
    errorText: { ...FONTS.h3, color: COLORS.lightGreen, textAlign: 'center' },
    navigationBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SIZES.padding * 2, paddingVertical: SIZES.padding, borderTopWidth: 1, borderTopColor: COLORS.lightGreen, backgroundColor: COLORS.white, },
    navButtonText: { ...FONTS.h3, color: COLORS.buttonBlue },
    disabledButtonText: { color: COLORS.lightGreen, opacity: 0.5 },
    progressText: { ...FONTS.body2, color: COLORS.lightGreen },
});

export default ActivityScreen;
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as activityApi from '../../api/activityApi';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';
import { Activity } from '../../types/activity';

const LessonActivitiesScreen = () => {
    // --- GETTING THE LESSON ID CONTEXT ---
    const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!lessonId) return;
        console.log(`[LessonActivitiesScreen] Fetching activities for lessonId: ${lessonId}`);
        const fetchActivities = async () => {
            try {
                // --- USING THE NEW API FUNCTION ---
                const data = await activityApi.getActivitiesByLessonId(lessonId);
                setActivities(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchActivities();
    }, [lessonId]);

    const renderActivityItem = ({ item }: { item: Activity }) => (
        // --- PASSING BOTH LESSON AND ACTIVITY ID TO THE HOST ---
        <Link href={`/activity?lessonId=${lessonId}&activityId=${item.id}`} asChild>
            <TouchableOpacity style={styles.activityRow}>
                <View style={styles.textContainer}>
                    <Text style={styles.activityTitle}>{item.title}</Text>
                    <Text style={styles.activityType}>{item.activityType}</Text>
                </View>
                <Text style={styles.arrow}>▶</Text>
            </TouchableOpacity>
        </Link>
    );

    if (isLoading) return <ActivityIndicator size="large" color={COLORS.primaryGreen} style={styles.centered} />;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Activities' }} />
            <FlatList
                data={activities}
                renderItem={renderActivityItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};
// ... (styles are the same as your old allActivities screen)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightGreen, paddingTop: 80 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContainer: { paddingHorizontal: SIZES.padding },
    activityRow: { backgroundColor: COLORS.white, padding: SIZES.padding, borderRadius: SIZES.radius, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.base * 2, elevation: 3, },
    textContainer: { flex: 1 },
    activityTitle: { ...FONTS.h3, color: COLORS.textDark },
    activityType: { ...FONTS.body2, color: COLORS.lightGreen, marginTop: 4 },
    arrow: { fontSize: 22, color: COLORS.primaryGreen },
});

export default LessonActivitiesScreen;
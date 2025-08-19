import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as lessonApi from '../../api/lessonApi';
import MCQActivity from '../../components/activity-types/MCQActivity';
import { COLORS } from '../../constants/Theme';
import { Activity } from '../../types/activityContentTypes';
import { Lesson } from '../../types/lesson';

const ActivityScreen = () => {
    const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

    useEffect(() => {
        if (!lessonId) return;
        const fetchLesson = async () => {
            setIsLoading(true);
            try {
                const data = await lessonApi.getLessonById(lessonId);
                setLesson(data);
                setCurrentActivityIndex(0);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLesson();
    }, [lessonId]);

    const currentActivity: Activity | undefined = lesson?.activities?.[currentActivityIndex];
    const totalActivities = lesson?.activities?.length || 0;

    const handleNext = () => {
        if (currentActivityIndex < totalActivities - 1) {
            setCurrentActivityIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentActivityIndex > 0) {
            setCurrentActivityIndex(prevIndex => prevIndex - 1);
        }
    };

    const renderActivityContent = () => {
        if (!currentActivity) {
            return <Text style={styles.errorText}>No activity found.</Text>;
        }

        // --- THE FIX IS HERE ---
        // We now switch on the 'type' property directly inside the 'content' object.
        switch (currentActivity.content.type) {
            case 'MCQ':
                // Now, inside this block, TypeScript KNOWS that 'currentActivity.content'
                // is of type 'MCQContent', and the error is resolved.
                return (
                    <MCQActivity
                        content={currentActivity.content} // This is now 100% type-safe
                        currentIndex={currentActivityIndex}
                        total={totalActivities}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );

            // You can add other cases here in the future
            // case 'MATCHING':
            //     return <MatchingActivity content={currentActivity.content} ... />;

            default:
                return <Text style={styles.errorText}>Unsupported activity type.</Text>;
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color={COLORS.primaryGreen} style={styles.centered} />;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: lesson?.lessonName || 'Activity' }} />
            {renderActivityContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'red',
    },
});

export default ActivityScreen;
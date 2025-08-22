// import { Link, Stack, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import * as lessonApi from '../../api/lessonApi';
// import { COLORS, FONTS, SIZES } from '../../constants/Theme';
// import { Lesson } from '../../types/lesson';

// const LessonsScreen = () => {
//     const { levelId, levelName } = useLocalSearchParams<{ levelId: string; levelName: string }>();
//     const [lessons, setLessons] = useState<Lesson[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         if (!levelId) return;

//         const fetchLessons = async () => {
//             try {
//                 const data = await lessonApi.getLessonsByLevelId(levelId);
//                 setLessons(data);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchLessons();
//     }, [levelId]);

//     const renderLessonItem = ({ item, index }: { item: Lesson, index: number }) => (
//         // Wrap the TouchableOpacity with a Link component
//         <Link href={`/lessonDetails?lessonId=${item.lessonId}`} asChild>
//             <TouchableOpacity style={styles.lessonRow}>
//                 <View style={styles.iconContainer}>
//                     <Image source={{ uri: item.lessonImageUrl || `https://picsum.photos/seed/${item.lessonId}/100` }} style={styles.lessonIcon} />
//                 </View>
//                 <View style={styles.textContainer}>
//                     <Text style={styles.lessonIndex}>{index + 1}</Text>
//                     <Text style={styles.lessonName}>{item.lessonName}</Text>
//                 </View>
//                 <View style={styles.arrowContainer}>
//                     <Text style={styles.arrow}>▶</Text>
//                 </View>
//             </TouchableOpacity>
//         </Link>
//     );

//     if (isLoading) {
//         return <ActivityIndicator size="large" color={COLORS.primaryGreen} style={styles.centered} />;
//     }

//     return (
//         <View style={styles.container}>
//             <Stack.Screen options={{ title: levelName || 'பாடங்கள்' }} />
//             <FlatList
//                 data={lessons}
//                 renderItem={renderLessonItem}
//                 horizontal={true}
//                 keyExtractor={(item) => item.lessonId.toString()}
//                 contentContainerStyle={styles.listContainer}
//                 showsHorizontalScrollIndicator={false}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.lightGreen,
//         paddingTop: 60,
//         paddingHorizontal: SIZES.padding,
//     },
//     centered: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     lessonRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: COLORS.white,
//         marginRight: SIZES.base * 1.5, // space between cards
//         borderRadius: SIZES.radius * 3,
//         padding: SIZES.base,
//         elevation: 4,
//         shadowColor: '#000',
//         shadowOpacity: 0.2,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//         width: 270,
//     },
//     iconContainer: {
//         backgroundColor: '#fff',
//         borderRadius: 50,
//         padding: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     lessonIcon: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//     },
//     textContainer: {
//         flex: 1,
//         marginLeft: SIZES.base,
//         justifyContent: 'center',
//     },
//     lessonIndex: {
//         ...FONTS.h3,
//         color: COLORS.primaryOrange,
//         marginBottom: 4,
//     },
//     lessonName: {
//         ...FONTS.h1,
//         color: COLORS.textDark,
//     },
//     arrowContainer: {
//         justifyContent: 'center',
//         paddingLeft: SIZES.base,
//     },
//     arrow: {
//         fontSize: 22,
//         color: COLORS.primaryGreen,
//     },
//     listContainer: {
//         paddingLeft: SIZES.base, // start spacing
//         paddingVertical: SIZES.base,
//         paddingBottom: SIZES.padding, // extra bottom padding
//     },
// });


// export default LessonsScreen;

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

    // Your bypass logic here is 100% correct.
    const renderLessonItem = ({ item, index }: { item: Lesson, index: number }) => {
        const hasActivities = item.activities && item.activities.length > 0;

        if (hasActivities) {
            // return (
            //     <Link href={`/activity?lessonId=${item.lessonId}`} asChild>
            //         <TouchableOpacity style={styles.lessonRow}>
            //             <View style={styles.iconContainer}>
            //                 <Image source={{ uri: item.lessonImageUrl || `https://picsum.photos/seed/${item.lessonId}/100` }} style={styles.lessonIcon} />
            //             </View>
            //             <View style={styles.textContainer}>
            //                 <Text style={styles.lessonIndex}>{index + 1}</Text>
            //                 <Text style={styles.lessonName} numberOfLines={1}>{item.lessonName}</Text>
            //             </View>
            //             <View style={styles.arrowContainer}>
            //                 <Text style={styles.arrow}>▶</Text>
            //             </View>
            //         </TouchableOpacity>
            //     </Link>
            // );

            return (
                // <Link href={`/allActivities`} asChild>
                //     <TouchableOpacity style={styles.lessonRow}>
                //         <View style={styles.iconContainer}>
                //             <Image source={{ uri: item.lessonImageUrl || `https://picsum.photos/seed/${item.lessonId}/100` }} style={styles.lessonIcon} />
                //         </View>
                //         <View style={styles.textContainer}>
                //             <Text style={styles.lessonIndex}>{index + 1}</Text>
                //             <Text style={styles.lessonName} numberOfLines={1}>{item.lessonName}</Text>
                //         </View>
                //         <View style={styles.arrowContainer}>
                //             <Text style={styles.arrow}>▶</Text>
                //         </View>
                //     </TouchableOpacity>
                // </Link>
                <Link href={`/lessonActivities?lessonId=${item.lessonId}`} asChild>
                    <TouchableOpacity style={styles.lessonRow}>
                        <View style={styles.iconContainer}>
                            <Image source={{ uri: item.lessonImageUrl || `https://picsum.photos/seed/${item.lessonId}/100` }} style={styles.lessonIcon} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.lessonIndex}>{index + 1}</Text>
                            <Text style={styles.lessonName} numberOfLines={1}>{item.lessonName}</Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Text style={styles.arrow}>▶</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            );
        }

        return (
            <TouchableOpacity
                style={[styles.lessonRow, styles.disabledRow]}
                disabled={true}
            >
                <View style={styles.iconContainer}>
                    <Image source={{ uri: item.lessonImageUrl || `https://picsum.photos/seed/${item.lessonId}/100` }} style={styles.lessonIcon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.lessonIndex}>{index + 1}</Text>
                    <Text style={styles.lessonName} numberOfLines={1}>{item.lessonName}</Text>
                </View>
                <View style={styles.arrowContainer} />
            </TouchableOpacity>
        );
    };

    // This part was missing from your code snippet
    if (isLoading) {
        return <ActivityIndicator size="large" color={COLORS.primaryGreen} style={styles.centered} />;
    }

    // This part was also missing
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: levelName || 'பாடங்கள்' }} />
            <FlatList
                data={lessons}
                renderItem={renderLessonItem}
                horizontal={true}
                keyExtractor={(item) => item.lessonId.toString()}
                contentContainerStyle={styles.listContainer}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

// The StyleSheet should be defined outside the component for performance.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGreen,
        paddingTop: 80, // Increased padding to be safe
        paddingHorizontal: SIZES.padding / 2, // Adjusted for better screen fit
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
        marginHorizontal: SIZES.base,
        borderRadius: SIZES.radius * 3,
        padding: SIZES.base,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        width: SIZES.width * 0.75, // Use screen percentage for responsiveness
        height: 100, // Fixed height for consistency
    },
    disabledRow: {
        backgroundColor: '#e0e0e0',
        opacity: 0.7,
    },
    iconContainer: {
        backgroundColor: '#fff',
        borderRadius: 35, // Match half of icon size
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lessonIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    textContainer: {
        flex: 1,
        marginLeft: SIZES.padding,
        justifyContent: 'center',
    },
    lessonIndex: {
        ...FONTS.body1,
        color: COLORS.primaryOrange,
    },
    lessonName: {
        ...FONTS.h3,
        color: COLORS.textDark,
    },
    arrowContainer: {
        justifyContent: 'center',
        paddingLeft: SIZES.base,
    },
    arrow: {
        fontSize: 22,
        color: COLORS.primaryGreen,
    },
    listContainer: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: SIZES.padding,
    },
});

export default LessonsScreen;
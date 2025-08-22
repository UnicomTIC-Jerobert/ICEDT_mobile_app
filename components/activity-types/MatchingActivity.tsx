import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';
import { MatchingContent, MatchItem } from '../../types/activity';

interface MatchingActivityProps {
    content: MatchingContent;
}

const MatchingActivity: React.FC<MatchingActivityProps> = ({ content }) => {
    const [selectedA, setSelectedA] = useState<MatchItem | null>(null);
    const [selectedB, setSelectedB] = useState<MatchItem | null>(null);
    const [correctPairs, setCorrectPairs] = useState<string[]>([]);

    // This core logic is identical to the web version
    useEffect(() => {
        if (selectedA && selectedB) {
            if (selectedA.matchId === selectedB.id) {
                setCorrectPairs(prev => [...prev, selectedA.id, selectedB.id]);
            }
            setTimeout(() => {
                setSelectedA(null);
                setSelectedB(null);
            }, 300); // Short delay for user feedback
        }
    }, [selectedA, selectedB]);

    const handleItemClick = (item: MatchItem, column: 'A' | 'B') => {
        if (correctPairs.includes(item.id)) return;
        if (column === 'A') {
            setSelectedA(item);
        } else {
            setSelectedB(item);
        }
    };

    const handleReset = () => {
        setSelectedA(null);
        setSelectedB(null);
        setCorrectPairs([]);
    };
    
    const isComplete = correctPairs.length > 0 && correctPairs.length === content.columnA.length + content.columnB.length;

    // Helper function to get dynamic styles for each button
    const getItemStyles = (item: MatchItem, isSelected: boolean) => {
        const isCorrect = correctPairs.includes(item.id);
        if (isCorrect) {
            return { container: [styles.itemButton, styles.correctButton], text: styles.correctText };
        }
        if (isSelected) {
            return { container: [styles.itemButton, styles.selectedButton], text: styles.selectedText };
        }
        return { container: styles.itemButton, text: styles.itemText };
    };

    return (
        <View style={styles.container}>
            {content.title && (
                <Text style={styles.title}>{content.title}</Text>
            )}

            <View style={styles.columnsContainer}>
                {/* Column A */}
                <View style={styles.column}>
                    {content.columnA.map(item => {
                        const { container, text } = getItemStyles(item, selectedA?.id === item.id);
                        return (
                            <TouchableOpacity key={item.id} style={container} onPress={() => handleItemClick(item, 'A')} disabled={correctPairs.includes(item.id)}>
                                <Text style={text}>{item.content}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                {/* Column B */}
                <View style={styles.column}>
                    {content.columnB.map(item => {
                        const { container, text } = getItemStyles(item, selectedB?.id === item.id);
                        return (
                            <TouchableOpacity key={item.id} style={container} onPress={() => handleItemClick(item, 'B')} disabled={correctPairs.includes(item.id)}>
                                <Text style={text}>{item.content}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            {isComplete && (
                <View style={styles.completeContainer}>
                    <Icon name="check-circle" size={30} color={COLORS.primaryGreen} />
                    <Text style={styles.completeText}>All Matched!</Text>
                </View>
            )}
            
             <View style={styles.resetContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Icon name="replay" size={20} color={COLORS.buttonBlue} />
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- STYLESHEET FOR REACT NATIVE ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    title: {
        ...FONTS.h2,
        color: COLORS.textDark,
        marginBottom: SIZES.padding * 2,
    },
    columnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        flex: 1, // Allows columns to take up available vertical space
    },
    column: {
        width: '45%', // Each column takes up 45% of the width
        alignItems: 'center',
    },
    itemButton: {
        width: '100%',
        paddingVertical: SIZES.padding * 1.5,
        marginVertical: SIZES.base,
        borderRadius: SIZES.radius,
        borderWidth: 2,
        borderColor: COLORS.buttonBlue,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    itemText: {
        ...FONTS.h3,
        color: COLORS.buttonBlue,
    },
    selectedButton: {
        backgroundColor: COLORS.buttonBlue,
    },
    selectedText: {
        ...FONTS.h3,
        color: COLORS.white,
    },
    correctButton: {
        backgroundColor: COLORS.primaryGreen,
        borderColor: COLORS.primaryGreen,
        opacity: 0.8,
    },
    correctText: {
        ...FONTS.h3,
        color: COLORS.white,
    },
    completeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SIZES.padding,
    },
    completeText: {
        ...FONTS.h2,
        color: COLORS.primaryGreen,
        marginLeft: SIZES.base,
    },
    resetContainer: {
        marginTop: SIZES.padding,
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.padding * 2,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.buttonBlue,
    },
    resetText: {
        ...FONTS.body2,
        color: COLORS.buttonBlue,
        marginLeft: SIZES.base,
    },
});

export default MatchingActivity;
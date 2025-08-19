import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';
import { MCQChoice, MCQContent } from '../../types/activityContentTypes';

// --- NEW: Updated props interface ---
interface MCQActivityProps {
    content: MCQContent;
    currentIndex: number;
    total: number;
    onNext: () => void;
    onPrevious: () => void;
}

const MCQActivity: React.FC<MCQActivityProps> = ({ content, currentIndex, total, onNext, onPrevious }) => {
    const [selectedChoiceId, setSelectedChoiceId] = useState<string | number | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);

    // When the question (content) changes, reset the component's state
    useEffect(() => {
        setSelectedChoiceId(null);
        setIsAnswered(false);
    }, [content]);

    const handleChoiceClick = (choice: MCQChoice) => {
        // ... (this logic is unchanged)
        if (isAnswered) return;
        setSelectedChoiceId(choice.id);
        setIsAnswered(true);
    };

    const getButtonStyles = (choice: MCQChoice) => {
        // ... (this logic is unchanged)
        if (!isAnswered) return { container: styles.choiceButton, text: styles.choiceText };
        if (choice.isCorrect) return { container: [styles.choiceButton, styles.correctButton], text: styles.correctText };
        if (selectedChoiceId === choice.id && !choice.isCorrect) return { container: [styles.choiceButton, styles.incorrectButton], text: styles.incorrectText };
        return { container: [styles.choiceButton, styles.disabledButton], text: styles.disabledText };
    };

    return (
        <View style={styles.container}>
            {/* --- Left column now includes navigation --- */}
            <View style={styles.questionSide}>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{content.question}</Text>
                </View>

                {/* --- NEW: Navigation UI is now here --- */}
                {total > 1 && (
                    <View style={styles.navigationContainer}>
                        <TouchableOpacity onPress={onPrevious} style={styles.navButton} disabled={currentIndex === 0}>
                            <Text style={[styles.navButtonText, currentIndex === 0 && styles.disabledButtonText]}>Previous</Text>
                        </TouchableOpacity>
                        <Text style={styles.progressText}>{currentIndex + 1} / {total}</Text>
                        <TouchableOpacity onPress={onNext} style={styles.navButton} disabled={currentIndex === total - 1}>
                            <Text style={[styles.navButtonText, currentIndex === total - 1 && styles.disabledButtonText]}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* --- Right column is unchanged --- */}
            <View style={styles.choicesSide}>
                <ScrollView style={styles.choicesContainer} showsVerticalScrollIndicator={false}>
                    {content.choices.map((choice: MCQChoice) => {
                        const { container, text } = getButtonStyles(choice);
                        return (
                            <TouchableOpacity key={choice.id} style={container} onPress={() => handleChoiceClick(choice)} disabled={isAnswered}>
                                <Text style={text}>{choice.text}</Text>
                                {isAnswered && choice.isCorrect && <Icon name="check-circle" size={24} color="white" />}
                                {isAnswered && selectedChoiceId === choice.id && !choice.isCorrect && <Icon name="cancel" size={24} color="white" />}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                {isAnswered && (
                    <View style={styles.tryAgainContainer}>
                        <TouchableOpacity style={styles.tryAgainButton} onPress={() => { setIsAnswered(false); setSelectedChoiceId(null); }}>
                            <Text style={styles.tryAgainText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: SIZES.padding * 2,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    questionSide: {
        flex: 1,
        paddingRight: SIZES.padding,
        justifyContent: 'space-between', // This pushes the question up and nav down
        height: '100%', // Ensure it takes full height
    },
    questionContainer: {
        // ... (styles unchanged)
        backgroundColor: COLORS.white,
        padding: SIZES.padding * 2,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.lightGreen,
        elevation: 3,
        minHeight: 200,
        justifyContent: 'center',
    },
    questionText: {
        // ... (styles unchanged)
        ...FONTS.h2,
        textAlign: 'center',
        color: COLORS.textDark,
    },
    choicesSide: {
        flex: 1.2,
        paddingLeft: SIZES.padding,
    },
    choicesContainer: {
        maxHeight: 350,
    },
    // --- NEW STYLES for integrated navigation ---
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SIZES.padding,
        marginTop: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
    },
    navButton: {
        paddingHorizontal: SIZES.padding,
    },
    navButtonText: {
        ...FONTS.h3,
        color: COLORS.buttonBlue,
    },
    disabledButtonText: {
        color: COLORS.lightGreen,
        opacity: 0.5,
    },
    progressText: {
        ...FONTS.body2,
        color: COLORS.textDark,
        fontWeight: 'bold',
    },
    // ... (rest of the styles are unchanged)
    choiceButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: SIZES.padding * 1.5, paddingHorizontal: SIZES.padding * 2, borderRadius: SIZES.radius, borderWidth: 2, borderColor: COLORS.buttonBlue, marginBottom: SIZES.base * 2, elevation: 2, },
    choiceText: { ...FONTS.h3, color: COLORS.buttonBlue, },
    correctButton: { backgroundColor: COLORS.primaryGreen, borderColor: COLORS.primaryGreen, },
    correctText: { ...FONTS.h3, color: COLORS.white, },
    incorrectButton: { backgroundColor: COLORS.buttonRed, borderColor: COLORS.buttonRed, },
    incorrectText: { ...FONTS.h3, color: COLORS.white, },
    disabledButton: { backgroundColor: COLORS.white, borderColor: COLORS.lightYellow, opacity: 0.7, },
    disabledText: { ...FONTS.h3, color: COLORS.lightGreen, },
    tryAgainContainer: { marginTop: SIZES.padding, alignItems: 'center', },
    tryAgainButton: { backgroundColor: COLORS.buttonBlue, paddingVertical: SIZES.base * 1.5, paddingHorizontal: SIZES.padding * 3, borderRadius: 30, },
    tryAgainText: { ...FONTS.body1, color: COLORS.white, fontWeight: 'bold', },
});

export default MCQActivity;
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';
import { Equation, SimpleEquationContent } from '../../types/activity';

interface SimpleEquationActivityProps {
    content: SimpleEquationContent;
}

const SimpleEquationActivity: React.FC<SimpleEquationActivityProps> = ({ content }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const questions = content.questions || [];
    const currentQuestion: Equation | undefined = questions[currentIndex];
    const totalQuestions = questions.length;

    useEffect(() => {
        setSelectedOption(null);
        setIsAnswered(false);
    }, [currentIndex]);

    const handleOptionClick = (option: string) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const getOptionStyles = (option: string) => {
        if (!isAnswered) return { container: styles.optionButton, text: styles.optionText };
        if (option === currentQuestion?.correctAnswer) return { container: [styles.optionButton, styles.correctButton], text: styles.correctText };
        if (selectedOption === option) return { container: [styles.optionButton, styles.incorrectButton], text: styles.incorrectText };
        return { container: [styles.optionButton, styles.disabledButton], text: styles.disabledText };
    };

    if (!currentQuestion) return <View style={styles.container}></View>;

    return (
        <View style={styles.container}>
            {/* --- Question / Equation --- */}
            <View style={styles.equationContainer}>
                <Text style={styles.operandText}>{currentQuestion.leftOperand}</Text>
                <Text style={styles.operatorText}>+</Text>
                <Text style={styles.operandText}>{currentQuestion.rightOperand}</Text>
                <Text style={styles.operatorText}>=</Text>
                <Text style={styles.answerBox}>?</Text>
            </View>

            {/* --- Options Row --- */}
            <View style={styles.optionsSide}>
                {currentQuestion.options.map((option, index) => {
                    const { container, text } = getOptionStyles(option);
                    return (
                        <TouchableOpacity key={index} style={container} onPress={() => handleOptionClick(option)} disabled={isAnswered}>
                            <Text style={text}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* --- Navigation Buttons --- */}
            <TouchableOpacity onPress={handlePrevious} style={[styles.navButton, styles.leftNav]} disabled={currentIndex === 0}>
                <Text style={[styles.navButtonText, currentIndex === 0 && styles.disabledButtonText]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={[styles.navButton, styles.rightNav]} disabled={currentIndex === totalQuestions - 1}>
                <Text style={[styles.navButtonText, currentIndex === totalQuestions - 1 && styles.disabledButtonText]}>Next</Text>
            </TouchableOpacity>

            {/* --- Progress Text --- */}
            <Text style={styles.progressText}>{currentIndex + 1} / {totalQuestions}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: '#f9f9f9',
        justifyContent: 'flex-start', // top for question
        alignItems: 'center',
    },
    // --- Question / Equation ---
    equationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.padding * 2,
        backgroundColor: COLORS.white,
        padding: SIZES.padding * 2,
        borderRadius: SIZES.radius,
        elevation: 4,
    },
    operandText: { ...FONTS.h1, fontSize: 50, color: COLORS.textDark },
    operatorText: { ...FONTS.h1, fontSize: 40, color: COLORS.lightGreen, marginHorizontal: SIZES.padding },
    answerBox: { ...FONTS.h1, fontSize: 50, color: COLORS.buttonBlue },

    // --- Options Row ---
    optionsSide: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: SIZES.padding/2,
    },
    optionButton: {
        flex: 1,
        marginHorizontal: 5,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        borderWidth: 2,
        borderColor: COLORS.buttonBlue,
    },
    optionText: { ...FONTS.h2, color: COLORS.buttonBlue },
    correctButton: { backgroundColor: COLORS.primaryGreen, borderColor: COLORS.primaryGreen },
    correctText: { ...FONTS.h2, color: COLORS.white },
    incorrectButton: { backgroundColor: COLORS.buttonRed, borderColor: COLORS.buttonRed },
    incorrectText: { ...FONTS.h2, color: COLORS.white },
    disabledButton: { backgroundColor: COLORS.white, borderColor: COLORS.lightGreen, opacity: 0.7 },
    disabledText: { ...FONTS.h2, color: COLORS.lightGreen },

    // --- Navigation ---
    navButton: {
        position: 'absolute',
        bottom: SIZES.padding,
        padding: SIZES.padding,
    },
    leftNav: { left: SIZES.padding },
    rightNav: { right: SIZES.padding },
    navButtonText: { ...FONTS.h3, color: COLORS.buttonBlue },
    disabledButtonText: { color: COLORS.lightGreen, opacity: 0.5 },

    progressText: { ...FONTS.body2, color: COLORS.textDark, fontWeight: 'bold', position: 'absolute', bottom: SIZES.padding * 2, alignSelf: 'center' },
});

export default SimpleEquationActivity;

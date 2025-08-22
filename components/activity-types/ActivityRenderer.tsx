import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Import all your specific activity components
import MCQActivity from './MCQActivity';
import MatchingActivity from './MatchingActivity';
import SimpleEquationActivity from './SimpleEquationActivity';
// Import other components as you create them...

// Import all your type definitions
import {
    ActivityContent,
    MCQContent,
    MatchingContent,
    SimpleEquationContent,
    // ... other types
} from '../../types/activity';

interface ActivityRendererProps {
    // It receives the content for a single, specific exercise
    exerciseContent: ActivityContent;
}

const ActivityRenderer: React.FC<ActivityRendererProps> = ({ exerciseContent }) => {
    // The switch uses the 'type' discriminator from the content object
    switch (exerciseContent.type) {
        case 'MCQ':
            // The content is already the correct shape for the component
            return <MCQActivity content={exerciseContent as MCQContent} currentIndex={0} total={0} onNext={function (): void {
                throw new Error('Function not implemented.');
            } } onPrevious={function (): void {
                throw new Error('Function not implemented.');
            } } />;

        case 'MATCHING':
            return <MatchingActivity content={exerciseContent as MatchingContent} />;

        case 'SIMPLE_EQUATION':
            return <SimpleEquationActivity content={exerciseContent as SimpleEquationContent} />;
        
        // Add cases for your other activities here...
        // case 'FIRST_LETTER_MATCH':
        //     return <FirstLetterMatchActivity content={exerciseContent as FirstLetterMatchContent} />;

        default:
            return (
                <View style={styles.container}>
                    <Text style={styles.errorText}>
                        Preview for activity type ({exerciseContent.type}) not implemented.
                    </Text>
                </View>
            );
    }
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { fontSize: 16, color: 'gray' },
});

export default ActivityRenderer;
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
// Import the REFINED type
import { SimpleEquationContent } from '../../../types/activityContentTypes';

interface EquationProps {
    content: SimpleEquationContent;
}

const EquationFillInTheBlank: React.FC<EquationProps> = ({ content }) => {
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);

    const handleOptionClick = (option: string) => {
        if (isAnswered) return;
        setUserAnswer(option);
        setIsAnswered(true);
    };

    const handleReset = () => {
        setUserAnswer(null);
        setIsAnswered(false);
    };

    const isCorrect = userAnswer === content.correctAnswer;

    // --- The Component is now smarter ---
    // It builds the display from the simple JSON parts.
    const equationDisplay = (
        <>
            <Typography variant="h3">{content.leftOperand}</Typography>
            <Typography variant="h3">+</Typography>
            <Typography variant="h3">{content.rightOperand}</Typography>
            <Typography variant="h3">=</Typography>
            <Box
                sx={{
                    width: 60, height: 60,
                    border: `2px dashed ${isAnswered ? 'transparent' : 'grey'}`,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <Typography variant="h3" color={isAnswered ? (isCorrect ? 'success.main' : 'error.main') : 'text.primary'}>
                    {userAnswer || '?'}
                </Typography>
            </Box>
            {isAnswered && (isCorrect ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />)}
        </>
    );

    return (
        <Box p={3} sx={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" mb={4}>
                சரியான விடையைத் தெரிவு செய்க
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    backgroundColor: isAnswered ? (isCorrect ? '#e8f5e9' : '#ffebee') : '#fff'
                }}
            >
                {equationDisplay}
            </Paper>

            {/* The Options section remains the same */}
            <Typography variant="body1" mb={2}>Possible Answers:</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                {content.options.map(option => (
                    <Chip
                        key={option}
                        label={option}
                        onClick={() => handleOptionClick(option)}
                        disabled={isAnswered}
                        sx={{ fontSize: '1.5rem', padding: '20px 10px' }}
                        color="primary"
                        variant={isAnswered ? 'outlined' : 'filled'}
                    />
                ))}
            </Box>

            {isAnswered && (
                <Box mt={4}>
                    <Button variant="outlined" startIcon={<ReplayIcon />} onClick={handleReset}>
                        Try Again
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default EquationFillInTheBlank;
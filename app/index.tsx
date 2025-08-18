import { Redirect } from 'expo-router';
import React from 'react';

const StartPage = () => {
    // This component will immediately redirect the user to the '/levels' route.
    // The '/levels' route is part of our '(app)' group, so it will be
    // rendered inside our custom sidebar layout.
    return <Redirect href="/levels" />;
};

export default StartPage;
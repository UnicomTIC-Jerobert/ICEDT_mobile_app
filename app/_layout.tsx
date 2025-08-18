import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    // This Stack navigator is the root of your entire app.
    // All other screens will be pushed on top of this.
    <Stack>
      {/* The '(app)' group will be the main part of our app. Hide its header. */}
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      
      {/* You can add other screens here later, like a Login screen,
          which would not have the sidebar. */}
      {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
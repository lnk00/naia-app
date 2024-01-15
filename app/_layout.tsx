import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router, useRootNavigation } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import '../style.css';
import { SessionProvider, useSession } from '../contexts/auth';

const queryClient = new QueryClient();

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/(home)/index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Mackinac: require('../assets/fonts/Mackinac.otf'),
    Jost: require('../assets/fonts/Jost.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const rootNav = useRootNavigation();
  const { fetchSession } = useSession();

  useEffect(() => {
    if (rootNav?.isReady) {
      setTimeout(() => {
        fetchSession().then((session) => {
          if (!session) {
            router.replace('/(auth)');
          }
        });
      });
    }
  }, [rootNav]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

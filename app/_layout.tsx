import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import utc from 'dayjs/plugin/utc';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { SplashScreen, Stack, router, useRootNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import '../style.css';
import { SessionProvider, useSession } from '../contexts/auth';
import { registerForPushNotificationsAsync } from '../lib/notification';

const queryClient = new QueryClient();

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/(home)/index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  dayjs.locale(fr);
  dayjs.extend(utc);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Mackinac: require('../assets/fonts/Mackinac.otf'),
    Jost: require('../assets/fonts/Jost.ttf'),
    ...FontAwesome.font,
  });

  const [expoPushToken, setExpoPushToken] = useState('');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECEIVED: ', notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response, expoPushToken);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
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
        fetchSession().then((redirectUrl) => {
          if (redirectUrl) {
            router.replace(redirectUrl as never);
          }
          setTimeout(() => SplashScreen.hideAsync(), 500);
        });
      });
    }
  }, [rootNav]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

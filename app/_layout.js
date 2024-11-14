import { useState, useEffect } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isMounted, setIsMounted] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);
  const [lastBackPress, setLastBackPress] = useState(0);

  // Get the current pathname
  const pathname = usePathname();

  useEffect(() => {
    const initializeApp = async () => {
      if (loaded && isMounted) {
        const token = await AsyncStorage.getItem("authToken");
        setInitialRoute(token ? "/dashboard" : "/");

        if (token) {
          router.replace("/dashboard");
        } else {
          router.replace("/");
        }
      }
    };

    if (loaded) {
      SplashScreen.hideAsync();
      setIsMounted(true);
      initializeApp();
    }
  }, [loaded, isMounted]);

  useEffect(() => {
    const backAction = () => {
      if (pathname === "/dashboard") {
        const now = Date.now();
        if (lastBackPress && now - lastBackPress < 2000) {
          BackHandler.exitApp();
        } else {
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
          setLastBackPress(now);
        }
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [pathname, lastBackPress]);

  if (!loaded || !isMounted) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="forgot" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerShown: false }} />
      <Stack.Screen name="set_pass" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

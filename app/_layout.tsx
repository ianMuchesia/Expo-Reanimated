import { Stack } from "expo-router";
import 'react-native-gesture-handler';
import "./global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import * as FileSystem from 'expo-file-system';

const cleanupOldCache = async () => {
    try {
        const directory = FileSystem.documentDirectory;
        if (!directory) return;
        
        const files = await FileSystem.readDirectoryAsync(directory);
        
        const now = new Date().getTime();
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        
        for (const file of files) {
            if (file.endsWith('.png')) {
                const fileUri = directory + file;
                const fileInfo = await FileSystem.getInfoAsync(fileUri);
                if (fileInfo.exists && fileInfo.modificationTime) {
                    const fileAge = now - fileInfo.modificationTime * 1000;
                    
                    if (fileAge > maxAge) {
                        await FileSystem.deleteAsync(fileUri);
                    }
                }
            }
        }
    } catch (error) {
        console.warn("Error cleaning cache", error);
    }
};

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
        "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
        "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
        "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
        "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
        "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    });

    useEffect(() => {
        async function prepare() {
            try {
                if (fontsLoaded) {
                    await SplashScreen.hideAsync();
                    // Run cleanup when app starts
                    await cleanupOldCache();
                }
            } catch (error) {
                console.warn(error);
            }
        }
        
        prepare();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return <Stack screenOptions={{headerShown:false}} />;
}
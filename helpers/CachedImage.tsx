import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import * as FileSystem from 'expo-file-system';

interface CachedImageProps {
    uri: string;
    [key: string]: any;
}

export const CachedImage = (props: CachedImageProps) => {
    const [cachedSource, setCachedSource] = useState<any>(null);
    const { uri, ...otherProps } = props;

    const getCachedImage = async () => {
        try {
            const filename = FileSystem.documentDirectory + Math.random().toString(36).substring(7) + '.png';
            
            const fileInfo = await FileSystem.getInfoAsync(filename);
            
            if (fileInfo.exists) {
                setCachedSource({ uri: fileInfo.uri });
            } else {
                const downloadResumable = FileSystem.createDownloadResumable(
                    uri,
                    filename,
                    {},
                    (downloadProgress) => {
                        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
                        // You can use this progress value if you want to show a loading indicator
                    }
                );

                try {
                    const downloadResult = await downloadResumable.downloadAsync();
                    if (downloadResult?.uri) {
                        setCachedSource({ uri: downloadResult.uri });
                        await AsyncStorage.setItem(uri, filename);
                    }
                } catch (e) {
                    console.warn("Download failed, using original URI");
                    setCachedSource({ uri });
                }
            }
        } catch (error) {
            console.warn("Error caching image");
            setCachedSource({ uri });
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadImage = async () => {
            try {
                const cachedFilename = await AsyncStorage.getItem(uri);
                if (cachedFilename) {
                    const fileInfo = await FileSystem.getInfoAsync(cachedFilename);
                    if (fileInfo.exists) {
                        if (isMounted) {
                            setCachedSource({ uri: fileInfo.uri });
                            return;
                        }
                    }
                }
                if (isMounted) {
                    getCachedImage();
                }
            } catch (error) {
                console.warn("Error loading cached image");
                if (isMounted) {
                    setCachedSource({ uri });
                }
            }
        };

        loadImage();

        return () => {
            isMounted = false;
        };
    }, [uri]);

    return <Animated.Image source={cachedSource} {...otherProps} />;
};
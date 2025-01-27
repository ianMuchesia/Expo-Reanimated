import images from "@/constants/images";
import { router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Index() {

  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);




  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value + hp(5)),100);
    setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value + hp(5.5)),300);

   setTimeout(()=>router.push("/welcome"),2000)
  }
  ,[])
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      {/* logo image with rings */}
      <Animated.View className="bg-white/20 rounded-full " style={{padding:ring2Padding}}>
        <Animated.View className="bg-white/20 rounded-full " style={{padding:ring1Padding}}>
          <Image
            source={images.ringsImage}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>


      {/* Title and punchline */}
      <View className="items-center space-y-2 ">
        <Text className="font-bold text-white tracking-wider " style={{fontSize:hp(7)}}>
          Foody
        </Text >
        <Text className="font-bold text-white tracking-wider text-lg" style={{fontSize:hp(2)}}>
          Your favorite food at your doorstep
        </Text>
      </View>

      {/* Start Button */}
      <Pressable className="bg-white/30 rounded-xl mt-4 flex items-center justify-center" style={{
        width:hp(20),
        height:hp(10),
      }}
      onPress={()=>router.push("/welcome")}
      >
        <Text className="text-white text-center font-bold uppercase " style={{fontSize:hp(5.5)}}>
          Start
        </Text>

      </Pressable>
    </View>
  );
}

import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "@/helpers/CachedImage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon, ClockIcon, FireIcon, UserIcon } from "react-native-heroicons/outline";
import { HeartIcon, Square3Stack3DIcon, UsersIcon } from "react-native-heroicons/solid";
import axios from "axios";
import Loading from "@/components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const RecipeDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isFavorite, setIsFavorite] = React.useState(false);

  const [recipe, setRecipe] = React.useState<any>(null);

  const [loading, setLoading] = React.useState(true);

  const fetchRecipe = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (res && res.data) {
        //console.log(res.data);

        setRecipe(res.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRecipe(id);
  }, []);



  const ingredientIndexes = (meals:any) =>
  {
    if(!meals) return [];
    let indexes = [];
    for(let i=1;i<=20;i++)
    {
      if(meals[`strIngredient${i}`] && meals[`strIngredient${i}`].length>0)
      {
        indexes.push(i);
      }
    }

    return indexes;

  }

  const getYoutubeVideo = (url:any)=>
  {
    const regex = /[?*]v=([^&]+)/;

    const match = url.match(regex);

    if(match && match[1])
    {
      return match[1];
    }

    return null;
  }

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <StatusBar style="light" />

      <View className="flex-row justify-center">
        <CachedImage
          uri="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
          style={{
            width: wp(98),
            height: hp(50),
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 53,
          }}
          sharedTransitionTag={recipe?.strMeal}
          className="bg-black/5"
        />
      </View>
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          className="p-2 rounded-full ml-5 bg-white"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color="#fbbf24"
            className="bg-white/50 rounded-full p-2"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white"
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
            className="bg-white/50 rounded-full p-2"
          />
        </TouchableOpacity>
      </Animated.View>
      {/* Meal Description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* Name and area */}
          <Animated.View  entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2"  >
            <Text style={{fontSize: hp(3)}} className="font-rubik-bold flex-1 text-neutral-700">{recipe?.strMeal}</Text>
            <Text style={{fontSize: hp(2)}} className="font-rubik-medium flex-1 text-neutral-500">{recipe?.strArea}</Text>
          </Animated.View>

          {/* misc */}
          <Animated.View  entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{height:hp(6.5),width:hp(6.5)}} className="bg-white rounded-full flex items-center justify-center">
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>

              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                  35
                </Text>
                <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{height:hp(6.5),width:hp(6.5)}} className="bg-white rounded-full flex items-center justify-center">
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>

              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                  03
                </Text>
                <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{height:hp(6.5),width:hp(6.5)}} className="bg-white rounded-full flex items-center justify-center">
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>

              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                  103
                </Text>
                <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                 Calories
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{height:hp(6.5),width:hp(6.5)}} className="bg-white rounded-full flex items-center justify-center">
                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={"#525252"}/>

              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
               
                </Text>
                <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
              Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Ingredients */}

          <View className="space-y-4">
            <Text style={{fontSize:hp(2.5)}}
            className="font-bold flex-1 my-4 text-neutral-700">Ingredients</Text>
         
            <View className="space-y-2 ml-3">
             {
              ingredientIndexes(recipe).map((index)=>{
                return(
                  <View key={index} className="flex-row space-x-4 my-1 items-center">
                    <View style={{height:hp(1.5),width:hp(1.5)}} className="bg-amber-300 rounded-full"/>
                    <View className="flex-row ml-2">
                      <Text style={{fontSize:hp(1.7)}} className="font-rubik-extrabold text-neutral-700">
                        {recipe[`strMeasure${index}`]}
                      </Text>
                      <Text style={{fontSize:hp(1.7)}}  className="ml-2 font-rubik-medium text-neutral-600">
                        {recipe[`strIngredient${index}`]}
                      </Text>

                    </View>
                      
                  </View>
                )
              })
             }
            </View>
          </View>


            {/* Ingredients */}

            <View className="space-y-4">
            <Text style={{fontSize:hp(2.5)}}
            className="font-bold flex-1 my-4 text-neutral-700">Instructions</Text>
          <Text className="text-neutral-700" style={{fontSize:hp(1.6)}}>
             {
              recipe?.strInstructions
             }
          </Text>
          </View>

          {/* Recipe video */}
          {
            recipe?.strYoutube && (
              <View className="space-y-4">
                <Text style={{fontSize:hp(2.5)}}
            className="font-bold flex-1 my-4 text-neutral-700">Recipe Video</Text>
            <View>
              <YoutubeIframe
              videoId={getYoutubeVideo(recipe?.strYoutube)}
              height={hp(30)}
              />
            </View>
              </View>
            )
        }
         
           
        
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetails;

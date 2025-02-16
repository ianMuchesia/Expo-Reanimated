import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "@/constants/data";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TypeMealDbCategoryMeal } from "@/@types";
import Loading from "./Loading";
import { CachedImage } from "@/helpers/CachedImage";
import { router } from "expo-router";


interface RecipeCardProps {
    item: TypeMealDbCategoryMeal;
    index: number;
}

interface RecipeProps {
    categories: any[];
    recipies:TypeMealDbCategoryMeal[];
}

const RecipeCard = ({item,index}:RecipeCardProps) => {

    let isEven = index % 2 === 0;
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
      <Pressable style={{width:'100%',paddingLeft:isEven?0:8,paddingRight:isEven?8:0}}
      className="flex justify-center mb-4 space-y-1"
      onPress={()=> router.push(`/recipes/${item.idMeal}`)}
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: '100%', height: index%3===0?hp(25): hp(35),borderRadius:35 }}
          className="bg-black/5"
        /> */}
        <CachedImage uri={item.strMealThumb} style={{ width: '100%', height: index%3===0?hp(25): hp(35),borderRadius:35 }} className="bg-black/5"
        sharedTransitionTag={item.strMeal}
        />

        <Text className="font-rubik-semibold ml-2 text-neutral-600" style={{ fontSize: hp(1.5) }}>
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + "..." : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const Recipes = ({categories,recipies}:RecipeProps) => {
  return (
    <View className="mx-4 space-y-3 ">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-rubik-semibold text-neutral-600 my-4"
      >
        Recipes
      </Text>
      <View>
       {
        categories.length === 0 || recipies.length === 0 ? (<Loading size="large" className="mt-20"/>) :(
            <MasonryList
            data={recipies}
            keyExtractor={(item):string => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item  ,i }) => <RecipeCard item={item as TypeMealDbCategoryMeal} index={i} />}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            //onEndReached={() => loadNext(ITEM_CNT)}
          />
        )
       }
      </View>
    </View>
  );
};

export default Recipes;

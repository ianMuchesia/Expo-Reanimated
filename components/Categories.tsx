import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "@/constants/data";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TypeMealDbCategory } from "@/@types";

interface CategoriesProps {
  handleChangeCategory: (categoryName: string) => void
  activeCategory: string;
  categories:TypeMealDbCategory[];
}

const Categories = ({ activeCategory, handleChangeCategory ,categories}: CategoriesProps) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}> 
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4 space-x-20"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          let isActive = category.strCategory === activeCategory;
          let activeButtonClass = isActive ? " bg-amber-400" : " bg-black/10";

          return (
            <TouchableOpacity
              key={category.idCategory}
              className={"flex items-center space-y-1 mr-4" }
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View className={"rounded-full p-[6px] " + activeButtonClass}>
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600 " style={{ fontSize: hp(1.6) }}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

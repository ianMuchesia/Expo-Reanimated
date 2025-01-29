import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import images from "@/constants/images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "@/components/Categories";
import { categoryData } from "@/constants/data";
import axios from "axios";
import { TypeMealDbCategory, TypeMealDbCategoryMeal } from "@/@types";
import Recipes from "@/components/Recipes";

const Welcome = () => {

  const [ activeCategory, setActiveCategory ] = React.useState("All");

  const [ categories, setCategories ] = React.useState<TypeMealDbCategory[]>([]);

  const [ recipies, setRecipies ] = React.useState<TypeMealDbCategoryMeal[]>([]);

  React.useEffect(()=>{
    fetchCategories()
    fetchRecipies()
  }
  ,[])
    


  const handleChangeCategory = (categoryName:string)=>{
   
    setActiveCategory(categoryName)
    fetchRecipies(categoryName)
    
  }

  const fetchCategories = async()=>{
    try {
      
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")

      //console.log(res)


      if(res && res.data)
      {
        setCategories(res.data.categories as TypeMealDbCategory[])
      }
    } catch (error) {

      console.log(error)
      Alert.alert("Error", "Something went wrong")
      
    }
  }

  const fetchRecipies = async(categoryName:string="Beef")=>{
    try {
      
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c="+categoryName)


      if(res && res.data)
      {


        setRecipies(res.data.meals)
      }
    } catch (error) {

      console.log(error)
      Alert.alert("Error", "Something went wrong")
      
    }
  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="space-y-4 pt-14"
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* avatar and bell */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={images.avatar}
            style={{ width: hp(5.5), height: hp(5), borderRadius: hp(5.5 / 2) }}
          />
          <BellIcon size={hp(4)} color="grey" />
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            {" "}
            Hello, Msodoki!
          </Text>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Make your own food,
            </Text>
          </View>
          <Text
            className="font-semibold text-neutral-600"
            style={{ fontSize: hp(3.8) }}
          >
            Stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} color="gray" strokeWidth={3} />
          </View>
        </View>
        {/* Categories */}
        <View>
         {
            categories && categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
         }
          
        </View>

        {/* Recipes */}
        <View className="">
          <Recipes categories={categories} recipies={recipies}/>
        </View>

      </ScrollView>
    </View>
  );
};

export default Welcome;

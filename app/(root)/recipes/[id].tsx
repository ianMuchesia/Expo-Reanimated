import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '@/helpers/CachedImage';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import {  HeartIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '@/components/Loading';

const RecipeDetails = () => {

    const { id } = useLocalSearchParams<{id:string}>();

    const [isFavorite, setIsFavorite] = React.useState(false);

    const [ recipe, setRecipe ] = React.useState<any>(null);

    const [loading, setLoading] = React.useState(true);

    const fetchRecipe = async(id:string)=>{
        try {
          
            setLoading(true)
          const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    
    
          if(res && res.data)
          {

            console.log(res.data)
    
    
            setRecipe(res.data.meals)
            setLoading(false)
          }
        } catch (error) {
    
          console.log(error)
          Alert.alert("Error", "Something went wrong")
            setLoading(false)
          
        }
      }


    React.useEffect(()=>{
        fetchRecipe(id)
    },[])
  return (
    <ScrollView className="bg-white flex-1"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:20}}>
        <StatusBar style='light'/>

     <View className="flex-row justify-center">
        <CachedImage uri="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg" style={{width:wp(98),height:hp(50),borderBottomLeftRadius:40,borderBottomRightRadius:53}} className="bg-black/5"/>
     </View>
     <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity className='p-2 rounded-full ml-5 bg-white' onPress={()=>router.back()}>
            <ChevronLeftIcon size={hp(3.5) } strokeWidth={4.5} color="#fbbf24" className="bg-white/50 rounded-full p-2"/>
        </TouchableOpacity>
        <TouchableOpacity className='p-2 rounded-full mr-5 bg-white' onPress={()=>setIsFavorite(!isFavorite)}>
            <HeartIcon size={hp(3.5) }  strokeWidth={4.5} color={isFavorite?"red":"gray"} className="bg-white/50 rounded-full p-2"/>
        </TouchableOpacity>
     </View>
     {/* Meal Description */}
     {
        loading? <Loading size="large" className="mt-16"/> : (
            <View>
                <Text>Display data</Text>
            </View>
        )
     }
    </ScrollView>
  )
}

export default RecipeDetails
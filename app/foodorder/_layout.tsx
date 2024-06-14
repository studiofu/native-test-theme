import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Stack } from 'expo-router/stack';


const FoodOrderLayout = () => {

  // const {data, error} = supabase.from("songs")
  //   .select("*")
  //   ;

  useEffect(() => { 
    console.log('foodorder layout mounted');
  }, []);
      
  return (    
      <Stack
        initialRouteName="index"
      >
        <Stack.Screen name="index" 
          options={{
            title: "Food Order",
          }}
        />
        <Stack.Screen name="(admin)" />
        
        <Stack.Screen name="(auth)" />                
        <Stack.Screen name="(cart)/index" 
          options={{            
            presentation: 'modal',
            headerShown: false
          }}
        />
      </Stack>          
  )
}

export default FoodOrderLayout
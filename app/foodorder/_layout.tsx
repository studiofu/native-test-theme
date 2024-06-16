import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Stack } from 'expo-router/stack';
import AuthProvider from './providers/auth-provider';
import { QueryClient } from '@tanstack/react-query';
import QueryProvider from './providers/query-provider';
import UserActivity from '@/providers/user-activity';


const FoodOrderLayout = () => {

  // const {data, error} = supabase.from("songs")
  //   .select("*")
  //   ;

  useEffect(() => { 
    console.log('foodorder layout mounted');
  }, []);
      
  return (    
    
    
    <QueryProvider>    
    <UserActivity>
    <AuthProvider>
      <Stack
        initialRouteName="index"
      >
        <Stack.Screen name="index" 
          options={{
            title: "Food Order",
          }}
        />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="(user)"          
          options={{
            headerShown: true,
            title: "User",
          }}
        />
        <Stack.Screen name="(auth)" />        
        <Stack.Screen name="(cart)/index" 
          options={{
            presentation: 'modal',
            headerShown: false
          }}
        />
      </Stack>    
    </AuthProvider>      
    </UserActivity>
    </QueryProvider>
    
  )
}

export default FoodOrderLayout
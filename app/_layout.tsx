import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

import "../global.css"
import { Theme } from '@/themes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Theme>
      <Stack
      >
        <Stack.Screen name="index" 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="dummy" 
          options={{
            //headerShown: false
          }}
        />
        <Stack.Screen name="(tabs)" 
          options={{
            //headerShown: false
          }}
        />  

        {/** using expo stack, gesture is not work in android */}
        <Stack.Screen name="card"    
          
          options={
            {
              presentation: "card",
              headerShown: false,
              animation: "slide_from_bottom",
              gestureDirection: "vertical",
              gestureEnabled: true,
              // android not working...            
              fullScreenGestureEnabled: true,
            }
          }
        
        />
      </Stack>
      </Theme>
    </GestureHandlerRootView>
  )
}

export default RootLayout
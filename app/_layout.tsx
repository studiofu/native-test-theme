import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

import "../global.css"
import { Theme } from '@/themes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import clsx from 'clsx'
import useModalStore from '@/store/modal-provider'


const RootLayout = () => {
  
  const {
    open,
    setOpen
  } = useModalStore();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Theme>
      <Stack
        screenOptions={{          
        }}
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

        <Stack.Screen name="svg-page" 
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
      {/* test modal  real full-screen */}    
      {/* <View className={clsx(`absolute h-full w-full bg-black/50`, open ? 'flex' : 'hidden')}>
          <TouchableHighlight
            onPress={() => setOpen(false)}
            className='absolute top-0 right-0 p-5'>
            <Text className='text-white'>Close</Text>
          </TouchableHighlight>        
      </View>       */}
      </Theme>
    </GestureHandlerRootView>
  )
}

export default RootLayout
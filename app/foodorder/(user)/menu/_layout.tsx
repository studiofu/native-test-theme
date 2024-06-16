import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const MenuStack = () => {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }}              
    >
      <Stack.Screen name="index" options={{title: "Menu"}} />
    </Stack>
  )
}

export default MenuStack
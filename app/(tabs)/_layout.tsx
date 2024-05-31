import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" 
        options={{
          //headerShown: false
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="settings" 
        options={{
          //headerShown: false
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="abacus" color={color} size={size} />
          ),
        }}
      />
      
    </Tabs>
  )
}

export default TabLayout
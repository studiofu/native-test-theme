import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {BlurView} from '@react-native-community/blur';

const StudyLayout = () => {
  return (

    <>
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        //tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        // tabBarBackground: () => (
        //   <BlurView
        //     style={StyleSheet.absoluteFill}
        //     blurType="light"
        //     blurAmount={15}
        //   />        
        // ),
      }}
    >
      <Tabs.Screen name="first" 
        //initialParams={{ open, setOpen }}
        
        // this is how you pass params to the screen
        initialParams={{ item: 1234}}        
        
        options={{
          //headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tabs.Screen name="second" 
        options={{
          //headerShown: false
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="abacus" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen name="third" 
        options={{
          //headerShown: false
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />                
      
    </Tabs>   
    </> 
  )
}


const styles = StyleSheet.create({
  tabBarStyle: {
    paddingBottom: 20,
    paddingTop: 20,
    height: 100,
    position: 'absolute',
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  }
});

export default StudyLayout
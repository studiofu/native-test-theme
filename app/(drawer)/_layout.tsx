import { View, Text } from 'react-native'
import React from 'react'
import {Drawer} from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DrawerLayout = () => {
  return (

    <Drawer />
    
    // <Drawer
    //   screenOptions={{ headerShown: false }}
    // >
    //   <Drawer.Screen
    //     name="drawer-page"
    //     options={{
    //       drawerLabel: "drawer-page",
    //       title: "drawer-page",
    //     }}
    //   />
    // </Drawer>
    
  )
}

export default DrawerLayout
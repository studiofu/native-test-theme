import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import clsx from 'clsx';
import Home from './home';
import useModalStore from '@/store/modal-provider';

const TabLayout = () => {

  // test modal
  //const [open , setOpen] = React.useState(false)
  const { open, setOpen } = useModalStore();
  
  
  return (
    <>
    <Tabs>
      <Tabs.Screen name="home" 
        //initialParams={{ open, setOpen }}
        
        // this is how you pass params to the screen
        initialParams={{ item: 1234}}        
        
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
    
    {/* test modal */}    
    <View className={clsx(`absolute h-full w-full bg-black/50`, open ? 'flex' : 'hidden')}>
        <TouchableHighlight
          onPress={() => setOpen(false)}
          className='absolute top-0 right-0 p-5'>
          <Text className='text-white'>Close</Text>
        </TouchableHighlight>
    </View>
    </>
  )
}

export default TabLayout
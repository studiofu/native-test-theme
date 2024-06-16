import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

const UserLayout = () => {
  return (
    <Tabs>
      
      <Tabs.Screen name="index" 
        options={{
          title: "User",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="home" color={color} />
          )
        }} />

      <Tabs.Screen name="profile" 
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="user-circle" color={color} />
          )
        }} />

      <Tabs.Screen name="menu" 
        options={{
          headerShown: false,
          title: "menu",
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="minus-circle" color={color} />
          )
        }} />        

    </Tabs>
  )
}

export default UserLayout
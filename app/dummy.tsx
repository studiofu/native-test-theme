import { View, Text } from 'react-native'
import React from 'react'
import { useThemeContextValues } from '@/themes';
import { Themes } from '@/themes/theme-config';

const Dummy = () => {
  const {
    theme
  } = useThemeContextValues();


  return (
    <View 
      style={Themes[theme]}
      className='flex items-center justify-center h-full w-full'>
      <Text className='text-dummy'>Dummy</Text>
    </View>
  )
}

export default Dummy
import { View, Text, Pressable } from 'react-native'
import React from 'react'


interface CustomButtonProps {
  title: string;
  onPress: () => void;
  extraStyle?: string;
}

const CustomButton = (
  { title, onPress, extraStyle }: CustomButtonProps
) => {
  return (
    <Pressable onPress={
      () => onPress()
    }>

      <View         
        className={`${extraStyle}`}      
      >
        <Text
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 10,
          width: 200,
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.75,
          shadowRadius: 3.84,
          elevation: 10,              
        }}              
        >{title}</Text>
      </View>

    </Pressable>
  )
}

export default CustomButton
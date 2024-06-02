import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const Card = () => {

  const router = useRouter();
  return (
    <View className='items-center justify-center w-full h-full'>
      <Text>Card</Text>      

      <Button 
        title='Back'
        onPress={() => {
          router.back();
        }}
      />

    </View>
  )
}

export default Card
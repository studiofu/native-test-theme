import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

type CircleButtonProps = {
  title: string;    
} & React.ComponentPropsWithoutRef<typeof Pressable>

const CirlceButton = (
  { title, ...props }: CircleButtonProps
) => {
  return (
    <Pressable {...props}>
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'darkorange',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default CirlceButton
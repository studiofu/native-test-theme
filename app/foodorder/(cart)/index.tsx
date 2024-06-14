import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'


const data = [
  {
    id: 1,
    name: 'Burger',
    price: 10
  },
  {
    id: 2,
    name: 'Pizza',
    price: 20
  },
  {
    id: 3,
    name: 'Pasta',
    price: 15
  }
]

const Cart = () => {


  return (
    <SafeAreaView 
      style={{
        margin: 10,
        padding: 10,
        flex: 1,
        height: '100%',
           
      }}
    >      
      <Text>
        Cart
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />    
    </SafeAreaView>
  )
}

export default Cart
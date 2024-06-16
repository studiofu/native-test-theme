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
  },
  {
    id: 4,
    name: 'Salad',
    price: 5
  },
  {
    id: 5,
    name: 'Soup',
    price: 7
  },
  {
    id: 6,
    name: 'Sandwich',
    price: 8
  },
  {
    id: 7,
    name: 'Fries',
    price: 3
  },
  {
    id: 8,
    name: 'Coke',
    price: 2
  },
  {
    id: 9,
    name: 'Ice Cream',
    price: 4
  },
  {
    id: 10,
    name: 'Coffee',
    price: 2
  },
  {
    id: 11,
    name: 'Tea',
    price: 1
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
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          padding: 10,
        }}
      >
        Cart
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              backgroundColor: '#f9f9f9'
            }}
          >
            <Text            
              style={{
                fontSize: 18,
              }}
            >{item.name}</Text>
            <Text
              style={{
                fontSize: 14,
              }}
            >{item.price}</Text>
          </View>
        )}
      />    
    </SafeAreaView>
  )
}

export default Cart
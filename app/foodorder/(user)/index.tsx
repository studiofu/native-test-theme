import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Product, useCreateProduct } from '../services/products'
import Button from '../components/Button'
import { create } from 'd3'


const UserPage = () => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const {
    mutate: createProduct,
    isPending,
    isError,
    error,
  } = useCreateProduct()

  return (
    <View>
      <Text>UserPage</Text>      
      <TextInput
        placeholder="Product Title"
        value={name}
        onChangeText={(text) => setName(text)}        
      ></TextInput>

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)          }
      ></TextInput>
      

      {isPending && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      {!isPending && (
        <Button        
          text="Save"   
          onPress={() => {
            createProduct({
              id: Math.floor(Math.random() * 1000),
              name,
              price: parseInt(price),
            } as Product)            

            console.log('Product created');
          }}
        />
      )}


    </View>
  )
}

export default UserPage
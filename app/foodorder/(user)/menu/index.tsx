import { View, Text } from 'react-native'
import React from 'react'
import { useProductList } from '../../services/products'
import { FlatList } from 'react-native-gesture-handler';

const MenuScreen = () => {

  const {
    data: products,
    error,
    isLoading,
    isFetching,
    refetch,      
  } = useProductList();

  if(isLoading) return <Text>Loading...</Text>


  return (
    <View>
      
      <FlatList 
        data={products}
        numColumns={2}
        renderItem={({item}) => (
          <View          
            style={{
              flex: 1,
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
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}  
      />

    </View>
  )
}

export default MenuScreen
import { View, Text, FlatList, Pressable } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx';

type PostItem = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FlatListScreen = () => {

  const [data, setData] = useState<PostItem[] | []>([]);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => setData(json))
  },[])


  if(data.length <= 0) return (
    <View><Text>Loading</Text></View>
  )



  const filteredData = data.filter((item, index) => {
    if(filterText == '') return true;  
    
    if(filterText == 'ion') 
      return item.title.includes('ion');
    
    if(filterText == 'ia')
      return item.title.includes('ia');
    
    return false;
  })


  return (    

      <Fragment>

      <View className='flex flex-row gap-2 p-2 m-2 items-center justify-center' > 
          <Pressable onPress={() => setFilterText('')}>
            <Text className='bg-red-300 p-2 m-2 rounded-lg'>all</Text></Pressable>              
          <Pressable onPress={() => setFilterText('ion')}>
            <Text className='bg-red-300 p-2 m-2 rounded-lg'>ion</Text></Pressable>
          <Pressable onPress={() => setFilterText('ia')}>
            <Text className='bg-red-300 p-2 m-2 rounded-lg'>ia</Text></Pressable>

      </View>
      <FlatList        
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        stickyHeaderIndices={[0,10,20]}
        renderItem={({item, index}) => (
          <Text className={clsx(`p-1 m-1 bg-gray-200`, [0,10,20].includes(index) &&  'bg-blue-200')}
            key={index}
          >{item.title}</Text>
        )}
      />

      </Fragment>
  )
}

export default FlatListScreen
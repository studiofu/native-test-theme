import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useModalStore from '@/store/modal-provider';


// interface HomeProps {
//    open: boolean,
//    setOpen: (open: boolean) => void
// }

const Home = (
   //{ open, setOpen }: HomeProps
) => {
  
  const {item} = useLocalSearchParams();
  console.log('item', item)

  const { open, setOpen } = useModalStore();

  //console.log(route);

  //const { open, setOpen } = route.params;

  // useEffect(() => {
  //   console.log(route?.params)
  // }, [route.params])

  return (
    <View>
      <Text>Home</Text>
      <Button title="Press me" onPress={() => alert('Button pressed')} />
      <Button title="Open Modal" onPress={() => setOpen(true)} />
    </View>
  )
}

export default Home
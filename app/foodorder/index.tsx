import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from './lib/supabase';

const Index = () => {

  const router = useRouter();
  const [songs, setSongs] = React.useState([])

  useEffect(() => {
    console.log('foodorder index page mounted')
  }, [])

  useEffect(() => {
    supabase.from('songs').select('*').then(({ data, error,  }) => {    
      if (error) {
        console.log('error', error)
      } else {
        console.log('data', data)
        setSongs(data as any);
      }
    })      
  }, [])

  if(songs.length <= 0) {
    return (
      <View 
      
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator 
          size="large"
          color="blue"
        />
      </View>
    )
  }


  return (
    <View 
      style={{
        flex: 1,
      }}
    >      

      {songs.map((song: any) => (

        <View
          key={song.id}          
          style={{
            padding: 10,
            margin: 10,
            backgroundColor: 'lightgray',
            borderRadius: 5
          }}
        >
          <Text>{song.title}</Text>
          <Text>{song.author}</Text>
          <Text>{song.song_path}</Text>
        </View>
      ))}
      

      <Text>  Food Order Index</Text>      
      <Text>  Food Order Index</Text>      
      <Text>  Food Order Index</Text>      
      <Text>  Food Order Index</Text>      


      <Link href="foodorder/(user)"
      
        style={{
          backgroundColor: 'lightblue',
          padding: 10,
          borderRadius: 5,
          marginTop: 10        
        }}>User</Link>  

      <Link href="foodorder/(admin)"
      
        style={{
          backgroundColor: 'lightgreen',
          padding: 10,
          borderRadius: 5,
          marginTop: 10        
        
        }}
      >Admin</Link>  

      <TouchableOpacity
        onPress={() => {
          router.push('foodorder/(cart)')
        }}
      >
        <View
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            marginTop: 10
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            Cart
          </Text>
        </View>
      </TouchableOpacity>
    </View>    
  )
}

export default Index
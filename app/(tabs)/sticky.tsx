import { View, Text, Animated, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import DynamicHeader from '@/components/dynamic-header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'; 

export const DATA = [
  {
    id: 1,
    title: 'Modern JS: A curated collection'
  },
  {
    id: 2,
    title: 'JavaScript notes for professionals'
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts'
  },
  {
    id: 4,
    title: 'JavaScript: The right way'
  },
  {
    id: 5,
    title: 'Exploring ES6'
  },
  {
    id: 6,
    title: 'JavaScript Enlightenment'
  },
  {
    id: 7,
    title: 'You dont know JS'
  },
  {
    id: 8,
    title: 'Learn JavaScript'
  },
  {
    id: 9,
    title: 'JavaScript succintly'
  },
  {
    id: 10,
    title: 'Human JavaScript'
  },
  {
    id: 11,
    title: 'JavaScript design patterns'
  },
  {
    id: 12,
    title: "JS50: 50 illustrations in JS"
  },
  {
    id: 13,
    title: 'Eloqent JavaScript'
  },
  {
    id: 14,
    title: 'Practical ES6'
  },
  {
    id: 15,
    title: 'Speaking JavaScript'
  }
];

const Sticky = () => {

  let sources = {
    'fontawesome': FontAwesome,
    'entypo': Entypo,
    'ionicons': Ionicons
  };

  // the unique icons to be used
  let cards = [
    {
      src: 'fontawesome',
      name: 'heart',
      color: 'red'
    },
    {
      src: 'entypo',
      name: 'feather',
      color: '#7d4b12'
    },
    {
      src: 'entypo',
      name: 'flashlight',
      color: '#f7911f'
    },
    {
      src: 'entypo',
      name: 'flower',
      color: '#37b24d'
    },
    {
      src: 'entypo',
      name: 'moon',
      color: '#ffd43b'
    },
    {
      src: 'entypo',
      name: 'youtube',
      color: '#FF0000'
    },
    {
      src: 'entypo',
      name: 'shop',
      color: '#5f5f5f'
    },
    {
      src: 'fontawesome',
      name: 'github',
      color: '#24292e'
    },
    {
      src: 'fontawesome',
      name: 'skype',
      color: '#1686D9'
    },
    {
      src: 'fontawesome',
      name: 'send',
      color: '#1c7cd6'
    },
    {
      src: 'ionicons',
      name: 'ios-magnet',
      color: '#d61c1c'
    },
    {
      src: 'ionicons',
      name: 'logo-facebook',
      color: '#3C5B9B'
    }
  ];  

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  
  return (
    <SafeAreaView style={{ flex: 1 }} 
     // forceInset={{ top: 'always' }}
    >       
    <DynamicHeader animHeaderValue={scrollOffsetY} />
    {/* <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Open up App.js to start working on your app!</Text>
    </View> */}
    <ScrollView     
        scrollEventThrottle={10}
        onScroll={
          Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY}}}],
          {useNativeDriver: false}
          )          
      }
      >         
      <View className='h-[170px]'></View>
            {DATA.map((book, index) => {
              return (                
                  <Text style={styles.scrollText} key={book.id}>{book.title}</Text>                
              )
            })}         
      </ScrollView>    
  </SafeAreaView>   

  )
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,  
    paddingTop: 10, 
    margin: 0     
  },
  scrollText: {            
    fontSize: 19,
    textAlign: 'center',
    padding: 20,
    color: '#000'
  }
});


export default Sticky
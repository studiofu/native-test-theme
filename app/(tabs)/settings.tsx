import { View, Text, StyleSheet, Button, Dimensions } from 'react-native'
import React from 'react'

import { Slider } from 'react-native-awesome-slider';
import Swiper from 'react-native-swiper';
import Animated, {
  useAnimatedScrollHandler,
  useScrollViewOffset,
  useSharedValue,
} from 'react-native-reanimated';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

const Settings = () => {


  const [refresh, setRefresh] = React.useState(false);

  const pullToRefresh = () => {
    console.log('refreshing.............')
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }

  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);


  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
    console.log( `event.contentOffset.x: ${event.contentOffset.x}`)
  });


  const data = [
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
    }
  ]


  
  return (
    <View className='flex flex-col bg-red-50 h-full items-start' >
      <Text className='p-5'>Settings</Text>

      <Slider
      //style={styles.container}
      progress={progress}
      minimumValue={min}
      maximumValue={max}
      thumbWidth={10}

      theme={{
        disableMinTrackTintColor: '#fff',
        maximumTrackTintColor: '#fff',
        minimumTrackTintColor: '#000',
        cacheTrackTintColor: '#333',
        bubbleBackgroundColor: '#666',
        heartbeatColor: '#999',
      }}      

      onSlidingStart={() => {
        console.log('start');
      }}

      onValueChange={(value) => {
        console.log('change', value);
      }}

      

    />

    <View className='h-[200px] w-[90%] mt-10 self-center'>

      <Swiper style={styles.wrapper} 
        showsButtons={false}                
        >
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
          <Button             
            onPress={() => {}}
            title="Go to Home" />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
      




      </View>


      {/** use animated flatlist */}
      <View>
        <ScrollView style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={pullToRefresh}
            />
          }
        >
        <Animated.FlatList 
          // refreshing={true}
          // onRefresh={() => {
          //   console.log('refreshing');
          // }}
          //horizontal
          onScroll={onScrollHandler}
          //pagingEnabled={true}
          data={data}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className='h-[100px] w-[300px] bg-slate-300'>
            <Text >
              {item.title}
              
            </Text>
            </View>
          )}       
          
          ListHeaderComponent={() => (
            <View className='h-[100px] w-[300px] bg-slate-300'>
              <Text>Header</Text>
            </View>
          )}

          ListFooterComponent={() => (
            <View className='h-[500px] w-[300px] bg-slate-300'>
              <Text>Footer</Text>
            </View>
          )}
        />
        </ScrollView>
                  

      </View>

    
    </View>
  )
}



const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default Settings
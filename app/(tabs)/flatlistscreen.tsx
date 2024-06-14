import { View, Text, FlatList, Pressable, PanResponder, RefreshControl } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx';
import Animated, { Easing, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


// reference: 
// https://blog.cloudboost.io/building-a-custom-refresh-animation-in-react-native-using-reanimated-9b64212a0366
// https://medium.com/@taitasciore/handling-pan-and-scroll-gestures-simultaneously-and-gracefully-with-gesture-handler-2-reanimated-63f0d8f72d3c



type PostItem = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FlatListScreen = () => {

  const [data, setData] = useState<PostItem[] | []>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [isPanEnabled, setIsPanEnabled] = useState(true);

  const isReadyToRefresh = useSharedValue(false);
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const startScrollPosition = useSharedValue(0);
  

  // refresh function

  const onRefresh = (done: () => void) => {
    setRefreshing(true);
    console.log('Refreshing...');
  
    setTimeout(() => {
      console.log('Refreshed!');
      setRefreshing(false);
      done();
    }, 3000);
  };  


  // ---------------------------------------------------------------------------
  // use react native PanResponder
  // not smooth in android

  const onPanRelease = () => {
    console.log('onPanRelease');
    //pullDownPosition.value = withTiming(0, { duration: 180 });
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 75 : 0, {
      duration: 180,
    });    

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;
  
      // Do Refresh

      // A function that resets the animation
      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, { duration: 180 });
      };

      // trigger the refresh action
      onRefresh(onRefreshComplete);

    }    
  };

  const panResponderRef = React.useRef(
    PanResponder.create({

      // if scroll position is at the top and user is pulling down, i.e. dy > 0
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return scrollPosition.value <= 0 && gestureState.dy >= 0;
      },
      
      // set the dy to the pullDownPosition
      onPanResponderMove: (event, gestureState) => {
        const maxDistance = 150;        
        pullDownPosition.value = Math.max(Math.min(maxDistance, gestureState.dy), 0);

        // check if ready to refresh base on the pull down position
        if (
          pullDownPosition.value >= maxDistance / 2 &&
          isReadyToRefresh.value === false
        ) {
          isReadyToRefresh.value = true;
          console.log('Ready to refresh');
        }
  
        if (
          pullDownPosition.value < maxDistance / 2 &&
          isReadyToRefresh.value === true
        ) {
          isReadyToRefresh.value = false;
          console.log('Will not refresh on release');
        }

      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    })
  );

  const pullDownStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: pullDownPosition.value,
        },
      ],
    };
  });  



  // assign to the height of the refresh container
  const refreshContainerStyles = useAnimatedStyle(() => {
    return {
      height: pullDownPosition.value,
    };
  });

  // const rotation = useSharedValue(0);

  // rotation.value = withRepeat(
  //   withTiming(360, // toValue: 1
  //       { duration: 1500, easing: Easing.linear }
  //   ),
  //   -1, // inifinite
  //   false);       

  // assign to the refresh icon
  const refreshIconStyles = useAnimatedStyle(() => {
    const scale = Math.min(1, Math.max(0, pullDownPosition.value / 75));

    return {
      opacity: Math.max(0, pullDownPosition.value - 25) / 50,
      //opacity: refreshing ? withDelay(100, withTiming(0, { duration: 200 })) : Math.max(0, pullDownPosition.value - 25) / 50,
      transform: [
        {
          scale: scale,
        },
        {
          rotate: `${pullDownPosition.value * 3}deg`,          
          //rotate: `${rotation.value}deg`,          
          
        },
      ],
    };
  },[refreshing]);  
  

  // ---------------------------------------------------------------------------
  // assign to the flatlist scroll event
  // to get the scroll position
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y;      
    },  
  });


  
  // gesture handling (not work)
  const updatePanState = (offset: number) => {
    console.log(`updatePanState: `,offset);
    //'worklet';
    if (offset > 0) {
      //runOnJS(setIsPanEnabled)(false);
    } else if (offset === 0) {
      //runOnJS(setIsPanEnabled)(true);
    }
  };  

  const onGestureRelease = () => {
    console.log('onGestureRelease');
    //pullDownPosition.value = withTiming(0, { duration: 180 });
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 75 : 0, {
      duration: 180,
    });    

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;
  
      // Do Refresh

      // A function that resets the animation
      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, { duration: 180 });
      };

      // trigger the refresh action
      onRefresh(onRefreshComplete);

    }    
  };  

  const scrollPanGesture = Gesture.Pan()
  .onBegin(() => {
    console.log(`gesture begin`);
    startScrollPosition.value = scrollPosition.value;
  })
  .onUpdate((e) => {
    //console.log(`gesture update`, e);
    //console.log(`gesture update`, e.translationY);
    //console.log(`gesture update scroll`, scrollPosition.value);

    if(scrollPosition.value <= 0)  {

      const maxDistance = 150;
      //console.log('move ',gestureState.dy);
      //pullDownPosition.value = gestureState.dy;
      //pullDownPosition.value = Math.max(gestureState.dy, 0);
      const deltaY = e.translationY - startScrollPosition.value;

      // for animation to pull down
      pullDownPosition.value = Math.max(Math.min(maxDistance, deltaY), 0);


      // check if ready to refresh
      if (
        pullDownPosition.value >= maxDistance / 2 &&
        isReadyToRefresh.value === false
      ) {
        isReadyToRefresh.value = true;
        console.log('Ready to refresh');
      }

      if (
        pullDownPosition.value < maxDistance / 2 &&
        isReadyToRefresh.value === true
      ) {
        isReadyToRefresh.value = false;
        console.log('Will not refresh on release');
      }      
    }
  })
  .onEnd(() => {
    console.log(`gesture end`);
  })
  .onFinalize(() => {
    console.log(`gesture finalize`);
    //pullDownPosition.value = withTiming(0, { duration: 180 });

    runOnJS(onGestureRelease)();
  })  
  ;  

  const nativeGesture = Gesture.Native();

  const composedGestures = Gesture.Simultaneous(
    scrollPanGesture,
    nativeGesture,
  );  





  // ---------------------------------------------------------------------------
  // demo fetch data

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => setData(json))
  },[])  

  const filteredData = data.filter((item, index) => {
    if(filterText == '') return true;  
    
    if(filterText == 'ion') 
      return item.title.includes('ion');
    
    if(filterText == 'ia')
      return item.title.includes('ia');
    
    return false;
  })

  if(data.length <= 0) return (
    <View><Text>Loading</Text></View>
  )  

  const AnimatedFontAwesomeIcon = Animated.createAnimatedComponent(FontAwesome);

  return (    

      <Fragment>

      <View className='flex flex-row gap-2 p-2 m-2 items-center justify-center' > 
          <Pressable onPress={() => setFilterText('')}>
            
            <View className='bg-red-300 p-2 m-2 rounded-lg justify-center items-center flex flex-row'>
              <MaterialCommunityIcons name="select-all" size={24} color="black" />
              <Text>all</Text>
            </View>
            </Pressable>              
          <Pressable onPress={() => setFilterText('ion')}>
          <View className='bg-red-300 p-2 m-2 rounded-lg justify-center items-center flex flex-row'>
            <MaterialIcons name="extension" size={24} color="black" />
            <Text>ion</Text>
          </View>
          </Pressable>
          <Pressable onPress={() => setFilterText('ia')}>
          <View className='bg-red-300 p-2 m-2 rounded-lg justify-center items-center flex flex-row'>
            <MaterialIcons name="mediation" size={24} color="black" />
            <Text>ia</Text>
          </View>  
          </Pressable>

      </View>
      <View
        style={{flex: 1, backgroundColor: '#f0f0f0'}}
        //{...panResponderRef.current.panHandlers}
      >
      {/* <Animated.View style={[styles.refreshContainer, refreshContainerStyles]}>
        <Animated.Image
          source={refreshIcon}
          style={[styles.refreshIcon, refreshIconStyles]}
        />
      </Animated.View>         */}

      
        <Animated.View style={[{          
          width: '100%',          
          justifyContent: 'center',
          alignItems: 'center',   
          position: 'absolute',     
        }, refreshContainerStyles]}>
        <AnimatedFontAwesomeIcon name="refresh" size={24} color="black"           
          style={[refreshIconStyles]}
        />
        </Animated.View>

      <GestureDetector gesture={composedGestures}>

      <Animated.FlatList   
        // refreshControl={
        //   <RefreshControl
        //     refreshing={false}
        //     onRefresh={() => console.log('refreshing')}
        //   />
        // }

        scrollEnabled={true}
        style={[pullDownStyles]}
        onScroll={scrollHandler}     
        scrollEventThrottle={16} // Good practice for smooth performance
        data={filteredData}

        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReached={() => console.log('end reached need to load more data')}
        keyExtractor={(item) => item.id.toString()}
        stickyHeaderIndices={[0,10,20]}
        renderItem={({item, index}) => (
          <Text className={clsx(`p-1 m-1 `, [0,10,20].includes(index) ?  'bg-blue-200' : 'bg-gray-200')}
            key={index}
          >{item.title}</Text>
        )}
      />
      </GestureDetector>
      </View>

      

      </Fragment>
  )
}

export default FlatListScreen
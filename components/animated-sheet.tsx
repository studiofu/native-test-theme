import { View, Text, Pressable } from 'react-native'
import React, { Fragment, useEffect } from 'react'
import { StyleSheet, Dimensions } from 'react-native';


import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  ReduceMotion,
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';


interface AnimatedSheetProps {
  isOpen: boolean;
  onClose: () => void;
  backdropOnPress: () => void;
  children: React.ReactNode;
}



const AnimatedSheet = (
  { children, isOpen, backdropOnPress }: AnimatedSheetProps
) => {

  const { width, height } = Dimensions.get('screen');
  const h = height-100;

  // offset for the sheet
  const offset = useSharedValue(0);
  const slideIn = useSharedValue(0);


  // convert Pressable to AnimatedPressable
  const PressAnimated = Animated.createAnimatedComponent(Pressable);

  useEffect(() => {
    // function onOpen() {
    //   if (isOpen) {
    //     offset.value = 0;
    //     console.log('offset value: 0');
    //   }
    // }    
    // onOpen();
    offset.value = 0;


    // control manual animation of slide in from bottom
    if (isOpen) {
      slideIn.value = 1;
    }else {
      slideIn.value = 0;
    }    
    
  }, [isOpen]);  

  const translateY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offset.value,
        },
      ],
    };
  }, []);  



  // slide in from bottom animation ( manual animation)

  const slideInAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedTranslateY = interpolate(slideIn.value, [0,1], [h, 0]);
    return {
      transform: [{ translateY: withTiming(interpolatedTranslateY, 
        {          
          duration: 300,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System,          

        })}],      
    };
  });
  

  
  if (!isOpen) {
    return <Fragment />;
  }



  

  const panGesture = Gesture.Pan()
  .onChange(event => {
    // Update the offset based on the gesture's change in Y position.
    console.log(event.changeY)
    const offsetDelta = event.changeY + offset.value;
    const newOffset = Math.min(Math.max(offsetDelta, 0), h);
    offset.value = newOffset;
  })
  .onFinalize(() => {
    // Determine whether to close or open the sheet based on its final position.

    // if the offset is greater than one third of the height, then close the sheet
    if (offset.value < h / 3) {
      // target value is 0, with a spring animation and a velocity of 10.
      // this will cause the sheet to snap to the top.
      offset.value = withSpring(0, { velocity: 10 });
    } else {
      // target value is the height of the sheet (i.e. to close the sheet)
      offset.value = withTiming(h, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      }, 
        isFinished => {
          
          if (isFinished) {            
            runOnJS(backdropOnPress)();            

          }          
        }
      );
    }
    
  });

  return (
    <Fragment>
      <PressAnimated
        // backdrop
        style={StyleSheet.absoluteFill}
        className='bg-black/50 z-10'
        entering={FadeIn} // animation of pressing backdrop to fade in /out
        exiting={FadeOut}
        onPress={() => {
          backdropOnPress();
          console.log('offset value: ', offset.value)
        }}
      >

        <GestureDetector gesture={panGesture}>
          <Animated.View className={`absolute w-full bottom-0 bg-white`}              
          

            //entering={SlideInDown.springify().damping(15)}    
            exiting={SlideOutDown}
            style= {[{
              height: h,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              zIndex: 15
            }, translateY, slideInAnimatedStyle]}
          >
            <View className='w-[50px] h-[5px] bg-gray-400 mt-1 rounded-md self-center'>

            </View>
            <View>
              <Pressable onPress={() => offset.value=200}><Text className='m-2 p-2'> Test 200</Text></Pressable>
              <Pressable onPress={() => offset.value=500}><Text className='m-2 p-2'> Test500</Text></Pressable>
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </PressAnimated>
    </Fragment>
  )
}


export default AnimatedSheet
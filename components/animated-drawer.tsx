import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React, { Fragment, useEffect } from 'react'
import Animated, { Easing, FadeIn, FadeOut, ReduceMotion, SlideOutDown, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


interface AnimatedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  backdropOnPress: () => void;
  children: React.ReactNode;
}



const AnimatedDrawer = (
  { children, isOpen, backdropOnPress }: AnimatedDrawerProps  
) => {

  // convert Pressable to AnimatedPressable
  const PressAnimated = Animated.createAnimatedComponent(Pressable);

  const { width, height } = Dimensions.get('screen');  

  const insets = useSafeAreaInsets();

  const w = width-100;

  const [isDrawOpen, setIsDrawOpen] = React.useState(isOpen);
  

  // shared value
  const slideInLeft = useSharedValue(0);
  const offset = useSharedValue(0);

  const offsetTranslateX = useAnimatedStyle(() => {
    return {  
      transform: [
        {
          translateX: offset.value
        }
      ]
    }
  });
  

  const slideInLeftTranslateX = useAnimatedStyle(() => {

    const interpolation = interpolate(slideInLeft.value, [0, 1], [-w, 0]);

    return {
      transform: [
        {
          translateX: withTiming(interpolation,
            {
              duration: 300,
              easing: Easing.inOut(Easing.quad),
              reduceMotion: ReduceMotion.System,                
            },
            // callback when animation is finished
            (isFinished) => {
              if (isFinished) {
                if(interpolation <= -w) {
                  runOnJS(backdropOnPress)();
                  runOnJS(setIsDrawOpen)(false);
                }
              }              
            }
          )
        }
      ]
    }

  });

  useEffect(() => {    
    
    if (isOpen) {
      offset.value = 0;
      // set state to true so that the drawer will be rendered
      setIsDrawOpen(true);
      // trigger animation
      slideInLeft.value = 1;   
                
      console.log(`offset1: `, offset.value);

    } else {
      // trigger animation but not yet close
      // set state to false after animation complete.
      // inside the animation callback
      // runOnJS(setIsDrawOpen)(false);
  
      slideInLeft.value = 0;

      console.log(`offset2: `, offset.value);
    }    
  }, [isOpen])

  

  const panGesture = Gesture.Pan()
  .onChange(event => {
  // Update the offset based on the gesture's change in Y position.

  let newOffset = offset.value + event.changeX;
    newOffset = Math.min(newOffset, 0);
    newOffset = Math.max(newOffset, -w);
    offset.value = newOffset;
  })
  .onFinalize(() => {
  // Determine whether to close or open the sheet based on its final position.

  // if the offset is greater than one third of the height, then close the sheet

    console.log(`offset: `, offset.value);

    if(offset.value > (-w+w/3*2)) {      
      offset.value = withSpring(0, { velocity: 10 });
    }else {
      offset.value = withTiming(-w, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      }, 
        isFinished => {
          if (isFinished) {            
            runOnJS(setIsDrawOpen)(false);
            runOnJS(backdropOnPress)();
            
          }          
        }
      );
    }

  });  



  if (!isDrawOpen) {
    return <Fragment />
  }


  
    

  return (
    <>    
    <Fragment>
      <PressAnimated style={StyleSheet.absoluteFill} 

        entering={FadeIn}
        exiting={FadeOut}

        onPress={() => {
          //slideInLeft.value = 0;
          backdropOnPress();          
        }}       
      
        className={`bg-black/50 bg-opacity-50 z-10`}
      >
        {/** dummy to prevent trigger backdrop press  */}
        <Pressable> 
        <GestureDetector gesture={panGesture}>
        <Animated.View className={`absolute left-0 bg-white h-full`}               
          style={[{
            width: w,
            height: height,
            top: 0,
            left: 0,
            backgroundColor: 'white',
            // shadowColor: "#000",
            // shadowOffset: {
            //   width: 0,
            //   height: 2,
            // },
            // shadowOpacity: 0.75,
            // shadowRadius: 3.84,
            // elevation: 10,
            paddingTop: insets.top,
          },
            slideInLeftTranslateX,
            offsetTranslateX
          ]}
        >
          <Pressable onPress={() => slideInLeft.value = 0}>
            <Text>Inside Close</Text>
          </Pressable>
          {children}        
        </Animated.View>
        </GestureDetector>
        </Pressable>
      </PressAnimated>
    </Fragment>
    
    </>

  )
}

export default AnimatedDrawer
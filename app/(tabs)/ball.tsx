import { View, Text, Pressable} from 'react-native'
import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useFrameCallback, useSharedValue, withSpring } from 'react-native-reanimated';


const Ball = () => {

  const ballRef = useRef(null);

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const startTime = useSharedValue(0);
  const endTime = useSharedValue(0);
  const velocity = useSharedValue({ x: 0, y: 0 } );

  const initialPosition = useSharedValue({ x: 0, y: 0 });
  const isDrag = useSharedValue(false);


  // frame callback to update frame
  const frameCallback = useFrameCallback((frameInfo) => {
    if(frameInfo.timeSincePreviousFrame === null) {
      console.log('First Frame');
    }else {
      console.log(
        `${frameInfo.timeSincePreviousFrame} ms have passed since the previous frame`
      );      

      if(!isDrag.value) {       
        const dx = velocity.value.x * frameInfo.timeSincePreviousFrame / 1000;
        const dy = velocity.value.y * frameInfo.timeSincePreviousFrame / 1000;
  
        offset.value = {
          x: offset.value.x + dx,
          y: offset.value.y + dy,
        };
  
        //need to update start.value
        start.value = {
          x: offset.value.x,
          y: offset.value.y,
        };
  
      }
    }
  }, false)

  const gesture = Gesture.Pan()
  .onBegin(() => {
    isDrag.value = true;
    isPressed.value = true;
    startTime.value = Date.now();
    velocity.value = { x: 0, y: 0 };
  })
  .onUpdate((e) => {
    offset.value = {
      x: e.translationX + start.value.x,
      y: e.translationY + start.value.y,
    };
  })
  .onEnd(() => {

    endTime.value = Date.now();

    const dt = (endTime.value - startTime.value) / 1000;

    console.log(`dt`, dt);
    const dx = offset.value.x - start.value.x;
    const dy = offset.value.y - start.value.y;

    console.log('dx: ', dx);
    console.log('dy: ', dy);

    velocity.value = {
      x: dx / dt,
      y: dy / dt,
    };

    console.log('velocity: ', velocity.value);

    console.log('start value: ', start.value)
    //const { x, y } = ballRef.current?.getBoundingClientRect();

    start.value = {
      x: offset.value.x,
      y: offset.value.y,
    };
    isDrag.value = false;
  })
  .onFinalize(() => {
    isPressed.value = false;
  });
  
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? 'red' : 'blue',
    };
  });
    
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View>
      <Animated.View style={[styles.ball, animatedStyles]} 

        onLayout={ (e) => {
            const layout = e.nativeEvent.layout;
            console.log('layout: ', layout);

            initialPosition.value = {
              x: layout.x,
              y: layout.y,
            };
        }}

      />
      <Pressable onPress={
        () => {
          frameCallback.setActive(!frameCallback.isActive);
        }
      }
        className='absolute right-0 p-2 bg-blue-500 text-white rounded-lg'
      >
        <Text>Press me</Text>
      </Pressable>
    </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    top: 0,
    left: 0,    
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});


export default Ball
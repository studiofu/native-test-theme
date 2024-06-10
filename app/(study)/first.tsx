import { StyleSheet, View } from 'react-native';
import React from 'react'
import { Image } from 'expo-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const First = () => {

  const rotateY = useSharedValue(0);
  const initRotateY = useSharedValue(0);
  
  const rotateX = useSharedValue(0);
  const initRotateX = useSharedValue(0);

  const animatedStyleRotate = useAnimatedStyle(() => {

    return {
      transform: [{
        rotateY: `${rotateY.value}deg`,        
      },
      {
        rotateX: `${rotateX.value}deg`,
      }
    ]
    }
  })

  
  const panGesture = Gesture.Pan() 
  .onBegin((e) => {
    initRotateY.value = rotateY.value;
    initRotateX.value = rotateX.value;
  })
  .onChange((e) => {
    rotateY.value = initRotateY.value + e.translationX;
    rotateX.value = initRotateX.value - e.translationY;
    //console.log(e.translationX)
  })
  .onEnd((e) => {
  })

  return (
    <GestureDetector     
        gesture={panGesture}
    >
    <Animated.View
      style={styles.container}
    >
      <Animated.View style={[{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 20,
        overflow : 'hidden',
      }, StyleSheet.absoluteFill, {
        transform: [
          //{rotate: '45deg'},
          //{rotateZ: '20deg'}
        ]
      },
      animatedStyleRotate
      ]}>

      
        <Image 
          style={styles.image}
          source={require('@/assets/images/beach.jpg')}
          contentFit='cover'
          transition={1000}
        />
      </Animated.View>
    </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});

export default First
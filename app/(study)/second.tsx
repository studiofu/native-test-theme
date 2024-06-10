import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import { addCurve, createPath,close, serialize } from 'react-native-redash';


const Second = () => {

  const { width, height } = Dimensions.get("window");


  return (
    <View>
      <Text>Second</Text>
      <Svg width={width} height={height}>

      <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
      <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
      </Svg>
    </View>
  )
}

export default Second
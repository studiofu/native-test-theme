import { View, Text, Dimensions, Button} from 'react-native'
import React, { useEffect, useRef } from 'react'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import { curveBasis, line } from 'd3-shape';
import { addCurve, createPath, close, serialize, addLine, parse, interpolatePath } from 'react-native-redash';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';


const NUM_TABS = 4;
const SCALE = 0.7;
const TAB_BAR_HEIGHT = 64;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


// if you want to animate path, you need to create animated path component
const AnimatedPath = Animated.createAnimatedComponent(Path);


// steps
// 1. create a function that generates path data (generateTabShapePath) in svg string format
// 2. create an array of path data (shape) using generateTabShapePath, the array is used to interpolate path data in the animation
// 3. create animated props using useAnimatedProps hook



type GenerateTabShapePath = (
  position: number,
  adjustedHeight: number,
) => string;

const generateTabShapePath: GenerateTabShapePath = (
  position,
  adjustedHeight,
) => {
  const adjustedWidth = SCREEN_WIDTH / NUM_TABS;
  const tabX = adjustedWidth * position;

  //const lineGenerator = line().curve(curveBasis);
  const lineGenerator = line().curve(curveBasis);
  const tab = lineGenerator([
    [tabX - 100 * SCALE, 5],
    [tabX - (65 + 35) * SCALE, 0],
    [tabX - (50 - 10) * SCALE, -6 * SCALE],
    [tabX - (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 10) * SCALE, -6 * SCALE],
    [tabX + (65 + 35) * SCALE, 0],
    [tabX + 100 * SCALE, 0],
  ]);  

  // console.log('tab:', tab)
  // console.log('parse tab', parse(`${tab}`));

  // this is svg path data
  return `${tab}`;
};

const shape = [
  parse(generateTabShapePath(0.5, 70)),
  parse(generateTabShapePath(1.5, 70)),
  parse(generateTabShapePath(2.5, 70)),
  parse(generateTabShapePath(3.5, 70)),
  parse(generateTabShapePath(4.5, 70)),
]


const SvgPage = () => {

  const ref = useRef(null);

  const path = createPath({ x: 100, y: 100});
  addCurve(path, {
    c1: { x: 200, y: 200 },
    c2: { x: 300, y: 300 },
    to: { x: 100, y: 50 }
  });
  close(path);  
  const d = serialize(path);

  console.log('d:', d);

  useEffect(() => {
    if(ref.current) {
      // const svgElement = d3.select(ref.current)
      // svgElement.append("circle")
      //   .attr("cx", 150)
      //   .attr("cy", 70)
      //   .attr("r",  50)
    }
  }, [ref])  



  // you need to pass the animated path data as props to the animated path component
  const animatedProps = useAnimatedProps(() => {
    const currentPath = createPath({ x: 0, y: 500});
    addLine(currentPath, { x: 100, y: 600 });
    addLine(currentPath, { x: 200, y: 600 });    
    addLine(currentPath, { x: 300, y: 500 });    
    close(currentPath);
    const serializedPath = serialize(currentPath);
    return {
      d: `${serializedPath}`,
    }
  });


  // animation control value
  const progress = useSharedValue(0);

  
  const aniamtedTab = useAnimatedProps(() => {

    // shape is array of path data created by generateTabShapePath
    const currentPath = interpolatePath(
      progress.value,
      Array.from({length: shape.length}, (_, index) => index + 1),
      shape,
    );

    // output currentPath is string
    return {
      d: `${currentPath}`,
    }    
  });

  return (
    <View className='flex w-full h-full'>
      <Button title="Left" onPress={() => {
        progress.value = withTiming(progress.value - 1);
      } } />
      <Button title="Right" onPress={() => {
        progress.value = withTiming(progress.value + 1);
      } } />
      <Svg>

      <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
      <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2"   fill="yellow" />



      <Path d={d} fill="cyan" />
      <Path d={generateTabShapePath(2.5, 100)} fill={"red"} />

      {/* <AnimatedPath d={serializedPath} fill={"pink"} /> */}
      <AnimatedPath fill={"pink"}       
        animatedProps={animatedProps}
      />
      
      </Svg>

      <View style={{
        width: SCREEN_WIDTH,
        height: TAB_BAR_HEIGHT,
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: 'blue',
      }}>
        <Svg>
        
          {/* <AnimatedPath d={generateTabShapePath(2.5, 80)} fill={"red"} /> */}
          <AnimatedPath  fill={"red"}
          
            animatedProps={aniamtedTab}
          />

          {/* <AnimatedPath fill={"red"} 
            animatedProps={animatedProps}
          /> */}
        </Svg>
      </View>      
      
    </View>
  )
}

export default SvgPage
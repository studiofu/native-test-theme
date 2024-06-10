import { Pressable, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, Image } from 'react-native';
import '../global.css';
import { Theme } from '../themes';
import { ThemeSwitcher } from '../themes/theme-switcher';
import { Link, useRouter } from 'expo-router';
import CustomButton from '@/components/custom-button';
import AnimatedSheet from '@/components/animated-sheet';
import { useState } from 'react';
import AnimatedDrawer from '@/components/animated-drawer';
import { StyledView } from '@/components/styled-component';
import CircleButton from '@/components/circle-button';
import { FlatList } from 'react-native-gesture-handler';


export default function App() {
  const router = useRouter();

  const [open , setOpen] = useState(false);

  const [isDrawOpen, setIsDrawOpen] = useState(false);


  // env:
  // NODE_ENV=test npx expo start --config app/app.json
  // NODE_ENV=test npx expo start

  return (
    
      <View className="flex-1 items-center justify-center bg-secondary">
        <Text>Env: {process.env.EXPO_PUBLIC_ENV}</Text>
        <TouchableOpacity           
          onPress={() => {
          router.push('dummy');          
        }}>
          <View
            className='m-2 p-2 bg-blue-500 text-white font-semibold rounded-lg'
            style={{                                       
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.75,
              shadowRadius: 3.84,
              elevation: 10, 
            }}
          >
          <Text
            className='  text-white font-semibold'
          >Go Dummy</Text>
          </View>
        </TouchableOpacity>


        <Pressable          
          onLongPress={() => {
            alert('Long Pressed');
          }}
          onPress={
            () => {
              router.push('home');
            }
          }
        >
          <View
            style={{                
              padding: 10,
              margin: 10,
              borderRadius: 10,
              width: 200,
              
              backgroundColor: '#f9f9f9',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,              
            }}
          >
            <Text style={{
              textAlign: 'center',            
            }}> Tabs</Text>
          </View>

        </Pressable>
        {/* <Link href="home" className='h-20 w-20 bg-red-400 items-center justify-center text-center'>Go Tabs</Link> */}

        <View className='flex flex-row'>
        <Link href="svg-page">
          <View className='p-2 m-2 bg-red-200 rounded-lg'>
            <Text>SVG</Text>
          </View>
        </Link>
        <CircleButton title='SVG' onPress={() => {router.push('svg-page')}} />
        </View>

        <Pressable          
          onLongPress={() => {
            alert('Long Pressed');
          }}
          onPress={
            () => {
              router.push('card');
            }
          }
        >
            <Text
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 10,
                width: 200,
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.75,
                shadowRadius: 3.84,
                elevation: 10,              
              }}
            > Card</Text>
        </Pressable>        

        <CustomButton title='Animated Modal' onPress={() => {
          setOpen(!open);
        }} />
                
        <CustomButton title='Animated Drawer' onPress={() => {
          setIsDrawOpen(!isDrawOpen);
        }} />

        <Pressable onPress={() => {router.push('first');}} >

          <View
            style={{                
              padding: 10,
              margin: 10,
              borderRadius: 10,
              width: 200,
              
              backgroundColor: '#f9f9f9',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,              
            }}
          >
            <Text style={{
              textAlign: 'center',            
            }}> Study</Text>
          </View>        
          </Pressable>

        <StyledView color='#003333'>
          <Text>Hi</Text>
          <ThemeSwitcher />
        </StyledView>

        


        {/**animated modal */}
        <AnimatedSheet 
          isOpen={open}
          onClose={() => setOpen((prev) => (!prev))}
          backdropOnPress={() => { setOpen(false)}}
        >
            <TouchableWithoutFeedback>
            <View className='z-20 h-full w-full items-center justify-center'>
              <Text className='text-black'>
                This is the animated Sheet
              </Text>
              <Pressable onPress={() => setOpen(false)}>
                <Text>Close</Text>
              </Pressable>
            </View>
            </TouchableWithoutFeedback>
        </AnimatedSheet>

        <AnimatedDrawer 
          isOpen={isDrawOpen}
          onClose={() => setIsDrawOpen(false)}
          backdropOnPress={() => setIsDrawOpen(false)}
        >

          <Text> this is drawer</Text>
          
          
          <TouchableWithoutFeedback>
          <FlatList 
            numColumns={2}
            scrollEnabled={true}
            ListFooterComponent={<View style={{height: 100}}>
              <Text>ThIS IS FOOTER</Text></View>}
            data={Array.from({length: 20})}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({index}) => (
              <Image source={{uri: `https://picsum.photos/id/${index+100}/200/300`}} 
                style={{
                  width: 100,
                  aspectRatio: 1,
                  margin: 10,
                  borderRadius: 10,                  
                }}
              />
            )}            
          
          />       
          </TouchableWithoutFeedback>
           

          {/* {            
            Array.from({length: 10}).map((_, index) => (
              
                <Image key={index} source={{uri: `https://picsum.photos/id/${index}/200/300`}}                  
                  style={{
                    width: 200,
                    height: 200,
                    margin: 10,
                    borderRadius: 10,                  
                  }}
                />
              
            ))            
          } */}
          

          <Pressable onPress={() => setIsDrawOpen(false)} className='bg-red-500'>
            <Text>Close</Text>
          </Pressable>

        </AnimatedDrawer>

        
      </View>
    
  );
}
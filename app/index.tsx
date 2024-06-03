import { Pressable, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import '../global.css';
import { Theme } from '../themes';
import { ThemeSwitcher } from '../themes/theme-switcher';
import { Link, useRouter } from 'expo-router';
import CustomButton from '@/components/custom-button';
import AnimatedSheet from '@/components/animated-sheet';
import { useState } from 'react';
import AnimatedDrawer from '@/components/animated-drawer';


export default function App() {
  const router = useRouter();

  const [open , setOpen] = useState(false);

  const [isDrawOpen, setIsDrawOpen] = useState(false);


  return (
    
      <View className="flex-1 items-center justify-center bg-secondary">
        <TouchableOpacity           
          onPress={() => {
          router.push('dummy');          
        }}>
          <Text          
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
          >Go Dummy</Text>
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
            > Tabs</Text>
        </Pressable>
        {/* <Link href="home" className='h-20 w-20 bg-red-400 items-center justify-center text-center'>Go Tabs</Link> */}

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


        <Text className="text-primary text-lg font-semibold">
          Open up App.tsx to start working on your app!
        </Text>        


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
          <Text> this is drawer</Text>
          <Text> this is drawer</Text>
          <Text> this is drawer</Text>
          <Text> this is drawer</Text>
          <Pressable onPress={() => setIsDrawOpen(false)} className='bg-red-500'>
            <Text>Close</Text>
          </Pressable>

        </AnimatedDrawer>

        <ThemeSwitcher />
      </View>
    
  );
}
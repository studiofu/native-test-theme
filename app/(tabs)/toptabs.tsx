import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}



const TopTabs = () => {
  const Tab = createMaterialTopTabNavigator();

  //return ( <View></View>)
  return (
    <NavigationContainer
      independent={true}     
    >
      <Tab.Navigator        
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarPressColor:'transparent',
        
      }}
      >
        <Tab.Screen name="Home" component={HomeScreen}             
          options={{            
            tabBarLabel: 'Homx',
            tabBarItemStyle: { width: 'auto' },
            //tabBarPressColor:'transparent'
            }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} 

          options={{          
            tabBarItemStyle: { width: 'auto' },
          }}        
        />
        <Tab.Screen name="xxxx" component={SettingsScreen} 
          options={{          
            tabBarItemStyle: { width: 'auto' }
          }}           
        />
        <Tab.Screen name="bbbb" component={SettingsScreen} 
          options={{          
            tabBarItemStyle: { width: 'auto' }
          }}               
        />
        <Tab.Screen name="cccc" component={SettingsScreen} 
          options={{          
            tabBarItemStyle: { width: 'auto' }
          }}               
        />
        <Tab.Screen name="dddd" component={SettingsScreen} 
          options={{          
            tabBarItemStyle: { width: 'auto' }
          }}               
        />
        <Tab.Screen name="eeee" component={SettingsScreen} 
          options={{          
            tabBarItemStyle: { width: 'auto' }
          }}               
        />

        <Tab.Screen name="ffff" component={SettingsScreen} 
          options={{          
            tabBarItemStyle: { width: 'auto' }
          }}               
        />

        <Tab.Screen name="gggg" component={SettingsScreen} 
          options={{          
            tabBarItemStyle: { width: 'auto' }
          }}               
        />

        <Tab.Screen name="hhhh" component={SettingsScreen} 
          options={{          
            tabBarItemStyle: { width: 'auto' }
          }}               
        />                        
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TopTabs
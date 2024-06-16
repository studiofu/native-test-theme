import { View, Text, AppState } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'user-activity';

type UserActivityProps = {
 children: React.ReactNode
}



// check if user is active or inactive
const UserActivity = (
  {children}: UserActivityProps
) => {

  const appState = React.useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      sub.remove();
    };
  }, []);

  const _handleAppStateChange = async (nextAppState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      const state = await AsyncStorage.getItem(KEY);

      console.log(state);
      let elapsed = 0;

      if(state){
        const {time} = JSON.parse(state);
        elapsed = Date.now() - time;
      }

      console.log('elapsed: ', elapsed);

    }else if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
      const now = Date.now();
      console.log("App has gone to the background!");
      console.log('now', now);
      await AsyncStorage.setItem(KEY, JSON.stringify({active: false, time: now}));
    }
    appState.current = nextAppState;
    console.log("AppState", appState.current);
  };


  return (
    <>
    {children}
    </>
  )
}

export default UserActivity
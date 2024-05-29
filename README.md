## How to use Nativewind theme


follow the links below to get started with the Nativewind theme

https://docs.expo.dev/tutorial/create-your-first-app/
https://docs.expo.dev/routing/installation/#manual-installation
https://www.nativewind.dev/v4/getting-started/expo-router


need to change tailwind.config.js to add css variable

need to create react context for theme handling ThemeProviderActions and ThemeProviderValues

need to create the theme theme-config.js

apply the theme to native View

```tsx

  const {
    theme
  } = useThemeContextValues();
  
  return (
    <View 
      style={Themes[theme]}
      className='flex items-center justify-center h-full w-full'>
      <Text className='text-dummy'>Dummy</Text>
    </View>
  )

```


change the theme 

```tsx

   <Pressable
      onPress={() => handleThemeSwitch('light')}
      className="p-2 rounded-lg items-center bg-outstand justify-center w-40 h-36 shadow-lg shadow-black"
   >
      <Text className="text-lg font-semibold text-primary">Light</Text>
   </Pressable>

   <Pressable
      onPress={() => handleThemeSwitch('dark')}
      className="p-2 rounded-lg items-center bg-outstand justify-center w-40 h-36 shadow-lg shadow-black"
   >
      <Text className="text-lg font-semibold text-primary">Dark</Text>
   </Pressable>


```
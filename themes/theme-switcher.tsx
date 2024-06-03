import { Pressable, Text, View } from 'react-native';
import { useThemeContextActions } from '.';

export function ThemeSwitcher() {
  const { handleThemeSwitch } = useThemeContextActions();
  return (
    
    <View className="p-5 flex flex-col flex-wrap gap-y-5 w-full justify-evenly">
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

      <Pressable
        onPress={() => handleThemeSwitch('xmas')}
        className="p-2 rounded-lg items-center bg-outstand justify-center w-40 h-36 shadow-lg shadow-black"
      >
        <Text className="text-lg font-semibold text-primary">Christmas</Text>
      </Pressable>

      <Pressable
        onPress={() => handleThemeSwitch('halloween')}
        className="p-2 rounded-lg items-center bg-outstand justify-center w-40 h-36 shadow-lg shadow-black"
      >
        <Text className="text-lg font-semibold text-primary">Halloween</Text>
      </Pressable>
    </View>
  );
}
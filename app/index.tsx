import { Text, View } from 'react-native';
import '../global.css';
import { Theme } from '../themes';
import { ThemeSwitcher } from '../themes/theme-switcher';
import { Link } from 'expo-router';
export default function App() {
  return (
    <Theme>
      <View className="flex-1 items-center justify-center bg-secondary">
        <Text className="text-primary text-lg font-semibold">
          Open up App.tsx to start working on your app!
        </Text>
        <Text className='text-dummy'>
          ??
        </Text>

        <Link href="dummy" >Go Dummy</Link>

        <ThemeSwitcher />
      </View>
    </Theme>
  );
}
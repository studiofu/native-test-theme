import { Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { Theme } from '../themes';
import { ThemeSwitcher } from '../themes/theme-switcher';
import { Link, useRouter } from 'expo-router';
export default function App() {
  const router = useRouter();
  return (
    <Theme>
      <View className="flex-1 items-center justify-center bg-secondary">
        <TouchableOpacity onPress={() => {
          router.push('dummy');
        }}>
          <Text>Go Dummy</Text>
        </TouchableOpacity>
        
        <Link href="home" className='h-20 w-20 bg-red-400 items-center justify-center text-center'>Go Tabs</Link>


        <Text className="text-primary text-lg font-semibold">
          Open up App.tsx to start working on your app!
        </Text>        

        <ThemeSwitcher />
      </View>
    </Theme>
  );
}
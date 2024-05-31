import { StatusBarStyle } from 'expo-status-bar';
import { vars } from 'nativewind';

export type ThemesVariant = 'light' | 'xmas' | 'dark' | 'halloween';

export const Themes = {
  light: vars({
    '--color-primary': '#ff0000',
    '--color-secondary': '#ffffffff',
    '--color-outstand': '#2288dd',
    '--color-dummy' : '#ff00ff'
  }),
  dark: vars({
    '--color-primary': '#ffffff',
    '--color-secondary': '#0D0606',
    '--color-outstand': '#552288',
    '--color-dummy' : '#ff00ff'
  }),
  xmas: vars({
    '--color-primary': '#fff',
    '--color-secondary': '#3225de',
    '--color-outstand': '#0ca90c',
    '--color-dummy' : '#ffffff',
  }),
  halloween: vars({
    '--color-primary': '#000000',
    '--color-secondary': '#5522dd',
    '--color-outstand': '#ffcc00',
    '--color-dummy' : '#ffffff',
  }),
};

type StatusBarThemeStyle = {
  [keys in ThemesVariant]: {
    style: StatusBarStyle;
    background: string;
  };
};

export const StatusBarTheme: StatusBarThemeStyle = {
  light: {
    style: 'dark',
    background: '#fff',
  },
  dark: {
    style: 'light',
    background: '#000',
  },
  xmas: {
    style: 'light',
    background: '#3225de',
  },
  halloween: {
    style: 'dark',
    background: '#52d',
  },
};
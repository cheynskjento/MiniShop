import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const LightNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f2f2f2',
    card: '#ffffff',
    text: '#000000',
    border: '#dddddd',
    primary: '#6200ee',
  },
};

export const DarkNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    border: '#333333',
    primary: '#bb86fc',
  },
};

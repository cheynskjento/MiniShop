import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const useTheme = () => {
  const dark = useSelector((state: RootState) => state.theme.dark);

  const colors = {
    background: dark ? '#121212' : '#f2f2f2',
    card: dark ? '#1e1e1e' : '#ffffff',
    text: dark ? '#ffffff' : '#000000',
    secondaryText: dark ? '#aaaaaa' : '#555555',
    button: dark ? '#bb86fc' : '#6200ee',
    border: dark ? '#333333' : '#dddddd',
    danger: '#e53935',
    shadow: '#000',
  };

  return { dark, colors };
};

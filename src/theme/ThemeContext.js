import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'react-native';
import {lightColors, darkColors} from './colors'; // Make sure this path is correct

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('dark');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('APP_THEME');
      setThemeMode(storedTheme || themeMode);
    };
    loadTheme();
  }, [systemScheme]);

  const toggleTheme = async () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    await AsyncStorage.setItem('APP_THEME', newTheme);
  };

  const theme = themeMode === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{theme, themeMode, setThemeMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

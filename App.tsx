/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import RegisterScreen from './components/screens/RegisterScreen'
import LoginScreen from './components/screens/LoginScreen'
import  useAuthStore from './components/store/authStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  }
})
// tanstack query ke liye client create krna padta h jisme options de skte h jaise stale time retry etc
// accha ise hota kya h ki jab bhi hum koi API call krte h to wo data ko cache kr leta h aur jab tak wo data stale nahi hota tab tak wo cache se hi data de deta h isse performance improve hoti h aur unnecessary API calls nahi hoti
// QueryClientProvider iske andar mene REgsiterScreen ko wrap kr diya taki wo query client ke sare features use kr ske
// isse kya hota h ki jab bhi RegisterScreen me koi API call krte h to wo query client ke features use kr skta h jaise caching loading error handling etc
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    
<NavigationContainer>
  <Stack.Navigator initialRouteName="Register" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
</NavigationContainer>
        
    </QueryClientProvider>
  )
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './context/AuthContextManager'
import { useContext } from 'react';

// import screens
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  const { authUser } = useContext(AuthContext)

  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash' >

            <Stack.Screen
              name='Splash'
              component={SplashScreen}
            />

            <Stack.Screen
              name='Login'
              component={LoginScreen}
            />

            <Stack.Screen
              name='CreateAccount'
              component={CreateAccountScreen}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});

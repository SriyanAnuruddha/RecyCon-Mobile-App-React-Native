import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContextManager'
import { useContext } from 'react';

// import screens
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen'
import SellerHomeScreen from '../screens/SellerHomeScreen'
import BuyerHomeScreen from '../screens/BuyerHomeScreen'
import PostItemScreen from '../screens/PostItemScreen';

const Stack = createNativeStackNavigator()

export default function ProtectedRoutes() {
    const { authUser } = useContext(AuthContext)

    const ScreensComponents = (authUser) => {
        if (authUser === null) {
            return (
                <>
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
                </>
            );
        } else if (authUser.accountType == "seller") {
            return (
                <>
                    <Stack.Screen
                        name='SellerHome'
                        component={SellerHomeScreen}
                    />
                    <Stack.Screen
                        name='PostItemScreen'
                        component={PostItemScreen}
                    />
                </>
            );
        } else if (authUser.accountType == "buyer") {
            return (
                <Stack.Screen
                    name='BuyerHome'
                    component={BuyerHomeScreen}
                />
            );
        }
    };

    return (
        <NavigationContainer>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash' >
                    {ScreensComponents(authUser)}
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
});

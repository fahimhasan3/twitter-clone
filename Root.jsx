import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';

import Home from './screens/Home';
import NewTweet from './screens/NewTweet';
import Tweet from './screens/Tweet';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Search from './screens/Search';
import Notification from './screens/Notification';
import { AuthContext } from './context/AuthProvider';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerBackTitleVisible: false
        }}>
            <Stack.Screen name="Tab" component={TabNavigator}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name="New Tweet" component={NewTweet} options={{
                title: ''
            }} />
            <Stack.Screen name="Tweet" component={Tweet} options={{
                title: ''
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{
                title: ''
            }} />
        </Stack.Navigator>
    );
}

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackTitleVisible: false
        }}>
            <Stack.Screen name="Login" component={LoginScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name="Register" component={RegisterScreen}
                options={{
                    headerShown: false
                }} />
        </Stack.Navigator>
    );
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false
        }}>
            <Tab.Screen name='Home1' component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen name='Search' component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen name='Notifications' component={Notification}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color} />
                    ),
                }} />
        </Tab.Navigator>
    )
}

export default function Root() {
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        SecureStore.getItemAsync('user')
            .then(userString => {
                if (userString) {
                    setUser(JSON.parse(userString));
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' color='gray' />
            </View>
        );
    }

    return (
        <>
            {user ? (
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName='Home'>
                        <Drawer.Screen name="Home" component={HomeStackNavigator} />
                        <Drawer.Screen name="Settings" component={Settings} />
                    </Drawer.Navigator>
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                    <AuthStackNavigator />
                </NavigationContainer>
            )}
        </>
    );
}
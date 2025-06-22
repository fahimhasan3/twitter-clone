import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './screens/Home';
import NewTweet from './screens/NewTweet';
import Tweet from './screens/Tweet';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Search from './screens/Search';
import Notification from './screens/Notification';

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

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}
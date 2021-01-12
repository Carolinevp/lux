import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import UserProfile from './Screens/UserProfile';
import MovieDetails from './Screens/MovieDetails';
import AddToList from './Screens/AddToList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './Components/BottomTabBar';
import Discover from './Screens/Discover';
import Search from './Screens/Search';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          // headerShown: false,
          gestureEnabled: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddToList"
        component={AddToList}
        options={{
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

const DiscoverNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="AddToList" component={AddToList} />
    </Stack.Navigator>
  );
};

const AllTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="UserProfile" component={MainStackNavigator} />
      <Tab.Screen name="Discover" component={DiscoverNavigator} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AllTabs" component={AllTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="UserProfile" component={UserProfile} />
//         <Stack.Screen name="MovieDetails" component={MovieDetails} />
//         <Stack.Screen
//           name="AddToList"
//           component={AddToList}
//           // options={({ route }) => ({ title: route.params.movie })}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

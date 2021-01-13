import React, { useState } from 'react';
import { Alert } from 'react-native';
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

const MainStackNavigator = ({
  addToWatchlist,
  watchlist,
  liked,
  disliked,
  favourites,
  addToLikedList,
  addToDislikedList,
  addToFavourites,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile">
        {(props) => (
          <UserProfile
            watchlist={watchlist}
            liked={liked}
            disliked={disliked}
            favourites={favourites}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          gestureEnabled: true,
        }}
      />
      <Stack.Screen name="AddToList">
        {(props) => (
          <AddToList
            addToLikedList={addToLikedList}
            addToDislikedList={addToDislikedList}
            addToWatchlist={addToWatchlist}
            addToFavourites={addToFavourites}
            {...props}
          />
        )}
      </Stack.Screen>
      {/*
        options={{
          gestureEnabled: true,
        }} */}
    </Stack.Navigator>
  );
};

const DiscoverNavigator = ({
  addToWatchlist,
  addToLikedList,
  addToDislikedList,
  addToFavourites,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="AddToList">
        {(props) => (
          <AddToList
            addToWatchlist={addToWatchlist}
            addToLikedList={addToLikedList}
            addToDislikedList={addToDislikedList}
            addToFavourites={addToFavourites}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AllTabs = () => {
  // const [lastSeen, setLastSeen] = useState();
  const [watchlist, setWatchlist] = useState([
    {
      adult: false,
      backdrop_path: '/h3dqQ1uqHsNwIVDufe9AzI7KgVS.jpg',
      genre_ids: [16, 10751],
      id: 749618,
      original_language: 'es',
      original_title: 'El Camino de Xico',
      overview:
        'The peace of a small town is endangered when a corporation wants to destroy the mountain that protects them. A girl named Copi and her best friend Xico, a Xoloitzcuintle dog, will go into the mountains to try to save the town.',
      popularity: 847.803,
      poster_path: '/ssk0Gd27ziryP2OUxprIVhAvr3e.jpg',
      release_date: '2020-11-12',
      title: "Xico's Path",
      video: false,
      vote_average: 7.2,
      vote_count: 28,
    },
  ]);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [favourites, setFavourites] = useState([]);

  function addToWatchlist(movie) {
    if (!watchlist.includes(movie)) {
      setWatchlist(() => [...watchlist, movie]);
    } else {
      Alert.alert('movie already in list');
    }
  }

  function addToLikedList(movie) {
    if (!watchlist.includes(movie)) {
      setLiked(() => [...liked, movie]);
    } else {
      Alert.alert('movie already in list');
    }
  }

  function addToDislikedList(movie) {
    if (!watchlist.includes(movie)) {
      setDisliked(() => [...disliked, movie]);
    } else {
      Alert.alert('movie already in list');
    }
  }

  function addToFavourites(movie) {
    if (!favourites.includes(movie)) {
      setFavourites(() => [...favourites, movie]);
    } else {
      Alert.alert('movie already in list');
    }
  }

  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="UserProfile">
        {(props) => (
          <MainStackNavigator
            addToWatchlist={addToWatchlist}
            watchlist={watchlist}
            addToLikedList={addToLikedList}
            addToFavourites={addToFavourites}
            liked={liked}
            addToDislikedList={addToDislikedList}
            disliked={disliked}
            favourites={favourites}
            {...props}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Discover">
        {(props) => (
          <DiscoverNavigator
            addToWatchlist={addToWatchlist}
            watchlist={watchlist}
            addToLikedList={addToLikedList}
            addToFavourites={addToFavourites}
            liked={liked}
            addToDislikedList={addToDislikedList}
            disliked={disliked}
            {...props}
          />
        )}
      </Tab.Screen>
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

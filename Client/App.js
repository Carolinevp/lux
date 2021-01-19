import React, { useState } from 'react';
import { Image } from 'react-native';
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
import { addMovieToList } from './Services/ApiService';
import apiKey from './assets/apikey';

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
  lastSeen,
  setLiked,
  setLastSeen,
  setWatchlist,
  setDisliked,
  setFavourites,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#fae1dd',
          },
          headerTitleAlign: 'center',
          headerLeft: null,
          headerRight: () => (
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 28.5, height: 31.5, marginRight: 20 }}
              source={require('./assets/logo1.png')}
            />
          ),
        }}
      >
        {(props) => (
          <UserProfile
            watchlist={watchlist}
            liked={liked}
            disliked={disliked}
            favourites={favourites}
            lastSeen={lastSeen}
            setLiked={setLiked}
            setLastSeen={setLastSeen}
            setWatchlist={setWatchlist}
            setDisliked={setDisliked}
            setFavourites={setFavourites}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="MovieDetails"
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: '#fae1dd',
          },
          headerTitleAlign: 'center',
        })}
      >
        {(props) => (
          <MovieDetails
            liked={liked}
            disliked={disliked}
            favourites={favourites}
            watchlist={watchlist}
            {...props}
            options={{
              gestureEnabled: true,
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AddToList"
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: '#fae1dd',
          },
          headerTitleAlign: 'center',
        })}
      >
        {(props) => (
          <AddToList
            addToLikedList={addToLikedList}
            addToDislikedList={addToDislikedList}
            addToWatchlist={addToWatchlist}
            addToFavourites={addToFavourites}
            liked={liked}
            {...props}
            options={({ route }) => ({ title: route.params.title })}
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
  liked,
  disliked,
  favourites,
  watchlist,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{
          headerStyle: {
            backgroundColor: '#fae1dd',
          },
          headerTitleAlign: 'center',
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: '#fae1dd',
          },
          headerTitleAlign: 'center',
        })}
      >
        {(props) => (
          <MovieDetails
            liked={liked}
            disliked={disliked}
            favourites={favourites}
            watchlist={watchlist}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AddToList"
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: '#fae1dd',
          },
          headerTitleAlign: 'center',
        })}
      >
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
  const [lastSeen, setLastSeen] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const addToWatchlist = async (id, movieToAdd) => {
    await addMovieToList(id, movieToAdd, 'watchlist');
    fetch(
      `https://api.themoviedb.org/3/movie/${movieToAdd}?${apiKey}&language=en-US`,
    )
      .then((res1) => {
        return res1.json();
      })
      .then((movie) => {
        setWatchlist([...watchlist, movie]);
        if (!disliked.includes(movie)) {
          disliked.splice(disliked.indexOf(movie), 1);
          setDisliked(() => [...disliked]);
        }
        if (!liked.includes(movie)) {
          liked.splice(liked.indexOf(movie), 1);
          setLiked(() => [...liked]);
        }
        if (!favourites.includes(movie)) {
          favourites.splice(favourites.indexOf(movie), 1);
          setFavourites(() => [...favourites]);
        }
      })
      .catch((err) => {
        console.log('BIG ERROR', err);
      });
  };

  const addToDislikedList = async (id, movieToAdd) => {
    await addMovieToList(id, movieToAdd, 'disliked');
    fetch(
      `https://api.themoviedb.org/3/movie/${movieToAdd}?${apiKey}&language=en-US`,
    )
      .then((res1) => {
        return res1.json();
      })
      .then((movie) => {
        setDisliked([...disliked, movie]);
        if (!watchlist.includes(movie)) {
          watchlist.splice(watchlist.indexOf(movie), 1);
          setWatchlist(() => [...watchlist]);
        }
        if (!liked.includes(movie)) {
          liked.splice(liked.indexOf(movie), 1);
          setLiked(() => [...disliked]);
        }
        if (!favourites.includes(movie)) {
          favourites.splice(favourites.indexOf(movie), 1);
          setFavourites(() => [...favourites]);
        }
        setLastSeen(() => [movie]);
      })
      .catch((err) => {
        console.log('BIG ERROR', err);
      });
  };

  const addToLikedList = async (id, movieToAdd) => {
    await addMovieToList(id, movieToAdd, 'liked');
    fetch(
      `https://api.themoviedb.org/3/movie/${movieToAdd}?${apiKey}&language=en-US`,
    )
      .then((res1) => {
        return res1.json();
      })
      .then((movie) => {
        setLiked(() => [...liked, movie]);
        if (!watchlist.includes(movie)) {
          watchlist.splice(watchlist.indexOf(movie), 1);
          setWatchlist(() => [...watchlist]);
        }
        if (!disliked.includes(movie)) {
          disliked.splice(disliked.indexOf(movie), 1);
          setDisliked(() => [...disliked]);
        }
        setLastSeen(() => [movie]);
      })
      .catch((err) => {
        console.log('BIG ERROR', err);
      });
  };

  const addToFavourites = async (id, movieToAdd) => {
    await addMovieToList(id, movieToAdd, 'favourites');
    fetch(
      `https://api.themoviedb.org/3/movie/${movieToAdd}?${apiKey}&language=en-US`,
    )
      .then((res1) => {
        return res1.json();
      })
      .then((movie) => {
        setFavourites([...favourites, movie]);
        if (!watchlist.includes(movie)) {
          watchlist.splice(watchlist.indexOf(movie), 1);
          setWatchlist(() => [...watchlist]);
        }
        if (!disliked.includes(movie)) {
          disliked.splice(disliked.indexOf(movie), 1);
          setDisliked(() => [...disliked]);
        }
        setLastSeen(() => [movie]);
      })
      .catch((err) => {
        console.log('BIG ERROR', err);
      });
  };

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
            setLiked={setLiked}
            setLastSeen={setLastSeen}
            setWatchlist={setWatchlist}
            setDisliked={setDisliked}
            setFavourites={setFavourites}
            addToDislikedList={addToDislikedList}
            disliked={disliked}
            favourites={favourites}
            lastSeen={lastSeen}
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
            lastSeen={lastSeen}
            favourites={favourites}
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
        <Stack.Screen name="Login">
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AllTabs" component={AllTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useState, useMemo } from 'react';
import { Alert, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import UserProfile from './Screens/UserProfile';
import MovieDetails from './Screens/MovieDetails';
import AddToList from './Screens/AddToList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './Components/BottomTabBar';
import Discover from './Screens/Discover';
import Search from './Screens/Search';
import { UserContext } from './UserContext';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
// import users from './data';

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
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="MovieDetails"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#fae1dd',
          },
          headerTitleAlign: 'center',
        }}
      >
        {(props) => (
          <MovieDetails
            liked={liked}
            disliked={disliked}
            favourites={favourites}
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
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#fae1dd',
          },
          headerTitleAlign: 'center',
        }}
      >
        {(props) => (
          <MovieDetails
            liked={liked}
            disliked={disliked}
            favourites={favourites}
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

  function addToWatchlist(movie) {
    if (!watchlist.includes(movie)) {
      setWatchlist(() => [...watchlist, movie]);
    } else {
      Alert.alert('movie already in list');
    }
  }

  function addToLikedList(movie) {
    if (watchlist.includes(movie)) {
      watchlist.splice(watchlist.indexOf(movie), 1);
      setWatchlist(() => [...watchlist]);
    }
    if (disliked.includes(movie)) {
      disliked.splice(disliked.indexOf(movie), 1);
      setDisliked(() => [...disliked]);
    }
    if (!liked.includes(movie)) {
      setLiked(() => [...liked, movie]);
    } else {
      Alert.alert('movie already in list');
    }
    setLastSeen(() => [movie]);
  }

  function addToDislikedList(movie) {
    if (watchlist.includes(movie)) {
      watchlist.splice(watchlist.indexOf(movie), 1);
      setWatchlist(() => [...watchlist]);
    }
    if (favourites.includes(movie)) {
      favourites.splice(favourites.indexOf(movie), 1);
      setFavourites(() => [...favourites]);
    }
    if (liked.includes(movie)) {
      liked.splice(liked.indexOf(movie), 1);
      setLiked(() => [...liked]);
    }
    if (!disliked.includes(movie)) {
      setDisliked(() => [...disliked, movie]);
    } else {
      Alert.alert('movie already in list');
    }
    setLastSeen(() => [movie]);
  }

  function addToFavourites(movie) {
    if (disliked.includes(movie)) {
      disliked.splice(disliked.indexOf(movie), 1);
      setDisliked(() => [...disliked]);
    }
    if (watchlist.includes(movie)) {
      watchlist.splice(watchlist.indexOf(movie), 1);
      setWatchlist(() => [...watchlist]);
    }
    if (!favourites.includes(movie)) {
      setFavourites(() => [...favourites, movie]);
    } else {
      Alert.alert('movie already in list');
    }
    setLastSeen(() => [movie]);
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
            setLiked={setLiked}
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
  //* IGNORE BELOW
  const [user, setUser] = useState();

  const values = useMemo(() => ({ user, setUser }), [user, setUser]);

  const setItemStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log('saving data error: ', err);
    }
  };

  const removeItemStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.log('removing data error: ', err);
    }
  };

  const getItemStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (err) {
      console.log('reading data error: ', err);
    }
  };
  const users = {
    id: 1,
    name: 'Caroline Victor-Pujebet',
    email: 'caroline_pujebet@hotmail.com',
    profile_picture: 'T0WU5R8NT-U01C4AC9BUY-93e74dc2edb4-512.jpg',
  };

  function saveStorage() {
    setItemStorage('User', users);
  }

  const removeStorage = () => {
    removeItemStorage('User');
    setUser('');
  };

  const readStorage = async () => {
    getItemStorage('User').then((result) => {
      let jsonObject = JSON.parse(result);
      setUser(() => [jsonObject]);
    });
  };
  //* IGNORE ABOVE

  return (
    <NavigationContainer>
      <UserContext.Provider value={values}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login">
            {(props) => (
              <Login
                saveStorage={saveStorage}
                readStorage={readStorage}
                removeStorage={removeStorage}
                {...props}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AllTabs" component={AllTabs} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

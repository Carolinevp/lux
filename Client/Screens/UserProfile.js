/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import UserChart from '../Components/UserChart';
import UserLists from '../Components/UserLists';
import UserProfileInfo from '../Components/UserProfileInfo';
import apiKey from '../assets/apikey';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const UserProfile = ({
  watchlist,
  liked,
  disliked,
  favourites,
  lastSeen,
  navigation,
  setLiked,
  setDisliked,
  setWatchlist,
  setFavourites,
  setLastSeen,
}) => {
  const [isLoading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/favourites')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setFavourites(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/last_seen')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setLastSeen(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/favourites')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setFavourites(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/liked')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setLiked(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));

    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/disliked')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setDisliked(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/watchlist')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setWatchlist(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    wait(1000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/liked')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setLiked(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [setLiked]);

  useEffect(() => {
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/disliked')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setDisliked(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [setDisliked]);

  useEffect(() => {
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/favourites')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setFavourites(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [setFavourites]);

  useEffect(() => {
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/watchlist')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setWatchlist(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [setWatchlist]);

  useEffect(() => {
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/last_seen')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const myPromises = res.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
          ).then((res1) => {
            return res1.json();
          }),
        );
        Promise.all(myPromises).then((results) => {
          setLastSeen(() => results);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [setLastSeen]);

  return (
    <View style={styles.container}>
      <UserProfileInfo
        liked={liked}
        disliked={disliked}
        favourites={favourites}
      />
      <UserChart
        liked={liked}
        disliked={disliked}
        favourites={favourites}
        lastSeen={lastSeen}
      />
      {isLoading ? (
        <ActivityIndicator color="#fec89a" />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ScrollView style={styles.listBox}>
            <View>
              <Text style={styles.info}> My Lists: </Text>
              <View style={{ marginBottom: 10 }}>
                {watchlist.length > 0 && (
                  <UserLists
                    navigation={navigation}
                    title="WATCHLIST"
                    userlist={watchlist}
                  />
                )}
              </View>
              <View style={{ marginBottom: 10 }}>
                {liked.length > 0 && (
                  <UserLists
                    navigation={navigation}
                    title="LIKED"
                    userlist={liked}
                  />
                )}
              </View>
              <View style={{ marginBottom: 10 }}>
                {disliked.length > 0 && (
                  <UserLists
                    navigation={navigation}
                    title="DISLIKED"
                    userlist={disliked}
                  />
                )}
              </View>
              <View style={{ marginBottom: 10 }}>
                {favourites.length > 0 && (
                  <UserLists
                    navigation={navigation}
                    title="FAVOURITES"
                    userlist={favourites}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  listBox: {
    marginLeft: 20,
  },
  info: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
});

export default UserProfile;

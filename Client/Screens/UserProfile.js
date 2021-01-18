import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import UserChart from '../Components/UserChart';
import UserLists from '../Components/UserLists';
import UserProfileInfo from '../Components/UserProfileInfo';
// import { UserContext } from '../UserContext';
import apiKey from '../assets/apikey';
// import { getListByUser } from '../Services/ApiService';
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
  // const { user } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

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
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.12:3001/lists/5ff9c7cfdf2f636e9546fe1c/want_to_see')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <UserProfileInfo />
      {/* <FlatList
        data={user}
        keyExtractor={({ id }, index) => id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      /> */}
      <UserChart />
      {isLoading ? (
        <ActivityIndicator color="#fec89a" />
      ) : (
          <ScrollView horizontal={true} style={styles.listBox}>
            <View>
              {lastSeen.length > 0 ? (
                <>
                  <UserLists
                    navigation={navigation}
                    title="Last seen"
                    userlist={lastSeen}
                  />
                </>
              ) : (
                  <></>
                )}
            </View>
            <View>
              {watchlist.length > 0 ? (
                <>
                  <UserLists
                    navigation={navigation}
                    title="Want to watch"
                    userlist={watchlist}
                  />
                </>
              ) : (
                  <></>
                )}
            </View>
            <View>
              {liked.length > 0 ? (
                <>
                  <UserLists
                    navigation={navigation}
                    title="Liked"
                    userlist={liked}
                  />
                </>
              ) : (
                  <></>
                )}
            </View>
            <View>
              {disliked.length > 0 ? (
                <>
                  <UserLists
                    navigation={navigation}
                    title="Disliked"
                    userlist={disliked}
                  />
                </>
              ) : (
                  <></>
                )}
            </View>
            <View>
              {favourites.length > 0 ? (
                <>
                  <UserLists
                    navigation={navigation}
                    title="Favourites"
                    userlist={favourites}
                  />
                </>
              ) : (
                  <></>
                )}
            </View>
          </ScrollView>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  listBox: {
    marginLeft: 20,
  },
});

export default UserProfile;

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
import { LogBox } from 'react-native';
import { fetchUserList } from '../Services/FunctionHelper';

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
    fetchUserList('liked', setLiked, setLoading);
    fetchUserList('disliked', setDisliked, setLoading);
    fetchUserList('favourites', setFavourites, setLoading);
    fetchUserList('watchlist', setWatchlist, setLoading);
    fetchUserList('lastSeen', setLastSeen, setLoading);
    wait(1000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUserList('liked', setLiked, setLoading);
  }, [setLiked]);

  useEffect(() => {
    fetchUserList('disliked', setDisliked, setLoading);
  }, [setDisliked]);

  useEffect(() => {
    fetchUserList('favourites', setFavourites, setLoading);
  }, [setFavourites]);

  useEffect(() => {
    fetchUserList('watchlist', setWatchlist, setLoading);
  }, [setWatchlist]);

  useEffect(() => {
    fetchUserList('lastSeen', setLastSeen, setLoading);
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

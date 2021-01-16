import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList } from 'react-native';
import UserChart from '../Components/UserChart';
import UserLists from '../Components/UserLists';
import UserProfileInfo from '../Components/UserProfileInfo';
import { UserContext } from '../UserContext';
import apiKey from '../assets/apikey';
import getListsByUser from '../Services/ApiService';

const UserProfile = ({
  watchlist,
  liked,
  disliked,
  favourites,
  lastSeen,
  navigation,
  setLiked,
}) => {
  // const { user } = useContext(UserContext);
  // useEffect(() => {
  //   getListsByUser()
  //     .then(list => list.)
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${route.params.id}/recommendations?${apiKey}&language=en-US&page=1`,
  //   )
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setLiked(result.results);
  //     })
  //     .catch((error) => console.error(error));
  //   // .finally(() => setLoading(false));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <View style={styles.container}>
      <UserProfileInfo />
      {/* <FlatList
        data={user}
        keyExtractor={({ id }, index) => id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      /> */}
      <UserChart />
      <ScrollView horizontal={true}>
        <View>
          {liked.length > 0 ? (
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
  movies: {
    flexDirection: 'row',
  },
  posters: {
    width: 70,
    height: 100,
    marginTop: 20,
    marginRight: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    // elevation: 1,
  },
  movieLists: {
    flexDirection: 'column',
  },
});

export default UserProfile;

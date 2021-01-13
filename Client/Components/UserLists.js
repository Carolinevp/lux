import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// import MovieTile from './MovieTile';
// import { movies } from '../data';

const UserLists = ({ navigation, title, userlist }) => {
  return (
    <View>
      <Text>{title}</Text>
      <FlatList
        horizontal={true}
        data={userlist}
        keyExtractor={({ id }, index) => id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MovieDetails', item);
              }}
            >
              <Image
                style={styles.posters}
                source={{
                  uri: 'https://image.tmdb.org/t/p/w300/' + item.poster_path,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default UserLists;

import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const MovieTile = ({ movie }) => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.posters}
        source={{
          uri: 'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default MovieTile;

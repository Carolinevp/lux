import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const DiscoverList = ({ movie }) => {
  return (
    <View>
      <Image
        style={styles.posters}
        source={{
          uri: 'https://image.tmdb.org/t/p/w400/' + movie.poster_path,
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DiscoverList;

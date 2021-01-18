import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// import { MovieContext } from '../MovieContext';

const MovieCarousel = ({ navigation, title, list }) => {
  // const [value, setValue] = useState();

  // const refresh = () => {
  //   setValue({});
  // };
  return (
    <View style={styles.movieLists}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <FlatList
          horizontal={true}
          data={list}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <View style={styles.posterBox}>
              <TouchableOpacity
                onPress={() => {
                  // refresh();
                  navigation.navigate('MovieDetails', item);
                }}
              >
                <Image
                  style={styles.posters}
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w400/' + item.poster_path,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6d6875',
  },
  posters: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  posterBox: {
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    elevation: 3,
  },
  movieLists: {
    flexDirection: 'column',
    marginTop: 20,
    // marginLeft: 5,
  },
});

export default MovieCarousel;

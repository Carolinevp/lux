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
            <View>
              <TouchableOpacity
                onPress={() => {
                  console.log('clicked');
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
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  posters: {
    width: 70,
    height: 100,
    marginTop: 20,
    marginRight: 10,
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,
    // elevation: 1,
  },
  movieLists: {
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 5,
  },
});

export default MovieCarousel;

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import apiKey from '../assets/apikey';

const Search = ({ navigation }) => {
  const [search, setSearch] = useState();
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchMovies = (text) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?${apiKey}&language=en-US&query=${text}&page=1&include_adult=false`,
    )
      .then((res) => res.json())
      .then((result) =>
        setResults(
          result.results
            ? result.results.filter((res) => res.poster_path !== null)
            : '',
        ),
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const updateSearch = (search1) => {
    setSearch(search1);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search..."
        value={search}
        onChangeText={(text) => {
          fetchMovies(text);
          updateSearch(text);
        }}
        lightTheme={true}
        placeholderTextColor="#fae1dd"
        round={true}
        showCancel={true}
      />
      <View style={styles.movies}>
        {isLoading ? (
          <View>
            <Text>No Results found</Text>
            <ActivityIndicator color="#fec89a" />
          </View>
        ) : (
            <FlatList
              numColumns={3}
              data={results}
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
                        uri:
                          'https://image.tmdb.org/t/p/w400/' + item.poster_path,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  movies: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  posters: {
    // flex: 1,
    width: 110,
    height: 160,
    marginTop: 25,
    marginHorizontal: 10,
    // marginLeft: 10,
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

export default Search;

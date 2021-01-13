/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useCallback, useEffect } from 'react';
// import { FlatList, StyleSheet, RefreshControl, Text } from 'react-native';
// import db from '../data';

// const Discover = ({ navigation, route }) => {
//   const [trending, setTrending] = useState([]);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const fetchTrendingMovies = useCallback(async () => {
//     const result = await fetch(
//       'https://api.themoviedb.org/3/trending/movie/week?api_key=fa5a9efc35bef208c722b23496593e0c',
//     );

//     if (result.ok) {
//       const trendingMovies = await result.json();
//       setTrending(trendingMovies);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTrendingMovies();
//   }, []);

//   const handleRefresh = useCallback(async () => {
//     setIsRefreshing(true);
//     await fetchTrendingMovies();
//     setTimeout(() => {
//       setIsRefreshing(false);
//     }, 1000);
//   });

//   // useEffect(() => {
//   //   if (newColorPalette) {
//   //     setColorPalettes((palette) => [newColorPalette, ...palette]);
//   //   }
//   // }, [newColorPalette]); //? because only rendered once

//   return (
//     <FlatList
//       style={styles.list}
//       data={trending}
//       // keyExtractor={(item) => item.results.id}
//       renderItem={({ item }) => <Text>{item[0]}</Text>}
//       refreshControl={
//         <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
//       }
//     />
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     padding: 10,
//     backgroundColor: 'white',
//   },
//   title: {
//     fontWeight: 'bold',
//     color: '#2aa198',
//     fontSize: 20,
//     paddingBottom: 10,
//   },
// });

// export default Discover;

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Discover = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [popularity, setPopularity] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=fa5a9efc35bef208c722b23496593e0c',
    )
      .then((res) => res.json())
      .then((result) => setData(result.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=fa5a9efc35bef208c722b23496593e0c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&year=2019',
    )
      .then((res) => res.json())
      .then((result) => setPopularity(result.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
          <View style={styles.movieLists}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TRENDING NOW</Text>
            <View>
              <FlatList
                horizontal={true}
                data={data}
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
                            'https://image.tmdb.org/t/p/w300/' + item.poster_path,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View style={styles.movieLists}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>POPULAR</Text>
              <FlatList
                horizontal={true}
                data={popularity}
                keyExtractor={({ id }, index) => id.toString()}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('MovieDetails', item)}
                    >
                      <Image
                        style={styles.posters}
                        source={{
                          uri:
                            'https://image.tmdb.org/t/p/w300/' + item.poster_path,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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

export default Discover;

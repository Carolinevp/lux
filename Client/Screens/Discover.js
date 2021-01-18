import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import apiKey from '../assets/apikey';
import MovieCarousel from '../Components/MovieCarousel';

// const lists = [
//   title: {
//     "TOP RATED,
//     "POPULAR",
//   "IN THEATERS",
//   "COMING SOON",}, list: {topRated,
//     popular,
//     inTheaters,
//     upcoming,}
// ]

const Discover = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [inTheaters, setInTheaters] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?${apiKey}`)
      .then((res) => res.json())
      .then((result) => setTrending(result.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?${apiKey}&language=en-US&page=1`,
    )
      .then((res) => res.json())
      .then((result) => setTopRated(result.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?${apiKey}&language=en-US&page=1`,
    )
      .then((res) => res.json())
      .then((result) => setPopular(result.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?${apiKey}&language=en-US&page=1`,
    )
      .then((res) => res.json())
      .then((result) => setUpcoming(result.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?${apiKey}&language=en-US&page=1`,
    )
      .then((res) => res.json())
      .then((result) => setInTheaters(result.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#fec89a" />
      ) : (
          <ScrollView style={styles.lists}>
            <MovieCarousel
              navigation={navigation}
              title="TRENDING NOW"
              list={trending}
            />
            <MovieCarousel
              navigation={navigation}
              title="TOP RATED"
              list={topRated}
            />
            <MovieCarousel
              navigation={navigation}
              title="POPULAR"
              list={popular}
            />
            <MovieCarousel
              navigation={navigation}
              title="IN THEATERS"
              list={inTheaters}
            />
            <MovieCarousel
              navigation={navigation}
              title="COMING SOON"
              list={upcoming}
            />
          </ScrollView>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  lists: {
    marginLeft: 10,
  },
});

export default Discover;

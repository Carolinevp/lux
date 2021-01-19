import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import apiKey from '../assets/apikey';
import MovieCarousel from '../Components/MovieCarousel';
import { fetchLists } from '../Services/FunctionHelper';

const Discover = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [inTheaters, setInTheaters] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const lists = [
    { title: 'TRENDING NOW', list: trending },
    { title: 'TOP RATED', list: topRated },
    { title: 'POPULAR', list: popular },
    { title: 'IN THEATRES', list: inTheaters },
    { title: 'COMING SOON', list: upcoming },
  ];

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?${apiKey}`)
      .then((res) => res.json())
      .then((result) => setTrending(result.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchLists('top_rated', setTopRated, setLoading);
  }, []);

  useEffect(() => {
    fetchLists('popular', setPopular, setLoading);
  }, []);

  useEffect(() => {
    fetchLists('upcoming', setUpcoming, setLoading);
  }, []);

  useEffect(() => {
    fetchLists('now_playing', setInTheaters, setLoading);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#fec89a" />
      ) : (
        <ScrollView style={styles.lists}>
          {lists.map((list, index) => (
            <MovieCarousel
              navigation={navigation}
              title={list.title}
              list={list.list}
              key={index}
            />
          ))}
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

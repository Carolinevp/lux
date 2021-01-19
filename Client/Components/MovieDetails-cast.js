/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import apiKey from '../assets/apikey';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const Cast = ({ route, setLoading }) => {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}/credits?${apiKey}&language=en-US`,
    )
      .then((res) => res.json())
      .then((result) => {
        setCredits(result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.mainBox}>
      <FlatList
        // horizontal={true}
        numColumns={3}
        // columnWrapperStyle
        data={credits.cast}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate('MovieDetails', item);
            // }}
            >
              {item && item.profile_path ? (
                <Image
                  style={styles.castPicture}
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w400/' + item.profile_path,
                  }}
                />
              ) : (
                  <View style={styles.castMissingPictureBox}>
                    <Image
                      style={styles.castMissingPicture}
                      source={require('../assets/logo1.png')}
                    />
                  </View>
                )}
            </TouchableOpacity>
            <Text style={{ fontSize: 14 }}> {item && item.name}</Text>
            <Text style={{ fontSize: 10 }}>{item && item.character}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  castPicture: {
    width: 115,
    height: 160,
    borderRadius: 2,
  },
  castMissingPictureBox: {
    width: 115,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  castMissingPicture: {
    width: 85.5,
    height: 95,
  },
  mainBox: {
    marginBottom: 1000,
  },
  box: {
    borderRadius: 2,
    maxWidth: 115,
    backgroundColor: '#dbe7e4',
    elevation: 1,
    margin: 10,
  },
});

export default Cast;

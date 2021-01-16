import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AddToList = ({
  route,
  addToWatchlist,
  addToLikedList,
  addToDislikedList,
  addToFavourites,
}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        {' '}
        {route.params.title}{' '}
      </Text> */}
      <Image
        style={styles.posters}
        source={{
          uri: 'https://image.tmdb.org/t/p/w400/' + route.params.poster_path,
        }}
      />
      <View style={styles.icons}>
        <TouchableOpacity
          onPress={() => {
            addToWatchlist(route.params);
            Alert.alert('movie added to watchlist');
          }}
        >
          <MaterialCommunityIcons
            name="eye-plus-outline"
            size={34}
            color="#f6bd60"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addToLikedList(route.params);
            Alert.alert('movie added to liked movies');
          }}
        >
          <AntDesign name="like2" size={34} color="#83c5be" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addToDislikedList(route.params);
            Alert.alert('movie added to disliked movies');
          }}
        >
          <AntDesign name="dislike2" size={34} color="#d00000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addToFavourites(route.params);
            Alert.alert('movie added to favourites');
          }}
        >
          <Ionicons name="md-heart-sharp" size={34} color="#ffafcc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  posters: {
    width: 310,
    height: 440,
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
  icons: {
    justifyContent: 'space-around',
    height: 50,
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  icon: {
    margin: 20,
  },
});

export default AddToList;

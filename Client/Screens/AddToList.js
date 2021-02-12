import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AddToList = ({
  route,
  addToWatchlist,
  addToLikedList,
  addToDislikedList,
  addToFavourites,
  liked,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.posterBox}>
        <Image
          style={styles.posters}
          source={{
            uri: 'https://image.tmdb.org/t/p/w400/' + route.params.poster_path,
          }}
        />
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          onPress={() => {
            addToWatchlist('5ff9c7cfdf2f636e9546fe1c', route.params.id);
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
            addToLikedList('5ff9c7cfdf2f636e9546fe1c', route.params.id);
          }}
        >
          <AntDesign name="like2" size={34} color="#83c5be" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addToDislikedList('5ff9c7cfdf2f636e9546fe1c', route.params.id);
          }}
        >
          <AntDesign name="dislike2" size={34} color="#d00000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addToFavourites('5ff9c7cfdf2f636e9546fe1c', route.params.id);
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
    borderRadius: 8,
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
  posterBox: {
    borderRadius: 8,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
    elevation: 5,
  },
});

export default AddToList;
